export const bind = <SELF, ARGS extends unknown[], R>(
	f: (this: SELF, ...args: ARGS) => R,
	self: ThisParameterType<(this: SELF, ...args: ARGS) => R>
) => f.bind(self)

// a helper function that fixes the problem with TypeScript not inferring templated call correctly, even with strictBindCallApply=true
// call(f, self, ...args) => f.call(self, ...args)
export const call = <SELF, ARGS extends unknown[], R>(f: (this: SELF, ...args: ARGS) => R, self: SELF, ...args: ARGS) =>
	f.call(self, ...args)

export const apply = <SELF, ARGS extends unknown[], R>(f: (this: SELF, ...args: ARGS) => R, self: SELF, args: ARGS) =>
	f.apply(self, args)
