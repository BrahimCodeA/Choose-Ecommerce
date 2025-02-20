import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Left_air_jordan1_Off_White_NIKE_Blue_lambert3_0: THREE.Mesh;
    Left_air_jordan1_Off_White_NIKE_Blue1_ffinitialShadingGroup1_0: THREE.Mesh;
  };
  materials: {
    lambert3: THREE.MeshBasicMaterial;
    ffinitialShadingGroup1: THREE.MeshBasicMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/nike_air_jordan_1_off-white_nike_blue/scene.gltf"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes.Left_air_jordan1_Off_White_NIKE_Blue_lambert3_0.geometry
          }
          material={materials.lambert3}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes.Left_air_jordan1_Off_White_NIKE_Blue1_ffinitialShadingGroup1_0
              .geometry
          }
          material={materials.ffinitialShadingGroup1}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/nike_air_jordan_1_off-white_nike_blue/scene.gltf");
