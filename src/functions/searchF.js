const searchItem = (input, arrToIterate) => {
    const matches = [];
    arrToIterate.forEach((obj) => {
      const stringifiedObject = JSON.stringify(obj);
      const searchedPhrase = input.split(" ");
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