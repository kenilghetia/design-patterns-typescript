/**
 * The Shape interface declares a method `accept` that should take the base
 * visitor interface as an argument.
 */
interface Shape {
    accept(visitor: ShapeVisitor): void;
}

/**
 * Each Concrete Shape must implement the `accept` method in such a way that
 * it calls the visitor's method corresponding to the shape's class.
 */
class Circle implements Shape {
    private radius: number;

    constructor(radius: number = 2) {
        this.radius = radius;
    }

    /**
     * Note that we're calling `visitCircle`, which matches the
     * current class name. This way we let the visitor know the class of the
     * shape it works with.
     */
    public accept(visitor: ShapeVisitor): void {
        visitor.visitCircle(this);
    }

    /**
     * Circle may have special methods that don't exist in their
     * base class or interface. The Visitor is still able to use these methods
     * since it's aware of the shape's concrete class.
     */
    public getRadius(): number {
        return this.radius;
    }
}

class Rectangle implements Shape {
    private width: number;
    private height: number;

    constructor(width: number = 4, height: number = 6) {
        this.width = width;
        this.height = height;
    }

    /**
     * Same here: visitRectangle => Rectangle
     */
    public accept(visitor: ShapeVisitor): void {
        visitor.visitRectangle(this);
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }
}

/**
 * The Visitor Interface declares a set of visiting methods that correspond to
 * shape classes. The signature of a visiting method allows the visitor to
 * identify the exact class of the shape that it's dealing with.
 */
interface ShapeVisitor {
    visitCircle(circle: Circle): void;

    visitRectangle(rectangle: Rectangle): void;
}

/**
 * Concrete Visitors implement several versions of the same algorithm, which can
 * work with all concrete shape classes.
 */
class ShapeAreaVisitor implements ShapeVisitor {
    public visitCircle(circle: Circle): void {
        const area = Math.PI * Math.pow(circle.getRadius(), 2);
        console.log(`Area of Circle: ${area.toFixed(2)}`);
    }

    public visitRectangle(rectangle: Rectangle): void {
        const area = rectangle.getWidth() * rectangle.getHeight();
        console.log(`Area of Rectangle: ${area}`);
    }
}

class ShapePerimeterVisitor implements ShapeVisitor {
    public visitCircle(circle: Circle): void {
        const perimeter = 2 * Math.PI * circle.getRadius();
        console.log(`Perimeter of Circle: ${perimeter.toFixed(2)}`);
    }

    public visitRectangle(rectangle: Rectangle): void {
        const perimeter = 2 * (rectangle.getWidth() + rectangle.getHeight());
        console.log(`Perimeter of Rectangle: ${perimeter}`);
    }
}

/**
 * The client code can run visitor operations over any set of elements without
 * figuring out their concrete classes. The accept operation directs a call to
 * the appropriate operation in the visitor object.
 */
function clientCode(shapes: Shape[], visitor: ShapeVisitor) {
    for (const shape of shapes) {
        shape.accept(visitor);
    }
}

const shapes: Shape[] = [
    new Circle(5),
    new Rectangle(10, 15)
];

console.log('Calculating areas using ShapeAreaVisitor:');
const areaVisitor = new ShapeAreaVisitor();
clientCode(shapes, areaVisitor);
console.log('');

console.log('Calculating perimeters using ShapePerimeterVisitor:');
const perimeterVisitor = new ShapePerimeterVisitor();
clientCode(shapes, perimeterVisitor);
