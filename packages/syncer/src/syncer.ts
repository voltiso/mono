import type { SyncerFunction } from "./SyncerFunction";

/**
 * Helps with TS type inference
 *  - Do not provide type arguments
 *  - Does nothing at runtime
 * @param func `SyncerFunction`
 * @returns the same `SyncerFunction`
 */
export function syncer<
	Args extends unknown[] = never[],
	Return = unknown,
	Intermediate = unknown
>(
	func: SyncerFunction<Args, Return, Intermediate>
): SyncerFunction<Args, Return, Intermediate> {
	return func;
}
