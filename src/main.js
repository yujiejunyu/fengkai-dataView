import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
// 加载 GLTF
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.getElementById('c');
// 初始化场景
const scene = new THREE.Scene();

// 创建相机
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;  // 相机默认值
const near = 0.1;
const far = 3000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(-152,75,33);
camera.lookAt(0, 0, 0);
// 加载纹理
// const planeSize = 40;
// const loader = new THREE.TextureLoader();
// const texture = loader.load('resources/image/checker.png');
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.magFilter = THREE.NearestFilter;
// texture.colorSpace = THREE.SRGBColorSpace;
// const repeats = planeSize / 2;
// texture.repeat.set(repeats, repeats);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas});
// 设置渲染器的背景色为浅蓝色，透明度0.8
// renderer.setClearColor(0x000044, 0.8);/
renderer.setSize(window.innerWidth, window.innerHeight);
// 设置位置
// renderer.domElement.style.position = 'absolute';
// renderer.domElement.style.bottom = '190px';
renderer.domElement.style.zIndex = '-1'
// document.body.appendChild(renderer.domElement);

// 创建控制器
const controls = new OrbitControls(camera, canvas);
// controls.target.set(0, 5, 0);

// // 创建立方体
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({color: 0x000033});
// const mesh = new THREE.Mesh(geometry, material);
// // 旋转90度
// mesh.rotation.x = Math.PI / 2;
// // mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
// scene.add(mesh);
let root;
// 加载gltf加载器
const gltfLoader = new GLTFLoader();
// 加载gltf模型
gltfLoader.load(
    'resources/model/chuan.glb',
    (gltf) => {
        console.log('gltf loaded', gltf);
        console.log(gltf.scene);
        root = gltf.scene;
        // 缩小模型10倍
        root.scale.set(0.1, 0.1, 0.1);
        // 位置下调
        root.position.set(0, -20, 0);
        scene.add(root);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.log('An error happened');
    }
);


// 添加光源
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(5, 5, 5);
scene.add(light);

renderer.render(scene, camera)
let startTime = null;

function render(time) {
    if (startTime === null) {
        startTime = time;
    }

    const elapsedTime = (time - startTime) * 0.001; // 转换为秒

    if (root) {
        // 计算船的 y 轴位置，使用 sin 函数模拟上下浮动
        const amplitude = 3; // 浮动幅度
        const frequency = 1; // 浮动频率
        root.position.y = -20 + amplitude * Math.sin(frequency * elapsedTime);
    }
    console.log('camera.position',camera.position);
    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);

// 处理窗口大小改变
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});