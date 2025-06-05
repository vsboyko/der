export default function initMarquees() {
  const marquees = document.querySelectorAll(".js-marquee-init");

  marquees.forEach((marquee) => {
    const row = marquee.querySelector(".u-marquee__row");
    const originalCol = row.querySelector(".u-marquee__col");

    const config = parseMarqueeData(marquee.dataset.marquee);
    const copyCount = config.copy || 2;
    const speed = config.speed || 6;

    originalCol.style.animationDuration = `${speed}s`;

    for (let i = 1; i < copyCount; i++) {
      const clone = originalCol.cloneNode(true);
      clone.style.animationDuration = `${speed}s`;
      row.appendChild(clone);
    }
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
