import { apiRoot } from "./client";
import {
  ClientResponse,
  Customer,
  CustomerDraft,
  CustomerSignInResult,
  CustomerToken,
} from "@commercetools/platform-sdk";

export const getCustomerById = (
  ID: string
): Promise<ClientResponse<Customer>> => {
  return apiRoot.customers().withId({ ID }).get().execute();
};

export const getCustomerByKey = (
  key: string
): Promise<ClientResponse<Customer>> => {
  return apiRoot.customers().withKey({ key }).get().execute();
};
// Promise<ClientResponse<CustomerSignInResult>>
export const createCustomer = async (
  customerDraft: CustomerDraft
): Promise<any> => {
  return await apiRoot
    .customers()
    .post({
      body: customerDraft,
    })
    .execute();
};

export const createCustomerToken = async (
  customer: ClientResponse<Customer>
): Promise<ClientResponse<CustomerToken>> => {
  try {
    return apiRoot
      .customers()
      .passwordToken()
      .post({
        body: {
          email: customer.body.email,
          ttlMinutes: 10080,
        },
      })
      .execute();
  } catch (err) {
    throw new Error("Error in creating the Customer Token");
  }
};

export const confirmCustomerEmail = (
  token: ClientResponse<CustomerToken>
): Promise<ClientResponse<Customer>> => {
  try {
    return apiRoot
      .customers()
      .emailConfirm()
      .post({
        body: {
          tokenValue: token.body.value,
        },
      })
      .execute();
  } catch (err) {
    throw new Error("Error In Confirming the Customer Email");
  }
};

export const assignCustomerToCustomerGroup = (
  customerKey: string,
  customerGroupKey: string
): Promise<ClientResponse<Customer>> => {
  try {
    return apiRoot
      .customers()
      .withKey({ key: customerKey })
      .post({
        body: {
          version: 1,
          actions: [
            {
              action: "setCustomerGroup",
              customerGroup: {
                typeId: "customer-group",
                key: customerGroupKey,
              },
            },
          ],
        },
      })
      .execute();
  } catch (err) {
    throw new Error("Error In assignCustomerToCustomerGroup");
  }
};
