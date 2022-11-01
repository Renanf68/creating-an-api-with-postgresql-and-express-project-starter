import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import mythical_weapon_routes from "./handlers/mythical_weapon";
import user_routes from "./handlers/user";
import order_routes from "./handlers/order";
import product_routes from "./handlers/product";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

const corsOptions = {
  origin: "http://otherdomain.com",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

// mythical_weapon_routes(app);
user_routes(app);
product_routes(app);
order_routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
