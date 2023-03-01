import { Option } from "@gforms-js/types";

const flattenOptionsArray = (array: string[][]): Option[] => {
  return array.map((item) => ({ label: item[0] }));
};

export { flattenOptionsArray };
