/*
* Copyright (C) Atlas Project LLC
* All Rights Reserved.
*
* Unauthorized copying of this file, via any medium is strictly prohibited.
*
* Proprietary and confidential.
*/

import { Request, Response } from "express";
import { ServiceStrategy } from '../services/service.strategy';
import { ExceptionResponse } from '../../../shared/models/ExceptionResponse';
import { Typegoose } from "typegoose"
import { ApplicationResponse } from "../../../shared/models/ApplicationResponse";
import { services, schemas, HEADER_PROJECT_NAME } from "../../../shared/util/factorPool";
import { HeaderProject } from "../../../shared/models/enum/projectName";
import { createWriteStream, readFile, unlink } from 'fs'
import uniqId from 'uniqid'


export const createStrategy = (req: Request, res: Response) => {

  const patch = uniqId()

  req.pipe(createWriteStream(`./${patch}`)).on('finish', () => {
    readFile(`./${patch}`, (error, fileData) => {
      if (error) {
        const response = new ApplicationResponse(400, {}, "ERROR TO READ DATA")
        res.status(response.statusCode).json({ message: response.message })
        return
      }
      unlink(`./${patch}`, async () => {
        try {
          const body = JSON.parse(fileData.toString())
          const serviceResponse = await (services.get(HeaderProject[req.header(HEADER_PROJECT_NAME) as string]) as ServiceStrategy<any, Typegoose>).createStrategy(body, res.locals);
          res.status(serviceResponse.statusCode).json(serviceResponse)
        } catch (e) {
          const error = ExceptionResponse.exec(e);
          res.status(error.statusCode).json(error);
        }
      })
    })
  })

};

export const getStrategies = async (req: Request, res: Response) => {
  try {
    const strategytype = req.header(HEADER_PROJECT_NAME) as string;
    const serviceResponse = await (services.get(HeaderProject[strategytype]) as ServiceStrategy<any, Typegoose>).getStrategies(req.query.status, strategytype, req.query.fields);
    res.status(serviceResponse.statusCode).json(serviceResponse);
  } catch (e) {
    console.log('error', e)
    const error = ExceptionResponse.exec(e);
    res.status(error.statusCode).json(error);
  }
};

export const getStrategyById = async (req: Request, res: Response) => {
  try {
    const serviceResponse = await (services.get(HeaderProject[req.header(HEADER_PROJECT_NAME) as string]) as ServiceStrategy<any, Typegoose>).getStrategiesById(req.params.id);
    res.status(serviceResponse.statusCode).json(serviceResponse);
  } catch (e) {
    const error = ExceptionResponse.exec(e);
    res.status(error.statusCode).json(error);
  }
}

// export const updateStrategy = async (req: Request, res: Response) => {
//   res.status(400).json(new ApplicationResponse(400, '', 'Não é permitido a atualização de uma estratégia'));
// }

// export const deleteStrategy = async (req: Request, res: Response) => {
//   try {
//     const serviceResponse = await (services.get(HeaderProject[req.header(HEADER_PROJECT_NAME) as string]) as ServiceStrategy<any, Typegoose>).deleteStrategy(req.params.id);
//     res.status(serviceResponse.statusCode).json(serviceResponse);
//   } catch (e) {
//     const error = ExceptionResponse.exec(e);
//     res.status(error.statusCode).json(error);
//   }
// };

export const disableStrategy = async (req: Request, res: Response) => {
  try {
    const serviceResponse = await (services.get(HeaderProject[req.header(HEADER_PROJECT_NAME) as string]) as ServiceStrategy<any, Typegoose>).disableStrategy(req.params.id, res.locals.user);
    res.status(serviceResponse.statusCode).json(serviceResponse);
  } catch (e) {
    const error = ExceptionResponse.exec(e);
    res.status(error.statusCode).json(error);
  }
};

export const enableStrategy = async (req: Request, res: Response) => {
  try {
    const serviceResponse = await (services.get(HeaderProject[req.header(HEADER_PROJECT_NAME) as string]) as ServiceStrategy<any, Typegoose>).enableStrategy(req.params.id, res.locals.user);
    res.status(serviceResponse.statusCode).json(serviceResponse);
  } catch (e) {
    const error = ExceptionResponse.exec(e);
    res.status(error.statusCode).json(error);
  }
};

export const findStrategyByName = (name: string, version, strategyType: string): any | {} => {
  const schema = schemas.get('DEFAULT');
  if (schema)
    return schema.findOne({ name, version });
};

