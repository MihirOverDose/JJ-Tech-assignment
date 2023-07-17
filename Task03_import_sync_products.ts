import {
  checkImportOperationStatusById,
  checkImportOperationsStatus,
  checkImportSummary,
  createImportContainer,
  importProductDrafts,
} from "./handson/importService";
import { log } from "./utils/logger";

const containerKey = "tt-ImportContainer-2";

// Create an import container --Done
// createImportContainer(containerKey).then(log).catch(log);

// import products --Done
// importProductDrafts(containerKey).then(log).catch(log);

// check import summary for your container --Done
// checkImportSummary(containerKey).then(log).catch(log);

// check import operations for your container --done status.. processing.
// checkImportOperationsStatus(containerKey).then((operations) =>
//   operations.body.results.forEach((operation) =>
//     log(operation.id + " : " + operation.state)
//   )
// );

// Check the status of import operations by their Ids --Done
// checkImportOperationStatusById("ddb5b0e6-567d-4a9f-8a59-2a967eb09c6f")
//   .then(log)
//   .catch(log);
// checkImportOperationStatusById("77249930-3bd2-4ca6-b815-9833610bc86b")
//   .then(log)
//   .catch(log);

// https://github.com/commercetools/commercetools-project-sync#run
// docker run \
// -e SOURCE_PROJECT_KEY=xxx \
// -e SOURCE_CLIENT_ID=xxx \
// -e SOURCE_CLIENT_SECRET=xxx \
// -e TARGET_PROJECT_KEY=xxx \
// -e TARGET_CLIENT_ID=xxx \
// -e TARGET_CLIENT_SECRET=xxx \
// commercetools/commercetools-project-sync:5.0.0 -s all
