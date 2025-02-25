(function (){
let globalObserver = null

let autoClickEnabled = false

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'receiveValue') {
    autoClickEnabled = message.value
    localStorage.setItem('autoClick', message.value)
    watchStatus(autoClickEnabled)
  }
});



function watchStatus(value) {
  if (value === true || localStorage.getItem('autoClick') == 'true') {
    console.log('TRUE')
    localStorage.setItem('autoClick', 'true')
    if (globalObserver) {
      return;
    }
    function handleMutation(mutationsList) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'substree' || mutation.type === 'attributes' || mutation.type === 'characterData') {
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
    globalObserver.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });
  } else if (value === false || localStorage.getItem('autoClick') == 'false') {
    console.log('FALSE')
    localStorage.setItem('autoClick', 'false')
    if (globalObserver) {
      globalObserver.disconnect();
      globalObserver = null;
    }
  }
}
watchStatus()
})()