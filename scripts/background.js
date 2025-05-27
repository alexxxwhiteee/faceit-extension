let popupPort = null;
let lastUserName

chrome.storage.local.get('userName', function(result) {
  lastUserName = result.userName 
});

chrome.runtime.onConnect.addListener(port => {
    if (port.name === "popupPort") {
        popupPort = port;
        popupPort.postMessage({ action: 'userName', value: lastUserName });
        port.onDisconnect.addListener(() => {
          popupPort = null;
      });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'userName') {
      lastUserName = message.value;
      chrome.storage.local.set({ userName: lastUserName });
        if (popupPort) {
            popupPort.postMessage({ action: 'userName', value: lastUserName });
        } 
        sendResponse({ status: "success" });
    } 
    return true;
});



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
  } else if (message.action === 'coloredStatistic') {
    const value = message.value;

    chrome.tabs.query({ url: "https://www.faceit.com/*" }, (tabs) => {
      if (tabs.length > 0) {
        tabs.forEach((tab) => {
          
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['scripts/contentScript.js']
          }, () => {
            chrome.tabs.sendMessage(tab.id, { action: 'coloredStatistic', value });
          });
        });
      }
    });
    sendResponse({ status: "success" });
    return true;
  }
});