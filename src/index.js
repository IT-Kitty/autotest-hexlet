const WORDS_PER_MINUTE = 200;

function normalizeTags(tags = []) {
  return [...new Set(
    tags
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean),
  )];
}

function countWords(text = '') {
  const words = String(text).trim().split(/\s+/).filter(Boolean);
  return words.length;
}

export function prepareArticles(articles) {
  return articles
    .filter((article) => article.published === true)
    .map((article) => {
      const title = String(article.title ?? '').trim();

      return {
        title,
        tags: normalizeTags(article.tags),
        rating: Number(article.rating ?? 0),
        readingTime: Math.max(1, Math.ceil(countWords(article.content) / WORDS_PER_MINUTE)),
      };
    })
    .filter((article) => article.title.length > 0)
    .sort((left, right) => {
      if (right.rating !== left.rating) {
        return right.rating - left.rating;
      }

      return left.title.localeCompare(right.title);
    });
}
