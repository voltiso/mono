import { Suggest } from '../../../Suggest'
import { Nullish } from '../../null'

type SuggestObjectNullish__<T> = {
	[k in keyof T]?: T[k] | Suggest<unknown> // auto-complete doesn't work for the nested value :(
}

export type SuggestObjectNullish_<T> =
	| SuggestObjectNullish__<Extract<T, object>>
	| Suggest<object | Nullish>

export type SuggestObjectNullish<T extends object | Nullish> =
	SuggestObjectNullish_<T>
