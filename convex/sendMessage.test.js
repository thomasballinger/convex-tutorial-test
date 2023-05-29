import { expect, it, vi } from "vitest";
import sendMessage from "./sendMessage";

it("should work", async () => {
  const ctx = { db: { insert: vi.fn() } };
  const body = "hello";
  const author = "me";
  await sendMessage(ctx, { body, author });
  expect(ctx.db.insert.mock.calls.length === 1);
  expect(ctx.db.insert.mock.calls[0]).toEqual(["messages", { author, body }]);
});
