/**
 * 도서 가격의 1%에 해당하는 포인트를 계산합니다.
 * @param price 도서의 가격 (number)
 * @returns 적립될 포인트 (number)
 */

export const calculatePoint = (price: number): number => {
  if (price < 0) {
    // 가격이 음수인 경우 (유효성 검사)
    console.warn("가격은 음수가 될 수 없습니다. 0 포인트가 반환됩니다.");
    return 0;
  }

  return Math.floor(price * 0.01);
};
