import { API_BASE_URL, API_KEY } from "../config/apiConfig";

export const fetchData = async (category = "general") => {
  try {
    const url = new URL(API_BASE_URL);
    url.searchParams.append("category", category);
    url.searchParams.append("token", API_KEY);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Something went wrong. Please try again later.", error);
    throw error;
  }
};
