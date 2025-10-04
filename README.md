# Clearly - AI-Powered Accessibility Extension

Clearly is an AI-powered browser extension that transforms how users experience the web by adapting online content to their personal accessibility and focus needs — all in real time.

## Features

- **Color Blindness Accessibility**: Automatically adjusts images and content for various types of color blindness
- **Real-time Adaptation**: Changes are applied instantly without page reload
- **Multiple Color Blindness Types**: Support for protanopia, deuteranopia, tritanopia, achromatopsia, and enhanced vision
- **Easy-to-use Interface**: Simple popup interface for quick access to settings
- **Manifest V3 Compatible**: Built with the latest Chrome extension standards

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The Clearly extension icon should appear in your browser toolbar

## Usage

1. **Enable Accessibility Features**: Click the Clearly icon in your toolbar and toggle "Enable Accessibility Features"
2. **Select Color Blindness Type**: Choose from the dropdown menu:
   - Protanopia (Red-blind)
   - Deuteranopia (Green-blind) 
   - Tritanopia (Blue-blind)
   - Achromatopsia (Complete color blindness)
   - Enhanced Vision
3. **Preview Changes**: Use the "Preview Changes" button to see how the current page will look
4. **Reset Page**: Use the "Reset Page" button to remove all accessibility modifications

## How It Works

Clearly works by:
1. Injecting a content script into web pages
2. Applying CSS filters to images based on the selected color blindness type
3. Using advanced color transformation algorithms to make content more accessible
4. Providing real-time feedback through visual indicators

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: activeTab, storage
- **Content Scripts**: Automatically injected on all web pages
- **Storage**: Settings are synced across devices using Chrome's sync storage

## File Structure

```
clearly-extension/
├── manifest.json          # Extension manifest
├── background.js          # Background service worker
├── content.js            # Content script for page modifications
├── content.css           # Styles for accessibility features
├── popup.html            # Extension popup interface
├── popup.css             # Popup styling
├── popup.js              # Popup functionality
├── icons/                # Extension icons
└── README.md             # This file
```

## Development

To modify or extend the extension:

1. Make your changes to the relevant files
2. Go to `chrome://extensions/`
3. Click the refresh button on the Clearly extension
4. Test your changes on a web page

## Browser Compatibility

- Chrome (Manifest V3)
- Edge (Chromium-based)
- Other Chromium-based browsers

## Future Enhancements

- AI-powered content simplification
- Text-to-speech integration
- Advanced focus management
- Custom accessibility profiles
- Machine learning-based personalization

## Support

For issues or feature requests, please create an issue in the repository.

## License

This project is open source and available under the MIT License.
