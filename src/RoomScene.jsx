import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Plane } from '@react-three/drei';

const getRandomPosition = (size) => ({
  x: Math.random() * size - size / 2,
  y: 0.5,
  z: Math.random() * size - size / 2
});

const Room = ({ size }) => {
  const objects = [];
  for (let i = 0; i < 20; i++) {
    const position = getRandomPosition(size - 4);
    objects.push(
      <Box key={`box-${i}`} position={[position.x, position.y, position.z]} args={[1, 1, 1]}>
        <meshStandardMaterial attach="material" color="orange" />
      </Box>
    );
  }

  return (
    <>
      {/* Floor */}
      <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} args={[size, size]}>
        <meshStandardMaterial attach="material" color="lightgrey" />
      </Plane>

      {/* Ceiling */}
      <Plane rotation={[Math.PI / 2, 0, 0]} position={[0, 10, 0]} args={[size, size]}>
        <meshStandardMaterial attach="material" color="white" />
      </Plane>

      {/* Walls */}
      <Plane rotation={[0, Math.PI / 2, 0]} position={[-size / 2, 5, 0]} args={[size, 10]}>
        <meshStandardMaterial attach="material" color="red" />
      </Plane>
      <Plane rotation={[0, -Math.PI / 2, 0]} position={[size / 2, 5, 0]} args={[size, 10]}>
        <meshStandardMaterial attach="material" color="red" />
      </Plane>
      <Plane rotation={[0, 0, 0]} position={[0, 5, -size / 2]} args={[size, 10]}>
        <meshStandardMaterial attach="material" color="green" />
      </Plane>
      <Plane rotation={[0, Math.PI, 0]} position={[0, 5, size / 2]} args={[size, 10]}>
        <meshStandardMaterial attach="material" color="green" />
      </Plane>

      {objects}
    </>
  );
};

const RoomScene = () => {
  const roomSize = 32; // roughly equivalent to 1000 sqft

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 15, 20], fov: 50 }}>
        <ambientLight intensity={1} />
        <spotLight position={[10, 20, 10]} angle={0.3} penumbra={1} castShadow />
        <Room size={roomSize} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default RoomScene;
