import { CodeGenVisitor } from './codegenvisitor.service';
/**
 * @see CodeGenVisitor implementation that can be used to generate code in an XML-based representation.
 */
export declare abstract class XmlCodeGenVisitor extends CodeGenVisitor {
    private indentationSymbol;
    protected openTag(tag: string, attributes?: any[], autoclose?: boolean): string;
    protected closeTag(tag: string): string;
    protected indent(n: number, content: string): string;
}
