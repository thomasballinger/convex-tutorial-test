import { action, mutation } from "./_generated/server";

export default mutation(async ({ db }, { body, author }) => {
  const message = { body, author };
  await db.insert("messages", message);
});

export const sendMeatLorumIpsum = action(async ({ runMutation }) => {
  const resp = await fetch(
    "https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text"
  );
  const text = await resp.text();
  runMutation("sendMessage", { body: text, author: "baconipsum.com" });
});
