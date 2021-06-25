# creative-code-backend-challenge
Desafio técnico creative code Backend

Para rodar o projeto é necessário a instalação das dependências (npm install) e configuração de um arquivo .env na raiz do projeto com as
seguintes variáveis de ambiente:

USERDB (usuário banco de dados postgresql)
HOST=localhost
PASSW= (senha para o usuário do banco, se não houver basta deixar em branco)
SECRET=36253b7c5eb3cce9bb7ab2b549c86cea
DATABASE=users-db
APP_ADMIN= (usuário administrativo do app)
ADMIN_PASSWORD= (senha do usuário administrativo).

## Sobre o projeto
Projeto de uma api crud para cadastramento e consulta de consulta de usuários.

# Tecnologias

Typescript, postgresql, Json web token (para a autenticação do usuário administrativo)

# Melhorias futuras
implementação de testes para a rota address e refatoração do código