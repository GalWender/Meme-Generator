'use strict'

function toSavedMemes() {
    gCurrLine=0
    const elmodalEditor = document.querySelector('.meme-editor-modal')
    const elbody = document.querySelector('body')
    const elGallery = document.querySelector('.gallery-container')
    const elmodalSaved = document.querySelector('.saved-memes-tab-modal')
    console.log(elGallery)
    window.scrollTo(0,0)
    // elbody.style.overflow = 'none'
    elmodalSaved.classList.remove('hidden')
    elGallery.classList.add('hidden')
    elmodalEditor.classList.add('hidden')
}
