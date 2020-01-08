import * as Three from 'three'
import Camera, { CameraType } from './libs/camera'
import Geometry, { GeometryType } from './libs/geometry'
import Material, { MaterialType } from './libs/material'
import Stats from 'stats.js'

// var requestAnimationFrame = window.requestAnimationFrame 
//     || window.mozRequestAnimationFrame
//     || window.webkitRequestAnimationFrame
//     || window.msRequestAnimationFrame

export default class TsThree {
    stats: Stats = new Stats()
    constructor(node?: HTMLElement, width?: number, height?: number){
        this.init(width || 400, height || 300, node)
        this.setStats()
    }

    init(width: number, height: number, node?: HTMLElement) {
        let renderer = new Three.WebGLRenderer()
        
        renderer.setSize(width, height)
        
        node = node || document.getElementsByTagName('body')[0]
        node.appendChild(renderer.domElement)
        
        let scene = new Three.Scene()
        
        const scale = width / height
        const baseUnit = 5

        const x = baseUnit
        const y = baseUnit / scale

        const camera = 
            <Three.Camera>new Camera(CameraType.Orthographic)
            .init(-x, x, y, -y, 0.1, 10000)
        
        camera.position.set(5, 10, 20)
        camera.lookAt(new Three.Vector3(0, 3, 0))

        scene.add(camera)
        
        let ballRadius = 0.5

        

        let mesh = new Three.Mesh(
            new Geometry(GeometryType.Box).init(2, 2, 2),
            new Material(MaterialType.MeshBasic).init({
                color: 0x00ff00
            })
        )
        mesh.position.x = 0
        mesh.position.y = 2
        scene.add(mesh)

        let light = new Three.SpotLight(0xffffff, 1, 100, Math.PI / 6, 25)
        light.target = mesh
        scene.add(light)
        
        renderer.render(scene, camera)
        
        // let v = 0, //速度
        //     a = -0.1, //加速度
        //     isMoving = false, //控制移动
        //     maxHeight = 6 //最大高度 
        
        // let drop = () => {
        //     isMoving = true
        //     mesh.position.y = maxHeight
        //     v = 0
        // }

        // drop()
        
        // let animation = () => {
        //     this.stats.begin()
            
        //     if (isMoving) {
        //         mesh.position.y += v;
        //         v += a

        //         if (mesh.position.y <= ballRadius) {
        //             v = -v * 0.9
        //         }

        //         if (Math.abs(v) < 0.001) {
        //             isMoving = false
        //             mesh.position.y = ballRadius
        //         }
        //     }
            
        //     renderer.render(scene, camera)

        //     requestAnimationFrame(animation)
            
        //     this.stats.end()
        // }
        // animation()
    }
    setStats() {
        document.body.appendChild(this.stats.dom)
    }
}

