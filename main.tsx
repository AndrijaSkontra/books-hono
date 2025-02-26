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
      </head>
      <body hx-boost>
        <form hx-post="/books" hx-target="#books" hx-swap="beforeend">
          <input name="book" />
          <button type="submit">Add Book</button>
        </form>
        <ul id="books">
          <li>Harry Potter</li>
        </ul>
      </body>
    </html>
  );
}

function Books({ book }: { book: string }) {
  return <li>{book}</li>;
}

app.get("/", (c: Context) => {
  return c.html(<Index />);
});

app.post("/books", async (c: Context) => {
  const formData = await c.req.formData();
  const book = formData.get("book") as string;
  if (book) {
    return c.html(<Books book={book} />);
  } else {
    return new Response("Invalid book", { status: 400 });
  }
});

Deno.serve(app.fetch);
