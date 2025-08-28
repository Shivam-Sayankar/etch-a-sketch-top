const sketchPad = document.querySelector('.sketch-pad')

const gridSizeRange = document.querySelector('#grid-size-range')
const gridSizeSpan = document.querySelector('#grid-size-span')

const colorPicker = document.querySelector('#color-picker')
const clearButton = document.querySelector('#clear-btn')

const randomColorsCheckbox = document.querySelector('#randomize-checkbox')
const darkenCheckbox = document.querySelector('#darken-checkbox')
const gridCheckbox = document.querySelector('#grid-checkbox')

const brushTriggerRadioButtons = document.querySelectorAll('.brush-trigger-radio')

const gridColor = "#212121"
let brushTriggerEvent = "mouseenter"

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

    let rows = []

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

    applyColorOnEvent(brushTriggerEvent);
}


function setPixelColor(e) {
    color = colorPicker.value;
    e.target.style.backgroundColor = color;
}

function applyColorOnEvent(trigger) {
    let pixels = document.querySelectorAll('.pixel')
    pixels.forEach((pixel) => {
        pixel.addEventListener(trigger, setPixelColor)
    })
}


function decreaseOpacity(e) {
    if (e.target.style.opacity === "") e.target.style.opacity = 1;
    if (e.target.style.opacity > 0) e.target.style.opacity -= 0.1
}

function progressiveDarkening() {
    document.querySelectorAll('.pixel').forEach((pixel) => {
        pixel.addEventListener(brushTriggerEvent, decreaseOpacity)
    })
}


function setRandomBackgroundColor(e) {
    const color = getRandomColors();
    e.target.style.backgroundColor = color
}

function randomColorBrush() {
    document.querySelectorAll('.pixel').forEach((pixel) => {
        pixel.addEventListener(brushTriggerEvent, setRandomBackgroundColor)
    })
}


function clear() {
    let pixels = document.querySelectorAll('.pixel')
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = 'white';
        pixel.style.opacity = 1;
        pixel.removeEventListener(brushTriggerEvent, setRandomBackgroundColor)
        pixel.removeEventListener(brushTriggerEvent, decreaseOpacity)
    })
    randomColorsCheckbox.checked = false;
    darkenCheckbox.checked = false;
}

randomColorsCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        randomColorBrush()
    } else {
        document.querySelectorAll('.pixel').forEach((pixel) => {
            pixel.removeEventListener(brushTriggerEvent, setRandomBackgroundColor)
        })
    }
})

darkenCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        progressiveDarkening();
    } else {
        document.querySelectorAll('.pixel').forEach((pixel) => {
            pixel.removeEventListener(brushTriggerEvent, decreaseOpacity)
        })
    }
})

gridCheckbox.addEventListener('change', (e) => {
    const pixels = document.querySelectorAll('.pixel')
    if (e.target.checked) {
        pixels.forEach(pixel => pixel.style.border = `${gridColor} 0.1px solid`)
    } else {
        pixels.forEach(pixel => pixel.style.border = 0)
    }
})

colorPicker.addEventListener('change', (e) => {
    applyColorOnEvent(brushTriggerEvent);
    randomColorsCheckbox.checked = false;
});

gridSizeRange.addEventListener('input', (e) => {
    const num = parseInt(e.target.value);
    generateGrid(num);
    gridSizeSpan.textContent = `${num} x ${num}`
    gridCheckbox.checked = true;
});

brushTriggerRadioButtons.forEach(radio => {
    radio.addEventListener('change', e => {
        let oldTriggerEvent = brushTriggerEvent;
        brushTriggerEvent = e.target.value

        const pixels = document.querySelectorAll('.pixel')
        pixels.forEach(pixel => {
            pixel.removeEventListener(oldTriggerEvent, setPixelColor)
            pixel.removeEventListener(oldTriggerEvent, decreaseOpacity)
            pixel.removeEventListener(oldTriggerEvent, setRandomBackgroundColor)
            darkenCheckbox.checked = false;
            randomColorsCheckbox.checked = false;

            pixel.addEventListener(brushTriggerEvent, setPixelColor)
        })
    })
})

clearButton.addEventListener('click', clear)

generateGrid(gridSizeRange.value);