export interface Component3DInfo {
  id: string;
  displayName: string;
  description: string;
  category: "Microcontroller" | "Drivers" | "Sensors" | "Mechanical" | "Power" | "Firmware & Logic" | "General";
  qty?: number;
  spec?: string;
}

export interface Project3DConfig {
  slug: string;
  title: string;
  modelUrl: string;
  wiringUrl: string;
  pinoutUrl: string;
  realImageUrl?: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  modelScale: number;
  componentMapping: Record<string, Component3DInfo>;
}

export const PROJECTS_3D_CONFIG: Record<string, Project3DConfig> = {
  "line-follower": {
    slug: "line-follower",
    title: "Line Follower Bot",
    modelUrl: "/robotics/models/line-follower/model.glb",
    wiringUrl: "/robotics/wiring/line-follower/line-follower-wirring.jpeg",
    pinoutUrl: "/robotics/pinout/line-follower/pinout.png",
    realImageUrl: "/robotics/line-follower-real.png",
    cameraPosition: [2.2, 1.8, 2.5],
    cameraTarget: [0, 0.35, 0],
    modelScale: 1.0,
    componentMapping: {
      "Chassis": {
        id: "chs-01",
        displayName: "Robot Baseplate Frame",
        description: "What it is: The clear plastic body plate. It holds the motors, computer, and battery securely in place.",
        category: "Mechanical",
        qty: 1,
        spec: "Laser-cut 3mm clear acrylic plate with pre-cut screw holes"
      },
      "ArduinoUno": {
        id: "mcu-01",
        displayName: "Arduino Uno Controller",
        description: "What it is: The small computer that controls the robot. It reads the sensors and tells the motors which way to turn.",
        category: "Microcontroller",
        qty: 1,
        spec: "Arduino Uno R3 with 14 connection pins and USB cable"
      },
      "MotorDriver": {
        id: "drv-01",
        displayName: "L298N Motor Driver Board",
        description: "What it is: A power board that controls the motors. It takes power from the battery and sends it safely to the wheels.",
        category: "Drivers",
        qty: 1,
        spec: "Dual motor driver with metal cooling heatsink"
      },
      "LeftWheel": {
        id: "whl-01",
        displayName: "Left Drive Wheel",
        description: "What it is: Rubber tire and wheel that grips the floor to drive the left side forward or backward.",
        category: "Mechanical",
        qty: 1,
        spec: "65mm rubber grip wheel that pushes onto the motor shaft"
      },
      "RightWheel": {
        id: "whl-02",
        displayName: "Right Drive Wheel",
        description: "What it is: Rubber tire and wheel that grips the floor to drive the right side forward or backward.",
        category: "Mechanical",
        qty: 1,
        spec: "65mm rubber grip wheel that pushes onto the motor shaft"
      },
      "LeftMotor": {
        id: "mot-01",
        displayName: "Left Gear Motor",
        description: "What it is: An electric motor with gears that turns electricity into wheel spinning power for the left side.",
        category: "Mechanical",
        qty: 1,
        spec: "Yellow 3V-6V DC gear motor with 1:48 reduction gears"
      },
      "RightMotor": {
        id: "mot-02",
        displayName: "Right Gear Motor",
        description: "What it is: An electric motor with gears that turns electricity into wheel spinning power for the right side.",
        category: "Mechanical",
        qty: 1,
        spec: "Yellow 3V-6V DC gear motor with 1:48 reduction gears"
      },
      "CasterWheel": {
        id: "cst-01",
        displayName: "Front Support Roller Wheel",
        description: "What it is: A metal roller ball that supports the front of the robot and lets it glide smoothly in any direction.",
        category: "Mechanical",
        qty: 1,
        spec: "Smooth steel caster ball mounted to the front underside"
      },
      "IRSensorArray": {
        id: "sen-01",
        displayName: "Line Tracking Sensors",
        description: "What it is: Light sensors that point down at the floor to see where the black line is.",
        category: "Sensors",
        qty: 1,
        spec: "TCRT5000 dual optical infrared reflectance sensor module"
      },
      "BatteryPack": {
        id: "pwr-01",
        displayName: "Rechargeable Battery Pack",
        description: "What it is: The battery case holding two rechargeable batteries that power the robot.",
        category: "Power",
        qty: 1,
        spec: "Holds two 18650 rechargeable batteries delivering 7.4 volts total"
      },
      "PowerSwitch": {
        id: "sw-01",
        displayName: "On/Off Power Switch",
        description: "What it is: A simple slide switch to turn battery power on and off safely.",
        category: "Power",
        qty: 1,
        spec: "Slide switch on the battery box"
      }
    }
  },

  "drone-explorer": {
    slug: "drone-explorer",
    title: "Drone Explorer Quad",
    modelUrl: "/robotics/models/drone-explorer/model.glb",
    wiringUrl: "/robotics/wiring/drone-explorer/drone-wiring.jpeg",
    pinoutUrl: "/robotics/pinout/drone-explorer/pinout.png",
    realImageUrl: "/robotics/drone-real.jpeg",
    cameraPosition: [2.5, 2.0, 2.5],
    cameraTarget: [0, 0.35, 0],
    modelScale: 1.0,
    componentMapping: {
      "DroneFrame": {
        id: "dr-frm-01",
        displayName: "Carbon Fiber Drone Frame",
        description: "What it is: The lightweight X-shaped frame that holds the 4 motors and the flight computer.",
        category: "Mechanical",
        qty: 1,
        spec: "Strong, lightweight 220mm carbon fiber frame"
      },
      "FlightController": {
        id: "dr-fc-01",
        displayName: "Flight Computer Brain",
        description: "What it is: The main computer that checks balance sensors and keeps the drone level in the air.",
        category: "Microcontroller",
        qty: 1,
        spec: "ESP32-S3 board with Wi-Fi and motion balance sensor"
      },
      "Motor_FL": {
        id: "dr-mot-01",
        displayName: "Front-Left Lift Motor",
        description: "What it is: High-speed electric motor that spins the front-left propeller to lift the drone.",
        category: "Drivers",
        qty: 1,
        spec: "High-power brushless motor"
      },
      "Motor_FR": {
        id: "dr-mot-02",
        displayName: "Front-Right Lift Motor",
        description: "What it is: High-speed electric motor that spins the front-right propeller to lift the drone.",
        category: "Drivers",
        qty: 1,
        spec: "High-power brushless motor"
      },
      "Motor_RL": {
        id: "dr-mot-03",
        displayName: "Rear-Left Lift Motor",
        description: "What it is: High-speed electric motor that spins the rear-left propeller to lift the drone.",
        category: "Drivers",
        qty: 1,
        spec: "High-power brushless motor"
      },
      "Motor_RR": {
        id: "dr-mot-04",
        displayName: "Rear-Right Lift Motor",
        description: "What it is: High-speed electric motor that spins the rear-right propeller to lift the drone.",
        category: "Drivers",
        qty: 1,
        spec: "High-power brushless motor"
      },
      "LiPoBattery": {
        id: "dr-bat-01",
        displayName: "Flight Battery Pack",
        description: "What it is: A high-power rechargeable battery pack that provides quick bursts of energy to spin all 4 motors.",
        category: "Power",
        qty: 1,
        spec: "11.1V high-discharge lithium-polymer battery"
      },
      "OpticalFlowCamera": {
        id: "dr-opt-01",
        displayName: "Ground Tracking Sensor",
        description: "What it is: A camera sensor looking at the floor that helps the drone stay locked in one spot without drifting.",
        category: "Sensors",
        qty: 1,
        spec: "Optical flow motion tracker and laser distance sensor"
      }
    }
  },

  "robotic-arm": {
    slug: "robotic-arm",
    title: "Robotic Arm 4-DOF",
    modelUrl: "/robotics/models/robotic-arm/model.glb",
    wiringUrl: "/robotics/wiring/robotic-arm/wiring.png",
    pinoutUrl: "/robotics/pinout/robotic-arm/pinout.png",
    realImageUrl: "/robotics/robotic-arm-real.jpg",
    cameraPosition: [2.4, 2.0, 2.4],
    cameraTarget: [0, 0.4, 0],
    modelScale: 1.0,
    componentMapping: {
      "BaseServo": {
        id: "arm-srv-01",
        displayName: "Base Rotation Servo",
        description: "What it is: A high-torque metal gear steering motor that rotates the entire arm left and right.",
        category: "Drivers",
        qty: 1,
        spec: "MG996R metal gear 180° servo motor"
      },
      "ShoulderServo": {
        id: "arm-srv-02",
        displayName: "Shoulder Elevation Servo",
        description: "What it is: A powerful steering motor that lifts the main lower arm up and down.",
        category: "Drivers",
        qty: 1,
        spec: "MG996R metal gear 180° servo motor"
      },
      "ElbowServo": {
        id: "arm-srv-03",
        displayName: "Elbow Joint Servo",
        description: "What it is: A steering motor that bends the elbow joint to reach forward or pull back.",
        category: "Drivers",
        qty: 1,
        spec: "MG996R metal gear 180° servo motor"
      },
      "GripperClaw": {
        id: "arm-clw-01",
        displayName: "Parallel Gripper Claw",
        description: "What it is: The mechanical hand with two pinchers operated by a servo to grasp objects.",
        category: "Mechanical",
        qty: 1,
        spec: "Dual-finger parallel gripper mechanism"
      },
      "ControllerBoard": {
        id: "arm-mcu-01",
        displayName: "Arduino Uno + PWM Servo Shield",
        description: "What it is: The microcontroller brain and 16-channel servo driver shield that coordinates joint angles.",
        category: "Microcontroller",
        qty: 1,
        spec: "ATmega328P with PCA9685 I2C 12-bit PWM shield"
      },
      "BasePlate": {
        id: "arm-bas-01",
        displayName: "Desktop Stabilizer Base",
        description: "What it is: A broad, rigid mounting plate with rubber feet that keeps the arm upright.",
        category: "Mechanical",
        qty: 1,
        spec: "Weighted acrylic desktop baseplate"
      }
    }
  },

  "robosoccer": {
    slug: "robosoccer",
    title: "RoboSoccer Bot",
    modelUrl: "/robotics/models/robosoccer/model.glb",
    wiringUrl: "/robotics/wiring/robosoccer/wiring.png",
    pinoutUrl: "/robotics/pinout/robosoccer/pinout.png",
    realImageUrl: "/robotics/robosoccer-real.jpg",
    cameraPosition: [2.2, 1.8, 2.2],
    cameraTarget: [0, 0.35, 0],
    modelScale: 1.0,
    componentMapping: {
      "SoccerChassis": {
        id: "soc-chs-01",
        displayName: "Round Bumper Chassis",
        description: "What it is: A round protective frame that deflects bumps from other soccer robots.",
        category: "Mechanical",
        qty: 1,
        spec: "180mm round impact-resistant body plate"
      },
      "BallKicker": {
        id: "soc-kck-01",
        displayName: "Spring Lever Kicker",
        description: "What it is: An electric push lever that punches forward to kick the soccer ball across the field.",
        category: "Drivers",
        qty: 1,
        spec: "12V electric push plunger with return spring"
      },
      "ControllerBoard": {
        id: "soc-mcu-01",
        displayName: "Wireless Bluetooth Computer",
        description: "What it is: The robot brain that listens to your handheld wireless game controller.",
        category: "Microcontroller",
        qty: 1,
        spec: "ESP32 board with Bluetooth antenna"
      },
      "BallSensor": {
        id: "soc-sen-01",
        displayName: "Ball Color Sensor",
        description: "What it is: A color sensor that tells the computer when the bright soccer ball is in front of the kicker.",
        category: "Sensors",
        qty: 1,
        spec: "RGB color detection sensor"
      },
      "BatteryPack": {
        id: "soc-pwr-01",
        displayName: "High-Power Battery Pack",
        description: "What it is: The battery pack powering the driving motors and the ball kicker.",
        category: "Power",
        qty: 1,
        spec: "11.1V rechargeable lithium battery pack"
      }
    }
  },

  "robomaze": {
    slug: "robomaze",
    title: "RoboMaze Ultrasonic Solver",
    modelUrl: "/robotics/models/robomaze/model.glb",
    wiringUrl: "/robotics/wiring/robomaze/wiring.png",
    pinoutUrl: "/robotics/pinout/robomaze/pinout.png",
    realImageUrl: "/projects/robomaze-real.jpg",
    cameraPosition: [2.0, 1.6, 2.2],
    cameraTarget: [0, 0.35, 0],
    modelScale: 1.0,
    componentMapping: {
      "MazeChassis": {
        id: "maze-chs-01",
        displayName: "Compact Maze Body Plate",
        description: "What it is: A narrow robot body designed to turn tight corners inside narrow maze alleys.",
        category: "Mechanical",
        qty: 1,
        spec: "Compact narrow chassis plate"
      },
      "FrontUltrasonic": {
        id: "maze-sen-01",
        displayName: "Front Wall Distance Sensor",
        description: "What it is: A sound sensor pointing forward that measures how far the robot is from a dead end.",
        category: "Sensors",
        qty: 1,
        spec: "HC-SR04 ultrasonic sound ranger (2cm - 400cm)"
      },
      "LeftUltrasonic": {
        id: "maze-sen-02",
        displayName: "Left Wall Distance Sensor",
        description: "What it is: A sound sensor pointing left to help the robot stay centered away from the left wall.",
        category: "Sensors",
        qty: 1,
        spec: "HC-SR04 ultrasonic sound ranger"
      },
      "RightUltrasonic": {
        id: "maze-sen-03",
        displayName: "Right Wall Distance Sensor",
        description: "What it is: A sound sensor pointing right that spots open side corridors and maze turns.",
        category: "Sensors",
        qty: 1,
        spec: "HC-SR04 ultrasonic sound ranger"
      },
      "NanoController": {
        id: "maze-mcu-01",
        displayName: "Arduino Nano Computer",
        description: "What it is: A compact computer chip that decides which corridor to take next.",
        category: "Microcontroller",
        qty: 1,
        spec: "Arduino Nano (ATmega328P) with USB port"
      },
      "BatteryPack": {
        id: "maze-pwr-01",
        displayName: "Lightweight Battery",
        description: "What it is: A small rechargeable battery pack that keeps the robot lightweight for quick turns.",
        category: "Power",
        qty: 1,
        spec: "7.4V rechargeable battery pack"
      }
    }
  }
};

// Aliases for slug flexibility
PROJECTS_3D_CONFIG["drone"] = PROJECTS_3D_CONFIG["drone-explorer"];
PROJECTS_3D_CONFIG["maze-solver"] = PROJECTS_3D_CONFIG["robomaze"];
PROJECTS_3D_CONFIG["arm"] = PROJECTS_3D_CONFIG["robotic-arm"];
PROJECTS_3D_CONFIG["soccer"] = PROJECTS_3D_CONFIG["robosoccer"];

/**
 * Retrieve 3D project configuration with safe alias fallbacks
 */
export function getProject3DConfig(slug: string): Project3DConfig {
  const normalized = slug.toLowerCase().trim();
  if (PROJECTS_3D_CONFIG[normalized]) {
    return PROJECTS_3D_CONFIG[normalized];
  }

  // Graceful fallback for any other project: provide standard paths and generic mapping
  return {
    slug: normalized,
    title: normalized.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    modelUrl: `/robotics/models/${normalized}/model.glb`,
    wiringUrl: `/robotics/wiring/${normalized}/wiring.png`,
    pinoutUrl: `/robotics/pinout/${normalized}/pinout.png`,
    realImageUrl: `/robotics/${normalized}-real.jpg`,
    cameraPosition: [2.2, 1.8, 2.5],
    cameraTarget: [0, 0.35, 0],
    modelScale: 1.0,
    componentMapping: {}
  };
}

/**
 * Resolve component info from a 3D model node name
 */
export function resolveComponentInfo(config: Project3DConfig, nodeName: string): Component3DInfo {
  // 1. Direct match in mapping
  if (config.componentMapping[nodeName]) {
    return config.componentMapping[nodeName];
  }

  // 2. Case-insensitive match
  const lowerName = nodeName.toLowerCase();
  for (const [key, val] of Object.entries(config.componentMapping)) {
    if (key.toLowerCase() === lowerName || lowerName.includes(key.toLowerCase())) {
      return val;
    }
  }

  // 3. Smart clean formatting for unmapped node names in user-replaced GLBs
  const formattedName = nodeName
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

  return {
    id: `comp-${nodeName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    displayName: formattedName || "Robot Component",
    description: "What it is: A modular hardware part of your assembled robot.",
    category: "General",
    qty: 1
  };
}
