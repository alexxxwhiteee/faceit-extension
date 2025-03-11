(function (){







  async function faceitData(name) {
      const apiKey = "8b5747dd-a92d-4aaa-b2a1-b12d4cc299f0";
      try {
      const url = `https://open.faceit.com/data/v4/players?nickname=${name}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`
        }
      });
      const data = await response.json();
      if (!data.player_id) {
        throw new Error(`No player ID : ${name}`);
      }
    
      // console.log(data)
     
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
        // console.log(match.stats.Nickname, match.stats.Result, match.stats.Kills, match.stats.Deaths)

        const nickname = match.stats.Nickname;
        const noNickName = 'NoPlayerID'
        const { Result, Kills, Deaths } = match.stats;
      
          if (!nickname) {
            allPlayersData[noNickName] = [];
          }

          if (!allPlayersData[nickname]) {
            allPlayersData[nickname] = [];
          }

          // Добавляем данные матча
          allPlayersData[nickname].push({
            Result,
            Kills,
            Deaths
          });

          // for (playerData in allPlayersData){
          // let playersBars = document.getElementsByClassName('RosterPlayer__Holder-sc-7122f57c-1');
          //         for (playerBar of playersBars){
          //           if (!playerBar.nextElementSibling || !playerBar.nextElementSibling.classList.contains('playersMatches')){
          //           let playersMatches = document.createElement("div")
          //           playersMatches.className = 'playersMatches'
          //           playersMatches.style.height = '15px';
          //           playersMatches.style.margin = '20px';
                    
                      
          //           let playerMatch = document.createElement("div")
          //           playerMatch.textContent = `${playerData}`;
          //           playerMatch.style.height = '10px';

          //           playersMatches.appendChild(playerMatch)
                      

          //           playerBar.insertAdjacentElement('afterend', playersMatches)
          //         }
          //       }
          // }

          console.log(allPlayersData)
      } 
    } catch (error) {console.log(error.message)}
    }
// try{
// faceitData('0IdschooI')
// } catch {console.log('TOO MANY REQUESTS')}




const allPlayersData = {};



let matchStatusObserver = null
let matchClickEnabled = false

let statisticStatusObserver = null
let statisticEnabled = false

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'matchConfirmation') {
    matchClickEnabled = message.value
    localStorage.setItem('matchConfirmation', message.value)
    matchConfirmationStatus(matchClickEnabled)
  } else if (message.action === 'advancedStatistic') {
    statisticEnabled = message.value
    localStorage.setItem('advancedStatistic', message.value)
    statisticStatus(statisticEnabled)
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
        if (mutation.type === 'childList' || mutation.type === 'substree' || mutation.type === 'attributes' || mutation.type === 'characterData') {
          for (let addedNode of mutation.addedNodes) {
            // if (addedNode instanceof HTMLElement && addedNode.classList.contains(''))
            if (addedNode instanceof HTMLElement) {
              try {
              let matchModalWindow = addedNode.querySelector('[id^="radix-"]')
                 let matchButton = matchModalWindow.lastElementChild.firstElementChild
                  setTimeout(() => {
                    matchButton.click();
                  }, 3000);
                  localStorage.setItem('copiedIp', 'false')
                } catch {}

                try {
                 if (localStorage.getItem('copiedIp') != 'true'){
                let serverWindow = addedNode.getElementsByClassName('ConnectOptions__Option-sc-91da56f9-0')[0];
                 let serverIp = serverWindow.lastElementChild.lastElementChild
                  setTimeout(() => {
                    serverIp.click();
                  }, 100);
                  localStorage.setItem('copiedIp', 'true')
                }
                } catch {} 
              }
            }
          }
        }
      }
    matchStatusObserver = new MutationObserver(handleMutation);
    matchStatusObserver.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });
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
        if (mutation.type === 'childList' || mutation.type === 'subtree' || mutation.type === 'attributes' || mutation.type === 'characterData') {
          for (let addedNode of mutation.addedNodes) {
            if (addedNode instanceof HTMLElement) {
              try {
              let players = addedNode.getElementsByClassName('RosterPlayerStatsV2__Row-sc-5df27d52-2');
                for (player of players){
                  let playerStat = Array.from(player.lastElementChild.firstElementChild.textContent)
                    if (playerStat[0] == 0 && playerStat[2] <= 8){
                      player.style.border = '1px solid red'
                    } else if (playerStat[0] == 0 && playerStat[2] == 9) {
                      player.style.border = '1px solid yellow'
                    } else {
                      player.style.border = '1px solid rgb(35, 255, 1)'
                    }
                  } 
                

                
                  (async () => {

                  let playersNames = addedNode.getElementsByClassName('Nickname__Container-sc-20a28656-0');
                  let playersBars = addedNode.getElementsByClassName('RosterPlayer__Holder-sc-7122f57c-1');
                  for (let i = 0; i<10; i++){
                    try {
                    let name = playersNames[i].firstElementChild.textContent
                    await faceitData(name)
                    let playerBar = playersBars[i]
                    if (!playerBar.nextElementSibling || !playerBar.nextElementSibling.classList.contains('playerMatches')){
                      let playerMatches = document.createElement("div")
                      playerMatches.className = 'playerMatches'
                      playerMatches.style.height = '15px';
                      playerMatches.style.marginLeft = '70px';
                      playerMatches.style.display = 'flex';
                      playerMatches.style.flexDirection = 'row';

                      for (let j=0; j<5; j++){
                      let playerMatch = document.createElement("div")
                      playerMatch.className = 'playerMatch'
                      playerMatch.style.height = '10px';
                      playerMatch.style.marginRight = '5px';
                      
                      const win = document.createElement("span")
                      win.textContent = 'W'
                      win.style.color = 'green'
                      const lose = document.createElement("span")
                      lose.textContent = 'L'
                      lose.style.color = 'red'

                      playerMatch.innerHTML = allPlayersData?.[name]
                      ? `${allPlayersData[name][j].Result === '1' ? win.outerHTML : lose.outerHTML} ${allPlayersData[name][j].Kills}/${allPlayersData[name][j].Deaths}` 
                      : 'No Data';;
                      playerMatches.appendChild(playerMatch)
                      }

                      playerBar.insertAdjacentElement('afterend', playerMatches)
                    }
                  } catch {}
                } 
            })()
                  
              } catch {}
            }
          }
        }
      }
    }
    statisticStatusObserver = new MutationObserver(handleMutation);
    statisticStatusObserver.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });
  } else if (value === false || localStorage.getItem('advancedStatistic') == 'false') {
    localStorage.setItem('advancedStatistic', 'false')
    if (statisticStatusObserver) {
      statisticStatusObserver.disconnect();
      statisticStatusObserver = null;
    }
  }
}

matchConfirmationStatus()
statisticStatus()
})()