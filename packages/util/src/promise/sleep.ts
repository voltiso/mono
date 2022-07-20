// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function sleep(milliseconds: number): Promise<void> {
	// eslint-disable-next-line promise/avoid-new
	return new Promise(resolve => {
		setTimeout(() => resolve(), milliseconds)
	})
}
