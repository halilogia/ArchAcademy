export type CmsCollectionName =
  | 'search-index'
  | 'acronyms'
  | 'glossary'
  | 'comparison-matrix'
  | 'architecture'
  | 'project-graph';

export interface CmsEnvelope<T> {
  collection: CmsCollectionName;
  version: string;
  updatedAt: string;
  items: T[];
}

export interface SearchEntry {
  id: string;
  title: string;
  description: string;
  path: string;
  category: string;
  keywords: string[];
  content: string;
}

export interface GraphNode {
  id: string;
  label: string;
  category: string;
  size: number;
}

export interface GraphLink {
  source: string;
  target: string;
  value: number;
}

export interface ProjectGraph {
  nodes: GraphNode[];
  links: GraphLink[];
}
