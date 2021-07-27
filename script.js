const vertical = document.querySelector('.vertical-lines');
const horizontal = document.querySelector('.horizontal-lines');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const w = canvas.width;
const h = canvas.height;

const pixel = 20;

const Xlen = w / pixel;
const Ylen = h / pixel;

let coord = { x: 0, y: 0 };

ctx.fillStyle = 'black';

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mouseup', stop);

window.onload = init();
function init() {
    for (let i = 1; i < Xlen; i++) {
        horizontal.innerHTML += `<span style="top: ${pixel * i}px;"></span>`
        
    }

    for (let i = 1; i < Ylen; i++) {
        vertical.innerHTML += `<span style="left: ${pixel * i}px;"></span>`
    }
}

function reposition(e) {
	coord.x = Math.floor(e.offsetX / pixel);
	coord.y = Math.floor(e.offsetY / pixel);
}

function start(e) {
	canvas.addEventListener('mousemove', draw);

	reposition(e);
}

function stop() {
	canvas.removeEventListener('mousemove', draw);
}

function draw(e) {
	ctx.fillRect(pixel * coord.x, pixel * coord.y, pixel, pixel);
	reposition(e);
}

function reset() {
    ctx.clearRect(0, 0, w, h);
}

function download() {
    const link = document.createElement('a');
    link.download = 'untitled.png';
    link.href = canvas.toDataURL();
    link.click();
}

const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'
	default: '#000000',

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            hsva: true,
            cmyk: true,
            input: true,
            clear: true,
            save: true
        }
    }
});

pickr.on('save', (color, instance) => {
    ctx.fillStyle = color.toHEXA().toString();
});