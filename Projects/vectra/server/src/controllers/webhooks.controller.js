// import Stripe from "stripe";
// import env from "../config/env.js";
// import User from "../models/User.model.js";

// const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

// export const stripeWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   switch (event.type) {
//     case "checkout.session.completed": {
//       const session = event.data.object;
//       const userId = session.metadata?.userId;
//       if (userId) {
//         const customerId = session.customer;
//         await User.findByIdAndUpdate(userId, {
//           stripeCustomerId: customerId,
//           subscriptionStatus: "active"
//         });
//       }
//       break;
//     }
//     case "customer.subscription.updated":
//     case "customer.subscription.created": {
//       const sub = event.data.object;
//       const customerId = sub.customer;
//       const status = sub.status; // active | past_due | canceled | etc.
//       const currentPeriodEnd = new Date(sub.current_period_end * 1000);

//       await User.findOneAndUpdate(
//         { stripeCustomerId: customerId },
//         { subscriptionStatus: status, currentPeriodEnd }
//       );
//       break;
//     }
//     case "customer.subscription.deleted": {
//       const sub = event.data.object;
//       await User.findOneAndUpdate(
//         { stripeCustomerId: sub.customer },
//         { subscriptionStatus: "canceled", currentPeriodEnd: null, plan: "free" }
//       );
//       break;
//     }
//     default:
//       // ignore other events
//       break;
//   }

//   res.json({ received: true });
// };

// import Stripe from "stripe";
// import env from "../config/env.js";
// import User from "../models/User.model.js";

// const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

// export const stripeWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   switch (event.type) {
//     case "checkout.session.completed": {
//       const session = event.data.object;
//       const userId = session.metadata?.userId;
//       if (userId) {
//         const customerId = session.customer; // string
//         await User.findByIdAndUpdate(userId, {
//           stripeCustomerId: customerId,
//           // don't set plan here; wait for subscription.* event
//         });
//       }
//       break;
//     }

//     case "customer.subscription.updated":
//     case "customer.subscription.created": {
//       const sub = event.data.object;
//       const customerId = sub.customer;
//       const status = sub.status; // active | trialing | past_due | etc.
//       const currentPeriodEnd = new Date(sub.current_period_end * 1000);

//       await User.findOneAndUpdate(
//         { stripeCustomerId: customerId },
//         {
//           subscriptionStatus: status,
//           plan: status === "active" || status === "trialing" ? "pro" : "free",
//           currentPeriodEnd,
//         }
//       );
//       break;
//     }

//     case "customer.subscription.deleted": {
//       const sub = event.data.object;
//       await User.findOneAndUpdate(
//         { stripeCustomerId: sub.customer },
//         { subscriptionStatus: "canceled", currentPeriodEnd: null, plan: "free" }
//       );
//       break;
//     }

//     default:
//       // ignore other events
//       break;
//   }

//   res.json({ received: true });
// };

import Stripe from "stripe";
import env from "../config/env.js";
import User from "../models/User.model.js";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

export async function stripeWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // req.body is a Buffer because we mounted express.raw for this route
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("[stripeWebhook] signature verify failed:", err?.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    console.log("[stripeWebhook] event:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const customerId = session.customer; // string

      if (userId && typeof customerId === "string") {
        await User.updateOne(
          { _id: userId },
          { $set: { stripeCustomerId: customerId } }
        );
        console.log("[stripeWebhook] linked customer to user", {
          userId,
          customerId,
        });
      } else {
        console.log(
          "[stripeWebhook] checkout.session.completed missing userId/customerId; skipping"
        );
      }
    } else if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated"
    ) {
      const sub = event.data.object;
      const customerId = sub?.customer;
      const status = sub?.status;
      const currentPeriodEnd = sub?.current_period_end
        ? new Date(sub.current_period_end * 1000)
        : null;

      if (!customerId) {
        console.log(
          "[stripeWebhook] subscription.* missing customer; skipping"
        );
      } else {
        const user = await User.findOne({
          stripeCustomerId: customerId,
        }).select("_id");
        if (!user) {
          console.log(
            "[stripeWebhook] no user for customer yet; will be handled on next retry",
            { customerId }
          );
        } else {
          await User.updateOne(
            { _id: user._id },
            {
              $set: {
                plan:
                  status === "active" || status === "trialing" ? "pro" : "free",
                subscriptionStatus: status || "unknown",
                currentPeriodEnd,
                stripeSubscriptionId: sub.id, // <-- store it!
              },
            }
          );
          console.log("[stripeWebhook] user subscription updated", {
            userId: user._id,
            status,
            subId: sub.id,
          });
        }
      }
    } else if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object;
      const customerId = sub?.customer;
      if (customerId) {
        await User.updateOne(
          { stripeCustomerId: customerId },
          {
            $set: {
              plan: "free",
              subscriptionStatus: "canceled",
              currentPeriodEnd: null,
            },
          }
        );
        console.log("[stripeWebhook] user downgraded to free", { customerId });
      } else {
        console.log(
          "[stripeWebhook] subscription.deleted missing customer; skipping"
        );
      }
    }

    // Ignore everything else but keep it 200 so Stripe stops retrying
    return res.json({ received: true });
  } catch (err) {
    // If *anything* unexpected happens, log and still 200 (to stop infinite retries while you debug).
    console.error("[stripeWebhook] handler error:", err);
    return res.json({ received: true, note: "logged" });
  }
}
