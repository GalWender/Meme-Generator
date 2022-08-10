'use strict'

function init(){

}

function toggleMenu() {
    const elMenu = document.querySelector('.toggle-menu')
    document.body.classList.toggle('menu-opened')
    if(document.body.classList.contains('menu-opened')){
        elMenu.innerText = 'X'
    }
    else{elMenu.innerText = '☰'}
}