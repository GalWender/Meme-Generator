'use strict'

const xxxs = 0.58, xxs = 0.66, xs = 0.76, xm = 0.8, xxm = 0.84, xl = 0.87, xxl = 0.6

let gImgs = [
    { id: 1, url: 'img/meme-imgs/1.jpg', keywords: ['politicians', 'angry'], size: xxxs },
    { id: 2, url: 'img/meme-imgs/2.jpg', keywords: ['animals', 'sweet'], size: xxs },
    { id: 3, url: 'img/meme-imgs/3.jpg', keywords: ['animals', 'sweet', 'sleep', 'baby'], size: xxl },
    { id: 4, url: 'img/meme-imgs/4.jpg', keywords: ['animals', 'sleep'], size: xxs },
    { id: 5, url: 'img/meme-imgs/5.jpg', keywords: ['baby', 'angry'], size: xxs },
    { id: 6, url: 'img/meme-imgs/6.jpg', keywords: ['happy', 'excited', 'tv'], size: xl },
    { id: 7, url: 'img/meme-imgs/7.jpg', keywords: ['baby', 'surprised'], size: xs },
    { id: 8, url: 'img/meme-imgs/8.jpg', keywords: ['happy', 'excited'], size: xxl },
    { id: 9, url: 'img/meme-imgs/9.jpg', keywords: ['happy', 'excited', 'conspiracy'], size: xxs },
    { id: 10, url: 'img/meme-imgs/10.jpg', keywords: ['happy', 'politicians'], size: xxm },
    { id: 11, url: 'img/meme-imgs/11.jpg', keywords: ['angry', 'fight'], size: xs },
    { id: 12, url: 'img/meme-imgs/12.jpg', keywords: ['explain', 'tv', 'righteous', 'celeb'], size: xm },
    { id: 13, url: 'img/meme-imgs/13.jpg', keywords: ['celeb', 'happy'], size: xxs },
    { id: 14, url: 'img/meme-imgs/14.jpg', keywords: ['celeb', 'tv', 'movie', 'surprised'], size: xxm },
    { id: 15, url: 'img/meme-imgs/15.jpg', keywords: ['celeb', 'tv', 'movie', 'explain'], size: xxs },
    { id: 16, url: 'img/meme-imgs/16.jpg', keywords: ['celeb', 'tv', 'movie', 'happy', 'excited'], size: xm },
    { id: 17, url: 'img/meme-imgs/17.jpg', keywords: ['politicians', 'explain'], size: xm },
    { id: 18, url: 'img/meme-imgs/18.jpg', keywords: ['tv', 'explain', 'surprised'], size: xs },
]

let gKeywords = mapKeywords(gImgs)

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
    return gMeme
}

function getImgs() {
    return gImgs
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
    elInput.placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
    elInput.value = ''
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
    renderMemeWithoutBorder()
    setTimeout(() => {
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
        toSavedMemes()  
    }, 500);
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-canvas'
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

function isClicked(clickedPos, lineIdx) {
    const pos = gMeme.lines[lineIdx].pos
    let { lineWidth, lineHeight } = gMeme.lines[lineIdx]
    lineWidth = lineWidth / 2
    lineHeight = lineHeight / 2
    if (clickedPos.x >= pos.x - lineWidth && clickedPos.x <= pos.x + lineWidth && clickedPos.y >= pos.y - lineHeight *2.7 && clickedPos.y <= pos.y + lineHeight) {
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


function checkSelectedLineClick(pos) {
    gMeme.lines.forEach((line, idx) => {
        if (isClicked(pos, idx)) {
            gMeme.selectedLineIdx = idx //use find index to get idx
        }
    })
}

function clearLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx,1) 
    switchLine()
}

function addAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
    switch (align) {
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width / 2
            break
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = 0 + (gElCanvas.width/5)
            break
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width - (gElCanvas.width/5)
            break
    }
}

function getKeywords() {
    return gKeywords
}

function mapKeywords() {
    var res = gImgs.reduce(function (obj, currObj) {
        currObj.keywords.forEach(keyword => {
            if (!obj[keyword]) {
                obj[keyword] = 20
            } else {
                    obj[keyword]++
            }
        })
        return obj
    }, {})
    return res
}

function saveKeywordsToStorage() {
    saveToStorage('keywords', gKeywords)
}

function updateKeyword(keyword,newSize) {
    gKeywords[keyword] = newSize
    saveKeywordsToStorage()
}

function loadKeywordsToStorage() {
    const keywords = loadFromStorage('keywords')
    if (keywords) {
        gKeywords = keywords
    }
    //add else in first case 
}

