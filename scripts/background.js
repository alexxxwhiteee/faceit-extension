chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'matchConfirmation') {
    const value = message.value;

    chrome.tabs.query({ url: "https://www.faceit.com/*" }, (tabs) => {
      if (tabs.length > 0) {
        tabs.forEach((tab) => {
          
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['scripts/contentScript.js']
          }, () => {
            chrome.tabs.sendMessage(tab.id, { action: 'matchConfirmation', value });
          });
        });
      }
    });
    sendResponse({ status: "success" });
    return true;
  } else if (message.action === 'advancedStatistic') {
    const value = message.value;

    chrome.tabs.query({ url: "https://www.faceit.com/*" }, (tabs) => {
      if (tabs.length > 0) {
        tabs.forEach((tab) => {
          
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['scripts/contentScript.js']
          }, () => {
            chrome.tabs.sendMessage(tab.id, { action: 'advancedStatistic', value });
          });
        });
      }
    });
    sendResponse({ status: "success" });
    return true;
  }
});