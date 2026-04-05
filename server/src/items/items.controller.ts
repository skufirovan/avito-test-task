import type Fastify from "fastify";
import { ZodError, treeifyError } from "zod";
import { ItemsGetInQuerySchema, ItemUpdateInSchema } from "../validation.ts";
import { itemsService } from "./items.service.ts";

export const itemsController = {
  getById(
    request: Fastify.FastifyRequest<{ Params: { id: string } }>,
    reply: Fastify.FastifyReply,
  ) {
    const itemId = Number(request.params.id);

    if (!Number.isFinite(itemId)) {
      return reply.status(400).send({
        success: false,
        error: "Item ID path param should be a number",
      });
    }

    const item = itemsService.getById(itemId);

    if (!item) {
      return reply.status(404).send({
        success: false,
        error: "Item with requested id doesn't exist",
      });
    }

    return reply.send(item);
  },

  getList(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {
    const query = ItemsGetInQuerySchema.parse(request.query);
    const result = itemsService.getList(query);

    return reply.send(result);
  },

  update(
    request: Fastify.FastifyRequest<{ Params: { id: string }; Body: unknown }>,
    reply: Fastify.FastifyReply,
  ) {
    const itemId = Number(request.params.id);

    if (!Number.isFinite(itemId)) {
      return reply.status(400).send({
        success: false,
        error: "Item ID path param should be a number",
      });
    }

    try {
      const existingItem = itemsService.getById(itemId);

      if (!existingItem) {
        return reply.status(404).send({
          success: false,
          error: "Item with requested id doesn't exist",
        });
      }

      const parsedData = ItemUpdateInSchema.parse({
        category: existingItem.category,
        ...(request.body as object),
      });

      itemsService.update(itemId, parsedData);

      return reply.send({ success: true });
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({
          success: false,
          error: treeifyError(error),
        });
      }

      throw error;
    }
  },
};
