import { expect, it, vi } from "vitest";
import sendMessage, { sendMeatLorumIpsum } from "./sendMessage";

it("sendMessage should insert a message", async () => {
  const ctx = { db: { insert: vi.fn() } };
  const body = "hello";
  const author = "me";
  await sendMessage(ctx, { body, author });
  expect(ctx.db.insert.mock.calls.length === 1);
  expect(ctx.db.insert.mock.calls[0]).toEqual(["messages", { author, body }]);
});

it("sendMeatLorumIpsum should should insert a long message", async () => {
  const ctx = { runMutation: vi.fn() };
  await sendMeatLorumIpsum(ctx);
  expect(ctx.runMutation.mock.calls.length === 1);
  expect(ctx.runMutation.mock.calls[0][0]).toEqual("sendMessage");
  expect(ctx.runMutation.mock.calls[0][1].author).toEqual("baconipsum.com");
  expect(ctx.runMutation.mock.calls[0][1].body.length > 100).toBeTruthy();
});
