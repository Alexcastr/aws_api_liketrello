# API LikeTrello 

Esta es la API `api-liketrello` de **clone de trello**, diseñada para gestionar entradas tipo Trello, implementada con el framework **Serverless** y desplegada en **AWS Lambda** con **DynamoDB** como base de datos. La API está escrita en **Node.js 20.x** y utiliza **Next.js** como frontend.

## Características

- Gestión de entradas tipo Trello (crear, obtener, actualizar, eliminar).
- Persistencia de datos con **AWS DynamoDB**.
- Implementación bajo demanda con **AWS Lambda** y **API Gateway** (HTTP API).
- Arquitectura Serverless que facilita escalabilidad y ahorro de costos.
  
## Requisitos

- **Node.js** >= 20.x
- **AWS CLI** configurado
- **Serverless Framework** instalado globalmente

## Configuración del Entorno

1. Clonar el repositorio:
```bash
git clone https://github.com/startupgris/api-liketrello.git
cd api-liketrello
```
2. Instalar dependencias
```bash
npm install
```
3.Configurar variables de entorno 
```bash
AWS_ACCESS_KEY_ID=<your-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
AWS_REGION=us-east-1

```

| Método    | Endpoint   | Descripción
| -------- | -------     | ------- 
| GET      | /           |Endpoint de prueba.
| POST     | /entry      |Crear una nueva entrada.
| GET      | /entries    |Obtener todas las entradas.
| GET      | /entry/{id} |Obtener una entrada por ID.
| PUT      | /entry/{id} |Actualizar una entrada por ID.
| DELETE   | /entry/{id} |Eliminar una entrada por ID.


## Recursos
Tabla DynamoDB: Entries (almacena las entradas con atributos _id, status, y createdAt).
Índice secundario global: statusIndex (para consultar entradas según su estado).


- AL conectar dynamodb, dentro de aws -> copiar el amazon resource name y agregarlo dentro del archivo serverless.yml
  iamRoleStatements

## Desarrollo Local
Para probar la API localmente, puedes usar serverless-offline:

1. Instalar el plugin:

``` bash
npm install serverless-offline --save-dev

```

2. Ejecutar la API localmente:

```bash
sls offline
```

Para deployar el stack command

```js

serverless deploy --verbose

```
