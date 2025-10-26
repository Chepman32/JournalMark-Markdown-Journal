# JournalMark - Deployment Guide

## Production Deployment Checklist

### Pre-Deployment

- ✅ All features implemented
- ✅ TypeScript compilation passes
- ✅ ESLint clean
- ✅ Database schema finalized
- ✅ State management tested
- ✅ Navigation flows complete
- ✅ Animations optimized
- ✅ Accessibility validated
- ✅ Documentation complete

### iOS Deployment

#### 1. Xcode Project Setup

```bash
cd ios
pod install
open JournalMark.xcworkspace
```

**Configure in Xcode:**
- Bundle Identifier: `com.yourcompany.journalmark`
- Version: 1.0.0
- Build Number: 1
- Deployment Target: iOS 14.0+
- Device: iPhone, iPad
- Signing: Automatic or Manual

#### 2. Build Configuration

**Release Build Settings:**
- Enable Bitcode (if required)
- App Thinning: ON
- Strip Debug Symbols: YES
- Optimization Level: -Os (optimize for size)

#### 3. Info.plist Permissions

Add required permissions:
```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>To attach photos to your journal entries</string>

<key>NSCameraUsageDescription</key>
<string>To take photos for your journal</string>

<key>NSUserTrackingUsageDescription</key>
<string>Not used - fully offline app</string>
```

#### 4. App Icons & Launch Screen

**Required Assets:**
- App Icon: 1024x1024 (App Store)
- Launch Screen: Adaptive splash
- All icon sizes in Assets.xcassets

#### 5. Archive Build

```bash
# Clean build folder
rm -rf ~/Library/Developer/Xcode/DerivedData/JournalMark-*

# Archive
xcodebuild clean archive \
  -workspace JournalMark.xcworkspace \
  -scheme JournalMark \
  -configuration Release \
  -archivePath ./build/JournalMark.xcarchive
```

#### 6. Export IPA

Create `ExportOptions.plist`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store</string>
    <key>teamID</key>
    <string>YOUR_TEAM_ID</string>
    <key>uploadSymbols</key>
    <true/>
    <key>compileBitcode</key>
    <false/>
</dict>
</plist>
```

Export:
```bash
xcodebuild -exportArchive \
  -archivePath ./build/JournalMark.xcarchive \
  -exportPath ./build \
  -exportOptionsPlist ExportOptions.plist
```

#### 7. App Store Connect

**Prepare:**
1. Create app in App Store Connect
2. Fill out metadata:
   - App Name: JournalMark
   - Subtitle: Your Offline Journal
   - Description: (see below)
   - Keywords: journal, diary, markdown, offline, notes
   - Category: Productivity
   - Content Rating: 4+

3. Screenshots (required):
   - 6.7" iPhone (1290 x 2796)
   - 5.5" iPhone (1242 x 2208)
   - 12.9" iPad Pro (2048 x 2732)

4. Privacy:
   - Does NOT collect data
   - Privacy Policy URL (optional for offline app)

#### 8. Upload to App Store

```bash
# Using Transporter or
xcrun altool --upload-app \
  -f ./build/JournalMark.ipa \
  -t ios \
  -u YOUR_APPLE_ID \
  -p APP_SPECIFIC_PASSWORD
```

#### 9. TestFlight

**Internal Testing:**
1. Add internal testers
2. Distribute build
3. Gather feedback
4. Fix critical bugs

**External Testing:**
1. Add beta testers
2. Complete Beta App Review
3. Distribute to public beta

#### 10. Submit for Review

**Review Notes:**
- App is fully offline
- No network required
- Data stored locally only
- No user accounts
- IAP for Pro features (if applicable)

**Demo Account:**
Not required (offline app)

### IAP Setup

If using In-App Purchases:

1. **App Store Connect → Features → In-App Purchases**

2. **Create Products:**
   - Pro Unlock: Non-Consumable
     - Product ID: `com.journalmark.pro`
     - Price: $4.99

   - Template Pack Basic: Non-Consumable
     - Product ID: `com.journalmark.templates.basic`
     - Price: $1.99

   - Template Pack Pro: Non-Consumable
     - Product ID: `com.journalmark.templates.pro`
     - Price: $2.99

3. **Testing IAP:**
   - Create Sandbox testers
   - Test purchases in TestFlight
   - Verify receipt validation

### Performance Validation

Run performance tests:

```bash
# Profiler (Instruments)
# - Time Profiler
# - Allocations
# - Leaks
# - Energy Log

# Check app size
du -sh build/JournalMark.ipa

# Target: < 50MB
```

### Security Checklist

- ✅ No hardcoded secrets
- ✅ Database encryption (iOS Data Protection)
- ✅ Keychain for sensitive data
- ✅ No logging of user data
- ✅ Proper error messages (no stack traces)
- ✅ Input validation
- ✅ SQL injection prevention (parameterized queries)

### Analytics (Optional)

If adding analytics:
- Use privacy-preserving analytics only
- No personal data collection
- Comply with App Tracking Transparency
- Update privacy policy

### Post-Launch

**Monitor:**
1. Crash reports (App Store Connect)
2. User reviews
3. Performance metrics
4. Download numbers

**Iterate:**
1. Fix critical bugs immediately
2. Plan feature updates
3. Respond to user feedback
4. Regular maintenance updates

### Version Updates

For future releases:

```bash
# Update version
# In Xcode: General → Version (1.1.0)
# In Xcode: General → Build (2)

# Changelog
git tag v1.1.0
git push --tags
```

### Marketing Materials

**App Store Description:**

```
JournalMark - Your Private, Offline Journal

Write, reflect, and grow with JournalMark, the privacy-first journaling app
that works entirely offline.

FEATURES:
• 📝 Beautiful Markdown editor
• 🏷️ Organize with tags
• 📋 Quick-start templates
• 📊 Track your writing streak
• 🌙 Dark mode support
• 📤 Export to PDF, Markdown, or Text
• 🔒 100% offline - your data never leaves your device

PRIVACY FIRST:
Your journal is for your eyes only. No account required, no cloud sync,
no data collection. Everything stays on your device.

POWERFUL FEATURES:
• Rich text editing with Markdown support
• Custom tags for organization
• Pre-built templates for quick journaling
• Search through all your entries
• Export your journal anytime
• Beautiful, gesture-driven interface

Perfect for:
• Daily journaling
• Gratitude practice
• Goal tracking
• Reflection and mindfulness
• Creative writing
• Travel logs

Download JournalMark today and start your journaling journey!
```

**Keywords:**
journal, diary, markdown, offline, private, notes, writing, gratitude, reflection

**Promotional Text:**
"Now with dark mode and improved performance!"

### Support

**Support Email:** support@journalmark.app (set up)

**FAQs:**
1. Is my data safe? Yes, 100% offline.
2. Can I sync across devices? Not currently (feature request)
3. How do I export? Settings → Export
4. What is Pro? Unlocks additional templates and features

### Legal

**Privacy Policy:**
Create and host at: yourwebsite.com/privacy

**Terms of Service:**
Create and host at: yourwebsite.com/terms

### Rollout Strategy

1. **Soft Launch:** TestFlight (2 weeks)
2. **Regional Launch:** 1-2 countries
3. **Global Launch:** Worldwide
4. **Marketing:** Product Hunt, Reddit, Twitter

### Success Metrics

**Track:**
- Downloads
- Active users (if analytics added)
- Retention rate
- Reviews/ratings
- IAP conversion rate

**Goals:**
- Week 1: 1,000 downloads
- Month 1: 10,000 downloads
- 4+ stars average rating
- <1% crash rate

---

**Ready for Production! 🚀**

All development complete. Ready to ship to the App Store.
