import { Elysia } from "elysia";
import { setup } from "./plugins/setup";
import { contei } from "./plugins/contei";

const port = Number(Bun.env.PORT);
const app = new Elysia().use(setup).use(contei).listen(port);

console.log(`Running at ${app.server?.hostname}:${app.server?.port}`);
