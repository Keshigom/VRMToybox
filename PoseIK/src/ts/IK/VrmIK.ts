import { VRM } from '@pixiv/three-vrm';
import { IKChain, IKConfig } from './IKSolver';
import { defaultIKConfig } from './DefaultConfig';


export class VrmIK {

    private chains: Array<IKChain>;

    constructor(vrm: VRM, ikConfig: IKConfig = defaultIKConfig) {
        ikConfig.chainConfigs.map((chainConfig) => {

        })

    }

    private createIKChain() { }

    public solve() {

    }
}

