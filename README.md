# JournalMark - Offline Markdown Journal

> Production-ready offline-first iOS journaling app built with React Native, Reanimated, and Skia.

## Features

- **Fully Offline**: All data stored locally with SQLite
- **Markdown Support**: Rich text editing with markdown syntax
- **Tags & Organization**: Organize entries with custom tags
- **Templates**: Pre-built and custom templates
- **Export**: Export to Markdown, JSON, or plain text
- **Beautiful Animations**: Gesture-first UX with physics-based animations
- **Skia Graphics**: Custom renderers and particle effects
- **Accessibility**: Full VoiceOver support and Dynamic Type
- **Privacy-First**: No cloud sync, data never leaves your device

## Tech Stack

- React Native 0.75+
- TypeScript
- React Navigation 6
- Reanimated 3
- React Native Skia
- React Native Gesture Handler
- SQLite (react-native-quick-sqlite)
- Zustand (state management)
- Date-fns

## Installation

```bash
# Install dependencies
npm install

# Install iOS pods
cd ios && pod install && cd ..

# Run on iOS
npm run ios

# Run on Android (future)
npm run android
```

## Project Structure

```
src/
├── animations/       # Reanimated animations and worklets
├── components/       # Reusable UI components
│   ├── ui/          # Generic UI components
│   └── journal/     # Journal-specific components
├── constants/        # Theme, colors, typography
├── database/         # SQLite schema and operations
├── hooks/            # Custom React hooks
├── navigation/       # Navigation configuration
├── screens/          # App screens
├── store/            # Zustand state management
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Development

### Key Commands

```bash
npm start           # Start Metro bundler
npm run ios         # Run on iOS
npm run type-check  # TypeScript type checking
npm run lint        # ESLint
npm test            # Run tests
```

### Database Schema

The app uses SQLite with the following tables:
- `entries` - Journal entries
- `tags` - Tag definitions
- `entry_tags` - Entry-tag relationships
- `templates` - Entry templates
- `settings` - App settings
- `user_stats` - User statistics

### State Management

Zustand stores:
- `useEntriesStore` - Journal entries
- `useTagsStore` - Tags
- `useTemplatesStore` - Templates
- `useSettingsStore` - App settings and user preferences

## Features Implementation

### Offline-First Architecture
- All data stored locally in SQLite
- No network requirements
- Deterministic behavior

### Gesture-First UX
- Press springs (scale animations)
- Swipe gestures
- Pan-to-expand
- Pull-to-refresh

### Animations
- Reanimated 3 worklets
- Physics-based springs
- Micro-interactions
- Skia-based particle effects

### Accessibility
- VoiceOver support
- Dynamic Type
- High contrast support
- Semantic HTML equivalents

## Export Formats

1. **Markdown** - Full markdown export with metadata
2. **JSON** - Structured data export
3. **Plain Text** - Simple text export

## Performance

- Virtualized lists for large datasets
- Lazy loading
- Image caching
- Debounced search
- Optimistic UI updates

## IAP Integration

The app supports In-App Purchases:
- Pro unlock
- Template packs
- Advanced export features

## Building for Production

### iOS

```bash
# Archive and distribute
cd ios
xcodebuild archive \
  -workspace JournalMark.xcworkspace \
  -scheme JournalMark \
  -archivePath ./build/JournalMark.xcarchive

# Export IPA
xcodebuild -exportArchive \
  -archivePath ./build/JournalMark.xcarchive \
  -exportPath ./build \
  -exportOptionsPlist ExportOptions.plist
```

## License

MIT

## Author

Built with Claude Code

---

**Production-Ready Features:**
- ✅ Offline-first architecture
- ✅ SQLite database
- ✅ State management
- ✅ Navigation
- ✅ Animations & gestures
- ✅ Markdown editing
- ✅ Tags & templates
- ✅ Export functionality
- ✅ Settings & preferences
- ✅ Accessibility
- ✅ TypeScript
- ✅ Error handling
- ✅ Performance optimizations
