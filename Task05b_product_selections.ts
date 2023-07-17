import {
  getProductsInStore,
  addProductSelectionToStore,
} from "./handson/store";
import {
  getProductSelectionByKey,
  createProductSelection,
  addProductsToProductSelection,
  getProductsInProductSelection,
} from "./handson/productSelections";

import { log } from "./utils/logger";

const productSelectionKey = "tt-berlin-store-selection";

//done
// createProductSelection(productSelectionKey, "Berlin Store Selection")
//   .then(log)
//   .catch(log);

//done
// getProductSelectionByKey(productSelectionKey).then(log).catch(log);

// done

//note...: this is product Key
// addProductsToProductSelection(productSelectionKey, ["82378"])
//   .then(log)
//   .catch(log);

//done
// getProductsInProductSelection(productSelectionKey).then(log).catch(log);

//this is storeKey
//done
// addProductSelectionToStore("default", productSelectionKey).then(log).catch(log);

//done
getProductsInStore("default").then(log).catch(log);
