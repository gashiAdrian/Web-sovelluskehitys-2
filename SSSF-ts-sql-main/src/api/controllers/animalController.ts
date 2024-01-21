import { Request, Response, NextFunction } from 'express';
import { getAllAnimals, getAnimalById } from '../models/animalModel';
import { Animal } from '../../types/DBTypes';

// Haetaan kaikki eläimet
const animalListGet = async (
  req: Request,
  res: Response<Animal[]>,
  next: NextFunction
) => {
  try {
    const animals = await getAllAnimals();
    res.json(animals);
  } catch (error) {
    next(error);
  }
};

// Haetaan eläin id:n perusteella
const animalGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<Animal>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const animal = await getAnimalById(id);
    res.json(animal);
  } catch (error) {
    next(error);
  }
};

export { animalListGet, animalGet };
