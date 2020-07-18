var canvas = document.getElementById("canvas");
var engine = new BABYLON.Engine(canvas, true);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createScene() {

  var scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3.Gray();


  // Meshes---------------------------------------------------------

  // Room
  var roomWidth = 121;
  var roomLength = 220;
  var roomHeight = 100;

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
  var wheelDiameter = 2;
  var wheelThickness = 0.5;
  var wheelColors = [new BABYLON.Color4(0, 0, 0, 1), new BABYLON.Color4(0, 0, 0, 1), new BABYLON.Color4(0, 0, 0, 1)];
  // ************************************

  var box = BABYLON.MeshBuilder.CreateBox("Box", {size: boxSize}, scene);
  box.position = new BABYLON.Vector3(0, 1.4, 0);
  box.scaling = new BABYLON.Vector3(1, 0.1, 1);

  var frontRightWheel = BABYLON.MeshBuilder.CreateCylinder("FrontRightWheel", {height: wheelThickness, diameter: wheelDiameter, faceColors: wheelColors }, scene);
  frontRightWheel.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD); 
  frontRightWheel.position = new BABYLON.Vector3(-boxSize/2 - wheelThickness/2, wheelDiameter/2, -boxSize/2 + wheelDiameter/2);
  frontRightWheel.setParent(box);
  
  var frontLeftWheel = BABYLON.MeshBuilder.CreateCylinder("FrontLeftWheel", {height: wheelThickness, diameter: wheelDiameter, faceColors: wheelColors}, scene);
  frontLeftWheel.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD); 
  frontLeftWheel.position = new BABYLON.Vector3(boxSize/2 + wheelThickness/2, wheelDiameter/2, -boxSize/2 + wheelDiameter/2);
  frontLeftWheel.setParent(box);

  var backRightWheel = BABYLON.MeshBuilder.CreateCylinder("BackRightWheel", {height: wheelThickness, diameter: wheelDiameter, faceColors: wheelColors}, scene);
  backRightWheel.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD); 
  backRightWheel.position = new BABYLON.Vector3(-boxSize/2 - wheelThickness/2, wheelDiameter/2, boxSize/2 - wheelDiameter/2);
  backRightWheel.setParent(box);

  var backLeftWheel = BABYLON.MeshBuilder.CreateCylinder("BackLeftWheel", {height: wheelThickness, diameter: wheelDiameter, faceColors: wheelColors}, scene);
  backLeftWheel.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD); 
  backLeftWheel.position = new BABYLON.Vector3(boxSize/2 + wheelThickness/2, wheelDiameter/2, boxSize/2 - wheelDiameter/2);
  backLeftWheel.setParent(box);
  
  // Ball
  var ball = BABYLON.MeshBuilder.CreateSphere("Ball", {diameter: 3}, scene);
  var ballMaterial = new BABYLON.StandardMaterial("ballMaterial", scene);
  ballMaterial.diffuseTexture = new BABYLON.Texture("assets/soccer_texture.jpg", scene);
  ballMaterial.bumpTexture = new BABYLON.Texture("assets/soccer_normal.png", scene);
  ball.material = ballMaterial;
  ball.position = new BABYLON.Vector3(10, 6, 0);



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
  camera.heightOffset = 10;
  camera.inputs.attached.keyboard.angularSpeed = .002;
  camera.inputs.angularSensibitlity = 1;
  camera.lowerBetaLimit = 0.1;
	camera.upperBetaLimit = (Math.PI / 2) * 0.9;
	camera.lowerRadiusLimit = 10;
	camera.upperRadiusLimit = 150;
  camera.attachControl(canvas, true);
  


  // Physics---------------------------------------------------------

  scene.enablePhysics(null, new BABYLON.CannonJSPlugin());
  ball.physicsImpostor = new BABYLON.PhysicsImpostor(ball, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 2, friction: 1, restitution: 0.3 }, scene);
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.2, restitution: 0.7 }, scene);
  box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 6, friction: 0.0, restitution: 0.0 }, scene);
  // frontRightWheel.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 0.1, restitution: 0.0 }, scene);
  // frontLeftWheel.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 0.1, restitution: 0.0 }, scene);
  // backRightWheel.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 0.1, restitution: 0.0 }, scene);
  // backLeftWheel.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 0.1, restitution: 0.0 }, scene);

  rightWall.physicsImpostor = new BABYLON.PhysicsImpostor(rightWall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);
  leftWall.physicsImpostor = new BABYLON.PhysicsImpostor(leftWall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);
  frontWall.physicsImpostor = new BABYLON.PhysicsImpostor(frontWall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);
  backWall.physicsImpostor = new BABYLON.PhysicsImpostor(backWall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);

  // box.physicsImpostor.physicsBody.fixedRotation = true;



  // Keyboard Controls 

  function resetPhysics() {
    if ( !(box.intersectsMesh(frontWall, false) || box.intersectsMesh(backWall, false) || 
          box.intersectsMesh(rightWall, false) || box.intersectsMesh(leftWall, false) ) ) 
    {
      box.physicsImpostor.sleep();
      box.physicsImpostor.wakeUp();
    }
  }

  keysPressed = {};

  document.getElementById("canvas").addEventListener("keydown", (e) => {
    //e.cancelable = false;
    e.preventDefault();
    keysPressed[e.key] = (e.type == "keydown");
  });

  document.getElementById("canvas").addEventListener('keyup', (e) => {
    keysPressed[e.key] = (e.type == "keydown"); 
  });

  scene.registerBeforeRender( () => {
    if (keysPressed["a"]) { // A, left
      resetPhysics();
      box.rotate(BABYLON.Axis.Y, -0.05, BABYLON.Space.LOCAL);
    }
    if (keysPressed["d"]) {  // D, right
      resetPhysics();
      box.rotate(BABYLON.Axis.Y, 0.05, BABYLON.Space.LOCAL);
    }
    if (keysPressed["s"]) {  // S, backward
      resetPhysics();
      box.translate(BABYLON.Axis.Z, 0.2, BABYLON.Space.LOCAL);
    }
    if (keysPressed["w"]) {  // W, forward
      resetPhysics();
      box.translate(BABYLON.Axis.Z, -0.2, BABYLON.Space.LOCAL);
    }
  });



  // GUI---------------------------------------------------------

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





var scene = createScene();

engine.runRenderLoop( () => {
  scene.render();
})
