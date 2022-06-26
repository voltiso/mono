import { AlsoAccept } from "../../misc/AlsoAccept.js";

export type SuggestObject_<T> =
	| {
			[k in keyof T]?: SuggestObject_<T[k]>;
	  }
	| AlsoAccept<object>;

export type SuggestObject<T extends object> = SuggestObject_<T>;
