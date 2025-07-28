window.addEventListener("load", () => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 80;

  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("bgCanvas"),
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const geometry = new THREE.TorusGeometry(6, 1.5, 16, 100);
  const material = new THREE.MeshStandardMaterial({
    color: 0x3399ff,
    emissive: 0x112244,
    roughness: 0.3,
    metalness: 0.7,
  });

  const torus = new THREE.Mesh(geometry, material);
  torus.rotation.x = Math.PI / 4;
  torus.rotation.y = Math.PI / 4;
  scene.add(torus);

  const pointLight = new THREE.PointLight(0xffffff, 1.5);
  pointLight.position.set(20, 20, 40);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  let angle = 0;
  function animate() {
    requestAnimationFrame(animate);

    angle += 0.01;
    torus.position.x = Math.cos(angle) * 25;
    torus.position.y = Math.sin(angle) * 15;
    torus.position.z = Math.sin(angle * 2) * 10;

    torus.rotation.x += 0.005;
    torus.rotation.y += 0.006;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
