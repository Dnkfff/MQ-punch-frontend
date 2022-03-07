import { TextureLoader } from 'three';
import { FBXLoader, GLTFLoader, DRACOLoader } from 'three-stdlib';


export const loadTexture = (url) => {
  return new Promise((resolve) => {
    const textureLoader = new TextureLoader();
    textureLoader.load(url, resolve);
  });
};

export const loadFBX = (url) => {
  return new Promise((resolve) => {
    const fbxLoader = new FBXLoader();
    fbxLoader.load(url, resolve);
  });
};

export const loadGLB = (url) => {
  return new Promise((resolve) => {
    const glbLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/node_modules/examples/js/libs/draco/')
    glbLoader.setDRACOLoader(dracoLoader);
    glbLoader.load(url, resolve);
  });
}