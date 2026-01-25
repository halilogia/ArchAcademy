export interface LayerProps {
  id: string;
  title: string;
  color: string;
  description: string;
  codeExample: string;
  fileName: string;
  dependencyHint: string;
}

export class ArchitectureLayer {
  public id: string;
  public title: string;
  public color: string;
  public description: string;
  public codeExample: string;
  public fileName: string;
  public dependencyHint: string;

  constructor({ id, title, color, description, codeExample, fileName, dependencyHint }: LayerProps) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.description = description; 
    this.codeExample = codeExample;
    this.fileName = fileName;
    this.dependencyHint = dependencyHint;
  }
}
