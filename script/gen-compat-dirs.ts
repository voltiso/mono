/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import packageJson from '../package.json'
import * as fs from 'fs/promises'
import * as path from 'path'
import chalk from 'chalk'

async function main() {
	const obj = packageJson?.typesVersions?.['*']

	for (const name of Object.keys(obj)) {
		try {
			await fs.mkdir(name)
		} catch {}

		const data = {
			types: `../dist/${name}/index.d.ts`,
			module: `../dist/${name}/index.mjs`,
			main: `../dist/${name}/index.js`,
		}

		const gitignore = await fs.readFile('.gitignore')
		const lines = gitignore.toString()
		const wantLine = `/${name}/`
		if (!lines.includes(wantLine)) {
			const message = `Please add '${wantLine}' to '.gitignore'!`
			console.error(chalk.bgRed.bold.inverse(message))
			throw new Error(message)
		}

		const wantEntry = `${name}/`
		if (!packageJson?.files?.includes(wantEntry)) {
			const message = `Please add '${wantEntry}' to 'package.json/files'`
			console.error(chalk.bgRed.bold.inverse(message))
			throw new Error(message)
		}

		try {
			await fs.writeFile(path.join(name, 'package.json'), JSON.stringify(data, null, '\t'), { flag: 'wx' })
		} catch {}
	}
}

void main()
