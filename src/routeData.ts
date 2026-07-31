import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

// 各ページの description が未設定の場合に使うフォールバック文
const DEFAULT_DESCRIPTION =
	'グラフィックスプログラマー志望・丸毛温仁のポートフォリオ。DirectX 11 / HLSL による自作レンダリングエンジン「AtmosFiore」の実装解説や制作実績を掲載。';

const DEFAULT_SITE_TITLE = 'AtmosFiore Docs & Portfolio';

export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const { head, entry } = route;
	const siteTitle = route.siteTitle ?? DEFAULT_SITE_TITLE;

	const title = entry?.data?.title ?? siteTitle;
	const description = entry?.data?.description ?? DEFAULT_DESCRIPTION;

	// public/og-image.png を全ページ共通のOGP画像として使用（base パスを考慮）
	const ogImageUrl = new URL(`${import.meta.env.BASE_URL}og-image.png`, context.site);
	const canonicalUrl = context.url;

	head.push(
		{ tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
		{ tag: 'meta', attrs: { property: 'og:site_name', content: siteTitle } },
		{ tag: 'meta', attrs: { property: 'og:title', content: title } },
		{ tag: 'meta', attrs: { property: 'og:description', content: description } },
		{ tag: 'meta', attrs: { property: 'og:url', content: canonicalUrl.href } },
		{ tag: 'meta', attrs: { property: 'og:image', content: ogImageUrl.href } },
		{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
		{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
		{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
		{ tag: 'meta', attrs: { name: 'twitter:title', content: title } },
		{ tag: 'meta', attrs: { name: 'twitter:description', content: description } },
		{ tag: 'meta', attrs: { name: 'twitter:image', content: ogImageUrl.href } }
	);
});
