// src/utils/dateHelpers.js
export const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

export const getYesterdayRange = () => {
  const start = new Date();
  start.setDate(start.getDate() - 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setDate(end.getDate() - 1);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

export const getThisWeekRange = () => {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);

  const day = now.getDay(); // Sunday = 0
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day

  start.setDate(diff);
  start.setHours(0, 0, 0, 0);

  end.setDate(diff + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

export const getThisMonthRange = () => {
  const now = new Date();

  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  return { start, end };
};
