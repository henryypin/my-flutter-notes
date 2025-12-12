// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://henryypin.github.io',
	base: '/my-flutter-notes',
	integrations: [
		starlight({
			title: 'Flutter 筆記',
			logo: {
				src: './src/assets/logo.svg',
			},
			defaultLocale: 'root',
			locales: {
				root: {
					label: '繁體中文',
					lang: 'zh-TW',
				}
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/henryypin/my-flutter-notes' }],
			sidebar: [
				{
					label: '資源',
					autogenerate: { directory: 'resources' },
				},
				{
					label: '基礎',
					autogenerate: { directory: 'foundations' },
				},
			],
		}),
	],
});
