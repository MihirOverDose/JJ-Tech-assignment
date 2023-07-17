import {
  ClientResponse,
  Cart,
  CustomerSignin,
  CustomerSignInResult,
  Order,
  OrderFromCartDraft,
  OrderState,
  Customer,
} from "@commercetools/platform-sdk";
import { apiRoot } from "./client";
import { getCustomerByKey } from "./customer";

//avavilable country code
//['UNDEFINED','AC','AD','AE','AF','AG','AI','AL','AM','AN','AO','AQ','AR','AS','AT','AU','AW','AX','AZ','BA','BB','BD','BE','BF','BG','BH','BI','BJ','BL','BM','BN','BO','BQ','BR','BS','BT','BU','BV','BW','BY','BZ','CA','CC','CD','CF','CG','CH','CI','CK','CL','CM','CN','CO','CP','CR','CS','CU','CV','CW','CX','CY','CZ','DE','DG','DJ','DK','DM','DO','DZ','EA','EC','EE','EG','EH','ER','ES','ET','EU','EZ','FI','FJ','FK','FM','FO','FR','FX','GA','GB','GD','GE','GF','GG','GH','GI','GL','GM','GN','GP','GQ','GR','GS','GT','GU','GW','GY','HK','HM','HN','HR','HT','HU','IC','ID','IE','IL','IM','IN','IO','IQ','IR','IS','IT','JE','JM','JO','JP','KE','KG','KH','KI','KM','KN','KP','KR','KW','KY','KZ','LA','LB','LC','LI','LK','LR','LS','LT','LU','LV','LY','MA','MC','MD','ME','MF','MG','MH','MK','ML','MM','MN','MO','MP','MQ','MR','MS','MT','MU','MV','MW','MX','MY','MZ','NA','NC','NE','NF','NG','NI','NL','NO','NP','NR','NT','NU','NZ','OM','PA','PE','PF','PG','PH','PK','PL','PM','PN','PR','PS','PT','PW','PY','QA','RE','RO','RS','RU','RW','SA','SB','SC','SD','SE','SF','SG','SH','SI','SJ','SK','SL','SM','SN','SO','SR','SS','ST','SU','SV','SX','SY','SZ','TA','TC','TD','TF','TG','TH','TJ','TK','TL','TM','TN','TO','TP','TR','TT','TV','TW','TZ','UA','UG','UK','UM','US','UY','UZ','VA','VC','VE','VG','VI','VN','VU','WF','WS','XA','XB','XI','XK','YE','YT','YU','ZA','ZM','ZR','ZW']

export const createCart = async (
  customerKey: string
): Promise<ClientResponse<Cart>> => {
  let customer = await apiRoot
    .customers()
    .withKey({ key: customerKey })
    .get()
    .execute();

  return apiRoot
    .carts()
    .post({
      body: {
        customerId: customer.body.id,
        currency: "USD",
        country: "US",
        customerEmail: customer.body.email,
        shippingAddress: customer.body.addresses.find(
          (address) => address.id === customer.body.defaultShippingAddressId
        ),
      },
    })
    .execute();
};

export const createAnonymousCart = (): Promise<ClientResponse<Cart>> =>
  apiRoot
    .carts()
    .post({
      body: {
        currency: "EUR",
        country: "DE",
      },
    })
    .execute();

export const customerSignIn = (
  customerDetails: CustomerSignin
): Promise<ClientResponse<CustomerSignInResult>> =>
  apiRoot
    .login()
    .post({
      body: customerDetails,
    })
    .execute();

export const getCartById = (ID: string): Promise<ClientResponse<Cart>> =>
  apiRoot.carts().withId({ ID }).get().execute();

export const addLineItemsToCart = async (
  cartId: string,
  arrayOfSKUs: Array<string>
): Promise<ClientResponse<Cart>> => {
  const cart = await getCartById(cartId);
  return apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cart.body.version,
        actions: arrayOfSKUs.map((skuOfProduct) => {
          return {
            action: "addLineItem",
            sku: skuOfProduct,
          };
        }),
      },
    })
    .execute();
};

export const addDiscountCodeToCart = (
  cartId: string,
  discountCode: string
): Promise<ClientResponse<Cart>> => {
  return getCartById(cartId).then((cart) =>
    apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.body.version,
          actions: [
            {
              action: "addDiscountCode",
              code: discountCode,
            },
          ],
        },
      })
      .execute()
  );
};

export const recalculate = (cartId: string): Promise<ClientResponse<Cart>> =>
  getCartById(cartId).then((cart) =>
    apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.body.version,
          actions: [
            {
              action: "recalculate",
            },
          ],
        },
      })
      .execute()
  );

export const setShippingMethod = async (
  cartId: string
): Promise<ClientResponse<Cart>> => {
  const matchingShippingMethod = await apiRoot
    .shippingMethods()
    .matchingCart()
    .get({
      queryArgs: {
        cartId,
      },
    })
    .execute()
    .then((response) => response.body.results[0]);

  console.log(matchingShippingMethod);
  return getCartById(cartId).then((cart) =>
    apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.body.version,
          actions: [
            {
              action: "setShippingMethod",
              shippingMethod: {
                typeId: "shipping-method",
                id: matchingShippingMethod.id,
              },
            },
          ],
        },
      })
      .execute()
  );
};

export const createOrderFromCart = async (
  cartId: string
): Promise<ClientResponse<Order>> => {
  const bodyOfCart = await createOrderFromCartDraft(cartId);
  return apiRoot
    .orders()
    .post({
      body: bodyOfCart,
    })
    .execute();
};

const createOrderFromCartDraft = (
  cartId: string
): Promise<OrderFromCartDraft> =>
  getCartById(cartId).then((cart) => {
    return {
      cart: {
        id: cartId,
        typeId: "cart",
      },
      version: cart.body.version,
    };
  });

export const getOrderById = (ID: string): Promise<ClientResponse<Order>> =>
  apiRoot.orders().withId({ ID }).get().execute();

export const updateOrderCustomState = (
  orderId: string,
  customStateKey: string
): Promise<ClientResponse<Order>> => {
  return getOrderById(orderId).then((order) =>
    apiRoot
      .orders()
      .withId({ ID: orderId })
      .post({
        body: {
          version: order.body.version,
          actions: [
            {
              action: "transitionState",
              state: {
                key: customStateKey,
                typeId: "state",
              },
            },
          ],
        },
      })
      .execute()
  );
};

export const setOrderState = (
  orderId: string,
  stateName: OrderState
): Promise<ClientResponse<Order>> => {
  return getOrderById(orderId).then((order) =>
    apiRoot
      .orders()
      .withId({ ID: orderId })
      .post({
        body: {
          version: order.body.version,
          actions: [
            {
              action: "changeOrderState",
              orderState: stateName,
            },
          ],
        },
      })
      .execute()
  );
};

export const addPaymentToCart = (
  cartId: string,
  paymentId: string
): Promise<ClientResponse<Cart>> =>
  getCartById(cartId).then((cart) =>
    apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.body.version,
          actions: [
            {
              action: "addPayment",
              payment: {
                typeId: "payment",
                id: paymentId,
              },
            },
          ],
        },
      })
      .execute()
  );
