const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);
const CONSTANTS = require("../Constants/subscription.js");
const Card = require("../Models/cardModel.js");
const Subscription = require("../Models/subscriptionModel.js");

async function createCustomer(user, tokenId) {
  try {
    const customer = await stripe.customers.create({
      name: user.fullName,
      email: user.email,
      source: tokenId,
    });
    return customer;
  } catch (error) {
    console.error(
      `There was an issue into stripeHelper:createCustomer => ${error}`
    );
    throw error;
  }
}

async function saveCardDetails(user, token, customer) {
  try {
    const userCard = await Card.create({
      userId: user._id,
      customerId: customer.id,
      cardId: token.card.id,
      cardHolderName: token.card.name || null,
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

async function formateDate(date) {
  try {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // BCZ getMonth gives us 0 to 11 months so add 1 
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return new Date(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
  } catch (error) {
    console.error(
      `There was an issue into stripeHelper:formateDate => ${error}`
    );
    throw error;
  }
}

async function monthlySubscriptionDetails(user, customer, plan) {
  try {
    const currentDate = new Date(); // Todays date
    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + plan.trailDays); // Add days in to todays date ex: Today date is 01-01-2025 --> 05-01-2025 add 5 trial days
    futureDate.setHours(23, 59, 59, 999); // Set hours like on this date 05-01-2025 sub start at 12:00:00 AM

    const trialStar = await formateDate(currentDate); // ex: current date is 01-01-2025 08:20:45 PM
    const trialEnd = await formateDate(futureDate); // ex: future date is 05-01-2025 12:00:00 AM

    const userSubscription = await Subscription.create({
      userId: user._id,
      customerId: customer.id,
      subscriptionId: null,
      scheduleId: null,
      planId: plan._id,
      invoiceId: null,
      amount: plan.amount,
      currency: CONSTANTS.SUBSCRIPTION_CURRENCY.USD,
      interval: plan.plan,
      intervalCount: 1,
      trialEnd: trialEnd,
      planStart: trialStar,
      planEnd: trialEnd,
      status: CONSTANTS.SUBSCRIPTION_STATUS.ACTIVE,
    });

    return userSubscription;
  } catch (error) {
    console.error(
      `There was an issue into stripeHelper:monthlySubscriptionDetails => ${error}`
    );
    throw error;
  }
}

async function yearlySubscriptionDetails(user, customer, plan) {
  try {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + plan.trailDays);
    futureDate.setHours(23, 59, 59, 999);

    const trialStar = await formateDate(currentDate);
    const trialEnd = await formateDate(futureDate);

    const userSubscription = await Subscription.create({
      userId: user._id,
      customerId: customer.id,
      subscriptionId: null,
      scheduleId: null,
      planId: plan._id,
      invoiceId: null,
      amount: plan.amount,
      currency: CONSTANTS.SUBSCRIPTION_CURRENCY.USD,
      interval: plan.plan,
      intervalCount: 1,
      trialEnd: trialEnd,
      planStart: trialStar,
      planEnd: trialEnd,
      status: CONSTANTS.SUBSCRIPTION_STATUS.ACTIVE,
    });

    return userSubscription;
  } catch (error) {
    console.error(
      `There was an issue into stripeHelper:yearlySubscriptionDetails => ${error}`
    );
    throw error;
  }
}

async function lifeTypeSubscriptionDetails(user, customer, plan) {
  try {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + plan.trailDays);
    futureDate.setHours(23, 59, 59, 999);

    const trialStar = await formateDate(currentDate);
    const trialEnd = await formateDate(futureDate);

    const userSubscription = await Subscription.create({
      userId: user._id,
      customerId: customer.id,
      subscriptionId: null,
      scheduleId: null,
      planId: plan._id,
      invoiceId: null,
      amount: plan.amount,
      currency: CONSTANTS.SUBSCRIPTION_CURRENCY.USD,
      interval: plan.plan,
      intervalCount: 1,
      trialEnd: trialEnd,
      planStart: trialStar,
      planEnd: trialEnd,
      status: CONSTANTS.SUBSCRIPTION_STATUS.ACTIVE,
    });

    return userSubscription;
  } catch (error) {
    console.error(
      `There was an issue into stripeHelper:lifeTypeSubscriptionDetails => ${error}`
    );
    throw error;
  }
}

function getDaysInMonth() {
  try {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(); // It's gives us total count of days --> 28, 30 etc...
  } catch (error) {
    console.error(
      `There was an issue into stripeHelper:daysInMonth => ${error}`
    );
    throw error;
  }
}

function getToday() {
  try {
    const now = new Date();
    return now.getDate(); // It's gives us today which count of day ex: like today date is 5 to month day count is also 5.
  } catch (error) {
    console.error(`There was an issue into stripeHelper:day => ${error}`);
    throw error;
  }
}

async function monthlyPendingFees(user, customer, plan) {
  try {
    const daysInMonth = getDaysInMonth(); // Total days count in current month ex: 28, 30 or 31
    const today = getToday(); // count of today in current month ex: 3, 6, 27 etc...

    return;
  } catch (error) {
    console.error(
      `There was an issue into stripeHelper:monthlyPendingFees => ${error}`
    );
    throw error;
  }
}

module.exports = {
  createCustomer,
  saveCardDetails,
  monthlySubscriptionDetails,
  yearlySubscriptionDetails,
  lifeTypeSubscriptionDetails,
};
