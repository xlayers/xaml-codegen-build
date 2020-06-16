(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@xlayers/svg-codegen'), require('@xlayers/css-codegen'), require('@xlayers/sketch-lib')) :
    typeof define === 'function' && define.amd ? define('@xlayers/xaml-codegen', ['exports', '@angular/core', '@xlayers/svg-codegen', '@xlayers/css-codegen', '@xlayers/sketch-lib'], factory) :
    (global = global || self, factory((global.xlayers = global.xlayers || {}, global.xlayers['xaml-codegen'] = {}), global.ng.core, global.svgCodegen, global.cssCodegen, global.sketchLib));
}(this, (function (exports, core, svgCodegen, cssCodegen, sketchLib) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Visitor-like pattern used for code generation purposes, by iterating through an AST and
     * delegating the codegen to its subclasses.
     * @abstract
     */
    var   /**
     * Visitor-like pattern used for code generation purposes, by iterating through an AST and
     * delegating the codegen to its subclasses.
     * @abstract
     */
    CodeGenVisitor = /** @class */ (function () {
        function CodeGenVisitor() {
        }
        /**
         * Generates a string template by visiting the tree
         * @param ast The Sketch AST
         */
        /**
         * Generates a string template by visiting the tree
         * @param {?} ast The Sketch AST
         * @return {?}
         */
        CodeGenVisitor.prototype.generateTemplate = /**
         * Generates a string template by visiting the tree
         * @param {?} ast The Sketch AST
         * @return {?}
         */
        function (ast) {
            /** @type {?} */
            var template = [];
            this.visit(ast, template, 2);
            return template.join('\n');
        };
        /**
         * @protected
         * @param {?} ast
         * @param {?=} template
         * @param {?=} depth
         * @return {?}
         */
        CodeGenVisitor.prototype.visit = /**
         * @protected
         * @param {?} ast
         * @param {?=} template
         * @param {?=} depth
         * @return {?}
         */
        function (ast, template, depth) {
            var _this = this;
            if (template === void 0) { template = []; }
            if (depth === void 0) { depth = 0; }
            if (ast.layers && Array.isArray(ast.layers)) {
                ast.layers.forEach((/**
                 * @param {?} layer
                 * @return {?}
                 */
                function (layer) { return _this.visitLayer(layer, template, depth); }));
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
        };
        /**
         * @protected
         * @param {?} layer
         * @param {?} template
         * @param {?} depth
         * @return {?}
         */
        CodeGenVisitor.prototype.visitLayer = /**
         * @protected
         * @param {?} layer
         * @param {?} template
         * @param {?} depth
         * @return {?}
         */
        function (layer, template, depth) {
            /** @type {?} */
            var content = this.visit(layer, template, depth + 1);
            if (content) {
                template.push(content);
            }
        };
        /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        CodeGenVisitor.prototype.visitShape = /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        function (ast) {
            return ((/** @type {?} */ (ast))).shape;
        };
        /**
         * @protected
         * @param {?} color
         * @return {?}
         */
        CodeGenVisitor.prototype.colorRatioToHex = /**
         * @protected
         * @param {?} color
         * @return {?}
         */
        function (color) {
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
        };
        // return colorhex: string or false
        // return colorhex: string or false
        /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        CodeGenVisitor.prototype.checkLayersForBorder = 
        // return colorhex: string or false
        /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        function (ast) {
            var e_1, _a;
            /** @type {?} */
            var border = false;
            try {
                for (var _b = __values(ast.layers), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var layer = _c.value;
                    border = this.checkForBorder(ast, layer);
                    if (border !== false) {
                        return border;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return border;
        };
        // return colorhex: string or false
        // return colorhex: string or false
        /**
         * @private
         * @param {?} parent
         * @param {?} ast
         * @return {?}
         */
        CodeGenVisitor.prototype.checkForBorder = 
        // return colorhex: string or false
        /**
         * @private
         * @param {?} parent
         * @param {?} ast
         * @return {?}
         */
        function (parent, ast) {
            if (ast.frame.x === 0 &&
                ast.frame.y === 0 &&
                parent.frame.width === ast.frame.width &&
                parent.frame.height === ast.frame.height &&
                !!ast.style.borders) {
                ((/** @type {?} */ (ast))).shapeVisited = true;
                return this.colorRatioToHex(ast.style.borders[0].color);
            }
            return false;
        };
        // return colorhex: string or false
        // return colorhex: string or false
        /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        CodeGenVisitor.prototype.checkLayersForBackground = 
        // return colorhex: string or false
        /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        function (ast) {
            var e_2, _a;
            /** @type {?} */
            var background = false;
            try {
                for (var _b = __values(ast.layers), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var layer = _c.value;
                    background = this.checkForBackground(ast, layer);
                    if (background !== false) {
                        return background;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return background;
        };
        // return colorhex: string or false
        // return colorhex: string or false
        /**
         * @private
         * @param {?} parent
         * @param {?} ast
         * @return {?}
         */
        CodeGenVisitor.prototype.checkForBackground = 
        // return colorhex: string or false
        /**
         * @private
         * @param {?} parent
         * @param {?} ast
         * @return {?}
         */
        function (parent, ast) {
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
        };
        return CodeGenVisitor;
    }());
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
    var   /**
     * @see CodeGenVisitor implementation that can be used to generate code in an XML-based representation.
     * @abstract
     */
    XmlCodeGenVisitor = /** @class */ (function (_super) {
        __extends(XmlCodeGenVisitor, _super);
        function XmlCodeGenVisitor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.indentationSymbol = '  '; // 2 spaces ftw
            return _this;
        }
        // 2 spaces ftw
        /**
         * @protected
         * @param {?} tag
         * @param {?=} attributes
         * @param {?=} autoclose
         * @return {?}
         */
        XmlCodeGenVisitor.prototype.openTag = 
        // 2 spaces ftw
        /**
         * @protected
         * @param {?} tag
         * @param {?=} attributes
         * @param {?=} autoclose
         * @return {?}
         */
        function (tag, attributes, autoclose) {
            if (attributes === void 0) { attributes = []; }
            if (autoclose === void 0) { autoclose = false; }
            return "<" + tag + (attributes.length !== 0 ? ' ' + attributes.join(' ') : '') + (autoclose ? ' /' : '') + ">";
        };
        /**
         * @protected
         * @param {?} tag
         * @return {?}
         */
        XmlCodeGenVisitor.prototype.closeTag = /**
         * @protected
         * @param {?} tag
         * @return {?}
         */
        function (tag) {
            return "</" + tag + ">";
        };
        /**
         * @protected
         * @param {?} n
         * @param {?} content
         * @return {?}
         */
        XmlCodeGenVisitor.prototype.indent = /**
         * @protected
         * @param {?} n
         * @param {?} content
         * @return {?}
         */
        function (n, content) {
            /** @type {?} */
            var indentation = !!n ? this.indentationSymbol.repeat(n) : '';
            return indentation + content.split('\n').join('\n' + indentation);
        };
        return XmlCodeGenVisitor;
    }(CodeGenVisitor));
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
    var Point = /** @class */ (function () {
        function Point(strOrX, y) {
            // a string containing the coords is input
            if (y === undefined) {
                /** @type {?} */
                var coords = this.stringToCoords(strOrX);
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
        // 2 decimals rounding
        /**
         * @param {?} number
         * @return {?}
         */
        Point.prototype.decRound = 
        // 2 decimals rounding
        /**
         * @param {?} number
         * @return {?}
         */
        function (number) {
            return Math.round(number * 100 + 0.001) / 100;
        };
        /**
         * @param {?} point
         * @return {?}
         */
        Point.prototype.distanceRounded = /**
         * @param {?} point
         * @return {?}
         */
        function (point) {
            return this.decRound(this.distance(point));
        };
        /**
         * @param {?} point
         * @return {?}
         */
        Point.prototype.distance = /**
         * @param {?} point
         * @return {?}
         */
        function (point) {
            return Math.sqrt(this.distanceSquared(point));
        };
        /**
         * @param {?} point
         * @return {?}
         */
        Point.prototype.distanceSquaredRounded = /**
         * @param {?} point
         * @return {?}
         */
        function (point) {
            return this.decRound(this.distanceSquared(point));
        };
        /**
         * @param {?} point
         * @return {?}
         */
        Point.prototype.distanceSquared = /**
         * @param {?} point
         * @return {?}
         */
        function (point) {
            return Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2);
        };
        /**
         * @param {?} string
         * @return {?}
         */
        Point.prototype.stringToCoords = /**
         * @param {?} string
         * @return {?}
         */
        function (string) {
            // match two numbers in a string of the form '{123, 456}'
            // and place them in two capturing groups named 'x' and 'y'
            // numbers may be negatives and may be int or float
            /** @type {?} */
            var regex = /{(?<x>\-?\d(?:\.\d+)?(?:e\-?\d+)?),\s?(?<y>\-?\d(?:\.\d+)?(?:e\-?\d+)?)}/;
            /** @type {?} */
            var match = string.match(regex);
            if (!!match) {
                // match.groups: {x: number, y: number}
                return match.groups;
            }
            return false;
        };
        return Point;
    }());
    if (false) {
        /** @type {?} */
        Point.prototype.x;
        /** @type {?} */
        Point.prototype.y;
    }
    var Cluster = /** @class */ (function () {
        function Cluster(point) {
            this.points = [];
            if (point !== undefined) {
                this.addPoint(point);
            }
        }
        /**
         * @return {?}
         */
        Cluster.prototype.updateBarycenter = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var avgX = 0;
            /** @type {?} */
            var avgY = 0;
            this.points.forEach((/**
             * @param {?} point
             * @return {?}
             */
            function (point) {
                avgX += point.x;
                avgY += point.y;
            }));
            avgX /= this.points.length;
            avgY /= this.points.length;
            this.barycenter = new Point(avgX, avgY);
        };
        /**
         * @param {?} point
         * @return {?}
         */
        Cluster.prototype.addPoint = /**
         * @param {?} point
         * @return {?}
         */
        function (point) {
            this.points.push(point);
            this.updateBarycenter();
        };
        return Cluster;
    }());
    if (false) {
        /** @type {?} */
        Cluster.prototype.points;
        /** @type {?} */
        Cluster.prototype.barycenter;
    }
    var Shape = /** @class */ (function () {
        function Shape(points) {
            var _this = this;
            this.points = [];
            points.forEach((/**
             * @param {?} point
             * @return {?}
             */
            function (point) {
                _this.points.push(new Point(point.point));
                if (point.hasCurveFrom === true) {
                    _this.points.push(new Point(point.curveFrom));
                }
                if (point.hasCurveTo === true) {
                    _this.points.push(new Point(point.curveTo));
                }
            }));
        }
        // check if ABC is orthogonal on B
        // check if ABC is orthogonal on B
        /**
         * @param {?} A
         * @param {?} B
         * @param {?} C
         * @return {?}
         */
        Shape.isOrthogonal = 
        // check if ABC is orthogonal on B
        /**
         * @param {?} A
         * @param {?} B
         * @param {?} C
         * @return {?}
         */
        function (A, B, C) {
            return Math.abs(A.distanceSquared(B) + B.distanceSquared(C) - A.distanceSquared(C)) < Shape.shapeRecognitionPrecision;
        };
        // divide the points in 4 clusters
        // divide the points in 4 clusters
        /**
         * @return {?}
         */
        Shape.prototype.clusterPoints4 = 
        // divide the points in 4 clusters
        /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var tempBarycenterX = 0;
            /** @type {?} */
            var tempBarycenterY = 0;
            this.points.forEach((/**
             * @param {?} point
             * @return {?}
             */
            function (point) {
                tempBarycenterX += point.x;
                tempBarycenterY += point.y;
            }));
            /** @type {?} */
            var barycenter = new Point(tempBarycenterX / this.points.length, tempBarycenterY / this.points.length);
            /** @type {?} */
            var clusters = {};
            clusters.topLeft = new Cluster();
            clusters.topRight = new Cluster();
            clusters.bottomLeft = new Cluster();
            clusters.bottomRight = new Cluster();
            this.points.forEach((/**
             * @param {?} point
             * @return {?}
             */
            function (point) {
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
        };
        /**
         * @return {?}
         */
        Shape.prototype.isRectangle = /**
         * @return {?}
         */
        function () {
            if (this.points.length < 4) {
                return false;
            }
            /** @type {?} */
            var clusters = this.clusterPoints4();
            for (var corner in clusters) {
                if (clusters[corner].points.length === 0) {
                    return false;
                }
            }
            /** @type {?} */
            var topLength = clusters.topLeft.barycenter.distance(clusters.topRight.barycenter);
            /** @type {?} */
            var bottomLength = clusters.bottomLeft.barycenter.distance(clusters.bottomRight.barycenter);
            /** @type {?} */
            var leftLength = clusters.topLeft.barycenter.distance(clusters.bottomLeft.barycenter);
            /** @type {?} */
            var rightLength = clusters.topRight.barycenter.distance(clusters.bottomRight.barycenter);
            return Math.abs(topLength - bottomLength) < Shape.shapeRecognitionPrecision
                && Math.abs(leftLength - rightLength) < Shape.shapeRecognitionPrecision
                && Shape.isOrthogonal(clusters.bottomLeft.barycenter, clusters.topLeft.barycenter, clusters.topRight.barycenter);
        };
        /**
         * @return {?}
         */
        Shape.prototype.isLine = /**
         * @return {?}
         */
        function () {
            return this.points.length === 2
                && Math.abs(this.points[0].y - this.points[1].y) < Shape.shapeRecognitionPrecision;
        };
        /**
         * @return {?}
         */
        Shape.prototype.isRound = /**
         * @return {?}
         */
        function () {
            if (this.isRectangle() || this.isLine()) {
                return false;
            }
            /** @type {?} */
            var circle = new Cluster();
            this.points.forEach((/**
             * @param {?} point
             * @return {?}
             */
            function (point) {
                circle.addPoint(point);
            }));
            // if the points are not equally sprayed around the circle,
            // the barycenter may be different from the actual center of the circle
            /** @type {?} */
            var center = new Point(0.5, 0.5);
            /** @type {?} */
            var radius2 = circle.points[0].distanceSquaredRounded(circle.barycenter);
            /** @type {?} */
            var radiusCenter2 = circle.points[0].distanceSquaredRounded(center);
            /** @type {?} */
            var isCircle = true;
            /** @type {?} */
            var isCircleCentered = true;
            circle.points.some((/**
             * @param {?} point
             * @return {?}
             */
            function (point) {
                if (Math.abs(point.distanceSquaredRounded(circle.barycenter) - radius2) > Shape.shapeRecognitionPrecision * 2) {
                    isCircle = false;
                    return true;
                }
            }));
            circle.points.some((/**
             * @param {?} point
             * @return {?}
             */
            function (point) {
                if (Math.abs(point.distanceSquaredRounded(center) - radiusCenter2) > Shape.shapeRecognitionPrecision * 2) {
                    isCircleCentered = false;
                    return true;
                }
            }));
            return isCircle || isCircleCentered;
        };
        Shape.shapeRecognitionPrecision = 0.05;
        return Shape;
    }());
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
    var XamarinFormsCodeGenVisitor = /** @class */ (function (_super) {
        __extends(XamarinFormsCodeGenVisitor, _super);
        function XamarinFormsCodeGenVisitor(svgCodeGen) {
            var _this = _super.call(this) || this;
            _this.svgCodeGen = svgCodeGen;
            _this.fileList = [];
            return _this;
        }
        /**
         * @protected
         * @param {?} layer
         * @param {?=} template
         * @param {?=} depth
         * @return {?}
         */
        XamarinFormsCodeGenVisitor.prototype.visitLayer = /**
         * @protected
         * @param {?} layer
         * @param {?=} template
         * @param {?=} depth
         * @return {?}
         */
        function (layer, template, depth) {
            if (template === void 0) { template = []; }
            if (depth === void 0) { depth = 0; }
            /** @type {?} */
            var content;
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
        };
        /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        XamarinFormsCodeGenVisitor.prototype.visitBitmap = /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        function (ast) {
            return "<Image Source=\"" + ((/** @type {?} */ (ast))).image._ref + "\">";
        };
        /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        XamarinFormsCodeGenVisitor.prototype.visitText = /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        function (ast) {
            /** @type {?} */
            var attr = {};
            /** @type {?} */
            var string = ast.attributedString;
            /** @type {?} */
            var fontAttribute = string.attributes[0].attributes.MSAttributedStringFontAttribute
                .attributes;
            /** @type {?} */
            var colorAttribute = ((/** @type {?} */ (string.attributes[0].attributes)))
                .MSAttributedStringColorAttribute;
            attr.Text = string.string;
            attr.FontSize = fontAttribute.size;
            attr.FontFamily = fontAttribute.name;
            attr.TextColor = this.colorRatioToHex(colorAttribute);
            attr.Opacity = colorAttribute.alpha;
            attr['AbsoluteLayout.LayoutBounds'] = Math.round(ast.frame.x) + ", " + Math.round(ast.frame.y) + ", " + Math.round(ast.frame.width) + ", " + Math.round(ast.frame.height);
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
        };
        /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        XamarinFormsCodeGenVisitor.prototype.visitShape = /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        function (ast) {
            if (((/** @type {?} */ (ast))).shapeVisited === true) {
                return null;
            }
            /** @type {?} */
            var a = new Shape(((/** @type {?} */ (ast))).points);
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
        };
        /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        XamarinFormsCodeGenVisitor.prototype.visitOther = /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        function (ast) {
            if (((/** @type {?} */ (ast))).shapeVisited === true) {
                return null;
            }
            if (((/** @type {?} */ (ast)))._class === 'oval' ||
                (((/** @type {?} */ (ast)))._class === 'rectangle' &&
                    (!!ast.style.fills || !!ast.style.borders))) {
                return ("<Frame " +
                    this.generateAbsoluteLayout(ast) +
                    (" CornerRadius=\"" + (((/** @type {?} */ (ast)))._class === 'oval' ? ast.frame.width / 2 : '0') + "\"") +
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
        };
        /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        XamarinFormsCodeGenVisitor.prototype.visitRound = /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        function (ast) {
            return ("<Frame " +
                this.generateAbsoluteLayout(ast) +
                (" CornerRadius=\"" + ast.frame.width / 2 + "\"") +
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
        };
        /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        XamarinFormsCodeGenVisitor.prototype.visitRectangle = /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        function (ast) {
            if (!!ast.style.borders) {
                return ("<Frame " +
                    this.generateAbsoluteLayout(ast) +
                    " CornerRadius=\"0\"" +
                    (" BorderColor=\"" + this.colorRatioToHex(ast.style.borders[0].color) + "\"") +
                    (!!ast.style.fills
                        ? " BackgroundColor=\"" + this.colorRatioToHex(ast.style.fills[0].color) + "\"" + (" Opacity=\"" + ast.style.fills[0].color.alpha + "\"")
                        : " BackgroundColor=\"Transparent\"") +
                    " HasShadow=\"false\" />");
            }
            else if (!!ast.style.fills) {
                return ("<BoxView " +
                    this.generateAbsoluteLayout(ast) +
                    (" Color=\"" + this.colorRatioToHex(ast.style.fills[0].color) + "\"") +
                    (" Opacity=\"" + ast.style.fills[0].color.alpha + "\" />"));
            }
            else {
                return '';
            }
        };
        /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        XamarinFormsCodeGenVisitor.prototype.visitLine = /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        function (ast) {
            return ("<BoxView AbsoluteLayout.LayoutBounds=\"" + Math.round(ast.frame.x) + ", " + Math.round(ast.frame.y) + ", " + Math.round(ast.frame.width) + ", 1\"" +
                (!!ast.style.fills
                    ? " Color=\"" + this.colorRatioToHex(ast.style.fills[0].color) + "\"" +
                        (" Opacity=\"" + ast.style.fills[0].color.alpha + "\" />")
                    : " Color=\"" + this.colorRatioToHex(ast.style.borders[0].color) + "\"" +
                        (" Opacity=\"" + ast.style.borders[0].color.alpha + "\" />")));
        };
        /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        XamarinFormsCodeGenVisitor.prototype.visitSvg = /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        function (ast) {
            /** @type {?} */
            var svgFileName = this.sanitizeSvgFileName(ast.do_objectID);
            this.fileList.push(__assign({}, this.svgCodeGen.aggregate(ast)[0], { uri: svgFileName, kind: 'xamarinForms' }));
            return ("<ffSvg:SvgCachedImage Source=\"resource://xLayers.path.to." + svgFileName + "\"" +
                "\n" +
                " ".repeat(22) +
                this.generateAbsoluteLayout(ast) +
                "/>");
        };
        /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        XamarinFormsCodeGenVisitor.prototype.openGroup = /**
         * @protected
         * @param {?} ast
         * @return {?}
         */
        function (ast) {
            /** @type {?} */
            var border = this.checkLayersForBorder(ast);
            /** @type {?} */
            var background = this.checkLayersForBackground(ast);
            return ("<Frame " +
                this.generateAbsoluteLayout(ast) +
                " CornerRadius=\"0\" Padding=\"0\"" +
                (border !== false ? ' BorderColor="' + border + '"' : '') +
                ' BackgroundColor="' +
                (background !== false ? background : 'Transparent') +
                '"' +
                " HasShadow=\"false\">" +
                "\n  <AbsoluteLayout>");
        };
        /**
         * @private
         * @param {?} name
         * @return {?}
         */
        XamarinFormsCodeGenVisitor.prototype.sanitizeSvgFileName = /**
         * @private
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return '_' + name.toLowerCase().replace(/[^a-z0-9\_]/g, '_') + '.svg';
        };
        /**
         * @private
         * @param {?} ast
         * @return {?}
         */
        XamarinFormsCodeGenVisitor.prototype.generateAbsoluteLayout = /**
         * @private
         * @param {?} ast
         * @return {?}
         */
        function (ast) {
            return "AbsoluteLayout.LayoutBounds=\"" + Math.round(ast.frame.x) + ", " + Math.round(ast.frame.y) + ", " + Math.round(ast.frame.width) + ", " + Math.round(ast.frame.height) + "\"";
        };
        /**
         * @return {?}
         */
        XamarinFormsCodeGenVisitor.prototype.consumeFileList = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var tempFileList = this.fileList;
            this.fileList = [];
            return tempFileList;
        };
        XamarinFormsCodeGenVisitor.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        XamarinFormsCodeGenVisitor.ctorParameters = function () { return [
            { type: svgCodegen.SvgCodeGenService }
        ]; };
        /** @nocollapse */ XamarinFormsCodeGenVisitor.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function XamarinFormsCodeGenVisitor_Factory() { return new XamarinFormsCodeGenVisitor(core.ɵɵinject(svgCodegen.SvgCodeGenService)); }, token: XamarinFormsCodeGenVisitor, providedIn: "root" });
        return XamarinFormsCodeGenVisitor;
    }(XmlCodeGenVisitor));
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
    var XamlCodeGenModule = /** @class */ (function () {
        function XamlCodeGenModule() {
        }
        XamlCodeGenModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [cssCodegen.CssCodeGenModule, svgCodegen.SvgCodeGenModule, sketchLib.SketchLibModule]
                    },] }
        ];
        return XamlCodeGenModule;
    }());

    exports.XamarinFormsCodeGenVisitor = XamarinFormsCodeGenVisitor;
    exports.XamlCodeGenModule = XamlCodeGenModule;
    exports.ɵa = XmlCodeGenVisitor;
    exports.ɵb = CodeGenVisitor;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=xlayers-xaml-codegen.umd.js.map
