/**
 * The Handler interface declares a method for building the chain of handlers.
 * It also declares a method for processing a purchase request.
 */
interface Approver {
  setNext(approver: Approver): Approver;
  processRequest(request: PurchaseRequest): void;
}

/**
 * The default chaining behavior can be implemented inside a base handler class.
 */
abstract class AbstractApprover implements Approver {
  private nextApprover: Approver;

  public setNext(approver: Approver): Approver {
    this.nextApprover = approver;
    return approver;
  }

  public processRequest(request: PurchaseRequest): void {
    if (this.nextApprover) {
      this.nextApprover.processRequest(request);
    } else {
      console.log(
        `Request for ${request.amount} ${request.purpose} cannot be approved.`
      );
    }
  }
}

/**
 * PurchaseRequest class represents a purchase request with the purpose and amount.
 */
class PurchaseRequest {
  constructor(public purpose: string, public amount: number) {}
}

/**
 * Concrete approvers process purchase requests based on their authority level.
 */
class DepartmentManager extends AbstractApprover {
  public processRequest(request: PurchaseRequest): void {
    if (request.amount <= 1000) {
      console.log(
        `Department Manager approved the purchase of ${request.purpose}.`
      );
    } else {
      super.processRequest(request);
    }
  }
}

class FinanceManager extends AbstractApprover {
  public processRequest(request: PurchaseRequest): void {
    if (request.amount <= 5000) {
      console.log(
        `Finance Manager approved the purchase of ${request.purpose}.`
      );
    } else {
      super.processRequest(request);
    }
  }
}

class CEO extends AbstractApprover {
  public processRequest(request: PurchaseRequest): void {
    console.log(`CEO approved the purchase of ${request.purpose}.`);
  }
}

/**
 * The client code constructs the chain of approvers and sends purchase requests.
 */
function clientCode(approver: Approver) {
  const requests = [
    new PurchaseRequest("Laptops", 800),
    new PurchaseRequest("Office Supplies", 3000),
    new PurchaseRequest("New Furniture", 10000),
  ];

  for (const request of requests) {
    console.log(
      `Processing purchase request for ${request.purpose} of $${request.amount}:`
    );
    approver.processRequest(request);
    console.log();
  }
}

/**
 * Constructing the chain of approvers.
 */
const departmentManager = new DepartmentManager();
const financeManager = new FinanceManager();
const ceo = new CEO();

departmentManager.setNext(financeManager).setNext(ceo);

/**
 * Sending purchase requests to the chain.
 */
clientCode(departmentManager);
