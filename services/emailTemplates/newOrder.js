module.exports = order => {
  return `<div>Thank you for placing your order, ${order.firstName}!
  <p>You ordered: ${order.photos}</p>
  <p>${order.note}</p>
  </div>`;
};
