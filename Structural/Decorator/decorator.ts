/**
 * The base Beverage interface defines operations that can be altered by decorators.
 */
interface Beverage {
  getDescription(): string;
  cost(): number;
}

/**
 * Concrete Components provide default implementations of the operations. There
 * might be several variations of these classes.
 */
class Espresso implements Beverage {
  getDescription(): string {
    return "Espresso";
  }
  cost(): number {
    return 1.99;
  }
}

class HouseBlend implements Beverage {
  getDescription(): string {
    return "House Blend Coffee";
  }
  cost(): number {
    return 0.89;
  }
}

/**
 * The base CondimentDecorator class follows the same interface as the other components.
 * The primary purpose of this class is to define the wrapping interface for all
 * concrete decorators. The default implementation of the wrapping code might
 * include a field for storing a wrapped component and the means to initialize
 * it.
 */
abstract class CondimentDecorator implements Beverage {
  protected beverage: Beverage;

  constructor(beverage: Beverage) {
    this.beverage = beverage;
  }

  /**
   * The Decorator delegates all work to the wrapped component.
   */
  getDescription(): string {
    return this.beverage.getDescription();
  }

  abstract cost(): number;
}

/**
 * Concrete Decorators call the wrapped object and alter its result in some way.
 */
class Milk extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super(beverage);
  }

  getDescription(): string {
    return this.beverage.getDescription() + ", Milk";
  }

  cost(): number {
    return this.beverage.cost() + 0.1;
  }
}

class Mocha extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super(beverage);
  }

  getDescription(): string {
    return this.beverage.getDescription() + ", Mocha";
  }

  cost(): number {
    return this.beverage.cost() + 0.2;
  }
}

/**
 * The client code works with all objects using the Beverage interface. This
 * way it can stay independent of the concrete classes of components it works
 * with.
 */
function clientCode(beverage: Beverage) {
  // ...

  console.log(`DESCRIPTION: ${beverage.getDescription()}`);
  console.log(`COST: $${beverage.cost()}`);

  // ...
}

/**
 * This way the client code can support both simple components...
 */
const espresso = new Espresso();
console.log("Client: I've got an Espresso:");
clientCode(espresso);
console.log("");

const houseBlend = new HouseBlend();
console.log("Client: I've got a House Blend Coffee:");
clientCode(houseBlend);
console.log("");

/**
 * ...as well as decorated ones.
 *
 * Note how decorators can wrap not only simple components but the other
 * decorators as well.
 */
const mochaEspresso = new Mocha(espresso);
console.log("Client: Now I've got a Mocha Espresso:");
clientCode(mochaEspresso);
console.log("");

const milkMochaEspresso = new Milk(mochaEspresso);
console.log("Client: Now I've got a Milk Mocha Espresso:");
clientCode(milkMochaEspresso);
