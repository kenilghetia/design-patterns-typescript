/**
 * The PaymentGatewayFacade class provides a simple interface to the complex
 * process of making payments using various payment methods. It shields the
 * client from the complexity of interacting with different payment providers
 * and managing the payment process.
 */
class PaymentGatewayFacade {
  private paypalGateway: PayPalGateway;
  private stripeGateway: StripeGateway;

  constructor() {
    this.paypalGateway = new PayPalGateway();
    this.stripeGateway = new StripeGateway();
  }

  /**
   * The processPayment method serves as a convenient shortcut for the client
   * to initiate the payment process. It delegates the payment operation to
   * the appropriate payment provider based on the selected method.
   */
  public processPayment(method: string, amount: number): string {
    let result = "";

    switch (method) {
      case "paypal":
        result += this.paypalGateway.makePayment(amount);
        break;
      case "stripe":
        result += this.stripeGateway.makePayment(amount);
        break;
      default:
        result += `Invalid payment method: ${method}`;
    }

    return result;
  }
}

/**
 * The PayPalGateway class provides functionality to make payments using PayPal.
 */
class PayPalGateway {
  public makePayment(amount: number): string {
    return `Payment made using PayPal: $${amount}`;
  }
}

/**
 * The StripeGateway class provides functionality to make payments using Stripe.
 */
class StripeGateway {
  public makePayment(amount: number): string {
    return `Payment made using Stripe: $${amount}`;
  }
}

/**
 * The client code interacts with the PaymentGatewayFacade to initiate the
 * payment process without having to deal with the complexities of interacting
 * with different payment gateways directly.
 */
function clientCode(
  paymentGateway: PaymentGatewayFacade,
  method: string,
  amount: number
) {
  console.log(paymentGateway.processPayment(method, amount));
}

/**
 * Example usage of the PaymentGatewayFacade to process payments using different
 * payment methods.
 */
const paymentGateway = new PaymentGatewayFacade();
clientCode(paymentGateway, "paypal", 100);
clientCode(paymentGateway, "stripe", 150);
