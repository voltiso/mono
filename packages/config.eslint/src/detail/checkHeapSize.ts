// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-magic-numbers */

import os from 'node:os'
import v8 from 'node:v8'

import pc from 'picocolors'

export function checkHeapSize(): void {
	const stats = v8.getHeapStatistics()

	// eslint-disable-next-line no-console
	console.log(
		'heap_size_limit',
		stats.heap_size_limit / 1_024 / 1_024 / 1_024,
		'GB',
	)

	const totalMemoryGb = os.totalmem() / 1_024 / 1_024 / 1_024

	const minHeapSizeGb = Math.min(Math.max(7, totalMemoryGb / 2), 20) // require between 7 and 20 GB
	const haveHeapSizeGb = stats.heap_size_limit / 1_024 / 1_024 / 1_024

	if (haveHeapSizeGb < minHeapSizeGb) {
		const message = `heap size (${haveHeapSizeGb} GB) is less than ${minHeapSizeGb} GB! eslint may crash! Use NODE_OPTIONS=--max-old-space-size=${
			minHeapSizeGb * 1_024 * 1.1
		} to increase the heap size limit`

		// eslint-disable-next-line no-console
		console.error(pc.bgRed(message))

		// throw new Error(message) // ! don't want to auto-crash though
	}
}
