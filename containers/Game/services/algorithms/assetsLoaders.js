/** @module containers/Game/services/algorithms/assetsLoaders */

import { TextureLoader } from "three";
import { FBXLoader } from "three-stdlib";

/**
  @summary Loads texture from specified url asynchronously
  @param url
  @returns new Promise
*/
export const loadTexture = (url) => {
  return new Promise((resolve) => {
    const textureLoader = new TextureLoader();
    textureLoader.load(url, resolve);
  });
};

/**
  @summary Loads FBX-model from specified url asynchronously
  @param url
  @returns new Promise
*/
export const loadFBX = (url) => {
  return new Promise((resolve) => {
    const fbxLoader = new FBXLoader();
    fbxLoader.load(url, resolve);
  });
};
