import inflection from 'inflection';

export function getChoices(object = {}) {
  return Object.keys(object).map((key) => ({
    id: key,
    name: inflection.transform(object[key], ['singularize', 'capitalize']),
  }));
}

export function getFirstKey(object = {}) {
  return Object.keys(object)[0];
}
