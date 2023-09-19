let canvas = document.getElementById('milkyWay');
let ctx = canvas.getContext('2d');

// Set canvas to full browser window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to hold stars
let stars = [];

// Create star objects
for(let i = 0; i < 2000; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        brightness: Math.random()
    });
}

// Function to draw stars
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();
    });
}

// Function to draw tapered spiral
function drawSpiral(centerX, centerY, angleOffset, color) {
    const spiralRadius = Math.min(centerX, centerY) * .8;
    let angle = angleOffset;

    // Draw spiral as sequence of arcs
    let r = 0;
    while (r < spiralRadius) {
        let circleRadius = (spiralRadius * 15) / (r + 190);
        angle += 0.1;
        let x = centerX + r * Math.cos(angle);
        let y = centerY + r * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(x, y, circleRadius, 0, Math.PI * 2, false); // radius of arc decreases slower with r
        ctx.fillStyle = color;
        ctx.fill();

        r += circleRadius / 2; // ensure the circles overlap
    }
}

// Draw galaxy spirals
function drawGalaxy() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const numSpirals = 8;

    for(let i = 0; i < numSpirals; i++) {
        const angleOffset = (Math.PI * 2 / numSpirals) * i;
        drawSpiral(centerX, centerY, angleOffset, `hsla(${240 + i * 7}, 100%, 50%, 0.5)`); // interpolate colors
    }
}

// Redraw stars and galaxy every 60ms
setInterval(() => {
    drawStars();
    drawGalaxy();
}, 60);