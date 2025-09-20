import Stripe from "stripe";
import env from "../config/env.js";
import User from "../models/User.model.js";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

// export const createCheckoutSession = async (req, res) => {
//   const { priceId } = req.body; // send STRIPE_PRICE_BASIC or STRIPE_PRICE_PRO from client
//   const user = await User.findById(req.user._id);

//   const session = await stripe.checkout.sessions.create({
//     mode: "subscription",
//     line_items: [{ price: priceId, quantity: 1 }],
//     customer_email: user.email,
//     success_url: `${env.APP_BASE_URL}/settings?success=true`,
//     cancel_url: `${env.APP_BASE_URL}/settings?canceled=true`,
//     metadata: { userId: user._id.toString() }
//   });

//   res.json({ url: session.url });
// };

// import Stripe from "stripe";
// import env from "../config/env.js";
// import User from "../models/User.model.js";

// const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

export async function createCheckoutSession(req, res) {
  try {
    const user = await User.findById(req.user._id).lean();
    if (!user) return res.status(401).json({ message: "User not found" });

    const priceId = req.body?.priceId || env.STRIPE_PRICE_PRO;
    if (!priceId) {
      return res.status(400).json({
        message:
          "Missing priceId (set STRIPE_PRICE_PRO in server env or send priceId)",
      });
    }

    // Build params conditionally
    const params = {
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${env.APP_BASE_URL}/settings?success=1`,
      cancel_url: `${env.APP_BASE_URL}/settings?canceled=1`,
      metadata: { userId: req.user._id.toString() },
    };

    if (user.stripeCustomerId) {
      // Existing customer → pass customer and (now allowed) customer_update
      Object.assign(params, {
        customer: user.stripeCustomerId,
        customer_update: { name: "auto", address: "auto" },
      });
    } else {
      // No customer yet → DO NOT send customer_update; use email instead
      Object.assign(params, {
        customer_email: user.email,
      });
    }

    const session = await stripe.checkout.sessions.create(params);
    return res.json({ url: session.url });
  } catch (err) {
    // Surface Stripe’s message to the client for clarity
    const msg = err?.raw?.message || err?.message || "Stripe error";
    console.error("createCheckoutSession error:", msg);
    return res.status(400).json({ message: msg });
  }
}

export async function createBillingPortal(req, res) {
  try {
    const user = await User.findById(req.user._id).lean();
    if (!user?.stripeCustomerId) {
      return res
        .status(400)
        .json({ message: "No Stripe customer yet. Start checkout first." });
    }
    const portal = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${env.APP_BASE_URL}/settings`,
    });
    return res.json({ url: portal.url });
  } catch (err) {
    const msg = err?.raw?.message || err?.message || "Stripe error";
    return res.status(400).json({ message: msg });
  }
}

export const createPortalSession = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user.stripeCustomerId)
    return res.status(400).json({ message: "No Stripe customer" });

  const portal = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${env.APP_BASE_URL}/settings`,
  });

  res.json({ url: portal.url });
};
