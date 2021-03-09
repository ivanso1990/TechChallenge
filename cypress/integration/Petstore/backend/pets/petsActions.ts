import { apiDelete, apiGet, apiPost, apiPut } from '~/common/actions/apiActions';
import { AppEndpoint } from '~/common/enums/appEndpoint';
import { StatusCodes } from '~/common/enums/statusCodes';
import { updateProperties } from '~/utils/utils';

export class Pet {
  public category: { id: number; name: string };
  public id: number;
  public name: string;
  public photoUrls: Array<string>;
  public status: string;
  public tags: Array<{ id: number; name: string }>;
}

const statuses: Array<string> = ['available', 'sold', 'pending'];

export function getPetsByStatus(status: string): Cypress.Chainable<Cypress.Response> {
  const endpoint = `${AppEndpoint.pet}/findByStatus`;
  const qs = { status: `${status}` };

  return apiGet(endpoint, qs);
}

export function getPetById(id: number): Cypress.Chainable<Cypress.Response> {
  const endpoint = `${AppEndpoint.pet}/${id}`;

  return apiGet(endpoint);
}

export function addNewPet(propeties: Array<{ [x: string]: string }>): Cypress.Chainable<Cypress.Response> {
  const endpoint = AppEndpoint.pet;
  return cy.fixture('api\\pet.json').then((mockPet) => {
    const body = updateProperties(mockPet, propeties);

    return apiPost(endpoint, body);
  });
}

export function updatePet(pet: any, propeties: Array<{ [x: string]: string }>): Cypress.Chainable<Cypress.Response> {
  const endpoint = AppEndpoint.pet;
  const body = updateProperties(pet, propeties);

  return apiPut(endpoint, body);
}

export function deletePetByName(petName: string): void {
  statuses.forEach((status) => {
    getPetsByStatus(status).then((response: Cypress.Response) => {
      expect(response.status).to.equal(StatusCodes.success);
      const pets: Array<number> = (response.body as Array<Pet>)
        .filter((p) => p.name === petName)
        .map((p) => p.id)
        .filter((v, i, a) => a.indexOf(v) === i);

      pets.forEach((id) => {
        const endpoint = `${AppEndpoint.pet}/${id}`;
        return apiDelete(endpoint);
      });
    });
  });
}
