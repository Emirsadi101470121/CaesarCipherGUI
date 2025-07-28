console.log('three-background.js loaded');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 1000);
camera.position.z = 150;
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('bgCanvas'), alpha:true});
renderer.setSize(innerWidth, innerHeight);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(70, 2.2, 16, 100),
  new THREE.MeshStandardMaterial({ color: 0x3399ff })
);
torus.rotation.x = Math.PI/2;
scene.add(torus);
const light = new THREE.PointLight(0xffffff,2); light.position.set(50,50,100);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff,0.3));
function animate(){
  torus.rotation.z += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
console.log('animation started');
