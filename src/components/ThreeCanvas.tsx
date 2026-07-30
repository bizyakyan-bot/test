import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  currentSection: string;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ currentSection }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const currentSectionRef = useRef(currentSection);

  // Keep section ref updated without re-instantiating WebGL
  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

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

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // --- 2. LIGHTING SYSTEM ---
    const ambientLight = new THREE.AmbientLight('#0a1b1d', 1.5);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight('#0e353c', 2.5);
    moonLight.position.set(20, 40, -10);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.width = 512;
    moonLight.shadow.mapSize.height = 512;
    moonLight.shadow.bias = -0.001;
    scene.add(moonLight);

    // Dynamic emerald spot light following the river channel
    const riverGlow = new THREE.SpotLight('#10b981', 12, 40, Math.PI / 4, 0.5, 1);
    riverGlow.position.set(0, 12, 0);
    scene.add(riverGlow);

    // Soft warm neon point light for extra depth contrast
    const accentLight = new THREE.PointLight('#06b6d4', 6, 30);
    accentLight.position.set(-8, 3, 5);
    scene.add(accentLight);

    // --- 3. PROCEDURAL ALPINE VALLEY GENERATION (Optimized geometry resolution) ---
    const terrainSize = 100;
    const terrainGeo = new THREE.PlaneGeometry(terrainSize, terrainSize, 50, 50);
    terrainGeo.rotateX(-Math.PI / 2);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vz = pos.getZ(i);
      const distFromCenter = Math.abs(vx);
      let heightVal = 0;

      if (distFromCenter > 8) {
        heightVal += Math.pow(distFromCenter - 8, 1.25) * 0.4;
        heightVal += Math.sin(vx * 0.15) * Math.cos(vz * 0.15) * 4;
        heightVal += Math.sin(vx * 0.4) * Math.cos(vz * 0.4) * 1.5;
      } else {
        heightVal += (Math.cos((vx / 8) * Math.PI) + 1) * -1.5;
        heightVal += Math.sin(vz * 0.3) * 0.4;
      }

      if (Math.abs(vz) > terrainSize * 0.35) {
        heightVal += Math.pow(Math.abs(vz) - terrainSize * 0.35, 1.1) * 0.3;
      }

      pos.setY(i, heightVal);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: '#091c1e',
      roughness: 0.85,
      metalness: 0.15,
      flatShading: true,
    });

    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.receiveShadow = true;
    terrainMesh.castShadow = true;
    scene.add(terrainMesh);

    // Wireframe overlay
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: '#14b8a6',
      wireframe: true,
      transparent: true,
      opacity: 0.06
    });
    const terrainWireframe = new THREE.Mesh(terrainGeo, wireframeMat);
    terrainWireframe.position.y = 0.05;
    scene.add(terrainWireframe);

    // --- 4. THE EMERALD WATER GLOW RIBBON ---
    const riverGeo = new THREE.PlaneGeometry(6, 90, 1, 30);
    riverGeo.rotateX(-Math.PI / 2);
    
    const riverPos = riverGeo.attributes.position;
    for (let i = 0; i < riverPos.count; i++) {
      const rx = riverPos.getX(i);
      const rz = riverPos.getZ(i);
      const curveOffset = Math.sin(rz * 0.08) * 3;
      riverPos.setX(i, rx + curveOffset);
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

    // --- 5. DRUMLIN PINE FORESTS (Optimized instancing/group count) ---
    const forestGroup = new THREE.Group();
    const treeGeo = new THREE.ConeGeometry(0.6, 2.2, 4);
    const trunkGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 4);
    const barkMat = new THREE.MeshStandardMaterial({ color: '#131e1f', roughness: 0.95 });
    const leafMat = new THREE.MeshStandardMaterial({ color: '#064e3b', roughness: 0.8, flatShading: true });

    for (let xOffset = -18; xOffset <= 18; xOffset += 6) {
      if (Math.abs(xOffset) < 5) continue;
      
      for (let zOffset = -40; zOffset <= 40; zOffset += 12) {
        const rx = xOffset + (Math.random() - 0.5) * 3.2;
        const rz = zOffset + (Math.random() - 0.5) * 5;
        
        let rheight = Math.pow(Math.abs(rx) - 8, 1.25) * 0.4;
        rheight += Math.sin(rx * 0.15) * Math.cos(rz * 0.15) * 4;
        rheight += Math.sin(rx * 0.4) * Math.cos(rz * 0.4) * 1.5;
        
        const treeInstance = new THREE.Group();
        
        const leaves = new THREE.Mesh(treeGeo, leafMat);
        leaves.position.y = 1.3;
        leaves.castShadow = true;
        treeInstance.add(leaves);

        const trunk = new THREE.Mesh(trunkGeo, barkMat);
        trunk.position.y = 0.25;
        treeInstance.add(trunk);

        treeInstance.position.set(rx, rheight - 0.2, rz);
        
        const ts = 0.7 + Math.random() * 0.6;
        treeInstance.scale.set(ts, ts, ts);

        forestGroup.add(treeInstance);
      }
    }
    scene.add(forestGroup);

    // --- 6. FLOATING MONOLITH ---
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
    scene.add(monolith);

    // --- 7. ALPINE STARFIELD (Optimized particle count) ---
    const starCount = 1000;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSpeeds = new Float32Array(starCount);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 120;
      starPositions[i + 1] = Math.random() * 45 - 5;
      starPositions[i + 2] = (Math.random() - 0.5) * 120;
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
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

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

    const targetCameraPos = new THREE.Vector3(0, 15, 30);
    const targetLookAt = new THREE.Vector3(0, 2, 0);

    const tick = () => {
      const elapsed = (performance.now() - startTime) / 1000;

      // Slow dynamic rotations & wavy animations
      monolith.rotation.y = elapsed * 0.4;
      monolith.rotation.x = elapsed * 0.2;
      monolith.position.y = 4 + Math.sin(elapsed * 1.5) * 0.6;

      // Drifting star particles
      const positions = starParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] -= starSpeeds[i] * 0.15;
        if (positions[i3 + 1] < -5) {
          positions[i3 + 1] = 40;
        }
      }
      starParticles.geometry.attributes.position.needsUpdate = true;

      // Flowing water surface vertex oscillation (No heavy computeVertexNormals inside loop!)
      const riverPositions = riverGeo.attributes.position;
      for (let i = 0; i < riverPositions.count; i++) {
        const rz = riverPositions.getZ(i);
        const ry = -1.8 + Math.sin(rz * 0.25 - elapsed * 2.5) * 0.12;
        riverPositions.setY(i, ry);
      }
      riverPositions.needsUpdate = true;

      // Dynamic Spot Tracking
      riverGlow.position.x = Math.sin(elapsed * 0.8) * 8;
      riverGlow.position.z = Math.cos(elapsed * 0.5) * 15;

      // Update mouse spring interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Read current section from ref without tearing down scene
      const activeSection = currentSectionRef.current;
      switch (activeSection) {
        case 'about':
        case 'home':
        default:
          targetCameraPos.set(0, 16, 28);
          targetLookAt.set(0, 1, 0);
          break;
        case 'accommodation':
          targetCameraPos.set(-7, 6, 12);
          targetLookAt.set(3, 1, -2);
          break;
        case 'activities':
          targetCameraPos.set(4, 3, 4);
          targetLookAt.set(-2, 0, -8);
          break;
        case 'reviews':
          targetCameraPos.set(0, 1.5, 8);
          targetLookAt.set(0, 12, -4);
          break;
        case 'contact':
          targetCameraPos.set(0, 4.5, -6);
          targetLookAt.set(0, 4, -15);
          break;
      }

      // Smooth camera interpolation
      camera.position.x += (targetCameraPos.x - camera.position.x) * 0.045;
      camera.position.y += (targetCameraPos.y - camera.position.y) * 0.045;
      camera.position.z += (targetCameraPos.z - camera.position.z) * 0.045;

      cameraTarget.x += (targetLookAt.x - cameraTarget.x) * 0.05;
      cameraTarget.y += (targetLookAt.y - cameraTarget.y) * 0.05;
      cameraTarget.z += (targetLookAt.z - cameraTarget.z) * 0.05;

      // Parallax offset
      camera.position.x += mouseRef.current.x * 2;
      camera.position.y += mouseRef.current.y * 1;

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
      starGeo.dispose();
      starMat.dispose();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []); // Run once on mount!

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full -z-10 bg-[#061011] overflow-hidden pointer-events-none"
      id="three-3d-background-canvas"
    />
  );
};
