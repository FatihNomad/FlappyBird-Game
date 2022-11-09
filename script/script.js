const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const bird = new Image()
const bg = new Image()
const fg = new Image()
const pipeUp = new Image()
const pipeBottom = new Image()


bird.src = './img/bird.png'
bg.src = './img/bg.png'
fg.src = './img/fg.png'
pipeUp.src = './img/pipeUp.png'
pipeBottom.src = './img/pipeBottom.png'

const fly = new Audio()
const score_audio = new Audio()

fly.src = './audio/fly.mp3'
score_audio.src = './audio/score.mp3'

let score = 0

//Создание труб
const pipe = []
pipe[0] = {
    x: canvas.width,
    y: 0,
}

//Позиционирвование птички
let xPos = 10
let yPos = 150
let gap = 100
let grav = 1.3
const moveUp = () => {
    yPos -= 50
}

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32 || event.keyCode === 38 || event.keyCode === 13)
        moveUp()
    fly.play()
})

const draw = () => {
    context.drawImage(bg, 0, 0)
    context.drawImage(bird, xPos, yPos)
    context.drawImage(fg, 0, canvas.height - fg.height)


    for (let i = 0; i < pipe.length; i++) {
        context.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)
        pipe[i].x--



        if (pipe[i].x == 100) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }


        //Отслеживание прикосновений 
        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= canvas.height - fg.height) {

            location.reload()
        }
        if (pipe[i].x == 5) {
            score++
            score_audio.play()
        }

    }

    context.fillText('Score: ' + score, 10, canvas.height - 20)
    context.fillStyle = '#000'
    context.font = '24px Verdana'
    yPos += grav
    requestAnimationFrame(draw)
}

pipeBottom.onload = draw