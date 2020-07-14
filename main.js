var canvas = document.getElementById("canvas");
var engine = new BABYLON.Engine(canvas, true);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createScene() {
  var scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3.Gray();

  var box = BABYLON.Mesh.CreateBox("Box", 4.0, scene);
  box.position = new BABYLON.Vector3(0, 2, 0)
  var box2 = BABYLON.Mesh.CreateBox("Box2", 4.0, scene);
  var material = new BABYLON.StandardMaterial("material1", scene);
  material.wireframe = true;
  box2.material = material;
  box2.position = new BABYLON.Vector3(6, 2, 0);

  var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 100, height: 100}, scene);

  var light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 40, 0), scene);
  light.intensity = 0.8;
  light.diffuse = new BABYLON.Color3(0.9, 0.5, 0.9);
  light.specular = new BABYLON.Color3(1, 0.9, 1);

  var camera = new BABYLON.FollowCamera("Camera", box.position, scene);
  camera.lockedTarget = box;
  camera.radius = 20;
  camera.heightOffset = 10;
  camera.attachControl(canvas, true);
  camera.inputs.attached.keyboard.angularSpeed = .002;
  camera.inputs.angularSensibitlity = 1;

  return scene;
};


keysPressed = {};

document.getElementById("canvas").addEventListener("keydown", (e) => {
  // switch(e.keyCode) {
  //   case 65:  // A, left
  //     scene.getMeshByName("Box").rotation.y -= 0.03;
  //     break;
  //   case 68:  // D, right
  //     scene.getMeshByName("Box").rotation.y += 0.03;
  //     break;
  //   case 83:  // S, backward
  //     scene.getMeshByName("Box").translate(BABYLON.Axis.Z, 0.1, BABYLON.Space.LOCAL);
  //     break;
  //   case 87:  // W, forward
  //     scene.getMeshByName("Box").translate(BABYLON.Axis.Z, -0.1, BABYLON.Space.LOCAL);
  //     break;
  //   default:
  //     // do nothing
  // }

  keysPressed[e.key] = true;

  if (keysPressed["a"]) { // A, left
    scene.getMeshByName("Box").rotation.y -= 0.03;
  }
  if (keysPressed["d"]) {  // D, right
    scene.getMeshByName("Box").rotation.y += 0.03;
  }
  if (keysPressed["s"]) {  // S, backward
    scene.getMeshByName("Box").translate(BABYLON.Axis.Z, 0.2, BABYLON.Space.LOCAL);
  }
  if (keysPressed["w"]) {  // W, forward
    scene.getMeshByName("Box").translate(BABYLON.Axis.Z, -0.2, BABYLON.Space.LOCAL);
  }
});

document.addEventListener('keyup', (e) => {
  delete keysPressed[e.key];
});

var scene = createScene();
engine.runRenderLoop( () => {
  scene.render();
})