const sketchPad = document.querySelector('.sketch-pad');
const gridSizeButton = document.querySelector('#grid-size-btn')
const gridSizeRange = document.querySelector('#grid-size-range')
const randomColorsButton = document.querySelector('#randomize-btn')
const darkenButton = document.querySelector('#darken-btn')
const colorPicker = document.querySelector('#color-picker')
const gridSizeSpan = document.querySelector('#grid-size-span')
const clearButton = document.querySelector('#clear-btn')

let rows = [];

function getRandomColors() {
    let colorCode = "#";
    const chars = "0123456789ABCDEF";

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        colorCode += chars[randomIndex];
    }

    return colorCode;
}


function generateGrid(n) {

    sketchPad.replaceChildren() // delete previous children

    for (let i = 0; i < n; i++) {
        const row = document.createElement('div')
        row.classList.add('row-div')
        sketchPad.appendChild(row)
        rows.push(row)
    }

    rows.forEach((row) => {
        for (let i = 0; i < n; i++) {
            const pixel = document.createElement('div')
            pixel.classList.add('pixel')
            row.appendChild(pixel);
        }
    })

    applyColorOnEvent('mouseenter', colorPicker.value);
}

function applyColorOnEvent(trigger, color) {

    let pixels = document.querySelectorAll('.pixel')
    pixels.forEach((pixel) => {
        pixel.addEventListener(trigger, () => {
            pixel.style.backgroundColor = color;
        })
    })

}


function progressiveDarkening() {
    document.querySelectorAll('.pixel').forEach((pixel) => {
        pixel.addEventListener('mouseenter', () => {
            if (pixel.style.opacity === "") pixel.style.opacity = 1;
            if (pixel.style.opacity > 0) pixel.style.opacity -= 0.1
        })
    })
}


function randomColorBrush() {
    document.querySelectorAll('.pixel').forEach((pixel) => {
        pixel.addEventListener('mouseenter', () => {
            const color = getRandomColors();
            pixel.style.backgroundColor = color
        })
    })
}


function clear() {
    let pixels = document.querySelectorAll('.pixel')
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = 'white';
        pixel.style.opacity = 1;
    })
}

gridSizeRange.addEventListener('click', (e) => {
    const num = parseInt(e.target.value);
    generateGrid(num);
    gridSizeSpan.textContent = `${num}x${num}`
})

randomColorsButton.addEventListener('click', () => randomColorBrush())
darkenButton.addEventListener('click', () => progressiveDarkening())
clearButton.addEventListener('click', () => clear())
colorPicker.addEventListener('change', (e) => {
    const currentColor = e.target.value;
    applyColorOnEvent('mouseenter', currentColor)
});

generateGrid(gridSizeRange.value);