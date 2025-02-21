// document.addEventListener('DOMContentLoaded', () => {
//     chrome.storage.local.get(['autoClickEnabled'], (result) => {
//       const isEnabled = result.autoClickEnabled || false;
//       console.log(chrome.storage.local.get(['autoClickEnabled']));
//       console.log('isEnabled:', isEnabled)
//       if (isEnabled === true){
//         sliderEnabled()
//         } else {
//         sliderDisabled()
//       }
//     });
//   });
  
//   const div = document.getElementById("btn-div")
//   const slider = document.getElementById("slider")
//   const text = document.getElementById("text")
  
//   slider.addEventListener("click", function () {
//     chrome.storage.local.get(['autoClickEnabled'], (result) => {
//       const currentState = result.autoClickEnabled || false;
//       if (currentState === false){
//         sliderEnabled()
//       } else {
//         sliderDisabled()
//       }
//     })
//   })

// function sliderEnabled(){
//       localStorage.setItem('autoClickEnabled', 'true')
//       chrome.storage.local.set({ autoClickEnabled: true })
//       chrome.runtime.sendMessage({ action: 'setAutoClick', value: true });
//       slider.style.left = '99px'
//       text.style.left = '110px'
//       div.style.boxShadow = '0 0 3px 3px rgb(255, 86, 1), inset 0 0 10px grey';
//       div.style.border = '1px solid rgb(255, 86, 1)';
//       text.innerText = 'ENABLED';
//       text.style.color = 'rgb(255, 86, 1)';
//   }
  
//   function sliderDisabled(){
//       localStorage.setItem('autoClickEnabled', 'false')
//       chrome.storage.local.set({ autoClickEnabled: false })
//       chrome.runtime.sendMessage({ action: 'setAutoClick', value: false });
//       slider.style.left = '-1px'
//       text.style.left = '150px'
//       div.style.boxShadow = '0 0 3px 3px grey, inset 0 0 10px grey';
//       div.style.border = '1px solid grey';
//       text.innerText = 'DISABLED';
//       text.style.color = 'rgb(152, 152, 152)';
//   }




  document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('game') == 'true'){
      sliderEnabled()
      } else {
      sliderDisabled()
    }
  });
  
  const div = document.getElementById("btn-div")
  const slider = document.getElementById("slider")
  const text = document.getElementById("text")
  
  slider.addEventListener("click", function () {
      if (localStorage.getItem('game') == 'false'){
        sliderEnabled()
      } else {
        sliderDisabled()
      }
    })
    
    function sliderEnabled(){
      localStorage.setItem('game', 'true')
      chrome.runtime.sendMessage({ action: 'setValue', value: true });
      slider.style.left = '99px'
      text.style.left = '110px'
      div.style.boxShadow = '0 0 3px 3px rgb(255, 86, 1), inset 0 0 10px grey';
      div.style.border = '1px solid rgb(255, 86, 1)';
      text.innerText = 'ENABLED';
      text.style.color = 'rgb(255, 86, 1)';
  }
  
  function sliderDisabled(){
      localStorage.setItem('game', 'false')
      chrome.runtime.sendMessage({ action: 'setValue', value: false });
      slider.style.left = '-1px'
      text.style.left = '150px'
      div.style.boxShadow = '0 0 3px 3px grey, inset 0 0 10px grey';
      div.style.border = '1px solid grey';
      text.innerText = 'DISABLED';
      text.style.color = 'rgb(152, 152, 152)';
  }