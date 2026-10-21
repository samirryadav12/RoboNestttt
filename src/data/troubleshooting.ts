export interface DiagnosticGuide {
  id: string;
  title: string;
  category: "Power & Battery" | "Sensors & Lights" | "Motors & Steering" | "Computer & Code";
  severity: "High" | "Medium" | "Low";
  symptom: string;
  probableCause: string;
  stepByStepFix: string[];
  multimeterCheck: string;
}

export const DIAGNOSTIC_GUIDES: DiagnosticGuide[] = [
  {
    id: "brownout-reset",
    title: "Robot Turns Off When Motors Start Moving",
    category: "Power & Battery",
    severity: "High",
    symptom: "The Arduino lights turn off, restart, or disconnect from your computer whenever the motors try to spin.",
    probableCause: "The motors need more power than weak batteries can give, which drops the voltage and restarts the Arduino computer.",
    stepByStepFix: [
      "Connect the red battery wire directly to the motor driver +12V screw terminal, NOT to the Arduino 5V pin.",
      "Make sure you connect a black wire between the motor driver GND and the Arduino GND so both boards share the same ground.",
      "Charge your two 18650 batteries fully before testing.",
      "If you are using normal AA household batteries, switch to rechargeable 18650 batteries because AA batteries cannot provide enough power."
    ],
    multimeterCheck: "If you have a meter, check the battery wires while the motors spin. If it drops below 6.5V, recharge your batteries."
  },
  {
    id: "ir-sunlight-noise",
    title: "Sensors Are Confused by Bright Room Lights",
    category: "Sensors & Lights",
    severity: "Medium",
    symptom: "The robot loses the line or drives erratically when near a sunny window or under bright room lamps.",
    probableCause: "Sunlight contains natural infrared light that can blind the light sensors, making white paper look like black tape.",
    stepByStepFix: [
      "Use a small flat screwdriver to turn the tiny blue dial on the sensor board.",
      "Turn the dial until the small indicator light turns ON over white paper and turns OFF over black tape.",
      "Keep the sensor eyes close to the floor, about 6mm to 8mm above the ground.",
      "Test your robot away from direct sunlight or bright lamps."
    ],
    multimeterCheck: "The sensor signal wire should give about 5V over black tape and close to 0V over white paper."
  },
  {
    id: "reverse-motor-spin",
    title: "Robot Spins in Rapid Circles on the Spot",
    category: "Motors & Steering",
    severity: "Medium",
    symptom: "When turned on, one wheel drives forward while the other drives backward, making the robot spin in a circle.",
    probableCause: "The wires on one motor are connected backward to the motor board.",
    stepByStepFix: [
      "Turn the battery power switch OFF.",
      "Find the two wires for the backward-spinning motor on the green motor driver terminal block.",
      "Loosen the terminal screws, swap the two wires with each other, and tighten the screws back down.",
      "Turn the power back ON. Both wheels should now drive in the same forward direction."
    ],
    multimeterCheck: "Both motors should turn forward when the program tells them to go straight."
  },
  {
    id: "baud-rate-clash",
    title: "Code Won't Upload or Shows Random Characters",
    category: "Computer & Code",
    severity: "Low",
    symptom: "The Arduino app says 'programmer not responding' or the Serial Monitor shows strange symbols.",
    probableCause: "Wires are plugged into pins D0 or D1, or the speed setting in the serial window does not match the code.",
    stepByStepFix: [
      "Unplug any wires connected to pins D0 and D1 while uploading code. These two pins are used by the USB cable.",
      "In the Arduino app, set the speed dropdown in the bottom right corner of the Serial Monitor to '9600 baud'.",
      "Unplug the USB cable from your computer, wait 3 seconds, and plug it back in to reset the connection."
    ],
    multimeterCheck: "Make sure the green 'ON' light on the Arduino stays lit when plugged into USB."
  }
];
