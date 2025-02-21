chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'setValue') {
    const value = message.value;

    
    chrome.tabs.query({ url: "https://www.gungnirleather.ru/*" }, (tabs) => {
      if (tabs.length > 0) {
        tabs.forEach((tab) => {
          
          chrome.tabs.sendMessage(tab.id, { action: 'receiveValue', value });
        });
      }
    });
  }
});



// chrome.storage.local.get(['autoClickEnabled'], (result) => {
//   const autoClickEnabled = result.autoClickEnabled || false;

//   sendAutoClickState(autoClickEnabled);
// });


// chrome.storage.onChanged.addListener((changes, areaName) => {
//   if (areaName === 'local' && changes.autoClickEnabled) {
//     const newValue = changes.autoClickEnabled.newValue;
//     sendAutoClickState(newValue);
//   }
// });


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'setAutoClick') {
//     const value = message.value;
//     chrome.storage.local.set({ autoClickEnabled: value }, () => {
//       sendAutoClickState(value);
//     });
//   }
// });

// function sendAutoClickState(state) {
//   chrome.tabs.query({ url: "https://www.gungnirleather.ru/*" }, (tabs) => {
//     tabs.forEach((tab) => {
//       chrome.tabs.sendMessage(tab.id, { action: 'updateAutoClick', value: state });
//     });
//   });
// }
