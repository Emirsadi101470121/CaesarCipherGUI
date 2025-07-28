window.addEventListener("load", () => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 75;

  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("bgCanvas"),
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const geometry = new THREE.TorusGeometry(6, 1.8, 16, 100);
  const material = new THREE.MeshStandardMaterial({
    color: 0x3399ff,
    emissive: 0x112244,
    roughness: 0.4,
    metalness: 0.6,
  });

  const torus = new THREE.Mesh(geometry, material);
  torus.position.set(-5, -5, -30); 
  torus.rotation.x = Math.PI / 5;
  torus.rotation.y = Math.PI / 4;
  scene.add(torus);

  const pointLight = new THREE.PointLight(0xffffff, 1.5);
  pointLight.position.set(20, 20, 20);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.002;
    torus.rotation.y += 0.003;
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
