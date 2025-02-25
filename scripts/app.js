document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('autoClick') == 'true'){
      sliderEnabled()
      } else {
      sliderDisabled()
    }
  });
  
  const div = document.getElementById("btn-div")
  const slider = document.getElementById("slider")
  const text = document.getElementById("text")
  
  slider.addEventListener("click", function () {
      if (localStorage.getItem('autoClick') == 'false'){
        sliderEnabled()
        messageTrue()
      } else {
        sliderDisabled()
        messageFalse()
      }
    })
    
    function sliderEnabled(){
      localStorage.setItem('autoClick', 'true')
      slider.style.left = '99px'
      text.style.left = '110px'
      div.style.boxShadow = '0 0 3px 3px rgb(255, 86, 1), inset 0 0 10px grey';
      div.style.border = '1px solid rgb(255, 86, 1)';
      text.innerText = 'ENABLED';
      text.style.color = 'rgb(255, 86, 1)';
  }

  function messageTrue(){
    chrome.runtime.sendMessage({ action: 'setValue', value: true });
  }
  
  function sliderDisabled(){
      localStorage.setItem('autoClick', 'false')
      slider.style.left = '-1px'
      text.style.left = '150px'
      div.style.boxShadow = '0 0 3px 3px grey, inset 0 0 10px grey';
      div.style.border = '1px solid grey';
      text.innerText = 'DISABLED';
      text.style.color = 'rgb(152, 152, 152)';
  }

  function messageFalse(){
    chrome.runtime.sendMessage({ action: 'setValue', value: false });
  }