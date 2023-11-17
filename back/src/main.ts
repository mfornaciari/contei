import { build } from "./build";

const port = Number(Bun.env.PORT);
const app = build(port);

console.log(`Running at ${app.server?.hostname}:${app.server?.port}`);
