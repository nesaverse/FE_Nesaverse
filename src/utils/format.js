export const formatNum = (n) => {
  const num = parseInt(String(n).replace(/\D/g, '')) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return String(n);
};
