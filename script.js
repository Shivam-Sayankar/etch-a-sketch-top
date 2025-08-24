const sketchPad = document.querySelector('.sketch-pad');
const gridSizeRange = document.querySelector('#grid-size-range')
const colorPicker = document.querySelector('#color-picker')
const gridSizeSpan = document.querySelector('#grid-size-span')
const clearButton = document.querySelector('#clear-btn')
const randomColorsCheckbox = document.querySelector('#randomize-checkbox')
const darkenCheckbox = document.querySelector('#darken-checkbox')

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


function decreaseOpacity(e) {
    if (e.target.style.opacity === "") e.target.style.opacity = 1;
    if (e.target.style.opacity > 0) e.target.style.opacity -= 0.1
}

function progressiveDarkening() {
    document.querySelectorAll('.pixel').forEach((pixel) => {
        pixel.addEventListener('mouseenter', decreaseOpacity)
    })
}


function setRandomBackgroundColor(e) {
    const color = getRandomColors();
    e.target.style.backgroundColor = color
}

function randomColorBrush() {
    document.querySelectorAll('.pixel').forEach((pixel) => {
        pixel.addEventListener('mouseenter', setRandomBackgroundColor)
    })
}


function clear() {
    let pixels = document.querySelectorAll('.pixel')
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = 'white';
        pixel.style.opacity = 1;
        pixel.removeEventListener('mouseenter', setRandomBackgroundColor)
        pixel.removeEventListener('mouseenter', decreaseOpacity)
    })
    randomColorsCheckbox.checked = false;
    darkenCheckbox.checked = false;
}

randomColorsCheckbox.addEventListener('change', (e) => {

    if (e.target.checked) {
        randomColorBrush()
    } else {
        document.querySelectorAll('.pixel').forEach((pixel) => {
            pixel.removeEventListener('mouseenter', setRandomBackgroundColor)
        })
    }
})

darkenCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        progressiveDarkening();
    } else {
        document.querySelectorAll('.pixel').forEach((pixel) => {
            pixel.removeEventListener('mouseenter', decreaseOpacity)
        })
    }
})

colorPicker.addEventListener('change', (e) => {
    const currentColor = e.target.value;
    applyColorOnEvent('mouseenter', currentColor);
    randomColorsCheckbox.checked = false;
});

gridSizeRange.addEventListener('change', (e) => {
    const num = parseInt(e.target.value);
    generateGrid(num);
    gridSizeSpan.textContent = `${num}x${num}`
});

clearButton.addEventListener('click', clear)

generateGrid(gridSizeRange.value);