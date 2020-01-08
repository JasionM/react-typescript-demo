import * as Three from 'three'

/**
 * 材质类型
 */
export enum MaterialType {
    /**
     * 基本材质
     */
    MeshBasic,
    /**
     * Lambert材质
     */
    Lambert,
    /**
     * Phong材质
     */
    Phong
}

export default class Material extends Three.Material {
    materType: MaterialType
    
    constructor(type: MaterialType) {
      super();
      this.materType = type
    }
    init(opt: object) {
        switch (this.materType) {
            case MaterialType.MeshBasic:
                return new Three.MeshBasicMaterial(opt)
            case MaterialType.Lambert:
                return new Three.MeshLambertMaterial(opt)
            case MaterialType.Phong:
                return new Three.MeshPhongMaterial(opt)
            default:
                return new Three.MeshBasicMaterial(opt)            
        }
    }
}