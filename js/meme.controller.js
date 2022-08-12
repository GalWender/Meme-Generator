'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
let gElCanvas
let gCtx
let gStartPos

function init() {
    renderGallery()
    gElCanvas = document.querySelector('#canvas');
    gCtx = gElCanvas.getContext('2d');
    // console.log(gCtx.font)
    window.addEventListener("resize", resizeCanvas())
    gStartPos = { x: gElCanvas.width / 2, y: gElCanvas.height / 5 }
}


function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {

}

function onMove(ev) {

}

function onUp() {

}




//gets meme and 
function renderMeme() {
    let img = new Image()
    let meme = getMeme()
    if (!meme) return
    img.src = gImgs.find(obj => obj.id === meme.selectedImgId).url
    if (gMeme.lines[gMeme.selectedLineIdx].pos === null) {
        // gMeme.lines[gMeme.selectedLineIdx].size = 50
        gMeme.lines[gMeme.selectedLineIdx].pos = { x: gElCanvas.width / 2, y: gElCanvas.height / 5 }
    }
    img.onload = () => {
        drawImg(meme.selectedImgId) //img,x,y,xend,yend
        meme.lines.forEach((line) => drawText(line.txt, line.pos.x, line.pos.y, line.fill, line.stroke, line.font, line.size, line.align))
        meme.lines[meme.selectedLineIdx].lineWidth = measureLineWidth()
        meme.lines[meme.selectedLineIdx].lineHeight = measureLineHeight()
        drawRect(meme.lines[meme.selectedLineIdx].pos.x - meme.lines[meme.selectedLineIdx].lineWidth / 2, meme.lines[meme.selectedLineIdx].pos.y - meme.lines[meme.selectedLineIdx].lineHeight + 10, meme.lines[meme.selectedLineIdx].lineWidth, meme.lines[meme.selectedLineIdx].lineHeight)
    }
}

function onRenderInputText() {
    const elInput = document.querySelector('[name="text-input"]')
    const lineWidth = gCtx.measureText(elInput).width
    let currStr = elInput.value
    setLineText(currStr, lineWidth)
    renderMeme()
}

function onChangeStroke() {
    const elStroke = document.querySelector('[name="stroke-color"]')
    setStroke(elStroke.value)
    renderMeme()
}

function onChangeFill() {
    const elFill = document.querySelector('[name="fill-color"]')
    setFill(elFill.value)
    renderMeme()
}

function onSetFont(ev, font) {
    ev.preventDefault()
    setFont(font)
    renderMeme()
}

function onIncreaseFont() {
    increaseFont()
    renderMeme()
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwichLine() {
    switchLine()
    renderMeme()
}

function onFocusCurrText() {

}
