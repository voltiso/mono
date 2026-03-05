import { getConfig } from '../../vitest.config'

export default getConfig(
	{},
	{
		test: {
			globalSetup: ['./vitest.setup.ts'],
		},
	},
)
