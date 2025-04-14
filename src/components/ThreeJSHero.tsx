
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ThreeJSHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const torusRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameId = useRef<number | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  // Setup mouse tracking
  const handleMouseMove = (event: MouseEvent) => {
    mousePosition.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1
    };
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 5);
    scene.add(directionalLight);
    
    // Create objects
    // Main product (using a sphere as placeholder - would be replaced with actual 3D model)
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x3366FF,
      metalness: 0.3,
      roughness: 0.4,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    sphereRef.current = sphere;
    
    // Background element
    const torusGeometry = new THREE.TorusGeometry(2, 0.2, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF6633,
      metalness: 0.5,
      roughness: 0.3,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.z = -2;
    scene.add(torus);
    torusRef.current = torus;
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;
    
    // Animation with GSAP
    gsap.fromTo(
      sphere.position,
      { y: -10 },
      { y: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)' }
    );
    
    gsap.fromTo(
      torus.rotation,
      { x: Math.PI * 2 },
      { x: 0, duration: 2, ease: 'power3.out' }
    );
    
    gsap.fromTo(
      particles.position,
      { z: -10 },
      { z: 0, duration: 2, ease: 'power2.out' }
    );
    
    // Animation loop
    const animate = () => {
      if (sphereRef.current && torusRef.current && particlesRef.current) {
        // Make objects responsive to mouse position
        sphereRef.current.rotation.y += 0.005;
        sphereRef.current.rotation.x += 0.002;
        sphereRef.current.position.x = mousePosition.current.x * 0.5;
        sphereRef.current.position.y = mousePosition.current.y * 0.5;
        
        torusRef.current.rotation.x += 0.002;
        torusRef.current.rotation.y += 0.005;
        
        particlesRef.current.rotation.y += 0.001;
        particlesRef.current.position.x = mousePosition.current.x * 0.05;
        particlesRef.current.position.y = mousePosition.current.y * 0.05;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      frameId.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of geometries and materials
      if (sphereRef.current) {
        sphereRef.current.geometry.dispose();
        (sphereRef.current.material as THREE.Material).dispose();
      }
      
      if (torusRef.current) {
        torusRef.current.geometry.dispose();
        (torusRef.current.material as THREE.Material).dispose();
      }
      
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
      }
    };
  }, []);
  
  return <div ref={containerRef} className="w-full h-screen absolute top-0 left-0 -z-10" />;
};

export default ThreeJSHero;
