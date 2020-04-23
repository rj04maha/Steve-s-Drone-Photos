import _ from "lodash";

export default function (cart) {
  var checkForShipping = false;

  let numOfDigital = 0;
  let numOf13x19 = 0;
  let numOf11x14 = 0;

  const costOfDigital = 10;
  const costOf13X19 = 15;
  const costof11x14 = 20;

  if (cart) {
    let total = 0;
    var totalObj = null;
    _.mapKeys(cart, (photo, key) => {
      numOfDigital = 0;
      numOf13x19 = 0;
      numOf11x14 = 0;
      if (photo["digital"]) {
        numOfDigital++;
      }
      if (photo["copy13x19"]) {
        numOf13x19 += Number(photo["copy13x19"]);
        checkForShipping = true;
      }
      if (photo["copy11x14"]) {
        numOf11x14 += Number(photo["copy11x14"]);
        checkForShipping = true;
      }

      var itemTotal =
        numOfDigital * costOfDigital +
        numOf13x19 * costOf13X19 +
        numOf11x14 * costof11x14;

      total += itemTotal;

      var pair = { [key]: itemTotal };

      totalObj = { ...totalObj, ...pair };

      return null;
    });

    totalObj = {
      ...totalObj,
      ...{ totalCost: total },
      ...{ shipping: checkForShipping },
    };
  }

  return totalObj;
}
