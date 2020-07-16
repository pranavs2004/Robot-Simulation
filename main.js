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
//GUI
  var plane = BABYLON.Mesh.CreatePlane("plane",2);
     plane.parent = box;
     plane.position.y = 12;
     plane.position.x=6;

     var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);

     var button1 = BABYLON.GUI.Button.CreateImageOnlyButton(
     "leftArrow",
     "https://image.flaticon.com/icons/png/512/98/98673.png"
   );
     button1.width = 1;
     button1.height = 0.4;
     button1.color = "white";
     button1.fontSize = 50;
     button1.onPointerUpObservable.add(function() {
         alert("you did it!");
     });
     advancedTexture.addControl(button1);

     /*var plane2 = BABYLON.Mesh.CreatePlane("plane",2);
        plane.parent = box;
        plane.position.y = 9;
        plane.position.x=4;
        var advancedTexture1 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane2);
        */
        var button2 = BABYLON.GUI.Button.CreateImageOnlyButton(
        "rightArrow",
        "https://image.flaticon.com/icons/png/512/98/98673.png"
      );
        button2.width = 1;
        button2.height = 0.4;
        button2.color = "white";
        button2.fontSize = 50;
        button2.paddingLeft="50px";
        button2.onPointerUpObservable.add(function() {
            alert("you did it!");
        });
        //advancedTexture1.addControl(button2);



  return scene;
};


keysPressed = {};

document.getElementById("canvas").addEventListener("keydown", (e) => {
  // switch(e.keyCode) {
  //   case 65:  // A, turn left
  //     scene.getMeshByName("Box").rotation.y -= 0.03;
  //     break;
  //   case 68:  // D, turn right
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

  if (keysPressed["a"]) { // turn left
    scene.getMeshByName("Box").rotation.y -= 0.03;
  }
  if (keysPressed["d"]) {  // turn right
    scene.getMeshByName("Box").rotation.y += 0.03;
  }
  if (keysPressed["s"]) {  // backward
    scene.getMeshByName("Box").translate(BABYLON.Axis.Z, 0.2, BABYLON.Space.LOCAL);
  }
  if (keysPressed["w"]) {  // forward
    scene.getMeshByName("Box").translate(BABYLON.Axis.Z, -0.2, BABYLON.Space.LOCAL);
  }
});

document.addEventListener('keyup', (e) => {
  delete keysPressed[e.key];
});


var scene = createScene();
engine.runRenderLoop( () => {
  scene.render();
