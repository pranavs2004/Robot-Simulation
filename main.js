var canvas = document.getElementById("canvas");
var engine = new BABYLON.Engine(canvas, true);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createScene() {

  var scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3.Gray();

  // Meshes

  var box = BABYLON.MeshBuilder.CreateBox("Box", {size: 4.0}, scene);
  box.position = new BABYLON.Vector3(0, 2, 0)
  box.scaling = new BABYLON.Vector3(1, 0.3, 1)
  // var box2 = BABYLON.Mesh.CreateBox("Box2", 4.0, scene);
  // box2.position = new BABYLON.Vector3(6, 2, 0);


  var ball = BABYLON.MeshBuilder.CreateSphere("Ball", {diameter: 3}, scene);
  var material = new BABYLON.StandardMaterial("material1", scene);
  ball.material = material;
  ball.position = new BABYLON.Vector3(6, 6, 0);

  var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 140, height: 200}, scene);
  material = new BABYLON.StandardMaterial("material1", scene);
  material.diffuseTexture = new BABYLON.Texture("grid.jpg", scene);
  ground.material = material;

  // Lighting and Shadows

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
  shadowGenerator.addShadowCaster(box);
  shadowGenerator.darkness = 0.1;
  // shadowGenerator.useBlurExponentialShadowMap = true;
  // shadowGenerator.useKernelBlur = true;
  // shadowGenerator.blurKernel = 64;
  shadowGenerator.transparencyShadow = true;

  ground.receiveShadows = true;


  // Camera

  var camera = new BABYLON.FollowCamera("Camera", box.position, scene);
  camera.lockedTarget = box;
  camera.radius = 20;
  camera.heightOffset = 10;
  // camera.inputs.attached.keyboard.angularSpeed = .002;
  // camera.inputs.angularSensibitlity = 1;
  camera.lowerBetaLimit = 0.1;
	camera.upperBetaLimit = (Math.PI / 2) * 0.9;
	camera.lowerRadiusLimit = 30;
	camera.upperRadiusLimit = 150;
  camera.attachControl(canvas, true);
  

  // Physics

  scene.enablePhysics(null, new BABYLON.CannonJSPlugin());
  ball.physicsImpostor = new BABYLON.PhysicsImpostor(ball, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 2, friction: 0.0, restitution: 0.3 }, scene);
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.2, restitution: 0.7 }, scene);
  box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 10, friction: 0.0, restitution: 0.0 }, scene);
  var physicsEngine = scene.getPhysicsEngine();
  var gx = physicsEngine.gravity.x;
  var gz = physicsEngine.gravity.z;
  physicsEngine.setGravity(new BABYLON.Vector3(gx, -9.81, gz));

  // scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
  // ball.applyGravity = true;

  // scene.collisionsEnabled = true;
  // ground.checkCollisions = true;
  // box.checkCollisions = true;
  // ball.checkCollisions = true;

  box.physicsImpostor.physicsBody.fixedRotation = true;


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
  //e.cancelable = false;
  e.preventDefault();
  keysPressed[e.key] = (e.type == "keydown");
});

document.getElementById("canvas").addEventListener('keyup', (e) => {
  keysPressed[e.key] = (e.type == "keydown"); 
});



var scene = createScene();
engine.runRenderLoop( () => {

  scene.render();
  
  var box = scene.getMeshByName("Box");
  // var contactLocalRefPoint = BABYLON.Vector3.Zero();

  if (keysPressed["a"]) { // A, left
    //box.rotation.y -= 0.03;
    box.rotate(BABYLON.Axis.Y, -0.07, BABYLON.Space.LOCAL);
    // var quaternion = new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(box.position.x, 20, box.position.z), -0.07);
    // box.rotationQuaternion = quaternion;
  }
  if (keysPressed["d"]) {  // D, right
    // box.rotation.y += 0.03;
    box.rotate(BABYLON.Axis.Y, 0.07, BABYLON.Space.LOCAL);
    // var quaternion = new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(box.position.x, 20, box.position.z), 0.07)
    // box.rotationQuaternion = quaternion;
  }
  if (keysPressed["s"]) {  // S, backward
    box.translate(BABYLON.Axis.Z, 0.2, BABYLON.Space.LOCAL);
    // box.physicsImpostor.applyForce(new BABYLON.Vector3(0, 0, 1).scale(50), box.getAbsolutePosition().add(contactLocalRefPoint));
  }
  if (keysPressed["w"]) {  // W, forward
    box.translate(BABYLON.Axis.Z, -0.2, BABYLON.Space.LOCAL);
    // box.physicsImpostor.applyForce(new BABYLON.Vector3(0, 0, -1).scale(50), box.getAbsolutePosition().add(contactLocalRefPoint));
  }
})