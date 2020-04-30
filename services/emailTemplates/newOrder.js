module.exports = (order) => {
  const orderNum = order._id.toString();
  const {
    firstName,
    lastName,
    addr1,
    addr2,
    city,
    state,
    zip,
    customerNote,
    total,
  } = order;

  const mailingAddress = `<h2>Mailing address</h2>
      <p> 
      ${firstName} ${lastName}<br>
      ${addr1}<br>
      ${addr2 ? `${addr2}<br>` : ""}
      ${city}, ${state} ${zip}
      </p>`;

  return `<div>
      <h2>Confirmation number: #${orderNum.substr(orderNum.length - 5)}</h2>
      <p>Thank you for placing an order, ${firstName} ${lastName}!</p>
      <h2>Payment Options</h2>
      <p>1. Venmo Steve Balogh @fixmewithyourrealvenmo </p>
      <p>2. Paypal Steve Balogh @fixmewithyourrealpaypal </p>
      <p><strong>AMOUNT DUE: $${total}.00</strong></p>
      ${addr1 ? mailingAddress : ""}
      <p> ${customerNote ? `Note: ${customerNote}` : ""}</p>
      <p>If you have any questions or concerns, please reply to this email.</p>
      </div>`;
};
