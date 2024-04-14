/**
 * The Abstract Factory interface declares a set of methods that return
 * different abstract products. These products are called a family and are
 * related by a high-level theme or concept. Products of one family are usually
 * able to collaborate among themselves. A family of products may have several
 * variants, but the products of one variant are incompatible with products of
 * another.
 */
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

/**
 * Concrete Factories produce a family of products that belong to a single
 * variant. The factory guarantees that resulting products are compatible. Note
 * that signatures of the Concrete Factory's methods return an abstract product,
 * while inside the method a concrete product is instantiated.
 */
class WindowsFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }

  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

/**
 * Each Concrete Factory has a corresponding product variant.
 */
class MacOSFactory implements GUIFactory {
  createButton(): Button {
    return new MacOSButton();
  }

  createCheckbox(): Checkbox {
    return new MacOSCheckbox();
  }
}

/**
 * Each distinct product of a product family should have a base interface. All
 * variants of the product must implement this interface.
 */
interface Button {
  render(): void;
}

/**
 * These Concrete Products are created by corresponding Concrete Factories.
 */
class WindowsButton implements Button {
  render(): void {
    console.log("Rendering a Windows button");
  }
}

class MacOSButton implements Button {
  render(): void {
    console.log("Rendering a macOS button");
  }
}

/**
 * Here's the base interface of another product. All products can interact
 * with each other, but proper interaction is possible only between products of
 * the same concrete variant.
 */
interface Checkbox {
  render(): void;
}

/**
 * These Concrete Products are created by corresponding Concrete Factories.
 */
class WindowsCheckbox implements Checkbox {
  render(): void {
    console.log("Rendering a Windows checkbox");
  }
}

class MacOSCheckbox implements Checkbox {
  render(): void {
    console.log("Rendering a macOS checkbox");
  }
}

/**
 * The client code works with factories and products only through abstract
 * types: GUIFactory, Button, and Checkbox. This lets you pass any factory or
 * product subclass to the client code without breaking it.
 */
function clientCode(factory: GUIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();

  button.render();
  checkbox.render();
}

/**
 * The client code can work with any concrete factory class.
 */
console.log("Client: Testing client code with the Windows factory...");
clientCode(new WindowsFactory());

console.log("");

console.log("Client: Testing client code with the MacOS factory...");
clientCode(new MacOSFactory());
