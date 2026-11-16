/** Keep trying until the condition is met */
export const retryUntil = (condition: () => any) =>
  new Promise((resolve) =>
    condition() ? resolve(0) : setInterval(() => condition() && resolve(0), 10),
  );
