const res = await fetch("http://localhost:5000/api/collection", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    uri: "mongodb+srv://admin:pass@cluster0.mongodb.net",
    database: "chatApp",
    collection: "users",
  }),
});
const result = await res.json();
console.log(result.data);
