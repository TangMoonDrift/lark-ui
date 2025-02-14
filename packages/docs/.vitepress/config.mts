import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Lark-UI',
	description:
		'A succinct UI component library for Vue 3, meticulously crafted utilizing contemporary CSS methodologies.',
	base: '/lark-ui/',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Examples', link: '/markdown-examples' }
		],

		sidebar: [
			{
				text: 'Examples',
				items: [
					{ text: 'Markdown Examples', link: '/markdown-examples' },
					{ text: 'Runtime API Examples', link: '/api-examples' }
				]
			}
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }
		]
	}
})
