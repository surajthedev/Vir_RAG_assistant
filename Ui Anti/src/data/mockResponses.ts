export interface MockResponseTemplate {
  keywords: string[];
  reply: string;
  categoryTag?: string;
  suggestedFollowups?: string[];
  isNavigationIntent?: boolean;
}

export const MOCK_RESPONSES: MockResponseTemplate[] = [
  // Campus Navigation / Map Intent
  {
    keywords: ['map', 'direction', 'where is', 'how to reach', 'navigate', 'locate', 'location', 'campus map', 'find'],
    reply: `Sure! I can help you navigate the campus. 📍\n\nWhere are you now?`,
    isNavigationIntent: true,
    categoryTag: 'Campus Navigation'
  },

  // Departments & Courses
  {
    keywords: ['department', 'course', 'program', 'cse', 'it', 'ece', 'mech', 'civil', 'branch', 'degree', 'b.e', 'b.tech'],
    reply: `Here are the premier academic programs and departments offered at **P.T. Lee CNCET**:

🎓 **Undergraduate Degree Programs (B.E. / B.Tech):**
• **Computer Science & Engineering (CSE)** — AI/ML, Data Science, and Full-Stack Systems
• **Information Technology (IT)** — Cloud Computing, IoT, Cybersecurity, & DevOps
• **Electronics & Communication Engineering (ECE)** — Embedded Systems, VLSI Design, & Signal Processing
• **Mechanical Engineering (MECH)** — Robotics, Automation, CAD/CAM, & Thermal Systems
• **Civil Engineering (CIVIL)** — Structural Engineering, GIS, & Sustainable Construction

📚 **Postgraduate & Research Programs:**
• Master of Engineering (M.E.) in Computer Science & Applied Electronics
• Dedicated Ph.D. Research Centers affiliated with Anna University

All programs follow modern outcome-based education (OBE) curriculum aligned with National Board of Accreditation (NBA) benchmarks.`,
    categoryTag: 'Academics',
    suggestedFollowups: [
      'Where is the IT department?',
      'What are the admission requirements?',
      'How does placement work for CSE & IT?'
    ]
  },

  // Placements & Career
  {
    keywords: ['placement', 'job', 'recruit', 'salary', 'package', 'company', 'career', 'internship', 'training', 'tcs', 'infosys', 'zoho'],
    reply: `Here is an overview of **Campus Placement & Career Development**:

💼 **Placement Highlights:**
• **Placement Rate**: Over 88% of eligible students placed across top Tier-1 IT & Core sectors.
• **Training Modules**: Comprehensive training starting from 5th semester covering Data Structures & Algorithms, Aptitude, Soft Skills, Mock Interviews, and Resume Building.
• **Corporate Recruiters**: Regular visits from industry leaders including **TCS, Infosys, Cognizant, Wipro, Zoho, HCL Technologies, Hexaware, L&T Infotech**, and core manufacturing units.
• **Internship Program**: Mandatory 6-8 week summer internships with stipend support at partnered tech organizations.

📍 *Placement Cell Location*: 2nd Floor, Administrative Block.`,
    categoryTag: 'Career & Placements',
    suggestedFollowups: [
      'Where is the placement cell?',
      'What companies recruit students?',
      'Tell me about internship opportunities.'
    ]
  },

  // Admissions
  {
    keywords: ['admission', 'apply', 'eligibility', 'cutoff', 'fees', 'scholarship', 'counselling', 'tnea', 'quota'],
    reply: `Here is the comprehensive **Admissions & Eligibility Guide**:

🎓 **B.E. / B.Tech Admission Modes:**
1. **Government Quota (TNEA)**: Through Tamil Nadu Engineering Admissions counseling based on Higher Secondary (10+2) PCM marks (Maths, Physics, Chemistry).
2. **Management Quota**: Direct merit-based admission through college administration office with valid 10+2 marksheet.

📋 **Eligibility Requirements:**
• Minimum 45% aggregate in Physics, Chemistry, and Mathematics (40% for reserved categories).

💰 **Scholarships & Fee Support:**
• First Graduate Tuition Fee Concession
• Merit Scholarships for state rankers and top scorers
• SC/ST/OBC Government Post-Matric Scholarships

📍 *Admission Helpdesk*: Administrative Block (Ground Floor) or call through our Contact Section.`,
    categoryTag: 'Admissions',
    suggestedFollowups: [
      'What courses are offered?',
      'Contact Information',
      'Where is the Administrative Office?'
    ]
  },

  // Campus Facilities & Infrastructure
  {
    keywords: ['facility', 'infrastructure', 'lab', 'hostel', 'wifi', 'sports', 'gym', 'amenities', 'campus'],
    reply: `Here are the world-class **Campus Facilities & Infrastructure**:

🏫 **Campus Highlights:**
• **Digital Classrooms**: Smart projectors, lecture capture systems, and high-speed Wi-Fi across the entire academic perimeter.
• **Specialized Labs**: High-performance AI/Data computing lab, Apple Mac lab, CAD/CAM CNC workshop, and IoT research center.
• **Sports Complex**: Standard cricket ground, basketball court with floodlights, volleyball, badminton, and indoor gymnasium.
• **Student Residential Hostel**: Safe, separate hostels for boys and girls with 24/7 security, purified RO water, Wi-Fi, and nutritious mess meals.
• **Hygienic Canteen**: Multi-cuisine dining pavilion serving nutritious meals, fresh fruit juice, and snacks.`,
    categoryTag: 'Campus Facilities',
    suggestedFollowups: [
      'Where is the central library?',
      'Where is the canteen?',
      'Campus Map'
    ]
  },

  // Central Library
  {
    keywords: ['library', 'book', 'journal', 'reading', 'borrow', 'ieee', 'digital library'],
    reply: `Here are the details for the **Central Digital Library**:

📖 **Library Resources & Infrastructure:**
• **Volume Collection**: Over 45,000+ print volumes, 12,000+ reference titles, and standard national/international journals.
• **E-Resources**: Full digital access to IEEE Xplore, ScienceDirect, Springer, DELNET, and NPTEL video lecture repositories.
• **Digital Media Lab**: 50+ high-speed internet workstations for online research and paper publications.
• **Reading Capacity**: Air-conditioned study halls seating 300+ students comfortably.

⏰ **Operating Hours:**
• Monday – Saturday: **8:00 AM – 7:00 PM**
• Examination Periods: Extended until **8:30 PM**

📍 *Location*: Building B (Ground & 1st Floor).`,
    categoryTag: 'Library',
    suggestedFollowups: [
      'Where is the library located?',
      'How to borrow books?',
      'Campus Map'
    ]
  },

  // Events & Activities
  {
    keywords: ['event', 'symposium', 'cultural', 'fest', 'aura', 'technofeast', 'hackathon', 'club', 'sports day'],
    reply: `Here are the vibrant **Campus Events & Student Activities**:

🎉 **Annual Mega Events:**
• **TechnoFeast**: National Level Technical Symposium with paper presentations, coding sprints, robot wars, and hackathons.
• **AURA**: Inter-Collegiate Annual Cultural Extravaganza featuring music, dance, theatre, and celebrity performances.
• **Annual Sports Meet**: Inter-departmental athletics, track & field events, and championship trophies.

✨ **Student Activity Clubs:**
• **IEEE Student Branch** & ACM Chapter
• **Robotics & IoT Innovation Club**
• **Coding & Open Source Guild**
• **Rotaract, NSS & Youth Red Cross (YRC)**
• **Fine Arts, Photography & Literary Society**`,
    categoryTag: 'Campus Events',
    suggestedFollowups: [
      'What student clubs are available?',
      'When is the next symposium?',
      'Campus Facilities'
    ]
  },

  // Transport & Bus Routes
  {
    keywords: ['transport', 'bus', 'route', 'travel', 'bus stop', 'commute', 'pickup'],
    reply: `Here is the comprehensive **Campus Transportation & Bus Network**:

🚌 **Transport Fleet:**
• A fleet of 25+ modern college buses operating across Chennai, Kanchipuram, Chengalpattu, Arakkonam, Thiruvallur, and surrounding suburban corridors.
• All buses are GPS-tracked with real-time transit alerts for student safety.
• Safe boarding points with disciplined scheduled departures at 4:30 PM & 5:30 PM.

📍 *Campus Boarding Point*: College Bus Bay near the Main Gate.`,
    categoryTag: 'Transportation',
    suggestedFollowups: [
      'Where is the bus stop on campus?',
      'Contact transport department',
      'Campus Map'
    ]
  },

  // Contact Information
  {
    keywords: ['contact', 'phone', 'email', 'address', 'reach', 'enquiry', 'office', 'helpdesk', 'principal'],
    reply: `Here is the **Official Contact & Helpdesk Information**:

🏛 **P.T. Lee Chengalvaraya Naicker College of Engineering and Technology**
📍 *Address*: Oovery, Veliyur Post, Kanchipuram – 631 502, Tamil Nadu, India.

📞 **Key Helpdesks:**
• **General Admission Enquiry**: Available via College Administrative Office (Mon-Sat: 9 AM - 5 PM)
• **Principal Office**: Administrative Block - 1st Floor
• **Placement & Corporate Relations**: Placement Office - 2nd Floor Admin Block
• **Examinations & Student Verification**: Exam Cell Wing

You can also use this **College AI Assistant** 24/7 for instant campus guidance and navigation!`,
    categoryTag: 'Contact',
    suggestedFollowups: [
      'Where is the Administrative Office?',
      'What courses are offered?',
      'Campus Map'
    ]
  },

  // College Vision & About
  {
    keywords: ['vision', 'mission', 'about', 'chengalvaraya', 'trust', 'naicker', 'history'],
    reply: `🏛 **About P.T. Lee Chengalvaraya Naicker College of Engineering and Technology (PTLCNCET):**

Established under the esteemed **P.T. Lee Chengalvaraya Naicker Trust**, our institution is committed to imparting cutting-edge technical education to students from all socio-economic backgrounds.

🌟 **Vision:**
To emerge as a premier center of technical excellence, research, and holistic development producing ethically grounded engineering professionals.

🎯 **Mission:**
1. Provide state-of-the-art laboratory infrastructure and industry-tailored curricula.
2. Nurture creative innovation, scientific inquiry, and entrepreneurial leadership.
3. Inculcate societal responsibility, professional ethics, and lifelong learning.`,
    categoryTag: 'About College',
    suggestedFollowups: [
      'What departments are available?',
      'What are the placement statistics?',
      'Campus Map'
    ]
  }
];

export const DEFAULT_FALLBACK_RESPONSE = `I'm here to help you with anything regarding **P.T. Lee CNCET**! 🎓

You can ask me about:
• **Academic Programs & Departments** (CSE, IT, ECE, Mechanical, Civil)
• **Campus Navigation & Interactive Map** (Directions to any block/lab)
• **Training & Placements** (Companies, stats, interview preparation)
• **Admissions & Eligibility** (TNEA counseling, quota, scholarships)
• **Campus Life & Facilities** (Central Library, Canteen, Hostels, Sports)
• **Upcoming Events & Technical Symposiums**

Feel free to type your question or tap any of the quick suggestions below!`;
