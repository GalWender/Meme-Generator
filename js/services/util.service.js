'use strict'

function drawImg(idx) {
    const elImg = document.querySelector(`.img${idx}`);
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function drawText(text, x, y, colorFill, colorStroke, font, size, align) {
    // gCtx.beginPath();
    gCtx.lineWidth = 3;
    gCtx.strokeStyle = colorStroke;
    gCtx.fillStyle = colorFill;
    gCtx.font = `${size}px ${font}`;
    gCtx.textAlign = align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function drawRect(x, y, width, height) {
    gCtx.beginPath();
    gCtx.lineWidth = 1;
    gCtx.rect(x, y, width,height);
    // gCtx.setLineDash([4, 2]);
    gCtx.strokeStyle = 'gray';
    gCtx.stroke();
    gCtx.closePath()
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

// pos for mouse&touch 

// function getEvPos(ev) {
//     var pos = {
//         x: ev.offsetX,
//         y: ev.offsetY
//     }
//     if (gTouchEvs.includes(ev.type)) {
//         ev.preventDefault()
//         ev = ev.changedTouches[0]
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
//         }
//     }
//     return pos;
// }

function getEvPos(ev) {
    ev.preventDefault()
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (['touchstart', 'touchmove', 'touchend'].includes(ev.type)) {

        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop - 50
        }
    }
    return pos
}

// download

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'canvas';
}

// facebook

function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gElCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" 
           href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook"
           target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(function (res) {
        return res.text()
    })
    .then(onSuccess)
    .catch(function (err) {
        console.error(err)
    })
}

// toggle

function toggleMenu() {
    const elMenu = document.querySelector('.toggle-menu')
    document.body.classList.toggle('menu-opened')
    if(document.body.classList.contains('menu-opened')){
        elMenu.innerText = 'X'
    }
    else{elMenu.innerText = '☰'}
}

//resize canvas 

function resizeCanvas() {
    var elContainer = document.querySelector('.meme-canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

//stop refresh

function stopRefresh(ev) {
    ev.preventDefault()
}

function drawBorder(x, y, xEnd, yEnd) {
    gCtx.beginPath();
    gCtx.lineWidth = 1;
    // gCtx.setLineDash([10,20])
    gCtx.moveTo(x, y);
    gCtx.lineTo(xEnd, y);
    gCtx.moveTo(xEnd,y)
    gCtx.lineTo(xEnd,yEnd)
    gCtx.moveTo(xEnd,yEnd)
    gCtx.lineTo(x,yEnd)
    gCtx.moveTo(x,yEnd)
    gCtx.lineTo(x,y)
    gCtx.strokeStyle = 'gray';
    gCtx.stroke();
    gCtx.closePath();

    //doesn't work :(
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function saveAndRestoreExample() {
    gCtx.font = '50px Arial';
    gCtx.strokeStyle = 'green';
    gCtx.strokeText('Saving the context', 10, 50);
    gCtx.save();
    gCtx.font = '30px david';
    gCtx.strokeStyle = 'black';
    gCtx.strokeText('Switching to something else', 10, 100);
    gCtx.restore();
    gCtx.strokeText('Back to previous', 10, 150);
}

function drawImgFromSaved(elImg) {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}