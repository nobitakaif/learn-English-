import { Elysia } from "elysia";
import { user } from "./modules/user";

const app = new Elysia({prefix : "/api/v1"})
  .use(user)

app.listen(8000, () =>{
  console.log("server is running on port 8000")
})
