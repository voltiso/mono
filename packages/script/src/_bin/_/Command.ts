export type CommandOptions = {
	commandArgs: string[]
}

export type Command = (options: CommandOptions) => Promise<void>
