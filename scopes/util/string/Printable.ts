export type Printable = string | number | bigint | boolean | null | undefined
export type Print<P> = P extends Printable ? `${P}` : never
