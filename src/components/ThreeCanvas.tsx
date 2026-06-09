import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  currentSection: string;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ currentSection }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // --- 1. SETUP THREE.JS SCENE, CAMERA & RENDERER ---
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#061011', 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    
    // Set initial position
    camera.position.set(0, 15, 30);
    const cameraTarget = new THREE.Vector3(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // --- 2. LIGHTING SYSTEM (AAA Cinematic Ambient & Directional Spotlights) ---
    const ambientLight = new THREE.AmbientLight('#0a1b1d', 1.5);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight('#0e353c', 3);
    moonLight.position.set(20, 40, -10);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.width = 1024;
    moonLight.shadow.mapSize.height = 1024;
    moonLight.shadow.bias = -0.001;
    scene.add(moonLight);

    // Dynamic emerald spot light following the river channel
    const riverGlow = new THREE.SpotLight('#10b981', 15, 40, Math.PI / 4, 0.5, 1);
    riverGlow.position.set(0, 12, 0);
    scene.add(riverGlow);

    // Soft warm neon point light for extra depth contrast
    const accentLight = new THREE.PointLight('#06b6d4', 8, 30);
    accentLight.position.set(-8, 3, 5);
    scene.add(accentLight);

    // --- 3. PROCEDURAL ALPINE VALLEY GENERATION ---
    // Ground landscape with mountain ridges
    const terrainSize = 100;
    const terrainGeo = new THREE.PlaneGeometry(terrainSize, terrainSize, 120, 120);
    terrainGeo.rotateX(-Math.PI / 2);

    const pos = terrainGeo.attributes.position;
    
    // Simple 2D procedural mountain noise to shape the majestic Soča canyon
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vz = pos.getZ(i);

      // Create a riverbed canyon right down the center (vx ~ 0)
      const distFromCenter = Math.abs(vx);
      let heightVal = 0;

      // Base mountains raising further from center
      if (distFromCenter > 8) {
        // High mountains
        heightVal += Math.pow(distFromCenter - 8, 1.25) * 0.4;
        // Mount ridges
        heightVal += Math.sin(vx * 0.15) * Math.cos(vz * 0.15) * 4;
        heightVal += Math.sin(vx * 0.4) * Math.cos(vz * 0.4) * 1.5;
      } else {
        // Sculpt fine canyon riverbed valley
        heightVal += (Math.cos((vx / 8) * Math.PI) + 1) * -1.5;
        heightVal += Math.sin(vz * 0.3) * 0.4; // fine ripples in water flow area
      }

      // High borders
      if (Math.abs(vz) > terrainSize * 0.35) {
        heightVal += Math.pow(Math.abs(vz) - terrainSize * 0.35, 1.1) * 0.3;
      }

      pos.setY(i, heightVal);
    }
    terrainGeo.computeVertexNormals();

    // Standard PBR material for highly realistic rocky/mossy alpine surfaces
    const terrainMat = new THREE.MeshStandardMaterial({
      color: '#091c1e',
      roughness: 0.85,
      metalness: 0.15,
      flatShading: true,
      wireframe: false
    });

    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.receiveShadow = true;
    terrainMesh.castShadow = true;
    scene.add(terrainMesh);

    // Wireframe overlay for futuristic digital-landscape effect
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: '#14b8a6',
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const terrainWireframe = new THREE.Mesh(terrainGeo, wireframeMat);
    terrainWireframe.position.y = 0.05; // slightly above
    scene.add(terrainWireframe);

    // --- 4. THE EMERALD WATER GLOW RIBBON (Soča River) ---
    const riverGeo = new THREE.PlaneGeometry(6, 90, 1, 60);
    riverGeo.rotateX(-Math.PI / 2);
    
    // Align river along canyon bed
    const riverPos = riverGeo.attributes.position;
    for (let i = 0; i < riverPos.count; i++) {
      const rx = riverPos.getX(i);
      const rz = riverPos.getZ(i);
      // Gentle curve following topography
      const curveOffset = Math.sin(rz * 0.08) * 3;
      riverPos.setX(i, rx + curveOffset);
      
      // Flatten water slightly below regular zero ground
      riverPos.setY(i, -1.8 + Math.sin(rz * 0.2) * 0.1);
    }
    riverGeo.computeVertexNormals();

    const riverMat = new THREE.MeshStandardMaterial({
      color: '#0d9488',
      roughness: 0.1,
      metalness: 0.9,
      emissive: '#0f766e',
      emissiveIntensity: 1.2,
      flatShading: true,
      transparent: true,
      opacity: 0.85
    });

    const riverMesh = new THREE.Mesh(riverGeo, riverMat);
    scene.add(riverMesh);

    // --- 5. DRUMLIN PINE FORESTS (Cone Meshes along valley edges) ---
    const forestGroup = new THREE.Group();
    const treeGeo = new THREE.ConeGeometry(0.6, 2.2, 5);
    const trunkGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 4);
    const barkMat = new THREE.MeshStandardMaterial({ color: '#131e1f', roughness: 0.95 });
    const leafMat = new THREE.MeshStandardMaterial({ color: '#064e3b', roughness: 0.8, flatShading: true });

    // Seed low-poly pine trees along canyon terraces
    for (let xOffset = -18; xOffset <= 18; xOffset += 4) {
      if (Math.abs(xOffset) < 5) continue; // Keep river valley clear
      
      for (let zOffset = -40; zOffset <= 40; zOffset += 8) {
        // Symmetrical noise randomizer
        const rx = xOffset + (Math.random() - 0.5) * 3.2;
        const rz = zOffset + (Math.random() - 0.5) * 5;
        
        // Match height to underlying terrain
        let rheight = Math.pow(Math.abs(rx) - 8, 1.25) * 0.4;
        rheight += Math.sin(rx * 0.15) * Math.cos(rz * 0.15) * 4;
        rheight += Math.sin(rx * 0.4) * Math.cos(rz * 0.4) * 1.5;
        
        const treeInstance = new THREE.Group();
        
        // Foliage cone
        const leaves = new THREE.Mesh(treeGeo, leafMat);
        leaves.position.y = 1.3;
        leaves.castShadow = true;
        treeInstance.add(leaves);

        // Bark trunk
        const trunk = new THREE.Mesh(trunkGeo, barkMat);
        trunk.position.y = 0.25;
        trunk.castShadow = true;
        treeInstance.add(trunk);

        treeInstance.position.set(rx, rheight - 0.2, rz);
        
        // Tiny scale variety
        const ts = 0.7 + Math.random() * 0.6;
        treeInstance.scale.set(ts, ts, ts);

        forestGroup.add(treeInstance);
      }
    }
    scene.add(forestGroup);

    // --- 6. FLOATING NEON CRYSTAL / MONOLITH (Focal point for Contact section) ---
    const monolithGeo = new THREE.OctahedronGeometry(2, 0);
    const monolithMat = new THREE.MeshStandardMaterial({
      color: '#14b8a6',
      emissive: '#0d9488',
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
      flatShading: true
    });
    const monolith = new THREE.Mesh(monolithGeo, monolithMat);
    monolith.position.set(0, 4, -15);
    monolith.castShadow = true;
    scene.add(monolith);

    // Inner wireframe glow core
    const coreGeo = new THREE.OctahedronGeometry(2.1, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: '#34d399',
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    monolith.add(coreMesh);

    // --- 7. ALPINE STARFIELD / WEATHER FIELD (Buffer Particles) ---
    const starCount = 3500;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSpeeds = new Float32Array(starCount);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 120; // x
      starPositions[i + 1] = Math.random() * 45 - 5;    // y
      starPositions[i + 2] = (Math.random() - 0.5) * 120; // z
      starSpeeds[i / 3] = 0.05 + Math.random() * 0.15;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    
    const starMat = new THREE.PointsMaterial({
      color: '#a7f3d0',
      size: 0.18,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true
    });

    const starParticles = new THREE.Points(starGeo, starMat);
    scene.add(starParticles);

    // --- 8. MOUSE EVENT BINDING FOR PARALLAX ---
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handling
    const handleResize = () => {
      if (!containerRef.current) return;
      const nw = containerRef.current.clientWidth;
      const nh = containerRef.current.clientHeight;

      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();

      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    // --- 9. HIGH PERFORMANCE ANIMATION LOOP ---
    let frameId: number;
    const startTime = performance.now();

    // Flight node values representing smooth target coordinates per viewport section
    const targetCameraPos = new THREE.Vector3(0, 15, 30);
    const targetLookAt = new THREE.Vector3(0, 2, 0);

    const tick = () => {
      const elapsed = (performance.now() - startTime) / 1000;

      // Slow dynamic rotations & wavy animations
      monolith.rotation.y = elapsed * 0.4;
      monolith.rotation.x = elapsed * 0.2;
      monolith.position.y = 4 + Math.sin(elapsed * 1.5) * 0.6;

      // Pulse neon intensity
      monolithMat.emissiveIntensity = 0.5 + Math.sin(elapsed * 2.5) * 0.3;

      // Drifting star particles
      const positions = starParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        // Gently drift downwards
        positions[i3 + 1] -= starSpeeds[i] * 0.15;
        // Wind drift horizontally (sideways swing)
        positions[i3] += Math.sin(elapsed * 0.2 + i) * 0.02;

        if (positions[i3 + 1] < -5) {
          positions[i3 + 1] = 40;
        }
      }
      starParticles.geometry.attributes.position.needsUpdate = true;

      // Flowing water surface vertex oscillation (sinusoidal simulation)
      const riverPositions = riverGeo.attributes.position;
      for (let i = 0; i < riverPositions.count; i++) {
        const rz = riverPositions.getZ(i);
        const ry = -1.8 + Math.sin(rz * 0.25 - elapsed * 2.5) * 0.12;
        riverPositions.setY(i, ry);
      }
      riverPositions.needsUpdate = true;
      riverGeo.computeVertexNormals();

      // Dynamic Spot Tracking moving glowing orb overhead
      riverGlow.position.x = Math.sin(elapsed * 0.8) * 8;
      riverGlow.position.z = Math.cos(elapsed * 0.5) * 15;

      // Update mouse spring interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Apply coordinates based on current active scroll state (immersive transitions)
      switch (currentSection) {
        case 'about':
        case 'home':
        default:
          // Large panorama overview looking at the deep canyon
          targetCameraPos.set(0, 16, 28);
          targetLookAt.set(0, 1, 0);
          break;
        case 'accommodation':
          // Diving deeper down directly near apartments terrace level
          targetCameraPos.set(-7, 6, 12);
          targetLookAt.set(3, 1, -2);
          break;
        case 'activities':
          // Close perspective flying parallel to the active glowing water channel
          targetCameraPos.set(4, 3, 4);
          targetLookAt.set(-2, 0, -8);
          break;
        case 'reviews':
          // Looking up from canyon bed at spectacular stellar stardust
          targetCameraPos.set(0, 1.5, 8);
          targetLookAt.set(0, 12, -4);
          break;
        case 'contact':
          // Immersive zoom right in front of the neon interactive core crystal base
          targetCameraPos.set(0, 4.5, -6);
          targetLookAt.set(0, 4, -15);
          break;
      }

      // Smooth camera interpolation (Linear Interpolation/Lerp for flight speed feel)
      camera.position.x += (targetCameraPos.x - camera.position.x) * 0.045;
      camera.position.y += (targetCameraPos.y - camera.position.y) * 0.045;
      camera.position.z += (targetCameraPos.z - camera.position.z) * 0.045;

      cameraTarget.x += (targetLookAt.x - cameraTarget.x) * 0.05;
      cameraTarget.y += (targetLookAt.y - cameraTarget.y) * 0.05;
      cameraTarget.z += (targetLookAt.z - cameraTarget.z) * 0.05;

      // Apply mouse parallax spring to position
      const parallaxFactorX = 4;
      const parallaxFactorY = 2;
      camera.position.x += mouseRef.current.x * parallaxFactorX;
      camera.position.y += mouseRef.current.y * parallaxFactorY;

      camera.lookAt(cameraTarget);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    tick();

    // CLEANUP ON UNMOUNT
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      riverGeo.dispose();
      riverMat.dispose();
      treeGeo.dispose();
      leafMat.dispose();
      trunkGeo.dispose();
      barkMat.dispose();
      monolithGeo.dispose();
      monolithMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [currentSection]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full -z-10 bg-[#061011] overflow-hidden pointer-events-none"
      id="three-3d-background-canvas"
    />
  );
};
