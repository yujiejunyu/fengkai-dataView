import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

const createPip = (name = '', radius = 5, angle = Math.PI / 2, color = [0.8, 0.8, 0.8], depth = 5) => {
    const curve = new THREE.EllipseCurve(
        0, 0,            // 中心坐标
        radius, radius,   // 半径
        0, angle,        // 起始角度与终止角度
        false,            // 顺时针
        0                 // 旋转
    );

    const points = curve.getPoints(50);
    const shape = new THREE.Shape(points);
    shape.moveTo(0, 0);
    shape.lineTo(0, 0);  // 闭合弧线与中心点

    const extrudeSettings = {
        steps: 0,
        depth,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 1
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const cylinderMat = new THREE.MeshPhongMaterial({
        specular: new THREE.Color(0.6, 0.7, 0.7),
        shininess: 10,
        color: new THREE.Color(...color),
        transparent: true,
        opacity: 0.8
    });

    const mesh = new THREE.Mesh(geometry, cylinderMat);
    mesh.name = name;
    mesh.rotateX(Math.PI / 2);  // 翻转至水平位置
    mesh.position.y += radius / 2;  // 调整位置

    return mesh;
};
const combination = (names: string[], ratios: number[], colors: number[][], depth: number[], radius = 5) => {
    const length = ratios.length;
    let count = 0, engleCount = 0;
    const group = new THREE.Group();
    const minDepth = Math.min(...depth);

    if (length != colors.length || length != depth.length || names.length != length) {
        throw new Error('输入错误,比率、颜色、高度,名字,四个数组的长度不相等');
    }

    for (let i = 0; i < length; i++) {
        count += ratios[i];
    }

    if (count != 1) {
        throw new Error('比率数组的和不等于1');
    }

    ratios.forEach((ratio, index, self) => {
        const angle = Math.PI * 2 * ratio;
        const pip = createPip(names[index], radius, angle, colors[index], depth[index]);

        if (index != 0) {
            const rotate = Math.PI * 2 * self[index - 1]; // 根据上一个片段的角度旋转
            engleCount += rotate;
            pip.rotateZ(engleCount);  // 旋转当前片段
        }

        pip.translateZ(minDepth - depth[index]); // 处理不同深度的片段位置
        group.add(pip);
    });

    return group;
};
const { width, height } = html.getBoundingClientRect();
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let scaleItem: any;
const Easing = TWEEN.Easing.Linear.None;
const duration = 100;

const resetScale = () =>
    new TWEEN.Tween(scaleItem.scale).to(new THREE.Vector3(1, 1, 1), duration).easing(Easing).start();

html.addEventListener('pointermove', (event) => {
    mouse.x = (event.offsetX / width) * 2 - 1;
    mouse.y = -(event.offsetY / height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const raycasters = raycaster.intersectObjects(group.children, true);

    if (raycasters.length != 0) {
        const selectItem = raycasters[0].object;
        if (scaleItem && scaleItem != raycasters[0].object) {
            resetScale();
        }
        new TWEEN.Tween(selectItem.scale).to(new THREE.Vector3(1.2, 1.2, 1.2), duration).easing(Easing).start();
        scaleItem = selectItem;
    } else {
        if (scaleItem) {
            resetScale();
            scaleItem = undefined;
        }
    }
});