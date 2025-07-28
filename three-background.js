window.addEventListener("load", () => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 60;

  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("bgCanvas"),
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const geometry = new THREE.TorusGeometry(5, 1.5, 16, 100); // smaller torus
  const material = new THREE.MeshStandardMaterial({ color: 0x3399ff });
  const torus = new THREE.Mesh(geometry, material);

  torus.position.set(0, 5, -30); // far back and high
  torus.rotation.x = Math.PI / 4;
  torus.rotation.y = Math.PI / 4;
  scene.add(torus);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(10, 10, 20);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.003;
    torus.rotation.y += 0.004;
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
