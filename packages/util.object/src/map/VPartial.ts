import { _ } from "../flatten.js";

/**
 * The built-in `Partial` doesn't work properly (@see `VPartial.test.ts`), so we implement our own
 *  - Prefixed with `V` to resolve ambiguity with the built-in version (auto-imports, etc.)
 * */
export type VPartial<Obj> = Obj extends unknown
	? _<
			{
				// [key in keyof Obj]?: Value<Obj, key>
				[key in keyof Obj as string extends key
					? never
					: number extends key
					? never
					: symbol extends key
					? never
					: key]?: Obj[key];
			} & {
				[key in keyof Obj as string extends key
					? key
					: number extends key
					? key
					: symbol extends key
					? key
					: never]: Obj[key];
			}
	  >
	: never;
