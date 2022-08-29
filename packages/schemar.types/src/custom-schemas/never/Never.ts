import type { CustomNever } from './CustomNever'

export type NeverConstructor = new () => Never

export type Never = CustomNever<{}>
