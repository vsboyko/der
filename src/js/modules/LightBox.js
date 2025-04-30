import GLightbox from 'glightbox';

export default function initLightbox() {
  GLightbox({
    selector: '.js-glightbox',
    touchNavigation: true,
    loop: true,
    closeButton: true,
  });
}