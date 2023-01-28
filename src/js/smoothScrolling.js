document.addEventListener('scroll', smoothScrolling);

function smoothScrolling() {
  console.log(document.querySelector('.gallery').firstElementChild);

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export { smoothScrolling };
