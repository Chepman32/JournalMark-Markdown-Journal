export * from './theme';

export const APP_NAME = 'JournalMark';
export const APP_VERSION = '1.0.0';

export const IAP_PRODUCTS = {
  PRO_UNLOCK: 'com.journalmark.pro',
  TEMPLATE_PACK_BASIC: 'com.journalmark.templates.basic',
  TEMPLATE_PACK_PRO: 'com.journalmark.templates.pro',
  EXPORT_PACK: 'com.journalmark.export.advanced',
};

export const MOODS = [
  {id: 'happy', label: 'Happy', emoji: '😊', color: '#FFD60A'},
  {id: 'sad', label: 'Sad', emoji: '😢', color: '#64D2FF'},
  {id: 'excited', label: 'Excited', emoji: '🤩', color: '#FF9F0A'},
  {id: 'calm', label: 'Calm', emoji: '😌', color: '#32D74B'},
  {id: 'angry', label: 'Angry', emoji: '😠', color: '#FF453A'},
  {id: 'anxious', label: 'Anxious', emoji: '😰', color: '#BF5AF2'},
  {id: 'grateful', label: 'Grateful', emoji: '🙏', color: '#FF375F'},
  {id: 'neutral', label: 'Neutral', emoji: '😐', color: '#98989D'},
];

export const WEATHER_CONDITIONS = [
  {id: 'sunny', label: 'Sunny', icon: 'sun'},
  {id: 'cloudy', label: 'Cloudy', icon: 'cloud'},
  {id: 'rainy', label: 'Rainy', icon: 'cloud-rain'},
  {id: 'snowy', label: 'Snowy', icon: 'cloud-snow'},
  {id: 'stormy', label: 'Stormy', icon: 'cloud-lightning'},
  {id: 'windy', label: 'Windy', icon: 'wind'},
];

export const DEFAULT_TEMPLATES = [
  {
    id: 'blank',
    name: 'Blank',
    content: '',
    description: 'Start with a blank canvas',
    icon: 'file',
  },
  {
    id: 'daily',
    name: 'Daily Entry',
    content: '# Daily Journal\n\n## How I feel\n\n## What happened today\n\n## Grateful for\n\n## Tomorrow\'s goals\n',
    description: 'Structured daily journaling',
    icon: 'calendar',
  },
  {
    id: 'gratitude',
    name: 'Gratitude',
    content: '# Gratitude Journal\n\n## Three things I\'m grateful for:\n\n1. \n2. \n3. \n\n## Why these matter:\n',
    description: 'Focus on gratitude',
    icon: 'heart',
  },
  {
    id: 'goals',
    name: 'Goals & Progress',
    content: '# Goals\n\n## Short-term goals:\n\n## Long-term goals:\n\n## Progress update:\n\n## Next steps:\n',
    description: 'Track your goals',
    icon: 'target',
  },
  {
    id: 'reflection',
    name: 'Weekly Reflection',
    content: '# Weekly Reflection\n\n## Wins this week:\n\n## Challenges faced:\n\n## Lessons learned:\n\n## Next week\'s focus:\n',
    description: 'Reflect on your week',
    icon: 'book-open',
  },
];

export const TAG_COLORS = [
  '#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#00C7BE',
  '#30B0C7', '#32ADE6', '#007AFF', '#5856D6', '#AF52DE',
  '#FF2D55', '#A2845E', '#8E8E93', '#FF6482', '#BF5AF2',
];

export const EDITOR_TOOLBAR_ACTIONS = [
  {id: 'bold', icon: 'format-bold', markdown: '**'},
  {id: 'italic', icon: 'format-italic', markdown: '_'},
  {id: 'heading', icon: 'format-header-1', markdown: '# '},
  {id: 'list', icon: 'format-list-bulleted', markdown: '- '},
  {id: 'checkbox', icon: 'checkbox-marked-outline', markdown: '- [ ] '},
  {id: 'link', icon: 'link', markdown: '[](url)'},
  {id: 'quote', icon: 'format-quote-close', markdown: '> '},
  {id: 'code', icon: 'code-tags', markdown: '`'},
];

export const PERFORMANCE_BUDGETS = {
  MAX_LIST_ITEMS: 50,
  VIRTUALIZATION_THRESHOLD: 30,
  IMAGE_CACHE_SIZE: 100,
  MAX_CONCURRENT_ANIMATIONS: 5,
  DEBOUNCE_SEARCH: 300,
  AUTOSAVE_DEBOUNCE: 2000,
};
