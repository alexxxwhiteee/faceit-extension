(function (){

  async function faceitData(name) {

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
    
     
      let matchesUrl = `https://open.faceit.com/data/v4/players/${data.player_id}/games/cs2/stats?limit=5`
      const matches = await fetch(matchesUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`
        }
      })
      const matchesData = await matches.json()
      for (match of matchesData.items){

        const nickname = match.stats.Nickname;
        const { Result, Kills, Deaths } = match.stats;

          if (!allPlayersData[nickname]) {
            allPlayersData[nickname] = [];
          }

          if (allPlayersData[nickname].length == 5){
            allPlayersData[nickname].splice(0)
          }

          allPlayersData[nickname].push({
            Result,
            Kills,
            Deaths
          });
          // console.log(allPlayersData)
      } 
    
    }

let allPlayersData = {};

let matchStatusObserver = null
let matchClickEnabled = false

let statisticStatusObserver = null
let statisticEnabled = false

let coloredStatisticObserver = null
let coloredStatisticEnabled = false



chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'matchConfirmation') {
    matchClickEnabled = message.value
    localStorage.setItem('matchConfirmation', message.value)
    matchConfirmationStatus(matchClickEnabled)
  } else if (message.action === 'advancedStatistic') {
    statisticEnabled = message.value
    localStorage.setItem('advancedStatistic', message.value)
    statisticStatus(statisticEnabled)
  } else if (message.action === 'coloredStatistic') {
    statisticEnabled = message.value
    localStorage.setItem('coloredStatistic', message.value)
    coloredStatistic(coloredStatisticEnabled)
  }
});

function matchConfirmationStatus(value) {
  if (value === true || localStorage.getItem('matchConfirmation') == 'true') {
    localStorage.setItem('matchConfirmation', 'true')
    if (matchStatusObserver) {
      return;
    }
    function handleMutation(mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          for (let addedNode of mutation.addedNodes) {
            // if (addedNode instanceof HTMLElement && addedNode.classList.contains(''))
            if (addedNode instanceof HTMLElement) {
                 let matchModalWindow = addedNode.querySelector('[id^="radix-"]')
                 let matchButton = matchModalWindow?.lastElementChild?.firstElementChild;
                    if (matchButton) {
                  setTimeout(() => {
                    matchButton.click();
                  }, 3000);
                  localStorage.setItem('copiedIp', 'false')
                }
              

                 if (localStorage.getItem('copiedIp') != 'true'){
                let serverWindow = addedNode.getElementsByClassName('ConnectOptions__Option-sc-91da56f9-0')[0];
                if (serverWindow){
                let serverIp = serverWindow.lastElementChild.lastElementChild
                  setTimeout(() => {
                    serverIp.click();
                  }, 1000);
                  localStorage.setItem('copiedIp', 'true')
                }
              }
            }
           }
        }
      }
    }
    matchStatusObserver = new MutationObserver(handleMutation);
    matchStatusObserver.observe(document.body, { childList: true, subtree: true});
  } else if (value === false || localStorage.getItem('matchConfirmation') == 'false') {
    localStorage.setItem('matchConfirmation', 'false')
    if (matchStatusObserver) {
      matchStatusObserver.disconnect();
      matchStatusObserver = null;
    }
  }
}

function statisticStatus(value) {
  if (value === true || localStorage.getItem('advancedStatistic') == 'true') {
    localStorage.setItem('advancedStatistic', 'true')
    if (statisticStatusObserver) {
      return;
    }
    function handleMutation(mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          for (let addedNode of mutation.addedNodes) {
            if (addedNode instanceof HTMLElement) {
              

                setTimeout(() => {
                let teamPlayers = addedNode.getElementsByClassName('styles__CardContainer-sc-fcb21d83-1')[0];
                if (teamPlayers){
                let userName = teamPlayers.firstElementChild.firstElementChild.lastElementChild.firstElementChild.firstElementChild.children[1].firstElementChild.textContent
                localStorage.setItem('userName', userName)
                checkUser()
                }
               }, 3000)




                let sideBar = addedNode.getElementsByClassName('styles__TopContent-sc-f45136ac-2')[0];
                if (sideBar){
                let sideSection = sideBar.firstElementChild

                let userSideSection = document.createElement("div")
                userSideSection.className = 'userSideStatSection'

                // localStorage.setItem('userLvl', 5)
                // localStorage.setItem('userElo', 1337)

                let userElo = localStorage.getItem('userElo')
                if (!userElo){
                  userSideSection.style.height = '30px';
                  userSideSection.style.justifyContent = 'space-around';
                  const userLoader = document.createElement("div")
                  userLoader.className = 'user-loader'
                  userSideSection.appendChild(userLoader)
                  sideSection.insertAdjacentElement('afterend', userSideSection)
                } else {
                  let skillLvl = localStorage.getItem('userLvl')
                  let elo = localStorage.getItem('userElo')
                  userSideSection.style.height = '80px';
                  userSideSection.style.justifyContent = 'space-between';

                  const skillLvlImg = document.createElement("img")
                  skillLvlImg.src = chrome.runtime.getURL(`skillLvlImages/${skillLvl}.svg`)
                  skillLvlImg.className = 'skill-lvl-img'
                  userSideSection.appendChild(skillLvlImg)

                  const eloLvl = document.createElement("div")
                  eloLvl.className = 'elo-lvl'
                  eloLvl.innerText = `${elo}`
                  userSideSection.appendChild(eloLvl)

                  sideSection.insertAdjacentElement('afterend', userSideSection)

                }
              }


                  (async () => {
                  

                  let playersNames = addedNode.getElementsByClassName('Nickname__Container-sc-20a28656-0');
                  let playersBars = addedNode.getElementsByClassName('ListContentPlayer__Background-sc-b2e37a95-0');
                  let playersCardsHover = addedNode.getElementsByClassName('ListContentPlayer__Holder-sc-b2e37a95-1')
                  let playersCards = addedNode.getElementsByClassName('RosterPlayer__PlayerCardContainer-sc-ca577666-11')
                  let namesArray = []
                  if (playersNames.length > 0 && playersBars.length > 0 && playersCardsHover.length > 0 && playersCards.length > 0) {
                  for (let i = 0; i<10; i++){
                    
                    let playerCard = playersCards[i]
                    playerCard.style.zIndex = '1000'
                    
                    let playerCardHover = playersCardsHover[i]
                    playerCardHover.addEventListener("mouseover",function() {
                      this.style.backgroundColor = 'rgb(18, 18, 18)';
                   })
                    playerCardHover.addEventListener("mouseout",function() {
                      this.style.backgroundColor = 'transparent';
                  })
                
                    
                    let playerBar = playersBars[i]

                    let name = playersNames[i].firstElementChild.textContent
                    namesArray.push(name)

                    let playerMatches = document.createElement("div")
                      playerMatches.className = 'playerMatches'

                      const loader = document.createElement("span")
                        loader.className = 'loader'
                        playerMatches.appendChild(loader)
                        playerBar.appendChild(playerMatches)
                  }

                  
                  const dataPromises = Array.from(namesArray.map(name => 
                       faceitData(name)))

                    await Promise.allSettled(dataPromises)

                  for (let i = 0; i<10; i++){

                      let name = playersNames[i].firstElementChild.textContent
                    
                      let playerBar = playersBars[i].lastElementChild

                      if (allPlayersData[name]) {
                        const loader = playerBar.querySelector('.loader');
                        loader.remove()
                        playerBar.style.zIndex = '1100'
                      for (let j=0; j<5; j++){
                      let playerMatch = document.createElement("div")
                      playerMatch.className = 'playerMatch'
                      
                      const win = document.createElement("span")
                      win.className = 'win'
                      win.textContent = 'W'
                      const lose = document.createElement("span")
                      lose.className = 'lose'
                      lose.textContent = 'L'

                      playerMatch.innerHTML = `${allPlayersData[name][j].Result === '1' ? win.outerHTML : lose.outerHTML} ${allPlayersData[name][j].Kills}/${allPlayersData[name][j].Deaths}`;
                      playerBar.appendChild(playerMatch)
                      }
                    } 
                } 
              }
            })()
            }
          }
        }
      }
    }
    statisticStatusObserver = new MutationObserver(handleMutation);
    statisticStatusObserver.observe(document.body, { childList: true, subtree: true});
  } else if (value === false || localStorage.getItem('advancedStatistic') == 'false') {
    localStorage.setItem('advancedStatistic', 'false')
    if (statisticStatusObserver) {
      statisticStatusObserver.disconnect();
      statisticStatusObserver = null;
    }
  }
}

function coloredStatistic(value) {
  if (value === true || localStorage.getItem('coloredStatistic') == 'true') {
    localStorage.setItem('coloredStatistic', 'true')
    if (coloredStatisticObserver) {
      return;
    }
    function handleMutation(mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          for (let addedNode of mutation.addedNodes) {
            if (addedNode instanceof HTMLElement) {
                
              let players = addedNode.getElementsByClassName('RosterPlayerStatsV2__Row-sc-5df27d52-2');
              let playersStatBar = addedNode.getElementsByClassName('RosterPlayerStatsV2__Container-sc-5df27d52-0');
              if (players.length > 0 && playersStatBar.length > 0){
                setTimeout(() => {
                for (let i=0; i<10; i++){

                  let playerStatBar = playersStatBar[i]
                  let playerKillsStat = players[i].lastElementChild.firstElementChild.textContent
                  let playerWinsStat = players[i].firstElementChild.firstElementChild.textContent
                    if (playerKillsStat[0] == 0){
                      playerStatBar.style.border = '1px solid rgba(255, 1, 1, .5)'
                    } else if (playerKillsStat[0] == 1 && playerKillsStat[2] <= 1 && playerWinsStat[0] <= 5 ||
                                playerKillsStat[0] == 1 && playerKillsStat[2] == '/' && playerWinsStat[0] <= 5 ||
                                playerKillsStat[0] == 1 && playerKillsStat[2] == 0 && playerWinsStat[0] <= 5 && playerWinsStat[1] == 0 || 
                                playerKillsStat[0] == 1 && playerKillsStat[2] == '/' && playerWinsStat[0] <= 6 && playerWinsStat[1] == 0 ||
                                playerKillsStat[0] == 1 && playerKillsStat[2] == '0' && playerWinsStat[0] <= 6 && playerWinsStat[1] == 0 ||
                                playerKillsStat[0] == 1 && playerKillsStat[2] >= 2 && playerWinsStat[0] < 5 || 
                                playerKillsStat[0] >= 2 && playerWinsStat[0] <= 4) {
                    playerStatBar.style.border = '1px solid rgba(255, 255, 1, .6)'
                    } else {
                      playerStatBar.style.border = '1px solid rgba(35, 255, 1, .5)'
                    }

                  



                  } }, 1000)
                } 
                  
            }
          }
        }
      }
    }
    coloredStatisticObserver = new MutationObserver(handleMutation);
    coloredStatisticObserver.observe(document.body, { childList: true, subtree: true});
  } else if (value === false || localStorage.getItem('coloredStatistic') == 'false') {
    localStorage.setItem('coloredStatistic', 'false')
    if (coloredStatisticObserver) {
      coloredStatisticObserver.disconnect();
      coloredStatisticObserver = null;
    }
  }
}

matchConfirmationStatus()
statisticStatus()
coloredStatistic()

function checkUser(){
  let userName = localStorage.getItem('userName')
  // let userElo = localStorage.getItem('userElo')
  // let userLvl = localStorage.getItem('userLvl')

  chrome.runtime.sendMessage({ action: 'userName', value: userName })

  

}

})()