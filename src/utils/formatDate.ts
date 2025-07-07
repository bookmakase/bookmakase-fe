export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
