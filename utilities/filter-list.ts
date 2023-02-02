export interface Filter {
  controlType: 'input' | 'range';
  inputPlaceholder?: string;
  isGrayscale: boolean;
  name: string;
  step: number;
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
    step: 1,
    thresholdDefault: 125,
    thresholdMax: 255,
    thresholdMin: 0,
    value: 'binary',
    withThreshold: true
  },
  {
    controlType: 'input',
    inputPlaceholder: 'Blur radius',
    isGrayscale: false,
    name: 'Box blur',
    step: 1,
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
    step: 1,
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
    step: 0,
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
    step: 1,
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
    step: 0,
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
    step: 0,
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
    step: 0,
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
    step: 0,
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
    step: 0.01,
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
    step: 0,
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'grayscale',
    withThreshold: false
  },
  {
    controlType: 'input',
    inputPlaceholder: 'Rotation angle',
    isGrayscale: false,
    name: 'Hue rotation',
    step: 1,
    thresholdDefault: 0,
    thresholdMax: Infinity,
    thresholdMin: -Infinity,
    value: 'hueRotate',
    withThreshold: true
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Kuwahara filter',
    step: 1,
    thresholdDefault: 7,
    thresholdMax: 15,
    thresholdMin: 2,
    value: 'kuwahara',
    withThreshold: true
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Laplasian filter',
    step: 0,
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
    step: 0,
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
    step: 0,
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
    step: 0,
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
    step: 0,
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'sepia',
    withThreshold: false
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Sharpen filter',
    step: 1,
    thresholdDefault: 50,
    thresholdMax: 100,
    thresholdMin: 0,
    value: 'sharpen',
    withThreshold: true
  },
  {
    controlType: 'range',
    isGrayscale: false,
    name: 'Sobel filter',
    step: 0,
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
    step: 1,
    thresholdDefault: 95,
    thresholdMax: 255,
    thresholdMin: 0,
    value: 'solarize',
    withThreshold: true
  }
] as Filter[]
