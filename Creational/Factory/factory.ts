import * as fs from "fs";

interface ILogger {
  log(message: string): void;
}

class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log(`[Console] ${message}`);
  }
}

class FileLogger implements ILogger {
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  log(message: string): void {
    fs.appendFileSync(this.filePath, `[File] ${message}\n`);
  }
}

enum LoggerType {
  Console,
  File,
}

class LoggerFactory {
  static createLogger(type: LoggerType, options?: any): ILogger {
    switch (type) {
      case LoggerType.Console:
        return new ConsoleLogger();
      case LoggerType.File:
        if (options && options.filePath) {
          return new FileLogger(options.filePath);
        } else {
          throw new Error("File path is missing for FileLogger.");
        }
      default:
        throw new Error("Invalid logger type.");
    }
  }
}

// Usage examples
const consoleLogger = LoggerFactory.createLogger(LoggerType.Console);
consoleLogger.log("This is a console log.");

const fileLogger = LoggerFactory.createLogger(LoggerType.File, {
  filePath: "logs.txt",
});
fileLogger.log("This is a file log.");
