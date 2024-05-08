/** @type { import('@storybook/react').Preview } */
import { fn } from '@storybook/test'

const preview = {
	parameters: {
		actions: {
			// 명시적인 함수를 생성하고 이를 fn 함수로 감쌉니다.
			handlers: {
				onClick: fn(() => console.log('Clicked')),
			},
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
}

export default preview
