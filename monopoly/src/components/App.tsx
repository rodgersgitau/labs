import { ReactNode } from "react";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import MainMenu from "../views/MainMenu";

const Experience = ({ children }: { children?: ReactNode }) => {
  return (
    <Canvas shadows camera={{ position: [-5, 1, 6], fov: 25 }}>
      <OrbitControls />
      <ambientLight intensity={0.2} />
      <Environment preset="sunset" blur={0.8} />
      <group position={[0, -1, 0]}>{children}</group>
    </Canvas>
  );
};

function App() {
  return (
    <main className="relative z-0 min-h-screen text-white bg-secondary">
      <div className="fixed inset-0 bg-bottom bg-no-repeat bg-hero-pattern">
        <MainMenu />
      </div>
    </main>
  );
}

export default App;
