export const getProgressBarColor = (value: number) => {
  if (value === 100) {
    return 'complete';
  }
  if (value <= 20) {
    return 'low';
  }
  if (value < 60) {
    return 'medium';
  }
  return 'high';
};
