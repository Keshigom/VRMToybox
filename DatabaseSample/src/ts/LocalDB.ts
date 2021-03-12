
const version = 1;
const dbName = 'AvatarDatabase';
const storeName = 'model';

export const initDB = () => {
    const request = window.indexedDB.open(dbName, version);

    request.onupgradeneeded = (event) => {
        console.log('DB create/update');
        const target = event.target as IDBOpenDBRequest;
        const idbDB = target.result;

        if (event.oldVersion < 1) {
            idbDB.createObjectStore(storeName, { keyPath: 'name' })
        }
        idbDB.close();
    }
}

export const deleteDB = () => {
    const deleteRequest = window.indexedDB.deleteDatabase(dbName);
}

export const dbSaveModel = (model: Blob) => {
    const request = window.indexedDB.open(dbName, version);
    request.onsuccess = function (event) {
        const target = event.target as IDBOpenDBRequest;
        const idbDB = target.result;

        const transaction = idbDB.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        // 上書き
        const putRequest = store.put({
            'model': model,
            'name': 'ONE_MODEL_ONLY'
        });

        putRequest.onsuccess = () => {
            console.log('db:put success');
            idbDB.close();
        }

        putRequest.onerror = () => {
            console.log('db:put error');
        }
    };

}

export const dbLoadModel = (onLoad: (blob: Blob) => void): void => {
    const request = window.indexedDB.open(dbName, version);
    request.onsuccess = function (event) {
        const target = event.target as IDBOpenDBRequest;
        const idbDB = target.result;
        const transaction = idbDB.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const getRequest = store.get('ONE_MODEL_ONLY');

        getRequest.onsuccess = (event) => {
            const target = event.target as IDBRequest;
            if (!target.result)
                return;

            const model = target.result.model;
            if (!model)
                return;

            onLoad(model);

            idbDB.close();
        };

        getRequest.onerror = () => {
            console.log('db:put error');
        }
    }
}