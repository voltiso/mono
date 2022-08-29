import type { DefaultSchemaOptions, ISchema, SchemableLike, SchemaOptions } from "../../../../schemar/dist/cjs";
export interface RecordOptions extends SchemaOptions {
    Output: Record<keyof any, unknown>;
    Input: Record<keyof any, unknown>;
    keySchema: {
        OutputType: keyof any;
        InputType: keyof any | undefined;
    };
    valueSchema: SchemableLike;
}
export interface DefaultRecordOptions extends DefaultSchemaOptions {
    Output: Record<keyof any, unknown>;
    Input: Record<keyof any, unknown>;
    keySchema: ISchema<keyof any>;
    valueSchema: ISchema<unknown>;
}
//# sourceMappingURL=RecordOptions.d.ts.map