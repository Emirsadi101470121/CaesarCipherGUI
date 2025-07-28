window.addEventListener("load", () => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 150;

  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("bgCanvas"),
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const geometry = new THREE.TorusGeometry(70, 2.2, 16, 100);
  const material = new THREE.MeshStandardMaterial({
    color: 0x3399ff,
    emissive: 0x112244,
    metalness: 0.7,
    roughness: 0.3,
  });

  const torus = new THREE.Mesh(geometry, material);
  torus.rotation.x = Math.PI / 2; 
  scene.add(torus);

  const pointLight = new THREE.PointLight(0xffffff, 2);
  pointLight.position.set(50, 50, 100);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  function animate() {
    requestAnimationFrame(animate);

    
    torus.rotation.z += 0.01;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
