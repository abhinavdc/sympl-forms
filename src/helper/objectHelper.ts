export const isEmpty = (obj: object | null) => Object.keys(obj ?? {}).length === 0;
