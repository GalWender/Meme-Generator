'use strict'

function renderGallery() {
    let imgs = gImgs
    let strHTMLs = imgs.map(img => {
        return `
        <img id="${img.id}" class="img img${img.id}" onclick="onImgSelect(this)" src="${img.url}" alt="">
        `
    }).join('')
    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = strHTMLs
}

function onImgSelect(elImg) {
    // console.log(elImg)
    setImg(elImg)
    const elmodalEditor = document.querySelector('.meme-editor-modal')
    const elbody = document.querySelector('body')
    const elGallery = document.querySelector('.gallery-container')
    const elmodalSaved = document.querySelector('.saved-memes-tab-modal')
    elmodalEditor.classList.remove('hidden')
    renderMeme()
    // window.scrollTo(0,0)
    // elbody.style.overflow = 'none'
    elGallery.classList.add('hidden')
    elmodalSaved.classList.add('hidden')
}

function toGallery(){
    gCurrLine=0
    const elmodalEditor = document.querySelector('.meme-editor-modal')
    const elbody = document.querySelector('body')
    const elGallery = document.querySelector('.gallery-container')
    const elmodalSaved = document.querySelector('.saved-memes-tab-modal')
    elGallery.classList.remove('hidden')
    elmodalEditor.classList.add('hidden')
    elmodalSaved.classList.add('hidden')
}

function onSearchByKeywords() {

}

function onFlexible() {
    flexible()
}