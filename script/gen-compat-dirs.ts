/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import packageJson from '../package.json'
import * as fs from 'fs/promises'
import * as path from 'path'
import chalk from 'chalk'

// eslint-disable-next-line max-statements
async function main() {
	const obj = packageJson?.typesVersions?.['*']

	for (const name of Object.keys(obj)) {
		try {
			// eslint-disable-next-line no-await-in-loop
			await fs.mkdir(name)
		} catch {}

		const data = {
			types: `../dist/modules/${name}/index.d.ts`,
			module: `../dist/modules/${name}/index.mjs`,
			main: `../dist/modules/${name}/index.js`,
		}

		// eslint-disable-next-line no-await-in-loop
		const gitignore = await fs.readFile('.gitignore')
		const lines = gitignore.toString()
		const wantLine = `/${name}/`
		if (!lines.includes(wantLine)) {
			const message = `Please add '${wantLine}' to '.gitignore'!`
			// eslint-disable-next-line no-console
			console.error(chalk.bgRed.bold.inverse(message))
			throw new Error(message)
		}

		const wantEntry = `${name}/`
		if (!packageJson?.files?.includes(wantEntry)) {
			const message = `Please add '${wantEntry}' to 'package.json/files'`
			// eslint-disable-next-line no-console
			console.error(chalk.bgRed.bold.inverse(message))
			throw new Error(message)
		}

		try {
			// eslint-disable-next-line no-await-in-loop
			await fs.writeFile(
				path.join(name, 'package.json'),
				`${JSON.stringify(data, null, '\t')}\n`,
				{ flag: 'w' }
			)
		} catch {}
	}
}

void main()
