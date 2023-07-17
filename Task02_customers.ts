import { Customer, CustomerDraft } from "@commercetools/platform-sdk";
import {
  createCustomer,
  getCustomerById,
  getCustomerByKey,
  createCustomerToken,
  confirmCustomerEmail,
  assignCustomerToCustomerGroup,
} from "./handson/customer";
import { log } from "./utils/logger";

const customerDraft: CustomerDraft = {
  firstName: "Testssds",
  lastName: "Testesssr",
  email: "test@testdds.com",
  password: "MihsidfrQ@s520",
  key: "tt-customer",
  addresses: [
    {
      country: "DE",
      key: "tt-customer-address",
    },
  ],
  defaultBillingAddress: 0,
  defaultShippingAddress: 0,
};

// const customer: Customer = {
//   id: "b9d5d17b-f074-48d5-8908-9f2aec386e2a",
//   version: 1,
//   versionModifiedAt: "2023-07-17T07:25:44.124Z",
//   lastMessageSequenceNumber: 1,
//   createdAt: "2023-07-17T07:25:44.124Z",
//   lastModifiedAt: "2023-07-17T07:25:44.124Z",
//   lastModifiedBy: {
//     clientId: "lFzMFIKmRmCkpiR6NbsG35pj",
//     isPlatformClient: false,
//   },
//   createdBy: {
//     clientId: "lFzMFIKmRmCkpiR6NbsG35pj",
//     isPlatformClient: false,
//   },
//   email: "test@testdds.com",
//   firstName: "Testssds",
//   lastName: "Testesssr",
//   password: "****4I4=",
//   addresses: [
//     {
//       id: "UHCcLv9n",
//       country: "DE",
//       key: "tt-customer-address",
//     },
//   ],
//   defaultShippingAddressId: "UHCcLv9n",
//   defaultBillingAddressId: "UHCcLv9n",
//   shippingAddressIds: ["UHCcLv9n"],
//   billingAddressIds: ["UHCcLv9n"],
//   isEmailVerified: false,
//   key: "tt-customer",
//   stores: [],
//   authenticationMode: "Password",
// };

// createCustomerToken(customer);

// createCustomer(customerDraft).then(log).catch(log);

// getCustomerByKey(customerDraft.key!).then(log).catch(log);

// getCustomerByKey(customerDraft.key!)
//     .then(createCustomerToken)
//     .then(confirmCustomerEmail)
//     .then(log)
//     .catch(log);

assignCustomerToCustomerGroup(customerDraft.key!, "gold").then(log).catch(log);
