import { apiRoot } from "./handson/client";
import {
  getStoreByKey,
  getCustomersInStore,
  createInStoreCart,
} from "./handson/store";
import { getCustomerByKey } from "./handson/customer";
import { log } from "./utils/logger";

const storeKey = "default";

//avavilable stores: ["default", "dach", "uk", "europe"]
//done
// getStoreByKey(storeKey).then(log).catch(log);

//done
// getCustomersInStore(storeKey)
//   .then((customers) => {
//     log(customers.body.count);
//     customers.body.results.forEach((customer) => log(customer.id));
//   })
//   .catch(log);

//done
getCustomerByKey("tt-customer")
  .then((customer) => {
    createInStoreCart(storeKey, customer).then(log).catch(log);
  })
  .catch(log);
