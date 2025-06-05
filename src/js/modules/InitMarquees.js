export default function initMarquees() {
  const marquees = document.querySelectorAll(".js-marquee-init");

  marquees.forEach((marquee) => {
    const row = marquee.querySelector(".u-marquee__row");
    const originalCol = row.querySelector(".u-marquee__col");

    const config = parseMarqueeData(marquee.dataset.marquee);
    const copyCount = config.copy || 1;
    const speed = config.speed || 0.5;

    for (let i = 1; i < copyCount; i++) {
      const clone = originalCol.cloneNode(true);
      row.appendChild(clone);
    }

    const totalWidth = originalCol.offsetWidth * copyCount;
    row.style.width = `${totalWidth}px`;

    let offset = 0;
    let paused = false;
    let inViewport = false;

    const animate = () => {
      if (!paused && inViewport) {
        offset -= speed;
        if (Math.abs(offset) >= originalCol.offsetWidth) {
          offset = 0;
        }
        row.style.transform = `translateX(${offset}px)`;
      }
      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
      },
      { rootMargin: "0px", threshold: 0 }
    );

    observer.observe(marquee);

    const rect = marquee.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      inViewport = true;
    }

    marquee.addEventListener("mouseenter", () => paused = true);
    marquee.addEventListener("mouseleave", () => paused = false);

    animate();
  });

  function parseMarqueeData(data) {
    const result = {};
    if (!data) return result;

    data.split(";").forEach(pair => {
      const [key, value] = pair.split(":").map(part => part.trim());
      if (key && value) {
        result[key] = isNaN(value) ? value : parseFloat(value);
      }
    });
    return result;
  }
}