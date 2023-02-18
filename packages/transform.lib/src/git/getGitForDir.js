// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀
import { statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
export function getGitForDirUncached(dir) {
    // eslint-disable-next-line no-param-reassign
    dir = resolve(dir);
    let current = dir;
    for (;;) {
        const gitDirPath = join(current, '.git');
        try {
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            const stats = statSync(gitDirPath);
            if (stats.isDirectory()) {
                return current;
            }
        }
        catch { }
        const next = dirname(current);
        if (next === current)
            return undefined;
        current = next;
    }
}
const cache = new Map();
export function getGitForDir(dir) {
    if (!cache.has(dir)) {
        const result = getGitForDirUncached(dir);
        cache.set(dir, result);
    }
    return cache.get(dir);
}
