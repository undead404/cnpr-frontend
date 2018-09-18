export function areEntitiesArraysEqual(entities1, entities2) {
  if (!entities1 && !entities2) return true;
  if ((!entities1 && entities2) || (entities1 && !entities2)) return false;
  if (entities1.length !== entities2.length) return false;
  for (let i = 0; i < entities1.length; i += 1) {
    if (entities1[i].id !== entities2[i].id) return false;
  }
  return true;
}

export function normalizePlateNumber(plateNumber) {
  return plateNumber.replace(' ', '').toUpperCase();
}
