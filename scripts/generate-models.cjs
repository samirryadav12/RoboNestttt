const fs = require('fs');
const path = require('path');

// Polyfill FileReader for Node.js environment
class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((b) => {
      this.result = b;
      if (this.onload) this.onload();
      if (this.onloadend) this.onloadend();
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((b) => {
      this.result = 'data:' + (blob.type || '') + ';base64,' + Buffer.from(b).toString('base64');
      if (this.onload) this.onload();
      if (this.onloadend) this.onloadend();
    });
  }
}
global.FileReader = FileReader;

const THREE = require('three');
const { GLTFExporter } = require('three/examples/jsm/exporters/GLTFExporter.js');

async function exportSceneToGlb(scene, outputPath) {
  const exporter = new GLTFExporter();
  const glbBuffer = await exporter.parseAsync(scene, { binary: true });
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, Buffer.from(glbBuffer));
  console.log(`Exported: ${outputPath} (${glbBuffer.byteLength} bytes)`);
}

// -------------------------------------------------------------
// 1. LINE FOLLOWER BOT
// -------------------------------------------------------------
function buildLineFollower() {
  const root = new THREE.Group();
  root.name = 'LineFollowerRobot';

  // Materials
  const acrylicMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.3, metalness: 0.1, transparent: true, opacity: 0.88 });
  const pcbGreenMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.5, metalness: 0.3 });
  const pcbRedMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.5, metalness: 0.3 });
  const blackMetalMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.4, metalness: 0.7 });
  const yellowPlasticMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4, metalness: 0.1 });
  const rubberTireMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9, metalness: 0.1 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.2, metalness: 0.9 });
  const batteryMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6, metalness: 0.2 });
  const sensorMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.4, metalness: 0.3 });
  const ledOpticMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.5, emissive: 0x0284c7, emissiveIntensity: 0.4 });

  // Chassis Lower Deck
  const chassisGeom = new THREE.BoxGeometry(2.0, 0.08, 1.3);
  const chassis = new THREE.Mesh(chassisGeom, acrylicMat);
  chassis.name = 'Chassis';
  chassis.position.set(0, 0.35, 0);
  root.add(chassis);

  // Left Motor (Yellow TT Gearbox)
  const motorGeom = new THREE.BoxGeometry(0.7, 0.25, 0.35);
  const leftMotor = new THREE.Mesh(motorGeom, yellowPlasticMat);
  leftMotor.name = 'LeftMotor';
  leftMotor.position.set(-0.25, 0.25, 0.55);
  root.add(leftMotor);

  // Right Motor (Yellow TT Gearbox)
  const rightMotor = new THREE.Mesh(motorGeom, yellowPlasticMat);
  rightMotor.name = 'RightMotor';
  rightMotor.position.set(-0.25, 0.25, -0.55);
  root.add(rightMotor);

  // Left Wheel (Wheel + Rubber Tire)
  const wheelGroupL = new THREE.Group();
  wheelGroupL.name = 'LeftWheel';
  const tireGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.18, 24);
  const tireL = new THREE.Mesh(tireGeom, rubberTireMat);
  tireL.rotation.x = Math.PI / 2;
  const rimGeom = new THREE.CylinderGeometry(0.28, 0.28, 0.19, 16);
  const rimL = new THREE.Mesh(rimGeom, yellowPlasticMat);
  rimL.rotation.x = Math.PI / 2;
  wheelGroupL.add(tireL);
  wheelGroupL.add(rimL);
  wheelGroupL.position.set(-0.25, 0.25, 0.78);
  root.add(wheelGroupL);

  // Right Wheel (Wheel + Rubber Tire)
  const wheelGroupR = new THREE.Group();
  wheelGroupR.name = 'RightWheel';
  const tireR = new THREE.Mesh(tireGeom, rubberTireMat);
  tireR.rotation.x = Math.PI / 2;
  const rimR = new THREE.Mesh(rimGeom, yellowPlasticMat);
  rimR.rotation.x = Math.PI / 2;
  wheelGroupR.add(tireR);
  wheelGroupR.add(rimR);
  wheelGroupR.position.set(-0.25, 0.25, -0.78);
  root.add(wheelGroupR);

  // Front Caster Wheel
  const caster = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), chromeMat);
  caster.name = 'CasterWheel';
  caster.position.set(0.75, 0.16, 0);
  root.add(caster);

  // Arduino Uno R3 Board
  const arduinoGroup = new THREE.Group();
  arduinoGroup.name = 'ArduinoUno';
  const unoBoard = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.04, 0.65), pcbGreenMat);
  const mcuChip = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.04, 0.15), blackMetalMat);
  mcuChip.position.set(0.05, 0.03, 0);
  const usbPort = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.15), chromeMat);
  usbPort.position.set(-0.4, 0.06, 0.18);
  arduinoGroup.add(unoBoard, mcuChip, usbPort);
  arduinoGroup.position.set(-0.35, 0.45, 0);
  root.add(arduinoGroup);

  // L298N Motor Driver Board
  const driverGroup = new THREE.Group();
  driverGroup.name = 'MotorDriver';
  const driverBoard = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.04, 0.65), pcbRedMat);
  const heatsink = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.35, 0.4), blackMetalMat);
  heatsink.position.set(0, 0.18, 0);
  driverGroup.add(driverBoard, heatsink);
  driverGroup.position.set(0.45, 0.45, 0.2);
  root.add(driverGroup);

  // TCRT5000 Dual IR Sensor Array
  const irGroup = new THREE.Group();
  irGroup.name = 'IRSensorArray';
  const irPcb = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.04, 0.7), sensorMat);
  const ledL = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.12, 12), ledOpticMat);
  ledL.position.set(0.05, -0.06, 0.2);
  const ledR = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.12, 12), ledOpticMat);
  ledR.position.set(0.05, -0.06, -0.2);
  irGroup.add(irPcb, ledL, ledR);
  irGroup.position.set(1.05, 0.2, 0);
  root.add(irGroup);

  // 2x 18650 Battery Pack
  const batteryGroup = new THREE.Group();
  batteryGroup.name = 'BatteryPack';
  const batCase = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.32, 0.55), batteryMat);
  batteryGroup.add(batCase);
  batteryGroup.position.set(0.35, 0.55, -0.3);
  root.add(batteryGroup);

  // Power Switch
  const switchMesh = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.15), chromeMat);
  switchMesh.name = 'PowerSwitch';
  switchMesh.position.set(-0.7, 0.46, -0.4);
  root.add(switchMesh);

  return root;
}

// -------------------------------------------------------------
// 2. DRONE EXPLORER QUAD
// -------------------------------------------------------------
function buildDrone() {
  const root = new THREE.Group();
  root.name = 'DroneExplorerQuad';

  const carbonMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.8 });
  const motorMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3, metalness: 0.8 });
  const bellMat = new THREE.MeshStandardMaterial({ color: 0xc85a32, roughness: 0.4, metalness: 0.6 });
  const propMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.1, transparent: true, opacity: 0.85 });
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.4, metalness: 0.4 });
  const lipoMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.5, metalness: 0.2 });

  // Center Plate & X-Arms
  const centerPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.08, 6), carbonMat);
  centerPlate.name = 'DroneFrame';
  centerPlate.position.set(0, 0.3, 0);
  root.add(centerPlate);

  const armLength = 1.3;
  const armGeom = new THREE.BoxGeometry(armLength * 2, 0.06, 0.1);
  const arm1 = new THREE.Mesh(armGeom, carbonMat);
  arm1.name = 'FrameArms';
  arm1.rotation.y = Math.PI / 4;
  arm1.position.set(0, 0.3, 0);
  const arm2 = new THREE.Mesh(armGeom, carbonMat);
  arm2.rotation.y = -Math.PI / 4;
  arm2.position.set(0, 0.3, 0);
  root.add(arm1, arm2);

  // 4 Motors + Propellers
  const positions = [
    { name: 'Motor_FL', prop: 'Propeller_FL', x: -0.9, z: 0.9 },
    { name: 'Motor_FR', prop: 'Propeller_FR', x: 0.9, z: 0.9 },
    { name: 'Motor_RL', prop: 'Propeller_RL', x: -0.9, z: -0.9 },
    { name: 'Motor_RR', prop: 'Propeller_RR', x: 0.9, z: -0.9 },
  ];

  positions.forEach((pos) => {
    const motorGroup = new THREE.Group();
    motorGroup.name = pos.name;
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.16, 16), motorMat);
    const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.12, 16), bellMat);
    bell.position.y = 0.12;
    motorGroup.add(base, bell);
    motorGroup.position.set(pos.x, 0.38, pos.z);
    root.add(motorGroup);

    // 3-blade Propeller
    const propGroup = new THREE.Group();
    propGroup.name = pos.prop;
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 12), bellMat);
    const bladeGeom = new THREE.BoxGeometry(0.9, 0.02, 0.1);
    const b1 = new THREE.Mesh(bladeGeom, propMat);
    const b2 = new THREE.Mesh(bladeGeom, propMat);
    b2.rotation.y = Math.PI / 3;
    const b3 = new THREE.Mesh(bladeGeom, propMat);
    b3.rotation.y = (2 * Math.PI) / 3;
    propGroup.add(hub, b1, b2, b3);
    propGroup.position.set(pos.x, 0.52, pos.z);
    root.add(propGroup);
  });

  // Flight Controller (ESP32-S3)
  const fc = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.06, 0.55), pcbMat);
  fc.name = 'FlightController';
  fc.position.set(0, 0.4, 0);
  root.add(fc);

  // LiPo Battery
  const lipo = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.3, 0.4), lipoMat);
  lipo.name = 'LiPoBattery';
  lipo.position.set(0, 0.12, 0);
  root.add(lipo);

  // Optical Flow & Camera Module
  const camera = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.15, 0.25), carbonMat);
  camera.name = 'OpticalFlowCamera';
  camera.position.set(0.2, 0.0, 0);
  root.add(camera);

  return root;
}

// -------------------------------------------------------------
// 3. ROBOSOCCER BOT
// -------------------------------------------------------------
function buildRoboSoccer() {
  const root = new THREE.Group();
  root.name = 'RoboSoccerBot';

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.4 });
  const orangeMat = new THREE.MeshStandardMaterial({ color: 0xc85a32, roughness: 0.4, metalness: 0.5 });
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6, metalness: 0.3 });
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.4, metalness: 0.3 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.2, metalness: 0.9 });

  // Cylindrical Protective Chassis
  const chassis = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.9, 0.5, 24), bodyMat);
  chassis.name = 'SoccerChassis';
  chassis.position.set(0, 0.35, 0);
  root.add(chassis);

  // Solenoid Ball Kicker Plunger
  const kickerGroup = new THREE.Group();
  kickerGroup.name = 'BallKicker';
  const coil = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.35, 16), orangeMat);
  coil.rotation.z = Math.PI / 2;
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.45, 12), chromeMat);
  rod.rotation.z = Math.PI / 2;
  rod.position.x = 0.2;
  kickerGroup.add(coil, rod);
  kickerGroup.position.set(0.65, 0.22, 0);
  root.add(kickerGroup);

  // 3 Omni Wheels at 120 degrees
  for (let i = 0; i < 3; i++) {
    const angle = (i * 2 * Math.PI) / 3;
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.12, 16), wheelMat);
    wheel.name = `OmniWheel_${i + 1}`;
    wheel.rotation.z = Math.PI / 2;
    wheel.rotation.y = angle;
    wheel.position.set(Math.cos(angle) * 0.78, 0.24, Math.sin(angle) * 0.78);
    root.add(wheel);
  }

  // ESP32 Controller & Bluetooth
  const controller = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 0.45), pcbMat);
  controller.name = 'ControllerBoard';
  controller.position.set(-0.1, 0.63, 0);
  root.add(controller);

  // TCS34725 Ball Color Sensor
  const sensor = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.18), orangeMat);
  sensor.name = 'BallSensor';
  sensor.position.set(0.8, 0.15, 0);
  root.add(sensor);

  // Battery Pack
  const bat = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.22, 0.35), bodyMat);
  bat.name = 'BatteryPack';
  bat.position.set(-0.25, 0.4, 0);
  root.add(bat);

  return root;
}

// -------------------------------------------------------------
// 4. ROBOMAZE ULTRASONIC SOLVER
// -------------------------------------------------------------
function buildRoboMaze() {
  const root = new THREE.Group();
  root.name = 'RoboMazeSolver';

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4, metalness: 0.3 });
  const sensorPcbMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4, metalness: 0.3 });
  const transducerMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.2, metalness: 0.8 });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9, metalness: 0.1 });
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.5, metalness: 0.3 });

  // Chassis
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.9), bodyMat);
  chassis.name = 'MazeChassis';
  chassis.position.set(0, 0.25, 0);
  root.add(chassis);

  // Micro Wheels
  const leftWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.12, 16), tireMat);
  leftWheel.name = 'LeftTire';
  leftWheel.rotation.x = Math.PI / 2;
  leftWheel.position.set(-0.1, 0.22, 0.52);
  root.add(leftWheel);

  const rightWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.12, 16), tireMat);
  rightWheel.name = 'RightTire';
  rightWheel.rotation.x = Math.PI / 2;
  rightWheel.position.set(-0.1, 0.22, -0.52);
  root.add(rightWheel);

  // Ultrasonic Sensor Helper
  function createHCSR04(name) {
    const group = new THREE.Group();
    group.name = name;
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.45), sensorPcbMat);
    const t1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 14), transducerMat);
    t1.rotation.z = Math.PI / 2;
    t1.position.set(0.08, 0, 0.12);
    const t2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 14), transducerMat);
    t2.rotation.z = Math.PI / 2;
    t2.position.set(0.08, 0, -0.12);
    group.add(pcb, t1, t2);
    return group;
  }

  // Front HC-SR04
  const frontSensor = createHCSR04('FrontUltrasonic');
  frontSensor.position.set(0.72, 0.35, 0);
  root.add(frontSensor);

  // Left HC-SR04
  const leftSensor = createHCSR04('LeftUltrasonic');
  leftSensor.rotation.y = -Math.PI / 2;
  leftSensor.position.set(0.4, 0.35, 0.45);
  root.add(leftSensor);

  // Right HC-SR04
  const rightSensor = createHCSR04('RightUltrasonic');
  rightSensor.rotation.y = Math.PI / 2;
  rightSensor.position.set(0.4, 0.35, -0.45);
  root.add(rightSensor);

  // Arduino Nano
  const nano = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.05, 0.24), pcbMat);
  nano.name = 'NanoController';
  nano.position.set(-0.25, 0.35, 0);
  root.add(nano);

  // Battery Pack
  const bat = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.22, 0.4), bodyMat);
  bat.name = 'BatteryPack';
  bat.position.set(0.1, 0.4, 0);
  root.add(bat);

  return root;
}

// -------------------------------------------------------------
// MAIN EXPORT RUNNER
// -------------------------------------------------------------
async function run() {
  console.log('Generating 3D GLB Models for RoboNest...');

  // 1. Line Follower
  const lineFollower = buildLineFollower();
  await exportSceneToGlb(lineFollower, 'public/robotics/models/line-follower/model.glb');

  // 2. Drone Explorer
  const drone = buildDrone();
  await exportSceneToGlb(drone, 'public/robotics/models/drone/model.glb');
  await exportSceneToGlb(drone, 'public/robotics/models/drone-explorer/model.glb');

  // 3. RoboSoccer
  const robosoccer = buildRoboSoccer();
  await exportSceneToGlb(robosoccer, 'public/robotics/models/robosoccer/model.glb');

  // 4. RoboMaze Solver
  const robomaze = buildRoboMaze();
  await exportSceneToGlb(robomaze, 'public/robotics/models/robomaze/model.glb');
  await exportSceneToGlb(robomaze, 'public/robotics/models/maze-solver/model.glb');

  console.log('All 3D Models generated successfully!');
}

run().catch((err) => {
  console.error('Failed to generate models:', err);
  process.exit(1);
});
