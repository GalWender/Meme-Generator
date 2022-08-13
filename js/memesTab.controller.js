'use strict'

function toSavedMemes() {
    const elmodalEditor = document.querySelector('.meme-editor-modal')
    const elGallery = document.querySelector('.gallery-container')
    const elmodalSaved = document.querySelector('.saved-memes-tab-modal')
    window.scrollTo(0, 0)
    elmodalSaved.classList.remove('hidden')
    elGallery.classList.add('hidden')
    elmodalEditor.classList.add('hidden')
    renderSavedMemes()
}

function renderSavedMemes() {
    let memesEdit = loadFromStorage('memesEdit')
    let memes = loadFromStorage('memes')
    console.log('now', memesEdit)
    if (!memes) { return }
    let strHTMLs = memes.map((meme, idx) => {
        return `
        <img id="${memesEdit[idx].selectedImgId}" class="img" onclick="onSavedMemeClick(this)" src="${meme}" alt="">
        `
    }).join('')
    const elSavedMemes = document.querySelector('.saved-memes-grid-container')
    elSavedMemes.innerHTML = strHTMLs
}

function onSavedMemeClick(elImage) {
    let memesEdit = loadFromStorage('memesEdit')
    // gmemeReset()
    gMeme.selectedImgId = +elImage.id
    memesEdit.forEach(edit => {
        if (edit.selectedImgId === gMeme.selectedImgId) {
            gMeme.lines = edit.lines
            gMeme.selectedLineIdx = edit.selectedLineIdx
            const elInput = document.querySelector('[name="text-input"]')
            elInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
        }
    })
    let img = new Image()
    img.src = elImage.src
    console.log(img.src)
    img.onload = () => {
        drawImgFromSaved(elImage)
    }
    const elmodalEditor = document.querySelector('.meme-editor-modal')
    const elGallery = document.querySelector('.gallery-container')
    const elmodalSaved = document.querySelector('.saved-memes-tab-modal')
    elmodalEditor.classList.remove('hidden')
    elGallery.classList.add('hidden')
    elmodalSaved.classList.add('hidden')
    console.log('gmeme', gMeme)
}
 