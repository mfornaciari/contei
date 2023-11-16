import { build } from "./build";

const app = build();

console.log(`Running at ${app.server?.hostname}:${app.server?.port}`);
