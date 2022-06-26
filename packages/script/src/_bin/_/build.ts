/* eslint-disable @typescript-eslint/require-await */
import type { Command } from "./Command";
import { throwError } from "./throwError";

/* eslint-disable func-style */
export const build: Command = async ({ commandArgs }) => {
	if (commandArgs.length > 0) throwError("build expects 0 arguments");

	console.log("build");
};
