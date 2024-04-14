/**
 * The Abstraction defines the interface for the "control" part of the two class
 * hierarchies. It maintains a reference to an object of the Implementation
 * hierarchy and delegates all of the real work to this object.
 */
class RemoteControl {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  public togglePower(): string {
    if (this.device.isEnabled()) {
      this.device.disable();
      return "RemoteControl: Turning off the device.";
    } else {
      this.device.enable();
      return "RemoteControl: Turning on the device.";
    }
  }

  public volumeUp(): string {
    const volume = this.device.getVolume();
    this.device.setVolume(volume + 10);
    return `RemoteControl: Increasing volume to ${this.device.getVolume()}.`;
  }

  public volumeDown(): string {
    const volume = this.device.getVolume();
    this.device.setVolume(volume - 10);
    return `RemoteControl: Decreasing volume to ${this.device.getVolume()}.`;
  }
}

/**
 * You can extend the Abstraction without changing the Implementation classes.
 */
class AdvancedRemoteControl extends RemoteControl {
  public mute(): string {
    this.device.setVolume(0);
    return "AdvancedRemoteControl: Muting the device.";
  }
}

/**
 * The Implementation defines the interface for all implementation classes. It
 * doesn't have to match the Abstraction's interface. In fact, the two
 * interfaces can be entirely different. Typically, the Implementation interface
 * provides only primitive operations, while the Abstraction defines higher-
 * level operations based on those primitives.
 */
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(volume: number): void;
}

/**
 * Each Concrete Implementation corresponds to a specific device and
 * implements the Device interface using that device's API.
 */
class TV implements Device {
  private enabled: boolean;
  private volume: number;

  constructor() {
    this.enabled = false;
    this.volume = 50;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public enable(): void {
    this.enabled = true;
  }

  public disable(): void {
    this.enabled = false;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(volume: number): void {
    if (volume >= 0 && volume <= 100) {
      this.volume = volume;
    }
  }
}

class Radio implements Device {
  private enabled: boolean;
  private volume: number;

  constructor() {
    this.enabled = false;
    this.volume = 30;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public enable(): void {
    this.enabled = true;
  }

  public disable(): void {
    this.enabled = false;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(volume: number): void {
    if (volume >= 0 && volume <= 100) {
      this.volume = volume;
    }
  }
}

/**
 * The client code should be able to work with any pre-configured abstraction-
 * implementation combination.
 */
function clientCode(remote: RemoteControl) {
  console.log(remote.togglePower());
  console.log(remote.volumeUp());
  console.log(remote.volumeDown());
  console.log(remote.volumeDown());
}

console.log("Client: Testing TV remote control...");
let tvRemote = new RemoteControl(new TV());
clientCode(tvRemote);

console.log("");

console.log("Client: Testing Radio remote control...");
let radioRemote = new AdvancedRemoteControl(new Radio());
clientCode(radioRemote);
