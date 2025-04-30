export function WowCounter() {
  const counters = document.querySelectorAll('.js-wow-counter');

  counters.forEach(counter => {
    const start = parseFloat(counter.dataset.animationStart) || 0.2;
    const step = parseFloat(counter.dataset.animationStep) || 0.2;

    const children = Array.from(counter.children);
    children.forEach((child, index) => {
      const delay = (start + step * index).toFixed(1);
      child.setAttribute('data-wow-delay', `${delay}s`);
    });
  });
}