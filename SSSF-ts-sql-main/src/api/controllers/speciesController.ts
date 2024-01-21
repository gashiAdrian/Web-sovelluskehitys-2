import { Request, Response, NextFunction } from 'express';
import { getAllSpecies, getSpeciesById } from '../models/speciesModel';
import { Species } from '../../types/DBTypes';

// Hae kaikki lajit
const speciesListGet = async (
  req: Request,
  res: Response<Species[]>,
  next: NextFunction
) => {
  try {
    const species = await getAllSpecies();
    res.json(species);
  } catch (error) {
    next(error);
  }
};

// Hae laji ID:n perusteella
const speciesGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<Species>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const speciesItem = await getSpeciesById(id);
    res.json(speciesItem);
  } catch (error) {
    next(error);
  }
};

export { speciesListGet, speciesGet };
