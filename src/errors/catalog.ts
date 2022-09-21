export enum ErrorTypes {
  InvalidMongoId = 'InvalidMongoId',
  UndefinedObject = 'UndefinedObject',
  ObjectNotFound = 'ObjectNotFound',
}

// esse é o tipo do objeto vai ser usado construir a resposta da API
export type ErrorResponseObject = {
  message: string;
  httpStatus: number
};

// aqui o tipo do catálogo
export type ErrorCatalog = {
  // onde cada chave desse objeto é uma chave do Enum ErrorTypes
  // e cada valor é um objeto de resposta da API
  [key in ErrorTypes]: ErrorResponseObject

};

export const errorCatalog: ErrorCatalog = {
  InvalidMongoId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  UndefinedObject: {
    message: 'Undefined object',
    httpStatus: 400,
  },
  ObjectNotFound: {
    message: 'Object not found',
    httpStatus: 404,
  },
};
