/* eslint-disable @typescript-eslint/no-loss-of-precision */
import {getApiRoot, getCategories, getCategory, postCategory, putCategory, deleteCategory} from './testCategory';
import {Category, Species} from '../src/types/DBTypes';
import { deleteSpecies, getSpecies, getSpeciesById, postSpecies, putSpecies } from './testSpecies';

// import app from '../src/app';
const app = 'http://localhost:3000';

describe('GET /api/v1', () => {
  // test api root
  it('API root responds with a json message', async () => {
    await getApiRoot(app);
  });

  // test succesful category routes
  let categories: Category[];
  it('Should get array of categories', async () => {
    categories = await getCategories(app);
  });

  // TODO: add test for get category by id
  it('Should get a specific category by ID', async () => {
    const category = await getCategory(app, 1); //
    expect(category.category_name).not.toBe('');
  });
  // TODO: add test for post category
  it('Should create a new category', async () => {
    const newCategoryName = 'New Category';
    const response = await postCategory(app, newCategoryName);
    expect(response.message).toBe('Category created successfully');
  });
  // TODO: add test for put category
  it('Should update an existing category', async () => {
    const updatedCategoryName = 'Updated Category';
    const categoryIdToUpdate = 1;
    const response = await putCategory(app, categoryIdToUpdate, updatedCategoryName);
    expect(response.message).toBe('Category updated successfully');
  });
  // TODO: add test for delete category
  it('Should delete a category', async () => {
    const categoryIdToDelete = 1;
    const response = await deleteCategory(app, categoryIdToDelete);
    expect(response.message).toBe('Category deleted successfully');
  });

  // test succesful species routes
  // TODO: add test for get all species
  let speciesArray: Species[];
  it('Should get an array of species', async () => {
    speciesArray = await getSpecies(app);
    expect(speciesArray).toBeInstanceOf(Array);
    speciesArray.forEach(species => {
      expect(species.species_id).toBeGreaterThan(0);
      expect(species.species_name).not.toBe('');
    });
  });

  // TODO: add test for get species by id
  it('Should get a specific species by ID', async () => {
    const species = await getSpeciesById(app, 1);
    expect(species.species_id).toBe(1);
    expect(species.species_name).not.toBe('');
  });
  // TODO: add test for post species
  it('Should create a new species', async () => {
    const newSpeciesData = { species_name: 'New Species', category: 1, image: 'image_url' };
    const response = await postSpecies(app, newSpeciesData);
    expect(response.message).toBe('Species created successfully');
  });
  // TODO: add test for put species
  it('Should update an existing species', async () => {
    const updatedSpeciesData = { species_name: 'Updated Species', category: 1, image: 'updated_image_url' };
    const speciesIdToUpdate = 1;
    const response = await putSpecies(app, speciesIdToUpdate, updatedSpeciesData);
    expect(response.message).toBe('Species updated successfully');
  });
  // TODO: add test for delete species
  it('Should delete a species', async () => {
    const speciesIdToDelete = 1;
    const response = await deleteSpecies(app, speciesIdToDelete);
    expect(response.message).toBe('Species deleted successfully');
  });

  // test succesful animal routes
  // TODO: add test for get all animals
  // TODO: add test for get animal by id
  // TODO: add test for post animal
  // TODO: add test for put animal
  // TODO: add test for delete animal

  // test 404 error category routes
  // TODO: add test for get category by id
  // TODO: add test for put category
  // TODO: add test for delete category

  // test 400 error category routes with invalid data
  // TODO: add test for post category
  // TODO: add test for put category
  // TODO: add test for delete category
  // TODO: add test for get category by id

  // test 404 error species routes
  // TODO: add test for get species by id
  // TODO: add test for put species
  // TODO: add test for delete species

  // test 400 error species routes with invalid data
  // TODO: add test for post species
  // TODO: add test for put species
  // TODO: add test for delete species

  // test 404 error animal routes
  // TODO: add test for get animal by id
  // TODO: add test for put animal
  // TODO: add test for delete animal

  // test 400 error animal routes with invalid data
  // TODO: add test for post animal
  // TODO: add test for put animal
  // TODO: add test for delete animal
  // TODO: add test for get animal by id
});
