import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene,
  camera,
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane,
  renderer,
  container,
  rocket,
  HEIGHT,
  WIDTH,
  DIVIDEAMOUNT;
const createScene = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  DIVIDEAMOUNT = 1.3
  scene = new THREE.Scene();

  scene.fog = new THREE.Fog(0xffffff, 10, 1200);
  //scene.background = new THREE.Color(0xff0000)

  aspectRatio = WIDTH / (HEIGHT/DIVIDEAMOUNT);
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  camera.position.x = 0;
  camera.position.z = 300;
  camera.position.y = -5;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  
  renderer.setSize(WIDTH, (HEIGHT/DIVIDEAMOUNT));
  renderer.shadowMap.enabled = true;

  container = document.getElementById("rocket-view-container")
  container.appendChild(renderer.domElement)
  //document.body.appendChild( renderer.domElement );

  window.addEventListener("resize", handleWindowResize, false);

  let loader = new GLTFLoader();
  loader.load( "models/rocket.glb",
    (gltf) => {
      rocket = gltf.scene;
      rocket.position.x = -100;
      //rocket.position.y = 100;
      //rocket.position.x = 100;
      //rocket.position.z = 100;
      //rocket.rotation.x = 90;
      //rocket.rotation.z = 90;
      scene.add(rocket);
    }
  );
};

const handleWindowResize = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, (HEIGHT/DIVIDEAMOUNT));
  camera.aspect = WIDTH / (HEIGHT/DIVIDEAMOUNT);
  camera.updateProjectionMatrix();
};

const createLights = () => {
  const ambientLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
  directionalLight.position.set(-100, 100, 600);

  const pointLight = new THREE.PointLight(0xffffff, 2, 2000, 3);
  pointLight.position.set(200, -100, 50);

  scene.add(ambientLight, directionalLight, pointLight);
};

const targetRocketPosition = 10;
const animationDuration = 2000;

const loop = () => {
  const t = (Date.now() % animationDuration) / animationDuration;

  renderer.render(scene, camera);

  const delta = targetRocketPosition * Math.sin(Math.PI * 2 * t);
  if (rocket) {
    //rocket.rotation.y += 0.1;
    rocket.rotation.x += 0.007;
    //rocket.rotation.z += 0.1;
    //rocket.position.y = delta;
  }

  requestAnimationFrame(loop);
};

const main = () => {
  createScene();
  createLights();

  renderer.render(scene, camera);
  loop();
};

main();
