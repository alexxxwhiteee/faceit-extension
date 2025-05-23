document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('matchConfirmation') == 'true'){
      matchConfirmationEnabled()
      } else {
      matchConfirmationDisabled()
    }
    if (localStorage.getItem('advancedStatistic') == 'true'){
      advancedStatisticEnabled()
      } else {
      advancedStatisticDisabled()
    }
    if (localStorage.getItem('coloredStatistic') == 'true'){
      coloredStatisticEnabled()
      } else {
      coloredStatisticDisabled()
    }
  });
  
  const matchSlider = document.getElementById("match")
  const matchSliderState = document.getElementById("match-state")
  
  matchSliderState.addEventListener("click", function () {
      if (localStorage.getItem('matchConfirmation') == 'false'){
        matchConfirmationEnabled()
      } else {
        matchConfirmationDisabled()
      }
    })
    
    function matchConfirmationEnabled(){
      localStorage.setItem('matchConfirmation', 'true')
      matchSliderState.style.left = '30px'
      matchSlider.style.boxShadow = '0 0 3px 3px rgb(255, 86, 1), inset 0 0 5px rgb(255, 86, 1)';
      chrome.runtime.sendMessage({ action: 'matchConfirmation', value: true });
  }
  
  function matchConfirmationDisabled(){
      localStorage.setItem('matchConfirmation', 'false')
      matchSliderState.style.left = '0px'
      matchSlider.style.boxShadow = '0 0 3px 3px grey, inset 0 0 5px grey';
      chrome.runtime.sendMessage({ action: 'matchConfirmation', value: false });
  }

  const statisticSlider = document.getElementById("statistic")
  const statisticSliderState = document.getElementById("statistic-state")
  
  statisticSliderState.addEventListener("click", function () {
      if (localStorage.getItem('advancedStatistic') == 'false'){
        advancedStatisticEnabled()
      } else {
        advancedStatisticDisabled()
      }
    })
    
    function advancedStatisticEnabled(){
      localStorage.setItem('advancedStatistic', 'true')
      statisticSliderState.style.left = '30px'
      statisticSlider.style.boxShadow = '0 0 3px 3px rgb(255, 86, 1), inset 0 0 5px rgb(255, 86, 1)';
      chrome.runtime.sendMessage({ action: 'advancedStatistic', value: true });
  }
  
  function advancedStatisticDisabled(){
      localStorage.setItem('advancedStatistic', 'false')
      statisticSliderState.style.left = '0px'
      statisticSlider.style.boxShadow = '0 0 3px 3px grey, inset 0 0 5px grey';
      chrome.runtime.sendMessage({ action: 'advancedStatistic', value: false });
  }

  const coloredStatisticSlider = document.getElementById("colored-statistic")
  const coloredStatisticSliderState = document.getElementById("colored-statistic-state")
  
  coloredStatisticSliderState.addEventListener("click", function () {
      if (localStorage.getItem('coloredStatistic') == 'false'){
        coloredStatisticEnabled()
      } else {
        coloredStatisticDisabled()
      }
    })
    
    function coloredStatisticEnabled(){
      localStorage.setItem('coloredStatistic', 'true')
      coloredStatisticSliderState.style.left = '30px'
      coloredStatisticSlider.style.boxShadow = '0 0 3px 3px rgb(255, 86, 1), inset 0 0 5px rgb(255, 86, 1)';
      chrome.runtime.sendMessage({ action: 'coloredStatistic', value: true });
  }
  
  function coloredStatisticDisabled(){
      localStorage.setItem('coloredStatistic', 'false')
      coloredStatisticSliderState.style.left = '0px'
      coloredStatisticSlider.style.boxShadow = '0 0 3px 3px grey, inset 0 0 5px grey';
      chrome.runtime.sendMessage({ action: 'coloredStatistic', value: false });
  }

  