import promisePool from '../../database/db';
import { Animal } from '../../types/DBTypes';
import { RowDataPacket } from 'mysql2';

// Hae kaikki eläimet
const getAllAnimals = async () => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Animal[]>(
    'SELECT * FROM animals'
  );
  if (!rows) {
    throw new Error('No animals found');
  }
  return rows as Animal[];
};

// Hae eläin ID:n perusteella
const getAnimalById = async (id: number) => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Animal[]>(
    'SELECT * FROM animals WHERE animal_id = ?',
    [id]
  );
  if (!rows) {
    throw new Error('No animal found with the given ID');
  }
  return rows[0] as Animal;
};

export { getAllAnimals, getAnimalById };
