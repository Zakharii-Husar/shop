import { itemTypeInterface } from "../state/tsRedux";

const searchItem = (input: string, arrToIterate: itemTypeInterface[]):itemTypeInterface[] => {
    const matches:itemTypeInterface[] = [];
    arrToIterate.forEach((obj) => {
      const stringifiedObject: string = JSON.stringify(obj);
      const searchedPhrase: string[] = input.split(" ");
      if (
        searchedPhrase.every(word =>
          stringifiedObject.toLowerCase().includes(word.toLowerCase()) && word.length > 1
        )
      )
        matches.push(obj);
    });
    return matches;
  };

  export default searchItem;