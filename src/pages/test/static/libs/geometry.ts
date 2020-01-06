import * as Three from 'three'

export enum GeometryType{
    Box,
    Plane
}

export default class Geometry{
    type: GeometryType
    geometry: Three.Geometry = new Three.Geometry()
    constructor(type: GeometryType) {
        this.type = type
    }
    init(...params: number[]) : Three.Geometry {

        switch (this.type) {
            case GeometryType.Box:
                this.geometry = new Three.BoxGeometry(params[0], params[1], params[2], params[3], params[4])
                break
            case GeometryType.Plane:
                this.geometry = new Three.PlaneGeometry(params[0], params[1], params[2], params[3])
                break
            default: 
                this.geometry = new Three.BoxGeometry(params[0], params[1], params[2])
                break
        }
        return this.geometry
    }
}