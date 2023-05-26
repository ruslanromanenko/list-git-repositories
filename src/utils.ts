export const createPages = (
  pagesCount: number,
  currentPage: number
): number[] => {
  const pages = [];
  if (pagesCount > 8) {
    if (currentPage > 4) {
      for (let i = currentPage - 3; i <= currentPage + 4; i++) {
        pages.push(i);
        if (i === pagesCount) break;
      }
    } else {
      for (let i = 1; i <= 8; i++) {
        pages.push(i);
        if (i === pagesCount) break;
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  }
  return pages;
};
