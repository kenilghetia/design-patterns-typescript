/**
 * The Command interface declares a method for executing a command.
 */
interface Command {
  execute(): void;
}

/**
 * Concrete command for preparing a specific dish.
 */
class PrepareDishCommand implements Command {
  private chef: Chef;
  private dish: string;

  constructor(chef: Chef, dish: string) {
    this.chef = chef;
    this.dish = dish;
  }

  execute(): void {
    this.chef.prepareDish(this.dish);
  }
}

/**
 * The Receiver class represents the kitchen staff who knows how to execute
 * various commands.
 */
class Chef {
  prepareDish(dish: string): void {
    console.log(`Chef: Preparing ${dish}...`);
  }
}

/**
 * The Invoker class represents the waiter who receives and places orders.
 */
class Waiter {
  private ordersQueue: Command[] = [];

  takeOrder(command: Command): void {
    this.ordersQueue.push(command);
  }

  placeOrders(): void {
    console.log("Waiter: Placing orders to the kitchen...");
    this.ordersQueue.forEach((order) => order.execute());
    this.ordersQueue = [];
  }
}

// Client code
const chef = new Chef();
const waiter = new Waiter();

// Creating commands for various dishes
const command1 = new PrepareDishCommand(chef, "Pizza");
const command2 = new PrepareDishCommand(chef, "Pasta");
const command3 = new PrepareDishCommand(chef, "Salad");

// Waiter takes orders
waiter.takeOrder(command1);
waiter.takeOrder(command2);
waiter.takeOrder(command3);

// Waiter places orders to the kitchen
waiter.placeOrders();
