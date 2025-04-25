# 📇 CRM de Contatos

Sistema de gerenciamento de contatos (CRM) moderno, responsivo e escalável, desenvolvido com as melhores práticas de frontend e foco total na experiência do usuário.

---

## 🧠 Visão Geral

Este projeto é uma aplicação frontend construída com **React**, **Next.js**, **TypeScript** e **Tailwind CSS**. O objetivo é oferecer um sistema de CRM completo com funcionalidades como autenticação, dashboard com gráficos, visualização e gerenciamento de contatos, relatórios e personalização de interface.

---

## 🚀 Stack Tecnológica

### Frontend

- **React** — Interface declarativa e baseada em componentes
- **Next.js** — SSR, rotas baseadas em arquivos e otimizações de performance
- **TypeScript** — Tipagem estática para maior segurança e produtividade
- **Tailwind CSS** — Utilitários para construção de UI rápida e responsiva
- **Lucide React** — Ícones modernos em SVG para interfaces

### Gerenciamento de Estado

- **React Context API** — Estados globais como autenticação e tema
- **React Hooks** — `useState`, `useEffect`, `useContext`, entre outros

### Visualização de Dados

- **Recharts** — Gráficos interativos e responsivos (barra, linha, pizza)
- **shadcn/ui Chart** — Componentes personalizados para visualização de dados

### Roteamento

- **Next.js App Router** — Roteamento baseado em arquivos
- **useRouter** & **usePathname** — Navegação e contexto da rota atual

### Autenticação

- **JWT (simulado)** — Gerenciamento de sessões via token
- **localStorage** — Armazenamento persistente do token

### Temas e Personalização

- Tema **claro/escuro** com detecção automática
- Escolha da **cor primária** personalizada
- Uso de **variáveis CSS** para aplicação consistente de temas

---

## 🧩 Estrutura do Projeto

```plaintext
/app
  /dashboard              -> Página principal com métricas
  /contatos
    /[id]                 -> Visualização e edição de contato
    /novo                 -> Criação de novo contato
  /relatorios             -> Gráficos e relatórios de uso
  /configuracoes          -> Preferências do sistema
  /login                  -> Página de autenticação
  /layout.tsx             -> Estrutura global da aplicação
  /globals.css            -> Estilos globais
  /page.tsx               -> Redirecionamento padrão

/components
  /auth
    auth-provider.tsx     -> Contexto de autenticação
  /layout
    main-layout.tsx       -> Estrutura com sidebar + header
    sidebar.tsx           -> Menu lateral
  /theme
    theme-provider.tsx    -> Contexto de tema e cores
  /contacts
    contact-detail-modal.tsx -> Detalhes rápidos do contato
  /ui
    /chart                -> Componentes gráficos (Recharts)

public/
  avatar-placeholder.png  -> Imagem default para contatos

```
## 📋 Funcionalidades

### 📁 Gerenciamento de Contatos

- Listagem com paginação, pesquisa e filtros
- Categorização por tipo
- Adição, edição e exclusão de contatos
- Visualização detalhada via modal

### 📊 Dashboard

- Cards com indicadores principais
- Gráficos de distribuição
- Lista de contatos recentes

### 📈 Relatórios

- Crescimento mensal
- Distribuição por categoria
- Atividades por dia da semana

### 🎨 Personalização

- Alternância de temas (claro/escuro)
- Escolha de cor primária
- Idioma, região e preferências de notificação

### 🔐 Segurança

- Login com token JWT (mockado)
- Timeout de sessão
- Estrutura pronta para 2FA
- Gerenciamento básico de senhas

### 📥 Importação/Exportação

- Importação de contatos via CSV
- Exportação em formatos comuns
- Backup local automático (simulado)

---

## 🛠️ Funcionalidades de Desenvolvimento

- Carregamento assíncrono com estados de loading
- Validação de formulários em tempo real
- Feedback visual (toasts, alerts)
- Design 100% responsivo
- Acessibilidade garantida com navegação por teclado e screen readers

---

## 🎭 Simulações e Mocks

> Este projeto é voltado para fins de demonstração e prototipação. Algumas funcionalidades são simuladas para facilitar testes:

- API simulada com dados mockados
- Persistência com `localStorage`
- Autenticação fictícia com JWT
- Operações CRUD não persistentes

---

## 📌 Considerações Finais

Este CRM de Contatos foi projetado para servir como base sólida para sistemas de gerenciamento de dados. Ele combina uma arquitetura moderna com uma interface profissional e personalizável. Ideal para estudos, testes de UI/UX e expansão para soluções reais com backend.
