import Stripe from "stripe";
import env from "../config/env.js";
import User from "../models/User.model.js";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

export const createCheckoutSession = async (req, res) => {
  const { priceId } = req.body; // send STRIPE_PRICE_BASIC or STRIPE_PRICE_PRO from client
  const user = await User.findById(req.user._id);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: user.email,
    success_url: `${env.APP_BASE_URL}/settings?success=true`,
    cancel_url: `${env.APP_BASE_URL}/settings?canceled=true`,
    metadata: { userId: user._id.toString() }
  });

  res.json({ url: session.url });
};

export const createPortalSession = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user.stripeCustomerId) return res.status(400).json({ message: "No Stripe customer" });

  const portal = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${env.APP_BASE_URL}/settings`
  });

  res.json({ url: portal.url });
};