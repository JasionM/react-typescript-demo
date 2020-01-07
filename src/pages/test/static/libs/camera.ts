import * as Three from 'three'

export enum CameraType {
    /**
     * 正交投影
     */
    Orthographic,
    /**
     * 透视投影
     */
    Perspective
}

export default class Camera extends Three.Camera {
    cameraType: CameraType
    camera: Three.Camera = new Three.Camera()
    constructor(type: CameraType){
        super()
        this.cameraType = type
    }
    init(...params: number[]): Three.Camera {
        switch(this.cameraType) {
            case CameraType.Orthographic:
                this.camera = new Three.OrthographicCamera(params[0], params[1], params[2], params[3], params[4], params[5])
                break
            case CameraType.Perspective: 
                this.camera = new Three.PerspectiveCamera(params[0], params[1], params[2], params[3])
                break
            default:
                this.camera = new Three.OrthographicCamera(params[0], params[1], params[2], params[3], params[4], params[5])
                break
        }
        return this.camera
    }
    setPosition(x: number, y: number, z: number) {
        this.camera.position.set(x, y, z)
        this.camera.lookAt(new Three.Vector3(0, 0, 0))
    }
}

