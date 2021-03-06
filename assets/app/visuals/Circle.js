
import TWEEN from 'tween.js';

class CircleThing {

  constructor() {
    this._radius = 2;
    this._peaks = 4;
    this.group = new THREE.Object3D();
    this.rotationSpeed = 0.006;
  }

  set radius(value) {
    this._radius = value;
  }

  get radius() {
    return this._radius;
  }
  
  grow() {
    new TWEEN.Tween(this).to({ radius:4, _peaks:6, rotationSpeed:0.01 }, 120).easing(TWEEN.Easing.Quadratic.In).start();
  }

  shrink() {
    new TWEEN.Tween(this).to({ radius:2, _peaks:4, rotationSpeed:0.006 }, 100).start();
  }

  start(element) {
    const SCENE_W = 500;
    const SCENE_H = 500;
    const DEGREES = 720;
    const PEAK_HEIGHT = 0.2;
    const RANGE = 1;
    const SMOOTH = 0.16;
    const DRANGE = RANGE * DEGREES;
    const SRANGE = DRANGE * SMOOTH;

    let scene = new THREE.Scene(); 
    let camera = new THREE.PerspectiveCamera(65, SCENE_W / SCENE_H, 0.1, 1000 );
    let renderer = new THREE.WebGLRenderer({ antialias: true } ); 
    let counter = 0;
    let colors = [0xFFFFFF, "rgb(222, 77, 77)", "rgb(120, 255, 255)"];

    let waves = colors.map((color, i) => {
      let obj = new THREE.Line( new THREE.Geometry(), new THREE.LineBasicMaterial({ color }));
      obj.geometry.dynamic = true;
      obj.geometry.vertices = generate_points(i);
      obj.geometry.verticesNeedUpdate = true;
      this.group.add(obj);
      return obj;
    });

    element.replaceWith( renderer.domElement );

    camera.position.z = 10; 
    renderer.setClearColor(new THREE.Color("rgb(22,22,22)"));
    renderer.setSize(SCENE_W, SCENE_H); 
    scene.add(this.group);

    function generate_points(modifier, radius, peaks){
      let points = [];
      if (counter === DEGREES) {
        counter = 0;
      }
      for (let i = 0; i <= DEGREES; i++) {
        let smoothing = 1;
        if (i < SRANGE) {
          smoothing = i / (SRANGE);
        } else if(i > DRANGE * (1 - SMOOTH) && i <= DRANGE) {
          smoothing = (DRANGE - i) / (SRANGE);
        }
        const angle = (Math.PI / 180 * i) + (modifier * 120);
        const speed = counter / 9
        const dv = angle + speed;
        const rad = dv * peaks;
        const dw = PEAK_HEIGHT * smoothing;
        const waveFunc = modifier === 2 ? Math.sin : Math.cos;
        const dr = (dw * waveFunc(rad)) * (modifier === 2 ? -1 : 1);
        const new_rad = radius + dr;
        points.push(new THREE.Vector3(new_rad * Math.cos(dv), new_rad * Math.sin(dv), 0));
      }
      return points;
    }

    function update() {
      counter++;
      waves.forEach((wave, i) => {
        wave.geometry.vertices = generate_points(i, this._radius, this._peaks);
        wave.geometry.verticesNeedUpdate = true;
      });
      this.group.rotation.z -= this.rotationSpeed;
      requestAnimationFrame(update.bind(this));
      TWEEN.update();
      renderer.render(scene, camera);
    }

    update.bind(this)();
  }
}

export default CircleThing;
