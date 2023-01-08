export interface Filter {
  controlType: 'input' | 'range';
  isGrayscale: boolean;
  name: string;
  thresholdDefault: number;
  thresholdMax: number;
  thresholdMin: number;
  value: string;
  withThreshold: boolean;
}

export default [
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Binary',
    thresholdDefault: 125,
    thresholdMax: 255,
    thresholdMin: 0,
    value: 'binary',
    withThreshold: true
  },
  {
    controlType: 'input',
    isGrayscale: false,
    name: 'Box blur',
    thresholdDefault: 3,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'boxBlur',
    withThreshold: true
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Brightness',
    thresholdDefault: 0,
    thresholdMax: 255,
    thresholdMin: -255,
    value: 'brightness',
    withThreshold: true
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Color inversion',
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'colorInversion',
    withThreshold: false
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Contrast',
    thresholdDefault: 0,
    thresholdMax: 255,
    thresholdMin: -255,
    value: 'contrast',
    withThreshold: true
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Eight colors',
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'eightColors',
    withThreshold: false
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Emboss filter',
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'emboss',
    withThreshold: false
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Flip (horizontal)',
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'flipHorizontal',
    withThreshold: false
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Flip (vertical)',
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'flipVertical',
    withThreshold: false
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Gamma correction',
    thresholdDefault: 1,
    thresholdMax: 3.99,
    thresholdMin: 0,
    value: 'gammaCorrection',
    withThreshold: true
  },
  {
    controlType: 'range',
    isGrayscale: true,
    name: 'Grayscale',
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'grayscale',
    withThreshold: false
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Laplasian filter',
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'laplasian',
    withThreshold: false
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Rotate image (90 degrees)',
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'rotate90',
    withThreshold: false
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Rotate image (180 degrees)',
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'rotate180',
    withThreshold: false
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Rotate image (270 degrees)',
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'rotate270',
    withThreshold: false
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Sepia',
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'sepia',
    withThreshold: false
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Sobel filter',
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'sobel',
    withThreshold: false
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Solarize',
    thresholdDefault: 95,
    thresholdMax: 255,
    thresholdMin: 0,
    value: 'solarize',
    withThreshold: true
  }
] as Filter[]
