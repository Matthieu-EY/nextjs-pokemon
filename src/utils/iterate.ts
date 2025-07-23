/**
 * A function to iterate through a nested object and centralize data inside an array
 * @param obj The nested object
 * @param iterator A function to go the next item (item => item.next)
 * @param element A function to extract the element to push to the array. (item => item.name)
 * @returns An array containing the items extracted from the nested object
 */
export function nestedObjToArray<T, K>(obj: T, iterator: (obj: T) => T, element: (obj: T) => K): K[] {
  const arr: K[] = [];
  let curr_obj = obj;
  while (curr_obj) {
    arr.push(element(curr_obj));
    curr_obj = iterator(curr_obj);
  }
  return arr;
}