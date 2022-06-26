/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { checked } from "./checked.js";
import { z } from "./schemas.js";

describe("checkedFunction", function () {
	it("arg - sync", function () {
		expect.hasAssertions();
		const f = checked
			.param(z.number.min(27))
			.result(z.number.min(123))
			.function((x) => 2 * x);

		expect(f(100)).toBe(200);
		expect(() => f(50)).toThrow("123");
		expect(() => f(10)).toThrow("27");
	});

	it("args - sync", function () {
		expect.hasAssertions();
		const f = checked
			.param({ a: z.number })
			.param({ b: z.number.max(1000) })
			.result(z.number.min(123))
			.function(({ a }, { b }) => a + b);

		expect(f({ a: 111 }, { b: 222 })).toBe(333);
		expect(() => f({ a: 1 }, { b: 2 })).toThrow("123");
		expect(() => f({ a: 1 }, { b: 1001 })).toThrow("1000");
	});

	it("arg - async", async function () {
		expect.hasAssertions();
		const f = checked
			.param(z.number.min(27))
			.result(z.number.min(123))
			.function(async (x) => {
				await new Promise((resolve) => setTimeout(resolve, 50));
				return 2 * x;
			});

		await expect(f(100)).resolves.toBe(200);
		await expect(() => f(50)).rejects.toThrow("123");
		expect(() => f(10)).toThrow("27");
	});

	it("throws on double result", function () {
		expect.hasAssertions();
		expect(() =>
			checked
				.param(z.number.min(27))
				.result(z.number.min(123))
				// @ts-expect-error
				.result(z.number.min(123))
				// @ts-expect-error
				.function((x) => 2 * x)
		).toThrow("result");
	});

	it("throws on double this", function () {
		expect.hasAssertions();
		expect(() =>
			checked
				.param(z.number.min(27))
				.this(z.number.min(123))
				// @ts-expect-error
				.this(z.number.min(123))
				// @ts-expect-error
				.function((x) => 2 * x)
		).toThrow("this");
	});

	it("works with `this`", function () {
		expect.hasAssertions();
		const f = checked
			.this({ asd: z.number.min(123) })
			.param(z.number)
			.result(z.number)
			.function(function (x) {
				return this.asd + x;
			});
		expect(() => f.call({ asd: 1 }, 123)).toThrow("123");
		expect(f.call({ asd: 123 }, 5)).toBe(128);
	});

	it("exact return type (no additional properties)", function () {
		expect.hasAssertions();
		const f = checked
			.param(z.number)
			.result({ a: z.number })
			.function((x) => ({ a: x, qwerty: 123 }));

		expect(() => f(50)).toThrow("qwerty");
	});

	it("does not allow returning without result schema", function () {
		expect.hasAssertions();
		// @ts-expect-error
		const f = checked.param(z.number).function((x) => x + 1);
		expect(f(50)).toBe(51);
	});

	it("does not require schema for Promise<void> result", async function () {
		expect.hasAssertions();
		// eslint-disable-next-line @typescript-eslint/require-await
		const f = checked.param(z.number).function(async (x) => {
			void x;
		});
		await expect(f(50)).resolves.toBeUndefined();
	});
});
