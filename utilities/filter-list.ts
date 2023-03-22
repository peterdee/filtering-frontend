export interface Filter {
  controlType: 'input' | 'range';
  inputPlaceholder?: string;
  isFlip: boolean;
  isGrayscale: boolean;
  isRotateFixed: boolean;
  name: string;
  step: number;
  thresholdDefault: number;
  thresholdDescription?: string;
  thresholdMax: number;
  thresholdMin: number;
  value: string;
  withThreshold: boolean;
}

export default [
  {
    controlType: 'range',
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: false,
    name: 'Binary',
    step: 1,
    thresholdDefault: 125,
    thresholdDescription: 'Filter threshold:',
    thresholdMax: 255,
    thresholdMin: 0,
    value: 'binary',
    withThreshold: true
  },
  {
    controlType: 'input',
    inputPlaceholder: 'Blur radius',
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: false,
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
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: false,
    name: 'Brightness',
    step: 1,
    thresholdDefault: 0,
    thresholdDescription: 'Amount:',
    thresholdMax: 255,
    thresholdMin: -255,
    value: 'brightness',
    withThreshold: true
  },
  {
    controlType: 'range',
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: false,
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
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: false,
    name: 'Contrast',
    step: 1,
    thresholdDefault: 0,
    thresholdDescription: 'Amount:',
    thresholdMax: 255,
    thresholdMin: -255,
    value: 'contrast',
    withThreshold: true
  },
  {
    controlType: 'range',
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: false,
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
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: false,
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
    isFlip: true,
    isGrayscale: false,
    isRotateFixed: false,
    name: 'Flip',
    step: 0,
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'flip',
    withThreshold: false
  },
  {
    controlType: 'range',
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: false,
    name: 'Gamma correction',
    step: 0.01,
    thresholdDefault: 1,
    thresholdDescription: 'Amount:',
    thresholdMax: 3.99,
    thresholdMin: 0,
    value: 'gammaCorrection',
    withThreshold: true
  },
  {
    controlType: 'input',
    inputPlaceholder: 'Blur strength',
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: false,
    name: 'Gaussian blur',
    step: 0.1,
    thresholdDefault: 5,
    thresholdMax: 50,
    thresholdMin: 0,
    value: 'gaussianBlur',
    withThreshold: true
  },
  {
    controlType: 'range',
    isFlip: false,
    isGrayscale: true,
    isRotateFixed: false,
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
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: false,
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
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: false,
    name: 'Kuwahara filter',
    step: 1,
    thresholdDefault: 7,
    thresholdDescription: 'Filter radius:',
    thresholdMax: 15,
    thresholdMin: 2,
    value: 'kuwahara',
    withThreshold: true
  },
  {
    controlType: 'range',
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: false,
    name: 'Laplacian filter',
    step: 0,
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'laplacian',
    withThreshold: false
  },
  {
    controlType: 'range',
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: true,
    name: 'Rotate image',
    step: 0,
    thresholdDefault: 0,
    thresholdMax: 0,
    thresholdMin: 0,
    value: 'rotateFixed',
    withThreshold: false
  },
  {
    controlType: 'range',
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: false,
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
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: false,
    name: 'Sharpen filter',
    step: 1,
    thresholdDefault: 50,
    thresholdDescription: 'Filter amount:',
    thresholdMax: 100,
    thresholdMin: 0,
    value: 'sharpen',
    withThreshold: true
  },
  {
    controlType: 'range',
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: false,
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
    isFlip: false,
    isGrayscale: false,
    isRotateFixed: false,
    name: 'Solarize',
    step: 1,
    thresholdDefault: 145,
    thresholdDescription: 'Filter threshold:',
    thresholdMax: 255,
    thresholdMin: 0,
    value: 'solarize',
    withThreshold: true
  }
] as Filter[]
