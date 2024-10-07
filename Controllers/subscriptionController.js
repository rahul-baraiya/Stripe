const { successResponse, errorResponse } = require("../Utils/responseMsg.js");
const Plan = require("../Models/planModel.js");
const stripeHelper = require("../Helpers/stripeHelper.js");

const addPlan = async (req, res, next) => {
  try {
    const { plan, stripId, isTrial, trailDays, amount, type } = req.body;

    const subPlan = new Plan({
      plan,
      stripId,
      isTrial,
      trailDays,
      amount,
      type,
    });
    await subPlan.save();

    res
      .status(201)
      .json(
        successResponse(subPlan, 201, "Subscription plan added successfully.")
      );
  } catch (error) {
    console.error(
      `There was an issue into subscriptionController:addPlan: ${error}`
    );
    next(error);
  }
};

const getPlan = async (req, res, next) => {
  try {
    const { planId } = req.query;
    if (planId) {
      const plan = await Plan.findOne({ _id: planId });

      return res
        .status(200)
        .json(
          successResponse(
            plan,
            200,
            "Subscription plan retrieved successfully."
          )
        );
    }
    const plans = await Plan.find();

    res
      .status(200)
      .json(
        successResponse(
          plans,
          200,
          "Subscription plans retrieved successfully."
        )
      );
  } catch (error) {
    console.error(
      `There was an issue into subscriptionController:getPlan: ${error}`
    );
    next(error);
  }
};

const createSubscription = async (req, res, next) => {
  try {
    const user = req.user;
    const { planId, token } = req.body;
    let userSubscription = null;

    const plan = await Plan.findOne({ _id: planId });
    if (!plan) {
      return res
        .status(400)
        .json(errorResponse(400, "Subscription plans not found!"));
    }

    const customer = await stripeHelper.createCustomer(user, token.id);

    const userCard = await stripeHelper.saveCardDetails(user, token, customer);

    if (plan.type === 0) {
      userSubscription = await stripeHelper.monthlySubscriptionDetails(
        user,
        customer,
        plan
      );
    } else if (plan.type === 1) {
      userSubscription = await stripeHelper.yearlySubscriptionDetails(
        user,
        customer,
        plan
      );
    } else if (plan.type === 2) {
      userSubscription = await stripeHelper.lifeTypeSubscriptionDetails(
        user,
        customer,
        plan
      );
    }

    if (!userSubscription) {
      return res.status(400).json(errorResponse(400, "Something went wrong!"));
    }

    res
      .status(200)
      .json(
        successResponse(
          userSubscription,
          200,
          "Subscription plans purchased successfully."
        )
      );
  } catch (error) {
    console.error(
      `There was an issue into subscriptionController:createSubscription: ${error}`
    );
    next(error);
  }
};

module.exports = { addPlan, getPlan, createSubscription };
