//texture loader
const textureLoader = new THREE.TextureLoader();
// texture load
const metalfloor2Color = textureLoader.load("textures/gross-dirty-tiles-bl/gross-dirty-tiles_albedo.png");
const metalfloor2Ao = textureLoader.load("textures/gross-dirty-tiles-bl/gross-dirty-tiles_ao.png");
const metalfloor2Metal = textureLoader.load("textures/gross-dirty-tiles-bl/gross-dirty-tiles_metallic.png");
const metalfloor2Rough = textureLoader.load("textures/gross-dirty-tiles-bl/gross-dirty-tiles_roughness.png");
const metalfloor2Normal = textureLoader.load("textures/gross-dirty-tiles-bl/gross-dirty-tiles_normal-ogl.png");
const metalfloor2Height = textureLoader.load("textures/gross-dirty-tiles-bl/gross-dirty-tiles_height.png");
const paintedwall2Color = textureLoader.load("textures/painted-metal-shed-bl/painted_metal_shed_albedo.png");
const paintedwall2Ao = textureLoader.load("textures/painted-metal-shed-bl/painted_metal_shed_ao.png");
const paintedwall2Metal = textureLoader.load("textures/painted-metal-shed-bl/painted_metal_shed_metallic.png");
const paintedwall2Rough = textureLoader.load("textures/painted-metal-shed-bl/painted_metal_shed_roughness.png");
const paintedwall2Normal = textureLoader.load("textures/painted-metal-shed-bl/painted_metal_shed_normal-ogl.png");
const paintedwall2Height = textureLoader.load("textures/painted-metal-shed-bl/painted_metal_shed_height.png");
const painted2wall2Color = textureLoader.load("textures/chipping-painted-wall-bl/chipping-painted-wall_albedo.png");
const painted2wall2Ao = textureLoader.load("textures/chipping-painted-wall-bl/chipping-painted-wall_ao.png");
const painted2wall2Metal = textureLoader.load("textures/chipping-painted-wall-bl/chipping-painted-wall_metallic.png");
const painted2wall2Rough = textureLoader.load("textures/chipping-painted-wall-bl/chipping-painted-wall_roughness.png");
const painted2wall2Normal = textureLoader.load("textures/chipping-painted-wall-bl/chipping-painted-wall_normal-ogl.png");
const painted2wall2Height = textureLoader.load("textures/chipping-painted-wall-bl/chipping-painted-wall_height.png");
const item2Color = textureLoader.load("textures/cgaxis_violet_crystal_43_04_4K/violet_crystal_43_04_diffuse.jpg");
const item2Ao = textureLoader.load("textures/cgaxis_violet_crystal_43_04_4K/violet_crystal_43_04_ao.jpg");
const item2Metal = textureLoader.load("textures/cgaxis_violet_crystal_43_04_4K/violet_crystal_43_04_glossiness.jpg");
const item2Rough = textureLoader.load("textures/cgaxis_violet_crystal_43_04_4K/violet_crystal_43_04_roughness.jpg");
const item2Normal = textureLoader.load("textures/cgaxis_violet_crystal_43_04_4K/violet_crystal_43_04_normal.jpg");
const item2Height = textureLoader.load("textures/cgaxis_violet_crystal_43_04_4K/violet_crystal_43_04_height.jpg");
// make floor material
const floorMaterial = new THREE.MeshStandardMaterial({
    map: metalfloor2Color,
    normalMap: metalfloor2Normal,
    displacementMap: metalfloor2Height,
    displacementScale: 0.1,
    displacementBias: -0.05,
    roughnessMap: metalfloor2Rough,
    roughness: 0.8,
    aoMap: metalfloor2Ao,
    aoMapIntensity: 1,
    metalnessMap: metalfloor2Metal,
    metalness: 0
});
// make wall material (this wall can portal placed)
const wallMaterial = new THREE.MeshStandardMaterial({
    map: paintedwall2Color,
    normalMap: paintedwall2Normal,
    displacementMap: paintedwall2Height,
    displacementScale: 0.1,
    displacementBias: -0.05,
    roughnessMap: paintedwall2Rough,
    roughness: 0.8,
    aoMap: paintedwall2Ao,
    aoMapIntensity: 1,
    metalnessMap: paintedwall2Metal,
    metalness: 0.1
});
// make wall2 material (this wall can not portal placed)
const wall2Material = new THREE.MeshStandardMaterial({
    map: painted2wall2Color,
    normalMap: painted2wall2Normal,
    displacementMap: painted2wall2Height,
    displacementScale: 0.1,
    displacementBias: -0.05,
    roughnessMap: painted2wall2Rough,
    roughness: 0.8,
    aoMap: painted2wall2Ao,
    aoMapIntensity: 1,
    metalnessMap: painted2wall2Metal,
    metalness: 0.1
});
// make item material
const itemMaterial = new THREE.MeshStandardMaterial({
    map: item2Color,
    normalMap: item2Normal,
    displacementMap: item2Height,
    displacementScale: 0.1,
    displacementBias: -0.05,
    roughnessMap: item2Rough,
    roughness: 0.8,
    aoMap: item2Ao,
    aoMapIntensity: 1,
    metalnessMap: item2Metal,
    metalness: 0.1
});
// portal status
const Status = {
    NONE: - 1,
    FRONT: 0,
    BACK: 1,
    LEFT: 2,
    RIGHT: 3
};
// ========================= configuration ==============================
// character size (default = 10)
const CHARACTER_HEIGHT = 10;
// debugger mode. default = false
const flyMode = false;
// movement speed (default = 0.1)
const moveSpeed = flyMode ? 0.30 : 0.10;
// portal size (default = 0.10)
const portalSize = 0.10;
// max distance between camera and portal
const maxDistance = 100;
// ======================================================================
// canvas
var canvas;
// renderer
var renderer;
// main camera
var camera;
// scene
var scene;
// camera movement controler
var cameraControls;
// camera head for not to bounce off the wall
var cameraHead;
// get the coordinates the mouse is looking at
var ray = new THREE.Raycaster();
// check mouse pointer is locked
var isLocked = false;
// mouse position (x,y)
var mouse = new THREE.Vector2();
// camera light
const cameraLight = new THREE.PointLight(0xcccccc, 0.8, 120);
// world (physics)
var world;
// camera body (physics)
var cameraBody;
// save objects that need to be updated (physics)
var objectsToUpdate = [];
// portal camera
var portalCamera;
// portal bottom left corner
var bottomLeftCorner;
// portal bottom right corner
var bottomRightCorner;
// portal top left corner
var topLeftCorner;
// reflected position
var reflectedPosition;
// left portal
var leftPortal;
// right portal
var rightPortal;
// left portal texture
var leftPortalTexture;
// right portal texture
var rightPortalTexture;
// portal-creatable walls
var portalWalls = [];
// frontWalls, backWalls, leftWalls, rightWalls
var frontWalls = [];
var backWalls = [];
var leftWalls = [];
var rightWalls = [];
// where portals placed (-1: none, 0: front, 1: back, 2: left, 3: right)
var leftPortalStatus = Status.NONE;
var rightPortalStatus = Status.NONE;
// view in portal
var viewInPortal = false;
// portal UID
var portalUID = [];
// distance between camera and portal
var distance;
// portal position viewer
var line;
// portalgun move speed
var portalgunMoveSpeed = 3;
// keyboard movement delay (default = 0.001)
var delay = 0.001;
// check death (false: alive)
var isDead = false;
// portal outline material & mesh
const outlineMaterial_left = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const outlineMaterial_right = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var outlineMesh_left = new THREE.Mesh(new THREE.PlaneGeometry(100.1 * portalSize, 100.1 * portalSize), outlineMaterial_left);
var outlineMesh_right = new THREE.Mesh(new THREE.PlaneGeometry(100.1 * portalSize, 100.1 * portalSize), outlineMaterial_right);
// object loader
var loadingManager = new THREE.LoadingManager();
// Object for Portal Gun
var portalgun;
var model = {
    portal_gun: {
        obj: "models/Portal_Gun.obj",
        mtl: "models/Portal_Gun.mtl",
        mesh: null,
        castShadow: false
    }
}
// ======================== Audio =========================
// bgm (background music)
const bgm = new Audio();
bgm.src = "./audio/background2.mp3";
// portal place sound (left, right)
const leftPortalSound = new Audio();
const rightPortalSound = new Audio();
leftPortalSound.src = "../audio/Portal_Gun_Fire_Blue.mp3";
leftPortalSound.preload = 'auto';
leftPortalSound.currentTime = 0.4;
leftPortalSound.volume = 0.1;
rightPortalSound.src = "../audio/Portal_Gun_Fire_Orange.mp3";
rightPortalSound.preload = 'auto';
rightPortalSound.currentTime = 0.4;
rightPortalSound.volume = 0.1;
// item get sound
const itemGetSound = new Audio();
itemGetSound.src = "../audio/itemGetSound.mp3";
itemGetSound.preload = 'auto';
itemGetSound.volume = 0.05;
// death sound
const deathSound = new Audio();
deathSound.src = "../audio/deathSound.mp3";
deathSound.preload = 'auto';
deathSound.volume = 0.2;
// portal enter sound
const portalEnterSound = new Audio();
portalEnterSound.src = "../audio/portalEnterSound.mp3";
portalEnterSound.volume = 0.2;
// player walk sound
const walkSound = new Audio();
walkSound.src = "../audio/walkSound.mp3";
walkSound.volume = 0.2;
walkSound.loop = true;
// ========================================================

// window onload
window.onload = function init() {

    // set canvas
    canvas = document.getElementById("gl-canvas");
    canvas.width = window.innerWidth - 16;
    canvas.height = window.innerHeight - 45;

    // set world (physics)
    world = new CANNON.World();
    world.gravity.set(0, -80, 0);

    // set renderer
    renderer = new THREE.WebGLRenderer({ canvas });

    // set camera
    camera = new THREE.PerspectiveCamera(70, canvas.width / canvas.height, 0.01, 2000);
    camera.position.set(-55, CHARACTER_HEIGHT / 2 + 5, -65);

    // set scene
    scene = new THREE.Scene();

    // ======================== make portalgun =========================
    for (var _key in model) {
        (function (key) {
            var mtlLoader = new THREE.MTLLoader(loadingManager);
            mtlLoader.load(model[key].mtl, function (materials) {
                materials.preload();

                var objLoader = new THREE.OBJLoader(loadingManager);

                objLoader.setMaterials(materials);
                objLoader.load(model[key].obj, function (mesh) {

                    mesh.traverse(function (node) {
                        if (node instanceof THREE.Mesh) {
                            if ('castShadow' in model[key])
                                node.castShadow = model[key].castShadow;
                            else
                                node.castShadow = true;

                            if ('receiveShadow' in model[key])
                                node.receiveShadow = model[key].receiveShadow;
                            else
                                node.receiveShadow = true;
                        }
                    });
                    model[key].mesh = mesh;

                });
            });

        })(_key);
    }
    loadingManager.onStart = function (item, loaded, total) {
        console.log(item, loaded, total);
    };
    loadingManager.onLoad = function () {
        try {
            onResourcesLoaded();
            console.log("loaded all resources");
            RESOURCES_LOADED = true;
        }
        catch (e) {
            window.alert("Loader has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, isolated - app, chrome - extension, chrome, https, chrome - untrusted.");
            window.open('error.html', '_self');
        }
    };
    scene.add(camera);
    // =================================================================

    // set camera control
    cameraControls = new PointerLockControls(camera, document.body);

    // when you click window, mouse locked.
    window.addEventListener('click', function () {
        cameraControls.lock();
    });

    // add event listener for mouse lock
    cameraControls.addEventListener('lock', function () {
        isLocked = true;
    });
    cameraControls.addEventListener('unlock', function () {
        isLocked = false;
    });

    // create camera body & head
    cameraBody = createCameraBody(CHARACTER_HEIGHT);
    cameraHead = createCameraHead();

    // createMap
    createMap();

    // camera light
    cameraLight.castShadow = true;
    scene.add(cameraLight);

    // lights (stage 1)
    const mainLight = new THREE.PointLight(0xccffff, 1, 500);
    mainLight.position.y = 400;
    mainLight.position.x = 30;
    mainLight.position.z = 30;
    mainLight.castShadow = true;
    scene.add(mainLight);

    // lights (stage 2)
    for (var i = 0; i < 4; i++) {
        var main2Light = new THREE.PointLight(0xccffff, 1, 300);
        if (i == 3 || i == 1) main2Light = new THREE.PointLight(0xccffff, 1, 600);
        main2Light.position.x = i * 700
        if (i <= 2) main2Light.position.z = 50;
        main2Light.position.y = -400;
        main2Light.castShadow = true;
        scene.add(main2Light);
    }

    // create portal geometry
    const portalGeo = new THREE.PlaneGeometry(100.1, 100.1);

    // create portal camera & helper
    portalCamera = new THREE.PerspectiveCamera(45, 1.0, 0.01, 1000.0);
    scene.add(portalCamera);
    // frustumHelper = new THREE.CameraHelper(portalCamera);
    // scene.add(frustumHelper);

    // make corner vertors
    bottomLeftCorner = new THREE.Vector3();
    bottomRightCorner = new THREE.Vector3();
    topLeftCorner = new THREE.Vector3();
    reflectedPosition = new THREE.Vector3();

    // make initial portal & texture (left)
    leftPortalTexture = new THREE.WebGLRenderTarget(800, 800);
    leftPortal = new THREE.Mesh(portalGeo, new THREE.MeshBasicMaterial({ map: leftPortalTexture.texture }));
    // set position
    leftPortal.position.x = -55;
    leftPortal.position.y = 6;
    leftPortal.position.z = -99.0;
    // set scaling
    leftPortal.scale.set(portalSize, portalSize, portalSize);
    // add leftPortal into scene
    scene.add(leftPortal);
    // initialize left portal status
    leftPortalStatus = Status.FRONT;
    // add portal UID into list
    portalUID.push(leftPortal.uuid);

    // add left portal outline
    outlineMesh_left.position.set(
        leftPortal.position.x,
        leftPortal.position.y,
        leftPortal.position.z - 0.5
    );
    outlineMesh_left.scale.multiplyScalar(1.15);
    scene.add(outlineMesh_left);

    // make initial portal & texture (right)
    rightPortalTexture = new THREE.WebGLRenderTarget(800, 800);
    rightPortal = new THREE.Mesh(portalGeo, new THREE.MeshBasicMaterial({ map: rightPortalTexture.texture }));
    // set position
    rightPortal.position.x = -55;
    rightPortal.position.y = 30;
    rightPortal.position.z = -99.0;
    // set scaling
    rightPortal.scale.set(portalSize, portalSize, portalSize);
    // add rightPortal into scene
    scene.add(rightPortal);
    // initialize left portal status
    rightPortalStatus = Status.FRONT;
    // add portal UID into list
    portalUID.push(rightPortal.uuid);

    // add right portal outline
    outlineMesh_right.position.set(
        rightPortal.position.x,
        rightPortal.position.y,
        rightPortal.position.z - 0.5
    );
    outlineMesh_right.scale.multiplyScalar(1.15);
    scene.add(outlineMesh_right);

    // add event listener (window resize)
    window.addEventListener('resize', onWindowResize);

    // portal pre-installation viewer vertices
    const points = [];
    points.push(new THREE.Vector3(100.1 * portalSize / 2, 100.1 * portalSize / 2, 0));
    points.push(new THREE.Vector3(-100.1 * portalSize / 2, 100.1 * portalSize / 2, 0));
    points.push(new THREE.Vector3(-100.1 * portalSize / 2, -100.1 * portalSize / 2, 0));
    points.push(new THREE.Vector3(100.1 * portalSize / 2, -100.1 * portalSize / 2, 0));
    points.push(new THREE.Vector3(100.1 * portalSize / 2, 100.1 * portalSize / 2, 0));

    // make portal pre-installation viewer
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    line = new THREE.Line(geometry, material);
    scene.add(line);

    // set item counter
    if (document.getElementById("itemCounter").value != -1) {
        document.getElementById("itemCounter").style.color = "white";
        document.getElementById('itemCounter').innerText = "0/" + itemCount;
    }

    // animation
    animate();
}

// function : animations
function animate() {
    // request animation frame
    requestAnimationFrame(animate);

    // animate functions
    tick();
    renderPortals();
    enterPortal();
    portalPreInstallViewer();
    animateItems();
    checkPlayerDied();

    // portalgun update
    const time = Date.now() * 0.0005;
    portalgun.position.set(0.4, -0.3 + Math.cos(time * portalgunMoveSpeed) * 0.015, -0.5);

    // camera position update
    camera.position.set(
        cameraBody.position.x,
        cameraBody.position.y,
        cameraBody.position.z,
    );

    // camera head update
    cameraHead.position.set(
        camera.position.x,
        camera.position.y + (CHARACTER_HEIGHT / 2),
        camera.position.z
    );

    // camera light update
    cameraLight.position.x = camera.position.x;
    cameraLight.position.y = camera.position.y;
    cameraLight.position.z = camera.position.z;

    // render the main scene
    renderer.render(scene, camera);
}

// function : check player is dead
function checkPlayerDied() {
    // check player is died
    if (camera.position.y < -1000 && !isDead) {
        console.log("dead");
        document.getElementById('itemCounter').style.color = "red";
        document.getElementById('itemCounter').innerText = "Bye..";
        // play dead sound
        deathSound.pause();
        deathSound.currentTime = 0;
        deathSound.play();
        isDead = true;
    }
    if (camera.position.y < -2000) {
        window.location.href = 'game.html';
    }
}

// item instance list
var items = [];
// how many items you have
var getItemCount = 0;
// whole item count
var itemCount = 0;

// function : animate items
function animateItems() {
    // set timer
    const timerOne = Date.now() * 0.01;
    // animate items
    for (var i = 0; i < items.length; i++) {
        items[i].rotation.y = (Math.PI / 2) - timerOne * 0.5;
        items[i].rotation.z = (Math.PI / 2) - timerOne * 0.5;

        // calculate the distance
        var distance = Math.round(Math.sqrt(
            Math.pow(camera.position.x - items[i].position.x, 2) +
            Math.pow(camera.position.y - items[i].position.y, 2) +
            Math.pow(camera.position.z - items[i].position.z, 2)), 2);

        // delete item
        if (items.indexOf(items[i]) != -1 && distance < 10) {
            // item sound
            itemGetSound.pause();
            itemGetSound.currentTime = 0.3;
            itemGetSound.play();

            // remove item from scene
            scene.remove(items[i]);

            // update getItemCount
            const idx = items.indexOf(items[i]);
            if (idx > -1) items.splice(idx, 1);
            getItemCount++;
            document.getElementById('itemCounter').innerText = getItemCount + "/" + itemCount;

            // item get count == 7, open portal panel
            if (getItemCount == 7) {
                console.log("Escape panel is opened!");
                // open portal panel
                createWall(size_x = 30, size_z = 20, position = { x: 139.5, y: 220, z: -50 }, view = 'right', portal = true, wallMaterial);
            }
            // final clear (ending)
            if (getItemCount == itemCount) {
                console.log("Escaped!");
                window.location.href = 'ending.html';
            }
        }
    }
}

// function : create item
function createItem(position) {
    // make mesh
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(4, 4, 4),
        itemMaterial
    );
    // add into scene
    mesh.castShadow = true;
    mesh.position.copy(position);
    scene.add(mesh);

    // add item in items list
    items.push(mesh);
    // add itemCount
    itemCount++;
}

// function : create map
function createMap() {

    // stage 1
    // create items
    createItem(position = { x: -60, y: 7, z: 85 });
    createItem(position = { x: 25, y: 7, z: 0 });
    createItem(position = { x: -85, y: 57, z: -85 });
    createItem(position = { x: 0, y: 127, z: 90 });
    createItem(position = { x: -35, y: 107, z: -85 });
    createItem(position = { x: 85, y: 107, z: -85 });
    createItem(position = { x: -95, y: 157, z: 20 });

    // base floor (whole map)
    createFloor(size_x = 200, size_z = 200, position = { x: 0, y: 0, z: 0 }); {
        // base wall
        createWall(size_x = 200, size_z = 200, position = { x: 0, y: 100, z: -100 }, view = 'front', portal = true, wallMaterial);
        createWall(size_x = 200, size_z = 200, position = { x: 0, y: 100, z: 100 }, view = 'back', portal = true, wallMaterial);
        createWall(size_x = 200, size_z = 200, position = { x: -100, y: 100, z: 0 }, view = 'left', portal = true, wallMaterial);
        createWall(size_x = 200, size_z = 200, position = { x: 100, y: 100, z: 0 }, view = 'right', portal = true, wallMaterial);
    }

    // floating floor (y=20)
    createFloor(size_x = 30, size_z = 30, position = { x: -85, y: 20, z: -35 }); {
        // floating wall
        createWall(size_x = 30, size_z = 20, position = { x: -70, y: 10, z: -35 }, view = 'left', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 20, position = { x: -100, y: 10, z: -35 }, view = 'right', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 20, position = { x: -85, y: 10, z: -20 }, view = 'front', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 20, position = { x: -85, y: 10, z: -50 }, view = 'back', portal = false, wall2Material);
    }

    // floating floor (y=50)
    createFloor(size_x = 30, size_z = 30, position = { x: -85, y: 50, z: -85 }); {
        // floating wall
        createWall(size_x = 30, size_z = 50, position = { x: -70, y: 25, z: -85 }, view = 'left', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 50, position = { x: -100, y: 25, z: -85 }, view = 'right', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 50, position = { x: -85, y: 25, z: -70 }, view = 'front', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 50, position = { x: -85, y: 25, z: -100 }, view = 'back', portal = false, wall2Material);
    }

    // floating floor (y=100)(-25,-85)
    createFloor(size_x = 30, size_z = 30, position = { x: -25, y: 100, z: -85 }); {
        // floating wall
        createWall(size_x = 30, size_z = 100, position = { x: -10, y: 50, z: -85 }, view = 'left', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 100, position = { x: -40, y: 50, z: -85 }, view = 'right', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 100, position = { x: -25, y: 50, z: -70 }, view = 'front', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 100, position = { x: -25, y: 50, z: -100 }, view = 'back', portal = false, wall2Material);
    }

    // floating floor (y=100)(85,-85)
    createFloor(size_x = 30, size_z = 30, position = { x: 85, y: 100, z: -85 }); {
        // floating wall
        createWall(size_x = 30, size_z = 100, position = { x: 100, y: 50, z: -85 }, view = 'left', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 100, position = { x: 70, y: 50, z: -85 }, view = 'right', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 100, position = { x: 85, y: 50, z: -70 }, view = 'front', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 100, position = { x: 85, y: 50, z: -100 }, view = 'back', portal = false, wall2Material);
    }

    // floating floor (y=100)(85,0)
    createFloor(size_x = 30, size_z = 30, position = { x: 85, y: 100, z: 0 }); {
        // floating wall 
        createWall(size_x = 30, size_z = 100, position = { x: 100, y: 50, z: 0 }, view = 'left', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 100, position = { x: 70, y: 50, z: 0 }, view = 'right', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 100, position = { x: 85, y: 50, z: 15 }, view = 'front', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 100, position = { x: 85, y: 50, z: -15 }, view = 'back', portal = false, wall2Material);
    }

    // floating floor (y=100)(85,85)
    createFloor(size_x = 30, size_z = 30, position = { x: 85, y: 100, z: 85 }); {
        // floating wall 
        createWall(size_x = 30, size_z = 100, position = { x: 100, y: 50, z: 85 }, view = 'left', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 100, position = { x: 70, y: 50, z: 85 }, view = 'right', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 100, position = { x: 85, y: 50, z: 100 }, view = 'front', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 100, position = { x: 85, y: 50, z: 70 }, view = 'back', portal = false, wall2Material);
    }

    // floating floor (y=100)(-85,85)
    createFloor(size_x = 30, size_z = 30, position = { x: -85, y: 100, z: 85 }); {
        // floating wall
        createWall(size_x = 30, size_z = 100, position = { x: -70, y: 50, z: 85 }, view = 'left', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 100, position = { x: -100, y: 50, z: 85 }, view = 'right', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 100, position = { x: -85, y: 50, z: 100 }, view = 'front', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 100, position = { x: -85, y: 50, z: 70 }, view = 'back', portal = false, wall2Material);
    }

    // floating floor (y=150)(-85,25)
    createFloor(size_x = 30, size_z = 30, position = { x: -85, y: 150, z: 25 }); {
        // floating wall
        createWall(size_x = 30, size_z = 150, position = { x: -70, y: 75, z: 25 }, view = 'left', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 150, position = { x: -100, y: 75, z: 25 }, view = 'right', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 150, position = { x: -85, y: 75, z: 40 }, view = 'front', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 150, position = { x: -85, y: 75, z: 10 }, view = 'back', portal = false, wall2Material);

    }

    // end floor
    createFloor(size_x = 100, size_z = 30, position = { x: 35, y: 180, z: 0 }); {
        // end wall
        createWall(size_x = 30, size_z = 180, position = { x: 15, y: 90, z: 0 }, view = 'left', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 180, position = { x: -15, y: 90, z: 0 }, view = 'right', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 180, position = { x: 0, y: 90, z: 15 }, view = 'front', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 180, position = { x: 0, y: 90, z: -15 }, view = 'back', portal = false, wall2Material);
        createWall(size_x = 30, size_z = 200, position = { x: 0, y: 100, z: -15 }, view = 'front', portal = true, wallMaterial);
    }

    // escape wall
    createWall(size_x = 30, size_z = 20, position = { x: 140, y: 220, z: -50 }, view = 'right', portal = false, wall2Material);
    const glftLoader = new THREE.GLTFLoader();
    glftLoader.load('./models/exit_sign/scene.gltf', (gltfScene) => {
        gltfScene.scene.position.x = 47;
        gltfScene.scene.position.y = 75;
        gltfScene.scene.position.z = -50;
        gltfScene.scene.rotation.y = -Math.PI / 2
        //gltfScene.scene.rotation.z= Math.PI/2
        scene.add(gltfScene.scene);
    });

    // walls (connect stage 1~2)
    createWall(size_x = 50, size_z = 400, position = { x: 100, y: 0, z: -50 }, view = 'left', portal = false, texture = floorMaterial);
    createWall(size_x = 50, size_z = 400, position = { x: 150, y: 0, z: -50 }, view = 'right', portal = false, texture = floorMaterial);
    createWall(size_x = 50, size_z = 400, position = { x: 125, y: 0, z: -75 }, view = 'front', portal = false, texture = floorMaterial);
    createWall(size_x = 50, size_z = 400, position = { x: 125, y: 0, z: -25 }, view = 'back', portal = false, texture = floorMaterial);

    // stage 2
    // create item
    createItem(position = { x: 0, y: -590, z: 0 }, color = 0xff0000);
    createItem(position = { x: 350, y: -590, z: 25 }, color = 0xff0000);
    createItem(position = { x: 525, y: -590, z: 80 }, color = 0xff0000);
    createItem(position = { x: 690, y: -490, z: -50 }, color = 0xff0000);
    createItem(position = { x: 1775, y: -540, z: 0 }, color = 0xff0000);

    // base floor & wall
    createFloor(size_x = 500, size_z = 200, position = { x: 0, y: -600, z: 0 }, texture = floorMaterial);
    createWall(size_x = 200, size_z = 400, position = { x: -100, y: -400, z: 0 }, view = 'left', portal = true, texture = wallMaterial);

    // walls
    var i;
    for (i = 0; i * 200 <= 1200; i++) {
        createWall(size_x = 200, size_z = 400, position = { x: i * 200, y: -400, z: -100 }, view = 'front', portal = true, texture = wallMaterial);
        createWall(size_x = 200, size_z = 400, position = { x: i * 200, y: -400, z: 100 }, view = 'back', portal = true, texture = wallMaterial);
        createWall(size_x = 200, size_z = 400, position = { x: i * 200, y: -800, z: -100 }, view = 'front', portal = true, texture = floorMaterial);
        createWall(size_x = 200, size_z = 400, position = { x: i * 200, y: -800, z: 100 }, view = 'back', portal = true, texture = floorMaterial);
    }
    createWall(size_x = 200, size_z = 400, position = { x: 250, y: -800, z: 0 }, view = 'left', portal = false, texture = floorMaterial);

    // left wall
    createWall(size_x = 100, size_z = 400, position = { x: 350, y: -800, z: 50 }, view = 'front', portal = false, texture = floorMaterial);
    createWall(size_x = 150, size_z = 400, position = { x: 300, y: -800, z: -25 }, view = 'right', portal = false, texture = floorMaterial);
    createWall(size_x = 150, size_z = 400, position = { x: 400, y: -800, z: -25 }, view = 'left', portal = false, texture = floorMaterial);
    createFloor(size_x = 100, size_z = 300, position = { x: 350, y: -600, z: -100 }, texture = floorMaterial);

    // right wall
    createWall(size_x = 150, size_z = 400, position = { x: 525, y: -800, z: -50 }, view = 'back', portal = false, texture = floorMaterial);
    createWall(size_x = 150, size_z = 400, position = { x: 450, y: -800, z: 25 }, view = 'right', portal = false, texture = floorMaterial);
    createWall(size_x = 150, size_z = 400, position = { x: 600, y: -800, z: 25 }, view = 'left', portal = false, texture = floorMaterial);
    createFloor(size_x = 150, size_z = 300, position = { x: 525, y: -600, z: 100 }, texture = floorMaterial);

    // front wall
    createWall(size_x = 100, size_z = 400, position = { x: 700, y: -400, z: -50 }, view = 'right', portal = true, texture = wallMaterial);
    createWall(size_x = 200, size_z = 400, position = { x: 800, y: -400, z: 0 }, view = 'front', portal = true, texture = wallMaterial);
    createWall(size_x = 200, size_z = 400, position = { x: 1000, y: -400, z: 0 }, view = 'front', portal = true, texture = wallMaterial);
    createWall(size_x = 200, size_z = 400, position = { x: 1200, y: -400, z: 0 }, view = 'front', portal = true, texture = wallMaterial);
    createWall(size_x = 100, size_z = 400, position = { x: 700, y: -800, z: -50 }, view = 'right', portal = false, texture = floorMaterial);
    createWall(size_x = 200, size_z = 400, position = { x: 800, y: -800, z: 0 }, view = 'front', portal = false, texture = floorMaterial);
    createWall(size_x = 200, size_z = 400, position = { x: 1000, y: -800, z: 0 }, view = 'front', portal = false, texture = floorMaterial);
    createWall(size_x = 200, size_z = 400, position = { x: 1200, y: -800, z: 0 }, view = 'front', portal = false, texture = floorMaterial);
    createFloor(size_x = 50, size_z = 100, position = { x: 675, y: -600, z: -50 }, texture = floorMaterial);
    createWall(size_x = 100, size_z = 400, position = { x: 650, y: -800, z: -50 }, view = 'right', portal = false, texture = floorMaterial);
    createWall(size_x = 50, size_z = 400, position = { x: 675, y: -800, z: 0 }, view = 'front', portal = false, texture = floorMaterial);

    // right wall
    createWall(size_x = 600, size_z = 400, position = { x: 1000, y: -800, z: 50 }, view = 'back', portal = false, texture = floorMaterial);
    createWall(size_x = 50, size_z = 400, position = { x: 700, y: -800, z: 75 }, view = 'right', portal = false, texture = floorMaterial);
    createFloor(size_x = 600, size_z = 100, position = { x: 1000, y: -600, z: 100 }, texture = floorMaterial);

    // big roon
    createWall(size_x = 500, size_z = 400, position = { x: 1300, y: -800, z: 0 }, view = 'right', portal = false, texture = floorMaterial);
    createFloor(size_x = 400, size_z = 500, position = { x: 1500, y: -600, z: 0 }, texture = floorMaterial);
    createWall(size_x = 500, size_z = 300, position = { x: 1700, y: -350, z: 0 }, view = 'right', portal = false, texture = floorMaterial);
    createWall(size_x = 500, size_z = 50, position = { x: 1700, y: -575, z: 0 }, view = 'right', portal = false, texture = floorMaterial);
    createWall(size_x = 100, size_z = 400, position = { x: 1300, y: -400, z: -50 }, view = 'left', portal = false, texture = floorMaterial);
    createWall(size_x = 150, size_z = 400, position = { x: 1300, y: -400, z: -175 }, view = 'left', portal = false, texture = floorMaterial);
    createWall(size_x = 150, size_z = 400, position = { x: 1300, y: -400, z: 175 }, view = 'left', portal = false, texture = floorMaterial);
    createWall(size_x = 400, size_z = 400, position = { x: 1500, y: -400, z: -200 }, view = 'front', portal = true, texture = wallMaterial);
    createWall(size_x = 400, size_z = 400, position = { x: 1500, y: -400, z: 200 }, view = 'back', portal = true, texture = wallMaterial);

    // right pillar
    createFloor(size_x = 50, size_z = 225, position = { x: 1675, y: -500, z: 137.5 }, texture = floorMaterial);
    createWall(size_x = 50, size_z = 100, position = { x: 1675, y: -550, z: 25 }, view = 'back', portal = false, texture = floorMaterial);
    createWall(size_x = 225, size_z = 100, position = { x: 1650, y: -550, z: 137.5 }, view = 'right', portal = false, texture = floorMaterial);
    createBox(box_size = { x: 25, y: 25, z: 25 }, position = { x: 1675, y: -470, z: 150 });

    // left pillar
    createFloor(size_x = 50, size_z = 225, position = { x: 1675, y: -500, z: -137.5 }, texture = floorMaterial);
    createWall(size_x = 50, size_z = 100, position = { x: 1675, y: -550, z: -25 }, view = 'front', portal = false, texture = floorMaterial);
    createWall(size_x = 225, size_z = 100, position = { x: 1650, y: -550, z: -137.5 }, view = 'right', portal = false, texture = floorMaterial);
    createBox(box_size = { x: 25, y: 25, z: 25 }, position = { x: 1675, y: -470, z: -150 });

    // cube walls
    createFloor(size_x = 50, size_z = 50, position = { x: 1625, y: -500, z: 0 }, texture = floorMaterial);
    createWall(size_x = 50, size_z = 100, position = { x: 1625, y: -550, z: 25 }, view = 'front', portal = false, texture = floorMaterial);
    createWall(size_x = 50, size_z = 100, position = { x: 1600, y: -550, z: 0 }, view = 'right', portal = false, texture = floorMaterial);
    createWall(size_x = 50, size_z = 100, position = { x: 1650, y: -550, z: 0 }, view = 'left', portal = false, texture = floorMaterial);
    createWall(size_x = 50, size_z = 100, position = { x: 1625, y: -550, z: -25 }, view = 'back', portal = false, texture = floorMaterial);

    // exit (the end)
    createWall(size_x = 150, size_z = 50, position = { x: 1775, y: -525, z: -25 }, view = 'front', portal = false, texture = floorMaterial);
    createWall(size_x = 150, size_z = 50, position = { x: 1775, y: -525, z: 25 }, view = 'back', portal = false, texture = floorMaterial);
    createFloor(size_x = 150, size_z = 50, position = { x: 1775, y: -500, z: 0 }, texture = floorMaterial);
    createFloor(size_x = 150, size_z = 50, position = { x: 1775, y: -550, z: 0 }, texture = floorMaterial);

    // final exit texture
    glftLoader.load('./models/exit_sign/scene.gltf', (gltfScene) => {
        gltfScene.scene.position.x = 1605;
        gltfScene.scene.position.y = -650;
        gltfScene.scene.position.z = 0;
        gltfScene.scene.rotation.y = -Math.PI / 2
        //gltfScene.scene.rotation.z= Math.PI/2
        scene.add(gltfScene.scene);
    });

}

// function : render portals
function renderPortals() {

    // save the original camera properties
    const currentRenderTarget = renderer.getRenderTarget();
    const currentXrEnabled = renderer.xr.enabled;
    const currentShadowAutoUpdate = renderer.shadowMap.autoUpdate;
    renderer.xr.enabled = false; // Avoid camera modification
    renderer.shadowMap.autoUpdate = false; // Avoid re-computing shadows

    // render the portal effect
    renderPortal(leftPortal, rightPortal, leftPortalTexture);
    renderPortal(rightPortal, leftPortal, rightPortalTexture);

    // restore the original rendering properties
    renderer.xr.enabled = currentXrEnabled;
    renderer.shadowMap.autoUpdate = currentShadowAutoUpdate;
    renderer.setRenderTarget(currentRenderTarget);

}


const clock = new THREE.Clock()
var oldElapsedTime = 0

// set update interval
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - oldElapsedTime;
    oldElapsedTime = elapsedTime;

    // Update physics
    world.step(1 / 80, deltaTime, 3);

    // cannon.js world에 있는 값으로 Three.js의 object 값을 업데이트
    for (const object of objectsToUpdate) {
        object.mesh.position.copy(object.body.position);
        object.mesh.quaternion.copy(object.body.quaternion);
    }
}

// add click event listener for install portals
document.addEventListener('click', function (event) {

    // mouse locked check
    if (!isLocked) return;

    ray.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = ray.intersectObjects(scene.children);

    // if not portalWall, ignore
    if (portalWalls.indexOf(intersects[0].object.uuid) == -1) return;

    // mouse click
    switch (event.which) {
        // left click
        case 1:
            // front wall
            if (frontWalls.indexOf(intersects[0].object.uuid) != -1 && distance < maxDistance) {
                leftPortalSound.pause();
                leftPortalSound.currentTime = 0.3;
                leftPortalSound.play();

                leftPortal.rotation.x = 0;
                leftPortal.rotation.y = 0;
                leftPortal.rotation.z = 0;

                leftPortal.position.x = intersects[0].point.x;
                leftPortal.position.y = intersects[0].point.y;
                leftPortal.position.z = intersects[0].point.z + 1.0;

                leftPortalStatus = Status.FRONT;

                // left portal outline
                scene.remove(outlineMesh_left);
                outlineMesh_left.rotation.set(
                    leftPortal.rotation.x,
                    leftPortal.rotation.y,
                    leftPortal.rotation.z
                );
                outlineMesh_left.position.set(
                    leftPortal.position.x,
                    leftPortal.position.y,
                    leftPortal.position.z - 0.5
                );
                scene.add(outlineMesh_left);
            }
            // back wall
            else if (backWalls.indexOf(intersects[0].object.uuid) != -1 && distance < maxDistance) {
                leftPortalSound.pause();
                leftPortalSound.currentTime = 0.3;
                leftPortalSound.play();

                leftPortal.rotation.x = 0;
                leftPortal.rotation.y = 180 * (Math.PI / 180);
                leftPortal.rotation.z = 0;

                leftPortal.position.x = intersects[0].point.x;
                leftPortal.position.y = intersects[0].point.y;
                leftPortal.position.z = intersects[0].point.z - 1.0;

                leftPortalStatus = Status.BACK;

                // left portal outline
                scene.remove(outlineMesh_left);
                outlineMesh_left.rotation.set(
                    leftPortal.rotation.x,
                    leftPortal.rotation.y,
                    leftPortal.rotation.z
                );
                outlineMesh_left.position.set(
                    leftPortal.position.x,
                    leftPortal.position.y,
                    leftPortal.position.z + 0.5
                );
                scene.add(outlineMesh_left);
            }
            // left wall
            else if (leftWalls.indexOf(intersects[0].object.uuid) != -1 && distance < maxDistance) {
                leftPortalSound.pause();
                leftPortalSound.currentTime = 0.3;
                leftPortalSound.play();

                leftPortal.rotation.x = 0;
                leftPortal.rotation.y = 90 * (Math.PI / 180);
                leftPortal.rotation.z = 0;

                leftPortal.position.x = intersects[0].point.x + 1.0;
                leftPortal.position.y = intersects[0].point.y;
                leftPortal.position.z = intersects[0].point.z;

                leftPortalStatus = Status.LEFT;

                // left portal outline
                scene.remove(outlineMesh_left);
                outlineMesh_left.rotation.set(
                    leftPortal.rotation.x,
                    leftPortal.rotation.y,
                    leftPortal.rotation.z
                );
                outlineMesh_left.position.set(
                    leftPortal.position.x - 0.5,
                    leftPortal.position.y,
                    leftPortal.position.z
                );
                scene.add(outlineMesh_left);
            }
            // right wall
            else if (rightWalls.indexOf(intersects[0].object.uuid) != -1 && distance < maxDistance) {
                leftPortalSound.pause();
                leftPortalSound.currentTime = 0.3;
                leftPortalSound.play();

                leftPortal.rotation.x = 0;
                leftPortal.rotation.y = -90 * (Math.PI / 180);
                leftPortal.rotation.z = 0;

                leftPortal.position.x = intersects[0].point.x - 1.0;
                leftPortal.position.y = intersects[0].point.y;
                leftPortal.position.z = intersects[0].point.z;

                leftPortalStatus = Status.RIGHT;

                // left portal outline
                scene.remove(outlineMesh_left);
                outlineMesh_left.rotation.set(
                    leftPortal.rotation.x,
                    leftPortal.rotation.y,
                    leftPortal.rotation.z
                );
                outlineMesh_left.position.set(
                    leftPortal.position.x + 0.5,
                    leftPortal.position.y,
                    leftPortal.position.z
                );
                scene.add(outlineMesh_left);
            }
            break;
        // middle click
        case 2:
            // nothing..
            break;
        // right click
        case 3:
            // front wall
            if (frontWalls.indexOf(intersects[0].object.uuid) != -1 && distance < maxDistance) {
                rightPortalSound.pause();
                rightPortalSound.currentTime = 0.3;
                rightPortalSound.play();

                rightPortal.rotation.x = 0;
                rightPortal.rotation.y = 0;
                rightPortal.rotation.z = 0;

                rightPortal.position.x = intersects[0].point.x;
                rightPortal.position.y = intersects[0].point.y;
                rightPortal.position.z = intersects[0].point.z + 1.0;

                rightPortalStatus = Status.FRONT;

                // right portal outline
                outlineMesh_right.rotation.set(
                    rightPortal.rotation.x,
                    rightPortal.rotation.y,
                    rightPortal.rotation.z,
                );
                outlineMesh_right.position.set(
                    rightPortal.position.x,
                    rightPortal.position.y,
                    rightPortal.position.z - 0.5
                );
                scene.add(outlineMesh_right);
            }
            // back wall
            else if (backWalls.indexOf(intersects[0].object.uuid) != -1 && distance < maxDistance) {
                rightPortalSound.pause();
                rightPortalSound.currentTime = 0.3;
                rightPortalSound.play();

                rightPortal.rotation.x = 0;
                rightPortal.rotation.y = 180 * (Math.PI / 180);
                rightPortal.rotation.z = 0;

                rightPortal.position.x = intersects[0].point.x;
                rightPortal.position.y = intersects[0].point.y;
                rightPortal.position.z = intersects[0].point.z - 1.0;

                rightPortalStatus = Status.BACK;

                // right portal outline
                outlineMesh_right.rotation.set(
                    rightPortal.rotation.x,
                    rightPortal.rotation.y,
                    rightPortal.rotation.z,
                );
                outlineMesh_right.position.set(
                    rightPortal.position.x,
                    rightPortal.position.y,
                    rightPortal.position.z + 0.5
                );
                scene.add(outlineMesh_right);
            }
            // left wall
            else if (leftWalls.indexOf(intersects[0].object.uuid) != -1 && distance < maxDistance) {
                rightPortalSound.pause();
                rightPortalSound.currentTime = 0.3;
                rightPortalSound.play();

                rightPortal.rotation.x = 0;
                rightPortal.rotation.y = 90 * (Math.PI / 180);
                rightPortal.rotation.z = 0;

                rightPortal.position.x = intersects[0].point.x + 1.0;
                rightPortal.position.y = intersects[0].point.y;
                rightPortal.position.z = intersects[0].point.z;

                rightPortalStatus = Status.LEFT;

                // right portal outline
                outlineMesh_right.rotation.set(
                    rightPortal.rotation.x,
                    rightPortal.rotation.y,
                    rightPortal.rotation.z,
                );
                outlineMesh_right.position.set(
                    rightPortal.position.x - 0.5,
                    rightPortal.position.y,
                    rightPortal.position.z
                );
                scene.add(outlineMesh_right);
            }
            // right wall
            else if (rightWalls.indexOf(intersects[0].object.uuid) != -1 && distance < maxDistance) {
                rightPortalSound.pause();
                rightPortalSound.currentTime = 0.3;
                rightPortalSound.play();

                rightPortal.rotation.x = 0;
                rightPortal.rotation.y = -90 * (Math.PI / 180);
                rightPortal.rotation.z = 0;

                rightPortal.position.x = intersects[0].point.x - 1.0;
                rightPortal.position.y = intersects[0].point.y;
                rightPortal.position.z = intersects[0].point.z;

                rightPortalStatus = Status.RIGHT;

                // right portal outline
                outlineMesh_right.rotation.set(
                    rightPortal.rotation.x,
                    rightPortal.rotation.y,
                    rightPortal.rotation.z,
                );
                outlineMesh_right.position.set(
                    rightPortal.position.x + 0.5,
                    rightPortal.position.y,
                    rightPortal.position.z
                );
                scene.add(outlineMesh_right);
            }
            break;
        // else
        default:
    }

    // check log (portal status)
    console.log("leftPortalStatus:", leftPortalStatus, "rightPortalStatus:", rightPortalStatus);
});

// function : window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth - 16, window.innerHeight - 45);
}

// function : create wall
function createWall(size_x, size_z, position, view, portal, texture) {
    // Three.js Mesh 만들기
    var mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(size_x, size_z),
        texture
    );

    // view (front, back, left, right)
    switch (view) {
        case 'front':
            frontWalls.push(mesh.uuid);
            // nothing
            break;
        case 'back':
            mesh.rotateX(Math.PI);
            backWalls.push(mesh.uuid);
            break;
        case 'left':
            mesh.rotateY(Math.PI / 2);
            leftWalls.push(mesh.uuid);
            break;
        case 'right':
            mesh.rotateY(-Math.PI / 2);
            rightWalls.push(mesh.uuid);
            break;
    }

    // add mesh into scene
    mesh.castShadow = true;
    mesh.position.copy(position);
    scene.add(mesh);


    // make Cannon.js body shape
    var shape;

    // view (front, back, left, right)
    var axis;
    if (view == 'front' || view == 'back') {
        axis = new CANNON.Vec3(1, 0, 0);
        shape = new CANNON.Box(new CANNON.Vec3(size_x / 2, 0.1 / 2, size_z / 2));
    }
    else if (view == 'left' || view == 'right') {
        axis = new CANNON.Vec3(0, 0, 1);
        shape = new CANNON.Box(new CANNON.Vec3(size_z / 2, 0.1 / 2, size_x / 2));
    }

    // make Cannon.js body
    var body = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3(position.x, position.y, position.z),
        shape: shape,
    });

    // set body angle
    var angle = (Math.PI / 2);
    body.quaternion.setFromAxisAngle(axis, angle);

    // add body into world
    body.position.copy(position);
    world.addBody(body);

    // Push uuid into portalWalls
    if (portal) portalWalls.push(mesh.uuid);
};

// function : create floor
function createFloor(size_x, size_z, position) {
    // make Three.js Mesh
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(size_x, 0.1, size_z),
        floorMaterial
    );
    // add mesh into scene
    mesh.castShadow = true;
    mesh.position.copy(position);
    scene.add(mesh);

    // make Cannon.js body shape
    var shape = new CANNON.Box(new CANNON.Vec3(size_x / 2, 0.2 / 2, size_z / 2));

    // make Cannon.js body
    var body = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3(position.x, position.y, position.z),
        shape: shape,
    });

    // add body into world
    body.position.copy(position);
    world.addBody(body);
};

// function : create box
function createBox(box_size, position) {
    // make Three.js Mesh
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(box_size.x, box_size.y, box_size.z),
        new THREE.MeshStandardMaterial({
            metalness: 0.3,
            roughness: 0.4,
        })
    );
    // add mesh into scene
    mesh.castShadow = true;
    mesh.position.copy(position);
    scene.add(mesh);

    // make Cannon.js body shape
    var shape = new CANNON.Box(new CANNON.Vec3(box_size.x / 2, box_size.y / 2, box_size.z / 2));

    // make Cannon.js body
    var body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(position.x, position.y, position.z),
        shape: shape,
    });

    // add body into world
    body.position.copy(position);
    world.addBody(body);

    // Save in objects to update
    objectsToUpdate.push({ mesh, body });
};

// function : create sphere
function createSphere(radius, position) {
    // make Three.js Mesh
    var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 30, 30),
        new THREE.MeshStandardMaterial({
            metalness: 0.3,
            roughness: 0.4,
        })
    );
    // add mesh into scene
    mesh.castShadow = true;
    mesh.position.copy(position);
    scene.add(mesh);

    // make Cannon.js body shape
    var shape = new CANNON.Sphere(radius);

    // make Cannon.js body
    var body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(position.x, position.y, position.z),
        shape: shape,
    });

    // add body into world
    body.position.copy(position);
    world.addBody(body);

    // Save in objects to update
    objectsToUpdate.push({ mesh, body });
};

// function : create character head (for no interection with walls)
function createCameraHead() {
    // Three.js mesh
    var mesh = new THREE.Mesh();
    mesh.castShadow = true;
    mesh.position.copy(camera.position);
    scene.add(mesh);

    // Cannon.js body
    var shape = new CANNON.Box(new CANNON.Vec3(1, 0.1, 1));

    var body = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3(camera.position.x, camera.position.y + (CHARACTER_HEIGHT / 2), camera.position.z),
        shape: shape,
    });
    // add body into scene
    body.position.copy({ x: camera.position.x, y: camera.position.y + (CHARACTER_HEIGHT / 2), z: camera.position.z });
    world.addBody(body);

    // return body
    return body;
};

// function : create sphere for camera
function createCameraBody(character_height) {
    // Three.js mesh
    var mesh = new THREE.Mesh();
    mesh.castShadow = true;
    mesh.position.copy(camera.position);
    scene.add(mesh);

    // Cannon.js body
    var shape = new CANNON.Sphere(character_height / 2);

    // setting mass
    var mass = (flyMode ? 0 : 1);

    // make body
    var body = new CANNON.Body({
        mass: mass,
        position: new CANNON.Vec3(camera.position.x, camera.position.y, camera.position.z),
        shape: shape,
    });

    // add body into scene
    body.position.copy(camera.position);
    world.addBody(body);

    // return body
    return body;
};

// function : movement
function movement() {
    var keypress = {};
    // add event listener "keydown"
    document.addEventListener("keydown", function (event) {
        keypress[event.keyCode.toString()] = true;
    }, false);
    // add event listener "keyup"
    document.addEventListener("keyup", function (event) {
        // portal gun mode speed
        portalgunMoveSpeed = 3;
        keypress[event.keyCode.toString()] = false;
        // play walk sound
        if (event.keyCode.toString() == '87' || event.keyCode.toString() == '83') {
            walkSound.pause();
            walkSound.currentTime = 0;
        }
    }, false);
    // movement
    setInterval(function () {
        if (keypress['87']) { // w
            cameraControls.moveForward(moveSpeed);
            portalgunMoveSpeed = 30;
            walkSound.play();
        }
        if (keypress['83']) { // s
            cameraControls.moveForward(-moveSpeed);
            portalgunMoveSpeed = 30;
            walkSound.play();
        }
        if (keypress['65']) { // a
            cameraControls.moveRight(-moveSpeed);
            portalgunMoveSpeed = 30;
        }
        if (keypress['68']) { // d
            cameraControls.moveRight(moveSpeed);
            portalgunMoveSpeed = 30;
        }

        // if (keypress['38']) { // up
        //     camera.rotation.x += 0.1 * Math.PI / 180;
        // }
        // if (keypress['37']) { // left
        //     camera.rotation.y -= 0.1 * Math.PI / 180;
        // }
        // if (keypress['39']) { // right
        //     camera.rotation.y += 0.1 * Math.PI / 180;
        // }
        // if (keypress['40']) { // down
        //     camera.rotation.x -= 0.1 * Math.PI / 180;
        // }

        // for flyMode
        if (keypress['32'] && flyMode) { // space bar
            camera.position.y += .3;
        }
        if (keypress['90'] && flyMode) { // z
            camera.position.y -= 0.3;
        }

        // update camera position
        cameraBody.position.set(
            camera.position.x,
            camera.position.y,
            camera.position.z);
    }, delay);
    // delay update
    delay += 60;
    // render the main scene
    renderer.render(scene, camera);
}

// add movement event listener
document.addEventListener('keydown', movement);

// function : render portal
function renderPortal(thisPortalMesh, otherPortalMesh, thisPortalTexture) {

    // set the portal camera position to be reflected about the portal plane
    thisPortalMesh.worldToLocal(reflectedPosition.copy(camera.position));
    reflectedPosition.x *= - 1.0; reflectedPosition.z *= - 1.0;
    otherPortalMesh.localToWorld(reflectedPosition);
    portalCamera.position.copy(reflectedPosition);

    // grab the corners of the other portal
    // the portal is viewed backwards; flip the left/right coordinates
    otherPortalMesh.localToWorld(bottomLeftCorner.set(50.05, - 50.05, 0.0));
    otherPortalMesh.localToWorld(bottomRightCorner.set(- 50.05, - 50.05, 0.0));
    otherPortalMesh.localToWorld(topLeftCorner.set(50.05, 50.05, 0.0));
    // set the projection matrix to encompass the portal's frame
    frameCorners(portalCamera, bottomLeftCorner, bottomRightCorner, topLeftCorner, false);

    // render the portal
    thisPortalTexture.texture.encoding = renderer.outputEncoding;
    renderer.setRenderTarget(thisPortalTexture);
    renderer.state.buffers.depth.setMask(true);
    if (renderer.autoClear === false) renderer.clear();
    thisPortalMesh.visible = false; // hide this portal from its own rendering
    renderer.render(scene, portalCamera);
    thisPortalMesh.visible = true; // re-enable this portal's visibility for general rendering
}

// function : enter portal
function enterPortal() {
    // console.log(camera.rotation);

    // left to right portal
    // leftPortalStatus: FRONT , rightPortalStatus: FRONT
    if ((leftPortalStatus == Status.FRONT && rightPortalStatus == Status.FRONT) && viewInPortal &&
        (camera.position.x >= leftPortal.position.x - (100.1 * portalSize / 2) && camera.position.x <= leftPortal.position.x + (100.1 * portalSize / 2)) &&
        (camera.position.y >= leftPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= leftPortal.position.y + (100.1 * portalSize / 2)) &&
        (camera.position.z >= leftPortal.position.z - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.z <= leftPortal.position.z + (CHARACTER_HEIGHT / 2 - 1.01))) {
        console.log("Left to Right Portal(front -> front)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        camera.rotation.set(0, 180 * (Math.PI / 180), 0);
        camera.rotation.y = camera.rotation.y + y;

        cameraBody.position.set(
            rightPortal.position.x,
            rightPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            rightPortal.position.z + (CHARACTER_HEIGHT / 2)
        );
    }
    // leftPortalStatus: FRONT , rightPortalStatus: BACK
    else if ((leftPortalStatus == Status.FRONT && rightPortalStatus == Status.BACK) && viewInPortal &&
        (camera.position.x >= leftPortal.position.x - (100.1 * portalSize / 2) && camera.position.x <= leftPortal.position.x + (100.1 * portalSize / 2)) &&
        (camera.position.y >= leftPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= leftPortal.position.y + (100.1 * portalSize / 2)) &&
        (camera.position.z >= leftPortal.position.z - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.z <= leftPortal.position.z + (CHARACTER_HEIGHT / 2 - 1.01))) {
        console.log("Left to Right Portal(front -> back)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        camera.rotation.set(0, 0, 0);
        camera.rotation.y = camera.rotation.y + y;

        cameraBody.position.set(
            rightPortal.position.x,
            rightPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            rightPortal.position.z - (CHARACTER_HEIGHT / 2)
        );
    }
    // leftPortalStatus: FRONT , rightPortalStatus: LEFT
    else if ((leftPortalStatus == Status.FRONT && rightPortalStatus == Status.LEFT) && viewInPortal &&
        (camera.position.x >= leftPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= leftPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= leftPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= leftPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= leftPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= leftPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Left to Right Portal(front -> left)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        camera.rotation.set(0, -90 * (Math.PI / 180), 0);
        camera.rotation.y = camera.rotation.y + y;

        cameraBody.position.set(
            rightPortal.position.x + (CHARACTER_HEIGHT / 2),
            rightPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            rightPortal.position.z
        );
    }
    // leftPortalStatus: FRONT , rightPortalStatus: RIGHT
    else if ((leftPortalStatus == Status.FRONT && rightPortalStatus == Status.RIGHT) && viewInPortal &&
        (camera.position.x >= leftPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= leftPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= leftPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= leftPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= leftPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= leftPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Left to Right Portal(front -> right)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        camera.rotation.set(0, 90 * (Math.PI / 180), 0);
        camera.rotation.y = camera.rotation.y + y;

        cameraBody.position.set(
            rightPortal.position.x - (CHARACTER_HEIGHT / 2),
            rightPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            rightPortal.position.z
        );
    }
    // leftPortalStatus: BACK , rightPortalStatus: FRONT
    else if ((leftPortalStatus == Status.BACK && rightPortalStatus == Status.FRONT) && viewInPortal &&
        (camera.position.x >= leftPortal.position.x - (100.1 * portalSize / 2) && camera.position.x <= leftPortal.position.x + (100.1 * portalSize / 2) &&
            (camera.position.y >= leftPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= leftPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= leftPortal.position.z - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.z <= leftPortal.position.z + (CHARACTER_HEIGHT / 2 - 1.01)))) {
        console.log("Left to Right Portal(back -> front)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        camera.rotation.set(0, 180 * (Math.PI / 180), 0);
        camera.rotation.y = camera.rotation.y - y;

        cameraBody.position.set(
            rightPortal.position.x,
            rightPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            rightPortal.position.z + (CHARACTER_HEIGHT / 2)
        );
    }
    // leftPortalStatus: BACK , rightPortalStatus: BACK
    else if ((leftPortalStatus == Status.BACK && rightPortalStatus == Status.BACK) && viewInPortal &&
        (camera.position.x >= leftPortal.position.x - (100.1 * portalSize / 2) && camera.position.x <= leftPortal.position.x + (100.1 * portalSize / 2) &&
            (camera.position.y >= leftPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= leftPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= leftPortal.position.z - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.z <= leftPortal.position.z + (CHARACTER_HEIGHT / 2 - 1.01)))) {
        console.log("Left to Right Portal(back -> back)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        camera.rotation.set(0, 0, 0);
        camera.rotation.y = camera.rotation.y - y;

        cameraBody.position.set(
            rightPortal.position.x,
            rightPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            rightPortal.position.z - (CHARACTER_HEIGHT / 2)
        );
    }
    // leftPortalStatus: BACK , rightPortalStatus: LEFT
    else if ((leftPortalStatus == Status.BACK && rightPortalStatus == Status.LEFT) && viewInPortal &&
        (camera.position.x >= leftPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= leftPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= leftPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= leftPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= leftPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= leftPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Left to Right Portal(back -> left)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        camera.rotation.set(0, -90 * (Math.PI / 180), 0);
        camera.rotation.y = camera.rotation.y - y;

        cameraBody.position.set(
            rightPortal.position.x + (CHARACTER_HEIGHT / 2),
            rightPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            rightPortal.position.z
        );
    }
    // leftPortalStatus: BACK , rightPortalStatus: RIGHT
    else if ((leftPortalStatus == Status.BACK && rightPortalStatus == Status.RIGHT) && viewInPortal &&
        (camera.position.x >= leftPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= leftPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= leftPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= leftPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= leftPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= leftPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Left to Right Portal(back -> right)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        camera.rotation.set(0, 90 * (Math.PI / 180), 0);
        camera.rotation.y = camera.rotation.y - y;

        cameraBody.position.set(
            rightPortal.position.x - (CHARACTER_HEIGHT / 2),
            rightPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            rightPortal.position.z
        );
    }
    // leftPortalStatus: LEFT , rightPortalStatus: FRONT
    else if ((leftPortalStatus == Status.LEFT && rightPortalStatus == Status.FRONT) && viewInPortal &&
        (camera.position.x >= leftPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= leftPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= leftPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= leftPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= leftPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= leftPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Left to Right Portal(left -> front)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        var dirx = ray.ray.direction.x;
        var dirz = ray.ray.direction.z;
        if (dirx * dirz < 0) camera.rotation.set(0, 270 * (Math.PI / 180) - y, 0);
        else camera.rotation.set(0, y - 270 * (Math.PI / 180), 0);

        cameraBody.position.set(
            rightPortal.position.x,
            rightPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            rightPortal.position.z + (CHARACTER_HEIGHT / 2)
        );
    }
    // leftPortalStatus: LEFT , rightPortalStatus: BACK
    else if ((leftPortalStatus == Status.LEFT && rightPortalStatus == Status.BACK) && viewInPortal &&
        (camera.position.x >= leftPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= leftPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= leftPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= leftPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= leftPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= leftPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Left to Right Portal(left -> back)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        var dirx = ray.ray.direction.x;
        var dirz = ray.ray.direction.z;
        if (dirx * dirz < 0) camera.rotation.set(0, 90 * (Math.PI / 180) - y, 0);
        else camera.rotation.set(0, y - 90 * (Math.PI / 180), 0);

        cameraBody.position.set(
            rightPortal.position.x,
            rightPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            rightPortal.position.z - (CHARACTER_HEIGHT / 2)
        );
    }
    // leftPortalStatus: LEFT , rightPortalStatus: LEFT
    else if ((leftPortalStatus == Status.LEFT && rightPortalStatus == Status.LEFT) && viewInPortal &&
        (camera.position.x >= leftPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= leftPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= leftPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= leftPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= leftPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= leftPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Left to Right Portal(left -> left)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        var dirx = ray.ray.direction.x;
        var dirz = ray.ray.direction.z;
        if (dirx * dirz < 0) camera.rotation.set(0, 0 * (Math.PI / 180) - y, 0);
        else camera.rotation.set(0, y - 180 * (Math.PI / 180), 0);

        cameraBody.position.set(
            rightPortal.position.x + (CHARACTER_HEIGHT / 2),
            rightPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            rightPortal.position.z
        );
    }
    // leftPortalStatus: LEFT , rightPortalStatus: RIGHT
    else if ((leftPortalStatus == Status.LEFT && rightPortalStatus == Status.RIGHT) && viewInPortal &&
        (camera.position.x >= leftPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= leftPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= leftPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= leftPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= leftPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= leftPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Left to Right Portal(left -> right)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        var dirx = ray.ray.direction.x;
        var dirz = ray.ray.direction.z;
        if (dirx * dirz < 0) { camera.rotation.set(0, 180 * (Math.PI / 180) - y, 0); }
        else camera.rotation.set(0, y - 360 * (Math.PI / 180), 0);

        cameraBody.position.set(
            rightPortal.position.x - (CHARACTER_HEIGHT / 2),
            rightPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            rightPortal.position.z
        );
    }
    // leftPortalStatus: RIGHT , rightPortalStatus: FRONT
    else if ((leftPortalStatus == Status.RIGHT && rightPortalStatus == Status.FRONT) && viewInPortal &&
        (camera.position.x >= leftPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= leftPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= leftPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= leftPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= leftPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= leftPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Left to Right Portal(right -> front)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        var dirx = ray.ray.direction.x;
        var dirz = ray.ray.direction.z;
        if (dirx * dirz < 0) camera.rotation.set(0, y - 90 * (Math.PI / 180), 0);
        else camera.rotation.set(0, 90 * (Math.PI / 180) - y, 0);

        cameraBody.position.set(
            rightPortal.position.x,
            rightPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            rightPortal.position.z + (CHARACTER_HEIGHT / 2)
        );
    }
    // leftPortalStatus: RIGHT , rightPortalStatus: BACK
    else if ((leftPortalStatus == Status.RIGHT && rightPortalStatus == Status.BACK) && viewInPortal &&
        (camera.position.x >= leftPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= leftPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= leftPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= leftPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= leftPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= leftPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Left to Right Portal(right -> back)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        var dirx = ray.ray.direction.x;
        var dirz = ray.ray.direction.z;
        if (dirx * dirz < 0) camera.rotation.set(0, y - 270 * (Math.PI / 180), 0);
        else camera.rotation.set(0, - 90 * (Math.PI / 180) - y, 0);

        cameraBody.position.set(
            rightPortal.position.x,
            rightPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            rightPortal.position.z - (CHARACTER_HEIGHT / 2)
        );
    }
    // leftPortalStatus: RIGHT , rightPortalStatus: LEFT
    else if ((leftPortalStatus == Status.RIGHT && rightPortalStatus == Status.LEFT) && viewInPortal &&
        (camera.position.x >= leftPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= leftPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= leftPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= leftPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= leftPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= leftPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Left to Right Portal(right -> left)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        var dirx = ray.ray.direction.x;
        var dirz = ray.ray.direction.z;
        if (dirx * dirz < 0) camera.rotation.set(0, y - 360 * (Math.PI / 180), 0);
        else camera.rotation.set(0, 180 * (Math.PI / 180) - y, 0);

        cameraBody.position.set(
            rightPortal.position.x + (CHARACTER_HEIGHT / 2),
            rightPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            rightPortal.position.z
        );
    }
    // leftPortalStatus: RIGHT , rightPortalStatus: RIGHT
    else if ((leftPortalStatus == Status.RIGHT && rightPortalStatus == Status.RIGHT) && viewInPortal &&
        (camera.position.x >= leftPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= leftPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= leftPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= leftPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= leftPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= leftPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Left to Right Portal(right -> right)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        var dirx = ray.ray.direction.x;
        var dirz = ray.ray.direction.z;
        if (dirx * dirz < 0) camera.rotation.set(0, y - 180 * (Math.PI / 180), 0);
        else camera.rotation.set(0, 0 * (Math.PI / 180) - y, 0);

        cameraBody.position.set(
            rightPortal.position.x - (CHARACTER_HEIGHT / 2),
            rightPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            rightPortal.position.z
        );
    }

    // right to left portal
    // rightPortalStatus: FRONT , leftPortalStatus: FRONT
    else if ((rightPortalStatus == Status.FRONT && leftPortalStatus == Status.FRONT) && viewInPortal &&
        (camera.position.x >= rightPortal.position.x - (100.1 * portalSize / 2) && camera.position.x <= rightPortal.position.x + (100.1 * portalSize / 2)) &&
        (camera.position.y >= rightPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= rightPortal.position.y + (100.1 * portalSize / 2)) &&
        (camera.position.z >= rightPortal.position.z - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.z <= rightPortal.position.z + (CHARACTER_HEIGHT / 2 - 1.01))) {
        console.log("Right to Left Portal(front -> front)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        camera.rotation.set(0, 180 * (Math.PI / 180), 0);
        camera.rotation.y = camera.rotation.y + y;

        cameraBody.position.set(
            leftPortal.position.x,
            leftPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            leftPortal.position.z + (CHARACTER_HEIGHT / 2)
        );
    }
    // rightPortalStatus: FRONT , leftPortalStatus: BACK
    else if ((rightPortalStatus == Status.FRONT && leftPortalStatus == Status.BACK) && viewInPortal &&
        (camera.position.x >= rightPortal.position.x - (100.1 * portalSize / 2) && camera.position.x <= rightPortal.position.x + (100.1 * portalSize / 2)) &&
        (camera.position.y >= rightPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= rightPortal.position.y + (100.1 * portalSize / 2)) &&
        (camera.position.z >= rightPortal.position.z - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.z <= rightPortal.position.z + (CHARACTER_HEIGHT / 2 - 1.01))) {
        console.log("Right to Left Portal(front -> back)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        camera.rotation.set(0, 0, 0);
        camera.rotation.y = camera.rotation.y + y;

        cameraBody.position.set(
            leftPortal.position.x,
            leftPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            leftPortal.position.z - (CHARACTER_HEIGHT / 2)
        );
    }
    // rightPortalStatus: FRONT , leftPortalStatus: LEFT
    else if ((rightPortalStatus == Status.FRONT && leftPortalStatus == Status.LEFT) && viewInPortal &&
        (camera.position.x >= rightPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= rightPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01)) &&
        (camera.position.y >= rightPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= rightPortal.position.y + (100.1 * portalSize / 2)) &&
        (camera.position.z >= rightPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= rightPortal.position.z + (100.1 * portalSize / 2))) {
        console.log("Right to Left Portal(front -> left)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        camera.rotation.set(0, -90 * (Math.PI / 180), 0);
        camera.rotation.y = camera.rotation.y + y;

        cameraBody.position.set(
            leftPortal.position.x + (CHARACTER_HEIGHT / 2),
            leftPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            leftPortal.position.z
        );
    }
    // rightPortalStatus: FRONT , leftPortalStatus: RIGHT
    else if ((rightPortalStatus == Status.FRONT && leftPortalStatus == Status.RIGHT) && viewInPortal &&
        (camera.position.x >= rightPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= rightPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01)) &&
        (camera.position.y >= rightPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= rightPortal.position.y + (100.1 * portalSize / 2)) &&
        (camera.position.z >= rightPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= rightPortal.position.z + (100.1 * portalSize / 2))) {
        console.log("Right to Left Portal(front -> right)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        camera.rotation.set(0, 90 * (Math.PI / 180), 0);
        camera.rotation.y = camera.rotation.y + y;

        cameraBody.position.set(
            leftPortal.position.x - (CHARACTER_HEIGHT / 2),
            leftPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            leftPortal.position.z
        );
    }
    // rightPortalStatus: BACK , leftPortalStatus: FRONT
    else if ((rightPortalStatus == Status.BACK && leftPortalStatus == Status.FRONT) && viewInPortal &&
        (camera.position.x >= rightPortal.position.x - (100.1 * portalSize / 2) && camera.position.x <= rightPortal.position.x + (100.1 * portalSize / 2)) &&
        (camera.position.y >= rightPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= rightPortal.position.y + (100.1 * portalSize / 2)) &&
        (camera.position.z >= rightPortal.position.z - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.z <= rightPortal.position.z + (CHARACTER_HEIGHT / 2 - 1.01))) {
        console.log("Right to Left Portal(back -> front)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        camera.rotation.set(0, 180 * (Math.PI / 180), 0);
        camera.rotation.y = camera.rotation.y - y;

        cameraBody.position.set(
            leftPortal.position.x,
            leftPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            leftPortal.position.z + (CHARACTER_HEIGHT / 2)
        );
    }
    // rightPortalStatus: BACK , leftPortalStatus: BACK
    else if ((rightPortalStatus == Status.BACK && leftPortalStatus == Status.BACK) && viewInPortal &&
        (camera.position.x >= rightPortal.position.x - (100.1 * portalSize / 2) && camera.position.x <= rightPortal.position.x + (100.1 * portalSize / 2)) &&
        (camera.position.y >= rightPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= rightPortal.position.y + (100.1 * portalSize / 2)) &&
        (camera.position.z >= rightPortal.position.z - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.z <= rightPortal.position.z + (CHARACTER_HEIGHT / 2 - 1.01))) {
        console.log("Right to Left Portal(back -> back)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        camera.rotation.set(0, 0, 0);
        camera.rotation.y = camera.rotation.y - y;

        cameraBody.position.set(
            leftPortal.position.x,
            leftPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            leftPortal.position.z - (CHARACTER_HEIGHT / 2)
        );
    }
    // rightPortalStatus: BACK , leftPortalStatus: LEFT
    else if ((rightPortalStatus == Status.BACK && leftPortalStatus == Status.LEFT) && viewInPortal &&
        (camera.position.x >= rightPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= rightPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01)) &&
        (camera.position.y >= rightPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= rightPortal.position.y + (100.1 * portalSize / 2)) &&
        (camera.position.z >= rightPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= rightPortal.position.z + (100.1 * portalSize / 2))) {
        console.log("Right to Left Portal(back -> left)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        camera.rotation.set(0, -90 * (Math.PI / 180), 0);
        camera.rotation.y = camera.rotation.y - y;

        cameraBody.position.set(
            leftPortal.position.x + (CHARACTER_HEIGHT / 2),
            leftPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            leftPortal.position.z
        );
    }
    // rightPortalStatus: BACK , leftPortalStatus: RIGHT
    else if ((rightPortalStatus == Status.BACK && leftPortalStatus == Status.RIGHT) && viewInPortal &&
        (camera.position.x >= rightPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= rightPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01)) &&
        (camera.position.y >= rightPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= rightPortal.position.y + (100.1 * portalSize / 2)) &&
        (camera.position.z >= rightPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= rightPortal.position.z + (100.1 * portalSize / 2))) {
        console.log("Right to Left Portal(back -> right)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        camera.rotation.set(0, 90 * (Math.PI / 180), 0);
        camera.rotation.y = camera.rotation.y - y;

        cameraBody.position.set(
            leftPortal.position.x - (CHARACTER_HEIGHT / 2),
            leftPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            leftPortal.position.z
        );
    }
    // rightPortalStatus: LEFT , leftPortalStatus: FRONT
    else if ((rightPortalStatus == Status.LEFT && leftPortalStatus == Status.FRONT) && viewInPortal &&
        (camera.position.x >= rightPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= rightPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= rightPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= rightPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= rightPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= rightPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Right to Left Portal(left -> front)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        var dirx = ray.ray.direction.x;
        var dirz = ray.ray.direction.z;
        if (dirx * dirz < 0) camera.rotation.set(0, 270 * (Math.PI / 180) - y, 0);
        else camera.rotation.set(0, y - 270 * (Math.PI / 180), 0);

        cameraBody.position.set(
            leftPortal.position.x,
            leftPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            leftPortal.position.z + (CHARACTER_HEIGHT / 2)
        );
    }
    // rightPortalStatus: LEFT , leftPortalStatus: BACK
    else if ((rightPortalStatus == Status.LEFT && leftPortalStatus == Status.BACK) && viewInPortal &&
        (camera.position.x >= rightPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= rightPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= rightPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= rightPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= rightPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= rightPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Right to Left Portal(left -> back)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        var dirx = ray.ray.direction.x;
        var dirz = ray.ray.direction.z;
        if (dirx * dirz < 0) camera.rotation.set(0, 90 * (Math.PI / 180) - y, 0);
        else camera.rotation.set(0, y - 90 * (Math.PI / 180), 0);

        cameraBody.position.set(
            leftPortal.position.x,
            leftPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            leftPortal.position.z - (CHARACTER_HEIGHT / 2)
        );
    }
    // rightPortalStatus: LEFT , leftPortalStatus: LEFT
    else if ((rightPortalStatus == Status.LEFT && leftPortalStatus == Status.LEFT) && viewInPortal &&
        (camera.position.x >= rightPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= rightPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= rightPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= rightPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= rightPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= rightPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Right to Left Portal(left -> left)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        var dirx = ray.ray.direction.x;
        var dirz = ray.ray.direction.z;
        if (dirx * dirz < 0) camera.rotation.set(0, 0 * (Math.PI / 180) - y, 0);
        else camera.rotation.set(0, y - 180 * (Math.PI / 180), 0);

        cameraBody.position.set(
            leftPortal.position.x + (CHARACTER_HEIGHT / 2),
            leftPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            leftPortal.position.z
        );
    }
    // rightPortalStatus: LEFT , leftPortalStatus: RIGHT
    else if ((rightPortalStatus == Status.LEFT && leftPortalStatus == Status.RIGHT) && viewInPortal &&
        (camera.position.x >= rightPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= rightPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= rightPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= rightPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= rightPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= rightPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Right to Left Portal(left -> right)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        var dirx = ray.ray.direction.x;
        var dirz = ray.ray.direction.z;
        if (dirx * dirz < 0) { camera.rotation.set(0, 180 * (Math.PI / 180) - y, 0); }
        else camera.rotation.set(0, y - 360 * (Math.PI / 180), 0);

        cameraBody.position.set(
            leftPortal.position.x - (CHARACTER_HEIGHT / 2),
            leftPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            leftPortal.position.z
        );
    }
    // rightPortalStatus: RIGHT , leftPortalStatus: FRONT
    else if ((rightPortalStatus == Status.RIGHT && leftPortalStatus == Status.FRONT) && viewInPortal &&
        (camera.position.x >= rightPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= rightPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= rightPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= rightPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= rightPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= rightPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Right to Left Portal(right -> front)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        var dirx = ray.ray.direction.x;
        var dirz = ray.ray.direction.z;
        if (dirx * dirz < 0) camera.rotation.set(0, y - 90 * (Math.PI / 180), 0);
        else camera.rotation.set(0, 90 * (Math.PI / 180) - y, 0);

        cameraBody.position.set(
            leftPortal.position.x,
            leftPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            leftPortal.position.z + (CHARACTER_HEIGHT / 2),
        );
    }
    // rightPortalStatus: RIGHT , leftPortalStatus: BACK
    else if ((rightPortalStatus == Status.RIGHT && leftPortalStatus == Status.BACK) && viewInPortal &&
        (camera.position.x >= rightPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= rightPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= rightPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= rightPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= rightPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= rightPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Right to Left Portal(right -> back)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        var dirx = ray.ray.direction.x;
        var dirz = ray.ray.direction.z;
        if (dirx * dirz < 0) camera.rotation.set(0, y - 270 * (Math.PI / 180), 0);
        else camera.rotation.set(0, - 90 * (Math.PI / 180) - y, 0);

        cameraBody.position.set(
            leftPortal.position.x,
            leftPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            leftPortal.position.z - (CHARACTER_HEIGHT / 2),
        );
    }
    // rightPortalStatus: RIGHT , leftPortalStatus: LEFT
    else if ((rightPortalStatus == Status.RIGHT && leftPortalStatus == Status.LEFT) && viewInPortal &&
        (camera.position.x >= rightPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= rightPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= rightPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= rightPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= rightPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= rightPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Right to Left Portal(right -> left)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        var dirx = ray.ray.direction.x;
        var dirz = ray.ray.direction.z;
        if (dirx * dirz < 0) camera.rotation.set(0, y - 360 * (Math.PI / 180), 0);
        else camera.rotation.set(0, 180 * (Math.PI / 180) - y, 0);

        cameraBody.position.set(
            leftPortal.position.x + (CHARACTER_HEIGHT / 2),
            leftPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            leftPortal.position.z
        );
    }
    // rightPortalStatus: RIGHT , leftPortalStatus: RIGHT
    else if ((rightPortalStatus == Status.RIGHT && leftPortalStatus == Status.RIGHT) && viewInPortal &&
        (camera.position.x >= rightPortal.position.x - (CHARACTER_HEIGHT / 2 - 1.01) && camera.position.x <= rightPortal.position.x + (CHARACTER_HEIGHT / 2 - 1.01) &&
            (camera.position.y >= rightPortal.position.y - (100.1 * portalSize / 2) && camera.position.y <= rightPortal.position.y + (100.1 * portalSize / 2)) &&
            (camera.position.z >= rightPortal.position.z - (100.1 * portalSize / 2) && camera.position.z <= rightPortal.position.z + (100.1 * portalSize / 2)))) {
        console.log("Right to Left Portal(right -> right)");

        portalEnterSound.pause();
        portalEnterSound.currentTime = 0;
        portalEnterSound.play();

        var y = camera.rotation.y;
        var dirx = ray.ray.direction.x;
        var dirz = ray.ray.direction.z;
        if (dirx * dirz < 0) camera.rotation.set(0, y - 180 * (Math.PI / 180), 0);
        else camera.rotation.set(0, 0 * (Math.PI / 180) - y, 0);

        cameraBody.position.set(
            leftPortal.position.x - (CHARACTER_HEIGHT / 2),
            leftPortal.position.y - (100.1 * portalSize / 2) + (CHARACTER_HEIGHT / 2),
            leftPortal.position.z
        );
    }
}

// function : Portal gun import
function onResourcesLoaded() {
    // player weapon
    portalgun = model.portal_gun.mesh.clone();
    portalgun.scale.set(0.004, 0.004, 0.004);
    camera.add(portalgun);
}

var nowMouseLocX = 0;
var nowMouseLocY = 0;
var nowMouseLocZ = 0;

// function : portal pre-installation viewer
function portalPreInstallViewer() {

    // when you look portals = true, or not = false
    ray.setFromCamera(mouse, camera);

    // get intersects
    var intersects = ray.intersectObjects(scene.children);

    // camera not move, ignore
    if (intersects[0] == null ||
        nowMouseLocX == intersects[0].point.x &&
        nowMouseLocY == intersects[0].point.y &&
        nowMouseLocZ == intersects[0].point.z) {
        return;
    }

    // get mouse location (x,y,z)
    nowMouseLocX = intersects[0].point.x;
    nowMouseLocY = intersects[0].point.y;
    nowMouseLocZ = intersects[0].point.z;

    if (intersects[0] == null || portalUID.indexOf(intersects[0].object.uuid) != -1) viewInPortal = true;
    else viewInPortal = false;

    // else, always set y = -10000
    line.position.set(0, -10000, 0);

    // calculate distance
    if (intersects[0] == null || portalWalls.indexOf(intersects[0].object.uuid) == -1) return;
    distance = Math.round(Math.sqrt(
        Math.pow(camera.position.x - intersects[0].point.x, 2) +
        Math.pow(camera.position.y - intersects[0].point.y, 2) +
        Math.pow(camera.position.z - intersects[0].point.z, 2)), 2);

    // show portal pre-installation
    if (intersects[0] == null || frontWalls.indexOf(intersects[0].object.uuid) != -1 && distance < maxDistance) {
        line.rotation.set(0, 0, 0);
        line.position.set(
            intersects[0].point.x,
            intersects[0].point.y,
            intersects[0].point.z + 1.0,
        );
    }
    else if (intersects[0] == null || backWalls.indexOf(intersects[0].object.uuid) != -1 && distance < maxDistance) {
        line.rotation.set(0, 0, 0);
        line.position.set(
            intersects[0].point.x,
            intersects[0].point.y,
            intersects[0].point.z - 1.0,
        );
    }
    else if (intersects[0] == null || leftWalls.indexOf(intersects[0].object.uuid) != -1 && distance < maxDistance) {
        line.rotation.set(0, 90 * (Math.PI / 180), 0);
        line.position.set(
            intersects[0].point.x + 1.0,
            intersects[0].point.y,
            intersects[0].point.z
        );
    }
    else if (intersects[0] == null || rightWalls.indexOf(intersects[0].object.uuid) != -1 && distance < maxDistance) {
        line.rotation.set(0, 90 * (Math.PI / 180), 0);
        line.position.set(
            intersects[0].point.x - 1.0,
            intersects[0].point.y,
            intersects[0].point.z,
        );
    }
}

// CameraUtils.js
const _va = new THREE.Vector3(), // from pe to pa
    _vb = new THREE.Vector3(), // from pe to pb
    _vc = new THREE.Vector3(), // from pe to pc
    _vr = new THREE.Vector3(), // right axis of screen
    _vu = new THREE.Vector3(), // up axis of screen
    _vn = new THREE.Vector3(), // normal vector of screen
    _vec = new THREE.Vector3(), // temporary vector
    _quat = new THREE.Quaternion(); // temporary quaternion


/** Set a PerspectiveCamera's projectionMatrix and quaternion
 * to exactly frame the corners of an arbitrary rectangle.
 * NOTE: This function ignores the standard parameters;
 * do not call updateProjectionMatrix() after this!
 * @param {Vector3} bottomLeftCorner
 * @param {Vector3} bottomRightCorner
 * @param {Vector3} topLeftCorner
 * @param {boolean} estimateViewFrustum */
function frameCorners(camera, bottomLeftCorner, bottomRightCorner, topLeftCorner, estimateViewFrustum = false) {

    const pa = bottomLeftCorner, pb = bottomRightCorner, pc = topLeftCorner;
    const pe = camera.position; // eye position
    const n = camera.near; // distance of near clipping plane
    const f = camera.far; //distance of far clipping plane

    _vr.copy(pb).sub(pa).normalize();
    _vu.copy(pc).sub(pa).normalize();
    _vn.crossVectors(_vr, _vu).normalize();

    _va.copy(pa).sub(pe); // from pe to pa
    _vb.copy(pb).sub(pe); // from pe to pb
    _vc.copy(pc).sub(pe); // from pe to pc

    const d = - _va.dot(_vn);	// distance from eye to screen
    const l = _vr.dot(_va) * n / d; // distance to left screen edge
    const r = _vr.dot(_vb) * n / d; // distance to right screen edge
    const b = _vu.dot(_va) * n / d; // distance to bottom screen edge
    const t = _vu.dot(_vc) * n / d; // distance to top screen edge

    // Set the camera rotation to match the focal plane to the corners' plane
    _quat.setFromUnitVectors(_vec.set(0, 1, 0), _vu);
    camera.quaternion.setFromUnitVectors(_vec.set(0, 0, 1).applyQuaternion(_quat), _vn).multiply(_quat);

    // Set the off-axis projection matrix to match the corners
    camera.projectionMatrix.set(2.0 * n / (r - l), 0.0,
        (r + l) / (r - l), 0.0, 0.0,
        2.0 * n / (t - b),
        (t + b) / (t - b), 0.0, 0.0, 0.0,
        (f + n) / (n - f),
        2.0 * f * n / (n - f), 0.0, 0.0, - 1.0, 0.0);
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();

    // FoV estimation to fix frustum culling
    if (estimateViewFrustum) {

        // Set fieldOfView to a conservative estimate
        // to make frustum tall/wide enough to encompass it
        camera.fov =
            THREE.MathUtils.RAD2DEG / Math.min(1.0, camera.aspect) *
            Math.atan((_vec.copy(pb).sub(pa).length() +
                (_vec.copy(pc).sub(pa).length())) / _va.length());
    }

}