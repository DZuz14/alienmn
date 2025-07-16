export interface Lyric {
  text: string;
  annotation: string | null;
}

export interface Annotation {
  text: string;
  position: {
    top: number;
    left: number;
    transform: string;
  };
  sourceElement?: HTMLElement;
}
