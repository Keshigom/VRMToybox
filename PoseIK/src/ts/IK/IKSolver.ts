import * as THREE from 'three';
import { VRM, VRMSchema } from '@pixiv/three-vrm';


// 計算用の一時的な変数
// 不要なインスタンス化をさける


export const solve = (ikChain: IKChain, iteration: number) => {

}


export interface IKChain {
    // TODO: goalPos: Vector3 とどちらが良いか考える。
    goal: THREE.Object3D;
    effector: THREE.Object3D; // VRM.VRMHumanoid.getBoneNode() で取得することを想定
    joints: Array<Joint>;
}

export interface Joint {
    bone: THREE.Object3D;
    rotationMin: THREE.Vector3;
    rotationMax: THREE.Vector3;
}

// VRM から IKChainを生成するための情報
export interface IKConfig {
    iteration: number;
    chainConfigs: Array<ChainConfig>;
}

export interface ChainConfig {
    jointConfigs: Array<JointConfig>;
    effectorBoneName: VRMSchema.HumanoidBoneName;   // IKChain.effectorに設定するボーン
}

export interface JointConfig {
    boneName: VRMSchema.HumanoidBoneName;
    // オイラー角による関節角度制限
    rotationMin: THREE.Vector3;    // -pi ~ pi
    rotationMax: THREE.Vector3;    // -pi ~ pi
}

