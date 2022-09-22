const os = require("os");

console.log("os.version() : " + os.version());
console.log("os.arch() : " + os.arch());
console.log("process.env.ARCH : " + process.env.ARCH);
console.log("process.arch : " + process.arch);

let arch = process.env.ARCH
  ? process.env.ARCH.replace("i686", "ia32").replace("x86_64", "x64")
  : process.arch;

console.log(arch);
