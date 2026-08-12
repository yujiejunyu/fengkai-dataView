var bingMapkey = '';
var terrainToken = '';

function fetchRequest(url) {
  return fetch(url).then(function (res) {
    return res.json();
  });
}

// 获取iportal-底图配置中的地图token信息
function getConfig(url) {
  return new Promise((resolve, reject) => {
    // 在iportal环境中
    let configTokenUrl = url + '/apps/config.rjson';
    fetch(configTokenUrl)
      .then((response) => response.json())
      .then(function (response) {
        if (response && response.commonConfig) {
          let commonConfig = JSON.parse(response.commonConfig);
          if (commonConfig.tiandituKey && commonConfig.tiandituKey !== '') {
            terrainToken = commonConfig.tiandituKey;
          }

          if (commonConfig.bingMapsKey && commonConfig.bingMapsKey !== '') {
            bingMapkey = commonConfig.bingMapsKey;
          }
        }
        resolve([terrainToken, bingMapkey]);
      })
      .catch(function (error) {
        console.log(error);
        reject(new Error('获取地图token配置信息失败'));
      });
  });
}

function openExistScene(sceneID, viewer, serverUrl, options) {
  const rootUrl = serverUrl;
  getConfig(rootUrl).then(() => {
    const url = rootUrl + '/web/scenes/' + sceneID + '.json';
    fetchRequest(url)
      .then(function (response) {
        openScene(response, viewer, serverUrl, options);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}
window.openExistScene = openExistScene;

function openScene(response, viewer, serverUrl, options) {
  let content = JSON.parse(response.content);
  if (content) {
    if (JSON.stringify(content.layers) !== '{}') {
      initSkyBox(serverUrl);
      // 需要改动
      openS3M(content, viewer);
      openImagery(content, viewer, serverUrl);
      openMVT(content, viewer);
      openTerrain(content, viewer);

      // 场景属性
      if (content.layers.sceneAttrState) {
        setSceneAttr(content.layers.sceneAttrState, viewer);
      }
      // 三维特效粒子
      if (content.layers.particleOptions) {
        setParticle(content.layers.particleOptions, viewer, serverUrl);
      }
      // WMTS服务
      if (content.layers.wmtsLayerOption) {
        setWmts(content.layers.wmtsLayerOption, viewer);
      }
    }
    let cameraX = content.camera.position.x;
    let cameraY = content.camera.position.y;
    let cameraZ = content.camera.position.z;
    setTimeout(function () {
      if (
        options.position.destination.x !== null &&
        options.position.orientation &&
        options.position.orientation.pitch !== null
      ) {
        let { heading, roll, pitch } = options.position.orientation;
        heading = window.SuperMap3D.Math.toRadians(heading);
        roll = window.SuperMap3D.Math.toRadians(roll);
        pitch = window.SuperMap3D.Math.toRadians(pitch);
        viewer.scene.camera.setView({
          destination: window.SuperMap3D.Cartesian3.fromDegrees(
            options.position.destination.x,
            options.position.destination.y,
            options.position.destination.z
          ),
          orientation: { heading, pitch, roll }
        });
      } else {
        let pos = new window.SuperMap3D.Cartesian3(cameraX, cameraY, cameraZ);
        let position = !Array.isArray(content.layers) && content.layers.sceneAttrState ? pos : CartesiantoDegrees(pos);
        viewer.scene.camera.setView({
          destination: position,
          orientation: {
            heading: content.camera.heading,
            pitch: content.camera.pitch,
            roll: content.camera.roll
          }
        });
      }
      // 专门处理阴影
      let shadowValue = content.layers.sceneAttrState && content.layers.sceneAttrState['shadow'];
      if (shadowValue === true) {
        viewer.shadows = true;
        // UE阴影 设置为false，使用原来的软阴影效果；设置为true，实现了新的阴影算法，可以大幅度提升阴影边界的质量，看起来会非常柔和，没有锯齿。这个设置webgl2.0默认开启了。
        viewer.pcss = true;
        viewer.shadowQuality = 0;
        // 设置阴影的出现距离
        viewer.scene.shadowMap.maximumDistance = 2000;
        // 设置阴影的浓度，值越高，阴影越淡
        viewer.shadowMap.darkness = 0.4;
        // 默认值是0.1，值越小越清晰
        viewer.shadowMap.penumbraRatio = 0.1;
        let layers = viewer.scene.layers.layerQueue;
        for (var i = 0; i < layers.length; i++) {
          // 设置图层的阴影模式
          layers[i].shadowType = 2;
        }
      }

      // 将layerStyleOptions传入 - 需要等layer都加载完在设置图层风格
      if (content.layers.layerStyleOptions) {
        setLayerStyle(content.layers.layerStyleOptions, viewer);
      }
    }, 3000);
  } else if (response.url) {
    let realspaceUrl = response.url;
    let index = realspaceUrl.indexOf('/scenes');
    realspaceUrl = realspaceUrl.substring(0, index);
    viewer.scene.open(realspaceUrl);
  }
}

function CartesiantoDegrees(Cartesians) {
  // 当坐标为window.SuperMap3D中保存的，使用圆球进行转换
  var ellipsoid = new window.SuperMap3D.Ellipsoid(6378137.0, 6378137.0, 6378137.0);
  let cartographic = window.SuperMap3D.Cartographic.fromCartesian(Cartesians, ellipsoid);
  let longitude = Number(window.SuperMap3D.Math.toDegrees(cartographic.longitude));
  let latitude = Number(window.SuperMap3D.Math.toDegrees(cartographic.latitude));
  let h = Number(cartographic.height);
  return window.SuperMap3D.Cartesian3.fromDegrees(longitude, latitude, h);
}
// 加载S3M
function openS3M(content, viewer) {
  if (Array.isArray(content.layers)) {
    content.layers.forEach((item) => {
      if (item.type === 'S3M') {
        let url = item.url;
        let name = item.name;
        viewer.scene.addS3MTilesLayerByScp(url, { name: name });
      }
    });
    return;
  }
  let s3mlayer = content.layers.s3mLayer;
  if (s3mlayer.length > 0) {
    for (let t = 0; t < s3mlayer.length; t++) {
      let url = content.layers.s3mLayer[t].url;
      let name = content.layers.s3mLayer[t].name;
      viewer.scene.addS3MTilesLayerByScp(url, { name: name });
    }
  }
}

// 加载影像
function openImagery(content, viewer, serverUrl) {
  let imageryLayer = content.layers.imageryLayer;
  if (!imageryLayer) {
    return;
  }
  let imageryProvider;
  if (imageryLayer.length > 0) {
    for (let i = 0; i < imageryLayer.length; i++) {
      let url = content.layers.imageryLayer[i].url;
      let flag = checkImageryRepeat(url, viewer);
      if (!flag && imageryLayer[i].type) {
        let imageryType = content.layers.imageryLayer[i].type;
        switch (imageryType) {
          case 'BingMapsImageryProvider':
            imageryProvider = new window.SuperMap3D.BingMapsImageryProvider({
              url: content.layers.imageryLayer[i].url,
              key: bingMapkey
            });
            break;
          case 'TiandituImageryProvider':
            imageryProvider = new window.SuperMap3D.TiandituImageryProvider({
              url: content.layers.imageryLayer[i].url,
              token: content.layers.imageryLayer[i].token
            });
            break;
          case 'SingleTileImageryProvider':
            imageryProvider = new window.SuperMap3D.SingleTileImageryProvider({
              url: serverUrl + '/apps/earth/v2/' + content.layers.imageryLayer[i].url
            });
            break;
          case 'UrlTemplateImageryProvider':
            imageryProvider = new window.SuperMap3D.UrlTemplateImageryProvider({
              url: content.layers.imageryLayer[i].url
            });
            break;
          case 'SuperMapImageryProvider':
            imageryProvider = new window.SuperMap3D.SuperMapImageryProvider({
              url: content.layers.imageryLayer[i].url
            });
            break;
          case 'GRIDIMAGERY':
            imageryProvider = new window.SuperMap3D.TileCoordinatesImageryProvider();
            break;
          default:
            break;
        }
        viewer.imageryLayers.addImageryProvider(imageryProvider);
      }
    }
  }
}

// 加载MVT
function openMVT(content, viewer) {
  let MVTLayerUrlList = content.layers.MVTLayer;
  if (!MVTLayerUrlList) {
    return;
  }
  MVTLayerUrlList.forEach((item) => {
    addMvtLayer(item.url, item.name, viewer, 'MVT');
  });
}

// 加载地形
function openTerrain(content, viewer) {
  viewer.terrainProvider = new window.SuperMap3D.EllipsoidTerrainProvider();
  let terrainLayer = content.layers.terrainLayer;
  if (!terrainLayer) {
    return;
  }
  if (terrainLayer.length > 0) {
    let terrainType = content.layers.terrainLayer[0].type;
    switch (terrainType) {
      case 'StkTerrain':
        let isSctFlag = true;
        // 是否为iServer发布的TIN地形服务,stk地形设置为false。
        // if(content.layers.terrainLayer[0].url.indexOf('8090') != -1) isSctFlag = true;
        if (content.layers.terrainLayer[0].url.indexOf('/info/') !== -1) isSctFlag = false; // 目前以'/info/'来判断是否为stk地形
        viewer.terrainProvider = new window.SuperMap3D.SuperMapTerrainProvider({
          url: content.layers.terrainLayer[0].url,
          isSct: isSctFlag
        });
        break;
      case 'tianDiTuTerrain':
        viewer.terrainProvider = new window.SuperMap3D.TiandituTerrainProvider({
          token: terrainToken
        });
        break;
      case 'supermapOnlineTerrain':
        viewer.terrainProvider = new window.SuperMap3D.SCTTerrainProvider({
          urls: [content.layers.terrainLayer[0].url]
        });
        break;
    }
  }
}

// 设置场景属性
function setSceneAttr(sceneAttrState, viewer) {
  for (let key in sceneAttrState) {
    sceneAttrSwitch(key, sceneAttrState[key], viewer);
  }
}

// 根据key和value分别设置场景属性
function sceneAttrSwitch(key, value, viewer) {
  switch (key) {
    case 'atomsphereRender':
      viewer.scene.skyAtmosphere.show = value;
      break;
    case 'depthInspection':
      viewer.scene.globe.depthTestAgainstTerrain = value;
      break;
    case 'displayFrame':
      viewer.scene.debugShowFramesPerSecond = value;
      break;
    case 'earthShow':
      viewer.scene.globe.show = value;
      break;
    case 'fogEffect':
      viewer.scene.fog.enabled = value;
      break;
    case 'shadow':
      if (value) {
        viewer.shadows = true;
        // UE阴影 设置为false，使用原来的软阴影效果；设置为true，实现了新的阴影算法，可以大幅度提升阴影边界的质量，看起来会非常柔和，没有锯齿。这个设置webgl2.0默认开启了。
        viewer.pcss = true;
        viewer.shadowQuality = 0;
        // 设置阴影的出现距离
        viewer.scene.shadowMap.maximumDistance = 2000;
        // 设置阴影的浓度，值越高，阴影越淡
        viewer.shadowMap.darkness = 0.4;
        // 默认值是0.1，值越小越清晰
        viewer.shadowMap.penumbraRatio = 0.1;
        let layers = viewer.scene.layers.layerQueue;
        for (var i = 0; i < layers.length; i++) {
          // 设置图层的阴影模式
          layers[i].shadowType = 2;
        }
      } else {
        viewer.shadows = false;
      }
      break;
    case 'sunShow':
      viewer.scene.globe.enableLighting = value;
      break;
    case 'timeAxis':
      let timeline = document.getElementsByClassName('supermap3d-viewer-timelineContainer')[0];

      if (value) {
        timeline.style.visibility = 'visible';
        timeline.style['z-index'] = 99999999999;
      } else {
        timeline.style.visibility = 'hidden';
      }
      break;
    case 'cloudLayer':
      if (value) {
        viewer.scene.cloudBox = window.cloudBox;
      } else {
        viewer.scene.cloudBox = null;
      }
      break;
    case 'skyBoxShow':
      setSkyBox(value, viewer);
      break;
    case 'brightness':
      viewer.scene.colorCorrection.show = true; // 场景颜色开关打开
      viewer.scene.colorCorrection.brightness = value;
      break;
    case 'contrast':
      viewer.scene.colorCorrection.show = true;
      viewer.scene.colorCorrection.contrast = value;
      break;
    case 'hue':
      viewer.scene.colorCorrection.show = true;
      viewer.scene.colorCorrection.hue = value;
      break;
    case 'saturation':
      viewer.scene.colorCorrection.show = true;
      viewer.scene.colorCorrection.saturation = value;
      break;
    case 'surfaceTransparency':
      viewer.scene.globe.globeAlpha = value;
      break;
  }
}

function initSkyBox(serverUrl) {
  // 云层
  let iearthBaseUrl = `${serverUrl}/apps/earth/v2/`;
  let cloudBoxUrl = './images/sceneProperties/clouds/clouds1.png';
  window.cloudBox = new window.SuperMap3D.CloudBox({ url: cloudBoxUrl });
  // 天空盒
  let bluesky = {
    positiveX: iearthBaseUrl + './images/sceneProperties/bluesky/kloofendal_48d_partly_cloudy_puresky_8k_4.right.jpg',
    negativeX: iearthBaseUrl + './images/sceneProperties/bluesky/kloofendal_48d_partly_cloudy_puresky_8k_4.left.jpg',
    positiveY: iearthBaseUrl + './images/sceneProperties/bluesky/kloofendal_48d_partly_cloudy_puresky_8k_4.front.jpg',
    negativeY: iearthBaseUrl + './images/sceneProperties/bluesky/kloofendal_48d_partly_cloudy_puresky_8k_4.back.jpg',
    positiveZ: iearthBaseUrl + './images/sceneProperties/bluesky/kloofendal_48d_partly_cloudy_puresky_8k_4.top.jpg',
    negativeZ: iearthBaseUrl + './images/sceneProperties/bluesky/kloofendal_48d_partly_cloudy_puresky_8k_4.bottom.jpg'
  };
  window.skybox = new window.SuperMap3D.SkyBox({ sources: bluesky });
  window.skybox.USpeed = 0; // 获取或者设置天空盒子绕x轴运动的动画速度。设置为1时表示0.01弧度每秒
  window.skybox.VSpeed = 0; // 获取或者设置天空盒子绕y轴运动的动画速度。
  window.skybox.WSpeed = 0; // 获取或者设置天空盒子绕z轴运动的动画速度。
}

// 设置天空盒
function setSkyBox(skyBoxShow, viewer) {
  let defaultSkybox = viewer.scene.skyBox;
  let watchCameraHeightFn = watchCameraHeight.bind(this, viewer);
  if (skyBoxShow) {
    let cameraHeight = viewer.scene.camera.positionCartographic.height;
    viewer.scene.postRender.addEventListener(watchCameraHeightFn);
    viewer.scene.skyBox = window.skybox;
    if (cameraHeight < 22e4) {
      viewer.scene.skyBox.show = true;
      viewer.scene.skyAtmosphere.show = false;
    } else {
      viewer.scene.skyAtmosphere.show = true;
    }
  } else {
    viewer.scene.skyAtmosphere.show = true;
    viewer.scene.skyBox.show = false;
    viewer.scene.skyBox = defaultSkybox;
    viewer.scene.postRender.removeEventListener(watchCameraHeightFn);
  }
}

// 监听相机高度，一旦高于设定阈值，关闭天空盒显示大气层
function watchCameraHeight(viewer, skyBoxShow) {
  if (skyBoxShow) {
    let cameraHeight = viewer.scene.camera.positionCartographic.height;
    if (cameraHeight > 22e4) {
      viewer.scene.skyBox.show = false;
      viewer.scene.skyAtmosphere.show = true;
    } else {
      viewer.scene.skyBox.show = true;
      viewer.scene.skyAtmosphere.show = false;
    }
  }
}

// 设置场景特效 - 粒子系统
function setParticle(particleOptions, viewer, serverUrl) {
  if (particleOptions['fire'] != null) {
    let fireOption = particleOptions['fire'];
    addParticleFile(viewer, serverUrl, fireOption, 'fire');
  }
  if (particleOptions['water'] != null) {
    let waterOption = particleOptions['water'];
    addParticleFile(viewer, serverUrl, waterOption, 'water');
  }
  if (particleOptions['fireWork'] != null) {
    let fireWorkOption = particleOptions['fireWork'];
    addFireWork(viewer, serverUrl, fireWorkOption);
  }
}
function setWmts(wmtsLayerOption, viewer) {
  let rectangle = wmtsLayerOption.rectangle;
  let wmtsLayer = viewer.imageryLayers.addImageryProvider(new window.SuperMap3D.WebMapTileServiceImageryProvider({
    url: wmtsLayerOption.wmtsLayerUrl,
    style: 'default',
    format: 'image/png',
    layer: wmtsLayerOption.layerName,
    tileMatrixSetID: wmtsLayerOption.tileMatrixSetID,
    tilingScheme: new window.SuperMap3D.GeographicTilingScheme({
      rectangle: window.SuperMap3D.Rectangle.fromDegrees(rectangle[0], rectangle[1], rectangle[2], rectangle[3]),
      // ellipsoid: SuperMap3D.Ellipsoid.WGS84,
      // numberOfLevelZeroTilesX: 1,
      // numberOfLevelZeroTilesY: 1,
      scaleDenominators: wmtsLayerOption.scaleDenominatorsList,
      customDPI: new window.SuperMap3D.Cartesian2(90.7142857142857, 90.7142857142857)
    })
  }));
  // wmtsLayer.alpha = 0.5;
  viewer.flyTo(wmtsLayer);
}
// 添加场景中已保存的粒子
function addParticleFile(viewer, serverUrl, options, type) {
  let modelMatrixFire = new window.SuperMap3D.Matrix4();
  window.SuperMap3D.Transforms.eastNorthUpToFixedFrame(options.particlePosition, undefined, modelMatrixFire);
  loadParticleFile(
    serverUrl + '/apps/earth/v2/' + options.particleUrl.replace('./', ''),
    modelMatrixFire,
    viewer,
    serverUrl,
    type,
    options.particleAttr
  );
}
// 加载粒子文件
function loadParticleFile(url, modelMatrix, viewer, serverUrl, type, option) {
  let particle = {};
  let scene = viewer.scene;
  fetchRequest(url)
    .then(function (data) {
      let iearthBaseUrl = `${serverUrl}/apps/earth/v2/`;
      data['texture']['url'] = data['texture']['url'].replace('./Resource', iearthBaseUrl + 'Resource');
      window.SuperMap3D.ParticleHelper.fromJson(data, scene).then(function (particleSystem) {
        particle = particleSystem;
        particle.modelMatrix = modelMatrix;
        // 设置参数
        if (option) {
          for (let key in option) {
            switch (key) {
              case 'emitRate':
                particle['emitRate'] = Number(option[key]);
                break;
              case 'minLifeTime':
                particle['minLifeTime'] = Number(option[key]);
                break;
              case 'maxLifeTime':
                particle['maxLifeTime'] = Number(option[key]);
                break;
              case 'minEmitPower':
                particle['minEmitPower'] = Number(option[key]);
                break;
              case 'maxEmitPower':
                particle['maxEmitPower'] = Number(option[key]);
                break;
              case 'minSize':
                particle['minSize'] = Number(option[key]);
                break;
              case 'maxSize':
                particle['maxSize'] = Number(option[key]);
                break;
              case 'minScaleX':
                particle['minScaleX'] = Number(option[key]);
                break;
              case 'minScaleY':
                particle['minScaleY'] = Number(option[key]);
                break;
              case 'maxScaleX':
                particle['maxScaleX'] = Number(option[key]);
                break;
              case 'maxScaleY':
                particle['maxScaleY'] = Number(option[key]);
                break;
              case 'gravity':
                particle.gravity = new window.SuperMap3D.Cartesian3(0, 0, Number(option[key]));
                break;
              case 'emitType':
                switch (option[key]) {
                  case 'Cone':
                    particle.createConeEmitter(1.0, 1.05);
                    break;
                  case 'Sphere':
                    particle.createSphereEmitter(1.0);
                    break;
                  case 'Box':
                    let direction1 = new window.SuperMap3D.Cartesian3(-1, 1, 1);
                    let direction2 = new window.SuperMap3D.Cartesian3(1, 1, -1);
                    let minBox = new window.SuperMap3D.Cartesian3(-10, 0, -10);
                    let maxBox = new window.SuperMap3D.Cartesian3(10, 0, 10);
                    particle.createBoxEmitter(direction1, direction2, minBox, maxBox);
                    break;
                }
                break;
              default:
                break;
            }
          }
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

// 添加烟花
function addFireWork(viewer, serverUrl, fireWorkOption) {
  let modelMatrix = new window.SuperMap3D.Matrix4();
  let setIntervalList = [];
  let scene = viewer.scene;
  // scene.skyAtmosphere = new window.SuperMap3D.SkyAtmosphere();
  // scene.globe.show = false
  // scene.skyAtmosphere.show = false; //关闭大气
  let iearthBaseUrl = `${serverUrl}/apps/earth/v2/`;
  let sparkOneUrl = iearthBaseUrl + 'Resource/particle/babylon/sparkGravityOne.json';
  let sparkTwoUrl = iearthBaseUrl + 'Resource/particle/babylon/sparkGravityTwo.json';
  let sparkThreeUrl = iearthBaseUrl + 'Resource/particle/babylon/sparkGravityThree.json';
  let sparkFourUrl = iearthBaseUrl + 'Resource/particle/babylon/sparkGravityFour.json';

  let numberOfSparks = 8;
  let xMin = -2100.0;
  let xMax = 300.0;
  let yMin = 0.0;
  let yMax = 2000.0;
  let zMin = 150.0;
  let zMax = 550.0;
  // 创建烟花
  let sparkInterval = (xMax - xMin) / numberOfSparks;

  function createSpark(serverUrl) {
    for (let i = 0; i < numberOfSparks; ++i) {
      let x = window.SuperMap3D.Math.randomBetween(xMin + i * sparkInterval, xMin + (i + 1) * sparkInterval);
      let y = window.SuperMap3D.Math.randomBetween(yMin, yMax);
      let z = window.SuperMap3D.Math.randomBetween(zMin, zMax);
      let offset = new window.SuperMap3D.Cartesian3(x, y, z);
      let url = '';
      if (i % 4 === 0) {
        url = sparkOneUrl;
      }
      if (i % 4 === 1) {
        url = sparkTwoUrl;
      }
      if (i % 4 === 2) {
        url = sparkThreeUrl;
      }
      if (i % 4 === 3) {
        url = sparkFourUrl;
      }
      fetchRequest(url)
        .then(function (data) {
          let iearthBaseUrl = `${serverUrl}/apps/earth/v2/`;
          data['texture']['url'] = data['texture']['url'].replace('./Resource', iearthBaseUrl + 'Resource');
          window.SuperMap3D.ParticleHelper.fromJson(data, scene).then(function (particleSystem) {
            settingParticleSys(particleSystem, offset, i);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  // 设置当前粒子系统
  function settingParticleSys(particleSystem, offset, index) {
    // 添加多个
    particleSystem.modelMatrix = modelMatrix;
    particleSystem.worldOffset.x = offset.x;
    particleSystem.worldOffset.y = offset.y;
    particleSystem.worldOffset.z = offset.z;
    let setIntervalFlag = setInterval(() => {
      particleSystem.start();
    }, 2000 + index * 50);
    scene.primitives.add(particleSystem);
    setIntervalList.push(setIntervalFlag);
  }

  function addSpark(centerPosition) {
    window.SuperMap3D.Transforms.eastNorthUpToFixedFrame(centerPosition, undefined, modelMatrix);
    createSpark();
  }

  addSpark(fireWorkOption.fireWorkPosition);
}

// 设置保存的图层属性
function setLayerStyle(layerStyleOptions, viewer) {
  let keys = Object.keys(layerStyleOptions);
  for (let i = 0; i < keys.length; i++) {
    let layerName = keys[i];
    let layerStyleOption = layerStyleOptions[layerName];
    let currentLayer = viewer.scene.layers.find(layerName);
    if (!currentLayer) return;
    for (let key in layerStyleOption) {
      let lineColor = layerStyleOption['lineColor'];
      layerStyleSwitch(currentLayer, key, layerStyleOption[key], lineColor);
    }
  }
}

// 根据option内容中每个属性赋值
function layerStyleSwitch(currentLayer, key, value, lineColor) {
  switch (key) {
    case 'foreColor':
      currentLayer.style3D.fillForeColor = window.SuperMap3D.Color.fromCssColorString(value);
      break;
    case 'lineColor':
      currentLayer.style3D.lineColor = window.SuperMap3D.Color.fromCssColorString(value);
      break;
    case 'selectedColor':
      currentLayer.selectedColor = window.SuperMap3D.Color.fromCssColorString(value);
      break;
    case 'layerTrans':
      currentLayer.style3D.fillForeColor.alpha = Number(value);
      break;
    case 'selectColorMode':
      currentLayer.selectColorType = value;
      break;
    case 'bottomAltitude':
      currentLayer.style3D.bottomAltitude = Number(value);
      currentLayer.refresh();
      break;
    case 'fillStyle':
      if (currentLayer) {
        switch (value) {
          case 0:
            currentLayer.style3D.fillStyle = window.SuperMap3D.FillStyle.Fill;
            break;
          case 1:
            currentLayer.style3D.fillStyle = window.SuperMap3D.FillStyle.WireFrame;
            currentLayer.style3D.lineColor = window.SuperMap3D.Color.fromCssColorString(lineColor);
            break;
          case 2:
            currentLayer.style3D.fillStyle = window.SuperMap3D.FillStyle.Fill_And_WireFrame;
            currentLayer.style3D.lineColor = window.SuperMap3D.Color.fromCssColorString(lineColor);
            break;
          default:
            break;
        }
        currentLayer.refresh();
      }
      break;
    default:
      break;
  }
}

// 添加MVT服务
function addMvtLayer(LayerURL, name, viewer, type) {
  // 返回img图层layer
  let mvtMap = viewer.scene.addVectorTilesMap({
    url: LayerURL,
    canvasWidth: 512,
    name: name || 'mvt',
    viewer: viewer
  });

  window.SuperMap3D.when(mvtMap.readyPromise, function (data) {
    var bounds = mvtMap.rectangle;
    viewer.scene.camera.flyTo({
      destination: new window.SuperMap3D.Cartesian3.fromRadians(
        (bounds.east + bounds.west) * 0.5,
        (bounds.north + bounds.south) * 0.5,
        10000
      ),
      duration: 0,
      orientation: {
        heading: 0,
        roll: 0
      }
    });
  });
}

// 检查当前影像是否重复添加
function checkImageryRepeat(url, viewer) {
  // viewer.imageryLayers._layers.find
  let length = viewer.imageryLayers._layers.length;
  for (let i = 0; i < length; i++) {
    let imageryLayer = viewer.imageryLayers._layers[i];
    if (imageryLayer._imageryProvider.url) {
      let imgUrl = imageryLayer._imageryProvider.url;
      // if(imgUrl===url){
      //   return true;
      // }
      return imgUrl === url;
    }
  }
}
