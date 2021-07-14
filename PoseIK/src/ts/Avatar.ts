import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRM } from '@pixiv/three-vrm';

export class Avatar {

    private _scene: THREE.Scene;
    private _vrm: VRM;

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
    }
}
