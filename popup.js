// Clearly Popup Script
class ClearlyPopup {
  constructor() {
    this.isEnabled = false;
    this.colorBlindnessType = 'protanopia';
    this.init();
  }

  async init() {
    // Get DOM elements
    this.toggleInput = document.getElementById('accessibilityToggle');
    this.colorBlindnessSelect = document.getElementById('colorBlindnessSelect');
    this.statusIndicator = document.getElementById('statusIndicator');
    this.statusText = document.getElementById('statusText');
    this.previewBtn = document.getElementById('previewBtn');
    this.resetBtn = document.getElementById('resetBtn');
    this.settingsBtn = document.getElementById('settingsBtn');
    this.helpLink = document.getElementById('helpLink');

    // Load current settings
    await this.loadSettings();

    // Set up event listeners
    this.setupEventListeners();

    // Update UI based on current state
    this.updateUI();
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.sync.get(['clearlyEnabled', 'colorBlindnessType']);
      this.isEnabled = result.clearlyEnabled || false;
      this.colorBlindnessType = result.colorBlindnessType || 'protanopia';
    } catch (error) {
      console.error('Clearly: Error loading settings:', error);
    }
  }

  async saveSettings() {
    try {
      await chrome.storage.sync.set({
        clearlyEnabled: this.isEnabled,
        colorBlindnessType: this.colorBlindnessType
      });
    } catch (error) {
      console.error('Clearly: Error saving settings:', error);
    }
  }

  setupEventListeners() {
    // Toggle accessibility features
    this.toggleInput.addEventListener('change', async (e) => {
      this.isEnabled = e.target.checked;
      await this.saveSettings();
      this.updateUI();
      this.toggleAccessibility();
    });

    // Color blindness type selection
    this.colorBlindnessSelect.addEventListener('change', async (e) => {
      this.colorBlindnessType = e.target.value;
      await this.saveSettings();
      this.updateColorBlindnessType();
    });

    // Preview button
    this.previewBtn.addEventListener('click', () => {
      this.previewChanges();
    });

    // Reset button
    this.resetBtn.addEventListener('click', () => {
      this.resetPage();
    });

    // Settings button
    this.settingsBtn.addEventListener('click', () => {
      this.openSettings();
    });

    // Help link
    this.helpLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.openHelp();
    });
  }

  updateUI() {
    // Update toggle state
    this.toggleInput.checked = this.isEnabled;
    
    // Update color blindness select
    this.colorBlindnessSelect.value = this.colorBlindnessType;
    
    // Update status indicator
    if (this.isEnabled) {
      this.statusIndicator.classList.add('active');
      this.statusText.textContent = 'Active';
    } else {
      this.statusIndicator.classList.remove('active');
      this.statusText.textContent = 'Inactive';
    }

    // Update preview button state
    this.previewBtn.disabled = !this.isEnabled;
    this.previewBtn.style.opacity = this.isEnabled ? '1' : '0.5';
  }

  async toggleAccessibility() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      await chrome.tabs.sendMessage(tab.id, {
        action: 'toggleAccessibility'
      });
    } catch (error) {
      console.error('Clearly: Error toggling accessibility:', error);
      this.showNotification('Error: Could not communicate with the page. Please refresh and try again.');
    }
  }

  async updateColorBlindnessType() {
    if (!this.isEnabled) return;

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      await chrome.tabs.sendMessage(tab.id, {
        action: 'setColorBlindnessType',
        type: this.colorBlindnessType
      });
    } catch (error) {
      console.error('Clearly: Error updating color blindness type:', error);
    }
  }

  async previewChanges() {
    if (!this.isEnabled) {
      this.showNotification('Please enable accessibility features first.');
      return;
    }

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Send preview command
      await chrome.tabs.sendMessage(tab.id, {
        action: 'previewChanges',
        type: this.colorBlindnessType
      });

      this.showNotification('Preview applied! Changes will be visible on the page.');
    } catch (error) {
      console.error('Clearly: Error previewing changes:', error);
      this.showNotification('Error: Could not apply preview. Please refresh and try again.');
    }
  }

  async resetPage() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Send reset command
      await chrome.tabs.sendMessage(tab.id, {
        action: 'resetPage'
      });

      this.showNotification('Page reset successfully!');
    } catch (error) {
      console.error('Clearly: Error resetting page:', error);
      this.showNotification('Error: Could not reset page. Please refresh manually.');
    }
  }

  openSettings() {
    // Open extension options page
    chrome.runtime.openOptionsPage();
  }

  openHelp() {
    // Open help documentation
    chrome.tabs.create({
      url: 'https://github.com/clearly-extension/help'
    });
  }

  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #374151;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 10000;
      animation: slideDown 0.3s ease-out;
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideDown 0.3s ease-out reverse';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
        if (style.parentNode) {
          style.remove();
        }
      }, 300);
    }, 3000);
  }
}

// Initialize popup when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ClearlyPopup();
});
