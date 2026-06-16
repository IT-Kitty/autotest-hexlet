# autotest-hexlet

Репозиторий с учебным заданием на `vitest`.

## Суть задания

Нужно реализовать функцию, которая готовит список статей к публикации:

- оставляет только опубликованные статьи;
- обрезает лишние пробелы в названии;
- убирает дубли и пустые значения из тегов;
- считает примерное время чтения;
- сортирует статьи по рейтингу и названию.

## Ветки

- `source` - ветка с заданием, тестами и решением;
- `main` - ветка с заданием и тестами без решения.

## Запуск тестов

```bash
npm install
npm test
```

## Статус проверки

[![Tests](https://github.com/IT-Kitty/autotest-hexlet/actions/workflows/test-check.yml/badge.svg?branch=source)](https://github.com/IT-Kitty/autotest-hexlet/actions/workflows/test-check.yml)
