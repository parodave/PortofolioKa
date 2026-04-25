declare module "three" {
  export const DoubleSide: any;
  export const AdditiveBlending: any;
  export const SRGBColorSpace: any;

  export class Points {
    rotation: { y: number };
  }

  export class Mesh {
    scale: { setScalar: (value: number) => void };
    material: unknown;
  }

  export class Group {
    rotation: { y: number };
  }

  export class MeshBasicMaterial {
    opacity: number;
  }

  export class MeshPhongMaterial {
    constructor(parameters?: Record<string, unknown>);
  }
}
