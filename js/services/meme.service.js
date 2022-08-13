'use strict'
let gCurrLine = 0;




let gImgs = [
    { id: 1, url: 'img/meme-imgs/1.jpg', keywords: ['politicians', 'angry'] },
    { id: 2, url: 'img/meme-imgs/2.jpg', keywords: ['animals', 'sweet'] },
    { id: 3, url: 'img/meme-imgs/3.jpg', keywords: ['animals', 'sweet', 'sleep', 'baby'] },
    { id: 4, url: 'img/meme-imgs/4.jpg', keywords: ['animals', 'sleep'] },
    { id: 5, url: 'img/meme-imgs/5.jpg', keywords: ['baby', 'angry'] },
    { id: 6, url: 'img/meme-imgs/6.jpg', keywords: ['happy', 'excited', 'tv'] },
    { id: 7, url: 'img/meme-imgs/7.jpg', keywords: ['baby', 'surprised'] },
    { id: 8, url: 'img/meme-imgs/8.jpg', keywords: ['happy', 'excited'] },
    { id: 9, url: 'img/meme-imgs/9.jpg', keywords: ['happy', 'excited', 'conspiracy'] },
    { id: 10, url: 'img/meme-imgs/10.jpg', keywords: ['happy', 'politicians'] },
    { id: 11, url: 'img/meme-imgs/11.jpg', keywords: ['angry', 'fight'] },
    { id: 12, url: 'img/meme-imgs/12.jpg', keywords: ['explain', 'tv', 'righteous', 'celeb'] },
    { id: 13, url: 'img/meme-imgs/13.jpg', keywords: ['celeb', 'happy'] },
    { id: 14, url: 'img/meme-imgs/14.jpg', keywords: ['celeb', 'tv', 'movie', 'surprised'] },
    { id: 15, url: 'img/meme-imgs/15.jpg', keywords: ['celeb', 'tv', 'movie', 'explain'] },
    { id: 16, url: 'img/meme-imgs/16.jpg', keywords: ['celeb', 'tv', 'movie', 'happy', 'excited'] },
    { id: 17, url: 'img/meme-imgs/17.jpg', keywords: ['politicians', 'explain'] },
    { id: 18, url: 'img/meme-imgs/18.jpg', keywords: ['tv', 'explain', 'surprised'] },
];

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Top Text',
            size: 50,
            align: 'center',
            stroke: 'black',
            fill: 'white',
            font: 'impact',
            pos: null,
            isDrag: false,
            lineWidth: 0,
            lineHeight: 0
        }]
}


function setLineText(currStr, lineWidth) {
    gMeme.lines[gMeme.selectedLineIdx].txt = currStr
    gMeme.lines[gMeme.selectedLineIdx].lineWidth = lineWidth
}


function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;
}

function getCurrLine() {
    return gMeme.lines[gCurrLine];
}

function createLine() {
    return {
        txt: 'New Line',
        size: 50,
        align: 'center',
        stroke: 'black',
        fill: 'white',
        font: 'Impact',
        pos: { x: (gElCanvas.width / 2), y: gElCanvas.height },
        isDrag: false,
        lineWidth: 0,
        lineHeight: 0
    }
}

function createStickerLine(stiker) {
    return {
        txt: stiker,
        size: 50,
        align: 'center',
        stroke: 'black',
        fill: 'white',
        font: 'Impact',
        pos: { x: (gElCanvas.width / 2), y: gElCanvas.height / 2 },
        isDrag: false,
        lineWidth: 0,
        lineHeight: 0
    }
}

function setImg(elImg) {
    gMeme.selectedImgId = +elImg.id
}

function setStroke(stroke) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = stroke
}

function setFill(fill) {
    gMeme.lines[gMeme.selectedLineIdx].fill = fill
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function increaseFont() {
    const currSize = gMeme.lines[gMeme.selectedLineIdx].size
    if (currSize < 82) {
        gMeme.lines[gMeme.selectedLineIdx].size += 4
    }
}

function decreaseFont() {
    const currSize = gMeme.lines[gMeme.selectedLineIdx].size
    if (currSize > 30) {
        gMeme.lines[gMeme.selectedLineIdx].size -= 4
    }
}

function addLine() {
    let elInput = document.querySelector('[name="text-input"]')
    gMeme.selectedLineIdx++
    let line = createLine()
    gMeme.lines.push(line)
    elInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function addSticker(stiker) {
    gMeme.selectedLineIdx++
    let line = createStickerLine(stiker)
    gMeme.lines.push(line)
}

function switchLine() {
    let elInput = document.querySelector('[name="text-input"]')
    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = gMeme.lines.length
    }
    gMeme.selectedLineIdx--
    elInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function measureLineWidth() {
    gCtx.font = `${gMeme.lines[gMeme.selectedLineIdx].size}px ${gMeme.lines[gMeme.selectedLineIdx].font}`
    let txtWidth = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt)
    console.log('text width', txtWidth.width)
    return txtWidth.width
}

function measureLineHeight() {
    gCtx.font = `${gMeme.lines[gMeme.selectedLineIdx].size}px ${gMeme.lines[gMeme.selectedLineIdx].font}`
    let txtHeight = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt)

    console.log('height', txtHeight.fontBoundingBoxAscent - txtHeight.fontBoundingBoxDescent)
    return (txtHeight.fontBoundingBoxAscent - txtHeight.fontBoundingBoxDescent)
}

function saveMemesToStorage() {
    const data = gElCanvas.toDataURL()
    let memes = loadFromStorage('memes')
    if (memes) {
        memes.push(data)
        saveToStorage('memes', memes)
    }
    else {
        saveToStorage('memes', [data])
    }
    let memesEdit = loadFromStorage('memesEdit')
    if (memesEdit) {
        memesEdit.push(gMeme)
        saveToStorage('memesEdit', memesEdit)
    }
    else {
        saveToStorage('memesEdit', [gMeme])
    }
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-canvas';
}

function gmemeReset() {
    gMeme.selectedLineIdx = 0
    gMeme.lines = [{
        txt: 'Top Text',
        size: 50,
        align: 'center',
        stroke: 'black',
        fill: 'white',
        font: 'impact',
        pos: null,
        isDrag: false,
        lineWidth: 0,
        lineHeight: 0
    }]
}
//............
function isClicked(clickedPos,lineIdx) {
    const pos = gMeme.lines[lineIdx].pos
    let { lineWidth, lineHeight } = gMeme.lines[lineIdx]
    lineWidth = lineWidth / 2
    lineHeight = lineHeight / 2
    if (clickedPos.x >= pos.x - lineWidth && clickedPos.x <= pos.x + lineWidth && clickedPos.y >= pos.y - lineHeight && clickedPos.y <= pos.y + lineHeight) {
        // gMeme.selectedLineIdx = i
        return true
    }
}

function setDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function checkSelectedLineClick(pos){
    gMeme.lines.forEach((line,idx) => {
        if(isClicked(pos,idx)){
            gMeme.selectedLineIdx = idx
        }
    })
}