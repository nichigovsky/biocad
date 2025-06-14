export const AMINO_ACID_COLORS: { [key: string]: string } = {
  C: '#FFEA00', // Цистеин
  A: '#67E4A6', // Гидрофобные
  I: '#67E4A6',
  L: '#67E4A6',
  M: '#67E4A6',
  F: '#67E4A6',
  W: '#67E4A6',
  Y: '#67E4A6',
  V: '#67E4A6',
  P: '#67E4A6',
  G: '#C4C4C4', // Глицин
  D: '#FC9CAC', // Отрицательно заряженные
  E: '#FC9CAC',
  K: '#BB99FF', // Положительно заряженные
  R: '#BB99FF',
  S: '#80BFFF', // Полярные незаряженные
  T: '#80BFFF',
  H: '#80BFFF',
  Q: '#80BFFF',
  N: '#80BFFF',
  '-': '#FFFFFF', // Gap - White
};

export const VALID_AMINO_ACIDS = Object.keys(AMINO_ACID_COLORS);

export interface SequenceFormData {
  sequence1: string;
  sequence2: string;
} 