/**
 * The Context class defines the interface of interest to clients.
 */
class PaymentContext {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  public setPaymentStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  public makePayment(amount: number): void {
    console.log("PaymentContext: Initiating payment process...");
    this.strategy.pay(amount);
  }
}

/**
 * The PaymentStrategy interface declares operations common to all supported payment methods.
 */
interface PaymentStrategy {
  pay(amount: number): void;
}

/**
 * Concrete payment strategies implement the payment algorithm according to a specific payment method.
 */
class CreditCardStrategy implements PaymentStrategy {
  private cardNumber: string;
  private expiryDate: string;
  private cvv: string;

  constructor(cardNumber: string, expiryDate: string, cvv: string) {
    this.cardNumber = cardNumber;
    this.expiryDate = expiryDate;
    this.cvv = cvv;
  }

  public pay(amount: number): void {
    console.log(
      `CreditCardStrategy: Paying ${amount} via credit card (${this.cardNumber})...`
    );
    // Actual payment process using credit card
  }
}

class PayPalStrategy implements PaymentStrategy {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public pay(amount: number): void {
    console.log(
      `PayPalStrategy: Paying ${amount} via PayPal (${this.email})...`
    );
    // Actual payment process using PayPal
  }
}

/**
 * The client code chooses a concrete payment strategy and passes it to the context.
 */
const context = new PaymentContext(
  new CreditCardStrategy("1234 5678 9012 3456", "12/25", "123")
);
console.log("Client: Payment strategy is set to Credit Card.");
context.makePayment(100);

console.log("");

console.log("Client: Changing payment strategy to PayPal.");
context.setPaymentStrategy(
  new PayPalStrategy("example@example.com", "password")
);
context.makePayment(200);
