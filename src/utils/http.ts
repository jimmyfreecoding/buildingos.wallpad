export const http = (url, method = "GET", data = undefined, base = "") => {
  // baseUrl
  const baseUrl = "http://10.205.66.7:1880";

  if (method === "GET" && !!Object.keys(data)?.length) {
    url += "?";
    for (const k in data) {
      url += k + "=" + data[k] + "&";
    }
    url.substring(0, url.length - 2);
  }

  return fetch((base ? base : baseUrl) + url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: method === "GET" ? undefined : data,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
};
