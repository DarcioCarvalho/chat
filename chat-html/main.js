const conversation = [
  {
    message: "Olá, tudo bem? <br>Que bacana ter você aqui utilizando o projeto Chat. 😁 <br><br><strong>Com quem eu falo, por gentileza?</strong>",
  },
  {
    message: `<strong>Você também gosta de Desenvolvimento Front-End?</strong><br><br>[ 1 ] - SIM<br>[ 2 ] - NÃO`,
    options: [1, 2],
  },
  {
    message: "<strong>Show!!!</strong> 🚀🚀🚀 <br>Programação sempre foi apaixonante para mim. <br><br>Conheça meu Github acessando https://github.com/DarcioCarvalho <br>e se quiser conversar sobre tecnologias como <strong>Javascript, React.js, Next.js,<br> Typescript</strong> entre outras, você consegue me acha no <br><br> <strong> - linkedin:</strong> https://www.linkedin.com/in/darcio-nuno-carvalho <br> <strong> - Discord:</strong> Dárcio Nuno de Carvalho#1749 <br> <strong> - e-mail:</strong> darcio.nuno@gmail.com",
  },
  {
    message: "Puxa, é mesmo!!!😏 <br> É uma pena que não goste sobre esse assunto tão fascinante. <br><br>Se você conhece algum amigo que goste desse tema,<br> compartilhe o endereço do projeto Chat e também os meus contatos: <br><br> <strong> - linkedin:</strong> https://www.linkedin.com/in/darcio-nuno-carvalho <br> <strong> - Discord:</strong> Dárcio Nuno de Carvalho#1749 <br> <strong> - e-mail:</strong> darcio.nuno@gmail.com",
  }
];
let indexConversation = -1;
let userName = "";

function reloadPage() {
  location.reload();
}

function focusToInput() {
  const input = document.querySelector("#message-sender input");
  input.focus();
}

function send() {
  const callList = document.querySelector("#calls-list");
  const input = document.querySelector("#message-sender input");
  const message = input.value;

  if (!message)
    return

  callList.innerHTML += callCreate(message, "you" /* "Mensagem gerada automaticamente!!! 😁" */);

  callList.innerHTML += callCreate(getConversation(message), "contact")

  callList.scrollTo(0, callList.scrollHeight);

  input.value = "";
  const chat = document.querySelector("#chat")
  chat.focus();
}

function callCreate(message, caller) {
  const time = Intl.DateTimeFormat("pt-br", {
    hour: "numeric",
    minute: "numeric"
  }).format();
  const user = caller === "you" ? "Você" : "Dárcio";

  return `<div id="call" class="${caller}">
  <span class="caller">${user} - ${time}</span>

  <div class="message">
    ${message}
  </div>
</div>`;
}

function getConversation(message) {
  if (indexConversation === 0) {
    userName = message;
  }

  switch (indexConversation) {
    case -1:
    case 0:
      indexConversation++;
      return indexConversation === 0 ?
        conversation[indexConversation].message :
        `<strong>${userName}</strong>, <br><br> ${conversation[indexConversation].message}`;
    case 1:
      if (!conversation[indexConversation].options.find((option) => option == message))
        return `Não compreendi a sua resposta.🤔<br> ${conversation[indexConversation].message.slice(82)}`;

      indexConversation++;
      return conversation[Number(message) + 1].message;
    default:
      return `<strong>${userName}</strong>, agradeço por acessar o <strong>Projeto Chat</strong>!!!<br><br>Recarregue a página clicando no [X] no canto superior direito do chat 😉`;
  }

}

const input = document.querySelector("#message-sender input");
console.log('input: ', input)
input.addEventListener("keypress", (event) => {
  if (event.key === 'Enter') {
    console.log("Passei aqui")
    send();
  }
})