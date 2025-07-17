'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import PageFlipBook from './PageFlipBook';

interface BookData {
  id: string;
  title: string;
  pages: string[];
  color: number;
}

const InteractiveBookCloud = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [showFlipBook, setShowFlipBook] = useState(false);

  const bookData: BookData[] = [
    {
      id: '1',
      title: 'The Art of Programming',
      pages: [
        'Welcome to the fascinating world of programming. This book will guide you through the fundamentals of creating beautiful, functional code.',
        'Chapter 1: Getting Started\n\nProgramming is both an art and a science. It requires creativity, logic, and patience.',
        'Chapter 2: Data Structures\n\nUnderstanding how data is organized and stored is crucial for efficient programming.',
        'Chapter 3: Algorithms\n\nAlgorithms are the heart of computer science. They define how problems are solved.',
        'Chapter 4: Best Practices\n\nWriting clean, maintainable code is essential for long-term success.',
        'Conclusion\n\nCongratulations! You\'ve completed your journey through the art of programming.'
      ],
      color: 0x8B4513
    },
    {
      id: '2',
      title: 'Digital Dreams',
      pages: [
        'In the realm of digital dreams, imagination becomes reality through code and creativity.',
        'Chapter 1: The Digital Canvas\n\nEvery screen is a canvas waiting for your artistic vision.',
        'Chapter 2: User Experience\n\nDesigning for humans means understanding their needs and desires.',
        'Chapter 3: Interactive Stories\n\nTechnology allows us to tell stories in entirely new ways.',
        'Chapter 4: The Future\n\nWhat lies ahead in the world of digital innovation?',
        'Epilogue\n\nThe journey of digital creation never truly ends.'
      ],
      color: 0x4682B4
    },
    {
      id: '3',
      title: 'Web Development Mastery',
      pages: [
        'Master the art of web development with modern tools and techniques.',
        'Chapter 1: HTML & CSS\n\nThe foundation of every web page starts with structure and style.',
        'Chapter 2: JavaScript\n\nBringing interactivity and dynamic behavior to your websites.',
        'Chapter 3: React & Next.js\n\nBuilding powerful, scalable web applications.',
        'Chapter 4: Backend Development\n\nServers, databases, and APIs that power modern web apps.',
        'Final Thoughts\n\nWeb development is an ever-evolving field full of opportunities.'
      ],
      color: 0x32CD32
    }
  ];

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

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const books: THREE.Mesh[] = [];
    const bookCount = 20;

    const createBookGeometry = () => {
      const geometry = new THREE.BoxGeometry(1, 1.5, 0.15);
      return geometry;
    };

    for (let i = 0; i < bookCount; i++) {
      const bookGeometry = createBookGeometry();
      const bookDataItem = bookData[i % bookData.length];
      const bookMaterial = new THREE.MeshPhongMaterial({ 
        color: bookDataItem.color,
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
        initialPosition: { ...book.position },
        bookData: bookDataItem
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

    const handleClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(books);

      if (intersects.length > 0) {
        const clickedBook = intersects[0].object as THREE.Mesh;
        const bookData = clickedBook.userData.bookData;
        setSelectedBook(bookData);
        setShowFlipBook(true);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(books);

      books.forEach((book) => {
        const material = book.material as THREE.MeshPhongMaterial;
        material.emissive.setHex(0x000000);
        book.scale.set(1, 1, 1);
      });

      if (intersects.length > 0) {
        const hoveredBook = intersects[0].object as THREE.Mesh;
        const material = hoveredBook.material as THREE.MeshPhongMaterial;
        material.emissive.setHex(0x222222);
        hoveredBook.scale.set(1.2, 1.2, 1.2);
        renderer.domElement.style.cursor = 'pointer';
      } else {
        renderer.domElement.style.cursor = 'default';
      }
    };

    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    renderer.domElement.addEventListener('click', handleClick);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
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

  const handleCloseBook = () => {
    setShowFlipBook(false);
    setSelectedBook(null);
  };

  return (
    <>
      <div 
        ref={mountRef} 
        className="absolute inset-0 overflow-hidden"
        style={{ zIndex: -1 }}
      />
      
      <div className="absolute bottom-8 left-8 z-10 text-white/70 text-sm backdrop-blur-sm bg-black/20 px-4 py-2 rounded-lg">
        💡 Click on books to read them!
      </div>
      
      {showFlipBook && selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative">
            <button
              onClick={handleCloseBook}
              className="absolute -top-10 -right-10 z-10 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              ✕ Close
            </button>
            <PageFlipBook
              pages={selectedBook.pages}
              width={400}
              height={500}
              onFlip={(pageObject) => {
                console.log('Page flipped:', pageObject);
              }}
            />
          </div>
        </div>
      )}
      
    </>
  );
};

export default InteractiveBookCloud;