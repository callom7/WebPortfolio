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
// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 25, -100);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 1.5;
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper( 200, 50 )
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement); // Listen to dom events on the mouse and update the camera pos accordingly
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true; // Enable pinch to zoom
controls.enableRotate = true; // Enable rotation
controls.enablePan = true; // Enable panning
let touchStartX = 0;
let touchStartY = 0;

renderer.domElement.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

renderer.domElement.addEventListener('touchmove', (event) => {
  const touchEndX = event.touches[0].clientX;
  const touchEndY = event.touches[0].clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  touchStartX = touchEndX;
  touchStartY = touchEndY;

  controls.rotateLeft((deltaX / window.innerWidth) * 2 * Math.PI);
  controls.rotateUp((deltaY / window.innerHeight) * 2 * Math.PI);
});

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
// Array of 250 values and then for each value calls the addStar function
Array(250).fill().forEach(addStar);

// changes bg
const spaceTexture = new THREE.TextureLoader().load('Store.png')
scene.background = spaceTexture;
// const hdrTexturePath = './assets/Warehouse.hdr';
// const loader2 = new RGBELoader();
// loader2.load(hdrTexturePath, function(texture2){
//   texture2.mapping = THREE.EquirectangularReflectionMapping;
//   scene.background = texture2;
// })
// avatar

const moonTexture = new THREE.TextureLoader().load('./assets/MetallerDiffuse.png')
const imageTexture = new THREE.TextureLoader().load('./assets/InkNormal.png')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: imageTexture })
);
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

moon.userData.objectType = 'moon';
CV.userData.objectType = 'model4';
//scene.add(moon);
scene.add(CV);
scene.add(new THREE.AxesHelper(5))
// Repostionisng moon to further down of z axis as that is the direction of scroll
moon.position.z = 0;
// moon.position.setX(10);
// moon.position.setY(3);
moon.position.set(25, 0, -25);
moon.scale.set(2, 2, 2);
CV.position.set(28, -4, -20);
CV.scale.set(2.5, 2.5, 2.5);
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
movieCubeScreen.position.set(0, 2, -150);
scene.add(movieCubeScreen);
//scene.add(movieCubeScreen.position);
video.play();
movieCubeScreen.userData.objectType = 'AiStockCounter';


const assetLoader = new GLTFLoader();
let mixer; // Declare a variable to store the animation mixer
const TrexIdlePath = './assets/Trexidle.glb';
assetLoader.load(TrexIdlePath, function(gltf) {
  const model = gltf.scene;
  scene.add(model);
  model.scale.set(2.5, 2.5, 2.5);
  model.rotation.y -= 90;
  
  
  mixer = new THREE.AnimationMixer(model);
  const clips = gltf.animations;
  const clip = THREE.AnimationClip.findByName(clips, 'TrexIdle');
  const action = mixer.clipAction(clip);
  action.play();
  
  // Iterate over the meshes in the model and apply the texture to each one
  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const textureLoader3 = new THREE.TextureLoader();
      const texture2 = textureLoader3.load('./assets/ParchmentPaperDiffuse.png', function(texture2) {
        child.material.map = texture2; // Assign the texture to the mesh's material
        child.material.needsUpdate = true; // Update the material
        model.position.setY(4.9);
        model.position.setZ(175);
        model.position.setX(50);
        model.castShadow = true;
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
if (mixer) {
  mixer.update(clock.getDelta());
}
let mixer2;
const PaperPath = './assets/Paper2AirPlaneFormAnimation2.glb';
assetLoader.load(PaperPath, function(gltf) {
  const model2 = gltf.scene; // Use a different variable for the second model
  scene.add(model2);
  model2.scale.set(2.5, 2.5, 2.5);
  mixer2 = new THREE.AnimationMixer(model2);
  const clips = gltf.animations;
  const clip = THREE.AnimationClip.findByName(clips, 'PaperPlane');
  const action = mixer2.clipAction(clip);
  action.play();

  // Iterate over the meshes in the model and apply the texture to each one
  model2.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const textureLoader3 = new THREE.TextureLoader();
      
      const texture3 = textureLoader3.load('./assets/ParchmentPaperDiffuse.png', function(texture3) {
        child.material.map = texture3;
        child.material.needsUpdate = true;
        model2.position.setY(9.5);
        model2.position.setZ(-25);
        model2.position.setX(0);
        //model2.rotation.setZ(90);
        model2.castShadow = true;
      });
      const normalMap3 = textureLoader3.load('./assets/PlaneNormal.png', function(normalMap3) {
        child.material.normalMap = normalMap3;
        child.material.normalScale.set(1, 1); // Adjust the scale of the normal map
        child.material.needsUpdate = true;
      });
    }
    
  });
}, undefined, function(error) {
  console.error(error);
});
if (mixer2) {
  mixer2.update(clock2.getDelta());
}
let mixer3;
const MYCVPath = './assets/tunworker.glb';
assetLoader.load(MYCVPath, function(gltf) {
  const model3 = gltf.scene; // Use a different variable for the second model
  scene.add(model3);
  model3.rotation.y -= 90;
  model3.scale.set(2.5, 2.5, 2.5);
  model3.position.set(0, -8, 3);
  mixer3 = new THREE.AnimationMixer(model3);
  const clips = gltf.animations;
  clips.forEach((clip10) => {
    const action10 = mixer3.clipAction(clip10);
    action10.play();
  });
  

  // Iterate over the meshes in the model and apply the texture to each one
  model3.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.material === null) {
        const textureLoader3 = new THREE.TextureLoader();
  
        // Load and apply the diffuse texture
        const texture3 = textureLoader3.load('./assets/ParchmentPaperDiffuse.png', function(texture3) {
          child.material = new THREE.MeshStandardMaterial(); // Create a new material if it's null
          child.material.map = texture3;
          child.material.needsUpdate = true;
  
          // Set the position of the model
          model3.position.set(25, 2, -25);
  
          // Enable shadow casting
          model3.castShadow = true;
        });
  
        // Load and apply the normal map
        const normalMap3 = textureLoader3.load('./assets/PlaneNormal.png', function(normalMap3) {
          if (!child.material) {
            child.material = new THREE.MeshStandardMaterial(); // Ensure the material exists
          }
          child.material.normalMap = normalMap3;
          child.material.normalScale.set(1, 1); // Adjust the scale of the normal map
          child.material.needsUpdate = true;
        });
      }
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
//model4.userData.objectType = 'model4';
// if (mixer3) {
//   mixer3.update(clock3.getDelta());
// }

const floorTexture = new THREE.TextureLoader().load('./assets/MetallerDiffuse.png')
const normalTexture = new THREE.TextureLoader().load('./assets/InkNormal.png')
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
      console.log('CV was clicked!');
      handleObjectClick(intersectedObject);
    }else if (intersectedObject.userData.objectType === 'model4') {
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
    if (intersectedObject.userData.objectType === 'moon' ) {
      // Handle the click event for the moon object
      console.log('Moon was clicked!');
      handleObjectClick(intersectedObject);
    } else if (intersectedObject.userData.objectType === 'model4') {
      // Handle the click event for the model4 object
      console.log('Model4 was clicked!');
      handleObjectClick(intersectedObject);
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
  var currentURL = window.location.href;
  // Check if the current page is nocv.html
  if (currentURL.endsWith('index.html') || currentURL.endsWith('WebPortfolio/') || currentURL.endsWith('aistock.html')) {
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
// Get the current keyboard state.
const keyboardState = window.onkeydown;
// Request the next animation frame.
requestAnimationFrame(movecam2);
}
// Animation
const clock = new THREE.Clock();
const clock2 = new THREE.Clock();
const clock3 = new THREE.Clock();
const clock4 = new THREE.Clock();
function animate() {

  requestAnimationFrame(animate);

  if (videoTexture) {
  videoTexture.needsUpdate = true;
  }
 
  if (mixer) {
  mixer.update(clock.getDelta());
  mixer2.update(clock2.getDelta());
  mixer3.update(clock3.getDelta());
  mixer4.update(clock4.getDelta() * 0.15);
  }   
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