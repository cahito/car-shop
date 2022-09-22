import { ICar } from '../../interfaces/ICar';
import { IMotorcycle } from '../../interfaces/IMotorcycle'

type IdString = {
  _id: String
};
type CarReturn = ICar & IdString;
type BikeReturn = IMotorcycle & IdString;

export const ID_1 = 'abcdefabcdef123456654321';

export const ID_2 = '123456654321abcdefabcdef';

export const ID_NOT_FOUND = '111111222222aaaaaabbbbbb';

export const ID_INVALID = 'not_a_valid_ID';

export const carDataToCreate: ICar = {
  model: "Fusca",
  year: 1985,
  color: "cinza",
  buyValue: 4500,
  doorsQty: 2,
  seatsQty: 5,
}

export const createdCar: CarReturn = {
  _id: "abcdefabcdef123456654321",
  model: "Fusca",
  year: 1985,
  color: "cinza",
  buyValue: 4500,
  doorsQty: 2,
  seatsQty: 5,
}

export const carDataToUpdate: ICar = {
  model: "Fusca",
  year: 1996,
  color: "vermelho",
  buyValue: 6500,
  doorsQty: 2,
  seatsQty: 5,
}

export const updatedCar: CarReturn = {
  _id: "abcdefabcdef123456654321",
  model: "Fusca",
  year: 1996,
  color: "vermelho",
  buyValue: 6500,
  doorsQty: 2,
  seatsQty: 5,
}

export const carWrongModel: ICar = {
  model: "Fu",
  year: 1996,
  color: "vermelho",
  buyValue: 6500,
  doorsQty: 2,
  seatsQty: 5,
}

export const carWrongYear: ICar = {
  model: "Fusca",
  year: 1890,
  color: "vermelho",
  buyValue: 6500,
  doorsQty: 2,
  seatsQty: 5,
}

export const carWrongColor: ICar = {
  model: "Fusca",
  year: 1996,
  color: "v",
  buyValue: 6500,
  doorsQty: 2,
  seatsQty: 5,
}

export const carWrongDoors: ICar = {
  model: "Fusca",
  year: 1996,
  color: "vermelho",
  buyValue: 6500,
  doorsQty: 5,
  seatsQty: 5,
}

export const carWrongSeats: ICar = {
  model: "Fusca",
  year: 1996,
  color: "vermelho",
  buyValue: 6500,
  doorsQty: 2,
  seatsQty: 1,
}

export const carsMock: CarReturn[] = [
  {
    _id: "abcdefabcdef123456654321",
    model: "Fusca",
    year: 1985,
    color: "cinza",
    buyValue: 4500,
    doorsQty: 2,
    seatsQty: 5,
  },
  {
    _id: "123456654321abcdefabcdef",
    model: "VW Fox",
    year: 2010,
    color: "preto",
    buyValue: 21000,
    doorsQty: 4,
    seatsQty: 5,
  },
]

export const bikeDataToCreate: IMotorcycle = {
  model: "CBR 450",
  year: 1993,
  color: "babalu",
  buyValue: 10000,
  category: "Street",
  engineCapacity: 450,
}

export const createdBike: BikeReturn = {
  _id: "abcdefabcdef123456654321",
  model: "CBR 450",
  year: 1993,
  color: "babalu",
  buyValue: 10000,
  category: "Street",
  engineCapacity: 450,
}

export const bikeDataToUpdate: IMotorcycle = {
  model: "CBR 450",
  year: 1993,
  color: "vermelha",
  buyValue: 10000,
  category: "Street",
  engineCapacity: 450,
}

export const updatedBike: BikeReturn = {
  _id: "abcdefabcdef123456654321",
  model: "CBR 450",
  year: 1995,
  color: "vermelha",
  buyValue: 15000,
  category: "Street",
  engineCapacity: 450,
}

export const bikeWrongModel: IMotorcycle = {
  model: "CB",
  year: 1993,
  color: "babalu",
  buyValue: 10000,
  category: "Street",
  engineCapacity: 450,
}

export const bikeWrongYear: IMotorcycle = {
  model: "CBR 450",
  year: 2993,
  color: "babalu",
  buyValue: 10000,
  category: "Street",
  engineCapacity: 450,
}

export const bikeWrongColor: IMotorcycle = {
  model: "CBR 450",
  year: 1993,
  color: "b",
  buyValue: 10000,
  category: "Street",
  engineCapacity: 450,
}

export const bikeWrongCategory: IMotorcycle = {
  model: "CBR 450",
  year: 1993,
  color: "babalu",
  buyValue: 10000,
  category: "Racing" as any,
  engineCapacity: 450,
}

export const bikeWrongEngCapacity: IMotorcycle = {
  model: "CBR 450",
  year: 1993,
  color: "babalu",
  buyValue: 10000,
  category: "Street",
  engineCapacity: 4500,
}

export const bikesMock: BikeReturn[] = [
  {
    _id: "abcdefabcdef123456654321",
    model: "CBR 450",
    year: 1993,
    color: "babalu",
    buyValue: 10000,
    category: "Street",
    engineCapacity: 450,
  },
  {
    _id: "123456654321abcdefabcdef",
    model: "Intruder 125",
    year: 2014,
    color: "vermelha",
    buyValue: 6400,
    category: "Custom",
    engineCapacity: 125,
  },
]


'{"model":"Fusca","year":1985,"color":"cinza","buyValue":4500,"doorsQty":2,"seatsQty":5}'
'{"model":"Intruder 125","year":2014,"color":"vermelha","buyValue":6400,"category":"Custom","engineCapacity":125}'