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
    localStorage.setItem('autoClick', 'true')
    if (globalObserver) {
      return;
    }
    function handleMutation(mutationsList) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'substree' || mutation.type === 'attributes' || mutation.type === 'characterData') {
          for (const addedNode of mutation.addedNodes) {
            if (addedNode instanceof HTMLElement) {
              let x = document.getElementsByClassName('')[0];
              setTimeout(() => {
                x.click();
              }, 500);

              let xs = document.getElementsByClassName('RosterPlayerStatsV2__Row-sc-5df27d52-2 kaxuSW');
              for (x of xs){
                let ys = Array.from(x.lastElementChild.firstElementChild.textContent)
                  if (ys[0] == 0 && ys[2] == 8){
                    x.style.border = '1px solid red'
                    x.style.boxShadow = '0 0 3px 3px red, inset 0 0 10px red';
                  } else if (ys[0] == 0 && ys[2] == 9) {
                    x.style.border = '1px solid yellow'
                    x.style.boxShadow = '0 0 3px 3px yellow, inset 0 0 10px yellow';
                  } else {
                    x.style.border = '1px solid green'
                    x.style.boxShadow = '0 0 3px 3px green, inset 0 0 10px green';
                  }
              }
            }
          }
        }
      }
    }
    globalObserver = new MutationObserver(handleMutation);
    globalObserver.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });
  } else if (value === false || localStorage.getItem('autoClick') == 'false') {
    localStorage.setItem('autoClick', 'false')
    if (globalObserver) {
      globalObserver.disconnect();
      globalObserver = null;
    }
  }
}
watchStatus()
})()