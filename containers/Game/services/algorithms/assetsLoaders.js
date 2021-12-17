/** @module containers/Game/services/algorithms/assetsLoaders */

import { TextureLoader } from "three";
import { FBXLoader } from "three-stdlib";

/**
  @summary The function for loading texture from specified url.
  @description Works asynchronously.
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
  @summary The function for loading FBX-model from specified url.
  @description Works asynchronously.
  @param url
  @returns new Promise
*/
export const loadFBX = (url) => {
  return new Promise((resolve) => {
    const fbxLoader = new FBXLoader();
    fbxLoader.load(url, resolve);
  });
};
