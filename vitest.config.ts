import tsconfigPaths from 'vite-tsconfig-paths'
import {
	configDefaults,
	mergeConfig,
	type TestProjectInlineConfiguration,
	type UserWorkspaceConfig,
} from 'vitest/config'

// ! We have to hack, since we can't use `extends: true`
// ! because it causes multiple runs of `globalSetup`
const baseConfig = {
	test: {
		projects: [
			{
				// extends: true,
				test: {
					name: 'zone.js',
					include: ['**/*.zone.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
				},
				esbuild: {
					supported: {
						'async-await': false,
					},
				},
			},
			{
				// extends: true,
				test: {
					name: 'default',
					exclude: [
						...configDefaults.exclude,
						'**/*.zone.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
					],
				},
			},
		].map(project => ({
			...project,
			plugins: [tsconfigPaths()],
		})),
	},
} satisfies UserWorkspaceConfig

//

export function getConfig(
	projectOverrides: TestProjectInlineConfiguration = {},
	globalOverrides: TestProjectInlineConfiguration = {},
): UserWorkspaceConfig {
	const config = {
		...baseConfig,
		test: {
			...baseConfig.test,
			projects: baseConfig.test?.projects?.map(project =>
				mergeConfig(project, projectOverrides),
			),
		},
	}
	return mergeConfig(config, globalOverrides)
}

//

export default getConfig()
