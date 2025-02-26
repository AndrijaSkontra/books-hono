import { Context, Hono } from "hono";

const app = new Hono();

function Index() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Shkoki Books</title>
        <script
          src="https://unpkg.com/htmx.org@2.0.4"
          integrity="sha384-HGfztofotfshcF7+8n44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+"
          crossorigin="anonymous"
        ></script>
        <script src="https://unpkg.com/@tailwindcss/browser@4.0.9/dist/index.global.js"></script>
      </head>
      <body hx-boost>
        <form hx-post="/books" hx-target="#books">
          <input hidden={true} value="somevalue" name="something" />
          <button
            className="p-1 rounded-md shadow-md border-gray-400 border-1"
            type="submit"
          >
            Get Books
          </button>
        </form>
        <div id="books"></div>
      </body>
    </html>
  );
}

function Books() {
  return <p>All Books</p>;
}

app.get("/", (c: Context) => {
  return c.html(<Index />);
});

app.post("/books", async (c: Context) => {
  const formData = await c.req.formData();
  console.log(formData.get("something"));
  return c.html(<Books />);
});

Deno.serve(app.fetch);
