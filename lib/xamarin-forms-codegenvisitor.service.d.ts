/// <reference types="sketchapp" />
import { XmlCodeGenVisitor } from './xmlcodegenvisitor.service';
import { SvgCodeGenService } from '@xlayers/svg-codegen';
/**
 * @see XmlCodeGenVisitor implementation that can be used to generate Xamarin.Forms code.
 */
export declare class XamarinFormsCodeGenVisitor extends XmlCodeGenVisitor {
    private readonly svgCodeGen;
    constructor(svgCodeGen: SvgCodeGenService);
    fileList: any[];
    protected visitLayer(layer: SketchMSLayer, template?: string[], depth?: number): void;
    protected visitBitmap(ast: SketchMSLayer): string;
    protected visitText(ast: SketchMSLayer): string;
    protected visitShape(ast: SketchMSLayer): string;
    protected visitOther(ast: SketchMSLayer): string;
    protected visitRound(ast: SketchMSLayer): string;
    protected visitRectangle(ast: SketchMSLayer): string;
    protected visitLine(ast: SketchMSLayer): string;
    protected visitSvg(ast: SketchMSLayer): string;
    protected openGroup(ast: SketchMSLayer): string;
    private sanitizeSvgFileName;
    private generateAbsoluteLayout;
    consumeFileList(): any;
}
