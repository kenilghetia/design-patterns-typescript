interface DocumentPrototype {
  clone(): DocumentPrototype;
  print(): void;
}

class ContractDocument implements DocumentPrototype {
  private content: string = "Standard Contract Template";

  clone(): ContractDocument {
    const cloned = new ContractDocument();
    cloned.setContent(this.content);
    return cloned;
  }

  setContent(content: string) {
    this.content = content;
  }

  print() {
    console.log(this.content);
  }
}

// Usage
const standardContract = new ContractDocument();
const customizedContract = standardContract.clone();

customizedContract.setContent("Customized Contract Content");
customizedContract.print();
