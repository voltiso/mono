import { getConfig } from '../../vitest.config'

export default getConfig({
	test: {
		environment: 'jsdom',
	},
})
