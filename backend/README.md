# API Backoffice Investimentos

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
