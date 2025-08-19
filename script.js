const container = document.querySelector('.container');

const n = 16;
let rows = [];

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

const pixels = document.querySelectorAll('.pixel')

pixels.forEach((box) => {
    box.addEventListener('mouseover', () => {
        box.setAttribute('style', 'background-color: blue')
    })
})
