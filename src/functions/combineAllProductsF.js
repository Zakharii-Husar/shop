const combineAllProductsF = (DATA) => {
    const all = [];
    Object.keys(DATA).forEach(key => {
      DATA[key].forEach(obj => {
        all.push(obj);
      });
    });
    return all;
  };

  export default combineAllProductsF;