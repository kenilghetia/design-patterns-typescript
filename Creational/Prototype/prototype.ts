/**
 * The Prototype pattern is used when creating an instance of a class is expensive or complex.
 * It provides a way to create a new object by copying an existing object.
 * It is used to create objects based on a template of an existing object through cloning.
 */

/**
 * In this example, we have implemented the prototype pattern in TypeScript.
 * We have created an interface Shape with two methods clone and draw. We have created two concrete classes Circle and Rectangle that implement the Shape interface.
 * We have created a Prototype class that has a static method getShape to get the clone of the shape object.
 * We have created a class App that uses the Prototype class to get the clone of the shape object and draw the shape.
 */

// Step 1: Create an interface Shape
interface Shape {
  clone(): Shape;
  draw(): void;
}

// Step 2: Create a class Circle
class Circle implements Shape {
  private radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }
  public clone(): Shape {
    return new Circle(this.radius);
  }
  public draw(): void {
    console.log("Drawing Circle with radius: " + this.radius);
  }
}

// Step 3: Create a class Rectangle
class Rectangle implements Shape {
  private width: number;
  private height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  public clone(): Shape {
    return new Rectangle(this.width, this.height);
  }
  public draw(): void {
    console.log(
      "Drawing Rectangle with width: " +
        this.width +
        " and height: " +
        this.height
    );
  }
}

// Step 4: Create a class Prototype
class Prototype {
  private static shapes: { [key: string]: Shape } = {};
  public static getShape(type: string): Shape {
    return this.shapes[type].clone();
  }
  public static loadCache(): void {
    this.shapes["Circle"] = new Circle(10);
    this.shapes["Rectangle"] = new Rectangle(10, 5);
  }
}

class App {
  public static main(): void {
    Prototype.loadCache();
    const circle = Prototype.getShape("Circle");
    circle.draw();
    const rectangle = Prototype.getShape("Rectangle");
    rectangle.draw();
  }
}

App.main();

// Output
// Drawing Circle with radius: 10
// Drawing Rectangle with width: 10 and height: 5
