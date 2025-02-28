import { Context, Hono } from "hono";
import { html } from "hono/html";
import { serveStatic } from "hono/deno";
import indexHtml from "./views/index.ts";

const app = new Hono();

//middleware to serve all static files in the /public dir
app.use("/public/*", serveStatic({ root: "./" }));

app.get("/", (c: Context) => {
  return c.html(indexHtml());
});

app.post("/books", async (c: Context) => {
  const formData = await c.req.formData();
  const book = formData.get("book") as string;
  await sleep(1000);
  if (book) {
    return c.html(html` <li>${book}</li> `);
  } else {
    return new Response("Invalid book", { status: 400 });
  }
});

Deno.serve(app.fetch);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
