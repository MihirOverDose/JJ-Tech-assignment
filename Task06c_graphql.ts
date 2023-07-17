import { apiRoot } from "./handson/client";
import { log } from "./utils/logger";

const query = `
query {
    orders {
      results {
        customer {
          email
        }
        lineItems {
          nameAllLocales {
            value
          }
        }
        totalPrice {
          centAmount
        }
      }
    }
  }
  `;

//checked but no idea about how to fetch graphQL query
apiRoot
  .graphql()
  .post({
    body: {
      query,
      variables: {},
    },
  })
  .execute()
  .then(log)
  .catch(log);
