console.log("three-background.js loaded");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(40, 40, 180);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bgCanvas"),
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// LED-like glowing material
const geometry = new THREE.TorusGeometry(90, 2.8, 32, 120);
const material = new THREE.MeshStandardMaterial({
  color: 0x00aaff,
  emissive: 0x0088ff,
  emissiveIntensity: 1.5,
  metalness: 0.6,
  roughness: 0.2,
});

const torus = new THREE.Mesh(geometry, material);
torus.rotation.x = Math.PI / 2;
scene.add(torus);

const pointLight = new THREE.PointLight(0x88ccff, 2);
pointLight.position.set(80, 80, 120);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x226688, 0.4);
scene.add(ambientLight);

function animate() {
  torus.rotation.z += 0.01;
  torus.rotation.y += 0.005;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
