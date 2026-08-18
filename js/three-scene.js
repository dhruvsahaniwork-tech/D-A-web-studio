/**
 * D&A Web Studio - Three.js Interactive 3D Background (Ultra-Optimized)
 * Hardware-accelerated, throttled, and automatically paused when off-screen.
 */

(function () {
  let scene, camera, renderer;
  let particleSystem, geometryMesh, innerCore, ringMesh;
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  let isRunning = false;
  let animationFrameId = null;

  function initThree() {
    const canvas = document.getElementById("webgl-canvas");
    if (!canvas || typeof THREE === "undefined") return;

    // 1. Scene
    scene = new THREE.Scene();

    // 2. Camera
    camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      1500
    );
    camera.position.z = 580;

    // 3. Renderer (High-Performance, low power preference, capped DPR)
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      powerPreference: "high-performance",
      precision: "mediump"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 4. Lightweight Particle Cloud (Optimized 700 particles)
    const particleCount = 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorChoices = [
      new THREE.Color(0x2d5a27),
      new THREE.Color(0x047857),
      new THREE.Color(0x0369a1),
      new THREE.Color(0x10b981)
    ];

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 350 + Math.random() * 500;
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
    canvasTexture.width = 16;
    canvasTexture.height = 16;
    const ctx = canvasTexture.getContext("2d");
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, "rgba(4,120,87,1)");
    gradient.addColorStop(0.5, "rgba(45,90,39,0.8)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);

    const texture = new THREE.CanvasTexture(canvasTexture);

    const pMaterial = new THREE.PointsMaterial({
      size: 6,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false
    });

    particleSystem = new THREE.Points(geometry, pMaterial);
    scene.add(particleSystem);

    // 5. Central 3D Geometric Floating Core
    const coreGroup = new THREE.Group();

    // Outer wireframe icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(120, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x047857,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    geometryMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    coreGroup.add(geometryMesh);

    // Inner glowing sphere
    const sphereGeo = new THREE.SphereGeometry(55, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    innerCore = new THREE.Mesh(sphereGeo, sphereMat);
    coreGroup.add(innerCore);

    // Orbital ring
    const ringGeo = new THREE.TorusGeometry(160, 1.5, 8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0369a1,
      transparent: true,
      opacity: 0.35,
      wireframe: true
    });
    ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    coreGroup.add(ringMesh);

    coreGroup.position.set(200, 20, -50);
    scene.add(coreGroup);

    // Passive Event Listeners
    window.addEventListener("resize", onWindowResize, { passive: true });
    document.addEventListener("mousemove", onDocumentMouseMove, { passive: true });

    // IntersectionObserver: Only render when Hero is on-screen
    setupIntersectionObserver();

    // Pause when tab is inactive
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    });

    startLoop();
  }

  function setupIntersectionObserver() {
    const heroSection = document.querySelector("section");
    if (!heroSection || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      });
    }, { rootMargin: "200px" });

    observer.observe(heroSection);
  }

  function startLoop() {
    if (!isRunning) {
      isRunning = true;
      animate();
    }
  }

  function stopLoop() {
    isRunning = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.25;
    mouseY = (event.clientY - windowHalfY) * 0.25;
  }

  let lastTime = 0;
  function animate(now = 0) {
    if (!isRunning) return;
    animationFrameId = requestAnimationFrame(animate);

    // Throttle to max 60fps to prevent CPU overuse
    if (now - lastTime < 14) return;
    lastTime = now;

    const time = now * 0.001;

    // Smooth mouse lerp
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    camera.position.x = targetX * 0.5;
    camera.position.y = -targetY * 0.5;
    camera.lookAt(scene.position);

    if (particleSystem) {
      particleSystem.rotation.y = time * 0.025;
    }

    if (geometryMesh) {
      geometryMesh.rotation.x = time * 0.2;
      geometryMesh.rotation.y = time * 0.25;
    }

    if (innerCore) {
      innerCore.rotation.y = -time * 0.3;
    }

    if (ringMesh) {
      ringMesh.rotation.z = time * 0.2;
    }

    renderer.render(scene, camera);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThree);
  } else {
    initThree();
  }
})();