/// <reference types="sketchapp" />
/**
 * Visitor-like pattern used for code generation purposes, by iterating through an AST and
 * delegating the codegen to its subclasses.
 */
export declare abstract class CodeGenVisitor {
    /**
     * Generates a string template by visiting the tree
     * @param ast The Sketch AST
     */
    generateTemplate(ast: SketchMSLayer): string;
    protected visit(ast: SketchMSLayer, template?: string[], depth?: number): string;
    protected visitLayer(layer: SketchMSLayer, template: string[], depth: number): void;
    protected visitShape(ast: SketchMSLayer): string;
    protected abstract visitText(ast: SketchMSLayer): string;
    protected abstract visitBitmap(ast: SketchMSLayer): string;
    protected abstract visitOther(ast: SketchMSLayer): string;
    protected abstract openTag(tag: string): string;
    protected abstract closeTag(tag: string): string;
    protected colorRatioToHex(color: SketchMSColor): string;
    protected checkLayersForBorder(ast: SketchMSLayer): string | boolean;
    private checkForBorder;
    protected checkLayersForBackground(ast: SketchMSLayer): string | boolean;
    private checkForBackground;
}
