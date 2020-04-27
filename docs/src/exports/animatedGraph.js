import * as d3Timer from 'd3-timer';

const d3 = { ...d3Timer };

export default function animatedGraph(canvas) {
  const context = canvas.getContext('2d');
  const { width } = canvas;
  const { height } = canvas;
  const radius = 3;
  const minDistance = 60;
  const maxDistance = 45;
  const minDistance2 = minDistance * minDistance;
  const maxDistance2 = maxDistance * maxDistance;

  const tau = 2 * Math.PI;
  const n = 200;
  const particles = new Array(n);

  for (let i = 0; i < n; ++i) {
    particles[i] = {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0,
      vy: 0
    };
  }

  return d3.timer(() => {
    context.save();
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < n; ++i) {
      const p = particles[i];
      p.x += p.vx;
      if (p.x < -maxDistance) p.x += width + maxDistance * 2;
      else if (p.x > width + maxDistance) p.x -= width + maxDistance * 2;
      p.y += p.vy;
      if (p.y < -maxDistance) p.y += height + maxDistance * 2;
      else if (p.y > height + maxDistance) p.y -= height + maxDistance * 2;
      p.vx += 0.2 * (Math.random() - 0.5) - 0.01 * p.vx;
      p.vy += 0.2 * (Math.random() - 0.5) - 0.01 * p.vy;
      context.beginPath();
      context.arc(p.x, p.y, radius, 0, tau);
      context.fillStyle = 'rgba(40,217,242,0.4)';
      context.fill();
    }

    for (let i = 0; i < n; ++i) {
      for (let j = i + 1; j < n; ++j) {
        const pi = particles[i];
        const pj = particles[j];
        const dx = pi.x - pj.x;
        const dy = pi.y - pj.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < maxDistance2) {
          context.globalAlpha =
            d2 > minDistance2
              ? (maxDistance2 - d2) / (maxDistance2 - minDistance2)
              : 1;
          context.beginPath();
          context.moveTo(pi.x, pi.y);
          context.lineTo(pj.x, pj.y);
          context.strokeStyle = 'rgba(40,217,242,0.3)';
          context.stroke();
        }
      }
    }

    context.restore();
  });
}
