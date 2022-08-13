'use strict'

function savedMemeClick(elImage) {
    let memesEdit = loadFromStorage('memesEdit')
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
}