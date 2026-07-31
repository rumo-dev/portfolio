// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// ⚠️【重要】ご自身のGitHubユーザー名とリポジトリ名（例: haruto-marumo / AtmosFiore）に書き換えてください
	site: 'https://rumo-dev.github.io',
	base: '/portfolio',

	integrations: [
		starlight({
			title: 'AtmosFiore Docs & Portfolio',
			// 室内シェーダーの「灯火と闇」を表現するカスタムCSS
			customCss: ['./src/styles/custom.css'],
			// 右側の目次（Table of Contents）をグローバルで非表示にする
			tableOfContents: false,

			// 各ページ下部に「最終更新日」を表示（Gitの最終コミット日時ベース）
			// ※ GitHub Actions等でビルドする場合は checkout時に fetch-depth: 0 が必要
			lastUpdated: true,

			// ページ切り替えアニメーション（View Transitions）を有効にするための Head 差し替え
			// 種類の切り替えは src/components/Head.astro 内の PAGE_TRANSITION_TYPE で行う
			components: {
				Head: './src/components/Head.astro',
			},

			// OGP / Twitter Card 用メタタグをページごとに自動付与する route middleware
			routeMiddleware: './src/routeData.ts',

			// アクセス解析を導入する場合は、アカウント作成後に以下のコメントを外して
			// data-domain（Plausibleの場合は登録ドメイン）を書き換えてください。
			// head: [
			// 	{
			// 		tag: 'script',
			// 		attrs: {
			// 			src: 'https://plausible.io/js/script.js',
			// 			'data-domain': 'rumo-dev.github.io',
			// 			defer: true,
			// 		},
			// 	},
			// ],

			// 【最新仕様】配列型（[]）の中にリンクをオブジェクトとして格納します
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/rumo-dev'
				}
			],
			sidebar: [
				{
					label: 'プロジェクト',
					items: [
						{ autogenerate: { directory: 'guides' } } // guidesフォルダ内を自動メニュー化
					],
				},
				{
					label: 'コア技術・実装解説',
					items: [
						{ autogenerate: { directory: 'reference' } } // referenceフォルダ内を自動メニュー化
					],
				},
				{
					label: 'Debug用',
					items: [
						{ autogenerate: { directory: 'debug' } } // debugフォルダ内を自動メニュー化
					],
				},
			],
		}),
	],
});