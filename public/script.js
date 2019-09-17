const socket = io('localhost:3000');

const author = (() => {
    let result  = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < 10; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
})();

const renderMessage = (message, isMe) => {
    document.querySelector('.messages').insertAdjacentHTML('beforeend', `
        <p><strong>${message.author}</strong>: ${message.message}</p>
    `)
}

const handleSubmit = event => {
    event.preventDefault();

    const message = document.querySelector('.your-message').value;

    if (!message) return;
    
    const messageObject = {
        author,
        message
    };

    renderMessage(messageObject, true);
    
    document.querySelector('.your-message').value = '';

    socket.emit('sendMessage', messageObject);
}

const renderPreviousMessages = messages => {
    for (message of messages) {
        renderMessage(message);
    }
}

socket.on('receivedMessage', renderMessage);
socket.on('previousMesssages', renderPreviousMessages)

document.querySelector('form').addEventListener('submit', handleSubmit);