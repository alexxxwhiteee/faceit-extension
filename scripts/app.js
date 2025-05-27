document.addEventListener('DOMContentLoaded', () => {
const firstTurningOn = localStorage.getItem('matchConfirmation')
if (firstTurningOn == null){
  matchConfirmationEnabled()
  advancedStatisticEnabled()
  coloredStatisticEnabled()
}
})

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

  let backgroundPort = chrome.runtime.connect({ name: "popupPort" });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'userName') {
      let messageValue = message.value
      if (messageValue != undefined){
        localStorage.setItem('userName', message.value);
    }
    checkUser()
  }
});

  backgroundPort.onMessage.addListener(message => {
      if (message.action === 'userName') {
        let messageValue = message.value
      if (messageValue != undefined){
          localStorage.setItem('userName', message.value)
      }
      checkUser()
    }
  });


  async function checkUser() {
    
    try{
     let name = localStorage.getItem('userName')
     if(name){
    

    const apiKey = "8b5747dd-a92d-4aaa-b2a1-b12d4cc299f0";
    
    const url = `https://open.faceit.com/data/v4/players?nickname=${name}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`
      }
    });
    const data = await response.json();
    
    if (Object.keys(data).length > 1){
     
    const userLvl = data.games.cs2.skill_level
    const userElo = data.games.cs2.faceit_elo
    localStorage.setItem('userLvl', userLvl);
    localStorage.setItem('userElo', userElo);
   
    
      const loader = document.getElementById("loader")
      loader.style.display = 'none';

      const user = document.getElementById("user")
      user.style.display = 'flex';

      const lvlImg = document.getElementById("user__img")
      lvlImg.src = `skillLvlImages/${userLvl}.svg`

      const userName = document.getElementById("user__name")
      userName.innerText = `${name}`

      const userSkillElo = document.getElementById("user__elo-text")
      userSkillElo.innerText = `${userElo}`

    }
  
  }
} catch {}
}

const infoButton = document.getElementById("i-button")

infoButton.addEventListener("click", function () {
  const infoDiv = document.getElementById("info")
  infoDiv.style.display = 'flex'
})

const delInfoButton = document.getElementById("info-x-button")
  
delInfoButton.addEventListener("click", function () {
  const infoDiv = document.getElementById("info")
  infoDiv.style.display = 'none'
})

const infoMap = {
  "match-confirm__text": {
    title: "Match confirm",
    body: "You want accept match?"
  },

  "statistic__text": {
    title: "Statistic",
    body: "Here is your statistic"
  },

  "colored-statistic__text": {
    title: "Color",
    body: "Your color"
  },
};

for (const key in infoMap) {
  const element = document.querySelector(`.${key}`);
    element.addEventListener('click', function () {
      const infoDiv = document.getElementById("settings-info")
      infoDiv.style.display = 'flex'

      const lastTextDiv = infoDiv.querySelector('.info-text');
      if (lastTextDiv) {
        lastTextDiv.remove();
      }

      const textDiv = document.createElement("div");
      textDiv.className = "info-text";
      
      
      
      const title = document.createElement("h3");
      title.textContent = infoMap[key].title;
      textDiv.appendChild(title);

      const text = document.createElement("p");
      text.textContent = infoMap[key].body;
      textDiv.appendChild(text);

      infoDiv.appendChild(textDiv)
    });
}

const delSetInfoButton = document.getElementById("settings-info__button")

  delSetInfoButton.addEventListener("click", function () {
  const infoDiv = document.getElementById("settings-info")
      infoDiv.style.display = 'none'
})
