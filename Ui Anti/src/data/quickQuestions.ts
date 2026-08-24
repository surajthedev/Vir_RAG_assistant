import { QuickQuestionItem, ExploreCardItem } from '../types/chat';

export const QUICK_QUESTIONS: QuickQuestionItem[] = [
  {
    id: 'qq-departments',
    title: 'Departments & Courses',
    query: 'What departments and courses are offered at the college?',
    icon: 'BookOpen',
    color: 'blue'
  },
  {
    id: 'qq-facilities',
    title: 'Campus Facilities',
    query: 'What campus facilities and amenities are available for students?',
    icon: 'Building2',
    color: 'yellow'
  },
  {
    id: 'qq-placements',
    title: 'Placements',
    query: 'How are the campus placements and what companies recruit here?',
    icon: 'Briefcase',
    color: 'blue'
  },
  {
    id: 'qq-admissions',
    title: 'Admissions',
    query: 'What is the admission procedure and eligibility criteria for engineering?',
    icon: 'GraduationCap',
    color: 'red'
  },
  {
    id: 'qq-events',
    title: 'College Events',
    query: 'What upcoming events, symposiums, and cultural fests are organized?',
    icon: 'Sparkles',
    color: 'yellow'
  },
  {
    id: 'qq-contact',
    title: 'Contact Information',
    query: 'How can I contact the college administration and department heads?',
    icon: 'PhoneCall',
    color: 'blue'
  },
  {
    id: 'qq-library',
    title: 'Library',
    query: 'Tell me about the central library resources and reading hours.',
    icon: 'BookMarked',
    color: 'blue'
  },
  {
    id: 'qq-transport',
    title: 'Transport',
    query: 'What are the college bus routes, timings, and transportation options?',
    icon: 'Bus',
    color: 'yellow'
  },
  {
    id: 'qq-map',
    title: 'Campus Map',
    query: 'Campus Map',
    icon: 'MapPin',
    color: 'red',
    isMapAction: true
  }
];

export const EXPLORE_CARDS: ExploreCardItem[] = [
  {
    id: 'explore-academics',
    title: 'Academics',
    subtitle: 'Courses, departments and curriculum',
    query: 'Tell me all about the academic curriculum, courses, and department specializations.',
    icon: 'GraduationCap',
    colorScheme: 'blue'
  },
  {
    id: 'explore-placements',
    title: 'Placements',
    subtitle: 'Companies, training and career opportunities',
    query: 'What are the training and placement highlights and recruiter details?',
    icon: 'Briefcase',
    colorScheme: 'yellow'
  },
  {
    id: 'explore-campus',
    title: 'Campus',
    subtitle: 'Facilities, labs and infrastructure',
    query: 'Describe the college campus infrastructure, laboratories, and physical facilities.',
    icon: 'Building2',
    colorScheme: 'blue'
  },
  {
    id: 'explore-activities',
    title: 'Activities',
    subtitle: 'Events, clubs and student activities',
    query: 'What extracurricular activities, clubs, and cultural fests can students join?',
    icon: 'Sparkles',
    colorScheme: 'red'
  },
  {
    id: 'explore-library',
    title: 'Library',
    subtitle: 'Library services and resources',
    query: 'What digital resources, journals, and study facilities are in the Central Library?',
    icon: 'BookOpen',
    colorScheme: 'blue'
  },
  {
    id: 'explore-transport',
    title: 'Transport',
    subtitle: 'Routes and transportation information',
    query: 'Provide details about campus bus routes, transit timings, and transport guidelines.',
    icon: 'Bus',
    colorScheme: 'yellow'
  }
];
