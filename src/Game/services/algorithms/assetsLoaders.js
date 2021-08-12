import { FBXLoader } from 'three-stdlib';


export const loadAnimation = (url) => {
  return new Promise((resolve) => {
    const animationLoader = new FBXLoader();
    animationLoader.load(url, resolve);
  });
};

export const loadModel = (url) => {
  return new Promise((resolve) => {
    const modelLoader = new FBXLoader();
    modelLoader.load(url, resolve);
  });
};
