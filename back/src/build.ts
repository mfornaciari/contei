import Elysia from "elysia";
import { contei } from "./plugins/contei";

export function build(port: number): Elysia {
  const app = new Elysia().use(contei).listen(port);

  return app;
}
