"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const geometries = [
  {
    position: [0, 0, 0],
    r: 0.3,
    geometry: new THREE.IcosahedronGeometry(3),
  },
  {
    position: [2, -1.2, 8],
    r: 0.9,
    geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16),
  },
  {
    position: [-2.8, 4, -7],
    r: 0.6,
    geometry: new THREE.DodecahedronGeometry(1.5),
  },
  {
    position: [-1.6, -1, 10],
    r: 0.5,
    geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32),
  },
  {
    position: [3.2, 3.2, -8],
    r: 0.7,
    geometry: new THREE.OctahedronGeometry(1.5),
  },
];

export default function Shapes() {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  const [konamiIndex, setKonamiIndex] = useState(0);
  const meshRefs = useRef([]);
  
  // Store initial positions and rotations
  const initialStates = useRef(geometries.map(g => ({
    position: [...g.position],
    rotation: [0, 0, 0],
    scale: [1, 1, 1]
  })));

  const addMeshRef = (mesh, index) => {
    meshRefs.current[index] = mesh;
  };

  const resetShapes = () => {
    meshRefs.current.forEach((mesh, index) => {
      if (mesh) {
        const initialState = initialStates.current[index];
        gsap.to(mesh.position, {
          x: initialState.position[0],
          y: initialState.position[1],
          z: initialState.position[2],
          duration: 2,
          ease: "elastic.out(1, 0.3)"
        });
        gsap.to(mesh.rotation, {
          x: initialState.rotation[0],
          y: initialState.rotation[1],
          z: initialState.rotation[2],
          duration: 2,
          ease: "elastic.out(1, 0.3)"
        });
        gsap.to(mesh.scale, {
          x: initialState.scale[0],
          y: initialState.scale[1],
          z: initialState.scale[2],
          duration: 2,
          ease: "elastic.out(1, 0.3)"
        });
      }
    });
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        if (konamiIndex === konamiCode.length - 1) {
          console.log('BOOM! Konami code activated!');
          setKonamiActivated(true);
          
          // Trigger explosion animation
          meshRefs.current.forEach((mesh) => {
            if (mesh) {
              gsap.to(mesh.position, {
                x: (Math.random() - 0.5) * 10,
                y: (Math.random() - 0.5) * 10,
                z: (Math.random() - 0.5) * 10,
                duration: 2,
                ease: "power4.out"
              });
              gsap.to(mesh.rotation, {
                x: Math.random() * Math.PI * 4,
                y: Math.random() * Math.PI * 4,
                z: Math.random() * Math.PI * 4,
                duration: 2,
                ease: "power4.out"
              });
            }
          });

          // Reset after 3 seconds
          setTimeout(() => {
            resetShapes();
            setKonamiActivated(false);
          }, 3000);
        }
        setKonamiIndex((prev) => prev + 1);
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [konamiIndex]);

  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries addMeshRef={addMeshRef} />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={10}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries({ addMeshRef }) {
  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0 }),
    new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 }),
    new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x2980b9, roughness: 0, metalness: 0.4 }),
    new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.1, metalness: 0.4 }),
  ];

  const soundEffects = [
    new Audio("/sounds/Knock1.ogg"),
    new Audio("/sounds/Knock2.ogg"),
    new Audio("/sounds/Knock3.ogg"),
    new Audio("/sounds/Knock4.ogg"),
  ]

  return geometries.map((props, index) => (
    <Geometry
      key={JSON.stringify(props.position)}
      {...props}
      addMeshRef={addMeshRef}
      index={index}
      soundEffects={soundEffects}
      materials={materials}
    />
  ));
}

function Geometry({ r, position, geometry, materials, soundEffects, addMeshRef, index }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);

  const startingMaterial = getRandomMaterial();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(1, 1, 1);
      addMeshRef(meshRef.current, index);
    }
  }, [addMeshRef, index]);

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  function handleClick(e) {
    const mesh = e.object;

    gsap.utils.random(soundEffects).play();

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 2,
      ease: "elastic.out(1, 0.3)",
      yoyo: true,
    });

    mesh.material = getRandomMaterial();
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };
  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
        delay: 0.1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntesity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          material={startingMaterial}
          visible={visible}
        />
      </Float>
    </group>
  );
}
