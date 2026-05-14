s.length > 0) {

    snakePoints.pop();

    redrawCanvas();

    document.getElementById('info').innerText =
      `Last point removed. Remaining points: ${snakePoints.length}`;
  }
});

function drawDot(x, y, color = 'black') {

  ctx.beginPath();

  ctx.arc(x, y, 4, 0, 2 * Math.PI);

  ctx.fillStyle = color;

  ctx.fill();
}

function drawLine(p1, p2, color = 'black') {

  ctx.beginPath();

  ctx.moveTo(p1.x, p1.y);

  ctx.lineTo(p2.x, p2.y);

  ctx.strokeStyle = color;

  ctx.lineWidth = 2;

  ctx.stroke();
}

function getDistance(p1, p2) {

  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  return Math.sqrt(dx * dx + dy * dy);
}

function resetPoints() {

  scalePoints = [];
  snakePoints = [];
  pixelsPerCM = null;
}

function redrawCanvas() {

  ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(img, 0, 0);

  scalePoints.forEach(p => {
    drawDot(p.x, p.y, 'red');
  });

  if (scalePoints.length === 2) {

    drawLine(
      scalePoints[0],
      scalePoints[1],
      'red'
    );
  }

  snakePoints.forEach((p, i) => {

    drawDot(p.x, p.y, 'blue');

    if (i > 0) {

      drawLine(
        snakePoints[i - 1],
        p,
        'blue'
      );
    }
  });
}

function reset() {

  if (!img.src) return;

  resetPoints();

  redrawCanvas();

  document.getElementById('info').innerText =
    'Click two points on a known scale.';
}
