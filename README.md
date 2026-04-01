# 📓 Notepad App

> Bloco de notas minimalista feito com React + Vite. Sem backend, sem banco de dados — tudo salvo direto no navegador.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=flat&logo=javascript)
)

---

## ✨ Funcionalidades

- 📝 Criar, editar e apagar notas
- 🔍 Busca em tempo real por título ou conteúdo
- 💾 Salva automaticamente no `localStorage`
- 🎨 Cor diferente para cada nota
- 📊 Contador de palavras e caracteres
- 🗓️ Data da última edição

---

## 🖥️ Preview

```
┌─────────────────┬──────────────────────────────────┐
│  📓 Notas    +  │  Título da nota                  │
│─────────────────│──────────────────────────────────│
│ 🔍 Buscar...    │                                  │
│                 │  Escreva aqui...                 │
│ ■ Nota 1        │                                  │
│   Bem-vindo!    │                                  │
│                 │                                  │
│ □ Nota 2        │──────────────────────────────────│
│   Ideia...      │  12 palavras · 68 caracteres     │
└─────────────────┴──────────────────────────────────┘
```

---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/notepad-app.git

# Entre na pasta
cd notepad-app

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173**

---

## 📦 Build para produção

```bash
npm run build
```

Os arquivos otimizados ficam em `/dist`, prontos para deploy em qualquer host estático (Vercel, Netlify, GitHub Pages etc).

---

## 🗂️ Estrutura

```
notepad-app/
├── index.html          # Página base
├── vite.config.js      # Config do Vite
├── package.json        # Dependências
└── src/
    ├── main.jsx        # Entry point
    └── App.jsx         # App completo (lógica + UI)
```

---

## 🧠 Stack

| Camada | Tecnologia |
|---|---|
| UI | React 18 + Hooks |
| Build | Vite 5 |
| Persistência | `localStorage` |
| Estilo | CSS-in-JS |
| Fontes | Google Fonts |

---

## 📄 Kayo otton

 © [Kayo otton](https://github.com/kayoottom)
