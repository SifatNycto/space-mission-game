
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'

// Solar panel wing
function SolarPanel({ position }) {
  const columns = 6
  const rows = 4

  return (
    <group position={position}>
      {/* Panel frame */}
      <mesh>
        <boxGeometry args={[2.4, 1.6, 0.06]} />
        <meshStandardMaterial color="#8995a8" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Individual solar cells */}
      {Array.from({ length: columns * rows }).map((_, index) => {
        const column = index % columns
        const row = Math.floor(index / columns)

        return (
          <mesh
            key={index}
            position={[
              -1 + column * 0.4,
              -0.6 + row * 0.4,
              0.045,
            ]}
          >
            <boxGeometry args={[0.37, 0.37, 0.025]} />
            <meshStandardMaterial
              color="#153c78"
              metalness={0.65}
              roughness={0.25}
              emissive="#071c45"
              emissiveIntensity={0.3}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Main spacecraft
function SatelliteModel({ spacecraft }) {
    const busScale =
        spacecraft.bus === 'lightweight'
            ? 0.75
            : spacecraft.bus === 'heavy'
                ? 1.3
                : 1
  return (
    <group rotation={[0.25, -0.35, 0]}>
      {/* Central spacecraft body */}
      <mesh scale={busScale}>
        <boxGeometry args={[1.25, 1.3, 1.15]} />
        <meshStandardMaterial
          color="#b9a77e"
          metalness={0.75}
          roughness={0.35}
        />
      </mesh>

      {/* Top equipment platform */}
      <mesh position={[0, 0.68, 0]}>
        <boxGeometry args={[1.05, 0.12, 0.95]} />
        <meshStandardMaterial color="#d5d8dc" metalness={0.8} />
      </mesh>

      {/* Gold thermal insulation details */}
      <mesh position={[0, 0, 0.59]}>
        <boxGeometry args={[0.85, 0.9, 0.035]} />
        <meshStandardMaterial
          color="#c69b45"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Solar panel support beams */}
      <mesh position={[1.35, 0, 0]}>
        <boxGeometry args={[1.5, 0.08, 0.08]} />
        <meshStandardMaterial color="#aeb8c5" metalness={0.9} />
      </mesh>

      <mesh position={[-1.35, 0, 0]}>
        <boxGeometry args={[1.5, 0.08, 0.08]} />
        <meshStandardMaterial color="#aeb8c5" metalness={0.9} />
      </mesh>

      {/* Solar panel wings */}
      <SolarPanel position={[2.55, 0, 0]} />
      <SolarPanel position={[-2.55, 0, 0]} />

      {/* Communication antenna support */}
      <mesh position={[0, 0.85, 0.55]}>
        <cylinderGeometry args={[0.035, 0.035, 0.65, 16]} />
        <meshStandardMaterial color="#c6cbd3" metalness={0.9} />
      </mesh>

      {/* High-gain antenna dish */}
      <group position={[0, 1.18, 0.55]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.48, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#d6dce4"
            metalness={0.9}
            roughness={0.2}
            side={2}
          />
        </mesh>

        <mesh position={[0, -0.1, 0.05]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#e5b85c" metalness={0.8} />
        </mesh>
      </group>

      {/* Scientific instrument */}
      <mesh position={[0.48, -0.35, 0.68]}>
        <cylinderGeometry args={[0.2, 0.24, 0.35, 32]} />
        <meshStandardMaterial color="#323b4a" metalness={0.8} />
      </mesh>

      {/* Instrument lens */}
      <mesh position={[0.48, -0.35, 0.88]}>
        <cylinderGeometry args={[0.14, 0.14, 0.04, 32]} />
        <meshStandardMaterial
          color="#397bb9"
          metalness={0.7}
          roughness={0.15}
          emissive="#143b70"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Small attitude-control thrusters */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 0.48, -0.72, 0.35]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.09, 0.13, 0.3, 16]} />
          <meshStandardMaterial color="#7d8794" metalness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

// 3D scene
function SpaceScene({ spacecraft }) {
  return (
    <>
      <color attach="background" args={['#050817']} />

      <ambientLight intensity={1.1} />

      <directionalLight
        position={[5, 7, 5]}
        intensity={2.5}
        castShadow
      />

      <pointLight position={[-5, 2, -4]} intensity={1.5} color="#638bff" />

      <Stars
        radius={100}
        depth={50}
        count={2500}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      <SatelliteModel spacecraft={spacecraft} />

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={4}
        maxDistance={12}
      />
    </>
  )
}

// Exported component
export default function Spacecraft3D({ spacecraft }) {
  return (
    <div style={{ width: '100%', height: '500px', borderRadius: '12px', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [5, 4, 7], fov: 45 }}
        shadows
      >
        <SpaceScene spacecraft={spacecraft} />
      </Canvas>
    </div>
  )
}
