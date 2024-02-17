// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-magic-numbers */

import os from 'node:os'
import v8 from 'node:v8'

import chalk from 'chalk'

export function checkHeapSize(): void {
	const stats = v8.getHeapStatistics()

	// eslint-disable-next-line no-console
	console.log(
		'heap_size_limit',
		stats.heap_size_limit / 1_024 / 1_024 / 1_024,
		'GB',
	)

	const totalMemoryGb = os.totalmem() / 1_024 / 1_024 / 1_024

	const minHeapSizeGb = Math.max(7, totalMemoryGb / 2)

	if (stats.heap_size_limit < minHeapSizeGb * 1_024 * 1_024 * 1_024) {
		const message = `heap_size_limit is less than ${minHeapSizeGb}GB! eslint may crash! Use --max-old-space-size=${
			minHeapSizeGb * 1_024 * 1_024 * 1_024
		} to increase the heap size limit`

		// eslint-disable-next-line no-console
		console.error(chalk.bgRed(message))

		throw new Error(message)
	}
}
