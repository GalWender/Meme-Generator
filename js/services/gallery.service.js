'use strict'
let flxibleText = ['i like falafel!', 'god damn!', 'jiggle wiggle', 'oh snap', 'hehe that dog', 'LMAO', 'frogy wogy', 'what are those', 'hop hop', 'funny buns', 'LOL', 'your mum', 'oew pew', 'penny weeny', 'loco coco']
let gFilterBy = ''
function searchByKeywords() {

}

function flexible() {
    window.scrollTo(0, 0)
    setImg(getRandomImg())
    const elmodalEditor = document.querySelector('.meme-editor-modal')
    const elGallery = document.querySelector('.gallery-container')
    const elmodalSaved = document.querySelector('.saved-memes-tab-modal')
    elmodalEditor.classList.remove('hidden')
    const count = makeRandomLinesCount()
    makeRandomLines(count)
    renderMeme()
    elGallery.classList.add('hidden')
    elmodalSaved.classList.add('hidden')
    resizeCanvas()
}

function makeRandomLineText() {
    let idx = getRandomInt(0, 16)
    return flxibleText[idx]
}

function makeRandomLinesCount() {
    return getRandomInt(1, 3)
}

function getRandomImg() {
    let idx = getRandomInt(1, 19)
    
    return document.querySelector(`.img${idx}`)
}

function makeRandomLines(linesCount) {
    if (linesCount === 1) {
        gMeme.lines[0] =
        {
            txt: makeRandomLineText(),
            size: 50,
            align: 'center',
            stroke: 'black',
            fill: 'white',
            font: 'impact',
            pos: { x: gElCanvas.width / 2, y: gElCanvas.height / 5 },
            isDragging: false,
            lineWidth: 0,
            lineHeight: 0
        }

    }
    if (linesCount === 2) {
        gMeme.lines[0] =
        {
            txt: makeRandomLineText(),
            size: 50,
            align: 'center',
            stroke: 'black',
            fill: 'white',
            font: 'impact',
            pos: { x: gElCanvas.width / 2, y: gElCanvas.height / 5 },
            isDragging: false,
            lineWidth: 0,
            lineHeight: 0
        }
        gMeme.lines[1] =
        {
            txt: makeRandomLineText(),
            size: 50,
            align: 'center',
            stroke: 'black',
            fill: 'white',
            font: 'impact',
            pos: { x: gElCanvas.width / 2, y: gElCanvas.height },
            isDragging: false,
            lineWidth: 0,
            lineHeight: 0
        }
    }
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getImgsForDisplay() {
    let imgs
    imgs = gImgs.filter(img => img.keywords.includes(gFilterBy))
    if(gFilterBy==='') return gImgs
    return imgs
}

function saveFilterToStorage() {
    saveToStorage('filter', gFilterBy)
}


