
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
// Fix the import path for OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ProductViewer3DProps {
  productId: string;
  modelPath?: string;
}

// Default 3D model paths based on product categories
const defaultModels: Record<string, string> = {
  '1': '/models/headphones.gltf', // Headphones
  '2': '/models/smartwatch.gltf', // Smart Watch
  '3': '/models/speaker.gltf', // Bluetooth Speaker
  '4': '/models/earbuds.gltf', // Earbuds
  '5': '/models/smarthome.gltf', // Smart Home Hub
  '6': '/models/mouse.gltf', // Gaming Mouse
  '7': '/models/laptop.gltf', // Laptop
  '8': '/models/charger.gltf', // Charging Pad
  '9': '/models/camera.gltf', // Camera
  '10': '/models/fitnesstracker.gltf', // Fitness Tracker
  '11': '/models/keyboard.gltf', // Keyboard
  '12': '/models/monitor.gltf', // Monitor
  // New products
  '13': '/models/smartphone.gltf', // Smartphone
  '14': '/models/tablet.gltf', // Tablet
  '15': '/models/vr.gltf', // VR Headset
};

const ProductViewer3D = ({ productId, modelPath }: ProductViewer3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  // Use the proper OrbitControls type from Three.js
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameIdRef = useRef<number | null>(null);
  
  // Determine which model to use
  const modelToLoad = modelPath || defaultModels[productId] || defaultModels['1'];
  
  // For products without specific models, create a placeholder visualization
  const createPlaceholderModel = () => {
    if (!sceneRef.current) return;
    
    // Create a group to hold all the objects
    const group = new THREE.Group();
    
    // Create a placeholder shape based on product ID
    const productIdNum = parseInt(productId);
    let geometry;
    
    // Different shapes based on product ID modulo 5
    switch (productIdNum % 5) {
      case 0:
        geometry = new THREE.BoxGeometry(1, 1, 1);
        break;
      case 1:
        geometry = new THREE.SphereGeometry(0.7, 32, 32);
        break;
      case 2:
        geometry = new THREE.TorusGeometry(0.7, 0.3, 16, 100);
        break;
      case 3:
        geometry = new THREE.ConeGeometry(0.7, 1.5, 32);
        break;
      case 4:
        geometry = new THREE.CylinderGeometry(0.7, 0.7, 1.5, 32);
        break;
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }
    
    // Create a material with a nice color
    const hue = (productIdNum * 20) % 360;
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(`hsl(${hue}, 70%, 50%)`),
      metalness: 0.2,
      roughness: 0.5,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);
    
    // Add some decorative elements
    const ringGeometry = new THREE.TorusGeometry(1.2, 0.05, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: new THREE.Color(`hsl(${hue}, 70%, 70%)`),
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.7
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
    
    // Animate the ring
    const animateRing = () => {
      if (ring) {
        ring.rotation.z += 0.01;
      }
    };
    
    // Add the group to the animation loop
    const animate = () => {
      if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;
      
      animateRing();
      group.rotation.y += 0.005;
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Add the group to the scene
    sceneRef.current.add(group);
    
    // Create ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);
    
    // Create directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    sceneRef.current.add(directionalLight);
    
    // Create a spotlight
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(5, 5, 5);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.2;
    sceneRef.current.add(spotLight);
  };
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    sceneRef.current = scene;
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    // Update: Using newer Three.js property
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create OrbitControls properly using the Three.js implementation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 10;
    controls.minDistance = 2;
    controlsRef.current = controls;
    
    // Add basic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Animation function
    const animate = () => {
      if (!scene || !renderer || !camera || !controls) return;
      
      controls.update();
      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    // Load model or create placeholder
    if (modelToLoad) {
      try {
        // In a real app, you would load GLTF models here 
        // We're using a placeholder for this demo
        createPlaceholderModel();
      } catch (error) {
        console.error("Error loading 3D model:", error);
        createPlaceholderModel();
      }
    } else {
      createPlaceholderModel();
    }
    
    // Start animation
    animate();
    
    // Add entrance animation
    gsap.fromTo(
      mountRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    );
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      renderer?.dispose();
      controls?.dispose();
    };
  }, [productId, modelToLoad]);
  
  return <div ref={mountRef} className="w-full h-96 sm:h-[500px] rounded-lg" />;
};

export default ProductViewer3D;
