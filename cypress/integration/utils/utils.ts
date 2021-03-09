export function updateProperties(entity: any, properties: Array<{ [x: string]: string }>): any {
  const modifiedEntity = Cypress._.cloneDeep(entity);

  properties
    .filter((p) => p.value !== '')
    .forEach((p) => {
      update(p, modifiedEntity);
    });

  return modifiedEntity;
}

function update(property: { [x: string]: string }, entity: any): void {
  const keys: Array<string> = Object.keys(entity);
  let key: string;
  const value: string = property.value;

  if (!property.name.includes('.')) {
    key = property.name;
    if (keys.includes(key)) {
      entity[key] = value;
    }
  } else {
    const key = property.name.split('.')[0];
    if (keys.includes(key)) {
      property.name = property.name.replace(`${key}.`, '');
      update(property, entity[key]);
    }
  }
  return;
}
