/**
 * The Database class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class Database {
  private static instance: Database;

  /**
   * The Database's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   */
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  /**
   * Query method for database operations.
   */
  public query(sql: string): void {
    console.log(`Querying database: ${sql}`);
  }
}

/**
 * The client code.
 */
function clientCode() {
  const database = Database.getInstance();
  database.query("SELECT * FROM users");

  const database2 = Database.getInstance();
  if (database === database2) {
    console.log(
      "The same instance of Database was returned. The Singleton pattern works!"
    );
  } else {
    console.log(
      "A new instance of Database was returned. The Singleton pattern failed."
    );
  }
}

clientCode();
