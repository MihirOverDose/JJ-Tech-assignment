import { CustomerSignin } from "@commercetools/platform-sdk";
import * as checkout from "./handson/order";
import { log } from "./utils/logger";

const customerKey = "tt-customer";

// "Anonymous Cart: d5ee2f1f-85c2-4ca0-a854-c708ca93e0db"
// "Customer Cart: 6a0f289a-fe27-4fc2-a279-61ee6020cb18"
// "Active cart: d5ee2f1f-85c2-4ca0-a854-c708ca93e0db"
// "A0E200000001WG3 :1"
// "M0E20000000ELDB :1"

const mergingProcessTest = async () => {
  let anonymousCart = await checkout.createAnonymousCart();

  let customerCart = await checkout.createCart(customerKey);

  anonymousCart = await checkout.addLineItemsToCart(anonymousCart.body.id, [
    "A0E200000001WG3",
    "M0E20000000ELDB",
  ]);

  customerCart = await checkout.addLineItemsToCart(customerCart.body.id, [
    "A0E200000001WG3",
    "M0E20000000ELDB",
  ]);

  log("Anonymous Cart: " + anonymousCart.body.id);
  log("Customer Cart: " + customerCart.body.id);

  const customerDetails: CustomerSignin = {
    email: "test@testdds.com",
    password: "MihsidfrQ@s520",
    anonymousCartId: anonymousCart.body.id,
    anonymousCartSignInMode: "MergeWithExistingCustomerCart", // try switching to UseAsNewActiveCustomerCart
  };

  let result = await checkout.customerSignIn(customerDetails);
  return result.body.cart;
};

mergingProcessTest()
  .then((cart) => {
    log("Active cart: " + cart!.id);
    cart!.lineItems.forEach((item) => {
      log(item.variant.sku + " :" + item.quantity);
    });
  })
  .catch(log);
