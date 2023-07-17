import * as checkout from "./handson/order";
import { createPayment } from "./handson/payment";
import { log } from "./utils/logger";

const customerKey = "tt-customer";
const cartId = "e0fbfb4f-dc0f-4d76-a27b-f1e13a473c96";
const orderId = "df3cc924-d373-4f4e-ae88-85672040b750";

const paymentDraft = {
  key: "payment" + Math.random().toString(36).substring(2, 7),
  amountPlanned: {
    currencyCode: "EUR",
    centAmount: 5000,
  },
  pspName: "We_Do_Payments",
  pspMethod: "CREDIT_CARD",
  interfaceId: "we_pay_73636" + Math.random(), // Must be unique.
  interactionId: "pay82626" + Math.random(),
};

// create a cart and update the cartId variable --done
// checkout.createCart(customerKey).then(log).catch(log);

// -- done
// checkout
//   .addLineItemsToCart(cartId, ["A0E200000001WG3", "M0E20000000ELDB"])
//   .then(log)
//   .catch(log);

//--Done
// checkout.addDiscountCodeToCart(cartId, "testMe").then(log).catch(log);

//--Done
// checkout.recalculate(cartId).then(log).catch(log);

//error
// checkout.setShippingMethod(cartId).then(log).catch(log);

// create order from cart and update the orderId
//done
// checkout.createOrderFromCart(cartId).then(log).catch(log);

//done
// checkout.getOrderById(orderId).then(log).catch(log);

// set order state to confirmed and custom workflow state to order packed
//done
// checkout.setOrderState(orderId, "Confirmed").then(log).catch(log);

//done
// checkout
//   .updateOrderCustomState(orderId, "tt-order-packed")
//   .then(log)
//   .catch(log);

const checkoutProcess = async () => {
  let emptyCart = await checkout.createCart(customerKey);

  let filledCart = await checkout.addLineItemsToCart(emptyCart.body.id, [
    "A0E200000001WG3",
    "M0E20000000ELDB",
  ]);

  filledCart = await checkout.addDiscountCodeToCart(
    filledCart.body.id,
    "testMe"
  );

  filledCart = await checkout.recalculate(filledCart.body.id);
  //   filledCart = await checkout.setShippingMethod(filledCart.body.id);

  const payment = await createPayment(paymentDraft);
  filledCart = await checkout.addPaymentToCart(
    filledCart.body.id,
    payment.body.id
  );

  let order = await checkout.createOrderFromCart(filledCart.body.id);
  order = await checkout.setOrderState(order.body.id, "Confirmed");
  order = await checkout.updateOrderCustomState(
    order.body.id,
    "tt-order-packed"
  );
  if (order) {
    return {
      status: 201,
      message: "order created: " + order.body.id,
    };
  }
};

//done - without setshippingMethod.
// checkoutProcess().then(log).catch(log);
