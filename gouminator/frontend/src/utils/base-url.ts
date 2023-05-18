export function getBaseUrl() {
  if (process.env.NODE_ENV === "production") {
    return "https://gouminator-api.fly.dev";
  } else {
    return "http://localhost:4001";
  }
}
