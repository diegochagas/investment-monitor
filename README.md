# Investment Monitor Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Investment Monitor Backend

| Run local | Run dev | Run prod |
|:---:|:----:|:----:|
| npm run start:local | npm run start:dev | npm run start: prod

## Swagger

* [**Commons API**](http://investimento-develop-2270a39714590240.elb.us-west-2.amazonaws.com:8090/general-system/api-docs)
* [**Market Maker API**](http://investimento-develop-2270a39714590240.elb.us-west-2.amazonaws.com:8090/market-maker/api-docs)
* [**Strategy API**](http://investimento-develop-2270a39714590240.elb.us-west-2.amazonaws.com:8090/strategy/api-docs)
* [**Bot-telegram API**](http://investimento-develop-2270a39714590240.elb.us-west-2.amazonaws.com:8090/bot-telegram/api-docs)

## Instruções

### Build docker image

``` bash
docker build -t <image_name> .
```

### Authenticação


* Autenticação é desabilitada quando rodar a API localmente
* Para gerenciar os usuários, é utilizado Firebase e JWT
* Para validar ou invalidar uma requisição é utilizado o middleware [express-firebase-middleware](https://www.npmjs.com/package/express-firebase-middleware)

#### Exemplo de header
``` json
{ "Athentication": "Bearer <your_token_here>" }
```
---
### Mongoose + Typegoose

Para o mapeando dos models para o mongodb utilizamos o [Mongoose](https://www.npmjs.com/package/mongoose) como ORM e o [Typegoose](https://www.npmjs.com/package/typegoose) para geração das classes

#### Exemplo de mapeamento
``` typescript
import { Strategy } from './Strategy';
import { Typegoose, prop } from 'typegoose';
import 'reflect-metadata';

export class Instance extends Typegoose {
  @prop()  
  label?: string;
  @prop()
  instanceId?: string;
  @prop()
  strategy?: Strategy;
}

export const InstanceSchema = new Instance().getModelForClass(Instance, {
  schemaOptions: {
    timestamps: { createdAt: true, updatedAt: true }, collection: 'kafka-consumer.ts'
  }
});
```
