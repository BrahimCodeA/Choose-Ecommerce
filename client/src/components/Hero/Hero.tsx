import "./Hero.scss";
import { Model_One } from "../Model3D/Model_One";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Hero() {
  return (
    <div className="hero-container">
      <h1 className="hero-title">Elevate Your Look</h1>
      <div className="canvas-container">
        <Canvas camera={{ position: [1, 2, 2] }}>
          <OrbitControls enableZoom={false} enablePan={false} />
          <Model_One scale={[13, 13, 13]} position={[0, -1, 0]} />
        </Canvas>
      </div>
    </div>
  );
}
