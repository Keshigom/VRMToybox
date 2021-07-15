import { Vector3 } from 'three';
import { VRM, VRMSchema } from '@pixiv/three-vrm';
import { IKConfig } from './IKSolver';


export const defaultIKConfig: IKConfig = {
    iteration: 128,
    chainConfigs: [
        {
            jointConfigs: [
                {
                    boneName: VRMSchema.HumanoidBoneName.Head,
                    rotationMin: new Vector3(),
                    rotationMax: new Vector3(),
                }
            ],
            effectorBoneName: VRMSchema.HumanoidBoneName.Head
        }
    ]
};