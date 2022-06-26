/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { CALL, callableInstance } from "@voltiso/ts-util/class";
import { getSchema, GetSchemaFunction } from "./s/unknownSchema/_/getSchema.js";
import * as _ from "./s.js";

class Schemar {
	constructor() {
		return callableInstance(this);
	}

	[CALL](...args: any[]) {
		return (getSchema as any)(...args);
	}

	get schema() {
		return _.schema;
	}

	get array() {
		return _.array;
	}

	get mutableArray() {
		return _.mutableArray;
	}

	get readonlyArray() {
		return _.readonlyArray;
	}

	get tuple() {
		return _.tuple;
	}

	get mutableTuple() {
		return _.mutableTuple;
	}

	get readonlyTuple() {
		return _.readonlyTuple;
	}

	get bigint() {
		return _.bigint;
	}

	get function() {
		return _.function;
	}

	get instance() {
		return _.instance;
	}

	get never() {
		return _.never;
	}

	get number() {
		return _.number;
	}

	get integer() {
		return _.integer;
	}

	get object() {
		return _.object;
	}

	get string() {
		return _.string;
	}

	get union() {
		return _.union;
	}

	get unknown() {
		return _.unknown;
	}

	get literal() {
		return _.literal;
	}

	get boolean() {
		return _.boolean;
	}

	get symbol() {
		return _.symbol;
	}

	get undefined() {
		return _.undefined;
	}

	get null() {
		return _.null;
	}
}

// type S = GetSchemaFunction & VOmit<S_, CALL>
interface S extends Omit<Schemar, CALL>, GetSchemaFunction {}

const S = Schemar as unknown as SConstructor;

type SConstructor = new () => S;

const s = /* @__PURE__ */ new /* @__PURE__ */ S();
export default s;
