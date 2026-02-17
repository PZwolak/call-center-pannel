# Call Center Panel

Aplikacja webowa do obsługi zgłoszen klientow call center. Umozliwia przegladanie, filtrowanie i aktualizowanie statusow zgloszen.

## Tech stack

- Vue 3 (Composition API)
- Pinia
- Vue Router
- PrimeVue
- Sass (SASS)

## Funkcje

- Lista zgloszen z filtrowaniem po statusie
- Szczegoly zgloszenia z mozliwoscia zmiany statusu
- Klikalne wiersze w tabeli
- Loader podczas ladowania danych
- Responsywne UI

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

Repozytorium: https://github.com/PZwolak/call-center-pannel

Aplikacja korzysta z `base` ustawionego w `vite.config.ts`:

```ts
base: '/call-center-pannel/'
```

Publikacja:

```bash
npm run build:gh
npm run deploy
```

Po wdrozeniu aplikacja bedzie dostepna pod adresem:

```
https://pzwolak.github.io/call-center-pannel/
```

## Skrypty

- `npm run dev` - start dev server
- `npm run build` - build produkcyjny
- `npm run test:unit` - testy jednostkowe
- `npm run build:gh` - build pod GitHub Pages
- `npm run deploy` - publikacja na GitHub Pages
