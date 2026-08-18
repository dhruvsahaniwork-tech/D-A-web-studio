/**
 * D&A Web Studio - Three.js Interactive 3D Background & Hero Experience
 * High-performance 3D particle constellation & geometric floating core.
 */

(function () {
  let scene, camera, renderer;
  let particleSystem, geometryMesh, innerCore, ringMesh;
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  let scrollY = 0;

  function initThree() {
    const canvas = document.getElementById("webgl-canvas");
    if (!canvas || typeof THREE === "undefined") return;

    // 1. Scene
    scene = new THREE.Scene();

    // 2. Camera
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 600;

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 4. Create 3D Particle Cloud
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Brand Palette: Forest Sage, Emerald, Cyan, Mint
    const colorChoices = [
      new THREE.Color(0x456138),
      new THREE.Color(0x059669),
      new THREE.Color(0x0284c7),
      new THREE.Color(0x10b981),
      new THREE.Color(0x93ab88)
    ];

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 380 + Math.random() * 550;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const canvasTexture = document.createElement("canvas");
    canvasTexture.width = 32;
    canvasTexture.height = 32;
    const ctx = canvasTexture.getContext("2d");
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(5,150,105,1)");
    gradient.addColorStop(0.3, "rgba(69,97,56,0.85)");
    gradient.addColorStop(0.8, "rgba(16,185,129,0.3)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvasTexture);

    const pMaterial = new THREE.PointsMaterial({
      size: 7,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.NormalBlending,
      depthWrite: false
    });

    particleSystem = new THREE.Points(geometry, pMaterial);
    scene.add(particleSystem);

    // 5. Central 3D Geometric Floating Core
    const coreGroup = new THREE.Group();

    // Outer wireframe icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(130, 2);
    const icoMaterial = new THREE.MeshStandardMaterial({
      color: 0x456138,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      emissive: 0x059669,
      emissiveIntensity: 0.25
    });
    geometryMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    coreGroup.add(geometryMesh);

    // Inner glowing sphere
    const sphereGeo = new THREE.SphereGeometry(65, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.3,
      metalness: 0.7,
      wireframe: false,
      transparent: true,
      opacity: 0.55,
      emissive: 0x059669,
      emissiveIntensity: 0.35
    });
    innerCore = new THREE.Mesh(sphereGeo, sphereMat);
    coreGroup.add(innerCore);

    // Orbital ring
    const ringGeo = new THREE.TorusGeometry(180, 2, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.4,
      wireframe: true
    });
    ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    coreGroup.add(ringMesh);

    coreGroup.position.set(220, 30, -50);
    scene.add(coreGroup);

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x059669, 2.2, 900);
    pointLight1.position.set(200, 200, 300);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0284c7, 1.8, 800);
    pointLight2.position.set(-200, -200, 200);
    scene.add(pointLight2);

    // Event Listeners
    window.addEventListener("resize", onWindowResize);
    document.addEventListener("mousemove", onDocumentMouseMove);
    window.addEventListener("scroll", onScroll);
    document.addEventListener("click", onDocumentClick);

    // Start animation loop
    animate();
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.35;
    mouseY = (event.clientY - windowHalfY) * 0.35;
  }

  function onScroll() {
    scrollY = window.pageYOffset || document.documentElement.scrollTop;
  }

  function onDocumentClick() {
    if (!particleSystem) return;
    const positions = particleSystem.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 9) {
      positions[i] += (Math.random() - 0.5) * 12;
      positions[i + 1] += (Math.random() - 0.5) * 12;
      positions[i + 2] += (Math.random() - 0.5) * 12;
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;
  }

  function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    // Smooth mouse lerp
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    camera.position.x = targetX * 0.7;
    camera.position.y = -targetY * 0.7 + Math.sin(time * 0.5) * 8;
    camera.lookAt(scene.position);

    if (particleSystem) {
      particleSystem.rotation.y = time * 0.035;
      particleSystem.rotation.x = time * 0.015;
    }

    if (geometryMesh) {
      geometryMesh.rotation.x = time * 0.22;
      geometryMesh.rotation.y = time * 0.3;
      geometryMesh.position.y = Math.sin(time * 1.5) * 12;
    }

    if (innerCore) {
      const scale = 1 + Math.sin(time * 3) * 0.06;
      innerCore.scale.set(scale, scale, scale);
      innerCore.rotation.y = -time * 0.35;
    }

    if (ringMesh) {
      ringMesh.rotation.z = time * 0.25;
      ringMesh.rotation.y = time * 0.18;
    }

    if (window.innerWidth < 1024 && geometryMesh && geometryMesh.parent) {
      geometryMesh.parent.position.set(0, 70, -120);
      geometryMesh.parent.scale.set(0.65, 0.65, 0.65);
    } else if (geometryMesh && geometryMesh.parent) {
      geometryMesh.parent.position.set(220, 20, -50);
      geometryMesh.parent.scale.set(1, 1, 1);
    }

    renderer.render(scene, camera);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThree);
  } else {
    initThree();
  }
})();