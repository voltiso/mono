// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀
export function getNodeFullText(ctx, node) {
    try {
        return node.getFullText(ctx.sourceFile);
    }
    catch {
        return undefined;
    }
}
