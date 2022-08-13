'use strict'
let flxibleText = ['i like falafel!', 'god damn!', 'jiggle wiggle', 'oh snap', 'hehe that dog', 'LMAO','frogy wogy', 'what are those','hop hop', 'funny buns', 'LOL', 'your mum', 'oew pew', 'penny weeny','loco coco' ]

function searchByKeywords() {

}

function flexible() {
    setImg(getRandomImg())
    const elmodal = document.querySelector('.meme-editor-modal')
    const elbody = document.querySelector('body')
    elmodal.classList.remove('hidden')
    const count = makeRandomLinesCount()
    makeRandomLines(count)
    renderMeme()
    window.scrollTo(0,0)
    elbody.style.overflow = 'hidden'
}

function makeRandomLineText() {
    let idx = getRandomInt(0,16)
    return flxibleText[idx]
}

function makeRandomLinesCount() {
    return getRandomInt(1,3)
}

function getRandomImg() {
    let idx = getRandomInt(1,19)
    return document.querySelector(`.img${idx}`)
}

function makeRandomLines(linesCount) {
    if(linesCount===1){
        gMeme.lines[0] = 
        {
            txt: makeRandomLineText(),
            size: 50,
            align: 'center',
            stroke: 'black',
            fill: 'white',
            font: 'impact',
            pos:{ x: gElCanvas.width / 2, y: gElCanvas.height / 5 },
            isDragging:false,
            lineWidth:0,
            lineHeight:0
        }
        
    }
    if(linesCount===2){
        gMeme.lines[0] = 
        {
            txt: makeRandomLineText(),
            size: 50,
            align: 'center',
            stroke: 'black',
            fill: 'white',
            font: 'impact',
            pos:{ x: gElCanvas.width / 2, y: gElCanvas.height / 5 },
            isDragging:false,
            lineWidth:0,
            lineHeight:0
        }
        gMeme.lines[1] = 
        {
            txt: makeRandomLineText(),
            size: 50,
            align: 'center',
            stroke: 'black',
            fill: 'white',
            font: 'impact',
            pos:{ x: gElCanvas.width / 2, y: gElCanvas.height},
            isDragging:false,
            lineWidth:0,
            lineHeight:0
        }
    }
}

