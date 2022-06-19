import { IArray } from '../../array'
import { ITuple } from '../ITuple'
import * as s from '../..'

export function _extendsArray(thisTuple: ITuple, otherArray: IArray): boolean {
	for (const t of thisTuple.getElementSchemas)
		if (!s.schema(t).extends(otherArray.getElementSchema)) return false
	return true
}
