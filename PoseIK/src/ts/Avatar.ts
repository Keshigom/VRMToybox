import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRM } from '@pixiv/three-vrm';

import { VrmIK } from './IK';

export class Avatar {

    private _scene: THREE.Scene;
    private _vrm: VRM;
    private _vrmIK: VrmIK;

    constructor(scene: THREE.Scene) {
        this._scene = scene;
        this._vrm = null;
    }

    // VRMの読み込み
    public async loadVRM(url: string) {

        if (this._vrm) {
            this._scene.remove(this._vrm.scene);
            this._vrm.dispose();
        }

        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync(url);
        const vrm = await VRM.from(gltf);
        this._scene.add(vrm.scene);
        this._vrm = vrm;

        this._vrmIK = new VrmIK(vrm);
    }

    public update() {
        //this._vrm.update(deltaTime);

        if (!!this._vrmIK)
            this._vrmIK.solve();
    }
}
