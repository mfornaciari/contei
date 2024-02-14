import { Elysia } from "elysia";
import { buildMatch } from "../match";

export type Setup = typeof setup;

export const setup = new Elysia({ name: "setup" }).state("match", buildMatch());
