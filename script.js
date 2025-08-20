const container = document.querySelector('.container');
const gridSizeButton = document.querySelector('#grid-size-btn')
const randomColorsButton = document.querySelector('#randomize-btn')
const darkenButton = document.querySelector('#darken-btn')

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


gridSizeButton.addEventListener('click', () => {

    const n = prompt("Number of squares per side:", 16);

    container.replaceChildren() // delete children

    for (let i = 0; i < n; i++) {
        const row = document.createElement('div')
        row.classList.add('row-div')
        container.appendChild(row)
        rows.push(row)
    }

    rows.forEach((row) => {
        for (let i = 0; i < n; i++) {
            const pixel = document.createElement('div')
            pixel.classList.add('pixel')
            row.appendChild(pixel);
        }
    })

    let pixels = document.querySelectorAll('.pixel')

    pixels.forEach((box) => {
        box.addEventListener('mouseenter', () => {
            box.style.backgroundColor = 'blue'
        })
    })

})


randomColorsButton.addEventListener('click', () => {
    document.querySelectorAll('.pixel').forEach((pixel) => {
        pixel.addEventListener('mouseenter', () => {
            const color = getRandomColors();
            pixel.style.backgroundColor = color
        })
    })
})


darkenButton.addEventListener('click', () => {
    document.querySelectorAll('.pixel').forEach((pixel) => {
        pixel.addEventListener('mouseenter', () => {
            if (pixel.style.opacity === "") pixel.style.opacity = 1;
            if (pixel.style.opacity > 0) pixel.style.opacity -= 0.1
        })
    })
})