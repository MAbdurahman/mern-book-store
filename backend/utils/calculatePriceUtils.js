export function formatWithDecimals(number) {
   return (Math.round(number * 100) / 100).toFixed(2);
}

export function calculatePrices(orderItems) {
   const orderedItemsPrice = formatWithDecimals(
      orderItems.reduce((acc, orderItem) => acc + orderItem.price * orderItem.quantity, 0)
   );

   const shippingPrice = formatWithDecimals(orderedItemsPrice > 100 ? 0 : 10);

   const taxPrice = formatWithDecimals(Number((0.0975 * orderedItemsPrice).toFixed(2)));

   const totalPrice = (
      Number(orderedItemsPrice) +
      Number(shippingPrice) +
      Number(taxPrice)
   ).toFixed(2);

   return { orderedItemsPrice, shippingPrice, taxPrice, totalPrice };
}