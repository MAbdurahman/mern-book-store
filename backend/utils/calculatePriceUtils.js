export function formatWithDecimals(number) {
   return (Math.round(number * 100) / 100).toFixed(2);
}

export function calculatePrices(orderItems) {
   const itemsPrice = formatWithDecimals(
      orderItems.reduce((acc, orderItem) => acc + orderItem.price * orderItem.quantity, 0)
   );

   const shippingPrice = formatWithDecimals(itemsPrice > 100 ? 0 : 10);

   const taxPrice = formatWithDecimals(Number((0.0975 * itemsPrice).toFixed(2)));

   const totalPrice = (
      Number(itemsPrice) +
      Number(shippingPrice) +
      Number(taxPrice)
   ).toFixed(2);

   return { itemsPrice, shippingPrice, taxPrice, totalPrice };
}