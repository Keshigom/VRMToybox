import * as THREE from 'three';
import { VRM } from '@pixiv/three-vrm';
import * as IKSolver from './IKSolver';
import { defaultIKConfig } from './DefaultConfig';


export class VrmIK {

    private _chains: Array<IKSolver.IKChain>;
    private _iteration: number;

    constructor(vrm: VRM, ikConfig: IKSolver.IKConfig = defaultIKConfig) {

        this._chains = ikConfig.chainConfigs.map((chainConfig) => {
            return this._createIKChain(vrm, chainConfig);
        });
        this._iteration = ikConfig.iteration || 1;
    }

    private _createIKChain(vrm: VRM, chainConfig: IKSolver.ChainConfig): IKSolver.IKChain {

        const goal = new THREE.Object3D();
        const effector = vrm.humanoid.getBoneNode(chainConfig.effectorBoneName);
        const joints = chainConfig.jointConfigs.map((jointConfig) => {
            return this._createJoint(vrm, jointConfig);
        });

        // test Obj
        const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        goal.add(cube);
        // 
        effector.getWorldPosition(goal.position);
        vrm.scene.add(goal);

        return {
            goal: goal,
            effector: effector,
            joints: joints
        }
    }

    private _createJoint(vrm: VRM, jointConfig: IKSolver.JointConfig): IKSolver.Joint {

        return {
            bone: vrm.humanoid.getBoneNode(jointConfig.boneName),
            rotationMin: jointConfig.rotationMin,
            rotationMax: jointConfig.rotationMax,
        }

    }

    // TODO: updateの方が良い？
    public solve() {
        this._chains.forEach(chain => {
            IKSolver.solve(chain, this._iteration);
        });
    }
}

