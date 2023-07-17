import { getMe, getMyOrders } from "./handson/my";
import { log } from "./utils/logger";

//done
// getMe().then(log).catch(log);

//done
// "df3cc924-d373-4f4e-ae88-85672040b750 : 57125"
// "ee807e29-ac46-4b91-984d-7a836e006b20 : 57125"
getMyOrders()
  .then((orders) =>
    orders.body.results.forEach((order) =>
      log(order.id + " : " + order.totalPrice.centAmount)
    )
  )
  .catch(log);
