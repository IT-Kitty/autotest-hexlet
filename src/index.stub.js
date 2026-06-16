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
  throw new Error('Implement prepareArticles() in source branch');
}
