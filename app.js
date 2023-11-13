class Message {
  constructor() {
    this.userMessages = JSON.parse(localStorage.getItem('userMessages')) || [];
    this.userMessageForm = document.querySelector('form');
    this.userMessagesList = document.querySelector('ul');
    this.xssCheckbox = document.getElementById('controlCheck');

    this.initialize();
  }

  initialize() {
    this.userMessageForm.addEventListener('submit', this.formSubmitHandler.bind(this));
    this.renderMessages();
    console.log(this.allStorage());
  }

  renderMessages() {
    const messageItems = this.userMessages.map((message) => this.createMessageElement(message));
    this.userMessagesList.innerHTML = messageItems.join('');
  }

  createMessageElement(message) {
    const sanitizedText = this.xssCheckbox.checked ? this.sanitizeHTML(message.text) : message.text;
    return `
      <li class="message-item">
        <p>${sanitizedText}</p>
      </li>
    `;
  }

  formSubmitHandler(event) {
    event.preventDefault();
    const userMessageInput = event.target.querySelector('textarea');
    const userMessage = userMessageInput.value.trim();

    if (!userMessage) {
      alert('Upišite poruku!');
      return;
    }

    this.userMessages.push({ text: userMessage });
    userMessageInput.value = '';

    localStorage.setItem('userMessages', JSON.stringify(this.userMessages));
    this.renderMessages();
  }

  allStorage() {
    return Object.values(localStorage);
  }

  sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

localStorage.clear();

const messageApp = new Message();