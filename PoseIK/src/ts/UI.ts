import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { Avatar } from './Avatar';
import { Viewer } from './Viewer';


export const setupIKController = (viewer: Viewer, avatar: Avatar) => {

    avatar.vrmIK.ikChains.forEach(chain => {
        // test Obj
        const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        const transCtrl = new TransformControls(viewer.camera, viewer.canvas);

        transCtrl.attach(chain.goal);
        transCtrl.addEventListener('dragging-changed', event => {
            viewer.orbitControl.enabled = !event.value;
        });
        viewer.scene.add(transCtrl);
        chain.goal.add(cube);
        // 
    });
}