console.log('Hello from script.js!')

let popup = document.getElementsByClassName('popup')[0]
let input = document.getElementsByClassName('popup-input')[0]
let title = document.getElementsByClassName('popup-title')[0]

window.addEventListener('message', (event) => {
    let data = event.data
    console.log('Message received: ' + data)

    if (data.type === 'show') {

        popup.style.display = 'block'
        input.focus()
        title.innerText = data.title || ''
        input.value = data.value || ''

    } else if (data.type === 'hide') {

        popup.style.display = 'none'

    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        fetch(`http://${GetParentResourceName()}/cancel`, {
            method: 'POST'
        })
    } else if (event.key === 'Enter') {
        fetch(`http://${GetParentResourceName()}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value: input.value })
        })
    }
});
