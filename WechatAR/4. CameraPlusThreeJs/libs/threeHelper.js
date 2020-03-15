
import * as THREE from 'three.js'
require('FBXLoader.js')

export default class ThreeHelper {
  constructor(canvas) {
    this.mixers = []
    this.scene = new THREE.Scene()
    this.scene.add(new THREE.AmbientLight(0xffffff))
    this.camera = new THREE.PerspectiveCamera(
      45,
      canvas.width / canvas.height,
      0.1,
      1000
    )
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    this.camera.position.set(-30, 30, 25)
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      // antialias: true,
      alpha: true
    })
    this.renderer.setSize(canvas.width, canvas.height)
    this.clock = new THREE.Clock()
    this.mixers = []
    // this.control = new THREE.OrbitControls(
    //   this.camera,
    //   this.renderer.domElement
    // )
    // this.control.update()
    this.render(canvas)
  }
  render(canvas) {
    this.renderer.render(this.scene, this.camera)
    for (const mixer of this.mixers) {
      mixer.update(this.clock.getDelta())
    }
    canvas.requestAnimationFrame(() => {
      this.render(canvas)
    })
  }
  loadObject(setting) {
    const loader = new THREE.FBXLoader()
    loader.load(setting.model, object => {
      object.scale.setScalar(setting.scale)
      object.position.set(
        setting.position[0],
        setting.position[1],
        setting.position[1]
      )
      this.scene.add(object)
      if (object.animations.length > 0) {
        object.mixer = new THREE.AnimationMixer(object)
        this.mixers.push(object.mixer)
        object.mixer.clipAction(object.animations[0]).play()
      }
    })
  }
}