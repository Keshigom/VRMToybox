import * as THREE from 'three';
import { VRM, VRMSchema } from '@pixiv/three-vrm';




// 計算用の一時的な変数
// 不要なインスタンス化をさける
const _goalPosition = new THREE.Vector3();
const _joint2GoalVector = new THREE.Vector3();
const _effectorPosition = new THREE.Vector3();
const _joint2EffectorVector = new THREE.Vector3();
const _jointPosition = new THREE.Vector3();
const _jointQuaternionInverse = new THREE.Quaternion();
const _jointScale = new THREE.Vector3();
const _axis = new THREE.Vector3();
const _vector = new THREE.Vector3();
const _quarternion = new THREE.Quaternion();

export const solve = (ikChain: IKChain, iteration: number) => {

    // 目標位置のワールド座標
    ikChain.goal.getWorldPosition(_goalPosition);

    for (let i = iteration; i > 0; i--) {

        let didConverge = true;
        ikChain.joints.forEach((joint) => {

            // 注目関節のワールド座標・姿勢等を取得する
            joint.bone.matrixWorld.decompose(_jointPosition, _jointQuaternionInverse, _jointScale);
            _jointQuaternionInverse.invert();

            //  注目関節 -> エフェクタのベクトル
            ikChain.effector.getWorldPosition(_effectorPosition);
            _joint2EffectorVector.subVectors(_effectorPosition, _jointPosition);
            _joint2EffectorVector.applyQuaternion(_jointQuaternionInverse);
            _joint2EffectorVector.normalize();

            // 注目関節 -> 目標位置のベクトル
            _joint2GoalVector.subVectors(_goalPosition, _jointPosition);
            _joint2GoalVector.applyQuaternion(_jointQuaternionInverse);
            _joint2GoalVector.normalize();

            // cos rad
            let deltaAngle = _joint2GoalVector.dot(_joint2EffectorVector);

            // TODO: 必要か考える
            if (deltaAngle > 1.0) {
                deltaAngle = 1.0;
            } else if (deltaAngle < -1.0) {
                deltaAngle = - 1.0;
            }

            // rad
            deltaAngle = Math.acos(deltaAngle);

            // 振動回避
            if (deltaAngle < 1e-5) {
                return;
            }

            // TODO:微小回転量の制限

            // 回転軸
            _axis.crossVectors(_joint2EffectorVector, _joint2GoalVector);
            _axis.normalize();

            // 回転
            _quarternion.setFromAxisAngle(_axis, deltaAngle);
            joint.bone.quaternion.multiply(_quarternion);

            // 回転角・軸制限
            joint.bone.rotation.setFromVector3(
                joint.bone.rotation.toVector3(_vector).max(joint.rotationMin).min(joint.rotationMax)
            );

            joint.bone.updateMatrixWorld(true);
            didConverge = false;
        });

        if (didConverge)
            break;
    }
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

