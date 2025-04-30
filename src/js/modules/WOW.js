import { WOW } from 'wowjs';

export default function initWOW(offset = 150) {
  const wow = new WOW({
    offset: offset,
  });
  wow.init();
}