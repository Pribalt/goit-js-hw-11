const offset = 100;
const scrollUpEl = document.querySelector('.scroll-up');

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

window.addEventListener('scroll', onGetScroll);
scrollUpEl.addEventListener('click', onClickScroll);

function onGetScroll() {
  if (getTop() > offset) {
    scrollUpEl.classList.add('scroll-up--active');
  } else {
    scrollUpEl.classList.remove('scroll-up--active');
  }
}

function onClickScroll() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export { onGetScroll, onClickScroll };
