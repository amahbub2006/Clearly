// Clearly Background Script
class ClearlyBackground {
  constructor() {
    this.init();
  }

  init() {
    // Set up extension installation/update handlers
    chrome.runtime.onInstalled.addListener((details) => {
      this.handleInstallation(details);
    });

    // Set up message handling
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      this.handleMessage(request, sender, sendResponse);
      return true; // Keep message channel open for async responses
    });

    // Set up context menu
    this.setupContextMenu();
  }

  handleInstallation(details) {
    if (details.reason === 'install') {
      // First time installation
      this.setDefaultSettings();
      this.showWelcomeNotification();
    } else if (details.reason === 'update') {
      // Extension update
      this.handleUpdate(details.previousVersion);
    }
  }

  async setDefaultSettings() {
    try {
      await chrome.storage.sync.set({
        clearlyEnabled: false,
        colorBlindnessType: 'protanopia',
        firstRun: true,
        installDate: Date.now()
      });
    } catch (error) {
      console.error('Clearly: Error setting default settings:', error);
    }
  }

  showWelcomeNotification() {
    // Simple console log instead of notification to avoid permission issues
    console.log('Clearly: Welcome! Your AI-powered accessibility companion is ready.');
  }

  handleUpdate(previousVersion) {
    console.log(`Clearly: Updated from version ${previousVersion}`);
    // Handle any migration logic here if needed
  }

  handleMessage(request, sender, sendResponse) {
    switch (request.action) {
      case 'getSettings':
        this.getSettings(sendResponse);
        break;
      case 'saveSettings':
        this.saveSettings(request.settings, sendResponse);
        break;
      case 'getTabInfo':
        this.getTabInfo(sendResponse);
        break;
      case 'injectContentScript':
        this.injectContentScript(sender.tab.id, sendResponse);
        break;
      default:
        sendResponse({ error: 'Unknown action' });
    }
  }

  async getSettings(sendResponse) {
    try {
      const settings = await chrome.storage.sync.get([
        'clearlyEnabled',
        'colorBlindnessType',
        'firstRun'
      ]);
      sendResponse({ success: true, settings });
    } catch (error) {
      console.error('Clearly: Error getting settings:', error);
      sendResponse({ success: false, error: error.message });
    }
  }

  async saveSettings(settings, sendResponse) {
    try {
      await chrome.storage.sync.set(settings);
      sendResponse({ success: true });
    } catch (error) {
      console.error('Clearly: Error saving settings:', error);
      sendResponse({ success: false, error: error.message });
    }
  }

  async getTabInfo(sendResponse) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      sendResponse({ 
        success: true, 
        tab: {
          id: tab.id,
          url: tab.url,
          title: tab.title
        }
      });
    } catch (error) {
      console.error('Clearly: Error getting tab info:', error);
      sendResponse({ success: false, error: error.message });
    }
  }

  // Simplified - content scripts are automatically injected via manifest

  setupContextMenu() {
    // Simplified context menu setup
    try {
      chrome.contextMenus.create({
        id: 'clearly-toggle',
        title: 'Toggle Clearly Accessibility',
        contexts: ['page']
      });

      chrome.contextMenus.onClicked.addListener((info, tab) => {
        if (info.menuItemId === 'clearly-toggle') {
          chrome.tabs.sendMessage(tab.id, {
            action: 'toggleAccessibility'
          }).catch(error => {
            console.log('Clearly: Could not send message to tab:', error);
          });
        }
      });
    } catch (error) {
      console.log('Clearly: Context menu setup failed:', error);
    }
  }
}

// Initialize background script
new ClearlyBackground();
