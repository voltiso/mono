import { Suggest } from '../../../Suggest'

export type SuggestObject_<T> =
	| {
			[k in keyof T]?: T[k] | Suggest<unknown> // auto-complete doesn't work for the nested value :(
	  }
	| Suggest<object>

export type SuggestObject<T extends object> = SuggestObject_<T>
