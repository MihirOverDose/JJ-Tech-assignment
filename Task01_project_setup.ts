import { log } from "./utils/logger";
import { apiRoot } from "./handson/client";

// TODO: Complete the functions in
// ./handson/client.ts

// So this code displays the project configuration
// https://docs.commercetools.com/api/projects/project#get-project

// TODO: Get project settings
const getProejctSetting = async () => {
  const projectSetting = await apiRoot.get().execute();
  return projectSetting;
};

// TODO: Get shipping method by id

const getShippingMethodById = async (shippingId: string) => {
  const shippingMethod = await apiRoot
    .shippingMethods()
    .withId({ ID: shippingId })
    .get()
    .execute();

  // const shippingMethod = await apiRoot.shippingMethods().get().execute();
  return shippingMethod;
};

// TODO: Get standard tax category by key

const getTaxByKey = async (categoryKey: string) => {
  let tax = await apiRoot
    .taxCategories()
    .withKey({ key: categoryKey })
    .get()
    .execute();
  return tax;
};

// getProejctSetting().then(log).catch(log);
// getTaxByKey("standard").then(log).catch(log);
//shippingId: "b939f964-6055-4bee-be11-6cf5a32f4ec9
getShippingMethodById("b939f964-6055-4bee-be11-6cf5a32f4ec9")
  .then(log)
  .catch(log);
