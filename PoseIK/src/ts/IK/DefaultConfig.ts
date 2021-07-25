import { Vector3 } from 'three';
import { VRM, VRMSchema } from '@pixiv/three-vrm';
import { IKConfig } from './IKSolver';


/*
example
{
    iteration:number,   // 反復回数
    chainConfigs:[      // IKチェイン 
        {
            jointConfigs:[  // 手先から根本
                {},         // Effectorの親
                            // ||
                            // V
                {           // RootBone
                    boneName:  VRMSchema.HumanoidBoneName.Hoge,
                    order: 'XYZ',   // 回転順序
                    rotationMin: new Vector3(-Math.PI,0,0)    // 最小 回転角制限  -Pi ~ Pi
                    rotationMax: new Vector3(Math.PI,0,0)    // 最大 回転角制限  -Pi ~ Pi
                }          
            ],
            effecotrBoneName:,
        },
    ]
}
*/

// VRM0.xの必須ボーンのみで構成
export const defaultIKConfig: IKConfig = {
    iteration: 8,
    chainConfigs: [
        // Hip -> Head
        {
            jointConfigs: [

                {
                    boneName: VRMSchema.HumanoidBoneName.Chest,
                    order: 'XYZ',
                    rotationMin: new Vector3(-Math.PI, -Math.PI, -Math.PI),
                    rotationMax: new Vector3(Math.PI, Math.PI, Math.PI),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.Spine,
                    order: 'XYZ',
                    rotationMin: new Vector3(-Math.PI, -Math.PI, -Math.PI),
                    rotationMax: new Vector3(Math.PI, Math.PI, Math.PI),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.Hips,
                    order: 'XYZ',
                    rotationMin: new Vector3(-Math.PI, -Math.PI, -Math.PI),
                    rotationMax: new Vector3(Math.PI, Math.PI, Math.PI),
                },
            ],
            effectorBoneName: VRMSchema.HumanoidBoneName.Neck,
        },
        // Left Shoulder -> Hand
        {
            jointConfigs: [
                {
                    boneName: VRMSchema.HumanoidBoneName.LeftLowerArm,
                    order: 'YZX',
                    rotationMin: new Vector3(0, -Math.PI, 0),
                    rotationMax: new Vector3(0, -(0.1 / 180) * Math.PI, 0),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.LeftUpperArm,
                    order: 'ZXY',
                    rotationMin: new Vector3(-Math.PI / 2, -Math.PI, - Math.PI),
                    rotationMax: new Vector3(Math.PI / 2, Math.PI, Math.PI),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.LeftShoulder,
                    order: 'ZXY',
                    rotationMin: new Vector3(0, -(45 / 180) * Math.PI, -(45 / 180) * Math.PI),
                    rotationMax: new Vector3(0, (45 / 180) * Math.PI, 0),
                }
            ],
            effectorBoneName: VRMSchema.HumanoidBoneName.LeftHand
        },
        // Right Shoulder -> Hand
        {
            jointConfigs: [
                {
                    boneName: VRMSchema.HumanoidBoneName.RightLowerArm,
                    order: 'YZX',
                    rotationMin: new Vector3(0, (0.1 / 180) * Math.PI, 0),
                    rotationMax: new Vector3(0, Math.PI, 0),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.RightUpperArm,
                    order: 'ZXY',
                    rotationMin: new Vector3(-Math.PI / 2, -Math.PI, -Math.PI),
                    rotationMax: new Vector3(Math.PI / 2, Math.PI, Math.PI),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.RightShoulder,
                    order: 'ZXY',
                    rotationMin: new Vector3(0, -(45 / 180) * Math.PI, 0),
                    rotationMax: new Vector3(0, (45 / 180) * Math.PI, (45 / 180) * Math.PI),
                },
            ],
            effectorBoneName: VRMSchema.HumanoidBoneName.RightHand
        },
        // Left Leg
        {
            jointConfigs: [
                {
                    boneName: VRMSchema.HumanoidBoneName.LeftLowerLeg,
                    order: 'XYZ',
                    rotationMin: new Vector3(-Math.PI, 0, 0),
                    rotationMax: new Vector3(0, 0, 0),

                },
                {
                    boneName: VRMSchema.HumanoidBoneName.LeftUpperLeg,
                    order: 'XYZ',
                    rotationMin: new Vector3(-Math.PI, -Math.PI, -Math.PI),
                    rotationMax: new Vector3(Math.PI, Math.PI, Math.PI),
                },
            ],
            effectorBoneName: VRMSchema.HumanoidBoneName.LeftFoot
        },
        // Right Leg
        {
            jointConfigs: [
                {
                    boneName: VRMSchema.HumanoidBoneName.RightLowerLeg,
                    order: 'XYZ',
                    rotationMin: new Vector3(-Math.PI, 0, 0),
                    rotationMax: new Vector3(0, 0, 0),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.RightUpperLeg,
                    order: 'XYZ',
                    rotationMin: new Vector3(-Math.PI, -Math.PI, -Math.PI),
                    rotationMax: new Vector3(Math.PI, Math.PI, Math.PI),
                },
            ],
            effectorBoneName: VRMSchema.HumanoidBoneName.RightFoot
        },
    ]
};