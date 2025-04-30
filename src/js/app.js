/**
 * !(i)
 * The code is included in the final file only when a function is called, for example: FLSFunctions.spollers();
 * Or when the entire file is imported, for example: import "files/script.js";
 * Unused code does not end up in the final file.

 * If we want to add a module, we should uncomment it.
 */

import { SetVH } from './modules/SetVH.js';
import BaseHelpers from './helpers/BaseHelpers.js';
import initWOW from './modules/WOW.js';
import { WowCounter } from './modules/WowCounter';
import SliderInit from './modules/SliderInit.js';
import PopupManager from './modules/PopupManager.js';

// set vh
SetVH();

// check webp/loaded page/device type
BaseHelpers.checkWebpSupport();
BaseHelpers.addTouchClass();
BaseHelpers.addLoadedClass();

document.addEventListener('DOMContentLoaded', function() {
  // wow animation
  initWOW(190);
  WowCounter();
  // slider init
  SliderInit('.js-slider-courses-init', {
    speed: 1800,
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
      slideChangeTransitionStart: function () {
        if (window.innerWidth <= 768) return;

        this.slides.forEach((slide, index) => {
          const slideOffset = index - this.activeIndex;

          const offsetAbs = Math.abs(slideOffset);
          const baseAngle = 7;
          const baseTranslateY = 16;

          const rotation = slideOffset * baseAngle * 0.8;
          const translateY = `${Math.pow(offsetAbs, 1.56) * baseTranslateY}rem`;
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
        if (window.innerWidth <= 768) return;
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
      769: {
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
  // modal init
  new PopupManager();
});