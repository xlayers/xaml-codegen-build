import { Injectable, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { SvgCodeGenService, SvgCodeGenModule } from '@xlayers/svg-codegen';
import { CssCodeGenModule } from '@xlayers/css-codegen';
import { SketchLibModule } from '@xlayers/sketch-lib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Visitor-like pattern used for code generation purposes, by iterating through an AST and
 * delegating the codegen to its subclasses.
 * @abstract
 */
class CodeGenVisitor {
    /**
     * Generates a string template by visiting the tree
     * @param {?} ast The Sketch AST
     * @return {?}
     */
    generateTemplate(ast) {
        /** @type {?} */
        const template = [];
        this.visit(ast, template, 2);
        return template.join('\n');
    }
    /**
     * @protected
     * @param {?} ast
     * @param {?=} template
     * @param {?=} depth
     * @return {?}
     */
    visit(ast, template = [], depth = 0) {
        if (ast.layers && Array.isArray(ast.layers)) {
            ast.layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            layer => this.visitLayer(layer, template, depth)));
        }
        else {
            if (((/** @type {?} */ (ast)))._class === 'text') {
                return this.visitText(ast);
            }
            else if (((/** @type {?} */ (ast)))._class === 'bitmap') {
                return this.visitBitmap(ast);
            }
            else if (((/** @type {?} */ (ast))).shape) {
                return this.visitShape(ast);
            }
            else {
                return this.visitOther(ast);
            }
        }
    }
    /**
     * @protected
     * @param {?} layer
     * @param {?} template
     * @param {?} depth
     * @return {?}
     */
    visitLayer(layer, template, depth) {
        /** @type {?} */
        const content = this.visit(layer, template, depth + 1);
        if (content) {
            template.push(content);
        }
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitShape(ast) {
        return ((/** @type {?} */ (ast))).shape;
    }
    /**
     * @protected
     * @param {?} color
     * @return {?}
     */
    colorRatioToHex(color) {
        return ('#' +
            Math.round(color.red * 255)
                .toString(16)
                .padStart(2, '0') +
            Math.round(color.green * 255)
                .toString(16)
                .padStart(2, '0') +
            Math.round(color.blue * 255)
                .toString(16)
                .padStart(2, '0'));
    }
    // return colorhex: string or false
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    checkLayersForBorder(ast) {
        /** @type {?} */
        let border = false;
        for (const layer of ast.layers) {
            border = this.checkForBorder(ast, layer);
            if (border !== false) {
                return border;
            }
        }
        return border;
    }
    // return colorhex: string or false
    /**
     * @private
     * @param {?} parent
     * @param {?} ast
     * @return {?}
     */
    checkForBorder(parent, ast) {
        if (ast.frame.x === 0 &&
            ast.frame.y === 0 &&
            parent.frame.width === ast.frame.width &&
            parent.frame.height === ast.frame.height &&
            !!ast.style.borders) {
            ((/** @type {?} */ (ast))).shapeVisited = true;
            return this.colorRatioToHex(ast.style.borders[0].color);
        }
        return false;
    }
    // return colorhex: string or false
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    checkLayersForBackground(ast) {
        /** @type {?} */
        let background = false;
        for (const layer of ast.layers) {
            background = this.checkForBackground(ast, layer);
            if (background !== false) {
                return background;
            }
        }
        return background;
    }
    // return colorhex: string or false
    /**
     * @private
     * @param {?} parent
     * @param {?} ast
     * @return {?}
     */
    checkForBackground(parent, ast) {
        if (ast.frame.x === 0 &&
            ast.frame.y === 0 &&
            parent.frame.width === ast.frame.width &&
            parent.frame.height === ast.frame.height &&
            !!ast.style.fills &&
            ast.style.fills[0].color.alpha !== 0) {
            ((/** @type {?} */ (ast))).shapeVisited = true;
            return this.colorRatioToHex(ast.style.fills[0].color);
        }
        return false;
    }
}
if (false) {
    /**
     * @abstract
     * @protected
     * @param {?} ast
     * @return {?}
     */
    CodeGenVisitor.prototype.visitText = function (ast) { };
    /**
     * @abstract
     * @protected
     * @param {?} ast
     * @return {?}
     */
    CodeGenVisitor.prototype.visitBitmap = function (ast) { };
    /**
     * @abstract
     * @protected
     * @param {?} ast
     * @return {?}
     */
    CodeGenVisitor.prototype.visitOther = function (ast) { };
    /**
     * @abstract
     * @protected
     * @param {?} tag
     * @return {?}
     */
    CodeGenVisitor.prototype.openTag = function (tag) { };
    /**
     * @abstract
     * @protected
     * @param {?} tag
     * @return {?}
     */
    CodeGenVisitor.prototype.closeTag = function (tag) { };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @see CodeGenVisitor implementation that can be used to generate code in an XML-based representation.
 * @abstract
 */
class XmlCodeGenVisitor extends CodeGenVisitor {
    constructor() {
        super(...arguments);
        this.indentationSymbol = '  '; // 2 spaces ftw
    }
    // 2 spaces ftw
    /**
     * @protected
     * @param {?} tag
     * @param {?=} attributes
     * @param {?=} autoclose
     * @return {?}
     */
    openTag(tag, attributes = [], autoclose = false) {
        return `<${tag}${attributes.length !== 0 ? ' ' + attributes.join(' ') : ''}${autoclose ? ' /' : ''}>`;
    }
    /**
     * @protected
     * @param {?} tag
     * @return {?}
     */
    closeTag(tag) {
        return `</${tag}>`;
    }
    /**
     * @protected
     * @param {?} n
     * @param {?} content
     * @return {?}
     */
    indent(n, content) {
        /** @type {?} */
        const indentation = !!n ? this.indentationSymbol.repeat(n) : '';
        return indentation + content.split('\n').join('\n' + indentation);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    XmlCodeGenVisitor.prototype.indentationSymbol;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// class to recognise if sketchapp shape is a rectangle, a line, a circle(TODO) or something else
class Point {
    /**
     * @param {?} strOrX
     * @param {?=} y
     */
    constructor(strOrX, y) {
        // a string containing the coords is input
        if (y === undefined) {
            /** @type {?} */
            const coords = this.stringToCoords(strOrX);
            if (coords) {
                this.x = this.decRound(coords.x);
                this.y = this.decRound(coords.y);
            }
            // the coords numbers are input
        }
        else {
            this.x = this.decRound((/** @type {?} */ (strOrX)));
            this.y = this.decRound(y);
        }
    }
    // 2 decimals rounding
    /**
     * @param {?} number
     * @return {?}
     */
    decRound(number) {
        return Math.round(number * 100 + 0.001) / 100;
    }
    /**
     * @param {?} point
     * @return {?}
     */
    distanceRounded(point) {
        return this.decRound(this.distance(point));
    }
    /**
     * @param {?} point
     * @return {?}
     */
    distance(point) {
        return Math.sqrt(this.distanceSquared(point));
    }
    /**
     * @param {?} point
     * @return {?}
     */
    distanceSquaredRounded(point) {
        return this.decRound(this.distanceSquared(point));
    }
    /**
     * @param {?} point
     * @return {?}
     */
    distanceSquared(point) {
        return Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2);
    }
    /**
     * @param {?} string
     * @return {?}
     */
    stringToCoords(string) {
        // match two numbers in a string of the form '{123, 456}'
        // and place them in two capturing groups named 'x' and 'y'
        // numbers may be negatives and may be int or float
        /** @type {?} */
        const regex = /{(?<x>\-?\d(?:\.\d+)?(?:e\-?\d+)?),\s?(?<y>\-?\d(?:\.\d+)?(?:e\-?\d+)?)}/;
        /** @type {?} */
        const match = string.match(regex);
        if (!!match) {
            // match.groups: {x: number, y: number}
            return match.groups;
        }
        return false;
    }
}
if (false) {
    /** @type {?} */
    Point.prototype.x;
    /** @type {?} */
    Point.prototype.y;
}
class Cluster {
    /**
     * @param {?=} point
     */
    constructor(point) {
        this.points = [];
        if (point !== undefined) {
            this.addPoint(point);
        }
    }
    /**
     * @return {?}
     */
    updateBarycenter() {
        /** @type {?} */
        let avgX = 0;
        /** @type {?} */
        let avgY = 0;
        this.points.forEach((/**
         * @param {?} point
         * @return {?}
         */
        point => {
            avgX += point.x;
            avgY += point.y;
        }));
        avgX /= this.points.length;
        avgY /= this.points.length;
        this.barycenter = new Point(avgX, avgY);
    }
    /**
     * @param {?} point
     * @return {?}
     */
    addPoint(point) {
        this.points.push(point);
        this.updateBarycenter();
    }
}
if (false) {
    /** @type {?} */
    Cluster.prototype.points;
    /** @type {?} */
    Cluster.prototype.barycenter;
}
class Shape {
    /**
     * @param {?} points
     */
    constructor(points) {
        this.points = [];
        points.forEach((/**
         * @param {?} point
         * @return {?}
         */
        point => {
            this.points.push(new Point(point.point));
            if (point.hasCurveFrom === true) {
                this.points.push(new Point(point.curveFrom));
            }
            if (point.hasCurveTo === true) {
                this.points.push(new Point(point.curveTo));
            }
        }));
    }
    // check if ABC is orthogonal on B
    /**
     * @param {?} A
     * @param {?} B
     * @param {?} C
     * @return {?}
     */
    static isOrthogonal(A, B, C) {
        return Math.abs(A.distanceSquared(B) + B.distanceSquared(C) - A.distanceSquared(C)) < Shape.shapeRecognitionPrecision;
    }
    // divide the points in 4 clusters
    /**
     * @return {?}
     */
    clusterPoints4() {
        /** @type {?} */
        let tempBarycenterX = 0;
        /** @type {?} */
        let tempBarycenterY = 0;
        this.points.forEach((/**
         * @param {?} point
         * @return {?}
         */
        point => {
            tempBarycenterX += point.x;
            tempBarycenterY += point.y;
        }));
        /** @type {?} */
        const barycenter = new Point(tempBarycenterX / this.points.length, tempBarycenterY / this.points.length);
        /** @type {?} */
        const clusters = {};
        clusters.topLeft = new Cluster();
        clusters.topRight = new Cluster();
        clusters.bottomLeft = new Cluster();
        clusters.bottomRight = new Cluster();
        this.points.forEach((/**
         * @param {?} point
         * @return {?}
         */
        point => {
            if (point.y < barycenter.y) {
                // TOP
                if (point.x < barycenter.x) {
                    // LEFT
                    clusters.topLeft.addPoint(point);
                }
                else {
                    // RIGHT
                    clusters.topRight.addPoint(point);
                }
                // BOTTOM
            }
            else {
                if (point.x < barycenter.x) {
                    // LEFT
                    clusters.bottomLeft.addPoint(point);
                }
                else {
                    // RIGHT
                    clusters.bottomRight.addPoint(point);
                }
            }
        }));
        return clusters;
    }
    /**
     * @return {?}
     */
    isRectangle() {
        if (this.points.length < 4) {
            return false;
        }
        /** @type {?} */
        const clusters = this.clusterPoints4();
        for (const corner in clusters) {
            if (clusters[corner].points.length === 0) {
                return false;
            }
        }
        /** @type {?} */
        const topLength = clusters.topLeft.barycenter.distance(clusters.topRight.barycenter);
        /** @type {?} */
        const bottomLength = clusters.bottomLeft.barycenter.distance(clusters.bottomRight.barycenter);
        /** @type {?} */
        const leftLength = clusters.topLeft.barycenter.distance(clusters.bottomLeft.barycenter);
        /** @type {?} */
        const rightLength = clusters.topRight.barycenter.distance(clusters.bottomRight.barycenter);
        return Math.abs(topLength - bottomLength) < Shape.shapeRecognitionPrecision
            && Math.abs(leftLength - rightLength) < Shape.shapeRecognitionPrecision
            && Shape.isOrthogonal(clusters.bottomLeft.barycenter, clusters.topLeft.barycenter, clusters.topRight.barycenter);
    }
    /**
     * @return {?}
     */
    isLine() {
        return this.points.length === 2
            && Math.abs(this.points[0].y - this.points[1].y) < Shape.shapeRecognitionPrecision;
    }
    /**
     * @return {?}
     */
    isRound() {
        if (this.isRectangle() || this.isLine()) {
            return false;
        }
        /** @type {?} */
        const circle = new Cluster();
        this.points.forEach((/**
         * @param {?} point
         * @return {?}
         */
        point => {
            circle.addPoint(point);
        }));
        // if the points are not equally sprayed around the circle,
        // the barycenter may be different from the actual center of the circle
        /** @type {?} */
        const center = new Point(0.5, 0.5);
        /** @type {?} */
        const radius2 = circle.points[0].distanceSquaredRounded(circle.barycenter);
        /** @type {?} */
        const radiusCenter2 = circle.points[0].distanceSquaredRounded(center);
        /** @type {?} */
        let isCircle = true;
        /** @type {?} */
        let isCircleCentered = true;
        circle.points.some((/**
         * @param {?} point
         * @return {?}
         */
        point => {
            if (Math.abs(point.distanceSquaredRounded(circle.barycenter) - radius2) > Shape.shapeRecognitionPrecision * 2) {
                isCircle = false;
                return true;
            }
        }));
        circle.points.some((/**
         * @param {?} point
         * @return {?}
         */
        point => {
            if (Math.abs(point.distanceSquaredRounded(center) - radiusCenter2) > Shape.shapeRecognitionPrecision * 2) {
                isCircleCentered = false;
                return true;
            }
        }));
        return isCircle || isCircleCentered;
    }
}
Shape.shapeRecognitionPrecision = 0.05;
if (false) {
    /** @type {?} */
    Shape.shapeRecognitionPrecision;
    /** @type {?} */
    Shape.prototype.points;
    /** @type {?} */
    Shape.prototype.topLeft;
    /** @type {?} */
    Shape.prototype.topRight;
    /** @type {?} */
    Shape.prototype.bottomLeft;
    /** @type {?} */
    Shape.prototype.bottomRight;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @see XmlCodeGenVisitor implementation that can be used to generate Xamarin.Forms code.
 */
class XamarinFormsCodeGenVisitor extends XmlCodeGenVisitor {
    /**
     * @param {?} svgCodeGen
     */
    constructor(svgCodeGen) {
        super();
        this.svgCodeGen = svgCodeGen;
        this.fileList = [];
    }
    /**
     * @protected
     * @param {?} layer
     * @param {?=} template
     * @param {?=} depth
     * @return {?}
     */
    visitLayer(layer, template = [], depth = 0) {
        /** @type {?} */
        let content;
        if (((/** @type {?} */ (layer)))._class === 'group') {
            template.push(this.indent(depth, this.openGroup(layer)));
            content = this.visit(layer, template, depth + 1);
            template.push(this.indent(depth + 1, this.closeTag('AbsoluteLayout')));
            template.push(this.indent(depth, this.closeTag('Frame')));
        }
        else {
            content = this.visit(layer, template, depth + 1);
        }
        if (content) {
            template.push(this.indent(depth + 1, content));
        }
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitBitmap(ast) {
        return `<Image Source="${((/** @type {?} */ (ast))).image._ref}">`;
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitText(ast) {
        /** @type {?} */
        const attr = {};
        /** @type {?} */
        const string = ast.attributedString;
        /** @type {?} */
        const fontAttribute = string.attributes[0].attributes.MSAttributedStringFontAttribute
            .attributes;
        /** @type {?} */
        const colorAttribute = ((/** @type {?} */ (string.attributes[0].attributes)))
            .MSAttributedStringColorAttribute;
        attr.Text = string.string;
        attr.FontSize = fontAttribute.size;
        attr.FontFamily = fontAttribute.name;
        attr.TextColor = this.colorRatioToHex(colorAttribute);
        attr.Opacity = colorAttribute.alpha;
        attr['AbsoluteLayout.LayoutBounds'] = `${Math.round(ast.frame.x)}, ${Math.round(ast.frame.y)}, ${Math.round(ast.frame.width)}, ${Math.round(ast.frame.height)}`;
        return ('<Label ' +
            Object.keys(attr)
                .map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                return key + '="' + attr[key] + '"';
            }))
                .join('\n' + ' '.repeat(7)) +
            '/>');
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitShape(ast) {
        if (((/** @type {?} */ (ast))).shapeVisited === true) {
            return null;
        }
        /** @type {?} */
        const a = new Shape(((/** @type {?} */ (ast))).points);
        if (a.isRound()) {
            return this.visitRound(ast);
        }
        else if (a.isRectangle()) {
            return this.visitRectangle(ast);
        }
        else if (a.isLine()) {
            return this.visitLine(ast);
        }
        else {
            return this.visitSvg(ast);
        }
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitOther(ast) {
        if (((/** @type {?} */ (ast))).shapeVisited === true) {
            return null;
        }
        if (((/** @type {?} */ (ast)))._class === 'oval' ||
            (((/** @type {?} */ (ast)))._class === 'rectangle' &&
                (!!ast.style.fills || !!ast.style.borders))) {
            return (`<Frame ` +
                this.generateAbsoluteLayout(ast) +
                ` CornerRadius="${((/** @type {?} */ (ast)))._class === 'oval' ? ast.frame.width / 2 : '0'}"` +
                (!!ast.style.fills
                    ? ' BackgroundColor="' +
                        this.colorRatioToHex(ast.style.fills[0].color) +
                        '" Opacity="' +
                        ast.style.fills[0].color.alpha +
                        '"'
                    : ' BackgroundColor="Transparent"') +
                (!!ast.style.borders
                    ? ' BorderColor="' +
                        this.colorRatioToHex(ast.style.borders[0].color) +
                        '"'
                    : '') +
                ' HasShadow="false" />');
        }
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitRound(ast) {
        return (`<Frame ` +
            this.generateAbsoluteLayout(ast) +
            ` CornerRadius="${ast.frame.width / 2}"` +
            (!!ast.style.fills
                ? ' BackgroundColor="' +
                    this.colorRatioToHex(ast.style.fills[0].color) +
                    '" Opacity="' +
                    ast.style.fills[0].color.alpha +
                    '"'
                : ' BackgroundColor="Transparent"') +
            (!!ast.style.borders
                ? ' BorderColor="' +
                    this.colorRatioToHex(ast.style.borders[0].color) +
                    '"'
                : '') +
            ' HasShadow="false" />');
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitRectangle(ast) {
        if (!!ast.style.borders) {
            return (`<Frame ` +
                this.generateAbsoluteLayout(ast) +
                ` CornerRadius="0"` +
                ` BorderColor="${this.colorRatioToHex(ast.style.borders[0].color)}"` +
                (!!ast.style.fills
                    ? ` BackgroundColor="${this.colorRatioToHex(ast.style.fills[0].color)}"` + ` Opacity="${ast.style.fills[0].color.alpha}"`
                    : ` BackgroundColor="Transparent"`) +
                ` HasShadow="false" />`);
        }
        else if (!!ast.style.fills) {
            return (`<BoxView ` +
                this.generateAbsoluteLayout(ast) +
                ` Color="${this.colorRatioToHex(ast.style.fills[0].color)}"` +
                ` Opacity="${ast.style.fills[0].color.alpha}" />`);
        }
        else {
            return '';
        }
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitLine(ast) {
        return (`<BoxView AbsoluteLayout.LayoutBounds="${Math.round(ast.frame.x)}, ${Math.round(ast.frame.y)}, ${Math.round(ast.frame.width)}, 1"` +
            (!!ast.style.fills
                ? ` Color="${this.colorRatioToHex(ast.style.fills[0].color)}"` +
                    ` Opacity="${ast.style.fills[0].color.alpha}" />`
                : ` Color="${this.colorRatioToHex(ast.style.borders[0].color)}"` +
                    ` Opacity="${ast.style.borders[0].color.alpha}" />`));
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitSvg(ast) {
        /** @type {?} */
        const svgFileName = this.sanitizeSvgFileName(ast.do_objectID);
        this.fileList.push(Object.assign({}, this.svgCodeGen.aggregate(ast)[0], { uri: svgFileName, kind: 'xamarinForms' }));
        return (`<ffSvg:SvgCachedImage Source="resource://xLayers.path.to.${svgFileName}"` +
            `\n` +
            ` `.repeat(22) +
            this.generateAbsoluteLayout(ast) +
            `/>`);
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    openGroup(ast) {
        /** @type {?} */
        const border = this.checkLayersForBorder(ast);
        /** @type {?} */
        const background = this.checkLayersForBackground(ast);
        return (`<Frame ` +
            this.generateAbsoluteLayout(ast) +
            ` CornerRadius="0" Padding="0"` +
            (border !== false ? ' BorderColor="' + border + '"' : '') +
            ' BackgroundColor="' +
            (background !== false ? background : 'Transparent') +
            '"' +
            ` HasShadow="false">` +
            `\n  <AbsoluteLayout>`);
    }
    /**
     * @private
     * @param {?} name
     * @return {?}
     */
    sanitizeSvgFileName(name) {
        return '_' + name.toLowerCase().replace(/[^a-z0-9\_]/g, '_') + '.svg';
    }
    /**
     * @private
     * @param {?} ast
     * @return {?}
     */
    generateAbsoluteLayout(ast) {
        return `AbsoluteLayout.LayoutBounds="${Math.round(ast.frame.x)}, ${Math.round(ast.frame.y)}, ${Math.round(ast.frame.width)}, ${Math.round(ast.frame.height)}"`;
    }
    /**
     * @return {?}
     */
    consumeFileList() {
        /** @type {?} */
        const tempFileList = this.fileList;
        this.fileList = [];
        return tempFileList;
    }
}
XamarinFormsCodeGenVisitor.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
XamarinFormsCodeGenVisitor.ctorParameters = () => [
    { type: SvgCodeGenService }
];
/** @nocollapse */ XamarinFormsCodeGenVisitor.ngInjectableDef = ɵɵdefineInjectable({ factory: function XamarinFormsCodeGenVisitor_Factory() { return new XamarinFormsCodeGenVisitor(ɵɵinject(SvgCodeGenService)); }, token: XamarinFormsCodeGenVisitor, providedIn: "root" });
if (false) {
    /** @type {?} */
    XamarinFormsCodeGenVisitor.prototype.fileList;
    /**
     * @type {?}
     * @private
     */
    XamarinFormsCodeGenVisitor.prototype.svgCodeGen;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class XamlCodeGenModule {
}
XamlCodeGenModule.decorators = [
    { type: NgModule, args: [{
                imports: [CssCodeGenModule, SvgCodeGenModule, SketchLibModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { XamarinFormsCodeGenVisitor, XamlCodeGenModule, XmlCodeGenVisitor as ɵa, CodeGenVisitor as ɵb };
//# sourceMappingURL=xlayers-xaml-codegen.js.map
