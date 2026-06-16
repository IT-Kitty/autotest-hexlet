import { describe, expect, it } from 'vitest';
import { prepareArticles } from './index.js';

describe('prepareArticles', () => {
  it('keeps only published articles with non-empty titles', () => {
    const articles = [
      {
        title: '  Intro to testing  ',
        tags: ['Node', ' node ', '', 'Vitest'],
        rating: 8,
        published: true,
        content: 'one two three four',
      },
      {
        title: 'Draft article',
        tags: ['draft'],
        rating: 10,
        published: false,
        content: 'draft content',
      },
      {
        title: '   ',
        tags: ['ignored'],
        rating: 7,
        published: true,
        content: 'ignored content',
      },
    ];

    expect(prepareArticles(articles)).toEqual([
      {
        title: 'Intro to testing',
        tags: ['node', 'vitest'],
        rating: 8,
        readingTime: 1,
      },
    ]);
  });

  it('sorts articles by rating and then by title', () => {
    const articles = [
      {
        title: 'Beta article',
        tags: [],
        rating: 6,
        published: true,
        content: 'alpha beta gamma',
      },
      {
        title: 'Alpha article',
        tags: [],
        rating: 9,
        published: true,
        content: 'alpha beta gamma delta epsilon zeta',
      },
      {
        title: 'Another article',
        tags: [],
        rating: 6,
        published: true,
        content: Array.from({ length: 401 }, () => 'word').join(' '),
      },
    ];

    expect(prepareArticles(articles)).toEqual([
      {
        title: 'Alpha article',
        tags: [],
        rating: 9,
        readingTime: 1,
      },
      {
        title: 'Another article',
        tags: [],
        rating: 6,
        readingTime: 3,
      },
      {
        title: 'Beta article',
        tags: [],
        rating: 6,
        readingTime: 1,
      },
    ]);
  });

  it('treats empty content as one minute of reading time', () => {
    expect(
      prepareArticles([
        {
          title: 'Short note',
          tags: ['Note'],
          rating: 1,
          published: true,
          content: '',
        },
      ]),
    ).toEqual([
      {
        title: 'Short note',
        tags: ['note'],
        rating: 1,
        readingTime: 1,
      },
    ]);
  });
});
