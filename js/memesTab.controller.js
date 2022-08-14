'use strict'

function toSavedMemes() {
    toggleMenu()
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
    savedMemeClick(elImage)
    const elmodalEditor = document.querySelector('.meme-editor-modal')
    const elGallery = document.querySelector('.gallery-container')
    const elmodalSaved = document.querySelector('.saved-memes-tab-modal')
    elmodalEditor.classList.remove('hidden')
    elGallery.classList.add('hidden')
    elmodalSaved.classList.add('hidden')
    resizeCanvas()
}
 