import { ExtensionDraft } from "@commercetools/platform-sdk";
import { apiRoot } from "./handson/client";
import { log } from "./utils/logger";
import { Prefix, readConfig } from "./utils/config";

/**
 * Use extensionDraft:any instead of ExtensionDraft until they
 * add GoogleCloudFunction to the SDK
 */

//done -- need to understand
const extensionDraft: any = {
  key: "tt-order-checker-v2",
  destination: {
    type: "GoogleCloudFunction",
    url: "https://europe-west1-ct-support.cloudfunctions.net/training-extensions-sample",
  },
  triggers: [
    {
      resourceTypeId: "order",
      actions: ["Create", "Update"],
    },
  ],
};

// const { clientId, clientSecret } = readConfig(Prefix.AWS);
// const extensionDraft: ExtensionDraft = {
//     key: "tt-order-checker",
//     destination: {
//         type: "AWSLambda",
//         arn: "arn:aws:lambda:eu-central-1:349839637243:function:ct-training-demo",
//         accessKey: clientId,
//         accessSecret: clientSecret
//     },
//     triggers: [{
//         resourceTypeId: "order",
//         actions: ["Create"]
//     }]
// }

apiRoot
  .extensions()
  .post({ body: extensionDraft })
  .execute()
  .then(log)
  .catch(log);
