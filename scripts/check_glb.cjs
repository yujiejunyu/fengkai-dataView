const fs = require('fs');
const b = fs.readFileSync('resources/model/chuan.glb');
const s = b.toString('latin1');
const paths = s.match(/[A-Za-z]:[\\/][^"\\]{0,90}\.(jpg|png|psd)/g);
console.log('内嵌绝对路径纹理引用:', paths ? [...new Set(paths)].slice(0, 12) : '无');
const blob = (s.match(/blob:[^"\\]{0,60}/g) || []).slice(0, 5);
console.log('blob引用:', blob);
const rel = (s.match(/(?:\.\/)?[0-9a-zA-Z_\-]{1,40}\.fbm[^"\\]{0,60}/g) || []).slice(0, 10);
console.log('fbm引用:', rel);
