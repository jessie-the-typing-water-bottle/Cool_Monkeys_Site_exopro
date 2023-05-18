//Monkeys are cool
//exoprogamer

// Get canvas element
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size to match window
canvas.width = 1600
canvas.height = 200

// Generate random colors
function getRandomColor() {
    return '#6C3B00';
    }



// Create array to store particles
let particles = [];

// Create particle class
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    // Update particle position
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    }

    // Draw particle on canvas
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Create particles and animate them
function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();

        // Remove particles that move offscreen
        if (particles[i].x + particles[i].radius < 0 ||
            particles[i].x - particles[i].radius > canvas.width ||
            particles[i].y + particles[i].radius < 0 ||
            particles[i].y - particles[i].radius > canvas.height) {
            particles.splice(i, 1);
            i--;
        }
    }

    // Call animate function recursively
    requestAnimationFrame(animate);
}

// Listen for mouse movement and create particles
canvas.addEventListener("mousemove", function (event) {
    const particleCount = 2;
    const radius = Math.random() * 8 + 1;

    for (let i = 0; i < particleCount; i++) {
        const color = getRandomColor();
        const velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
        };
        particles.push(
            new Particle(event.clientX, event.clientY, radius, color, velocity)
        );
    }
});

// Start animation
animate();
