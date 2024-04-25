/**
 * The DocumentFontFactory manages the creation and sharing of font flyweights
 * for documents. It ensures that font flyweights representing the same font
 * family and style are shared among multiple documents to reduce memory usage
 * and improve performance.
 */
class DocumentFontFactory {
  private fontFlyweights: { [key: string]: FontFlyweight } = {};

  constructor() {
    // Pre-populate the font flyweight factory with common font styles.
    this.loadFontFlyweights();
  }

  /**
   * Load pre-defined font flyweights into the factory.
   */
  private loadFontFlyweights(): void {
    // Load font flyweights for common font families and styles.
    this.createFontFlyweight("Arial", "Regular");
    this.createFontFlyweight("Arial", "Bold");
    this.createFontFlyweight("Times New Roman", "Regular");
    this.createFontFlyweight("Times New Roman", "Italic");
    this.createFontFlyweight("Verdana", "Regular");
    // Additional font styles can be added as needed.
  }

  /**
   * Create a font flyweight for a given font family and style if it doesn't
   * already exist, or return the existing one.
   */
  private createFontFlyweight(fontFamily: string, fontStyle: string): void {
    const key = this.getFlyweightKey(fontFamily, fontStyle);

    if (!(key in this.fontFlyweights)) {
      this.fontFlyweights[key] = new FontFlyweight(fontFamily, fontStyle);
    }
  }

  /**
   * Generate a unique key for a font flyweight based on its font family and
   * style.
   */
  private getFlyweightKey(fontFamily: string, fontStyle: string): string {
    return `${fontFamily}_${fontStyle}`;
  }

  /**
   * Retrieve a font flyweight based on its font family and style.
   */
  public getFontFlyweight(
    fontFamily: string,
    fontStyle: string
  ): FontFlyweight {
    const key = this.getFlyweightKey(fontFamily, fontStyle);

    if (!(key in this.fontFlyweights)) {
      // If the requested font flyweight doesn't exist, create a new one.
      this.createFontFlyweight(fontFamily, fontStyle);
    }

    return this.fontFlyweights[key];
  }
}

/**
 * The FontFlyweight represents a shared font style that can be reused across
 * multiple documents. It contains intrinsic state (font family and style) that
 * is shared among documents, while the extrinsic state (font size, color, etc.)
 * is managed by individual document objects.
 */
class FontFlyweight {
  private fontFamily: string;
  private fontStyle: string;

  constructor(fontFamily: string, fontStyle: string) {
    this.fontFamily = fontFamily;
    this.fontStyle = fontStyle;
  }

  /**
   * Get the font family of the font flyweight.
   */
  public getFontFamily(): string {
    return this.fontFamily;
  }

  /**
   * Get the font style of the font flyweight.
   */
  public getFontStyle(): string {
    return this.fontStyle;
  }
}

/**
 * The Document class represents a document that contains text with various font
 * styles. It stores extrinsic state such as font size, color, and position, while
 * reusing font flyweights for common font families and styles.
 */
class Document {
  private text: string;
  private fontSize: number;
  private fontColor: string;
  private fontFlyweight: FontFlyweight;

  constructor(
    text: string,
    fontFamily: string,
    fontStyle: string,
    fontSize: number,
    fontColor: string,
    fontFactory: DocumentFontFactory
  ) {
    this.text = text;
    this.fontSize = fontSize;
    this.fontColor = fontColor;
    this.fontFlyweight = fontFactory.getFontFlyweight(fontFamily, fontStyle);
  }

  /**
   * Render the document text with the appropriate font style.
   */
  public render(): void {
    console.log(`Rendering text: ${this.text}`);
    console.log(`Font Family: ${this.fontFlyweight.getFontFamily()}`);
    console.log(`Font Style: ${this.fontFlyweight.getFontStyle()}`);
    console.log(`Font Size: ${this.fontSize}`);
    console.log(`Font Color: ${this.fontColor}`);
  }
}

/**
 * Example usage of the Flyweight pattern with a document editor application.
 */
function runExample() {
  // Create a font factory to manage font flyweights.
  const fontFactory = new DocumentFontFactory();

  // Create documents with different text and font styles.
  const document1 = new Document(
    "Document 1: Introduction",
    "Arial",
    "Regular",
    12,
    "Black",
    fontFactory
  );
  const document2 = new Document(
    "Document 2: Conclusion",
    "Times New Roman",
    "Italic",
    14,
    "Blue",
    fontFactory
  );
  const document3 = new Document(
    "Document 3: Summary",
    "Arial",
    "Bold",
    10,
    "Red",
    fontFactory
  );

  // Render the documents.
  console.log("Rendering Documents:");
  document1.render();
  console.log("---");
  document2.render();
  console.log("---");
  document3.render();
}

// Run the example.
runExample();
