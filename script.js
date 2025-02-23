
const app = document.getElementById("app") // Pega o elemento da página onde o conteúdo será inserido

// Lista de usuários cadastrados
const users = [
  {
    email: "test@teste.com",
    phone: "999999999999",
    ref: 100, // Código de referência do usuário
    refBy: null // Indica que este usuário não foi convidado por ninguém
  },
  {
    email: "tust@tust.com",
    phone: "999999999999",
    ref: 200,
    refBy: 100 // Foi convidado pelo usuário com ref 100
  },
  {
    email: "tost@tust.com",
    phone: "999999999999",
    ref: 300,
    refBy: 200 // Foi convidado pelo usuário com ref 200
  }
]

// Função que procura um usuário pelo e-mail
const getUser = (userData) => {
  return users.find((user) => {
    return user.email == userData.email
  })
}

// Função que conta quantas pessoas se cadastraram usando um código de referência
const getTotalSubscribers = (userData) => {
  const subs = users.filter((user) => {
    return user.refBy == userData.ref
  })
  return subs.length
} 

// Função que exibe a tela de convite quando um usuário se cadastra
const showInvite = (userData) => {
  app.innerHTML = `
  <main>
    <h3>Inscrição confirmada!</h3>

    <p>
      Convide mais pessoas e concorra a prêmios! <br>
      Compartilhe o link e acompanhe as inscrições:
    </p>

    <div class="input-group">
      <label for="link">
        <img src="link.svg" alt="Ícone de link">
      </label>
      <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled>
    </div>

    <section class="stats">
      <h3>${getTotalSubscribers(userData)}</h3>
      <p>Inscrições feitas</p>
    </section>
  </main>
  ` 

  app.setAttribute("class", "page-invite") // Adiciona uma classe CSS para estilização
  updateImageLinks() // Atualiza os links das imagens
}

// Função que salva um novo usuário na lista
const saveUser = (userData) => {
  const newUser = {
    ...userData, // Copia os dados que já existem
    ref: Math.round(Math.random() * 4000), // Gera um código de referência aleatório
    refBy: 100 // Define um código de referência padrão
  }
  users.push(newUser) // Adiciona o novo usuário à lista
  console.log(users) // Exibe os usuários no console para verificação
  return newUser
}

// Função que lida com o envio do formulário
const formAction = () => {
  const form = document.getElementById("form") // Pega o formulário
  form.onsubmit = (event) => {
    event.preventDefault() // Impede o recarregamento da página

    // Pega os dados digitados no formulário
    const formData = new FormData(form)
    const userData = {
      email: formData.get("email"),
      phone: formData.get("phone"),
    } 

    // Verifica se o usuário já existe
    const user = getUser(userData)
    if(user) {
      showInvite(user) // Se já existir, mostra a tela de convite
    } else {
      const newUser = saveUser(userData) // Se não existir, cadastra um novo usuário
      showInvite(newUser) // Exibe a tela de convite para ele
    }
  }
}

// Função que atualiza os links das imagens para um caminho correto
const updateImageLinks = () => {
  document.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute("src"); 
    if (src && !src.startsWith("http")) {  
      img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`;
    }
  });
};

// Função que inicia a página inicial
const startApp = () => {
  const content = `
    <main>
      <section class="about">
        <div class="section-header">
          <h2>Sobre o evento</h2>
          <span class="badge">AO VIVO</span>
        </div>
        <p>
          Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. 
          Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
          <br><br>
          Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito
        </p>
      </section>

      <section class="registration">
        <h2>Inscrição</h2>

        <form id="form">
          <div class="input-wrapper">
            <div class="input-group">
              <label for="email">
                <img src="mail.svg" alt="Ícone de e-mail">
              </label>
              <input type="email" id="email" name="email" placeholder="E-mail" required>
            </div>

            <div class="input-group">
              <label for="phone">
                <img src="phone.svg" alt="Ícone de telefone">
              </label>
              <input type="text" id="phone" name="phone" placeholder="Telefone" required>
            </div>
          </div>

          <button type="submit">
            Confirmar
            <img src="arrow.svg" alt="Seta para a direita">
          </button>
        </form>
      </section>
    </main>
  `

  app.innerHTML = content // Insere o conteúdo na página
  app.setAttribute("class", "page-start") // Adiciona uma classe CSS para estilização
  updateImageLinks() // Atualiza os links das imagens
  formAction() // Ativa o formulário para capturar os dados
}

startApp() // Inicia a aplicação quando a página carrega

// Quando clicar no cabeçalho, volta para a tela inicial
document.querySelector("header").onclick = () => startApp()
