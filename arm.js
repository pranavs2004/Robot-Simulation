var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(5, 3, 0), scene);
    camera.setPosition(new BABYLON.Vector3(14, 8, -12));
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.9;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    // Materials
    
    var mat1 = new BABYLON.StandardMaterial('mat1', scene);

    var armbase1 = BABYLON.MeshBuilder.CreateBox("armbase1", { size: 1, height:3 }, scene);
    armbase1.position = new BABYLON.Vector3(1, 1.5, 0);
    armbase1.material = mat1;

    var armbase2 = BABYLON.MeshBuilder.CreateBox("armbase2", { size: 1, height:3 }, scene);
    armbase2.position = new BABYLON.Vector3(-1, 1.5, 0);
    armbase2.material = mat1;

    var armRod = BABYLON.MeshBuilder.CreateCylinder("ArmRod", {height: 3, diameter: 0.25}, scene);
    armRod.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
    armRod.position = new BABYLON.Vector3(0, 2.625, 0);

    var mArm = BABYLON.MeshBuilder.CreateBox("mArm", {depth: 3}, scene);
    mArm.position = new BABYLON.Vector3(0, 2.625, -1.75);
    mArm.material = mat1;

    scene.registerBeforeRender(function () {
        mArm.rotation.x += 0.01;
    });

    var axis = new BABYLON.Vector3(10, 0, 0);
    //var axisLine = BABYLON.Mesh.CreateLines("axis", [axis.scale(-5), axis.scale(5)], scene);
    axis.normalize();
    var theta = Math.PI / 8;
    var quaternion = new BABYLON.Quaternion.RotationAxis(axis, theta);
    mArm.rotationQuaternion = quaternion;

    scene.registerBeforeRender(function () {
        theta += 0.01;
        quaternion = new BABYLON.Quaternion.RotationAxis(axis, theta);
        mArm.rotationQuaternion = quaternion;
    });

    return scene;
};
