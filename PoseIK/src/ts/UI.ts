import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { Avatar } from './Avatar';
import { Viewer } from './Viewer';


export const setupIKController = (viewer: Viewer, avatar: Avatar) => {

    avatar.vrmIK.ikChains.forEach(chain => {
        // test Obj
        const transCtrl = new TransformControls(viewer.camera, viewer.canvas);

        transCtrl.attach(chain.goal);
        transCtrl.addEventListener('dragging-changed', event => {
            viewer.orbitControl.enabled = !event.value;
        });
        viewer.scene.add(transCtrl);
        // 
    });
}