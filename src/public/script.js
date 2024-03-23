var socket = io();

let btn = document.getElementById('btn')
let inputMsg = document.getElementById('newtext')
let textList = document.getElementById('textList')

btn.onclick = function exec() {
    socket.emit('text_sent', {
        msg: inputMsg.value
    })
}

socket.on('text_received', (data) => {
    let litext = document.createElement('li')
    litext.innerText = data.msg;
    textList.appendChild(litext)
})