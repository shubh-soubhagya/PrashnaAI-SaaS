import { PLANS } from "../constants/plans.js";

export const checkDailyLimits = (user) => {
  const plan = PLANS[user.plan];

  const today = new Date().toDateString();
  const last = new Date(user.lastResetDate).toDateString();

  if (today !== last) {
    user.dailyURLCount = 0;
    user.creditsUsedToday = 0;
    user.lastResetDate = new Date();
  }

  return user.dailyURLCount < plan.maxURLsPerDay;
};

export const checkChatQueryLimits = (user, chat) => {
  const plan = PLANS[user.plan];
  return chat.queryCount < plan.maxQueriesPerChat;
};
