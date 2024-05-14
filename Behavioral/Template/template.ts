// Abstract class defining the template method
abstract class BeverageMaker {
  // Template method defining the overall algorithm
  public makeBeverage(): void {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }

  // Primitive operations to be implemented by subclasses
  protected abstract brew(): void;
  protected abstract addCondiments(): void;

  // Concrete operations
  private boilWater(): void {
    console.log("Boiling water...");
  }

  private pourInCup(): void {
    console.log("Pouring into cup...");
  }
}

// Concrete subclass representing Tea
class TeaMaker extends BeverageMaker {
  protected brew(): void {
    console.log("Steeping the tea leaves...");
  }

  protected addCondiments(): void {
    console.log("Adding lemon...");
  }
}

// Concrete subclass representing Coffee
class CoffeeMaker extends BeverageMaker {
  protected brew(): void {
    console.log("Dripping coffee through filter...");
  }

  protected addCondiments(): void {
    console.log("Adding sugar and milk...");
  }
}

// Client code
function clientCode(beverageMaker: BeverageMaker) {
  console.log("Making beverage:");
  beverageMaker.makeBeverage();
  console.log("");
}

// Using the template method with different beverage makers
console.log("Making tea:");
clientCode(new TeaMaker());

console.log("Making coffee:");
clientCode(new CoffeeMaker());
