import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import mythical_weapon_routes from "./handlers/mythical_weapon";
import userRoutes from "./handlers/user";
import orderRoutes from "./handlers/order";
import productRoutes from "./handlers/product";
import dashboardRoutes from "./handlers/dashboard";

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
userRoutes(app);
productRoutes(app);
orderRoutes(app);
dashboardRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
