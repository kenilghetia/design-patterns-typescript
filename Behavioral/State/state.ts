/**
 * State Design Pattern Example
 * Classic Example: TCP Connection States
 */

// Context representing a TCP connection
class TCPConnection {
  private state: TCPState;

  constructor() {
    this.state = new ClosedState(); // Initial state: Closed
  }

  // Set the current state of the connection
  setState(state: TCPState): void {
    console.log(
      `Connection state transition: ${this.state.constructor.name} -> ${state.constructor.name}`
    );
    this.state = state;
  }

  // Request methods delegated to the current state
  open(): void {
    this.state.open(this);
  }

  close(): void {
    this.state.close(this);
  }

  send(data: string): void {
    this.state.send(this, data);
  }

  acknowledge(): void {
    this.state.acknowledge(this);
  }

  // Other methods specific to TCP connection can be added here
}

// State interface representing different states of a TCP connection
interface TCPState {
  open(connection: TCPConnection): void;
  close(connection: TCPConnection): void;
  send(connection: TCPConnection, data: string): void;
  acknowledge(connection: TCPConnection): void;
}

// Concrete state representing a closed TCP connection
class ClosedState implements TCPState {
  open(connection: TCPConnection): void {
    console.log("Opening the connection...");
    connection.setState(new EstablishedState()); // Transition to Established state
  }

  close(connection: TCPConnection): void {
    console.log("Connection is already closed.");
  }

  send(connection: TCPConnection, data: string): void {
    console.error("Cannot send data. Connection is closed.");
  }

  acknowledge(connection: TCPConnection): void {
    console.error("Cannot acknowledge. Connection is closed.");
  }
}

// Concrete state representing an established TCP connection
class EstablishedState implements TCPState {
  open(connection: TCPConnection): void {
    console.error("Connection is already open.");
  }

  close(connection: TCPConnection): void {
    console.log("Closing the connection...");
    connection.setState(new ClosedState()); // Transition to Closed state
  }

  send(connection: TCPConnection, data: string): void {
    console.log(`Sending data: ${data}`);
  }

  acknowledge(connection: TCPConnection): void {
    console.error("No pending acknowledgment. Nothing to acknowledge.");
  }
}

// Client code
const connection = new TCPConnection();

// Open the connection
connection.open();

// Send some data
connection.send("Hello, server!");

// Close the connection
connection.close();

// Attempt to send data after closing the connection
connection.send("This data won't be sent."); // Error: Cannot send data. Connection is closed.
