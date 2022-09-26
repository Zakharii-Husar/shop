const calculateTotalPriceF = (arrToIterate: 
  {quantity:number, price:number}[]): string => {
    const taxPercent = 0.07;

    const total = {
      quantity: 0,
      price: 0,
      tax: 0,
    };

    arrToIterate.forEach(item => {
      total.quantity += item.quantity;
      total.price += Math.round(item.price * item.quantity * 100) / 100;
      total.tax = Math.round(total.price * taxPercent * 100) / 100;
    });
    return `You have 
    ${total.quantity} 
    ${total.quantity > 1 ? "items" : "item"} 
    in your basket, priced
    ${total.price + total.tax}$  
    (${total.tax}$ of what is tax)`;
  };

  export default calculateTotalPriceF;