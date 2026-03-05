// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface CommandOptions {
	commandArgs: string[]
}

export interface Command {
	// biome-ignore lint/style/useShorthandFunctionType: .
	(options: CommandOptions): Promise<void>
}
