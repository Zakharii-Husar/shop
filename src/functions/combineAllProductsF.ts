import { itemTypeInterface } from "../state/tsRedux";

const combineAllProductsF = (DATA: any):itemTypeInterface[] => {
    const all:itemTypeInterface[] = [];
    const dataKeys: string[] = Object.keys(DATA);
    dataKeys.forEach((key: string ) => {
      const eachGroup: itemTypeInterface[] = DATA[key as keyof {}]
      eachGroup.forEach((eachItem:itemTypeInterface) => {
        all.push(eachItem);
      });
    });
    return all;
  };

  export default combineAllProductsF;