export default function (cart) {
  let total = 0;

  let numOfDigital = 0;
  let numOf13x19 = 0;
  let numOf11x14 = 0;

  const costOfDigital = 10;
  const costOf13X19 = 15;
  const costof11x14 = 20;

  if (cart) {
    var totalObj = null;
    var num = 0;
    Object.values(cart).map((item) => {
      numOfDigital = 0;
      numOf13x19 = 0;
      numOf11x14 = 0;
      if (item[0]["digital"] === "yes") {
        numOfDigital++;
      }
      if (item[0]["copy13x19"]) {
        numOf13x19 += Number(item[0]["copy13x19"]);
      }
      if (item[0]["copy11x14"]) {
        numOf11x14 += Number(item[0]["copy11x14"]);
      }

      var itemTotal =
        numOfDigital * costOfDigital +
        numOf13x19 * costOf13X19 +
        numOf11x14 * costof11x14;

      total += itemTotal;

      var pair = { [num]: itemTotal };

      totalObj = { ...totalObj, ...pair };
      num++;

      return null;
    });

    totalObj = { ...totalObj, ...{ totalCost: total } };
  }

  return totalObj;
}
