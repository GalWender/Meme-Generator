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
    setImg(elImg)
    const elmodal = document.querySelector('.meme-editor-modal')
    const elbody = document.querySelector('body')
    elmodal.classList.add('open')
    renderMeme()
    window.scrollTo(0,0)
    elbody.style.overflow = 'hidden'
}

function toGallery(){
    gCurrLine=0
    const elmodal = document.querySelector('.meme-editor-modal')
    const elbody = document.querySelector('body')
    elmodal.classList.remove('open')
    elbody.style.overflow = 'none'
}

function onSearchByKeywords() {

}

function onFlexible() {
    flexible()
    renderMeme()
}