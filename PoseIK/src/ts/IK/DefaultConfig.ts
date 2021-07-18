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
    iteration: 128,
    chainConfigs: [
        // Left Hand
        {
            jointConfigs: [
                {
                    boneName: VRMSchema.HumanoidBoneName.LeftLowerArm,
                    rotationMin: new Vector3(-Math.PI, -Math.PI, -Math.PI),
                    rotationMax: new Vector3(Math.PI, Math.PI, Math.PI),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.LeftUpperArm,
                    rotationMin: new Vector3(-Math.PI, -Math.PI, -Math.PI),
                    rotationMax: new Vector3(Math.PI, Math.PI, Math.PI),
                },
                {
                    boneName: VRMSchema.HumanoidBoneName.LeftShoulder,
                    rotationMin: new Vector3(-Math.PI, -Math.PI, -Math.PI),
                    rotationMax: new Vector3(Math.PI, Math.PI, Math.PI),
                }
            ],
            effectorBoneName: VRMSchema.HumanoidBoneName.LeftHand
        }
    ]
};