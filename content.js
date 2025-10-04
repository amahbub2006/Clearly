// Clearly Content Script - Image Color Blindness Accessibility
class ClearlyAccessibility {
  constructor() {
    this.isEnabled = false;
    this.colorBlindnessType = 'protanopia'; // Default to protanopia
    this.originalImages = new Map();
    this.init();
  }

  init() {
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'toggleAccessibility') {
        this.toggleAccessibility();
        sendResponse({ success: true });
      } else if (request.action === 'setColorBlindnessType') {
        this.setColorBlindnessType(request.type);
        sendResponse({ success: true });
      } else if (request.action === 'getStatus') {
        sendResponse({ 
          enabled: this.isEnabled, 
          type: this.colorBlindnessType 
        });
      }
    });

    // Load saved settings
    this.loadSettings();
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.sync.get(['clearlyEnabled', 'colorBlindnessType']);
      this.isEnabled = result.clearlyEnabled || false;
      this.colorBlindnessType = result.colorBlindnessType || 'protanopia';
      
      if (this.isEnabled) {
        this.applyAccessibilityFeatures();
      }
    } catch (error) {
      console.log('Clearly: Error loading settings:', error);
    }
  }

  async saveSettings() {
    try {
      await chrome.storage.sync.set({
        clearlyEnabled: this.isEnabled,
        colorBlindnessType: this.colorBlindnessType
      });
    } catch (error) {
      console.log('Clearly: Error saving settings:', error);
    }
  }

  toggleAccessibility() {
    this.isEnabled = !this.isEnabled;
    this.saveSettings();
    
    if (this.isEnabled) {
      this.applyAccessibilityFeatures();
    } else {
      this.removeAccessibilityFeatures();
    }
  }

  setColorBlindnessType(type) {
    this.colorBlindnessType = type;
    this.saveSettings();
    
    if (this.isEnabled) {
      this.removeAccessibilityFeatures();
      this.applyAccessibilityFeatures();
    }
  }

  applyAccessibilityFeatures() {
    // Apply Okabe-Ito color transformations
    this.applyOkabeItoColors();
    
    // Apply color blindness filters to images
    this.applyColorBlindnessFilters();
    
    // Add visual indicator that Clearly is active
    this.addActiveIndicator();
  }

  removeAccessibilityFeatures() {
    // Remove Okabe-Ito color transformations
    this.removeOkabeItoColors();
    
    // Remove color blindness filters
    this.removeColorBlindnessFilters();
    
    // Remove active indicator
    this.removeActiveIndicator();
  }

  applyColorBlindnessFilters() {
    const images = document.querySelectorAll('img');
    
    images.forEach((img, index) => {
      // Store original image data
      if (!this.originalImages.has(img)) {
        this.originalImages.set(img, {
          originalFilter: img.style.filter || '',
          originalStyle: img.style.cssText
        });
      }

      // Apply color blindness filter
      const filter = this.getColorBlindnessFilter(this.colorBlindnessType);
      img.style.filter = filter;
      img.style.transition = 'filter 0.3s ease';
    });
  }

  removeColorBlindnessFilters() {
    this.originalImages.forEach((originalData, img) => {
      img.style.filter = originalData.originalFilter;
      img.style.transition = 'filter 0.3s ease';
    });
  }

  getColorBlindnessFilter(type) {
    const filters = {
      'protanopia': 'sepia(1) saturate(1.5) hue-rotate(320deg) contrast(1.2)',
      'deuteranopia': 'sepia(1) saturate(1.5) hue-rotate(50deg) contrast(1.2)',
      'tritanopia': 'sepia(1) saturate(1.5) hue-rotate(180deg) contrast(1.2)',
      'achromatopsia': 'grayscale(1) contrast(1.2) brightness(1.1)',
      'enhanced': 'contrast(1.2) brightness(1.1) saturate(1.3)'
    };
    
    return filters[type] || filters['protanopia'];
  }

  // Okabe-Ito Color Palette Implementation
  getOkabeItoPalette() {
    return {
      // Original Okabe-Ito colors (hex values)
      orange: '#E69F00',      // Orange
      skyBlue: '#56B4E9',     // Sky blue
      bluishGreen: '#009E73', // Bluish green
      yellow: '#F0E442',      // Yellow
      blue: '#0072B2',        // Blue
      vermillion: '#D55E00',  // Vermillion
      reddishPurple: '#CC79A7', // Reddish purple
      black: '#000000',       // Black
      gray: '#999999'         // Gray
    };
  }

  // Color mapping for different color blindness types
  getColorMapping(colorBlindnessType) {
    const palette = this.getOkabeItoPalette();
    
    const mappings = {
      'protanopia': {
        // Red-green colorblind friendly mapping
        '#FF0000': palette.vermillion,    // Red → Vermillion
        '#00FF00': palette.bluishGreen,   // Green → Bluish green
        '#0000FF': palette.blue,          // Blue → Blue
        '#FFFF00': palette.yellow,        // Yellow → Yellow
        '#FF00FF': palette.reddishPurple, // Magenta → Reddish purple
        '#00FFFF': palette.skyBlue,        // Cyan → Sky blue
        '#FFA500': palette.orange,        // Orange → Orange
        '#800080': palette.reddishPurple, // Purple → Reddish purple
        '#008000': palette.bluishGreen,    // Dark green → Bluish green
        '#000080': palette.blue,          // Navy → Blue
        '#FFC0CB': palette.reddishPurple, // Pink → Reddish purple
        '#A52A2A': palette.vermillion,    // Brown → Vermillion
        '#808080': palette.gray,          // Gray → Gray
        '#000000': palette.black,         // Black → Black
        '#FFFFFF': '#FFFFFF'              // White → White
      },
      'deuteranopia': {
        // Similar to protanopia but with slight variations
        '#FF0000': palette.vermillion,
        '#00FF00': palette.bluishGreen,
        '#0000FF': palette.blue,
        '#FFFF00': palette.yellow,
        '#FF00FF': palette.reddishPurple,
        '#00FFFF': palette.skyBlue,
        '#FFA500': palette.orange,
        '#800080': palette.reddishPurple,
        '#008000': palette.bluishGreen,
        '#000080': palette.blue,
        '#FFC0CB': palette.reddishPurple,
        '#A52A2A': palette.vermillion,
        '#808080': palette.gray,
        '#000000': palette.black,
        '#FFFFFF': '#FFFFFF'
      },
      'tritanopia': {
        // Blue-yellow colorblind friendly mapping
        '#FF0000': palette.vermillion,
        '#00FF00': palette.bluishGreen,
        '#0000FF': palette.skyBlue,        // Blue → Sky blue (lighter)
        '#FFFF00': palette.yellow,
        '#FF00FF': palette.reddishPurple,
        '#00FFFF': palette.skyBlue,
        '#FFA500': palette.orange,
        '#800080': palette.reddishPurple,
        '#008000': palette.bluishGreen,
        '#000080': palette.blue,
        '#FFC0CB': palette.reddishPurple,
        '#A52A2A': palette.vermillion,
        '#808080': palette.gray,
        '#000000': palette.black,
        '#FFFFFF': '#FFFFFF'
      },
      'achromatopsia': {
        // Complete colorblind - use grayscale with Okabe-Ito luminance
        '#FF0000': '#666666',  // Red → Medium gray
        '#00FF00': '#888888',  // Green → Light gray
        '#0000FF': '#333333',  // Blue → Dark gray
        '#FFFF00': '#AAAAAA',  // Yellow → Very light gray
        '#FF00FF': '#555555',  // Magenta → Medium-dark gray
        '#00FFFF': '#777777',  // Cyan → Light gray
        '#FFA500': '#999999',  // Orange → Light gray
        '#800080': '#444444',  // Purple → Dark gray
        '#008000': '#777777',  // Dark green → Light gray
        '#000080': '#222222',  // Navy → Very dark gray
        '#FFC0CB': '#BBBBBB', // Pink → Very light gray
        '#A52A2A': '#555555', // Brown → Medium-dark gray
        '#808080': '#808080', // Gray → Gray (unchanged)
        '#000000': '#000000', // Black → Black
        '#FFFFFF': '#FFFFFF'  // White → White
      },
      'enhanced': {
        // Enhanced vision - use full Okabe-Ito palette
        '#FF0000': palette.vermillion,
        '#00FF00': palette.bluishGreen,
        '#0000FF': palette.blue,
        '#FFFF00': palette.yellow,
        '#FF00FF': palette.reddishPurple,
        '#00FFFF': palette.skyBlue,
        '#FFA500': palette.orange,
        '#800080': palette.reddishPurple,
        '#008000': palette.bluishGreen,
        '#000080': palette.blue,
        '#FFC0CB': palette.reddishPurple,
        '#A52A2A': palette.vermillion,
        '#808080': palette.gray,
        '#000000': palette.black,
        '#FFFFFF': '#FFFFFF'
      }
    };
    
    return mappings[colorBlindnessType] || mappings['protanopia'];
  }

  applyOkabeItoColors() {
    const colorMapping = this.getColorMapping(this.colorBlindnessType);
    
    // Apply to all elements with background colors
    this.transformElementColors(document.body, colorMapping);
    
    // Apply to CSS custom properties
    this.transformCSSVariables(colorMapping);
  }

  removeOkabeItoColors() {
    // Remove all Clearly color transformations
    const elements = document.querySelectorAll('[data-clearly-original-color]');
    elements.forEach(element => {
      const originalColor = element.getAttribute('data-clearly-original-color');
      if (originalColor) {
        element.style.backgroundColor = originalColor;
        element.removeAttribute('data-clearly-original-color');
      }
    });
    
    // Remove CSS variable transformations
    const style = document.getElementById('clearly-okabe-ito-styles');
    if (style) {
      style.remove();
    }
  }

  transformElementColors(element, colorMapping) {
    // Transform background colors
    if (element.style.backgroundColor) {
      const originalColor = element.style.backgroundColor;
      const transformedColor = this.getClosestColor(originalColor, colorMapping);
      if (transformedColor && transformedColor !== originalColor) {
        element.setAttribute('data-clearly-original-color', originalColor);
        element.style.backgroundColor = transformedColor;
      }
    }
    
    // Transform border colors
    if (element.style.borderColor) {
      const originalColor = element.style.borderColor;
      const transformedColor = this.getClosestColor(originalColor, colorMapping);
      if (transformedColor && transformedColor !== originalColor) {
        element.setAttribute('data-clearly-original-border', originalColor);
        element.style.borderColor = transformedColor;
      }
    }
    
    // Recursively apply to children
    Array.from(element.children).forEach(child => {
      this.transformElementColors(child, colorMapping);
    });
  }

  transformCSSVariables(colorMapping) {
    // Create or update CSS variables for Okabe-Ito colors
    let style = document.getElementById('clearly-okabe-ito-styles');
    if (!style) {
      style = document.createElement('style');
      style.id = 'clearly-okabe-ito-styles';
      document.head.appendChild(style);
    }
    
    const palette = this.getOkabeItoPalette();
    const css = `
      :root {
        --clearly-orange: ${palette.orange};
        --clearly-sky-blue: ${palette.skyBlue};
        --clearly-bluish-green: ${palette.bluishGreen};
        --clearly-yellow: ${palette.yellow};
        --clearly-blue: ${palette.blue};
        --clearly-vermillion: ${palette.vermillion};
        --clearly-reddish-purple: ${palette.reddishPurple};
        --clearly-black: ${palette.black};
        --clearly-gray: ${palette.gray};
      }
      
      .clearly-okabe-ito {
        transition: all 0.3s ease;
      }
    `;
    
    style.textContent = css;
  }

  getClosestColor(color, colorMapping) {
    // Convert color to hex format for comparison
    const hexColor = this.colorToHex(color);
    if (!hexColor) return null;
    
    // Direct mapping
    if (colorMapping[hexColor.toUpperCase()]) {
      return colorMapping[hexColor.toUpperCase()];
    }
    
    // Find closest color by RGB distance
    let closestColor = null;
    let minDistance = Infinity;
    
    Object.keys(colorMapping).forEach(mappedColor => {
      const distance = this.colorDistance(hexColor, mappedColor);
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = colorMapping[mappedColor];
      }
    });
    
    return closestColor;
  }

  colorToHex(color) {
    if (!color) return null;
    
    // Handle hex colors
    if (color.startsWith('#')) {
      return color;
    }
    
    // Handle rgb/rgba colors
    if (color.startsWith('rgb')) {
      const rgb = color.match(/\d+/g);
      if (rgb && rgb.length >= 3) {
        const r = parseInt(rgb[0]).toString(16).padStart(2, '0');
        const g = parseInt(rgb[1]).toString(16).padStart(2, '0');
        const b = parseInt(rgb[2]).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`.toUpperCase();
      }
    }
    
    // Handle named colors (basic mapping)
    const namedColors = {
      'red': '#FF0000',
      'green': '#00FF00',
      'blue': '#0000FF',
      'yellow': '#FFFF00',
      'orange': '#FFA500',
      'purple': '#800080',
      'pink': '#FFC0CB',
      'brown': '#A52A2A',
      'gray': '#808080',
      'grey': '#808080',
      'black': '#000000',
      'white': '#FFFFFF'
    };
    
    return namedColors[color.toLowerCase()] || null;
  }

  colorDistance(color1, color2) {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return Infinity;
    
    // Calculate Euclidean distance in RGB space
    const dr = rgb1.r - rgb2.r;
    const dg = rgb1.g - rgb2.g;
    const db = rgb1.b - rgb2.b;
    
    return Math.sqrt(dr * dr + dg * dg + db * db);
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  addActiveIndicator() {
    // Remove existing indicator if any
    this.removeActiveIndicator();
    
    const indicator = document.createElement('div');
    indicator.id = 'clearly-active-indicator';
    indicator.innerHTML = `
      <div style="
        position: fixed;
        top: 10px;
        right: 10px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 8px 12px;
        border-radius: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 12px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 6px;
        animation: slideIn 0.3s ease-out;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background: #4ade80;
          border-radius: 50%;
          animation: pulse 2s infinite;
        "></div>
        Clearly Active
      </div>
      <style>
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      </style>
    `;
    
    document.body.appendChild(indicator);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => indicator.remove(), 300);
      }
    }, 3000);
  }

  removeActiveIndicator() {
    const indicator = document.getElementById('clearly-active-indicator');
    if (indicator) {
      indicator.remove();
    }
  }
}

// Initialize Clearly when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.clearlyContentScriptLoaded = true;
    new ClearlyAccessibility();
  });
} else {
  window.clearlyContentScriptLoaded = true;
  new ClearlyAccessibility();
}
