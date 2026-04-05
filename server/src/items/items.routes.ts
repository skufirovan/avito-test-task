import type { FastifyInstance } from "fastify";
import { itemsController } from "./items.controller.ts";

export async function itemsRoutes(fastify: FastifyInstance) {
  fastify.get("/items", itemsController.getList);
  fastify.get("/items/:id", itemsController.getById);
  fastify.put("/items/:id", itemsController.update);
}
