# Install package Project

## PACKAGE class-validator es para validaciones de datos 
```sh
npm i --save class-validator class-transformer
```
## PACKAGE OPENAPI es para documentacion de la API
url: https://docs.nestjs.com/openapi/introduction
```sh
npm install --save @nestjs/swagger
```
para la documentacion

[http](http://localhost:3000/Documentation)

## PACKAGE PARA ENV es para configurar las variables de entorno
url_Documentation: https://docs.nestjs.com/techniques/configuration
```sh
npm i --save @nestjs/config
```
## PACKAGE SERVER STATIC es para servir archivos estaticos
url_Documetation: https://docs.nestjs.com/recipes/serve-static
```sh
npm install --save @nestjs/serve-static
```

## package url-slug es para crear url amigables

```sh
npm i url-slug
```
## Package multer es para subir archivos
```sh
npm i -D @types/multer
```
## Package Mongo es para conectar con la base de datos
```sh
npm i @nestjs/mongoose mongoose
```

## Incryptar usuarios register con BcryptJS
```sh
npm i bcryptjs
```
## Encryptar los datos Sencibles que enviamos JWT(json web token)

```sh
npm install --save @nestjs/jwt
```

## package Passport es para autenticacion de usuarios
```sh
npm i @nestjs/passport passport -s
```

## package EventEmitter es para emitir eventos entre modulos 
```sh
npm i --save@nestjs/event-emitter
```
## package moongose-delete esto hace que los documentos no se eliminen de la base de datos sino que se marquen como eliminados(borrados logico)
```sh
npm i mongoose-delete
```
## package UUID es para generar identificadores unicos
```sh
npm i uuid
```
tambien se debe instalar types de uuid para que typescript lo reconozca
```sh
npm i -D @types/uuid
```
## package nodemailer nos sirve para enviar  correos
``` sh
npm i --save @nestjs-modules/mailer nodemailer
```
tambien debemos de instalar para nodemailer el handlebars 

```sh
npm i --save handlebars
```
no obstante debemos crear una cuenta para test en  [Mailtrap](https://mailtrap.io/)

## package moongoose-paginate-v2   es 

```sh
npm i mongoose-paginate-v2
```

para el uso de la cache cuando grandes consultas a la base de datos

```sh
npm install cache-manager
npm install -D @types/cache-manager
```