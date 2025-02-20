import "./Hero.scss";
import { Model } from "../Model3D/Model";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Hero() {
  return (
    <>
      <Canvas
        style={{
          height: "100vh",
          width: "100wh",
        }}
      >
        <OrbitControls />
        <ambientLight intensity={10} />
        <Model />
      </Canvas>
    </>
  );
}
