/// <reference types="sketchapp" />
declare class Point {
    x: number;
    y: number;
    constructor(str: string);
    constructor(x: number, y: number);
    decRound(number: number): number;
    distanceRounded(point: Point): number;
    distance(point: Point): number;
    distanceSquaredRounded(point: Point): number;
    distanceSquared(point: Point): number;
    stringToCoords(string: string): RegExpMatchArray['groups'] | boolean;
}
export declare class Shape {
    static readonly shapeRecognitionPrecision = 0.05;
    points: Point[];
    topLeft: Point;
    topRight: Point;
    bottomLeft: Point;
    bottomRight: Point;
    static isOrthogonal(A: Point, B: Point, C: Point): boolean;
    constructor(points: SketchMSCurvePoint[]);
    clusterPoints4(): any;
    isRectangle(): boolean;
    isLine(): boolean;
    isRound(): boolean;
}
export {};
