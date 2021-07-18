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
                    boneName: VRMSchema.HumanoidBoneName.Neck,
                    rotationMin: new Vector3(-Math.PI, -Math.PI, -Math.PI),
                    rotationMax: new Vector3(Math.PI, Math.PI, Math.PI),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.Chest,
                    rotationMin: new Vector3(-Math.PI, -Math.PI, -Math.PI),
                    rotationMax: new Vector3(Math.PI, Math.PI, Math.PI),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.Spine,
                    rotationMin: new Vector3(-Math.PI, -Math.PI, -Math.PI),
                    rotationMax: new Vector3(Math.PI, Math.PI, Math.PI),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.Hips,
                    rotationMin: new Vector3(-Math.PI, -Math.PI, -Math.PI),
                    rotationMax: new Vector3(Math.PI, Math.PI, Math.PI),
                },
            ],
            effectorBoneName: VRMSchema.HumanoidBoneName.Head
        },
        // Left Shoulder -> Hand
        {
            jointConfigs: [
                {
                    boneName: VRMSchema.HumanoidBoneName.LeftLowerArm,
                    rotationMin: new Vector3(0, -Math.PI, 0),
                    rotationMax: new Vector3(Math.PI, 0, Math.PI),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.LeftUpperArm,
                    rotationMin: new Vector3(-(120 / 180) * Math.PI, 0, 0),
                    rotationMax: new Vector3((120 / 180) * Math.PI, 0, (45 / 180) * Math.PI),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.LeftShoulder,
                    rotationMin: new Vector3(0, 0, -(45 / 180) * Math.PI),
                    rotationMax: new Vector3(0, 0, 0),
                }
            ],
            effectorBoneName: VRMSchema.HumanoidBoneName.LeftHand
        },
        // Right Shoulder -> Hand
        {
            jointConfigs: [
                {
                    boneName: VRMSchema.HumanoidBoneName.RightLowerArm,
                    rotationMin: new Vector3(0, 0, -Math.PI),
                    rotationMax: new Vector3(Math.PI, Math.PI, 0),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.RightUpperArm,
                    rotationMin: new Vector3(-(120 / 180) * Math.PI, 0, 0),
                    rotationMax: new Vector3((120 / 180) * Math.PI, 0, (45 / 180) * Math.PI),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.RightShoulder,
                    rotationMin: new Vector3(0, 0, 0),
                    rotationMax: new Vector3(0, 0, (45 / 180) * Math.PI),
                },
            ],
            effectorBoneName: VRMSchema.HumanoidBoneName.RightHand
        },
        // Left Leg
        {
            jointConfigs: [
                {
                    boneName: VRMSchema.HumanoidBoneName.LeftLowerLeg,
                    rotationMin: new Vector3(-Math.PI, 0, 0),
                    rotationMax: new Vector3(0, 0, 0),

                },
                {
                    boneName: VRMSchema.HumanoidBoneName.LeftUpperLeg,
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
                    rotationMin: new Vector3(-Math.PI, 0, 0),
                    rotationMax: new Vector3(0, 0, 0),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.RightUpperLeg,
                    rotationMin: new Vector3(-Math.PI, -Math.PI, -Math.PI),
                    rotationMax: new Vector3(Math.PI, Math.PI, Math.PI),
                },
            ],
            effectorBoneName: VRMSchema.HumanoidBoneName.RightFoot
        },
    ]
};