/* eslint-disable @typescript-eslint/ban-types */

declare const _ProvidedNN: unique symbol
export type WithProvidedNN<B extends boolean> = { [_ProvidedNN]?: B }

export type ProvidedNN<X extends {} = {}> = X & WithProvidedNN<true>
export type NotProvidedNN = WithProvidedNN<false>

// export type OptionalArgument<X> = Provided<X> | NotProvided

export type OptionalArgumentNN<X extends {}> = ProvidedNN<X> | NotProvidedNN
