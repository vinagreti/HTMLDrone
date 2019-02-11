export const randomFromZero = (n: number) => {
  return Math.floor((Math.random() * n));
};

export const chooseOneRandomly = (a: any, b: any) => {
  return randomFromZero(10) > 5 ? a : b;
}