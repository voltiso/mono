/* eslint-disable @typescript-eslint/no-explicit-any */

export type ToStringKey<X extends keyof any> = X extends number ? `${X}` : X

export type StringKeyof<T> = ToStringKey<keyof T>
