import { Avatar } from './Avatar';
import { Viewer } from './Viewer';

window.addEventListener('DOMContentLoaded', () => {

    const viewerElement = document.getElementById('viewer');
    const viewer = new Viewer(viewerElement);
    const avatar = new Avatar(viewer.scene);

    //デフォルトモデル読み込み
    avatar.loadVRM('./three-vrm-girl.vrm');

    // ローカルのVRMの読み込み
    const inputVRM = document.getElementById('inputVRM');
    inputVRM.addEventListener('change', event => {
        const target = event.target as HTMLInputElement;

        const files = target.files;
        if (!files) return;

        const file = files[0];
        if (!file) return;

        const blob = new Blob([file], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        avatar.loadVRM(url)
    });

    window.addEventListener('resize', () => {
        viewer.onResize();
    });

    //フレーム更新
    const update = () => {
        requestAnimationFrame(update);
        viewer.update();
    }
    update();

});