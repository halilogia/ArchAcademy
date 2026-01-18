export class ArchitectureLayer {
  constructor({ id, title, color, description, codeExample, fileName, dependencyHint }) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.description = description;
    this.codeExample = codeExample;
    this.fileName = fileName;
    this.dependencyHint = dependencyHint;
  }
}
