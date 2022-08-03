const socket = io()

//New message
const addMessage = (e) => {
  const newMessage = {
    user: document.getElementById('username').value,
    message: document.getElementById('messageInput').value,
    date: new Date().toLocaleTimeString()
  }
  console.log(newMessage);
  socket.emit('newMessage', newMessage)
  return false
}

//Display chat history
const render = (messages) => {
  const chatHistory = messages.map(message => {
    return `<div><p><strong>${message.user}</strong> says: ${message.text}</p></div>`
  }).join(" ");
  document.getElementById('messagesContainer').innerHTML = chatHistory;
}

socket.on('showMessages', (messages) => {
    render(messages)
})