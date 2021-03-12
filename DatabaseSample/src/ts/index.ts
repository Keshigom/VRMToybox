import { Avatar } from './Avatar';
import { Viewer } from './Viewer';
import { initDB, deleteDB, dbLoadModel, dbSaveModel } from './LocalDB';

window.addEventListener('DOMContentLoaded', () => {

    const viewerElement = document.getElementById('viewer');
    const viewer = new Viewer(viewerElement);
    const avatar = new Avatar(viewer.scene);

    // indexDBの更新・作成
    initDB();

    // DB削除
    document.getElementById('deleteVrmDb').addEventListener('click', () => {
        deleteDB();
    });

    //デフォルトモデル読み込み
    const loadSampleVRM = document.getElementById('sampleVrm');
    loadSampleVRM.addEventListener('click', event => {
        const sampleVRM = '../three-vrm-girl.vrm'
        avatar.loadVRM(sampleVRM);
        fetch(sampleVRM)
            .then(response => response.blob())
            .then(data => dbSaveModel(data));

    });

    // indexDBからモデルの読み込み
    dbLoadModel(
        (blob) => {
            const url = URL.createObjectURL(blob);
            avatar.loadVRM(url);
        }
    );

    // ローカルのVRMの読み込み
    const inputVRM = document.getElementById('inputVrm');
    inputVRM.addEventListener('change', event => {
        const target = event.target as HTMLInputElement;

        const files = target.files;
        if (!files) return;

        const file = files[0];
        if (!file) return;

        const blob = new Blob([file], { type: 'application/octet-stream' });

        // IndexedDBへ保存
        dbSaveModel(blob);

        const url = URL.createObjectURL(blob);
        avatar.loadVRM(url);
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