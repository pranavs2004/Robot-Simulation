var bar = document.getElementById("UIBar");
bar.width = window.innerWidth;

var canvasRight = document.getElementById("canvasRight");
canvasRight.width = window.innerWidth;
canvasRight.height = window.innerHeight;

// var canvasLeft = document.getElementById("canvasLeft");
// canvasLeft.width = window.innerWidth/2 - 1;
// canvasLeft.height = window.innerHeight;

// var canvas = document.getElementById("canvas");
// canvas.width = 100;
// canvas.length = 100;

var engine = new BABYLON.Engine(document.getElementById("canvasRight"), true);

// Set the default canvas to use for events
// engine.inputElement = canvasRight;


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

  var gl = new BABYLON.GlowLayer("glow", scene);

  var field = new BABYLON.MeshBuilder.CreateGround("field", {width: fieldWidth, height: fieldLength}, scene);
  fieldMaterial = new BABYLON.StandardMaterial("fieldMaterial", scene);
  fieldMaterial.emmissiveColor = new BABYLON.Color3(1, 1, 1);
  fieldMaterial.diffuseTexture = new BABYLON.Texture("assets/soccer_field.png", scene);
  fieldMaterial.diffuseTexture.hasAlpha = true;
  field.material = fieldMaterial;
  field.position.y = 0.1;



  // Robot

  // *****Parameters for convenience*****
  var boxSize = 6;
  var boxColors = [
    new BABYLON.Color4(1, 0, 0, 1), new BABYLON.Color4(1, 0, 0, 1), new BABYLON.Color4(1, 0, 0, 1),
    new BABYLON.Color4(1, 0, 0, 1), new BABYLON.Color4(1, 0, 0, 1), new BABYLON.Color4(1, 0, 0, 1)
  ];
  var boxColors2 = [
    new BABYLON.Color4(0, 0, 1, 1), new BABYLON.Color4(0, 0, 1, 1), new BABYLON.Color4(0, 0, 1, 1),
    new BABYLON.Color4(0, 0, 1, 1), new BABYLON.Color4(0, 0, 1, 1), new BABYLON.Color4(0, 0, 1, 1)
  ];
  var wheelDiameter = 2;
  var wheelThickness = 0.5;
  var wheelColors = [new BABYLON.Color4(0, 0, 0, 1), new BABYLON.Color4(0, 0, 0, 1), new BABYLON.Color4(0, 0, 0, 1)];
  var wheelY = -1;
  // ************************************

  // Robot 1 - red

  var box = BABYLON.MeshBuilder.CreateBox("Box", {size: boxSize, faceColors: boxColors, height: 2}, scene);
  box.position = new BABYLON.Vector3(0, 2, -10);

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

  box.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.WORLD);


  // Robot 2 - blue

  var box2 = BABYLON.MeshBuilder.CreateBox("Box2", {size: boxSize, faceColors: boxColors2, height: 2}, scene);
  box2.position = new BABYLON.Vector3(0, 2, 10);

  var frontRod2 = BABYLON.MeshBuilder.CreateCylinder("FrontRod2", {height: boxSize+0.4, diameter: 0.5}, scene);
  frontRod2.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
  frontRod2.position = new BABYLON.Vector3(0, wheelY, -boxSize/2 + wheelDiameter/2);
  frontRod2.parent = box2;

  var backRod2 = BABYLON.MeshBuilder.CreateCylinder("BackRod", {height: boxSize+0.4, diameter: 0.5}, scene);
  backRod2.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
  backRod2.position = new BABYLON.Vector3(0, wheelY, boxSize/2 - wheelDiameter/2);
  backRod2.parent = box2;

  var frontRightWheel2 = BABYLON.MeshBuilder.CreateCylinder("FrontRightWheel2", {height: wheelThickness, diameter: wheelDiameter, faceColors: wheelColors }, scene);
  frontRightWheel2.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
  frontRightWheel2.position = new BABYLON.Vector3(-boxSize/2 - wheelThickness/2 - 0.2, wheelY, -boxSize/2 + wheelDiameter/2);
  frontRightWheel2.parent = box2;

  var frontLeftWheel2 = BABYLON.MeshBuilder.CreateCylinder("FrontLeftWheel2", {height: wheelThickness, diameter: wheelDiameter, faceColors: wheelColors}, scene);
  frontLeftWheel2.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
  frontLeftWheel2.position = new BABYLON.Vector3(boxSize/2 + wheelThickness/2 + 0.2, wheelY, -boxSize/2 + wheelDiameter/2);
  frontLeftWheel2.parent = box2;

  var backRightWheel2 = BABYLON.MeshBuilder.CreateCylinder("BackRightWheel2", {height: wheelThickness, diameter: wheelDiameter, faceColors: wheelColors}, scene);
  backRightWheel2.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
  backRightWheel2.position = new BABYLON.Vector3(-boxSize/2 - wheelThickness/2 - 0.2, wheelY, boxSize/2 - wheelDiameter/2);
  backRightWheel2.parent = box2;

  var backLeftWheel2 = BABYLON.MeshBuilder.CreateCylinder("BackLeftWheel2", {height: wheelThickness, diameter: wheelDiameter, faceColors: wheelColors}, scene);
  backLeftWheel2.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
  backLeftWheel2.position = new BABYLON.Vector3(boxSize/2 + wheelThickness/2 + 0.2, wheelY, boxSize/2 - wheelDiameter/2);
  backLeftWheel2.parent = box2;




  // Ball
  var ball = BABYLON.MeshBuilder.CreateSphere("Ball", {diameter: 3}, scene);
  var ballMaterial = new BABYLON.StandardMaterial("ballMaterial", scene);
  ballMaterial.diffuseTexture = new BABYLON.Texture("assets/soccer_texture.jpg", scene);
  ballMaterial.bumpTexture = new BABYLON.Texture("assets/soccer_normal.png", scene);
  ball.material = ballMaterial;
  ball.position = new BABYLON.Vector3(0, 20, 0);


  // Goalposts

  //*****Parameters for convenience*****
  var goalWidth = 30;
  var goalLength = 15;
  var goalHeight = 15;
  var barSize = 1;
  //************************************

  var mat1 = new BABYLON.StandardMaterial('mat1', scene);
  mat1.diffuseColor = new BABYLON.Color3(0, 0, 1);

  var mat2 = new BABYLON.StandardMaterial('mat2', scene);
  mat2.diffuseColor = new BABYLON.Color3(1, 0, 0);

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

  var goalArea1 = new BABYLON.MeshBuilder.CreateGround("goalArea1", {width: goalWidth, height: goalLength}, scene);
  goalArea1.position = new BABYLON.Vector3(0, 0.1, fieldLength/2 + goalLength/2);
  goalArea1.material = areaMat;


  // goalpost 2
  var base2 = BABYLON.MeshBuilder.CreateBox("base2", { size: barSize, width: goalWidth }, scene);
  base2.position = new BABYLON.Vector3(0, barSize, 0);
  base2.material = mat2;

  var hbar2 = BABYLON.MeshBuilder.CreateBox("hbar2", { size: barSize, width: goalWidth }, scene);
  hbar2.position = new BABYLON.Vector3(0, goalHeight - barSize/2, -goalLength + barSize);
  hbar2.material = mat2;
  hbar2.parent = base2;

  var vbar1_2 = BABYLON.MeshBuilder.CreateBox("vbar1_2", { size: barSize, height: goalHeight-1 }, scene);
  vbar1_2.position = new BABYLON.Vector3(-goalWidth/2 + barSize/2, goalHeight/2 - barSize/2, -goalLength + barSize);
  vbar1_2.material = mat2;
  vbar1_2.parent = base2;

  var vbar2_2 = BABYLON.MeshBuilder.CreateBox("vbar2_2", { size: barSize, height: goalHeight-1 }, scene);
  vbar2_2.position = new BABYLON.Vector3(goalWidth/2 - barSize/2, goalHeight/2 - barSize/2, -goalLength + barSize);
  vbar2_2.material = mat2;
  vbar2_2.parent = base2;

  var c1_2 = BABYLON.MeshBuilder.CreateBox("c1_2", { size: barSize, depth: goalLength}, scene);
  c1_2.position = new BABYLON.Vector3(goalWidth/2 - barSize/2, 0, -goalLength/2 + barSize/2);
  c1_2.material = mat2;
  c1_2.parent = base2;

  var c2_2 = BABYLON.MeshBuilder.CreateBox("c2_2", { size: barSize, depth: goalLength}, scene);
  c2_2.position = new BABYLON.Vector3(-goalWidth/2 + barSize/2, 0, -goalLength/2 + barSize/2);
  c2_2.material = mat2;
  c2_2.parent = base2;

  var netRight2 = BABYLON.MeshBuilder.CreateDisc("netRight", {radius: goalHeight, arc: 0.5, tessellation: 2, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene); // makes a triangle
  netRight2.position = new BABYLON.Vector3(-goalWidth/2 + barSize/2, 0, -goalLength + barSize/2);
  netRight2.rotate(BABYLON.Axis.Y, -Math.PI/2, BABYLON.Space.World);
  netRight2.material = netMat;
  netRight2.parent = base2;

  var netLeft2 = BABYLON.MeshBuilder.CreateDisc("netRight", {radius: goalHeight, arc: 0.5, tessellation: 2, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene); // makes a triangle
  netLeft2.position = new BABYLON.Vector3(goalWidth/2 - barSize/2, 0, -goalLength + barSize/2);
  netLeft2.rotate(BABYLON.Axis.Y, -Math.PI/2, BABYLON.Space.World);
  netLeft2.material = netMat;
  netLeft2.parent = base2;

  var netBack2 = BABYLON.MeshBuilder.CreatePlane("netBack", {width: goalWidth-barSize, height: Math.sqrt(goalHeight*goalHeight+goalLength*goalLength), sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
  netBack2.position = new BABYLON.Vector3(0, goalHeight/2, -goalLength/2 + 0.5);
  netBack2.rotate(BABYLON.Axis.X, -Math.PI/4, BABYLON.Space.World);
  netBack2.material = netMat;
  netBack2.parent = base2;

  base2.position = new BABYLON.Vector3(0, barSize/2 + 1, -fieldLength/2 - goalLength);
  base2.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.WORLD);

  var goalArea2 = new BABYLON.MeshBuilder.CreateGround("goalArea1", {width: goalWidth, height: goalLength}, scene);
  goalArea2.position = new BABYLON.Vector3(0, 0.1, -fieldLength/2 - goalLength/2);
  goalArea2.material = areaMat;


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
  camera.attachControl(canvasRight, true);

  var camera2 = new BABYLON.FollowCamera("Camera2", box2.position, scene);
  camera2.lockedTarget = box2;
  camera2.radius = 20;
  camera2.heightOffset = 7;
  camera2.inputs.attached.keyboard.angularSpeed = .002;
  camera2.inputs.angularSensibitlity = 1;
  camera2.lowerBetaLimit = 0.1;
  camera2.upperBetaLimit = (Math.PI / 2) * 0.9;
  camera2.lowerRadiusLimit = 10;
  camera2.upperRadiusLimit = 150;
  camera2.attachControl(canvasRight, true);

  scene.activeCameras.push(camera);
  scene.activeCameras.push(camera2);

  camera.viewport = new BABYLON.Viewport(0, 0, 0.5, 1);
  camera2.viewport = new BABYLON.Viewport(0.5, 0, 0.5, 1);

  // engine.registerView(canvasRight, camera);
  // engine.registerView(canvasLeft, camera);



  // Physics---------------------------------------------------------

  scene.enablePhysics(null, new BABYLON.CannonJSPlugin());

  ball.physicsImpostor = new BABYLON.PhysicsImpostor(ball, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 2, friction: 0.7, restitution: 0.3 }, scene);
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.2, restitution: 0.7 }, scene);

  frontRightWheel.physicsImpostor = new BABYLON.PhysicsImpostor(frontRightWheel, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 10000, restitution: 0.0 }, scene);
  frontLeftWheel.physicsImpostor = new BABYLON.PhysicsImpostor(frontLeftWheel, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 10000, restitution: 0.0 }, scene);
  backRightWheel.physicsImpostor = new BABYLON.PhysicsImpostor(backRightWheel, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 10000, restitution: 0.0 }, scene);
  backLeftWheel.physicsImpostor = new BABYLON.PhysicsImpostor(backLeftWheel, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 10000, restitution: 0.0 }, scene);
  box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 10000, friction: 10000, restitution: 0.0 }, scene);

  frontRightWheel2.physicsImpostor = new BABYLON.PhysicsImpostor(frontRightWheel2, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 0.1, restitution: 0.0 }, scene);
  frontLeftWheel2.physicsImpostor = new BABYLON.PhysicsImpostor(frontLeftWheel2, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 0.1, restitution: 0.0 }, scene);
  backRightWheel2.physicsImpostor = new BABYLON.PhysicsImpostor(backRightWheel2, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 0.1, restitution: 0.0 }, scene);
  backLeftWheel2.physicsImpostor = new BABYLON.PhysicsImpostor(backLeftWheel2, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 0.1, restitution: 0.0 }, scene);
  box2.physicsImpostor = new BABYLON.PhysicsImpostor(box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 10000, friction: 0.5, restitution: 0.0 }, scene);

  var goal1Components = [netRight, netLeft, netBack, hbar, vbar1, vbar2, c1, c2, base];
  for (var i = 3; i < goal1Components.length; i++) {
    goal1Components[i].physicsImpostor = new BABYLON.PhysicsImpostor(goal1Components[i], BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2000, friction: 10000, restitution: 0 }, scene);
  }

  var goal2Components = [netRight2, netLeft2, netBack2, hbar2, vbar1_2, vbar2_2, c1_2, c2_2, base2];
  for (var i = 3; i < goal2Components.length; i++) {
    goal2Components[i].physicsImpostor = new BABYLON.PhysicsImpostor(goal2Components[i], BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2000, friction: 10000, restitution: 0 }, scene);
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
  var buttonSetX = canvasRight.width/2 - buttonSize*5;
  var buttonSetY = canvasRight.height/2 - buttonSize*2;

  //Right Button
  var rightButton = BABYLON.GUI.Button.CreateImageOnlyButton(
    "rightArrow",
    "assets/rightArrow.png"
  );
  rightButton.left = buttonSetX + buttonSize*4 + "px";
  rightButton.top = buttonSetY +"px";
  rightButton.width = buttonSize*2 + "px";
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
  leftButton.width = buttonSize*2 + "px";
  leftButton.height = buttonSize + "px";
  leftButton.thickness = 0;
  advancedTexture.addControl(leftButton);

  //Up Arrow
  var upButton = BABYLON.GUI.Button.CreateImageOnlyButton(
    "upButton",
    "assets/upArrow.png"
  );
  upButton.left = buttonSetX + buttonSize*2 + "px";
  upButton.top = buttonSetY - buttonSize + "px";
  upButton.width = buttonSize*2 + "px";
  upButton.height = buttonSize + "px";
  upButton.thickness = 0;
  advancedTexture.addControl(upButton);

  //Down Arrow
  var downButton = BABYLON.GUI.Button.CreateImageOnlyButton(
    "downButton",
    "assets/downArrow.png"
  )
  downButton.left = buttonSetX + buttonSize*2 + "px";
  downButton.top = buttonSetY + buttonSize + "px";
  downButton.width = buttonSize*2 + "px";
  downButton.height = buttonSize + "px";
  downButton.thickness = 0;
  advancedTexture.addControl(downButton);

  var dot = BABYLON.GUI.Button.CreateImageOnlyButton(
    "dot",
    "assets/dot.png"
  )
  dot.left = buttonSetX + buttonSize*2 + "px";
  dot.top = buttonSetY + "px";
  dot.width = buttonSize*2 + "px";
  dot.height = buttonSize + "px";
  dot.thickness = 0;
  advancedTexture.addControl(dot);

  var winText = new BABYLON.GUI.TextBlock();
  winText.text = "X Wins";
  winText.color = "white";
  winText.fontSize = 50;
  winText.fontFamily = "monospace";
  winText.isVisible = false;
  advancedTexture.addControl(winText);

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

  document.getElementById("canvasRight").addEventListener("keydown", (e) => {
    //e.cancelable = false;
    e.preventDefault();
    keysPressed[e.key] = (e.type == "keydown");
  });

  document.getElementById("canvasRight").addEventListener('keyup', (e) => {
    keysPressed[e.key] = (e.type == "keydown");
  });


  // Button Controls

  var buttonsPressed = {};

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
  var recordedScore = false;
  var score = 0;
  var score2 = 0;


  // Detect change in state before every frame

  scene.registerBeforeRender( () => {

    // Only allow movement and other game logic before game is over
    // Game over after either score or score2 is 5

    if (score < 5 && score2 < 5) {

      // Robot Movement
      if (keysPressed["a"]) { // A, left
        resetBoxPhysics();
        box.rotate(BABYLON.Axis.Y, -0.05, BABYLON.Space.LOCAL);
      }
      if (keysPressed["d"]) {  // D, right
        resetBoxPhysics();
        box.rotate(BABYLON.Axis.Y, 0.05, BABYLON.Space.LOCAL);
      }
      if (keysPressed["s"]) {  // S, backward
        resetBoxPhysics();
        box.translate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL);
      }
      if (keysPressed["w"]) {  // W, forward
        resetBoxPhysics();
        box.translate(BABYLON.Axis.Z, -0.3, BABYLON.Space.LOCAL);
      }

      // Robot2 Movement
      if (keysPressed["j"] || buttonsPressed["left"]) { // A, left
        resetBoxPhysics();
        box2.rotate(BABYLON.Axis.Y, -0.05, BABYLON.Space.LOCAL);
      }
      if (keysPressed["l"] || buttonsPressed["right"]) {  // D, right
        resetBoxPhysics();
        box2.rotate(BABYLON.Axis.Y, 0.05, BABYLON.Space.LOCAL);
      }
      if (keysPressed["k"] || buttonsPressed["down"]) {  // S, backward
        resetBoxPhysics();
        box2.translate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL);
      }
      if (keysPressed["i"] || buttonsPressed["up"]) {  // W, forward
        resetBoxPhysics();
        box2.translate(BABYLON.Axis.Z, -0.3, BABYLON.Space.LOCAL);
      }


      //ScoreBoard
      var scoreTexture = new BABYLON.DynamicTexture("scoreTexture", 512, scene, true);
      var scoreboard = BABYLON.Mesh.CreatePlane("scoreboard", 5, scene);
      // Position the scoreboard after the lane.
      scoreboard.position.z = 40;
      // Create a material for the scoreboard.
      scoreboard.material = new BABYLON.StandardMaterial("scoradboardMat", scene);
      // Set the diffuse texture to be the dynamic texture.
      scoreboard.material.diffuseTexture = scoreTexture;




      // Scoring a goal

      if (ball.intersectsMesh(netBack, true) || ball.intersectsMesh(netRight, true) || ball.intersectsMesh(netLeft, true)) {
        ball.physicsImpostor.sleep();
        ball.physicsImpostor.wakeUp(); console.log("wtf");

        if (!recordedScore) {
          score2++;
          recordedScore = true;
          console.log("red: ", score2);
        }

        ball.position = new BABYLON.Vector3(0, 2, 4);
      }
      else if (ball.intersectsMesh(netBack2, true) || ball.intersectsMesh(netRight2, true) || ball.intersectsMesh(netLeft2, true)) {
        ball.physicsImpostor.sleep();
        ball.physicsImpostor.wakeUp();

        if (!recordedScore) {
          score++;
          recordedScore = true;
          console.log("blue: ", score);
        }

        ball.position = new BABYLON.Vector3(0, 2, 4);
      }
      else {
        recordedScore = false;
      }


      // When ball is out of bounds, put it back at center of field

      if (!(ball.intersectsMesh(field, true) || ball.intersectsMesh(goalArea1, true) || ball.intersectsMesh(goalArea2, true)) &&
            ball.position.y <= 1.5 )
      {
        ball.physicsImpostor.sleep();
        ball.physicsImpostor.wakeUp();

        ball.position = new BABYLON.Vector3(0, 2, 4);
      }
    }
    else {
      if (score2 >= 5) {
        winText.text = "Red Wins";
      }
      else {
        winText.text = "Blue Wins"
      }
      winText.isVisible = true;
    }

  });
  return scene;
};


var scene = createScene();

engine.runRenderLoop( () => {
  scene.render();
});
