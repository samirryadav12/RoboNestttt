export interface ComponentItem {
  id: string;
  name: string;
  category: "Microcontrollers" | "Sensors" | "Motors & Actuators" | "Motor Drivers" | "Power & Batteries" | "Mechanical & Chassis";
  price: string;
  inStock: boolean;
  stockCount: number;
  voltage: string;
  interface: string;
  description: string;
  whatItIs: string;
  featuredIn: string[];
  image: string;
  datasheetUrl?: string;
  specs: { label: string; value: string }[];
}

export const COMPONENTS: ComponentItem[] = [
  {
    id: "mcu-uno-r3",
    name: "Arduino Uno R3 (ATmega328P)",
    category: "Microcontrollers",
    price: "₹480",
    inStock: true,
    stockCount: 142,
    voltage: "5V Operating / 7-12V Battery",
    interface: "14 Digital Pins, 6 Speed Pins, USB Port",
    whatItIs: "The small computer that controls the robot.",
    description: "What it is: The small computer that controls the robot. It runs the code you upload from your computer and sends signals to motors and sensors. Technical details: 14 digital pins, 6 speed control pins, and ATmega328P chip.",
    featuredIn: ["Line Follower Bot", "Robotic Arm 4-DOF", "BalanceBot Pro"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZyetpTxAL9MPIBrGscvzDKrpwsJdk_o8EBUZw29qbFEkuJAALalQcN9exWXEqPu2DYj",
    specs: [
      { label: "Role", value: "Robot Brain" },
      { label: "Computer Chip", value: "ATmega328P (16 MHz)" },
      { label: "Connection Pins", value: "14 Digital + 6 Analog" },
      { label: "Power Needed", value: "5V from USB or Battery" }
    ]
  },
  {
    id: "mcu-esp32-wroom",
    name: "ESP32-WROOM-32 Board",
    category: "Microcontrollers",
    price: "₹390",
    inStock: true,
    stockCount: 88,
    voltage: "3.3V Operating / 5V USB",
    interface: "Built-in Wi-Fi & Bluetooth",
    whatItIs: "A fast mini-computer with built-in Wi-Fi and Bluetooth.",
    description: "What it is: A fast mini-computer with built-in Wi-Fi and Bluetooth. It lets you control robots from your phone or stream live data over the air. Technical details: Dual-core processor with 36 connection pins.",
    featuredIn: ["RoboSoccer Bot", "Drone Explorer Quad", "Smart Agro Rover"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAs-s_xHZgOfwxJ4J_CD-UOD4KUI2hbqhwMiB544etWzS0gzDHRzWkBytXKBmDEQqOeGr",
    specs: [
      { label: "Role", value: "Wireless Robot Brain" },
      { label: "Wireless", value: "Wi-Fi + Bluetooth" },
      { label: "Processor Speed", value: "240 MHz Dual Core" },
      { label: "Pins", value: "36 Connection Pins" }
    ]
  },
  {
    id: "sen-tcrt5000",
    name: "TCRT5000 Dual IR Line Sensor",
    category: "Sensors",
    price: "₹95",
    inStock: true,
    stockCount: 310,
    voltage: "3.3V - 5.0V DC",
    interface: "Digital Signal Out (DO)",
    whatItIs: "A light sensor that helps the robot see the line on the floor.",
    description: "What it is: A light sensor that helps the robot see the line on the floor. It bounces invisible infrared light against the ground to tell white paper from black tape. Technical details: Dual optical sensors with sensitivity tuning dial.",
    featuredIn: ["Line Follower Bot", "RoboSoccer Bot"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkRFKDf4ZGKw3TlU9IGXIuIToMe09dNw5mwo6ZWT05toPY7t4AwvDX0ROlVTfrxZbn1c",
    specs: [
      { label: "Role", value: "Line Seeing Sensor" },
      { label: "Sensing Height", value: "5mm to 10mm above floor" },
      { label: "Adjustment", value: "Built-in tuning dial" },
      { label: "Power Needed", value: "5V Power" }
    ]
  },
  {
    id: "sen-hcsr04",
    name: "HC-SR04 Ultrasonic Distance Sensor",
    category: "Sensors",
    price: "₹85",
    inStock: true,
    stockCount: 220,
    voltage: "5.0V DC",
    interface: "Trigger Pin & Echo Pin",
    whatItIs: "A sound sensor that measures how far away walls or obstacles are.",
    description: "What it is: A sound sensor that measures how far away obstacles are. It sends out a silent sound wave and listens for the bounce-back echo, just like a bat in the dark. Technical details: Measures distances from 2cm to 400cm.",
    featuredIn: ["RoboMaze Ultrasonic Solver", "Line Follower Bot"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkjZRs1bIDBuvdMSBU1YuW_Ovllsxq3E7Hu4hBWTSC7-Kr8Eg2Dj07wAbGBp6wQpJwA6",
    specs: [
      { label: "Role", value: "Obstacle Detector" },
      { label: "Range", value: "2 cm to 400 cm" },
      { label: "Technology", value: "High-Frequency Sound Waves" },
      { label: "Accuracy", value: "Down to 3mm" }
    ]
  },
  {
    id: "sen-mpu6050",
    name: "MPU-6050 Gyro & Motion Sensor",
    category: "Sensors",
    price: "₹140",
    inStock: true,
    stockCount: 76,
    voltage: "3.3V - 5.0V DC",
    interface: "I2C Two-Wire Bus",
    whatItIs: "A motion and tilt sensor that helps robots balance.",
    description: "What it is: A motion and tilt sensor that helps robots balance. It detects when the robot tilts, leans, or turns in the air. Technical details: 3-axis gyroscope and 3-axis accelerometer.",
    featuredIn: ["BalanceBot Pro", "Drone Explorer Quad"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    specs: [
      { label: "Role", value: "Tilt & Balance Sensor" },
      { label: "Axes", value: "6 Degrees of Motion" },
      { label: "Wiring", value: "SDA & SCL Signal Pins" },
      { label: "Use Case", value: "Self-Balancing & Drones" }
    ]
  },
  {
    id: "drv-l298n",
    name: "L298N Dual Motor Driver Board",
    category: "Motor Drivers",
    price: "₹175",
    inStock: true,
    stockCount: 195,
    voltage: "5V - 12V Battery Feed",
    interface: "Speed Pins (PWM) & Direction Pins (IN1-IN4)",
    whatItIs: "A board that lets the controller safely power and steer the motors.",
    description: "What it is: A board that lets the controller power and steer the motors. Controllers cannot provide enough power directly to spin motors, so this board takes power from the battery and sends it safely to the motors. Technical details: Dual H-bridge with metal heatsink.",
    featuredIn: ["Line Follower Bot", "RoboMaze Ultrasonic Solver", "Smart Agro Rover"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHYttQK21vofZRFENCEqdo-h_nkucoiY_7-z4FoLLK5D_wnAsUSeMu7WHzj2rRIp1qnG",
    specs: [
      { label: "Role", value: "Motor Power Controller" },
      { label: "Motors Handled", value: "Up to 2 DC Motors" },
      { label: "Power Capacity", value: "2 Amps per motor" },
      { label: "Cooling", value: "Aluminum Heatsink" }
    ]
  },
  {
    id: "act-tt-motor",
    name: "TT Gear Motor + Rubber Wheel",
    category: "Motors & Actuators",
    price: "₹130",
    inStock: true,
    stockCount: 410,
    voltage: "3V - 6V DC",
    interface: "2-Wire DC Connection (+ and -)",
    whatItIs: "A small electric motor with internal gears and a grippy wheel.",
    description: "What it is: A small electric motor with internal gears and a grippy wheel. Inside the yellow case are plastic reduction gears that give the wheel enough strength to drive the robot smoothly. Technical details: 1:48 reduction gear ratio.",
    featuredIn: ["Line Follower Bot", "RoboMaze Ultrasonic Solver"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2SjOVkbdl1JAYdeTTMmUGcl7WEp_7Qyq7BxFYrgLBg0fpOKHHim_gjUdWYwRjXjZrad",
    specs: [
      { label: "Role", value: "Driving Motor & Wheel" },
      { label: "Wheel Size", value: "65mm Rubber Grip" },
      { label: "Speed", value: "Up to 200 RPM" },
      { label: "Gearing", value: "1:48 High Torque" }
    ]
  },
  {
    id: "act-servo-mg996r",
    name: "MG996R Metal Gear Servo Motor",
    category: "Motors & Actuators",
    price: "₹320",
    inStock: true,
    stockCount: 65,
    voltage: "4.8V - 7.2V DC",
    interface: "3-Wire Plug (Signal / Power / Ground)",
    whatItIs: "A steering motor with strong metal gears that turns to exact angles.",
    description: "What it is: A steering motor with strong metal gears that turns to exact angles. Unlike regular wheels that spin continuously, servos rotate to precise angles, making them ideal for robot arms and steering claws. Technical details: 11 kg-cm torque rating.",
    featuredIn: ["Robotic Arm 4-DOF", "Vision Sorter"],
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
    specs: [
      { label: "Role", value: "Joint & Claw Motor" },
      { label: "Rotation", value: "0° to 180° Exact Angle" },
      { label: "Strength", value: "High-Strength Metal Gears" },
      { label: "Wiring", value: "3-Pin Jumper Plug" }
    ]
  },
  {
    id: "pwr-18650-holder",
    name: "2x 18650 Battery Case with Switch",
    category: "Power & Batteries",
    price: "₹85",
    inStock: true,
    stockCount: 180,
    voltage: "7.4 Volts Total (2 Cells)",
    interface: "Red (+) and Black (-) Wires",
    whatItIs: "A battery box with an On/Off switch that holds two rechargeable batteries.",
    description: "What it is: A battery case with a built-in On/Off switch. It holds two rechargeable 18650 lithium batteries to provide strong, reliable electrical power for both the controller and the motors. Technical details: 2S series connection giving 7.4V nominal.",
    featuredIn: ["Line Follower Bot", "RoboSoccer Bot", "BalanceBot Pro"],
    image: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=600&q=80",
    specs: [
      { label: "Role", value: "Battery Power Pack" },
      { label: "Voltage Provided", value: "7.4V (up to 8.4V charged)" },
      { label: "Switch", value: "Built-in Slide Switch" },
      { label: "Batteries Used", value: "2x 18650 Rechargeable" }
    ]
  }
];
