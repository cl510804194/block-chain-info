import localforage from 'localforage';

const storageName = 'ori-protocol-v4';

const storage: LocalForage = localforage.createInstance({
  name: storageName,
});

export default storage;
