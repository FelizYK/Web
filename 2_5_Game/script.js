// blurry-loading
const bg = document.querySelector('.container')

let load = 0

let int = setInterval(blurring, 20)

function blurring() {
    load++

    if (load > 99) {
        clearInterval(int)
    }

    bg.style.filter = `blur(${scale(load, 0, 100, 20, 0)}px)`
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

// progress-steps
const progress = document.getElementById('progress')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const circles = document.querySelectorAll('.circle')

let currentActive = 1

next.addEventListener('click', () => {
    currentActive++
    if (currentActive > circles.length) {
        currentActive = circles.length
    }
    update()
})

prev.addEventListener('click', () => {
    currentActive--
    if (currentActive < 1) {
        currentActive = 1
    }
    update()
})

function update() {
    circles.forEach((circle, idx) => {
        if (idx < currentActive) {
            circle.classList.add('active')
            progress.disabled = false
        } else {
            circle.classList.remove('active')
            progress.disabled = true
        }
    })

    const actives = document.querySelectorAll('.circle.active')

    progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%'

    if (currentActive === 1) {
        prev.disabled = true
    } else if (currentActive === circles.length) {
        next.disabled = true
    } else {
        prev.disabled = false
        next.disabled = false
    }
}