import * as Three from 'three'

export enum GeometryType{
    /**
     * 四边形几何体
     */
    Box,
    /**
     * 平面几何
     */
    Plane,
    /**
     * 球体
     */
    Sphere,
    /**
     * 圆形
     */
    Circle,
    /**
     * 圆柱体
     */
    Cylinder,
    /**
     * 三维文字
     */
    Text,
}

export default class Geometry{
    type: GeometryType | null
    geometry: Three.Geometry = new Three.Geometry()
    constructor(type: GeometryType | null) {
        this.type = type
    }
    init(...params: (number | boolean | string | object | undefined)[]) : Three.Geometry {

        switch (this.type) {
            case GeometryType.Box:
                this.geometry = 
                    new Three.BoxGeometry(
                        <number>params[0], 
                        <number>params[1], 
                        <number>params[2], 
                        <number>params[3], 
                        <number>params[4])
                break
            case GeometryType.Plane:
                this.geometry = 
                    new Three.PlaneGeometry(
                        <number>params[0], 
                        <number>params[1], 
                        <number>params[2], 
                        <number>params[3])
                break
            case GeometryType.Sphere:
                this.geometry = 
                    new Three.SphereGeometry(
                        <number>params[0], 
                        <number>params[1], 
                        <number>params[2], 
                        <number>params[3], 
                        <number>params[4], 
                        <number>params[5], 
                        <number>params[6])
                break
            case GeometryType.Circle:
                this.geometry = 
                    new Three.CircleGeometry(
                        <number>params[0], 
                        <number>params[1], 
                        <number>params[2], 
                        <number>params[3])
                break
            case GeometryType.Cylinder:
                /**
                 * @param radiusTop - 顶部变径
                 * @param radiusBottom - 底部半径
                 * @param height - 圆柱高
                 * @param radiusSegments - 圆面分段
                 * @param heightSegments - 高分段
                 * @param openEnded - 是否有顶面和底面
                 */
                this.geometry = 
                    new Three.CylinderGeometry(
                        <number>params[0], 
                        <number>params[1], 
                        <number>params[2], 
                        <number>params[3], 
                        <number>params[4], 
                        <boolean>params[5])
                break
            case GeometryType.Text:
                /**
                 * @param text - 顶部变径
                 * @param parameters {
                 *  size:number - 字号
                 *  height:number - 文字厚度
                 *  curveSegments:number - 弧线
                 *  font: string - 字体
                 *  weight: string - 加粗 normal or bold
                 *  style: string - 斜体  normal or italics
                 *  bevelEnabled: boolean - 是否使用倒角，意为在边缘处斜切
                 *  bevelThickness: number - 倒角厚度
                 *  bevelSize: number - 倒角宽度
                 * } - 底部半径
                 */
                console.log(params[1])
                this.geometry = 
                    new Three.TextGeometry(
                        <string>params[0], 
                        <object>params[1])
                break
            default: 
                this.geometry = this.customize()
                break
        }
        return this.geometry
    }
    /**
     * 自定义图形
     */
    customize() {
        let geometry = new Three.Geometry()

        //设置定点位置

        //顶部四个点
        geometry.vertices.push(new Three.Vector3(-1, 2, -1))
        geometry.vertices.push(new Three.Vector3(1, 2, -1))
        geometry.vertices.push(new Three.Vector3(1, 2, 1))
        geometry.vertices.push(new Three.Vector3(-1, 2, 1))

        //底部四个点
        geometry.vertices.push(new Three.Vector3(-2, 0, -2))
        geometry.vertices.push(new Three.Vector3(2, 0, -2))
        geometry.vertices.push(new Three.Vector3(2, 0, 2))
        geometry.vertices.push(new Three.Vector3(-2, 0, 2))

        //设置顶点链接情况

        //顶面
        geometry.faces.push(new Three.Face3(0, 1, 2))
        geometry.faces.push(new Three.Face3(0, 1, 3))

        //底面
        geometry.faces.push(new Three.Face3(4, 5, 6))
        geometry.faces.push(new Three.Face3(4, 5, 7))

        // 四个侧面
        geometry.faces.push(new Three.Face3(1, 5, 6));
        geometry.faces.push(new Three.Face3(6, 2, 1));
        geometry.faces.push(new Three.Face3(2, 6, 7));
        geometry.faces.push(new Three.Face3(7, 3, 2));
        geometry.faces.push(new Three.Face3(3, 7, 0));
        geometry.faces.push(new Three.Face3(7, 4, 0));
        geometry.faces.push(new Three.Face3(0, 4, 5));
        geometry.faces.push(new Three.Face3(0, 5, 1));

        return geometry
    }
}