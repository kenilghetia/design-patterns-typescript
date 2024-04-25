/**
 * The Server interface declares common operations for both RealServer and the
 * ProxyServer. As long as the client works with Server using this interface,
 * you'll be able to pass it a proxy instead of a real server.
 */
interface Server {
  request(resource: string): void;
}

/**
 * The RealServer contains some core functionality. It represents a real server
 * that processes client requests, which may involve heavy computations or
 * interactions with a database.
 */
class RealServer implements Server {
  public request(resource: string): void {
    console.log(`RealServer: Handling request for resource '${resource}'.`);
  }
}

/**
 * The ProxyServer acts as a proxy for the RealServer. It provides the same
 * interface as the RealServer and delegates requests to it, but it can also
 * add extra functionality such as caching or access control.
 */
class ProxyServer implements Server {
  private realServer: RealServer;
  private cache: Map<string, string>;

  constructor(realServer: RealServer) {
    this.realServer = realServer;
    this.cache = new Map();
  }

  public request(resource: string): void {
    if (this.cache.has(resource)) {
      console.log(`ProxyServer: Serving resource '${resource}' from cache.`);
    } else {
      this.realServer.request(resource);
      this.cache.set(resource, `Response for '${resource}'`);
    }
  }
}

/**
 * The client code works with servers via the Server interface, allowing it to
 * use both real servers and proxy servers interchangeably.
 */
function clientCode(server: Server, resource: string) {
  server.request(resource);
}

// Create a real server and a proxy server
const realServer = new RealServer();
const proxyServer = new ProxyServer(realServer);

// Client requests with both real server and proxy server
console.log("Client: Sending requests to the real server:");
clientCode(realServer, "/data1");
clientCode(realServer, "/data2");

console.log("\nClient: Sending requests to the proxy server:");
clientCode(proxyServer, "/data1");
clientCode(proxyServer, "/data3");
