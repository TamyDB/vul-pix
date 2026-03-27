<a name="readme-top"></a>

<!-- BADGES -->
<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

</div>

<!-- LOGO E TÍTULO -->
<br />
<div align="center">
  <a href="https://github.com/tamydb/vul-pix">
    <img src="public/vulpixLogo.svg" alt="VulPix Logo" width="120" height="120">
  </a>

  <h1 align="center">Vul-Pix</h1>

  <p align="center">
    Plataforma de compra e venda de cartas Pokémon TCG com design intuitivo e fluxo dinâmico para colecionadores.
    <br />
    <br />
    <br />
    <a href="https://github.com/tamydb/vul-pix/issues/new?labels=bug">Reportar Bug</a>
    ·
    <a href="https://github.com/tamydb/vul-pix/issues/new?labels=enhancement">Sugerir Feature</a>
  </p>
</div>

---

## Sobre o Projeto

<!-- Substituir pela screenshot real quando tivermos -->
<!-- ![VulPix Screenshot](images/screenshot.png) -->

O **VulPix** é uma plataforma web focada em facilitar a **compra e venda de cartas Pokémon TCG**. O projeto nasceu da necessidade de um ambiente mais intuitivo e dinâmico para colecionadores, tornando o processo de negociação mais simples tanto para compradores quanto para vendedores.

### Principais funcionalidades:

-  **Cadastro de Usuários** com autenticação segura via Google
-  **Inventário pessoal** para gerenciar sua coleção
-  **Catálogo de cartas à venda** com integração a API de preços
-  **Análise de mercado** para acompanhar o valor das cartas

---

## Tecnologias Utilizadas

| Camada      | Tecnologia                                                                 |
|-------------|----------------------------------------------------------------------------|
| Front-End   | [React](https://reactjs.org/) + [Tailwind CSS](https://tailwindcss.com/)  |
| Back-End    | [Laravel (PHP)](https://laravel.com/)                                      |
| Banco de Dados | [PostgreSQL](https://www.postgresql.org/) via [Supabase](https://supabase.com/) |
| Autenticação | [Google OAuth 2.0](https://developers.google.com/identity)               |
| API de Cartas | [Pokémon TCG API](https://pokemontcg.io/)                               |

[![React][React-badge]][React-url]
[![TailwindCSS][Tailwind-badge]][Tailwind-url]
[![Laravel][Laravel-badge]][Laravel-url]
[![PostgreSQL][Postgres-badge]][Postgres-url]


---

## Arquitetura

O projeto segue o padrão **MVC (Model-View-Controller)**:

- **Model** — Gerenciamento de dados com Eloquent ORM (Laravel) + PostgreSQL via Supabase
- **View** — Interface construída em React com Tailwind CSS, responsiva para mobile e desktop
- **Controller** — Lógica de negócio e roteamento via Laravel, expondo endpoints REST

```
Cliente (React) ←──── HTTP/REST ────→ Servidor (Laravel) ←──→ Banco de Dados (Supabase/PostgreSQL)
                                              ↕
                                     API Pokémon TCG
```

---

## Como Começar

### Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v18+)
- Credenciais do [Google OAuth](https://console.cloud.google.com/)
- Chave da [Pokémon TCG API](https://pokemontcg.io/)

### Instalação

#### 1. Clone o repositório

```bash
git clone https://github.com/tamydb/vul-pix.git
cd vulpix
```

#### 2. Como Configurar 

```bash
npm install
npm run dev
```

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

---

## Comunicação Web

A comunicação entre cliente e servidor segue o protocolo **HTTP/HTTPS** com arquitetura **REST**:

### Protocolo HTTP

O front-end (React) consome a API do back-end (Laravel) via requisições HTTP assíncronas usando `fetch` ou `axios`.

### Métodos utilizados

| Método   | Descrição                                      | Exemplo de Endpoint         |
|----------|------------------------------------------------|-----------------------------|
| `GET`    | Buscar dados (cartas, usuários, inventário)    | `GET /api/cards`            |
| `POST`   | Criar novos registros (cadastro, anúncios)     | `POST /api/listings`        |
| `PUT`    | Atualizar registros existentes                 | `PUT /api/inventory/{id}`   |
| `DELETE` | Remover registros                              | `DELETE /api/listings/{id}` |

### Ciclo Requisição → Resposta

```
1. Usuário acessa a tela de catálogo
2. React faz GET /api/cards
3. Laravel processa a requisição no Controller
4. Controller consulta o Model (banco de dados)
5. Retorna JSON com status 200 OK
6. React renderiza as cartas na tela
```

### Status HTTP comuns

| Status | Significado             |
|--------|-------------------------|
| `200`  | Sucesso                 |
| `201`  | Recurso criado          |
| `400`  | Requisição inválida     |
| `401`  | Não autorizado          |
| `404`  | Não encontrado          |
| `500`  | Erro interno no servidor|

---

## Fluxo de Funcionamento

```
1. Usuário acessa o VulPix
       ↓
2. Login via Google OAuth 2.0
       ↓
3. Redireciona para o Dashboard
       ↓
4. Pode gerenciar seu Inventário de Cartas
       ↓
5. Pode publicar cartas no Catálogo de Vendas
       ↓
6. Outros usuários visualizam e entram em contato
       ↓
7. Negociação pelo espaço de interação da plataforma

```

---

## Roadmap

- [x] Levantamento de Requisitos
- [x] Definição da Arquitetura (MVC)
- [ ] Protótipo no Figma
- [ ] Implementação do Front-End (React + Tailwind)
- [ ] Implementação do Back-End (Laravel)
- [ ] Integração com Pokémon TCG API
- [ ] Autenticação via Google OAuth
- [ ] Comunicação entre usuários
- [ ] Deploy da aplicação

---

## Contribuindo

Contribuições são bem-vindas! Se tiver sugestões para melhorar o projeto:

1. Faça um **Fork** do projeto
2. Crie sua branch de feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um **Pull Request**

---

## Contato

**Equipe VulPix**

📧 vulpix.projeto@gmail.com
🔗 [Link do Repositório](https://github.com/tamydb/vul-pix)

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

---

<!-- MARKDOWN LINKS & BADGES -->
[contributors-shield]: https://img.shields.io/github/contributors/tamydb/vul-pix.svg?style=for-the-badge
[contributors-url]: https://github.com/tamydb/vul-pix/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tamydb/vul-pix.svg?style=for-the-badge
[forks-url]: https://github.com/tamydb/vul-pix/network/members
[stars-shield]: https://img.shields.io/github/stars/tamydb/vul-pix.svg?style=for-the-badge
[stars-url]: https://github.com/tamydb/vul-pix/stargazers
[issues-shield]: https://img.shields.io/github/issues/tamydb/vul-pix.svg?style=for-the-badge
[issues-url]: https://github.com/tamydb/vul-pix/issues
[license-shield]: https://img.shields.io/github/license/tamydb/vul-pix.svg?style=for-the-badge
[license-url]: https://github.com/tamydb/vul-pix/blob/main/LICENSE

[React-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind-badge]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Laravel-badge]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com/
[Postgres-badge]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/
