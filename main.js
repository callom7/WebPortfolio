// Disable strict mode for this file
/* eslint-disable strict */
import { AmbientLight } from 'three';
import './style.css'
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347});
const torus = new THREE.Mesh( 
  geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);
const light = new THREE.PointLight(0xffffff, 200)
light.position.set(0, 2, 5)
scene.add(light)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh( geometry, material);
  const [x, y, z] = Array(3) .fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star)
}
Array(200).fill().forEach(addStar);
const spaceTexture = new THREE.TextureLoader().load('Space.jpg');
scene.background = spaceTexture;

  
// ... (previous code)

const spriteTexture = new THREE.TextureLoader().load('kanyeConverted.png');
const animator2 = new PlainAnimator(spriteTexture, 5, 17, 83, 15);
const texture = animator2.init();
animator2.animate();

const kanye = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: texture })
);
scene.add(kanye);

// ... (rest of your code)



const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const specularTexture = new THREE.TextureLoader().load('SpecularMap.jpg');
material.normalMap = normalTexture
material.normalScale.set(2, 2)

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: specularTexture,
    specularTexture: specularTexture,
    //displacementMap : normalTexture,
    
  })
);

scene.add(moon);
const light2 = new THREE.PointLight(0xffffff, 200)
light2.position.set(-10, 0, 31)
scene.add(light2)
scene.add(new THREE.AxesHelper(5))

moon.position.z = 0;
moon.position.setX(0);
moon.position.setY(-5);

kanye.position.z = -5;
kanye.position.x = 2;
const kanyeGif = new THREE.TextureLoader().load('kanyeConverted.png');


function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();
  renderer.render( scene, camera);
  animator2.animate();
}
function createAnimatedMesh() {
  
  const texturePath = 'https://imgur.com/WEo220x';
  animator2 = new PlainAnimator(
    new THREE.TextureLoader().load(texturePath),
    5,   
    17,
    83,
    15
  );
  const geometry = new THREE.PlaneGeometry(970, 4556);
  const texture = animator2.init();
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 10);
  return mesh;
}
// const scene = initScene();
// const mesh = createAnimatedMesh();
// scene.add(mesh); 
animate();
// function animate2(){
//   requestAnimationFrame(animate);
//   moon.rotation.x += 0.01;
//   moon.rotation.y += 0.005;
//   moon.rotation.z += 0.01;
//   controls.update();
//   renderer.render( scene, camera);
// }


//