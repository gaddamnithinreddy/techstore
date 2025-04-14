
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Palette } from 'lucide-react';

interface InteractiveProductViewerProps {
  productId: string;
}

const InteractiveProductViewer = ({ productId }: InteractiveProductViewerProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const productRef = useRef<THREE.Mesh | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const [color, setColor] = useState('#7c3aed'); // Default purple
  const colors = ['#7c3aed', '#2563eb', '#10b981', '#ef4444', '#f97316'];
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111827);
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
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 10;
    controls.minDistance = 2;
    controlsRef.current = controls;
    
    // Create product model - we'll use a smartphone as an example
    const createProduct = () => {
      // Create a group to hold the phone parts
      const phoneGroup = new THREE.Group();
      
      // Phone body
      const bodyGeometry = new THREE.BoxGeometry(2, 4, 0.2);
      const bodyMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 0.7,
        roughness: 0.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      phoneGroup.add(body);
      
      // Screen
      const screenGeometry = new THREE.BoxGeometry(1.85, 3.8, 0.05);
      const screenMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        metalness: 0.1,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9,
        emissive: 0x222222,
        emissiveIntensity: 0.2,
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.z = 0.11;
      phoneGroup.add(screen);
      
      // Camera bump
      const cameraBumpGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.1);
      const cameraBumpMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color).multiplyScalar(0.9),
        metalness: 0.8,
        roughness: 0.2,
      });
      const cameraBump = new THREE.Mesh(cameraBumpGeometry, cameraBumpMaterial);
      cameraBump.position.set(0.6, 1.5, -0.15);
      phoneGroup.add(cameraBump);
      
      // Camera lens
      const lensGeometry = new THREE.CircleGeometry(0.15, 32);
      const lensMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x333333,
        metalness: 0.9,
        roughness: 0.1,
      });
      const lens = new THREE.Mesh(lensGeometry, lensMaterial);
      lens.position.set(0.6, 1.5, -0.1);
      lens.rotation.x = -Math.PI / 2;
      phoneGroup.add(lens);
      
      // Buttons on the side
      const buttonGeometry = new THREE.BoxGeometry(0.05, 0.3, 0.05);
      const buttonMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x999999,
        metalness: 0.8,
        roughness: 0.2,
      });
      
      // Volume up
      const volumeUp = new THREE.Mesh(buttonGeometry, buttonMaterial);
      volumeUp.position.set(-1, 0.5, 0);
      phoneGroup.add(volumeUp);
      
      // Volume down
      const volumeDown = new THREE.Mesh(buttonGeometry, buttonMaterial);
      volumeDown.position.set(-1, 0, 0);
      phoneGroup.add(volumeDown);
      
      // Power button
      const powerButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
      powerButton.position.set(1, 0.25, 0);
      phoneGroup.add(powerButton);
      
      // Add the assembled phone to the scene
      scene.add(phoneGroup);
      
      // Store reference for later updates
      productRef.current = body as THREE.Mesh;
      
      return phoneGroup;
    };
    
    const phoneGroup = createProduct();
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light with shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Add a spotlight
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(-5, 5, 5);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.2;
    scene.add(spotLight);
    
    // Create a subtle environment
    const environmentGeometry = new THREE.PlaneGeometry(20, 20);
    const environmentMaterial = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.8,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });
    const environment = new THREE.Mesh(environmentGeometry, environmentMaterial);
    environment.rotation.x = Math.PI / 2;
    environment.position.y = -3;
    environment.receiveShadow = true;
    scene.add(environment);
    
    // Add some floating particles for a futuristic effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.5,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Animation function
    const animate = () => {
      if (!sceneRef.current || !rendererRef.current || !cameraRef.current || !controlsRef.current) return;
      
      // Rotate the particles
      particlesMesh.rotation.y += 0.0005;
      
      // Update controls
      controlsRef.current.update();
      
      // Render
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Add intro animation
    gsap.fromTo(
      phoneGroup.rotation,
      { y: -Math.PI },
      { y: 0, duration: 1.5, ease: "power3.out" }
    );
    
    gsap.fromTo(
      phoneGroup.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1, ease: "back.out(1.7)" }
    );
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      // Dispose of all scene objects
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            
            if (object.material instanceof THREE.Material) {
              object.material.dispose();
            } else if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            }
          }
        });
      }
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      rendererRef.current?.dispose();
      controlsRef.current?.dispose();
    };
  }, [productId]);
  
  // Update product color
  useEffect(() => {
    if (productRef.current && productRef.current.material) {
      (productRef.current.material as THREE.MeshPhysicalMaterial).color.set(color);
    }
  }, [color]);
  
  // Zoom in function
  const handleZoomIn = () => {
    if (controlsRef.current) {
      const newDistance = Math.max(controlsRef.current.getDistance() - 1, controlsRef.current.minDistance);
      gsap.to(cameraRef.current!.position, {
        x: cameraRef.current!.position.x * (newDistance / controlsRef.current.getDistance()),
        y: cameraRef.current!.position.y * (newDistance / controlsRef.current.getDistance()),
        z: cameraRef.current!.position.z * (newDistance / controlsRef.current.getDistance()),
        duration: 0.5,
        ease: "power2.out",
        onUpdate: () => controlsRef.current!.update()
      });
    }
  };
  
  // Zoom out function
  const handleZoomOut = () => {
    if (controlsRef.current) {
      const newDistance = Math.min(controlsRef.current.getDistance() + 1, controlsRef.current.maxDistance);
      gsap.to(cameraRef.current!.position, {
        x: cameraRef.current!.position.x * (newDistance / controlsRef.current.getDistance()),
        y: cameraRef.current!.position.y * (newDistance / controlsRef.current.getDistance()),
        z: cameraRef.current!.position.z * (newDistance / controlsRef.current.getDistance()),
        duration: 0.5,
        ease: "power2.out",
        onUpdate: () => controlsRef.current!.update()
      });
    }
  };
  
  // Reset view
  const handleReset = () => {
    if (cameraRef.current && controlsRef.current) {
      gsap.to(cameraRef.current.position, {
        x: 0,
        y: 0,
        z: 5,
        duration: 1,
        ease: "power2.inOut",
        onUpdate: () => controlsRef.current!.update()
      });
      
      if (productRef.current) {
        gsap.to(productRef.current.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
          ease: "power2.inOut"
        });
      }
    }
  };
  
  // Full screen
  const handleFullScreen = () => {
    if (mountRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        mountRef.current.requestFullscreen();
      }
    }
  };
  
  return (
    <div className="relative">
      <div ref={mountRef} className="w-full h-[500px] rounded-xl overflow-hidden" />
      
      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur-sm rounded-full p-2">
        <Button variant="outline" size="icon" className="text-white border-white/20" onClick={handleZoomIn}>
          <ZoomIn size={18} />
        </Button>
        <Button variant="outline" size="icon" className="text-white border-white/20" onClick={handleZoomOut}>
          <ZoomOut size={18} />
        </Button>
        <Button variant="outline" size="icon" className="text-white border-white/20" onClick={handleReset}>
          <RotateCcw size={18} />
        </Button>
        <Button variant="outline" size="icon" className="text-white border-white/20" onClick={handleFullScreen}>
          <Maximize2 size={18} />
        </Button>
      </div>
      
      {/* Color options */}
      <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-sm rounded-full p-2">
        <div className="flex flex-col gap-2 items-center">
          <Palette size={16} className="text-white mb-1" />
          {colors.map((c) => (
            <button
              key={c}
              className={`w-5 h-5 rounded-full transition-transform ${color === c ? 'scale-125 ring-2 ring-white' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute top-6 left-6 bg-black/30 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
        <p>👆 Click and drag to rotate</p>
        <p>👆 Scroll to zoom</p>
        <p>👆 Try changing the color!</p>
      </div>
    </div>
  );
};

export default InteractiveProductViewer;
