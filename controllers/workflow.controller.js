import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/send.js";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  if (!context.loggedRunId) {
    console.log("Workflow Run ID:", context.workflowRunId);
    context.loggedRunId = true;
  }

  const { subscriptionId } = context.requestPayload;

  if (!subscriptionId) {
    console.error("No subscriptionId provided in request payload");
    return;
  }

  const subscription = await fetchSubscription(context, subscriptionId);
  if (!subscription || subscription.status !== "active") {
    console.log(`Subscription ${subscriptionId} is not active or not found`);
    return;
  }

  const renewalDate = dayjs(subscription.renewDate);
  if (renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date has passed for subscription ${subscriptionId}`);
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    // Check reminder date and trigger email if conditions are met
    console.log(`Checking reminder for ${daysBefore} days before: ${reminderDate.format("YYYY-MM-DD")}`);

    if (reminderDate.isAfter(dayjs()) || dayjs().isSame(reminderDate, "day")) {
      if (reminderDate.isAfter(dayjs())) {
        console.log(`Sleeping until ${reminderDate.format("YYYY-MM-DD")}`);
        await sleepUntilReminder(context, reminderDate);
      }

      if (dayjs().isSame(reminderDate, "day") && !context.emailSent) {
        await triggerReminder(context, subscription, daysBefore);
        context.emailSent = true;
      }
    } else {
      console.log(`No reminder needed for ${daysBefore} days before. Date already passed.`);
    }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    const subscription = await Subscription.findById(subscriptionId).populate(
      "user",
      "name email"
    );

    if (!subscription) {
      console.error(`Subscription not found with ID: ${subscriptionId}`);
      return null;
    }
    return subscription;
  });
};

const sleepUntilReminder = async (context, date) => {
  console.log(`Sleeping until ${date.format("YYYY-MM-DD")}`);
  await context.sleepUntil("waiting for reminder", date.toDate());
};

const triggerReminder = async (context, subscription, daysBefore) => {
  return await context.run("send reminder", async () => {
    console.log(`Sending reminder for subscription: ${subscription.name}`);
    try {
      const type = REMINDERS.includes(daysBefore)
        ? `${daysBefore} days before reminder`
        : "Invalid type";

      await sendReminderEmail({
        to: subscription.user.email,
        type,
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewDate).format("MMMM D, YYYY"),
        planName: subscription.name,
        price: `${subscription.price} ${subscription.currency}`,
        paymentMethod: subscription.paymentMethod,
        accountSettingsLink: "https://subdub.com/account/settings",
        supportLink: "https://subdub.com/support",
      });

      console.log(`Email sent successfully for ${daysBefore} days before reminder`);
    } catch (error) {
      console.error(`Error sending email: ${error.message}`);
    }
  });
};
