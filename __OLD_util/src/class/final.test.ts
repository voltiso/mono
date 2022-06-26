/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-classes-per-file */
import { final } from "./final.js";

class Base {
	a = 0;

	constructor(fail = false) {
		final(this, Base, "f", "g", "h");

		if (fail) final(this, Base, "a");
	}

	f() {
		return "f";
	}

	// @ts-expect-error unused
	private g() {
		return "g";
	}

	protected h() {
		return "h";
	}
}

class Good extends Base {
	constructor(fail = false) {
		super(fail);
	}
}

class Bad extends Base {
	override f() {
		return "ff";
	}
}

describe("freeze", () => {
	it("works", () => {
		expect.hasAssertions();

		expect(() => new Bad()).toThrow("final");
		expect(() => new Good()).not.toThrow();

		expect(() => new Good(true)).toThrow("not a method");
	});
});
