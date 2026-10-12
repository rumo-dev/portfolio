# 丸毛 温仁 | Portfolio

グラフィックスプログラマー志望・丸毛 温仁のポートフォリオサイトのソースです。
公開URL: https://rumo-dev.github.io/portfolio/

## 構成

| パス | 内容 |
| :-- | :-- |
| `src/pages/index.astro` | 採用担当向けトップページ（ヒーロー / 制作実績 / 強み / スキル / プロフィール / 連絡先） |
| `src/content/docs/guides/` | 制作実績の詳細ページ（AtmosFiore / Coin Baller / FIGAVOID） |
| `src/content/docs/reference/` | AtmosFiore の技術解説（PBR・ディファードライティング・ポストプロセスなど） |
| `src/components/ProjectSummary.astro` | 作品ページ冒頭の担当・期間・成果サマリー |

## 技術

[Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/) / GitHub Pages

## 開発

```bash
npm install
npm run dev      # http://localhost:4321/portfolio/
npm run build    # ./dist/ に出力
```

## 編集のしかた

- トップの「最初に見てほしい3ページ」「次に学ぶ予定」「実績」「活動の記録」「Q&A」は `src/data/profile.ts` を編集します（空の配列にしたセクションは非表示）。
- ヒーロー背景のループ動画: `public/media/hero.mp4`（必須）と `public/media/hero.webm`（任意）を置きます。無い場合は静止画が表示されます。
- Lighthouse スコアの表示: `npm install -D lighthouse chrome-launcher` のあと `npm run lighthouse` を実行すると `src/data/lighthouse.json` が生成され、トップのフッターに表示されます。

## メモ

- プロフィール写真: `src/assets/profile.jpg`（png / webp も可）を置くとトップの「プロフィール」に自動表示されます。
- `src/content/docs/debug/` は `draft: true` のため本番ビルドには含まれません（`npm run dev` では確認できます）。
