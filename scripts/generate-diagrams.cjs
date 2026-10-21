const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function createSvgWiringLineFollower() {
  return `
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" style="background:#FAF7F2; font-family:'Plus Jakarta Sans', system-ui, sans-serif;">
    <!-- Grid -->
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E8E2D9" stroke-width="1" opacity="0.6"/>
      </pattern>
    </defs>
    <rect width="1200" height="800" fill="url(#grid)" />

    <!-- Title Banner -->
    <rect x="40" y="30" width="1120" height="70" rx="16" fill="#1E252B" />
    <text x="70" y="72" fill="#FAF7F2" font-size="22" font-weight="800">RoboNest Schematic: Line Follower Bot</text>
    <text x="880" y="72" fill="#DF9E7E" font-size="14" font-weight="700">ATmega328P + L298N Dual H-Bridge Bus</text>

    <!-- Component 1: Arduino Uno (Center Left) -->
    <g transform="translate(100, 160)">
      <rect width="320" height="440" rx="20" fill="#065F46" stroke="#047857" stroke-width="4" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.08))" />
      <rect x="20" y="20" width="280" height="40" rx="8" fill="#047857" />
      <text x="160" y="46" fill="#FFFFFF" font-size="16" font-weight="800" text-anchor="middle">ARDUINO UNO R3</text>
      
      <!-- MCU Chip -->
      <rect x="110" y="140" width="100" height="180" rx="6" fill="#111827" />
      <text x="160" y="235" fill="#9CA3AF" font-size="12" font-weight="700" text-anchor="middle" transform="rotate(-90 160 235)">ATmega328P</text>
      
      <!-- USB & Barrel -->
      <rect x="10" y="350" width="60" height="70" rx="6" fill="#94A3B8" />
      <text x="40" y="390" fill="#1E293B" font-size="11" font-weight="800" text-anchor="middle">USB-B</text>

      <!-- Pin Labels Right Side -->
      <g transform="translate(230, 80)" font-size="12" font-weight="700" fill="#FAF7F2">
        <text x="70" y="20" text-anchor="end">D2 (IR_L)</text>
        <circle cx="80" cy="16" r="5" fill="#EAB308" />
        <text x="70" y="50" text-anchor="end">D4 (IR_R)</text>
        <circle cx="80" cy="46" r="5" fill="#22C55E" />
        <text x="70" y="80" text-anchor="end">D5 (PWM_L)</text>
        <circle cx="80" cy="76" r="5" fill="#CBD5E1" />
        <text x="70" y="110" text-anchor="end">D6 (PWM_R)</text>
        <circle cx="80" cy="106" r="5" fill="#64748B" />
        <text x="70" y="140" text-anchor="end">D7 (IN1)</text>
        <circle cx="80" cy="136" r="5" fill="#3B82F6" />
        <text x="70" y="170" text-anchor="end">D8 (IN2)</text>
        <circle cx="80" cy="166" r="5" fill="#A855F7" />
        <text x="70" y="200" text-anchor="end">D9 (IN3)</text>
        <circle cx="80" cy="196" r="5" fill="#F97316" />
        <text x="70" y="230" text-anchor="end">D10 (IN4)</text>
        <circle cx="80" cy="226" r="5" fill="#92400E" />
        <text x="70" y="270" text-anchor="end">GND (Common)</text>
        <circle cx="80" cy="266" r="5" fill="#181A1C" />
        <text x="70" y="300" text-anchor="end">5V (Sensor VCC)</text>
        <circle cx="80" cy="296" r="5" fill="#EF4444" />
      </g>
    </g>

    <!-- Component 2: L298N Motor Driver (Center Right) -->
    <g transform="translate(680, 160)">
      <rect width="320" height="340" rx="20" fill="#991B1B" stroke="#B91C1C" stroke-width="4" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.08))" />
      <rect x="20" y="20" width="280" height="40" rx="8" fill="#B91C1C" />
      <text x="160" y="46" fill="#FFFFFF" font-size="16" font-weight="800" text-anchor="middle">L298N DUAL H-BRIDGE</text>

      <!-- Heatsink -->
      <rect x="90" y="80" width="140" height="90" rx="8" fill="#1E293B" />
      <text x="160" y="130" fill="#94A3B8" font-size="12" font-weight="800" text-anchor="middle">ALUMINUM HEATSINK</text>

      <!-- Logic Inputs -->
      <g transform="translate(20, 200)" font-size="11" font-weight="700" fill="#FAF7F2">
        <circle cx="10" cy="10" r="5" fill="#CBD5E1" /><text x="25" y="14">ENA</text>
        <circle cx="10" cy="35" r="5" fill="#3B82F6" /><text x="25" y="39">IN1</text>
        <circle cx="10" cy="60" r="5" fill="#A855F7" /><text x="25" y="64">IN2</text>
        <circle cx="10" cy="85" r="5" fill="#F97316" /><text x="25" y="89">IN3</text>
        <circle cx="10" cy="110" r="5" fill="#92400E" /><text x="25" y="114">IN4</text>
        <circle cx="10" cy="135" r="5" fill="#64748B" /><text x="25" y="139">ENB</text>
      </g>

      <!-- Power Screw Terminals Bottom -->
      <g transform="translate(160, 260)" font-size="11" font-weight="800" fill="#FAF7F2">
        <rect x="0" y="0" width="140" height="60" rx="6" fill="#15803D" />
        <circle cx="25" cy="40" r="7" fill="#EF4444" /><text x="25" y="25" text-anchor="middle">+12V</text>
        <circle cx="70" cy="40" r="7" fill="#181A1C" /><text x="70" y="25" text-anchor="middle">GND</text>
        <circle cx="115" cy="40" r="7" fill="#FACC15" /><text x="115" y="25" text-anchor="middle">+5V</text>
      </g>
    </g>

    <!-- Component 3: Dual IR Sensor (Top Right) -->
    <g transform="translate(680, 540)">
      <rect width="320" height="150" rx="16" fill="#1E3A8A" stroke="#2563EB" stroke-width="3" />
      <text x="160" y="35" fill="#FFFFFF" font-size="14" font-weight="800" text-anchor="middle">TCRT5000 DUAL SENSOR ARRAY</text>
      
      <!-- IR Emitters -->
      <circle cx="60" cy="90" r="18" fill="#38BDF8" /><text x="60" y="130" fill="#93C5FD" font-size="10" font-weight="700" text-anchor="middle">LEFT IR</text>
      <circle cx="260" cy="90" r="18" fill="#38BDF8" /><text x="260" y="130" fill="#93C5FD" font-size="10" font-weight="700" text-anchor="middle">RIGHT IR</text>

      <g transform="translate(110, 60)" font-size="11" font-weight="700" fill="#FAF7F2">
        <text x="0" y="15">VCC (5V)</text><circle cx="80" cy="11" r="5" fill="#EF4444" />
        <text x="0" y="35">GND</text><circle cx="80" cy="31" r="5" fill="#181A1C" />
        <text x="0" y="55">D_OUT_L</text><circle cx="80" cy="51" r="5" fill="#EAB308" />
        <text x="0" y="75">D_OUT_R</text><circle cx="80" cy="71" r="5" fill="#22C55E" />
      </g>
    </g>

    <!-- Component 4: 7.4V Battery Pack (Bottom Center) -->
    <g transform="translate(100, 640)">
      <rect width="400" height="110" rx="16" fill="#1E252B" stroke="#C85A32" stroke-width="2" />
      <text x="200" y="35" fill="#FAF7F2" font-size="14" font-weight="800" text-anchor="middle">2x 18650 LI-ION PACK (7.4V NOMINAL)</text>
      <circle cx="80" cy="75" r="10" fill="#EF4444" /><text x="100" y="80" fill="#F87171" font-size="12" font-weight="800">+7.4V (Switch)</text>
      <circle cx="260" cy="75" r="10" fill="#64748B" /><text x="280" y="80" fill="#94A3B8" font-size="12" font-weight="800">GND (-)</text>
    </g>

    <!-- Signal Bus Wire Connectors -->
    <!-- L298N to Arduino IN1..IN4 -->
    <path d="M 420 300 Q 550 260 690 235" fill="none" stroke="#3B82F6" stroke-width="3" stroke-dasharray="6,2" />
    <path d="M 420 330 Q 550 280 690 260" fill="none" stroke="#A855F7" stroke-width="3" stroke-dasharray="6,2" />
    <path d="M 420 360 Q 550 300 690 285" fill="none" stroke="#F97316" stroke-width="3" stroke-dasharray="6,2" />
    <path d="M 420 390 Q 550 320 690 310" fill="none" stroke="#92400E" stroke-width="3" stroke-dasharray="6,2" />

    <!-- PWM Speeds -->
    <path d="M 420 240 Q 550 210 690 210" fill="none" stroke="#CBD5E1" stroke-width="3" />
    <path d="M 420 270 Q 550 350 690 335" fill="none" stroke="#64748B" stroke-width="3" />

    <!-- Sensors to Arduino -->
    <path d="M 420 180 Q 550 170 680 590" fill="none" stroke="#EAB308" stroke-width="3" />
    <path d="M 420 210 Q 550 200 680 610" fill="none" stroke="#22C55E" stroke-width="3" />

    <!-- Common Ground Bus (Thick Black) -->
    <path d="M 420 430 Q 580 430 750 300" fill="none" stroke="#181A1C" stroke-width="5" />
    <path d="M 750 300 L 750 670" fill="none" stroke="#181A1C" stroke-width="5" />
    <path d="M 750 300 Q 600 600 260 715" fill="none" stroke="#181A1C" stroke-width="5" />

    <!-- Power Feed (Red) -->
    <path d="M 80 715 Q 80 500 705 300" fill="none" stroke="#EF4444" stroke-width="5" />
    <rect x="520" y="470" width="140" height="30" rx="8" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5" />
    <text x="590" y="490" fill="#92400E" font-size="11" font-weight="800" text-anchor="middle">COMMON GROUND BUS</text>
  </svg>`;
}

function createSvgPinoutLineFollower() {
  return `
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" style="background:#FAF7F2; font-family:'Plus Jakarta Sans', system-ui, sans-serif;">
    <defs>
      <pattern id="gridPin" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E8E2D9" stroke-width="1" opacity="0.6"/>
      </pattern>
    </defs>
    <rect width="1200" height="800" fill="url(#gridPin)" />

    <!-- Header -->
    <rect x="40" y="30" width="1120" height="70" rx="16" fill="#1E252B" />
    <text x="70" y="72" fill="#FAF7F2" font-size="22" font-weight="800">RoboNest Pinout Diagram: Line Follower Bot</text>
    <text x="860" y="72" fill="#DF9E7E" font-size="14" font-weight="700">Digital / PWM / Power Mapping Matrix</text>

    <!-- Table Container -->
    <rect x="40" y="130" width="1120" height="630" rx="20" fill="#FFFFFF" stroke="#E8E2D9" stroke-width="2" filter="drop-shadow(0 10px 24px rgba(0,0,0,0.05))" />

    <!-- Table Header Row -->
    <rect x="40" y="130" width="1120" height="50" rx="20" fill="#FAF7F2" />
    <g font-size="13" font-weight="800" fill="#1E252B">
      <text x="80" y="162">DEVICE PIN</text>
      <text x="320" y="162">TARGET ARDUINO PIN</text>
      <text x="560" y="162">WIRE COLOR</text>
      <text x="740" y="162">SIGNAL TYPE</text>
      <text x="920" y="162">FUNCTION &amp; LOGIC</text>
    </g>
    <line x1="40" y1="180" x2="1160" y2="180" stroke="#E8E2D9" stroke-width="2" />

    <!-- Table Data Rows -->
    ${[
      ["TCRT5000 Left OUT", "Digital Pin 2", "#EAB308", "Yellow", "Digital", "Interrupt-driven left reflectance detection"],
      ["TCRT5000 Right OUT", "Digital Pin 4", "#22C55E", "Green", "Digital", "Right optical surface reflection feedback"],
      ["TCRT5000 VCC (+)", "5V Power Rail", "#EF4444", "Red", "Power", "Regulated 5.0V sensor illumination current"],
      ["TCRT5000 GND (-)", "Arduino GND", "#181A1C", "Black", "Ground", "Direct common ground reference line"],
      ["L298N IN1", "Digital Pin 7", "#3B82F6", "Blue", "Digital", "Left motor forward gate trigger"],
      ["L298N IN2", "Digital Pin 8", "#A855F7", "Purple", "Digital", "Left motor reverse gate trigger"],
      ["L298N IN3", "Digital Pin 9", "#F97316", "Orange", "Digital", "Right motor forward gate trigger"],
      ["L298N IN4", "Digital Pin 10", "#92400E", "Brown", "Digital", "Right motor reverse gate trigger"],
      ["L298N ENA (Speed)", "Digital Pin 5 (PWM)", "#CBD5E1", "White", "PWM", "Left motor analog speed duty (0-255)"],
      ["L298N ENB (Speed)", "Digital Pin 6 (PWM)", "#64748B", "Gray", "PWM", "Right motor analog speed duty (0-255)"],
      ["L298N +12V Feed", "Battery Switched (+)", "#EF4444", "Red", "Power", "7.4V - 8.4V Li-ion pack primary rail"],
      ["L298N GND", "Arduino GND + Bat (-)", "#181A1C", "Black", "Ground", "Unified system-wide ground bus anchor"]
    ].map((r, i) => {
      const y = 220 + i * 44;
      const isAlt = i % 2 === 1;
      return `
        <rect x="40" y="${y - 28}" width="1120" height="44" fill="${isAlt ? '#F7F3EC' : '#FFFFFF'}" />
        <text x="80" y="${y}" font-size="13" font-weight="700" fill="#0F172A">${r[0]}</text>
        <text x="320" y="${y}" font-size="14" font-weight="800" font-family="monospace" fill="#C85A32">${r[1]}</text>
        <g transform="translate(560, ${y - 12})">
          <circle cx="8" cy="8" r="7" fill="${r[2]}" stroke="#CBD5E1" stroke-width="1.5" />
          <text x="24" y="12" font-size="12" font-weight="700" fill="#334155">${r[3]}</text>
        </g>
        <g transform="translate(740, ${y - 14})">
          <rect width="65" height="22" rx="11" fill="${r[4] === 'PWM' ? '#F3E8FF' : r[4] === 'Power' ? '#FFE4E6' : r[4] === 'Ground' ? '#E2E8F0' : '#E0F2FE'}" />
          <text x="32" y="15" font-size="11" font-weight="800" text-anchor="middle" fill="${r[4] === 'PWM' ? '#7E22CE' : r[4] === 'Power' ? '#BE123C' : r[4] === 'Ground' ? '#0F172A' : '#0369A1'}">${r[4]}</text>
        </g>
        <text x="920" y="${y}" font-size="12" font-weight="500" fill="#64748B">${r[5]}</text>
      `;
    }).join('')}
  </svg>`;
}

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function createGenericWiring(title, subtitle, components) {
  return `
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" style="background:#FAF7F2; font-family:'Plus Jakarta Sans', system-ui, sans-serif;">
    <defs>
      <pattern id="ggrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E8E2D9" stroke-width="1" opacity="0.6"/>
      </pattern>
    </defs>
    <rect width="1200" height="800" fill="url(#ggrid)" />

    <!-- Title Banner -->
    <rect x="40" y="30" width="1120" height="70" rx="16" fill="#1E252B" />
    <text x="70" y="72" fill="#FAF7F2" font-size="22" font-weight="800">RoboNest Schematic: ${escapeXml(title)}</text>
    <text x="860" y="72" fill="#DF9E7E" font-size="14" font-weight="700">${escapeXml(subtitle)}</text>

    <!-- Visual Blocks -->
    ${components.map((c, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 80 + col * 540;
      const y = 140 + row * 290;
      return `
      <g transform="translate(${x}, ${y})">
        <rect width="500" height="250" rx="20" fill="#FFFFFF" stroke="#E8E2D9" stroke-width="2" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.06))" />
        <rect x="20" y="20" width="460" height="40" rx="10" fill="${c.color}" />
        <text x="40" y="46" fill="#FFFFFF" font-size="15" font-weight="800">${escapeXml(c.name)}</text>
        <text x="40" y="95" fill="#1E252B" font-size="13" font-weight="700">Subsystem Role:</text>
        <text x="40" y="120" fill="#64748B" font-size="12" font-weight="500">${escapeXml(c.role)}</text>
        <text x="40" y="155" fill="#1E252B" font-size="13" font-weight="700">Interface Pins &amp; Power:</text>
        <text x="40" y="180" fill="#C85A32" font-size="13" font-weight="800" font-family="monospace">${escapeXml(c.pins)}</text>
        <text x="40" y="215" fill="#047857" font-size="12" font-weight="700">Protocol: ${escapeXml(c.protocol)}</text>
      </g>
      `;
    }).join('')}
  </svg>`;
}

async function run() {
  console.log('Generating Wiring & Pinout Diagrams...');

  // 1. Line Follower
  const lfWiringSvg = Buffer.from(createSvgWiringLineFollower());
  const lfPinoutSvg = Buffer.from(createSvgPinoutLineFollower());

  await sharp(lfWiringSvg).png().toFile('public/robotics/wiring/line-follower/wiring.png');
  await sharp(lfPinoutSvg).png().toFile('public/robotics/pinout/line-follower/pinout.png');
  console.log('Wrote Line Follower wiring & pinout PNGs');

  // 2. Drone Explorer
  const droneWiring = Buffer.from(createGenericWiring(
    'Drone Explorer Quad',
    'ESP32-S3 Flight Controller + 4x ESC Bus',
    [
      { name: 'ESP32-S3 Core & IMU (MPU-6050)', color: '#047857', role: 'Flight PID calculation, attitude angle integration & radio', pins: 'I2C (SDA/SCL), UART1, PWM Dshot', protocol: 'I2C + DShot300' },
      { name: '4x 20A Brushless ESCs & BLDC Motors', color: '#1E3A8A', role: 'Motor commutation & speed throttling', pins: 'Signals: GPIO 4, 5, 6, 7 / Power: 11.1V 3S', protocol: 'DShot300 High-Speed Digital' },
      { name: 'Altitude & Optical Flow Sensor (BMP280)', color: '#B91C1C', role: 'Barometric elevation hold & downward surface drift tracking', pins: 'VCC 3.3V, GND, SDA, SCL', protocol: 'I2C (Address 0x76)' },
      { name: '11.1V 3S 1300mAh LiPo Battery Pack', color: '#D97706', role: 'High-discharge 45C main flight battery with XT60 plug', pins: 'XT60 Main Leads + 3S JST Balance Plug', protocol: 'Direct DC Power Bus' }
    ]
  ));
  await sharp(droneWiring).png().toFile('public/robotics/wiring/drone/wiring.png');
  await sharp(droneWiring).png().toFile('public/robotics/wiring/drone-explorer/wiring.png');
  await sharp(droneWiring).png().toFile('public/robotics/pinout/drone/pinout.png');
  await sharp(droneWiring).png().toFile('public/robotics/pinout/drone-explorer/pinout.png');

  // 3. RoboSoccer
  const soccerWiring = Buffer.from(createGenericWiring(
    'RoboSoccer Bot',
    'ESP32 Gamepad Controlled Omni-Drive Platform',
    [
      { name: 'ESP32 WROOM-32 Main Logic', color: '#047857', role: 'Bluetooth gamepad decoding & tri-omni inverse kinematics', pins: 'PWM: D12, D13, D14, D15, D18, D19', protocol: 'Bluetooth SPP / BLE' },
      { name: 'TB6612FNG High-Frequency Motor Driver', color: '#B91C1C', role: 'Drives 3x 120-degree omnidirectional wheel gearmotors', pins: 'PWMA, PWMB, IN1..IN4, STBY High', protocol: 'PWM Speed / Direction' },
      { name: 'High-Torque Solenoid Kicker Stage', color: '#C85A32', role: 'Pneumatic-style electromagnetic ball striker', pins: 'TIP120 Darlington Gate -> GPIO 23', protocol: 'Digital Pulse (50ms duration)' },
      { name: 'TCS34725 I2C Ball Color Sensor', color: '#1E3A8A', role: 'Detects presence and RGB signature of the soccer ball', pins: 'SDA, SCL, INT, LED Control Pin', protocol: 'I2C (Address 0x29)' }
    ]
  ));
  await sharp(soccerWiring).png().toFile('public/robotics/wiring/robosoccer/wiring.png');
  await sharp(soccerWiring).png().toFile('public/robotics/pinout/robosoccer/pinout.png');

  // 4. RoboMaze
  const mazeWiring = Buffer.from(createGenericWiring(
    'RoboMaze Ultrasonic Solver',
    'Arduino Nano + Triple HC-SR04 Sonar Array',
    [
      { name: 'Arduino Nano V3 (ATmega328P)', color: '#047857', role: 'Executes wall-following & flood-fill labyrinth algorithms', pins: 'Trig/Echo pins: D2..D7, Motor PWM: D9, D10', protocol: 'Embedded C++ Control Loop' },
      { name: '3x HC-SR04 Ultrasonic Sonar Modules', color: '#1E3A8A', role: 'Calculates distance to left, front, and right maze walls', pins: 'Trig: D2, D4, D6 / Echo: D3, D5, D7', protocol: 'Microsecond Echo Time-of-Flight' },
      { name: 'L298N Compact Motor Driver', color: '#B91C1C', role: 'Independent differential drive for precise 90-degree pivots', pins: 'IN1, IN2, IN3, IN4, ENA, ENB', protocol: 'Dual H-Bridge Speed & Reverse' },
      { name: '7.4V Li-ion Battery & 5V Buck Regulator', color: '#D97706', role: 'Provides clean 5V logic power and 7.4V motor surge rail', pins: 'VIN to Nano, +12V to L298N', protocol: 'Isolated Power Architecture' }
    ]
  ));
  await sharp(mazeWiring).png().toFile('public/robotics/wiring/robomaze/wiring.png');
  await sharp(mazeWiring).png().toFile('public/robotics/wiring/maze-solver/wiring.png');
  await sharp(mazeWiring).png().toFile('public/robotics/pinout/robomaze/pinout.png');
  await sharp(mazeWiring).png().toFile('public/robotics/pinout/maze-solver/pinout.png');

  console.log('All Wiring and Pinout diagrams generated successfully!');
}

run().catch((err) => {
  console.error('Failed to generate diagrams:', err);
  process.exit(1);
});
