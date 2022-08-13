'use strict'

function renderGallery() {
    let imgs = getImgsForDisplay()
    let strHTMLs = imgs.map(img => {
        return `
        <img id="${img.id}" class="img img${img.id}" onclick="onImgSelect(this)" src="${img.url}" alt="">
        `
    }).join('')
    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = strHTMLs
}

function onImgSelect(elImg) {
    gmemeReset()
    setImg(elImg)
    const elmodalEditor = document.querySelector('.meme-editor-modal')
    const elGallery = document.querySelector('.gallery-container')
    const elmodalSaved = document.querySelector('.saved-memes-tab-modal')
    elmodalEditor.classList.remove('hidden')
    renderMeme()
    let elInput = document.querySelector('[name="text-input"]')
    // elInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
    elGallery.classList.add('hidden')
    elmodalSaved.classList.add('hidden')
    resizeCanvas()
}

function toGallery(){
    gmemeReset()
    const elInput = document.querySelector('[name="text-input"]')
    elInput.value = ''
    const elmodalEditor = document.querySelector('.meme-editor-modal')
    const elGallery = document.querySelector('.gallery-container')
    const elmodalSaved = document.querySelector('.saved-memes-tab-modal')
    elGallery.classList.remove('hidden')
    elmodalEditor.classList.add('hidden')
    elmodalSaved.classList.add('hidden')
}

function onFlexible() {
    flexible()
}

function onSetFilter() {
    const elSearch = document.querySelector('[name="search-input"]')
    setFilter(elSearch.value)
    saveFilterToStorage()
    renderGallery()
}
