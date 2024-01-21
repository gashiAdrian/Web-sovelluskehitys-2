import request from 'supertest';
import { Species } from '../src/types/DBTypes';
import {MessageResponse} from '../src/types/MessageTypes';

// Funktionit lajien (species) reittien testaamiseen
const getSpecies = (url: string | Function): Promise<Species[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/species')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const species: Species[] = response.body;
          species.forEach((s) => {
            expect(s.species_id).toBeGreaterThan(0);
            expect(s.species_name).not.toBe('');
            // Tarkista muita kenttiä tarvittaessa
          });
          resolve(species);
        }
      });
  });
};

const getSpeciesById = (url: string | Function, id: number): Promise<Species> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/species/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const species: Species = response.body;
          expect(species.species_id).toBeGreaterThan(0);
          expect(species.species_name).not.toBe('');
          // Tarkista muita kenttiä tarvittaessa
          resolve(species);
        }
      });
  });
};

const postSpecies = (
  url: string | Function,
  speciesData: Partial<Species>
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/species')
      .send(speciesData)
      .expect(201, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).toContain('created');
          resolve(message);
        }
      });
  });
};

const putSpecies = (
  url: string | Function,
  id: number,
  speciesData: Partial<Species>
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .put(`/api/v1/species/${id}`)
      .send(speciesData)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).toContain('updated');
          resolve(message);
        }
      });
  });
};

const deleteSpecies = (
  url: string | Function,
  id: number
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/v1/species/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).toContain('deleted');
          resolve(message);
        }
      });
  });
};

export { getSpecies, getSpeciesById, postSpecies, putSpecies, deleteSpecies };

