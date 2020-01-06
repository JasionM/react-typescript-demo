import * as Three from 'three'
import Camera, { CameraType } from './libs/camera'
import Geometry, { GeometryType } from './libs/geometry'

export default class TsThree {
    constructor(node?: HTMLElement, width?: number, height?: number){
        this.init(width || 400, height || 300, node)
    }

    init(width: number, height: number, node?: HTMLElement) {
        let renderer = new Three.WebGLRenderer()
        
        renderer.setSize(width, height)
        
        node = node || document.getElementsByTagName('body')[0]
        node.appendChild(renderer.domElement)
        
        let scene = new Three.Scene()
        
        const scale = width / height
        const baseUnit = 2

        const camera = 
            <Three.Camera>new Camera(CameraType.Orthographic)
            .init(-baseUnit, baseUnit, baseUnit * scale, -baseUnit * scale, 1, 10)
        
        camera.position.set(4, -3, 5)
        camera.lookAt(new Three.Vector3(0, 0, 0))

        scene.add(camera)
        
        let cube = new Three.Mesh(
            new Geometry(GeometryType.Plane).init(2, 4),
            new Three.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true
            })
        )
        
        scene.add(cube)
        
        renderer.render(scene, camera)
    }
}

