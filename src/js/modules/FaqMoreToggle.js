export default class FaqMoreToggle {
  constructor(countToShow = Infinity) {
    this.btn = document.querySelector('.js-faq-btn-moore');
    this.hiddenCards = Array.from(document.querySelectorAll('.faq-card.is-hide'));
    this.countToShow = countToShow;
    this.init();
  }

  init() {
    if (!this.btn) return;

    this.btn.addEventListener('click', () => {
      this.btn.classList.add('is-hide');

      const cardsToShow = this.hiddenCards.splice(0, this.countToShow);
      cardsToShow.forEach(card => {
        card.classList.remove('is-hide');
      });
    });
  }
}