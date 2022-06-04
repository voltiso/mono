// declare const _Provided: unique symbol
// export type WithProvided<B extends boolean> = { [_Provided]?: B }

// type MakeProvided<X> = X & WithProvided<true>

// export type Provided<X> = X extends null | undefined ? X : MakeProvided<X>

// export type NotProvided = WithProvided<false>

// export type OptionalArgument<X> = Provided<X> | NotProvided

declare const NotProvided: unique symbol
export type NotProvided = typeof NotProvided

export type OptionalArgument<X> = X | NotProvided
