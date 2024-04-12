// import "./style.css";
// Update the import path to reflect the new location

import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
  
);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(0, 0, -30);
renderer.render(scene, camera);
// object
// Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
//adding to the scene below

scene.add(torus);
torus.position.setX(-25);
torus.position.setY(6);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper( 200, 50 )
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement); // Listen to dom events on the mouse and update the camera pos accordingly
const controls = new OrbitControls(camera, renderer.domElement);


// Update the camera position based on the keyboard controls.
controls.update();
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
// Arra of 250 values and then for each value calls the addStar function
Array(250).fill().forEach(addStar);

// changes bg
const spaceTexture = new THREE.TextureLoader().load('space.png')
//scene.background = spaceTexture;
const hdrTexturePath = './assets/Warehouse.hdr';
const loader2 = new RGBELoader();
loader2.load(hdrTexturePath, function(texture2){
  scene.background = texture2;
})
// avatar

//MOOON
const moonTexture = new THREE.TextureLoader().load('normal.jpg')
const imageTexture = new THREE.TextureLoader().load('normal.jpg')
    const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: imageTexture })
 );
moon.userData.objectType = 'moon';
//scene.add(moon);
const CV = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  //new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: imageTexture })
);
const material6 = new THREE.MeshBasicMaterial({
  color: 0xEAEAEA
  , // set your desired color
  opacity: 0.1,    // set the opacity value (0 is fully transparent, 1 is fully opaque)
  transparent: true // enable transparency
});
// Apply the material to moon2
CV.material = material6;

// Optionally, set the side property to DoubleSide if needed
CV.material.side = THREE.DoubleSide;
CV.userData.objectType = 'model4';
//scene.add(moon);
scene.add(CV);
CV.position.set(28, -4, -20);
CV.scale.set(2.5, 2.5, 2.5);

scene.add(new THREE.AxesHelper(5))
// Repostionisng moon to further down of z axis as that is the direction of scroll
moon.position.z = 0;
moon.position.setX(10);
moon.position.setY(3);




// scroll Animation
const loader = new FBXLoader();


let video = document.getElementById("Robot");
let videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
var movieMaterial = new THREE.MeshBasicMaterial({
  map:videoTexture, 
  side: THREE.FrontSide,
  toneMapped: false,
});
let movieGeometry = new THREE.BoxBufferGeometry(25, 25, 25);
let movieCubeScreen = new THREE.Mesh(movieGeometry, movieMaterial);
movieCubeScreen.position.set(0, 2, -25);
scene.add(movieCubeScreen);
//scene.add(movieCubeScreen.position);
video.play();
movieCubeScreen.userData.objectType = 'AiStockCounter';

// let video2 = document.getElementById("Kanye");
// let videoTexture2 = new THREE.VideoTexture(video2);
// videoTexture2.minFilter = THREE.LinearFilter;
// videoTexture2.magFilter = THREE.LinearFilter;
// var movieMaterial2 = new THREE.MeshBasicMaterial({
//   map:videoTexture2, 
//   side: THREE.FrontSide,
//   toneMapped: false,
// });
// let movieGeometry2 = new THREE.BoxBufferGeometry(25, 15, 15);
// //let movieGeometry2 = new THREE.PlaneGeometry(100, 150);
// let movieCubeScreen2 = new THREE.Mesh(movieGeometry2, movieMaterial2);
//movieCubeScreen2.position.set(-25, 2, 0);
//scene.add(movieCubeScreen2);
//scene.add(movieCubeScreen2.position);
//video2.play();

// const RobotPath = './assets/MakeRobotAnimationFromHere.glb';
// const gltfLoader = new GLTFLoader();
// let mixer2; // Declare a variable to store the animation mixer
// gltfLoader.load('./assets/MakeRobotAnimationFromHere.glb');
// gltfLoader.load(RobotPath, function(gltf2) {
//   const model2 = gltf2.scene;
//   scene.add(model2);
  
//   mixer2 = new THREE.AnimationMixer(model2);
//   const clips2 = gltf2.animations;
//   const clip2 = THREE.AnimationClip.findByName(clips2, 'MoveBoxAction');
//   const action2 = mixer2.clipAction(clip2);
//   action2.play();
  
//   // Iterate over the meshes in the model and apply the texture to each one
//   model2.traverse((child) => {
//     if (child instanceof THREE.Mesh) {
//       const textureLoader = new THREE.TextureLoader();
//       const texture2 = textureLoader.load('./assets/ParchmentPaperDiffuse.png', function(texture) {
//         child.material.map = texture; // Assign the texture to the mesh's material
//         child.material.needsUpdate = true; // Update the material
//         model2.position.setY(-3.35);
//         //model2.castShadow = true;
//       });
      
//     }
//   });
// }, undefined, function(error) {
//   console.error(error);
// });


const assetLoader = new GLTFLoader();
let mixer; // Declare a variable to store the animation mixer
const TrexIdlePath = './assets/Trexidle.glb';
assetLoader.load(TrexIdlePath, function(gltf) {
  const model = gltf.scene;
  scene.add(model);
  
  mixer = new THREE.AnimationMixer(model);
  const clips = gltf.animations;
  const clip = THREE.AnimationClip.findByName(clips, 'TrexIdle');
  const action = mixer.clipAction(clip);
  action.play();
  
  // Iterate over the meshes in the model and apply the texture to each one
  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const textureLoader = new THREE.TextureLoader();
      const texture2 = textureLoader.load('./assets/ParchmentPaperDiffuse.png', function(texture) {
        child.material.map = texture; // Assign the texture to the mesh's material
        child.material.needsUpdate = true; // Update the material
        model.position.setY(-3.35);
        model.castShadow = true;
      });
      
    }
  });
}, undefined, function(error) {
  console.error(error);
});
let mixer3;
const MYCVPath = './assets/MYCV.glb';
assetLoader.load(MYCVPath, function(gltf) {
  const model3 = gltf.scene; // Use a different variable for the second model
  scene.add(model3);
  model3.rotation.y -= 90;
  model3.scale.set(2.5, 2.5, 2.5);
  mixer3 = new THREE.AnimationMixer(model3);
  const clips = gltf.animations;
  const clip10 = THREE.AnimationClip.findByName(clips, 'MBoneAction');
  const action10 = mixer3.clipAction(clip10);
  action10.play();
  const clip11 = THREE.AnimationClip.findByName(clips, 'VboneAction');
  const action11 = mixer3.clipAction(clip11);
  action11.play();
  const clip3 = THREE.AnimationClip.findByName(clips, 'CboneAction');
  const action12 = mixer3.clipAction(clip3);
  action12.play();
  const clip4 = THREE.AnimationClip.findByName(clips, 'YboneAction');
  const action13 = mixer3.clipAction(clip4);
  action13.play();

  // Iterate over the meshes in the model and apply the texture to each one
  model3.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const textureLoader3 = new THREE.TextureLoader();
      
      const texture3 = textureLoader3.load('./assets/InkDiffuse.png', function(texture3) {
        child.material.map = texture3;
        child.material.needsUpdate = true;
        model3.position.setY(2);
        model3.position.setZ(-25);
        model3.position.setX(25);
        //model2.rotation.setZ(90);
        model3.castShadow = true;
      });
      const normalMap3 = textureLoader3.load('./assets/InkNormal.png', function(normalMap3) {
        child.material.normalMap = normalMap3;
        child.material.normalScale.set(1, 1); // Adjust the scale of the normal map
        child.material.needsUpdate = true;
      });
    }
    
  });
}, undefined, function(error) {
  console.error(error);
});

let mixer4;
let model4;
const MYCVPaperPath = './assets/CVPaper.glb';
assetLoader.load(MYCVPaperPath, function(gltf) {
  const model4 = gltf.scene; // Use a different variable for the second model
  model4.userData.objectType = 'model4';
  
  scene.add(model4);
  model4.userData.objectType = 'model4';

  model4.rotation.x += 95;
  //model4.rotation.y -= -40;
  model4.scale.set(2.5, 2.5, 2.5);
  mixer4 = new THREE.AnimationMixer(model4);
  const clips = gltf.animations;
  const clip6 = THREE.AnimationClip.findByName(clips, 'CVPaper');
  const action = mixer4.clipAction(clip6);
  action.play();
  // Iterate over the meshes in the model and apply the texture to each one
  
  model4.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const textureLoader3 = new THREE.TextureLoader();
      
      const texture3 = textureLoader3.load('./assets/CVPaperDiffuse.png', function(texture3) {
        child.material.map = texture3;
        child.material.needsUpdate = true;
        //model4.position.setY(2);
        //model4.position.setZ(20);
        model4.position.set(50, -8, -15);
        //model2.rotation.setZ(90);
        model4.castShadow = true;
      });
      const normalMap3 = textureLoader3.load('./assets/CVPaperNormal.png', function(normalMap3) {
        child.material.normalMap = normalMap3;
        child.material.normalScale.set(1, 1); // Adjust the scale of the normal map
        child.material.needsUpdate = true;
        model4.userData.objectType = 'model4';
      });
    }
    
  });
}, undefined, function(error) {
  console.error(error);
});
const floorTexture = new THREE.TextureLoader().load('./assets/MetallerDiffuse.png')
const normalTexture = new THREE.TextureLoader().load('./assets/MetallerNormal.png')
function createFloor(){
  let pos = { x: 0, y: -8, z: 3};
  let scale = { x: 100, y: 2, z: 100};
  let blockPlane = new THREE.Mesh(new THREE.BoxBufferGeometry(),
  new THREE.MeshPhongMaterial({ map: floorTexture, normalMap: normalTexture}));
        //new THREE.MeshPhongMaterial({ color: 0xf9c834}));
        blockPlane.position.set(pos.x, pos.y, pos.z);
        blockPlane.scale.set(scale.x, scale.y, scale.z);
        blockPlane.receiveShadow = true;
        scene.add(blockPlane);
}
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const moveMouse = new THREE.Vector2();
var draggable;
document.addEventListener('click', onDocumentClick, false);
document.addEventListener('touchstart', onDocumentTouchStart, false);
function onDocumentTouchStart(event) {
  // Prevent the default touch event behavior to avoid double taps
  event.preventDefault();

  // Get the first touch position
  const touch = event.touches[0];

  // Calculate the touch position relative to the window
  pointer.x = (touch.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(touch.clientY / window.innerHeight) * 2 + 1;

  // Perform a raycast from the camera using the touch position
  raycaster.setFromCamera(pointer, camera);

  // Check for intersections (same as in your click event handling)
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object;

    // Handle object clicks based on their custom properties
    if (intersectedObject.userData.objectType === 'moon') {
      console.log('Moon was clicked!');
      handleObjectClick(intersectedObject);
    }
  else if (intersectedObject.userData.objectType === 'model4') {
    console.log('CV was clicked!');
    handleProjectClick(intersectedObject);
  } 
    else if (intersectedObject.userData.objectType === 'AiStockCounter') {
      console.log('AiStockCounter was clicked!');
      handleProjectClick(intersectedObject);
    } else {
      // Handle other objects or cases
    }
  }
}
function onDocumentClick(event) {
  // Calculate the mouse position relative to the window
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Perform a raycast from the camera using the mouse position
  raycaster.setFromCamera(pointer, camera);

  // Check for intersections
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    // Get the first intersected object
    const intersectedObject = intersects[0].object;

    // Check the custom property of the intersected object
    if (intersectedObject.userData.objectType === 'moon') {
      // Handle the click event for the moon object
      console.log('Moon was clicked!');
      handleObjectClick(intersectedObject);
    }
    else if (intersectedObject.userData.objectType === 'model4') {
      // Handle the click event for the model4 object
      console.log('Model4 was clicked!');
      handleObjectClick(intersectedObject);
    }
    else {
      // Handle other objects or cases
    }
    if (intersectedObject.userData.objectType === 'AiStockCounter') {
      // Handle the click event for the moon object
      console.log('AiStockCounter was clicked!');
      handleProjectClick(intersectedObject);
    } else {
      // Handle other objects or cases
    }    
  }
}

function handleObjectClick(object) {
  // Check if the current page is nocv.html
  if (window.location.href.endsWith('index.html' || 'WebPortfolio/' || 'aistock.html')) {
    // If on nocv.html, go back to index.html
    window.location.href = 'nocv.html';
  } else {
    // If not on nocv.html, navigate to nocv.html
    window.location.href = 'index.html';
  }
}
function handleProjectClick(object) {
  if (window.location.href.endsWith('index.html' || 'WebPortfolio/')) {
    window.location.href = 'aistock.html';
  } else {
    window.location.href = 'aistock.html';
  }
}


function moveCamera() {
  // top prop here shows how far we are from the top of the webpage
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
window.addEventListener('click', event => {

});
// fire the func when scrolled
document.body.onscroll = moveCamera;
moveCamera(); // thr func is assigned as the event handler for the document body on scroll event
let cameraMovementSpeed = 0.1;

// Request the next animation frame.

// The animate function is called on every animation frame.
function movecam2() {
//   // Get the current keyboard state.
const keyboardState = window.onkeydown;


// Update the camera's position based on the keyboard state.
// window.addEventListener('keydown', (event) => {
//   // Check which key was pressed.
//   switch (event.key) {
//     case 'w':
//       // Move the camera forward.
//       camera.position.z -= 0.0001;
//       break;
//     case 'a':
//       // Move the camera left.
//       camera.position.x -= 0.0001;
//       break;
//     case 's':
//       // Move the camera backward.
//       camera.position.z += 0.0001;
//       break;
//     case 'd':
//       // Move the camera right.
//       camera.position.x += 0.0001;
//       break;
//   }
// });
// window.addEventListener('keyup', (event) => {
//   // Clear the camera's movement.
//   // camera.position.z = 0;
//   // camera.position.x = 0;
// });
//   // Request the next animation frame.
requestAnimationFrame(movecam2);
}
// Animation

// renderer.render( scene, camera );
// Alternate below
const clock = new THREE.Clock();
const clock2 = new THREE.Clock();
const clock3 = new THREE.Clock();
const clock4 = new THREE.Clock();
function animate() {

  requestAnimationFrame(animate);
  // if (videoTexture2) {
  //   videoTexture2.needsUpdate = true;
  //   } 
  if (videoTexture) {
  videoTexture.needsUpdate = true;
  }
 

  if (mixer) {
    mixer.update(clock.getDelta());
    //mixer2.update(clock2.getDelta());
    mixer3.update(clock3.getDelta());
    mixer4.update(clock4.getDelta() * 0.15);
    }   
  torus.rotation.x += 0.01; // rotation along x axis
  torus.rotation.y += 0.005; // roatation along y axis
  torus.rotation.z += 0.01; // rotation on z axis

  moon.rotation.x += 0.005;
  
  controls.update();

  renderer.render(scene, camera);
  movecam2();

}
function createAnimatedMesh() {
const texturePath = 'https://imgur.com/WEo220x';

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

createFloor()
animate();