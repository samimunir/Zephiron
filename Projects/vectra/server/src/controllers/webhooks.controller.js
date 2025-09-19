import Stripe from "stripe";
import env from "../config/env.js";
import User from "../models/User.model.js";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      if (userId) {
        const customerId = session.customer;
        await User.findByIdAndUpdate(userId, {
          stripeCustomerId: customerId,
          subscriptionStatus: "active"
        });
      }
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.created": {
      const sub = event.data.object;
      const customerId = sub.customer;
      const status = sub.status; // active | past_due | canceled | etc.
      const currentPeriodEnd = new Date(sub.current_period_end * 1000);

      await User.findOneAndUpdate(
        { stripeCustomerId: customerId },
        { subscriptionStatus: status, currentPeriodEnd }
      );
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      await User.findOneAndUpdate(
        { stripeCustomerId: sub.customer },
        { subscriptionStatus: "canceled", currentPeriodEnd: null, plan: "free" }
      );
      break;
    }
    default:
      // ignore other events
      break;
  }

  res.json({ received: true });
};