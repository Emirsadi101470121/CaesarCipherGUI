console.log("three-background.js loaded");

const scene = new THREE.Scene();

const isMobile = window.innerWidth < 768;

const torusRadius = isMobile ? 80 : 120;
const tubeRadius = isMobile ? 4 : 6;
const cameraZ = isMobile ? 180 : 260;
const cameraXY = isMobile ? 30 : 60;

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(cameraXY, cameraXY, cameraZ);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bgCanvas"),
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const geometry = new THREE.TorusGeometry(torusRadius, tubeRadius, 32, 120);
const material = new THREE.MeshStandardMaterial({
  color: 0x3399ff,
  emissive: 0x3399ff,
  emissiveIntensity: 1.5,
  metalness: 0.7,
  roughness: 0.2
});
const torus = new THREE.Mesh(geometry, material);
torus.rotation.x = Math.PI / 2;
scene.add(torus);

const pointLight = new THREE.PointLight(0x3399ff, 1.8);
pointLight.position.set(80, 80, 130);
scene.add(pointLight);

scene.add(new THREE.AmbientLight(0x223344, 0.5));

function animate() {
  torus.rotation.z += 0.01;
  torus.rotation.y += 0.005;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  const isMobile = window.innerWidth < 768;
  const newRadius = isMobile ? 80 : 120;
  const newTube = isMobile ? 4 : 6;
  const newZ = isMobile ? 180 : 260;
  const newXY = isMobile ? 30 : 60;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.position.set(newXY, newXY, newZ);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});
