const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);
const Card = require("../Models/cardModel.js");
const Subscription = require("../Models/subscriptionModel.js");
const Customer = require("../Models/customerModel.js");

async function createCustomer(user, tokenId) {
  try {
    const findUserCustomer = await Customer.findOne({
      userId: user._id.toString(),
    });

    if (findUserCustomer) {
      return findUserCustomer;
    } else {
      const customer = await stripe.customers.create({
        name: user.fullName,
        email: user.email,
        source: tokenId,
        metadata: {
          userId: user._id.toString(),
        },
      });

      const userCustomer = await Customer.create({
        userId: customer.metadata.userId,
        customerId: customer.id,
        currency: customer.currency,
        phone: customer.phone,
        address: customer.address,
        shipping: customer.shipping,
      });

      return userCustomer;
    }
  } catch (error) {
    console.error(
      `There was an issue into stripeHelper:createCustomer => ${error}`
    );
    throw error;
  }
}

async function createSubscription(user, userCustomer, plan) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: userCustomer.customerId,
      items: [{ plan: plan.stripId }],
      trial_period_days: plan.trailDays,
      metadata: {
        userId: user._id.toString(),
      },
    });

    const userSubscription = await Subscription.create({
      userId: subscription.metadata.userId,
      customerId: subscription.customer,
      subscriptionId: subscription.id,
      planStripeId: subscription.plan.id,
      invoiceId: subscription.latest_invoice,
      amount: subscription.plan.amount / 100,
      currency: subscription.plan.currency,
      interval: subscription.plan.interval,
      intervalCount: subscription.plan.interval_count,
      trialStart: subscription.trial_start,
      trialEnd: subscription.trial_end,
      planStart: subscription.current_period_start,
      planEnd: subscription.current_period_end,
      status: subscription.status,
    });

    return userSubscription;
  } catch (error) {
    console.error(
      `There was an issue into stripeHelper:createSubscription => ${error}`
    );
    throw error;
  }
}

async function saveCardDetails(user, token, userCustomer) {
  try {
    const userCard = await Card.create({
      userId: user._id,
      customerId: userCustomer.customerId,
      cardId: token.card.id,
      cardHolderName: token.card.name,
      cardNumber: token.card.last4,
      cardType: token.card.funding,
      month: token.card.exp_month,
      year: token.card.exp_year,
    });
    return userCard;
  } catch (error) {
    console.error(
      `There was an issue into stripeHelper:saveCardDetails => ${error}`
    );
    throw error;
  }
}

module.exports = {
  createCustomer,
  saveCardDetails,
  createSubscription,
};
