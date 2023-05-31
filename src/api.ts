import axios from "axios";

const BASE_URL = "https://api.github.com/search/repositories";

export const fetchRepositories = async (
  keyword: string = "react",
  page = 1,
  perPage = 20
) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: `${keyword} in:name`,
        sort: "stars",
        order: "desc",
        page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Помилка під час отримання даних з GitHub API:", error);
    throw error;
  }
};
