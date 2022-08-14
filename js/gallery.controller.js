'use strict'

function renderGallery() {
    let imgs = getImgsForDisplay()
    let strHTMLs = imgs.map(img => {
        return `
        <img id="${img.id}" class="img img${img.id} ${img.size}" onclick="onImgSelect(this)" src="${img.url}" alt="">
        `
    }).join('')
    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = strHTMLs
}

function onImgSelect(elImg) {
    window.scrollTo(0, 0)
    gmemeReset()
    setImg(elImg)
    const elmodalEditor = document.querySelector('.meme-editor-modal')
    const elGallery = document.querySelector('.gallery-container')
    const elmodalSaved = document.querySelector('.saved-memes-tab-modal')
    elmodalEditor.classList.remove('hidden')
    renderMeme()
    elGallery.classList.add('hidden')
    elmodalSaved.classList.add('hidden')
    resizeCanvas()
}

function toGallery() {
    toggleMenu()
    window.scrollTo(0, 0)
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

function onMore() {
    let elKeywords = document.querySelector('.more-keywords')
    if (elKeywords.style.display === 'none') {
        elKeywords.style.display = 'flex'
        document.querySelector('.more').innerText = 'less...'
    } else {
        elKeywords.style.display = 'none'
        document.querySelector('.more').innerText = 'more...'
    }
}

function onKeyword(elKeyword, keyword) {
    let style = window.getComputedStyle(elKeyword, null).getPropertyValue('font-size')
    let currentSize = parseFloat(style)
    const newSize = currentSize + 10
    elKeyword.style.fontSize = (newSize) + 'px'
    let imgs = setFilter(keyword)
    updateKeyword(keyword, newSize)
    renderGallery(imgs)
}

function renderKeywords() {
    let keywords = getKeywords()
    console.log(keywords)
    let strHTML = ''
    for (const key in keywords) {
        strHTML += `<div class="keyword" style="font-size:${keywords[key]}px" onclick="onKeyword(this, '${key}')">${key}</div>`
    }

    let elContainer = document.querySelector('.keywords-container')
    elContainer.innerHTML = strHTML
    document.querySelector('.more-keywords').style.display = 'none'
}
