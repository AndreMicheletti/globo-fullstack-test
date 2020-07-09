# Editora Globo - Teste

 Front e back-end para CRUD de notícias
 
 ### Como executar
 
 Requisitos:
 
  - `docker`
  - `docker-compose`
  
 Para executar e testar o projeto, basta clonar 
 o repositório
 
 `git clone https://github.com/AndreMicheletti/globo-fullstack-test.git`
 
 Abrir o diretório raiz e subir o docker compose:
 
 `docker-compose up --build -d`
 
 Para encerrar os serviços, execute:
 
 `docker-compose down`
 
### Como testar

O projeto possui dois serviços:

 - uma `API REST` disponível em http://localhost:8000
   - documentação Swagger disponível em http://localhost:8000/docs
 - um frontend `React` disponível em http://localhost:3000

As rotas `/article` estão protegidas por OAuth2 e 
para acessar é necessário login e senha.

#### Criar usuário

É necessário **criar um usuário** para fazer o login
no frontend.

Para isso, faça um request `POST` para a rota `localhost:8000/auth/`

Exemplo de requisição usando `cURL`

```
curl -X POST 'http://localhost:8000/auth/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "usuario",
    "password": "abc123"
}'
```

Agora você pode fazer login no frontend
com as credenciais:

login: `usuario` senha: `abc123`

### Tech stack

Esse projeto foi construído com:

 - [FastAPI](https://fastapi.tiangolo.com/)
 - [React](https://pt-br.reactjs.org/)
   - [Redux](https://redux.js.org/)
   - [MaterialUI](https://material-ui.com/pt/)
 - [MongoDB](https://www.mongodb.com/)
 - [pytest](https://docs.pytest.org/en/latest/)