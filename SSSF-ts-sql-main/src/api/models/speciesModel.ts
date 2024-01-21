import promisePool from '../../database/db';
import { Species } from '../../types/DBTypes';
import { RowDataPacket } from 'mysql2';

// Hae kaikki lajit
const getAllSpecies = async () => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Species[]>(
    'SELECT * FROM species'
  );
  if (!rows) {
    throw new Error('No species found');
  }
  return rows as Species[];
};

// Hae laji ID:n perusteella
const getSpeciesById = async (id: number) => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Species[]>(
    'SELECT * FROM species WHERE species_id = ?',
    [id]
  );
  if (!rows) {
    throw new Error('No species found with the given ID');
  }
  return rows[0] as Species;
};

export { getAllSpecies, getSpeciesById };
