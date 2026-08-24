import { CampusLocation, NavigationRoute } from '../types/chat';

export const CAMPUS_ORIGINS: CampusLocation[] = [
  {
    id: 'main-gate',
    name: 'Main Gate',
    category: 'gate',
    description: 'Primary campus entrance on Highway Road with security kiosk and visitor registration.',
    coordinates: { x: 120, y: 580 },
    landmarks: ['Security Checkpost', 'College Signboard', 'Visitor Parking']
  },
  {
    id: 'admin-block',
    name: 'Administrative Block',
    category: 'administrative',
    description: 'Central administration building housing the Principal Office, Accounts & Admission Wing.',
    coordinates: { x: 340, y: 460 },
    floor: 'Ground & 1st Floor',
    landmarks: ['Fountain Plaza', 'Main Porch', 'Conference Hall']
  },
  {
    id: 'academic-block',
    name: 'Academic Block',
    category: 'department',
    description: 'Multi-storey lecture hall complex and specialized engineering departmental laboratories.',
    coordinates: { x: 620, y: 380 },
    floor: 'Floors 1 to 4',
    landmarks: ['Central Courtyard', 'Smart Lecture Theatres']
  },
  {
    id: 'library',
    name: 'Library',
    category: 'facility',
    description: 'Central Digital Library & Research Center with quiet study zones, e-journal terminals, and book stacks.',
    coordinates: { x: 480, y: 260 },
    floor: 'Building B - 2nd Floor',
    landmarks: ['Green Lawn', 'Digital Media Wing']
  },
  {
    id: 'canteen',
    name: 'Canteen',
    category: 'facility',
    description: 'Multi-cuisine campus cafeteria, snack counter, juice stall, and open-air seating pergola.',
    coordinates: { x: 780, y: 480 },
    landmarks: ['Cafeteria Lawn', 'Juice Bar']
  },
  {
    id: 'parking',
    name: 'Parking',
    category: 'facility',
    description: 'Designated 2-wheeler and 4-wheeler parking stands with EV charging stalls.',
    coordinates: { x: 180, y: 430 },
    landmarks: ['East Gate Shelter', 'EV Station']
  },
  {
    id: 'hostel',
    name: 'Hostel',
    category: 'residence',
    description: 'Student residential quarters with dining hall, recreational room, and 24/7 security.',
    coordinates: { x: 840, y: 220 },
    landmarks: ['Hostel Quadrangle', 'Badminton Court']
  },
  {
    id: 'bus-stop',
    name: 'Bus Stop',
    category: 'transport',
    description: 'College bus terminal with dedicated bays covering city and suburban transit routes.',
    coordinates: { x: 220, y: 640 },
    landmarks: ['Bus Shelter', 'Transit Information Board']
  }
];

export const CAMPUS_DESTINATIONS: CampusLocation[] = [
  {
    id: 'it-dept',
    name: 'IT Department',
    category: 'department',
    description: 'Information Technology Department, Software Labs, Cloud Computing Center & Faculty Rooms.',
    coordinates: { x: 680, y: 320 },
    floor: 'Academic Block - 3rd Floor (East Wing)',
    contactPerson: 'Dr. Head of Department - IT',
    landmarks: ['IoT Innovation Hub', 'AI Research Lab']
  },
  {
    id: 'cse-dept',
    name: 'CSE Department',
    category: 'department',
    description: 'Computer Science & Engineering Department, Coding Labs, Data Science Lab, and Seminar Hall.',
    coordinates: { x: 640, y: 290 },
    floor: 'Academic Block - 2nd Floor (West Wing)',
    contactPerson: 'Dr. Head of Department - CSE',
    landmarks: ['Cyber Security Cell', 'Project Lab']
  },
  {
    id: 'principal-office',
    name: 'Principal Office',
    category: 'administrative',
    description: 'Executive office of the Principal, Dean of Academics, and Governing Board chamber.',
    coordinates: { x: 330, y: 430 },
    floor: 'Administrative Block - 1st Floor',
    contactPerson: 'Office of the Principal',
    landmarks: ['Board Room', 'Visitors Lounge']
  },
  {
    id: 'placement-cell',
    name: 'Placement Cell',
    category: 'facility',
    description: 'Training and Placement Center, Interview Cabins, GD Rooms, and Corporate Liaison Desk.',
    coordinates: { x: 420, y: 440 },
    floor: 'Administrative Block - 2nd Floor',
    contactPerson: 'Placement Officer',
    landmarks: ['Training Hall', 'Mock Interview Suite']
  },
  {
    id: 'library-dest',
    name: 'Library',
    category: 'facility',
    description: 'Central Digital Library with 45,000+ volumes, IEEE digital access, and research cubicles.',
    coordinates: { x: 480, y: 260 },
    floor: 'Central Library Block - Ground & 1st Floor',
    contactPerson: 'Chief Librarian',
    landmarks: ['Reference Section', 'E-Library Hub']
  },
  {
    id: 'admin-office',
    name: 'Administrative Office',
    category: 'administrative',
    description: 'Student affairs, fee counter, certificates, exam cell, and registrar desks.',
    coordinates: { x: 360, y: 480 },
    floor: 'Administrative Block - Ground Floor',
    contactPerson: 'Administrative Officer',
    landmarks: ['Inquiry Desk', 'Cash Counter']
  },
  {
    id: 'canteen-dest',
    name: 'Canteen',
    category: 'facility',
    description: 'Central Food Court with hygienic dining seating 500+ students and staff.',
    coordinates: { x: 780, y: 480 },
    floor: 'Ground Floor Pavilion',
    landmarks: ['Open Terrace Seating', 'Beverage Counter']
  },
  {
    id: 'laboratory',
    name: 'Laboratory',
    category: 'department',
    description: 'Central Engineering Workshop, Physics & Chemistry Labs, CAD/CAM Design Studio.',
    coordinates: { x: 550, y: 480 },
    floor: 'Mechanical & Science Complex',
    landmarks: ['Robotics Workshop', 'Material Testing Lab']
  },
  {
    id: 'faculty-office',
    name: 'Faculty Office',
    category: 'administrative',
    description: 'Staff cubicles, departmental staff rooms, student counseling chambers, and mentor desks.',
    coordinates: { x: 590, y: 350 },
    floor: 'Academic Block - 1st Floor',
    landmarks: ['Staff Common Room', 'Counselor Room']
  }
];

export const ALL_CAMPUS_LOCATIONS = [...CAMPUS_ORIGINS, ...CAMPUS_DESTINATIONS];

// SVG Path generator and routing calculator between any two points
export function calculateRoute(fromLocation: CampusLocation, toLocation: CampusLocation): NavigationRoute {
  const fx = fromLocation.coordinates.x;
  const fy = fromLocation.coordinates.y;
  const tx = toLocation.coordinates.x;
  const ty = toLocation.coordinates.y;

  // Calculate Euclidean distance mapped to real-world meters (scale ~ 0.5m per SVG unit)
  const rawDist = Math.hypot(tx - fx, ty - fy);
  const distanceMeters = Math.max(60, Math.round(rawDist * 0.65));
  
  // Calculate walking time at ~80m/min
  const walkingTimeMinutes = Math.max(1, Math.ceil(distanceMeters / 80));

  // Determine realistic pathway waypoints through campus walkway spine (x: 420-520, y: 460-380)
  const midX1 = fx + (tx - fx) * 0.35;
  const midY1 = fy + (ty - fy) * 0.25;
  const midX2 = fx + (tx - fx) * 0.75;
  const midY2 = fy + (ty - fy) * 0.85;

  const svgPath = `M ${fx} ${fy} C ${midX1} ${fy}, ${midX1} ${midY1}, ${(fx+tx)/2} ${(fy+ty)/2} S ${midX2} ${midY2}, ${tx} ${ty}`;

  const steps: string[] = [
    `Start from ${fromLocation.name} (${fromLocation.landmarks?.[0] || 'designated area'}).`,
    `Walk along the paved central pedestrian pathway towards the ${toLocation.category === 'department' ? 'Academic Complex' : 'Central Quadrangle'}.`,
    fromLocation.name === 'Main Gate' 
      ? 'Pass the Administrative Block and the main fountain on your right.' 
      : 'Follow the campus signage towards ' + toLocation.name + '.',
    toLocation.floor ? `Head to ${toLocation.floor}.` : 'Proceed straight to the main reception entrance.',
    `Arrive at ${toLocation.name}. Target destination reached!`
  ];

  return {
    from: fromLocation,
    to: toLocation,
    distanceMeters,
    walkingTimeMinutes,
    steps,
    svgPath
  };
}
