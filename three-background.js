console.log("three-background.js loaded");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(60, 60, 260);
camera.lookAt(0, 0, 0);


const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bgCanvas"),
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const geometry = new THREE.TorusGeometry(120, 6, 32, 120);
const material = new THREE.MeshStandardMaterial({
  color: 0x00aaff,
  emissive: 0x00aaff,
  emissiveIntensity: 1,
  metalness: 0.6,
  roughness: 0.2,
});

const torus = new THREE.Mesh(geometry, material);
torus.rotation.x = Math.PI / 2;
scene.add(torus);

const pointLight = new THREE.PointLight(0x00aaff, 2);
pointLight.position.set(80, 80, 120);
scene.add(pointLight);

scene.add(new THREE.AmbientLight(0x223344, 0.5));


const composer = new THREE.EffectComposer(renderer);
composer.addPass(new THREE.RenderPass(scene, camera));

const bloomPass = new THREE.UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5, 0.4, 0.85
);
composer.addPass(bloomPass);

function animate() {
  torus.rotation.z += 0.01;
  torus.rotation.y += 0.005;
  composer.render();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  composer.setSize(width, height);
});
