/**
 * Initializes a WebSocket connection to the server and sets up event handlers.
 *
 * Creates a new WebSocket instance connected to the server. 
 * Registers handlers for the open, message, and error events.
 * The message handler parses the JSON data and displays it.
 * A form is set up to send messages to the server when submitted.
*/
/**
 * Initializes a WebSocket connection, sets up event handlers for messages, 
 * provides a function to display received messages in the chat window,
 * and handles submitting messages to send via the WebSocket.
*/
let websocket = new WebSocket("ws://localhost:8080"); // Adjust port if needed

websocket.onopen = () => {
    console.log("WebSocket connection opened!");
}

websocket.onmessage = (event) => {
    let message = JSON.parse(event.data);
    displayMessage(message);
}

function displayMessage(message) {
    let chatWindow = document.getElementById('chat-window');
    let newMessage = document.createElement('p');
    newMessage.textContent = message.username + ": " + message.text;
    chatWindow.appendChild(newMessage);
}

let messageForm = document.getElementById('message-form');
messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let messageInput = document.getElementById('message-input');
    let message = { username: "You", text: messageInput.value }; // Placeholder username
    websocket.send(JSON.stringify(message));
    messageInput.value = '';
});