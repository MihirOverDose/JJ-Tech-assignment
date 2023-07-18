import { SubscriptionDraft } from "@commercetools/platform-sdk";
import { apiRoot } from "./handson/client";
import { log } from "./utils/logger";
import { Prefix, readConfig } from "./utils/config";

// key - String - Optional - User-specific unique identifier for the subscription
// destination - Destination - The Message Queue into which the notifications are to be sent
// messages - Array of MessageSubscription - Optional - The messages to be subscribed to.
// changes

//response
// {
//     "id": "072fe6b1-e62a-4e61-8938-d7fbd7c0f8b9",
//     "version": 1,
//     "versionModifiedAt": "2023-07-18T06:23:42.491Z",
//     "createdAt": "2023-07-18T06:23:42.491Z",
//     "lastModifiedAt": "2023-07-18T06:23:42.491Z",
//     "lastModifiedBy": {
//         "clientId": "lFzMFIKmRmCkpiR6NbsG35pj",
//         "isPlatformClient": false
//     },
//     "createdBy": {
//         "clientId": "lFzMFIKmRmCkpiR6NbsG35pj",
//         "isPlatformClient": false
//     },
//     "destination": {
//         "type": "GoogleCloudPubSub",
//         "projectId": "ct-support",
//         "topic": "training-subscription-sample"
//     },
//     "messages": [
//         {
//             "resourceTypeId": "order",
//             "types": [
//                 "OrderCreated"
//             ]
//         }
//     ],
//     "changes": [],
//     "format": {
//         "type": "Platform"
//     },
//     "status": "Healthy",
//     "key": "subscriptionSample"
// }

// C O N G R A T U L A T I O N S : HTTP Status 201

const subscriptionDraft: SubscriptionDraft = {
  key: "subscriptionSample",
  destination: {
    type: "GoogleCloudPubSub",
    projectId: "ct-support",
    topic: "training-subscription-sample",
  },
  messages: [
    {
      resourceTypeId: "order",
      types: ["OrderCreated"],
    },
  ],
};

// const subscriptionDraft: SubscriptionDraft = {
//     key: "subscriptionSample",
//     destination: {
//         type: "SQS",
//         queueUrl: "https://sqs.eu-central-1.amazonaws.com/349839637243/Training-Demo",
//         authenticationMode: "IAM",
//         region: "eu-central-1"
//     },
//     messages: [{
//         resourceTypeId: "order",
//         types: ["OrderCreated"]
//     }]
// }

apiRoot
  .subscriptions()
  .post({ body: subscriptionDraft })
  .execute()
  .then(log)
  .catch(log);
