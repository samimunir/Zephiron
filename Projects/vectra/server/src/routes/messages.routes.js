import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";
import requirePro from "../middleware/requirePro.js";

import {
  listMessagesSchema,
  createMessageSchema,
  editMessageSchema,
  deleteMessageSchema,
} from "../validators/discussions.schema.js";

import {
  listMessages,
  createMessage,
  editMessage,
  deleteMessage,
} from "../controllers/messages.controller.js";

const r = Router();

// List messages for a thread
r.get(
  "/discussions/:id/messages",
  requireAuth,
  validate(listMessagesSchema),
  listMessages
);

// Post new message (Pro only)
r.post(
  "/discussions/:id/messages",
  requireAuth,
  requirePro,
  validate(createMessageSchema),
  createMessage
);

// Edit / delete individual message (author only)
r.patch(
  "/messages/:messageId",
  requireAuth,
  requirePro,
  validate(editMessageSchema),
  editMessage
);
r.delete(
  "/messages/:messageId",
  requireAuth,
  requirePro,
  validate(deleteMessageSchema),
  deleteMessage
);

export default r;
