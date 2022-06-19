/* eslint-disable @typescript-eslint/require-await */
import type { Command } from './Command'
import { throwError } from './throwError'

/* eslint-disable func-style */
export const install: Command = async ({ commandArgs }) => {
	if (commandArgs.length > 0) throwError('install expects 0 arguments')

	//
}
