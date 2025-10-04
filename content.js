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
    // Apply color blindness filters to images
    this.applyColorBlindnessFilters();
    
    // Add visual indicator that Clearly is active
    this.addActiveIndicator();
  }

  removeAccessibilityFeatures() {
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
