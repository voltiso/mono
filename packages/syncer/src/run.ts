/* eslint-disable no-nested-ternary */
/* eslint-disable no-await-in-loop */
import { isIterable, SyncerIterator, isSyncerNested } from "./SyncerIterator";

function isDone<T, TReturn>(
	iteratorResult: IteratorResult<T, TReturn>
): iteratorResult is IteratorReturnResult<TReturn> {
	return Boolean(iteratorResult.done);
}

//

//

export async function runAsync<Return, Intermediate>(
	iterator: SyncerIterator<Return, Intermediate>
): Promise<Return> {
	let currentResult = iterator.next();

	while (!isDone(currentResult)) {
		const generated = currentResult.value
		try {
			let next;
			if (isIterable(generated)) {
				next = await runAsync(generated);
			} else if (isSyncerNested(generated)) {
				if(currentResult.value.onAsyncStart) {
					const promise = lazyPromise(() => runAsync(currentResult.value));
					await currentResult.value.onAsyncStart(promise)
				}
			} else {
				await currentResult.value.async?.();
			}

			currentResult = iterator.next(next as Awaited<Intermediate>); // can be undefined
		} catch (error) {
			currentResult = iterator.throw(error);
		}
	}

	return currentResult.value;
}

//

//

export function runSync<Return, Intermediate>(
	iterator: SyncerIterator<Return, Intermediate>
): Return {
	let currentResult = iterator.next();

	while (!isDone(currentResult)) {
		try {
			const next = isIterable(currentResult.value)
				? runSync(currentResult.value)
				: currentResult.value.sync?.();

			currentResult = iterator.next(next as Awaited<Intermediate>); // can be undefined
		} catch (error) {
			currentResult = iterator.throw(error);
		}
	}

	return currentResult.value;
}
