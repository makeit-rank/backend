import * as express from "express";
import makeRapydRequest from "../../services/helpers/rapydAPI.service";
import controller from "./controller";

export default express
  .Router()

  .post("/login", controller.login)
  .get("/shit", async (req, res) => {
    try {
      const body = {
        amount: 100,
        complete_checkout_url: "http://example.com/complete",
        country: "IN",
        currency: "INR",
        requested_currency: "INR",
        merchant_reference_id: "950ae8c6-76",
        // payment_method_types_include: [
        //   "sg_credit_mastercard_card",
        //   "sg_credit_visa_card",
        // ],
      };
      const result = await makeRapydRequest("POST", "/v1/checkout", body);

      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error completing request", error);
      res.status(200).json(error);
    }
  })
  .post("/signup", controller.signup);
