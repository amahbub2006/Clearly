# 🚀 Clearly Extension - Installation Guide

## Quick Start

### For Users (Installation)

1. **Download the Extension**
   - Download the `clearly-extension.zip` file
   - Extract it to a folder on your computer

2. **Install in Chrome/Edge**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the extracted `clearly-extension` folder
   - The Clearly icon should appear in your toolbar!

3. **Test the Extension**
   - Open `test-page.html` in your browser
   - Click the Clearly icon in your toolbar
   - Toggle "Enable Accessibility Features"
   - Select a color blindness type
   - Watch the magic happen! ✨

### For Developers (Development Setup)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/clearly-extension.git
   cd clearly-extension
   ```

2. **Install Dependencies** (if any)
   ```bash
   npm install
   ```

3. **Load in Chrome for Development**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `clearly-extension` folder

4. **Make Changes**
   - Edit any files in the extension
   - Click the refresh button on the extension in `chrome://extensions/`
   - Test your changes!

## 📁 Project Structure

```
clearly-extension/
├── manifest.json          # Extension configuration
├── background.js          # Service worker
├── content.js            # Content script for page modifications
├── content.css           # Accessibility styles
├── popup.html            # Extension popup interface
├── popup.css             # Popup styling
├── popup.js              # Popup functionality
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── test-page.html        # Test page for verification
├── README.md             # Main documentation
├── INSTALL.md            # This file
├── package.json          # Project metadata
└── .gitignore            # Git ignore rules
```

## 🔧 Development Commands

```bash
# Package the extension
npm run package

# Test the extension
npm run test

# Build (no build process needed)
npm run build
```

## 🐛 Troubleshooting

### Extension Not Loading
- Make sure all files are in the correct directory
- Check that `manifest.json` is valid JSON
- Ensure all referenced files exist

### Icons Not Showing
- Verify icon files are in the `icons/` directory
- Check that icon paths in `manifest.json` are correct
- Icons should be PNG format

### Content Script Not Working
- Check browser console for errors
- Ensure the page is not a `chrome://` or `file://` page
- Verify content script is injected properly

### Popup Not Opening
- Check that `popup.html` exists and is valid
- Ensure CSS and JS files are referenced correctly
- Check browser console for errors

## 📝 Notes

- This extension uses Manifest V3 (latest Chrome extension standard)
- No build process required - just load the folder directly
- All files are plain HTML, CSS, and JavaScript
- Icons are included in the repository

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
