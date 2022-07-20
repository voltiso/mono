// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { CALL, callableInstance } from '@voltiso/util'

import * as _ from './s'
import type { GetSchemaFunction } from './s/unknownSchema/_/getSchema'
import { getSchema } from './s/unknownSchema/_/getSchema'

class Schemar {
	constructor() {
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this)
	}

	[CALL](...args: any[]) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return (getSchema as any)(...args)
	}

	get schema() {
		return _.schema
	}

	get array() {
		return _.array
	}

	get mutableArray() {
		return _.mutableArray
	}

	get readonlyArray() {
		return _.readonlyArray
	}

	get tuple() {
		return _.tuple
	}

	get mutableTuple() {
		return _.mutableTuple
	}

	get readonlyTuple() {
		return _.readonlyTuple
	}

	get bigint() {
		return _.bigint
	}

	get function() {
		return _.function
	}

	get instance() {
		return _.instance
	}

	get never() {
		return _.never
	}

	get number() {
		return _.number
	}

	get integer() {
		return _.integer
	}

	get object() {
		return _.object
	}

	get string() {
		return _.string
	}

	get union() {
		return _.union
	}

	get unknown() {
		return _.unknown
	}

	get literal() {
		return _.literal
	}

	get boolean() {
		return _.boolean
	}

	get symbol() {
		return _.symbol
	}

	get undefined() {
		return _.undefined
	}

	get null() {
		return _.null
	}
}

// type S = GetSchemaFunction & VOmit<S_, CALL>
interface S extends Omit<Schemar, CALL>, GetSchemaFunction {}

const S = Schemar as unknown as SConstructor

type SConstructor = new () => S

// eslint-disable-next-line jsdoc/no-bad-blocks
const s = /* @__PURE__ */ new /* @__PURE__ */ S()

export default s
