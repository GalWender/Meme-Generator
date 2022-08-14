'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
let gElCanvas
let gCtx
let gStartPos
let gSavedEdits = []

function init() {
    loadKeywordsToStorage()
    renderKeywords()
    renderGallery()
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')
    gStartPos = { x: gElCanvas.width / 2, y: gElCanvas.height / 5 }
    addListeners()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
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
    const pos = getEvPos(ev)
    checkSelectedLineClick(pos)
    if (!isClicked(pos, gMeme.selectedLineIdx)) return
    setDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'crosshair'
}

function onMove(ev) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (!line.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    document.body.style.cursor = 'crosshair'
    renderMeme()
}

function onUp() {
    setDrag(false)
    document.body.style.cursor = 'auto'
}




//gets meme and 
function renderMeme() {
    let img = new Image()
    let meme = getMeme()
    if (!meme) return
    let objImg = gImgs.find(obj => obj.id === meme.selectedImgId)
    img.src = objImg.url
    if (gMeme.lines[gMeme.selectedLineIdx].pos === null) {
        gMeme.lines[gMeme.selectedLineIdx].pos = { x: gElCanvas.width / 2, y: gElCanvas.height / 7 }
    }
    img.onload = () => {
        gElCanvas.height = img.height * objImg.size
        drawImg(gMeme.selectedImgId) //img,x,y,xend,yend
        gMeme.lines.forEach((line) => drawText(line.txt, line.pos.x, line.pos.y, line.fill, line.stroke, line.font, line.size, 'center'))
        gMeme.lines[gMeme.selectedLineIdx].lineWidth = measureLineWidth()
        gMeme.lines[gMeme.selectedLineIdx].lineHeight = measureLineHeight()
        switch (gMeme.lines[gMeme.selectedLineIdx].align) {
            case 'center':
                drawRect(gMeme.lines[gMeme.selectedLineIdx].pos.x - (gMeme.lines[gMeme.selectedLineIdx].lineWidth / 2) - 15, gMeme.lines[gMeme.selectedLineIdx].pos.y - gMeme.lines[gMeme.selectedLineIdx].lineHeight / 2 - 30, gMeme.lines[gMeme.selectedLineIdx].lineWidth + 30, gMeme.lines[gMeme.selectedLineIdx].lineHeight + 30)
                break;
            case 'left':
                drawRect(gMeme.lines[gMeme.selectedLineIdx].pos.x - (gMeme.lines[gMeme.selectedLineIdx].lineWidth / 2) - 20, gMeme.lines[gMeme.selectedLineIdx].pos.y - gMeme.lines[gMeme.selectedLineIdx].lineHeight / 2 - 30, gMeme.lines[gMeme.selectedLineIdx].lineWidth + 30, gMeme.lines[gMeme.selectedLineIdx].lineHeight + 30)
                break;
            case 'right':
                drawRect(gMeme.lines[gMeme.selectedLineIdx].pos.x - (gMeme.lines[gMeme.selectedLineIdx].lineWidth / 2) - 15, gMeme.lines[gMeme.selectedLineIdx].pos.y - gMeme.lines[gMeme.selectedLineIdx].lineHeight / 2 - 30, gMeme.lines[gMeme.selectedLineIdx].lineWidth + 30, gMeme.lines[gMeme.selectedLineIdx].lineHeight + 30)
                break;
        }
        
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

function onAddSticker(stiker) {
    addSticker(stiker)
    renderMeme()
}

function onSwichLine() {
    switchLine()
    renderMeme()
}

function onAlignLeft() {
    addAlign('right')
    renderMeme()
}

function onAlignCenter() {
    addAlign('center')
    renderMeme()
}

function onAlignRight() {
    addAlign('left')
    renderMeme()
}

function onTrash() {
    document.querySelector('[name="text-input"]').value = ''
    clearLine()
    renderMeme()
}



