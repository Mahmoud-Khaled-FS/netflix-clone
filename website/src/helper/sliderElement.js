export const paginationHandler = () => {
  let elemntsOnScreen;
  if (window.innerWidth <= 499) {
    elemntsOnScreen = 2;
  } else if (window.innerWidth <= 799) {
    elemntsOnScreen = 3;
  } else if (window.innerWidth <= 1099) {
    elemntsOnScreen = 4;
  } else if (window.innerWidth <= 1399) {
    elemntsOnScreen = 5;
  } else if (window.innerWidth > 1400) {
    elemntsOnScreen = 6;
  }
  return elemntsOnScreen;
};
