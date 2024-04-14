/**
 * The Builder interface specifies methods for creating the different parts of
 * the Product objects.
 */
interface ComputerBuilder {
  setProcessor(processor: string): ComputerBuilder;
  setRAM(RAM: string): ComputerBuilder;
  setHardDrive(hardDrive: string): ComputerBuilder;
  setGraphicsCard(graphicsCard: string): ComputerBuilder;
  build(): Computer;
}

/**
 * The Concrete Builder classes follow the Builder interface and provide
 * specific implementations of the building steps.
 */
class ConcreteComputerBuilder implements ComputerBuilder {
  private computer: Computer;

  /**
   * A fresh builder instance should contain a blank product object, which is
   * used in further assembly.
   */
  constructor() {
    this.reset();
  }

  private reset(): void {
    this.computer = new Computer();
  }

  /**
   * All production steps work with the same product instance.
   */
  setProcessor(processor: string): ComputerBuilder {
    this.computer.processor = processor;
    return this;
  }

  setRAM(RAM: string): ComputerBuilder {
    this.computer.RAM = RAM;
    return this;
  }

  setHardDrive(hardDrive: string): ComputerBuilder {
    this.computer.hardDrive = hardDrive;
    return this;
  }

  setGraphicsCard(graphicsCard: string): ComputerBuilder {
    this.computer.graphicsCard = graphicsCard;
    return this;
  }

  /**
   * Concrete Builders are supposed to provide their own methods for
   * retrieving results.
   */
  build(): Computer {
    const result = this.computer;
    this.reset();
    return result;
  }
}

/**
 * It makes sense to use the Builder pattern only when your products are quite
 * complex and require extensive configuration.
 */
class Computer {
  processor: string;
  RAM: string;
  hardDrive: string;
  graphicsCard: string;
}

// Usage
const computerBuilder: ComputerBuilder = new ConcreteComputerBuilder();
const customPC: Computer = computerBuilder
  .setProcessor("AMD Ryzen 7")
  .setRAM("32GB")
  .setHardDrive("1TB SSD")
  .setGraphicsCard("Nvidia RTX 3070")
  .build();

console.log(customPC);
