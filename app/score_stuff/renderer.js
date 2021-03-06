let OSMD = require('opensheetmusicdisplay').OSMD
const {electron} = require('electron')
const {ipcRenderer} = require('electron')
const checkNested = require('./../util/check-nested.js')
const {dialog} = require('electron').remote

let libPath
ipcRenderer.send('read-file')
ipcRenderer.send('back-to-lib-window')


ipcRenderer.on('back-to-lib-window-reply', (event, arg) => {
  libPath = arg
})

ipcRenderer.on('read-file-reply', (event, arg) => {
  let fileData = arg['fileData']

  try{
    let scoreElem = document.querySelector("#main-score")
    let osmd = new OSMD(scoreElem)
    osmd.load(fileData, true)
    osmd.render()
    document.querySelector("h1").remove()
  }catch(err){
    console.log(err)
    dialog.showErrorBox('Tananã - erro', err.message)
  }
  //TODO get title from osmd
  let title = false
  title = title? title + " | Tananã" : "Tananã | Música Desconhecida"
  document.title = title
})

let backButton = document.querySelector("#back-button")

function goBack(){
  if(libPath) ipcRenderer.send('open-lib', libPath)
  else ipcRenderer.send('open-main-window')
}

backButton.addEventListener('click', goBack)

window.addEventListener('keyup', (ev) => {
  // escape key
  if (ev.keyCode === 27) goBack()
  else return false
})
