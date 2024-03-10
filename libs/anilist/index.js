const { getAnimSearchQuery } = require("./queries");

const endpoint = process.env.ENDPOINT_ANILIST;

async function anilistFetch({ query, variables }) {
  try {
    const results = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query && query,
        variables: variables && variables,
      }),
    });

    if (!results.ok) {
      throw new Error(
        `Fetch failed with status ${results.status}; Error: ${results.statusText}`
      );
    }

    const { data } = await results.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}

async function searchAnime(keyword, perPage) {
  const variables = {
    page: 1,
    perPage: perPage,
    type: "ANIME",
    sort: "SEARCH_MATCH",
    search: keyword,
  };

  const res = await anilistFetch({
    query: getAnimSearchQuery,
    variables: variables,
  });

  const {
    search: { pageInfo, media },
  } = res;

  return media;
}

module.exports = { searchAnime };
