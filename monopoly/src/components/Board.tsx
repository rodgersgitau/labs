import { FC, useRef } from "react";

import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const Board: FC = () => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="w-full h-full p-4 bg-white rounded">
      <Canvas>
        <ambientLight />
        <group args={[]}>
          <mesh>
            <planeGeometry attach="geometry" args={[15, 25]}></planeGeometry>
            <meshBasicMaterial attach="material" color="#d2e5d2" />
          </mesh>
          <mesh>
            <Box args={[1.5, 1.5]} position={[0, 0, 0]} />
            <meshBasicMaterial attach="material" wireframe color="red" />
          </mesh>
        </group>
      </Canvas>
    </div>
  );
};

export default Board;
