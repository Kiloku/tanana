const fs = require('fs')
const readdir = require('recursive-readdir')
const {dialog} = require('electron').remote
const {ipcRenderer} = require('electron')

let buttonExample = document.getElementById('open-example')
let buttonlibrary = document.getElementById('button-library')

buttonlibrary.addEventListener('click', function(){
  libPath = dialog.showOpenDialog({properties: ['openDirectory']})[0]
  ipcRenderer.send('open-lib', libPath)
})

buttonExample.addEventListener('click', function(){
  ipcRenderer.send('open-file', {path:'examples/teste.xml'})
})
