import { AlsoAccept } from '../../../AlsoAccept'

export type SuggestObject_<T> =
	| {
			[k in keyof T]?: T[k] | AlsoAccept<unknown> // auto-complete doesn't work for the nested value :(
	  }
	| AlsoAccept<object>

export type SuggestObject<T extends object> = SuggestObject_<T>
