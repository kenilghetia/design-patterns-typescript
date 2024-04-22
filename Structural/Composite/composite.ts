/**
 * The base Component class declares common operations for both simple and
 * complex objects of a hierarchical structure.
 */
abstract class FileSystemComponent {
  protected parent: FileSystemComponent | null = null;

  public setParent(parent: FileSystemComponent | null): void {
    this.parent = parent;
  }

  public getParent(): FileSystemComponent | null {
    return this.parent;
  }

  // The base Component may implement some default behavior or leave it to
  // concrete classes (by declaring the method containing the behavior as
  // "abstract").
  public abstract getName(): string;

  public abstract getSize(): number;

  public abstract ls(): void;
}

/**
 * The Leaf class represents the end objects of a composition. A leaf can't
 * have any children.
 */
class File extends FileSystemComponent {
  private name: string;
  private size: number;

  constructor(name: string, size: number) {
    super();
    this.name = name;
    this.size = size;
  }

  public getName(): string {
    return this.name;
  }

  public getSize(): number {
    return this.size;
  }

  public ls(): void {
    console.log(`File: ${this.name}, Size: ${this.size} bytes`);
  }
}

/**
 * The Composite class represents the complex components that may have
 * children. It stores child components and implements child-related
 * operations in the component interface.
 */
class Directory extends FileSystemComponent {
  private name: string;
  private children: FileSystemComponent[] = [];

  constructor(name: string) {
    super();
    this.name = name;
  }

  public add(component: FileSystemComponent): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: FileSystemComponent): void {
    const componentIndex = this.children.indexOf(component);
    if (componentIndex !== -1) {
      this.children.splice(componentIndex, 1);
      component.setParent(null);
    }
  }

  public getName(): string {
    return this.name;
  }

  public getSize(): number {
    let totalSize = 0;
    for (const child of this.children) {
      totalSize += child.getSize();
    }
    return totalSize;
  }

  public ls(): void {
    console.log(`Directory: ${this.name}, Size: ${this.getSize()} bytes`);
    for (const child of this.children) {
      child.ls();
    }
  }
}

// Client code
const root = new Directory("Root");
const documents = new Directory("Documents");
const pictures = new Directory("Pictures");
const file1 = new File("Document1.txt", 100);
const file2 = new File("Picture1.jpg", 200);
const file3 = new File("Picture2.jpg", 300);

documents.add(file1);
pictures.add(file2);
pictures.add(file3);

root.add(documents);
root.add(pictures);

root.ls();
