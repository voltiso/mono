// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { AbortError } from '_/error'

export interface SleepController {
	/** Access the underlying Timeout object/number */
	timeout: NodeJS.Timeout

	/** Resolve the Promise early */
	cancel: () => void

	/** Reject the Promise early with {@link AbortError} */
	abort: () => void
}

export function sleep(
	milliseconds: number,
	options?: { signal?: AbortSignal | undefined } | undefined,
): Promise<void> & SleepController {
	const controller: Partial<SleepController> = {}

	// eslint-disable-next-line promise/avoid-new
	const result: Promise<void> & Partial<SleepController> = new Promise<void>(
		(resolve, reject) => {
			const handler = () => resolve()
			controller.timeout = setTimeout(handler, milliseconds)

			controller.cancel = () => {
				clearTimeout(controller.timeout)
				resolve()
			}

			controller.abort = () => {
				clearTimeout(controller.timeout)
				reject(new AbortError())
			}

			if (options?.signal) {
				options.signal.addEventListener('abort', controller.abort, {
					once: true,
				})
			}
		},
	)

	// eslint-disable-next-line es-x/no-object-assign
	return Object.assign(result, controller as SleepController)
}
