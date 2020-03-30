export default async () => {
  const user = await JSON.parse(localStorage.getItem("user"));
  return user;
};
