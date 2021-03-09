import { TableDefinition } from 'cucumber';
import { Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { StatusCodes } from '~/common/enums/statusCodes';
import { addNewPet, deletePetByName, getPetById, getPetsByStatus, Pet, updatePet } from './petsActions';

Before(() => {
  deletePetByName('newPet');
});

When('the user checks all pets with {string} status', (status: string) => {
  getPetsByStatus(status)
    .then((response: Cypress.Response) => {
      expect(response.status).to.equal(StatusCodes.success);
      return response.body;
    })
    .as('petsList');
});

Then('there are at least {string} pets', (numberOfPets: string) => {
  cy.get('@petsList').then((responseBody: any) => {
    const petsList: Array<Pet> = responseBody as Array<Pet>;
    expect(petsList).to.have.length.of.at.least(Number(numberOfPets));
    cy.log(`number of pets: ${petsList.length}`);
  });
});

When('the user adds a new pet like:', (petProperties: TableDefinition) => {
  createPet(petProperties);
});

Then('the pet {string} has been successfully added', (petName: string) => {
  const status = 'available';
  getPetsByStatus(status).then((response: Cypress.Response) => {
    expect(response.status).to.equal(StatusCodes.success);
    const petIds: Array<number> = (response.body as Array<Pet>).filter((p) => p.name === petName).map((p) => p.id);

    cy.get(`@${petName}`).then((pet: any) => {
      const id = Number(pet.id);
      expect(petIds).includes(id);
    });
  });
});

Given('the {string} pet exists', (petName: string) => {
  const status = 'available';
  getPetsByStatus(status)
    .then((response: Cypress.Response) => {
      expect(response.status).to.equal(StatusCodes.success);
      const pet: Pet = (response.body as Array<Pet>).filter((p) => p.name === petName)[0];
      return pet;
    })
    .as(petName);
});

When('the {string} pet is sold out', (petName: string) => {
  cy.get(`@${petName}`).then((pet) => {
    const properties = [{ name: 'status', value: 'sold' }];
    updatePet(pet, properties)
      .then((response: Cypress.Response) => {
        expect(response.status).to.equal(StatusCodes.success);
        const pet: Pet = response.body as Pet;
        return pet;
      })
      .as(petName);
  });
});

Then('the {string} pet status is {string}', (petName: string, status: string) => {
  cy.get(`@${petName}`).then((pet: any) => {
    expect(pet.name).to.equal(petName);
    expect(pet.status).to.equal(status);
  });

  getPetsByStatus(status).then((response: Cypress.Response) => {
    expect(response.status).to.equal(StatusCodes.success);

    const pet: Pet = (response.body as Array<Pet>).filter((p) => p.name === petName)[0];
    expect(pet.name).to.equal(petName);
    expect(pet.status).to.equal(status);
  });
});

Given('the following pet exists:', (petProperties: TableDefinition) => {
  createPet(petProperties);
});

When('the user removes the {string} pet', (petName: string) => {
  cy.get(`@${petName}`).then((pet: any) => {
    debugger;
    deletePetByName(pet.name);
  });
});

Then('the {string} pet does not exist', (petName: string) => {
  cy.get(`@${petName}`).then((pet: any) => {
    getPetById(pet.id).then((response: Cypress.Response) => {
      expect(response.status).to.equal(StatusCodes.notFound);
    });
  });
});

function createPet(petProperties: TableDefinition): void {
  const nameProperty = petProperties.hashes().find((prop) => prop.name === 'name');
  const name = nameProperty === undefined ? 'newPet' : nameProperty.value;

  addNewPet(petProperties.hashes())
    .then((response: Cypress.Response) => {
      expect(response.status).to.equal(StatusCodes.success);
      expect(response.body).has.property('id');
      return response.body;
    })
    .as(name);
}
