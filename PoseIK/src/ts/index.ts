import { Avatar } from './Avatar';
import { Viewer } from './Viewer';
import * as UI from './UI';





window.addEventListener('DOMContentLoaded', () => {

    const viewerElement = document.getElementById('viewer');
    const viewer = new Viewer(viewerElement);
    const avatar = new Avatar(viewer.scene);


    const loadVRM = async (url: string) => {
        await avatar.loadVRM(url);
        UI.setupIKController(viewer, avatar);
    }


    //デフォルトモデル読み込み
    loadVRM('../three-vrm-girl.vrm');

    // ファイルインプットからローカルのVRMを読み込む
    const inputVRM = document.getElementById('inputVRM');
    inputVRM.addEventListener('change', event => {
        const target = event.target as HTMLInputElement;

        const files = target.files;
        if (!files) return;

        const file = files[0];
        if (!file) return;

        const blob = new Blob([file], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        loadVRM(url);

    });

    window.addEventListener('resize', () => {
        viewer.onResize();
    });


    //フレーム更新
    const update = () => {
        requestAnimationFrame(update);
        avatar.update();
        viewer.update();
    }
    update();

});