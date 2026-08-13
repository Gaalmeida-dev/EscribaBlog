<div align="center">

  # 📝 Escriba Blog

  **Uma plataforma full-stack moderna para criação, compartilhamento e interação através de blogs.**

  [🚀 Acesse o projeto online](https://escriba-blog.vercel.app/) • [📂 Repositório GitHub](https://github.com/Gaalmeida-dev/EscribaBlog)

  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
  ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
  ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

<br />

---

## 📌 Sobre o Projeto

O **Escriba** é uma aplicação web de blogging desenvolvida de ponta a ponta. A plataforma permite que usuários publiquem seus próprios artigos, sigam outros autores, personalizem seus perfis e consumam conteúdos em uma interface limpa, responsiva e com suporte a modo escuro.

O projeto foi construído focando em boas práticas de arquitetura, integração eficiente entre front-end e back-end, segurança da informação e documentação padronizada de API.

---

## ✨ Funcionalidades Principais

- 🔐 **Autenticação Segura:** Cadastro e login utilizando Tokens JWT e criptografia de senhas com `bcrypt`.
- ✍️ **Gestão de Posts:** Criação, edição, leitura e remoção de posts (CRUD completo com integração via API).
- 👤 **Sistema de Perfil:** Gerenciamento de dados do usuário e personalização de perfil.
- 👥 **Rede de Seguidores:** Opção de seguir e deixar de seguir outros criadores de conteúdo.
- 🌙 **Modo Noturno / Dark Mode:** Alternância fluida de temas para melhor conforto visual.
- 📱 **Interface Responsiva:** Design otimizado para dispositivos móveis e desktops com Tailwind CSS.
- 📑 **Documentação Interativa:** Endpoints mapeados e testados via Swagger e Postman.

---

## 🛠️ Tecnologias Utilizadas

### **Front-end**
- **[React](https://reactjs.org/)** (com **[Vite](https://vitejs.dev/)**) — Performance e componentização eficiente.
- **[Tailwind CSS](https://tailwindcss.com/)** — Estilização moderna e responsiva.
- **JavaScript (ES6+)** — Lógica do cliente.

### **Back-end**
- **[Node.js](https://nodejs.org/)** + **Express** — Infraestrutura e rotas da aplicação.
- **[MongoDB](https://www.mongodb.com/)** — Banco de dados NoSQL flexível e escalável.
- **JWT (JSON Web Token) & Bcrypt** — Autenticação e segurança.
- **[Swagger](https://swagger.io/)** — Documentação e testes de endpoints da API.

---

## 📂 Estrutura do Projeto

```text
EscribaBlog/
├── backend/            # Servidor Node.js, rotas, controllers e models MongoDB
│   ├── src/
│   │   ├── config/     # Conexão com banco e middlewares
│   │   ├── controllers/# Lógica de negócio das rotas
│   │   ├── models/     # Schemas do MongoDB
│   │   └── routes/     # Definição de endpoints
│   └── swagger.json    # Configuração da documentação Swagger
│
└── frontend/           # Aplicação React com Vite e Tailwind CSS
    └── src/
        ├── assets/     # Estilos e imagens estáticas
        ├── components/ # Componentes reutilizáveis (Navbar, Footer, etc.)
        ├── pages/      # Páginas da aplicação (Feed, Profile, Auth)
        └── services/   # Configuração de chamadas de API (Axios/Fetch)
```

---

## 🚀 Como Executar o Projeto Localmente

### **Pré-requisitos**
Antes de começar, certifique-se de ter instalado em sua máquina:
- **Node.js** (versão 18 ou superior)
- **Git**
- Conta ou instância local do **MongoDB**

### **1. Clonar o Repositório**
```bash
git clone https://github.com/Gaalmeida-dev/EscribaBlog.git
cd EscribaBlog
```

### **2. Configurar o Back-end**
```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Inicie o servidor em modo de desenvolvimento
npm run dev
```
> 💡 **Nota:** Crie um arquivo `.env` na raiz da pasta `backend` e preencha as variáveis de ambiente necessárias:
> ```env
> MONGODB_URI=sua_uri_do_mongodb
> JWT_SECRET=sua_chave_secreta
> PORT=5000
> ```

### **3. Configurar o Front-end**
```bash
# Abra um novo terminal e entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie a aplicação React
npm run dev
```

Acesse a aplicação no seu navegador através de: `http://localhost:5173`.

---

## 📖 Documentação da API

A API do Escriba conta com documentação interativa via Swagger. 

Com o back-end em execução local, você pode testar todas as rotas e payloads acessando:
👉 `http://localhost:5000/api-docs`

---

## 👤 Autor

Desenvolvido por **Gabriel Almeida**.

- **GitHub:** [@Gaalmeida-dev](https://github.com/Gaalmeida-dev)
- **Projeto Online:** [Escriba Blog no Vercel](https://escriba-blog.vercel.app/)
