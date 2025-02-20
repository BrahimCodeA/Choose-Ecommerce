import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Dior_x_Air_Jordan_1_High_OG_lambert2_0_1: THREE.Mesh;
    Dior_x_Air_Jordan_1_High_OG1_lambert2_0_1: THREE.Mesh;
  };
  materials: {
    lambert2: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/air_jordan_1_og_high_dior/scene.gltf"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group scale={100}>
          <group scale={0.01}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Dior_x_Air_Jordan_1_High_OG_lambert2_0_1.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes.Dior_x_Air_Jordan_1_High_OG1_lambert2_0_1.geometry
              }
              material={materials.lambert2}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/air_jordan_1_og_high_dior/scene.gltf");
