/**
 * !(i)
 * The code is included in the final file only when a function is called, for example: FLSFunctions.spollers();
 * Or when the entire file is imported, for example: import "files/script.js";
 * Unused code does not end up in the final file.

 * If we want to add a module, we should uncomment it.
 */

import BaseHelpers from './helpers/BaseHelpers.js';
import SliderInit from './modules/SliderInit.js';
import initLightbox from './modules/LightBox.js';
import FaqCard from './modules/FaqCard.js';
import FaqMoreToggle from './modules/FaqMoreToggle.js';
import VideoPlayer from './modules/VideoPlayer.js';

// check webp/loaded page/device type
BaseHelpers.checkWebpSupport();
BaseHelpers.addTouchClass();
BaseHelpers.addLoadedClass();

document.addEventListener('DOMContentLoaded', function() {

  // slider init
  SliderInit('.js-slider-courses-init', {
    speed: 4000,
    slidesPerView: 7,
    centeredSlides: true,
    loop: true,
    spaceBetween: 0,
    autoplay: {
      delay: 0,
      enabled: true,
      disableOnInteraction: false,
    },
    freeMode: false,
    allowTouchMove: false,
    loopAdditionalSlides: 3,
    on: {
      init: function () {
        this.slides.forEach(slide => {
          slide.style.transition = 'none';
        });

        this.emit('slideChangeTransitionStart');

        requestAnimationFrame(() => {
          this.slides.forEach(slide => {
            slide.style.transition = '';
          });
        });
      },
      slideChangeTransitionStart: function () {
        this.slides.forEach((slide, index) => {
          const slideOffset = index - this.activeIndex;
          const offsetAbs = Math.abs(slideOffset);

          const baseAngle = 7;
          const baseTranslateY = 16;

          const rotation = slideOffset * baseAngle * 0.8;

          const translateMultiplier = (offsetAbs > 2) ? 1.2 : 1;

          const translateY = `${Math.pow(offsetAbs, 1.56) * baseTranslateY * translateMultiplier}rem`;

          const zIndex = 100 - offsetAbs;

          let transform = '';

          if (slideOffset !== 0) {
            transform = `rotate(${rotation}deg) translate(0, ${translateY})`;
          } else {
            transform = `rotate(0deg) translate(0, 5rem)`;
          }

          slide.style.transform = transform;
          slide.style.zIndex = zIndex;
        });
      },

      slideChangeTransitionEnd: function () {
        this.emit('slideChangeTransitionStart');
      },
    },

    breakpoints: {
      0: {
        slidesPerView: 'auto',
        spaceBetween: 0,
        centeredSlides: true,
        allowTouchMove: true,
        loop: true,
        autoplay: {
          delay: 0,
          enabled: true,
          disableOnInteraction: false,
        },
        on: {},
      },
      992: {
        slidesPerView: 7,
        centeredSlides: true,
        loop: true,
        allowTouchMove: false,
        autoplay: {
          delay: 0,
          enabled: true,
          disableOnInteraction: false,
        },
      }
    }
  });
  SliderInit('.js-slider-marquee-init', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    centeredSlides: false,
    loop: true,
    loopedSlides: 20,
    speed: 6000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    freeMode: true,
    freeModeMomentum: false,
  });
  SliderInit('.js-slider-courses-typical-init', {
    speed: 3000,
    slidesPerView: 'auto',
    centeredSlides: false,
    loop: true,
    spaceBetween: 0,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    allowTouchMove: false,
    freeMode: true,
    freeModeMomentum: false,
    loopedSlides: 10,
    breakpoints: {
      0: {
        spaceBetween: 0,
      },
      768: {
        spaceBetween: 0,
      }
    }
  });
  SliderInit('.js-slider-reviews-video-init', {
    slidesPerView: 3,
    spaceBetween: 0,
    navigation: {
      nextEl: '.js-slider-reviews-video-next',
      prevEl: '.js-slider-reviews-video-prev',
    },
    loop: true,
    autoplay: false,
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        centeredSlides: true,
      },
      992: {
        slidesPerView: 3,
        centeredSlides: false,
      }
    }
  });

  let reviewsSlider = null;
  let servicesSlider = null;

  function initMobileSliders() {
    const isMobile = window.matchMedia('(max-width: 992px)').matches;

    if (isMobile && !reviewsSlider) {
      reviewsSlider = SliderInit('.js-slider-reviews-init', {
        slidesPerView: 1.2,
        spaceBetween: 0,
        loop: true,
        autoplay: false,
        centeredSlides: true,
      });
    } else if (!isMobile && reviewsSlider) {
      reviewsSlider.destroy(true, true);
      reviewsSlider = null;
    }

    if (isMobile && !servicesSlider) {
      servicesSlider = SliderInit('.js-slider-services-init', {
        slidesPerView: 1.2,
        spaceBetween: 0,
        loop: true,
        autoplay: false,
        centeredSlides: true,
      });
    } else if (!isMobile && servicesSlider) {
      servicesSlider.destroy(true, true);
      servicesSlider = null;
    }
  }

  initMobileSliders();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initMobileSliders, 200);
  });

  // lightbox image gallery
  initLightbox();

  // faq card
  new FaqCard();

  // show faq cards
  new FaqMoreToggle();

  // video playey play/pause
  VideoPlayer();
});