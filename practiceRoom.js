var canvas = document.getElementById("canvas");
var engine = new BABYLON.Engine(canvas, true);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createScene() {

  var scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3.Gray();


  // Meshes---------------------------------------------------------

  // Room
  var roomWidth = 200;
  var roomLength = 300;
  var roomHeight = 100;

  var fieldWidth = 121;
  var fieldLength = 200;

  var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: roomWidth, height: roomLength}, scene);
  material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseTexture = new BABYLON.Texture("assets/grid.jpg", scene);
  ground.material = material;

  var rightWall = BABYLON.MeshBuilder.CreatePlane("rightWall", {width: roomLength, height: roomHeight, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
  rightWall.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
  rightWall.position = new BABYLON.Vector3(-roomWidth/2, roomHeight/2, 0);

  var leftWall = BABYLON.MeshBuilder.CreatePlane("leftWall", {width: roomLength, height: roomHeight, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
  leftWall.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
  leftWall.position = new BABYLON.Vector3(roomWidth/2, roomHeight/2, 0);

  var frontWall = BABYLON.MeshBuilder.CreatePlane("frontWall", {width: roomWidth, height: roomHeight, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
  frontWall.position = new BABYLON.Vector3(0, roomHeight/2, -roomLength/2);

  var backWall = BABYLON.MeshBuilder.CreatePlane("backWall", {width: roomWidth, height: roomHeight, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
  backWall.position = new BABYLON.Vector3(0, roomHeight/2, roomLength/2);


  // Robot

  // *****Parameters for convenience*****
  var boxSize = 6;
  var boxColors = [
    new BABYLON.Color4(1, 0, 0, 1), new BABYLON.Color4(1, 0, 0, 1), new BABYLON.Color4(1, 0, 0, 1),
    new BABYLON.Color4(1, 0, 0, 1), new BABYLON.Color4(1, 0, 0, 1), new BABYLON.Color4(1, 0, 0, 1)
  ];
  var wheelDiameter = 2;
  var wheelThickness = 0.5;
  var wheelColors = [new BABYLON.Color4(0, 0, 0, 1), new BABYLON.Color4(0, 0, 0, 1), new BABYLON.Color4(0, 0, 0, 1)];
  var wheelY = -1;
  // ************************************

  var box = BABYLON.MeshBuilder.CreateBox("Box", {size: boxSize, faceColors: boxColors, height: 2}, scene);
  box.position = new BABYLON.Vector3(0, 2, 0);

  var frontRod = BABYLON.MeshBuilder.CreateCylinder("FrontRod", {height: boxSize+0.4, diameter: 0.5}, scene);
  frontRod.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
  frontRod.position = new BABYLON.Vector3(0, wheelY, -boxSize/2 + wheelDiameter/2);
  frontRod.parent = box;

  var backRod = BABYLON.MeshBuilder.CreateCylinder("BackRod", {height: boxSize+0.4, diameter: 0.5}, scene);
  backRod.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
  backRod.position = new BABYLON.Vector3(0, wheelY, boxSize/2 - wheelDiameter/2);
  backRod.parent = box;

  var frontRightWheel = BABYLON.MeshBuilder.CreateCylinder("FrontRightWheel", {height: wheelThickness, diameter: wheelDiameter, faceColors: wheelColors }, scene);
  frontRightWheel.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
  frontRightWheel.position = new BABYLON.Vector3(-boxSize/2 - wheelThickness/2 - 0.2, wheelY, -boxSize/2 + wheelDiameter/2);
  frontRightWheel.parent = box;

  var frontLeftWheel = BABYLON.MeshBuilder.CreateCylinder("FrontLeftWheel", {height: wheelThickness, diameter: wheelDiameter, faceColors: wheelColors}, scene);
  frontLeftWheel.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
  frontLeftWheel.position = new BABYLON.Vector3(boxSize/2 + wheelThickness/2 + 0.2, wheelY, -boxSize/2 + wheelDiameter/2);
  frontLeftWheel.parent = box;

  var backRightWheel = BABYLON.MeshBuilder.CreateCylinder("BackRightWheel", {height: wheelThickness, diameter: wheelDiameter, faceColors: wheelColors}, scene);
  backRightWheel.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
  backRightWheel.position = new BABYLON.Vector3(-boxSize/2 - wheelThickness/2 - 0.2, wheelY, boxSize/2 - wheelDiameter/2);
  backRightWheel.parent = box;

  var backLeftWheel = BABYLON.MeshBuilder.CreateCylinder("BackLeftWheel", {height: wheelThickness, diameter: wheelDiameter, faceColors: wheelColors}, scene);
  backLeftWheel.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
  backLeftWheel.position = new BABYLON.Vector3(boxSize/2 + wheelThickness/2 + 0.2, wheelY, boxSize/2 - wheelDiameter/2);
  backLeftWheel.parent = box;

  // Ball
  var ball = BABYLON.MeshBuilder.CreateSphere("Ball", {diameter: 3}, scene);
  var ballMaterial = new BABYLON.StandardMaterial("ballMaterial", scene);
  ballMaterial.diffuseTexture = new BABYLON.Texture("assets/soccer_texture.jpg", scene);
  ballMaterial.bumpTexture = new BABYLON.Texture("assets/soccer_normal.png", scene);
  ball.material = ballMaterial;
  ball.position = new BABYLON.Vector3(0, 6,  20);


  // Goalposts

  //*****Parameters for convenience*****
  var goalWidth = 30;
  var goalLength = 15;
  var goalHeight = 15;
  var barSize = 1;
  //************************************

  var mat1 = new BABYLON.StandardMaterial('mat1', scene);
  mat1.diffuseColor = new BABYLON.Color3(0, 0, 0)

  var netMat = new BABYLON.StandardMaterial('netMat', scene);
  netMat.diffuseTexture = new BABYLON.Texture("assets/net_texture.png", scene);
  netMat.diffuseTexture.hasAlpha = true;

  var areaMat = new BABYLON.StandardMaterial('areaMat', scene);
  areaMat.alpha = 0;


  // goalpost 1
  var base = BABYLON.MeshBuilder.CreateBox("base", { size: barSize, width: goalWidth }, scene);
  base.position = new BABYLON.Vector3(0, barSize, 0);
  base.material = mat1;

  var hbar = BABYLON.MeshBuilder.CreateBox("hbar", { size: barSize, width: goalWidth }, scene);
  hbar.position = new BABYLON.Vector3(0, goalHeight - barSize/2, -goalLength + barSize);
  hbar.material = mat1;
  hbar.parent = base;

  var vbar1 = BABYLON.MeshBuilder.CreateBox("vbar1", { size: barSize, height: goalHeight-1 }, scene);
  vbar1.position = new BABYLON.Vector3(-goalWidth/2 + barSize/2, goalHeight/2 - barSize/2, -goalLength + barSize);
  vbar1.material = mat1;
  vbar1.parent = base;

  var vbar2 = BABYLON.MeshBuilder.CreateBox("vbar2", { size: barSize, height: goalHeight-1 }, scene);
  vbar2.position = new BABYLON.Vector3(goalWidth/2 - barSize/2, goalHeight/2 - barSize/2, -goalLength + barSize);
  vbar2.material = mat1;
  vbar2.parent = base;

  var c1 = BABYLON.MeshBuilder.CreateBox("c1", { size: barSize, depth: goalLength}, scene);
  c1.position = new BABYLON.Vector3(goalWidth/2 - barSize/2, 0, -goalLength/2 + barSize/2);
  c1.material = mat1;
  c1.parent = base;

  var c2 = BABYLON.MeshBuilder.CreateBox("c2", { size: barSize, depth: goalLength}, scene);
  c2.position = new BABYLON.Vector3(-goalWidth/2 + barSize/2, 0, -goalLength/2 + barSize/2);
  c2.material = mat1;
  c2.parent = base;

  var netRight = BABYLON.MeshBuilder.CreateDisc("netRight", {radius: goalHeight, arc: 0.5, tessellation: 2, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene); // makes a triangle
  netRight.position = new BABYLON.Vector3(-goalWidth/2 + barSize/2, 0, -goalLength + barSize/2);
  netRight.rotate(BABYLON.Axis.Y, -Math.PI/2, BABYLON.Space.World);
  netRight.material = netMat;
  netRight.parent = base;

  var netLeft = BABYLON.MeshBuilder.CreateDisc("netRight", {radius: goalHeight, arc: 0.5, tessellation: 2, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene); // makes a triangle
  netLeft.position = new BABYLON.Vector3(goalWidth/2 - barSize/2, 0, -goalLength + barSize/2);
  netLeft.rotate(BABYLON.Axis.Y, -Math.PI/2, BABYLON.Space.World);
  netLeft.material = netMat;
  netLeft.parent = base;

  var netBack = BABYLON.MeshBuilder.CreatePlane("netBack", {width: goalWidth-barSize, height: Math.sqrt(goalHeight*goalHeight+goalLength*goalLength), sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
  netBack.position = new BABYLON.Vector3(0, goalHeight/2, -goalLength/2 + 0.5);
  netBack.rotate(BABYLON.Axis.X, -Math.PI/4, BABYLON.Space.World);
  netBack.material = netMat;
  netBack.parent = base;

  base.position = new BABYLON.Vector3(0, barSize/2 + 1, fieldLength/2 + goalLength);


  // Lighting and Shadows---------------------------------------------------------

  var light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 50, 0), scene);
  light.range = 800;
  light.intensity = 0.8;
  light.diffuse = new BABYLON.Color3(0.9, 0.5, 0.9);
  light.specular = new BABYLON.Color3(1, 0.9, 1);

  var hemiLight = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
  hemiLight.intensity = 0.1;
  hemiLight.diffuse = new BABYLON.Color3(0.9, 0.5, 0.9);
  hemiLight.specular = new BABYLON.Color3(1, 0.9, 1);
  hemiLight.groundColor = new BABYLON.Color3(0.9, 0.5, 0.9);

  var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
  shadowGenerator.darkness = 0.1;
  // shadowGenerator.useBlurExponentialShadowMap = true;
  shadowGenerator.useKernelBlur = true;
  shadowGenerator.blurKernel = 64;
  shadowGenerator.transparencyShadow = true;

  shadowGenerator.addShadowCaster(box);
  shadowGenerator.addShadowCaster(ball);

  ground.receiveShadows = true;



  // Camera---------------------------------------------------------

  var camera = new BABYLON.FollowCamera("Camera", box.position, scene);
  camera.lockedTarget = box;
  camera.radius = 20;
  camera.heightOffset = 7;
  camera.inputs.attached.keyboard.angularSpeed = .002;
  camera.inputs.angularSensibitlity = 1;
  camera.lowerBetaLimit = 0.1;
  camera.upperBetaLimit = (Math.PI / 2) * 0.9;
  camera.lowerRadiusLimit = 10;
  camera.upperRadiusLimit = 150;
  camera.attachControl(canvas, true);


  //ScoreBoard
  var scoreTexture = new BABYLON.DynamicTexture("scoreTexture", 512, scene, true);
  var scoreboard = BABYLON.Mesh.CreatePlane("scoreboard", 5, scene);
  // Position the scoreboard after the lane.
  scoreboard.position.z = 40;
  // Create a material for the scoreboard.
  scoreboard.material = new BABYLON.StandardMaterial("scoradboardMat", scene);
  // Set the diffuse texture to be the dynamic texture.
  scoreboard.material.diffuseTexture = scoreTexture;




  // Physics---------------------------------------------------------

  scene.enablePhysics(null, new BABYLON.CannonJSPlugin());

  ball.physicsImpostor = new BABYLON.PhysicsImpostor(ball, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 2, friction: 0.7, restitution: 0.3 }, scene);
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.2, restitution: 0.7 }, scene);

  frontRightWheel.physicsImpostor = new BABYLON.PhysicsImpostor(frontRightWheel, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 0.1, restitution: 0.0 }, scene);
  frontLeftWheel.physicsImpostor = new BABYLON.PhysicsImpostor(frontLeftWheel, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 0.1, restitution: 0.0 }, scene);
  backRightWheel.physicsImpostor = new BABYLON.PhysicsImpostor(backRightWheel, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 0.1, restitution: 0.0 }, scene);
  backLeftWheel.physicsImpostor = new BABYLON.PhysicsImpostor(backLeftWheel, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 0.1, restitution: 0.0 }, scene);
  box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 10000, friction: 0.5, restitution: 0.0 }, scene);

  var goal1Components = [netRight, netLeft, netBack, hbar, vbar1, vbar2, c1, c2, base];
  for (var i = 3; i < goal1Components.length; i++) {
    goal1Components[i].physicsImpostor = new BABYLON.PhysicsImpostor(goal1Components[i], BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2000, friction: 10000, restitution: 0 }, scene);
  }

  rightWall.physicsImpostor = new BABYLON.PhysicsImpostor(rightWall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);
  leftWall.physicsImpostor = new BABYLON.PhysicsImpostor(leftWall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);
  frontWall.physicsImpostor = new BABYLON.PhysicsImpostor(frontWall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);
  backWall.physicsImpostor = new BABYLON.PhysicsImpostor(backWall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);

  // var joint1 = new BABYLON.HingeJoint({
  //   mainPivot: new BABYLON.Vector3(-boxSize/2 - wheelThickness/2 - 0.2, box.position.y, -boxSize/2 + wheelDiameter/2),
  //   connectedPivot: new BABYLON.Vector3(0, 0, 0),
  //   mainAxis: new BABYLON.Vector3(0, 0, -1),
  //   connectedAxis: new BABYLON.Vector3(0, 0, -1),
  //   nativeParams: {
  //   }
  // });
  // box.physicsImpostor.addJoint(frontRightWheel.physicsImpostor, joint1);

  // box.physicsImpostor.physicsBody.fixedRotation = true;



  // GUI---------------------------------------------------------

  //   var plane = BABYLON.Mesh.CreatePlane("plane",2);
  //   plane.parent = box;
  //   plane.position.y = 12;
  //   plane.position.x=6;

  var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
// Directional Movement Buttons

var buttonSize = 80;
var buttonSetX = canvas.width/2 - buttonSize*3;
var buttonSetY = canvas.height/2 - buttonSize*2;

//Right Button
var rightButton = BABYLON.GUI.Button.CreateImageOnlyButton(
  "rightArrow",
  "assets/rightArrow.png"
);
rightButton.left = buttonSetX + buttonSize * 2 + "px";
rightButton.top = buttonSetY +"px";
rightButton.width = buttonSize + "px";
rightButton.height = buttonSize + "px";
rightButton.thickness = 0;
advancedTexture.addControl(rightButton);

//Left Button
var leftButton = BABYLON.GUI.Button.CreateImageOnlyButton(
  "leftButton",
  "assets/leftArrow.png"
);
leftButton.left = buttonSetX + "px";
leftButton.top = buttonSetY + "px";
leftButton.width = buttonSize + "px";
leftButton.height = buttonSize + "px";
leftButton.thickness = 0;
advancedTexture.addControl(leftButton);

//Up Arrow
var upButton = BABYLON.GUI.Button.CreateImageOnlyButton(
  "upButton",
  "assets/upArrow.png"
);
upButton.left = buttonSetX + buttonSize + "px";
upButton.top = buttonSetY - buttonSize + "px";
upButton.width = buttonSize + "px";
upButton.height = buttonSize + "px";
upButton.thickness = 0;
advancedTexture.addControl(upButton);

//Down Arrow
var downButton = BABYLON.GUI.Button.CreateImageOnlyButton(
  "downButton",
  "assets/downArrow.png"
)
downButton.left = buttonSetX + buttonSize + "px";
downButton.top = buttonSetY + buttonSize + "px";
downButton.width = buttonSize + "px";
downButton.height = buttonSize + "px";
downButton.thickness = 0;
advancedTexture.addControl(downButton);

var dot = BABYLON.GUI.Button.CreateImageOnlyButton(
  "dot",
  "assets/dot.png"
)
dot.left = buttonSetX + buttonSize + "px";
dot.top = buttonSetY + "px";
dot.width = buttonSize + "px";
dot.height = buttonSize + "px";
dot.thickness = 0;
advancedTexture.addControl(dot);


// /*var plane2 = BABYLON.Mesh.CreatePlane("plane",2);
//   plane.parent = box;
//   plane.position.y = 9;
//   plane.position.x=4;
//   var advancedTexture1 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane2);
// */
//   var button2 = BABYLON.GUI.Button.CreateImageOnlyButton(
//     "rightArrow",
//     "https://image.flaticon.com/icons/png/512/98/98673.png"
//   );
//   button2.width = 1;
//   button2.height = 0.4;
//   button2.color = "white";
//   button2.fontSize = 50;
//   button2.paddingLeft="50px";
//   button2.onPointerUpObservable.add(function() {
//       alert("you did it!");
//   });
//   //advancedTexture1.addControl(button2);



  // Detect updates in state------------------------------------------------------


  // Keyboard Controls

  keysPressed = {};

  document.getElementById("canvas").addEventListener("keydown", (e) => {
    //e.cancelable = false;
    e.preventDefault();
    keysPressed[e.key] = (e.type == "keydown");
  });

  document.getElementById("canvas").addEventListener('keyup', (e) => {
    keysPressed[e.key] = (e.type == "keydown");
  });


  // Button Controls

  buttonsPressed = {};

  rightButton.onPointerDownObservable.add(function() {
    buttonsPressed["right"] = true;
  });
  rightButton.onPointerUpObservable.add(function() {
    buttonsPressed["right"] = false;
  });

  leftButton.onPointerDownObservable.add(function() {
    buttonsPressed["left"] = true;
  });
  leftButton.onPointerUpObservable.add(function() {
    buttonsPressed["left"] = false;
  });

  upButton.onPointerDownObservable.add(function() {
    buttonsPressed["up"] = true;
  });
  upButton.onPointerUpObservable.add(function() {
    buttonsPressed["up"] = false;
  });

  downButton.onPointerDownObservable.add(function() {
    buttonsPressed["down"] = true;
  });
  downButton.onPointerUpObservable.add(function() {
    buttonsPressed["down"] = false;
  });


  // Misc.

  function resetBoxPhysics() {
    if ( !(box.intersectsMesh(frontWall, false) || box.intersectsMesh(backWall, false) ||
          box.intersectsMesh(rightWall, false) || box.intersectsMesh(leftWall, false) ) )
    {
      box.physicsImpostor.sleep();
      box.physicsImpostor.wakeUp();
    }
  }


  // Detect change in state before every frame

  scene.registerBeforeRender( () => {

    // Robot Movement

    if (keysPressed["a"] || buttonsPressed["left"]) { // A, left
      resetBoxPhysics();
      box.rotate(BABYLON.Axis.Y, -0.05, BABYLON.Space.LOCAL);
    }
    if (keysPressed["d"] || buttonsPressed["right"]) {  // D, right
      resetBoxPhysics();
      box.rotate(BABYLON.Axis.Y, 0.05, BABYLON.Space.LOCAL);
    }
    if (keysPressed["s"] || buttonsPressed["down"]) {  // S, backward
      resetBoxPhysics();
      box.translate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL);
    }
    if (keysPressed["w"] || buttonsPressed["up"]) {  // W, forward
      resetBoxPhysics();
      box.translate(BABYLON.Axis.Z, -0.3, BABYLON.Space.LOCAL);
    }

  });

  return scene;
};


var scene = createScene();

engine.runRenderLoop( () => {
  scene.render();
})
