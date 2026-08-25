export type MessageSender = 'user' | 'ai' | 'system';

export type NavigationStep = 'idle' | 'select_current' | 'select_destination' | 'route_found';

export interface CampusLocation {
  id: string;
  name: string;
  category: 'gate' | 'department' | 'administrative' | 'facility' | 'transport' | 'residence';
  description: string;
  coordinates: { x: number; y: number }; // SVG map percentage coordinates
  floor?: string;
  contactPerson?: string;
  landmarks?: string[];
}

export interface NavigationRoute {
  from: CampusLocation;
  to: CampusLocation;
  distanceMeters: number;
  walkingTimeMinutes: number;
  steps: string[];
  svgPath: string; // SVG path d attribute for rendering the route line
}

export interface ChatDebugInfo {
  tools_used?: string[];
  rounds?: number;
  path?: string;
}

export interface ChatMessageData {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  isNavigationPrompt?: boolean;
  navigationStep?: NavigationStep;
  routeData?: NavigationRoute;
  categoryTag?: string;
  suggestedFollowups?: string[];
  debug?: ChatDebugInfo;
  source?: string;
  citations?: string[];
}

export interface BackendHealthStatus {
  online: boolean;
  status?: string;
  service?: string;
  model?: string;
  version?: string;
  latencyMs?: number;
  message?: string;
}


export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'College' | 'Academics' | 'Career' | 'Campus' | 'Events';
  iconName: string;
  tags: string[];
}

export interface QuickQuestionItem {
  id: string;
  title: string;
  query: string;
  icon: string;
  color: 'blue' | 'yellow' | 'red';
  isMapAction?: boolean;
}

export interface ExploreCardItem {
  id: string;
  title: string;
  subtitle: string;
  query: string;
  icon: string;
  colorScheme: 'blue' | 'yellow' | 'red';
}
