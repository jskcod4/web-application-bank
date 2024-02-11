import { addDays, addYears, differenceInDays } from 'date-fns';

export function isProductDateRevisionValid(
  dateRevision: Date,
  dateRelease: Date
): boolean {
  const differenceInDaysNumber = differenceInDays(dateRevision, dateRelease);

  if (dateRelease > dateRevision) {
    return false;
  }

  if (differenceInDaysNumber !== 366) {
    return false;
  }

  return true;
}

export function generateDateRevision(dateRelease: Date) {
  return addDays(addYears(dateRelease, 1), 1);
}

export function ProductDateRevisionNotValidError(date: Date): Error {
  return new Error(`Name ${date} is not valid`);
}
