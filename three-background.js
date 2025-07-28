window.addEventListener("load", () => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 50;

  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("bgCanvas"),
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
  const torus = new THREE.Mesh(geometry, material);
  torus.position.z = -20;
  scene.add(torus);

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
