(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Default color is white
  const starColor = canvas.dataset.color || "white";

  let stars = [];
  function resetStars() {
    const count = Math.max(90, Math.floor(window.innerWidth / 10));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.6 + 0.2,
      speed: Math.random() * 0.6 + 0.2,
      twinkle: Math.random() * 0.8
    }));
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    resetStars();
  }
  window.addEventListener('resize', resize);
  resize();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = starColor;
    for (let s of stars) {
      const alpha = 0.6 + Math.sin((Date.now() / 500) + s.twinkle) * 0.4;
      ctx.globalAlpha = Math.max(0.2, Math.min(1, alpha));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      s.y += s.speed;
      if (s.y > canvas.height + 10) {
        s.y = -10;
        s.x = Math.random() * canvas.width;
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();
