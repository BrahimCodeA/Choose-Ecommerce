import "./Hero.scss";
import { Model } from "../Model3D/Model";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Hero() {
  return (
    <div className="hero-container">
      <h1 className="hero-title">Elevate Your Look</h1>
      <div className="canvas-container">
        <Canvas camera={{ position: [1, 2, 2] }}>
          <OrbitControls enableZoom={false} enablePan={false} />
          <ambientLight intensity={10} />
          <Model scale={[10, 10, 10]} />
        </Canvas>
      </div>
    </div>
  );
}
