import * as Three from 'three'
import Camera, { CameraType } from './libs/camera'
import Geometry, { GeometryType } from './libs/geometry'
import Material, { MaterialType } from './libs/material'
import Stats from 'stats.js'
import * as dat from 'dat.gui'
// var requestAnimationFrame = window.requestAnimationFrame 
//     || window.mozRequestAnimationFrame
//     || window.webkitRequestAnimationFrame
//     || window.msRequestAnimationFrame

export default class TsThree {
    stats: Stats = new Stats()
    numberOfObjects: number
    constructor(node?: HTMLElement, width?: number, height?: number){
        this.numberOfObjects = 0
        this.init(width || 400, height || 300, node)
        this.setStats()
    }
    init(width: number, height: number, node?: HTMLElement) {
        let render = new Three.WebGLRenderer()
        render.setClearColor(0xeeeeee, 1)
        render.setSize(width, height)
        render.shadowMapEnabled = true

        node = node || document.getElementsByTagName('body')[0]

        node.appendChild(render.domElement)
        
        let scene = new Three.Scene()
        let camera = new Camera(CameraType.Perspective).init(50, width / height, 0.1, 1000)
        
        let axes = new Three.AxesHelper(20)
        scene.add(axes)

        let planeGeometry = new Three.PlaneGeometry(60, 40, 1, 1)
        let planeMaterial = new Material(MaterialType.Lambert).init({color: 0xfffff})
        let plane = new Three.Mesh(planeGeometry, planeMaterial)
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(15, 0, -5)
        plane.receiveShadow = true  //接收阴影

        scene.add(plane)

        let boxGeometry = new Geometry(GeometryType.Box).init(4, 4, 4)
        let boxMaterial = new Material(MaterialType.Lambert).init({color: 0xff0000, wireframe: false})
        let box = new Three.Mesh(boxGeometry, boxMaterial)
        box.castShadow = true  //产生阴影

        box.position.set(-4, 3, 0)
        // scene.add(box)

        let sphereGeometry = new Geometry(GeometryType.Sphere).init(4, 20, 20)
        let sphereMaterial = new Material(MaterialType.Lambert).init({color: 0x7777ff, wireframe: false})
        let sphere = new Three.Mesh(sphereGeometry, sphereMaterial)
        sphere.castShadow = true //产生阴影

        sphere.position.set(20, 4, 2)
        // scene.add(sphere)
        
        let ambienLight = new Three.AmbientLight(0x0c0c0c)
        scene.add(ambienLight)

        let spotLight = new Three.SpotLight(0xffffff)
        spotLight.position.set(-40, 60, -10)
        spotLight.castShadow = true  //产生阴影
        scene.add(spotLight)

        scene.fog = new Three.FogExp2(0xffffff, 0.015)

        camera.position.set(-30, 40, 30)
        camera.lookAt(scene.position)
        
        class controls {
            constructor(){}
            rotationSpeed: number = 0.02
            bouncingSpeed: number = 0.02
            numberOfObjects: number = 0
            addBox() {
                let boxSize = Math.ceil((Math.random() * 3))
                let boxMesh = {
                    geometry: new Geometry(GeometryType.Box).init(boxSize, boxSize, boxSize),
                    material: new Material(MaterialType.Lambert).init({ color: Math.random() * 0xffffff })
                }
    
                let box = new Three.Mesh(boxMesh.geometry, boxMesh.material)
                box.castShadow = true
                box.name = 'box-' + scene.children.length
                box.position.x = -15 + Math.round(Math.random() * planeGeometry.parameters.width)
                box.position.y = Math.round(Math.random() * 5)
                box.position.z = -25 + Math.round(Math.random() * planeGeometry.parameters.height)

                box.rotation.x = Math.round(Math.random() * 2)
                box.rotation.y = Math.round(Math.random() * 2)
                box.rotation.z = Math.round(Math.random() * 2)

                scene.add(box)
                this.numberOfObjects = scene.children.length
            }
            removeBox(){
                let allChildren = scene.children
                let lastObject = allChildren[allChildren.length - 1]
    
                if (lastObject instanceof Three.Mesh) {
                    scene.remove(lastObject)
                    this.numberOfObjects = scene.children.length
                }
            }
        }

        let gui = new dat.GUI()
        let control = new controls()
        for (let i = 0; i < 10; i++) {
            control.addBox()
        }

        // scene.overrideMaterial = new Three.MeshLambertMaterial({color: 0xffffff})

        gui.add(control, 'rotationSpeed', 0, 0.5)
        gui.add(control, 'bouncingSpeed', 0, 0.5)
        gui.add(control, 'addBox')
        gui.add(control, 'removeBox')

        let step = 0

        let renderFunc = () => {
            this.stats.update()
            // box.rotation.x += controls.rotationSpeed
            // box.rotation.y += controls.rotationSpeed
            // box.rotation.z += controls.rotationSpeed

            // step += controls.bouncingSpeed
            // sphere.position.x = 20 + ( 10 * (Math.cos(step)))
            // sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)))
            scene.traverse((e) => {
                if (e instanceof Three.Mesh && e != plane) {
                    e.rotation.x += control.rotationSpeed
                    e.rotation.y += control.rotationSpeed
                    e.rotation.z += control.rotationSpeed
                }
            })

            requestAnimationFrame(renderFunc)
            render.render(scene, camera)
        }

        renderFunc()
    }
    init1(width: number, height: number, node?: HTMLElement) {
        let renderer = new Three.WebGLRenderer()
        
        renderer.setSize(width, height)
        
        renderer.shadowMapEnabled = true
        renderer.shadowMapType = Three.PCFSoftShadowMap
        
        node = node || document.getElementsByTagName('body')[0]
        node.appendChild(renderer.domElement)
        
        let scene = new Three.Scene()
        
        const scale = width / height
        const baseUnit = 5

        const x = baseUnit
        const y = baseUnit / scale

        const camera = 
            <Three.Camera>new Camera(CameraType.Perspective)
            .init(45, scale, 0.1, 10000)
        
        camera.position.set(-3, 2, 5)
        camera.lookAt(new Three.Vector3(0, 0, 0))

        scene.add(camera)
        
        let ballRadius = 0.5

        

        let mesh = new Three.Mesh(
            new Geometry(GeometryType.Plane).init(8, 8, 16, 16),
            new Material(MaterialType.Lambert).init({
                color: 0xcccccc
            })
        )
        mesh.rotation.x = -Math.PI / 2
        mesh.position.y = -1
        mesh.receiveShadow = true

        scene.add(mesh)

        let cube = new Three.Mesh(
            new Geometry(GeometryType.Box).init(1, 1, 1),
            new Material(MaterialType.Lambert).init({
                color: 0x00ff00
            })
        )

        cube.position.x = 2
        cube.castShadow = true

        scene.add(cube)
        
        let light = new Three.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25)
        light.target = cube
        light.castShadow = true
        light.shadow.camera.near = 2
        light.shadow.camera.far = 10
        light.shadow.camera.fov = 30
        light.shadowMapWidth = 1024
        light.shadowMapHeight = 1024

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



