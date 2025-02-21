
let globalObserver = null

let autoClickEnabled = false

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'receiveValue') {
    autoClickEnabled = message.value
    console.log(message.value)
    console.log(autoClickEnabled)
    watchStatus(autoClickEnabled)
  }
});



function watchStatus(value) {
  if (value === true) {
    console.log('TRUE');
    if (globalObserver) {
      return;
    }
    function handleMutation(mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          for (const addedNode of mutation.addedNodes) {
            if (
              addedNode instanceof HTMLElement &&
              addedNode.classList.contains('btn')
            ) {
              let x = document.getElementsByClassName('btn')[0];
              setTimeout(() => {
                x.click();
              }, 500);
            }
          }
        }
      }
    }
    globalObserver = new MutationObserver(handleMutation);
    globalObserver.observe(document.body, { childList: true, subtree: true });
  } else if (value === false) {
    console.log('FALSE');
    if (globalObserver) {
      globalObserver.disconnect();
      globalObserver = null;
    }
  }
}

chrome.storage.local.get(['autoClickEnabled'], (result) => {
  autoClickEnabled = result.autoClickEnabled || false;
  watchStatus(autoClickEnabled)
});