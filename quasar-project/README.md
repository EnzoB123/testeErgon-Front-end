# Quasar App (quasar-project)

# teste ergon Enzo

# Como rodar a aplicação front-end:

1.Instale a versao mais estável do node.js: https://nodejs.dev/pt/download/

2.Certifique-se de ter o Node.js (14.19 pra cima) e o MongoDB instalados em sua máquina.

3.Faça o clone do repositório.

4.Abra o terminal no diretório da aplicacao (certifique-se que é o diretorio com todos os arquivos).

5.Execute o comando "npm install" para instalar as dependências do projeto.

6.Execute o comando "quasar dev" para iniciar o servidor da API. A API deve estar disponível em http://localhost:8080/ ou http://localhost:9000/ (mas aparece no terminal).

7.Se algo ocorrer errado com o "quasar dev", instale tambem o quasar diretamente com o comando: "npm install -g @quasar/cli"

8.Agora certifique-se que o servidor api está rodando, pode fazer um ping, acessando: http://localhost:3000/ping

9.Quando for criar um novo usuário, o campo e-mail precisa ser do tipo email("user@mail.com").



---------------------------------------------------------------------------------------------------------------------


## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
