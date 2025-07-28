const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(60, 60, 260);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bgCanvas"),
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const geometry = new THREE.TorusGeometry(120, 6, 32, 120);
const material = new THREE.MeshStandardMaterial({
  color: 0x3399ff,
  emissive: 0x3399ff,
  emissiveIntensity: 1.2,
  metalness: 0.7,
  roughness: 0.2
});
const torus = new THREE.Mesh(geometry, material);
torus.rotation.x = Math.PI / 2;
scene.add(torus);

const pointLight = new THREE.PointLight(0x3399ff, 1.5);
pointLight.position.set(50, 80, 130);
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
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
