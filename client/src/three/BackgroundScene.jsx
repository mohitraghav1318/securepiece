/**
 * BackgroundScene
 *
 * Three.js animated particle background with mouse interaction
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function BackgroundScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    /**
     * Scene setup
     */
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement);

    /**
     * Particle geometry
     */
    const geometry = new THREE.BufferGeometry();
    const count = 500;

    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x93c5fd,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    /**
     * Mouse tracking
     */
    const mouse = {
      x: 0,
      y: 0,
    };

    const handleMouseMove = (event) => {
      /**
       * Normalize mouse position (-1 to 1)
       */
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    /**
     * Animation loop
     */
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      /**
       * Subtle base rotation
       */
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      /**
       * Mouse interaction (smooth follow)
       */
      particles.rotation.y += mouse.x * 0.002;
      particles.rotation.x += mouse.y * 0.002;

      renderer.render(scene, camera);
    };

    animate();

    /**
     * Resize handling
     */
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    /**
     * Cleanup
     */
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      cancelAnimationFrame(animationId);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />
  );
}

export default BackgroundScene;
