/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import { Animal } from '../src/types/DBTypes';
import { MessageResponse } from '../src/types/MessageTypes';

// Funktionit eläinten (animal) reittien testaamiseen
const getAnimals = (url: string | Function): Promise<Animal[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/animal')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const animals: Animal[] = response.body;
          animals.forEach((a) => {
            expect(a.animal_id).toBeGreaterThan(0);
            expect(a.animal_name).not.toBe('');
            // Tarkista muita kenttiä tarvittaessa
          });
          resolve(animals);
        }
      });
  });
};

const getAnimalById = (url: string | Function, id: number): Promise<Animal> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/animal/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const animal: Animal = response.body;
          expect(animal.animal_id).toBeGreaterThan(0);
          expect(animal.animal_name).not.toBe('');
          // Tarkista muita kenttiä tarvittaessa
          resolve(animal);
        }
      });
  });
};

// Lisää muita testifunktioita tarvittaessa

export { getAnimals, getAnimalById };
