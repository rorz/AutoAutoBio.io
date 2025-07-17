'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const textureLoader = new THREE.TextureLoader();

    const books: THREE.Mesh[] = [];
    const bookCount = 40;

    const createBookGeometry = () => {
      const geometry = new THREE.BoxGeometry(1, 1.5, 0.15);
      return geometry;
    };

    const bookColors = [
      0x8B4513, 0x2F4F4F, 0x800000, 0x8B0000, 0x556B2F,
      0x4682B4, 0x6A5ACD, 0x20B2AA, 0xCD853F, 0x9932CC,
      0x1E90FF, 0xFF6347, 0x32CD32, 0xFFD700, 0xFF69B4
    ];

    for (let i = 0; i < bookCount; i++) {
      const bookGeometry = createBookGeometry();
      const bookMaterial = new THREE.MeshPhongMaterial({ 
        color: bookColors[Math.floor(Math.random() * bookColors.length)],
        shininess: 30
      });
      
      const book = new THREE.Mesh(bookGeometry, bookMaterial);
      
      book.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 50
      );
      
      book.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      book.userData = {
        initialRotation: { ...book.rotation },
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        },
        floatSpeed: Math.random() * 0.02 + 0.01,
        floatOffset: Math.random() * Math.PI * 2,
        initialPosition: { ...book.position }
      };
      
      books.push(book);
      scene.add(book);
    }

    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x4444ff, 0.3, 100);
    pointLight.position.set(-10, -10, 10);
    scene.add(pointLight);

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      books.forEach((book) => {
        if (book.userData) {
          book.rotation.x = book.userData.initialRotation.x + time * book.userData.rotationSpeed.x;
          book.rotation.y = book.userData.initialRotation.y + time * book.userData.rotationSpeed.y;
          book.rotation.z = book.userData.initialRotation.z + time * book.userData.rotationSpeed.z;
          
          book.position.y = book.userData.initialPosition.y + Math.sin(time * book.userData.floatSpeed + book.userData.floatOffset) * 2;
        }
      });
      
      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      
      books.forEach((book) => {
        scene.remove(book);
      });
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default ThreeBackground;