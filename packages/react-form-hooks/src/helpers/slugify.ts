// taken from https://gist.github.com/max10rogerio/c67c5d2d7a3ce714c4bc0c114a3ddc6e

const slugify = (str: string): string => {
  return str
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-_ ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, "-"); // separator
};

export { slugify };
