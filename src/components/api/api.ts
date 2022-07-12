const randomApi = "https://jsonplaceholder.typicode.com/posts";

export const search = async () => {
  const response = await fetch(randomApi, {headers: {"Access-Control-Allow-Origin": "*"}, method: "GET"});
  return response.json();
}