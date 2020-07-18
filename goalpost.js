var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.9;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    // Materials
    
    var mat1 = new BABYLON.StandardMaterial('mat1', scene);
    mat1.diffuseColor = new BABYLON.Color3(0, 1, 0);

    var mat2 = new BABYLON.StandardMaterial('mat2', scene);
    mat2.diffuseColor = new BABYLON.Color4(0.18, 0.21, 0.18);

    var base = BABYLON.MeshBuilder.CreateBox("base", { size: 1, height: 3 }, scene);
    base.position = new BABYLON.Vector3(0.25, 1.5, 0);
    base.material = mat1;

    var hbar = BABYLON.MeshBuilder.CreateBox("hbar", { size: 1, height: 1, width: 6 }, scene);
    hbar.position = new BABYLON.Vector3(0.25, 3.5, 0);
    hbar.material = mat2;

    var vbar1 = BABYLON.MeshBuilder.CreateBox("vbar1", { size: 1, height: 3, width: 1 }, scene);
    vbar1.position = new BABYLON.Vector3(-2.25, 5.5, 0);
    vbar1.material = mat1;

    var vbar2 = BABYLON.MeshBuilder.CreateBox("vbar2", { size: 1, height: 3, width: 1 }, scene);
    vbar2.position = new BABYLON.Vector3( 2.75, 5.5, 0);
    vbar2.material = mat1;
    
    return scene;
};