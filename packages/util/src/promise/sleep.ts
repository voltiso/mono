// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface SleepController {
	timeout: NodeJS.Timeout
	abort: () => void
}

export function sleep(
	milliseconds: number,
	options?: { signal?: AbortSignal | undefined } | undefined,
): Promise<void> & SleepController {
	const controller: Partial<SleepController> = {}

	// eslint-disable-next-line promise/avoid-new
	const result: Promise<void> & Partial<SleepController> = new Promise<void>(
		resolve => {
			const handler = () => resolve()
			controller.timeout = setTimeout(handler, milliseconds)
			controller.abort = () => {
				clearTimeout(controller.timeout)
			}

			if (options?.signal)
				options.signal.addEventListener('abort', controller.abort, {
					once: true,
				})
		},
	)

	// eslint-disable-next-line es-x/no-object-assign
	return Object.assign(result, controller as SleepController)
}
