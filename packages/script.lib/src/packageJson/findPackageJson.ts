/* eslint-disable max-statements */
import {
	runAsync,
	runSync,
	SyncerIterator,
	SyncerSwitch,
} from "@voltiso/syncer";
import fs from "fs";
import path from "path";
import { VoltisoScriptError } from "../VoltisoScriptError";

type EnoentError = { code: "ENOENT" };

function isEnoentError(error: unknown): error is EnoentError {
	return (error as EnoentError | null)?.code === "ENOENT";
}

function _access(filePath: string, mode: number): SyncerSwitch<void> {
	return {
		sync: () => fs.accessSync(filePath, mode),
		async: () => fs.promises.access(filePath, mode),
	};
}

function* _findPackageJsonUncached(): SyncerIterator<string> {
	const startingPath = path.resolve();
	let currentPath = startingPath;

	let packageJsonPath;

	for (;;) {
		console.log({ currentPath });

		packageJsonPath = path.join(currentPath, "package.json");

		try {
			yield _access(packageJsonPath, fs.constants.R_OK);
			break;
		} catch (error) {
			if (!isEnoentError(error)) throw error;
		}

		currentPath = path.dirname(currentPath);
		if (currentPath === "/") {
			throw new VoltisoScriptError(
				`cannot find package.json in ancestors of ${path.resolve()}`
			);
		}
	}

	return packageJsonPath;
}

//

let packageJsonPath: string | undefined;
let packageJsonPathPromise: Promise<void> | undefined;

function* _findPackageJson(): SyncerIterator<string, string | void> {
	if (!packageJsonPath) {
		// avoid race condition
		if (packageJsonPathPromise)
			yield {
				async: () => packageJsonPathPromise,
			};

		// still not loaded?
		// note: if async operation is in progress, we force load sync again anyway
		if (!packageJsonPath) {
			// eslint-disable-next-line require-atomic-updates
			packageJsonPath = (yield {
				syncerIterator: _findPackageJsonUncached(),
				onAsyncStart: (p) => {
					packageJsonPathPromise = p;
				},
			}) as string;
			// eslint-disable-next-line require-atomic-updates
			packageJsonPathPromise = undefined;
		}
	}
	return packageJsonPath;
}

//

export async function findPackageJson(): Promise<string | undefined> {
	return await runAsync(_findPackageJson());
}

export function findPackageJsonSync(): string | undefined {
	return runSync(_findPackageJson());
}
