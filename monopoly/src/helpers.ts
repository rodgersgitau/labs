export async function getRandomUser() {
  try {
    const apiURL = "https://randomuser.me/api/?nat=us,gb";
    const response = await fetch(apiURL);
    const { results } = await response.json();
    const { first, last } = results[0]?.name;
    return `${first} ${last}`;
  } catch (error: any) {
    const message = error?.message as string;
    throw new Error(message);
  }
}
