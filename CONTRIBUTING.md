# 🤝 Contributing to Clearly Extension

Thank you for your interest in contributing to Clearly! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

### Prerequisites
- Basic knowledge of HTML, CSS, and JavaScript
- Chrome or Chromium-based browser
- Git installed on your system

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/clearly-extension.git`
3. Navigate to the project: `cd clearly-extension`
4. Load the extension in Chrome for development

## 🔧 Development Workflow

### Loading the Extension for Development
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `clearly-extension` folder
5. Make your changes and click the refresh button to reload

### Testing Your Changes
1. Open `test-page.html` in your browser
2. Test all functionality with the extension popup
3. Check browser console for any errors
4. Test on different websites to ensure compatibility

## 📝 Code Guidelines

### JavaScript
- Use modern ES6+ syntax
- Follow consistent naming conventions (camelCase for variables/functions)
- Add comments for complex logic
- Handle errors gracefully with try-catch blocks

### CSS
- Use meaningful class names
- Follow BEM methodology for complex components
- Keep styles organized and commented
- Ensure responsive design

### HTML
- Use semantic HTML elements
- Include proper accessibility attributes
- Keep structure clean and readable

## 🐛 Bug Reports

When reporting bugs, please include:
- Description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser version and OS
- Screenshots if applicable

## ✨ Feature Requests

When suggesting features:
- Describe the use case
- Explain how it benefits users
- Consider accessibility implications
- Provide mockups or examples if possible

## 🧪 Testing

### Manual Testing Checklist
- [ ] Extension loads without errors
- [ ] Popup opens and functions correctly
- [ ] Color blindness filters work on images
- [ ] Settings are saved and restored
- [ ] Works on different websites
- [ ] No console errors

### Test Cases
1. **Basic Functionality**
   - Toggle extension on/off
   - Change color blindness type
   - Preview changes
   - Reset page

2. **Edge Cases**
   - Pages with no images
   - Pages with many images
   - Different image formats
   - Dynamic content loading

3. **Accessibility**
   - Screen reader compatibility
   - Keyboard navigation
   - High contrast mode
   - Reduced motion preferences

## 📋 Pull Request Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, documented code
   - Test thoroughly
   - Update documentation if needed

3. **Commit Changes**
   ```bash
   git commit -m "Add: description of changes"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### PR Guidelines
- Provide a clear description of changes
- Include screenshots for UI changes
- Reference any related issues
- Ensure all tests pass
- Update documentation as needed

## 🎯 Areas for Contribution

### High Priority
- Additional color blindness types
- Performance optimizations
- Better error handling
- More accessibility features

### Medium Priority
- UI/UX improvements
- Additional languages
- Advanced customization options
- Analytics and usage tracking

### Low Priority
- Documentation improvements
- Code refactoring
- Additional test cases
- Developer tools

## 📚 Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Color Blindness Information](https://www.colorblindness.com/)

## 💬 Communication

- Use GitHub Issues for bug reports and feature requests
- Use GitHub Discussions for general questions
- Be respectful and constructive in all interactions
- Follow the code of conduct

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for helping make Clearly better for everyone! 🌟
