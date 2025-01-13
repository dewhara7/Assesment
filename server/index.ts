import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import { connect } from "./src/utils/db";
import userRouter from "./src/routes/user.route";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
connect()
  .then(() => {
    console.log("db connected");
    app.listen(3000, () => {
      console.log(`Server listening on port 4000`);
    });
  })
  .catch((err) => {
    console.error("conn err", err);
  });
