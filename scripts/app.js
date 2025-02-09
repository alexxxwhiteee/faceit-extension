    let gameConfirm = false
    const div = document.getElementById("btn-div")
    const slider = document.getElementById("slider")
    const matchText = document.getElementsByClassName('match-confirm__text-state')[0];

    slider.addEventListener("click", function () {
      if (gameConfirm == false){
        gameConfirm = true
        slider.style.left = '49px'
        div.style.boxShadow = '0 0 3px 3px rgb(35, 255, 35)';
        div.style.border = '1px solid rgb(35, 255, 35)';
        matchText.style.color = 'rgb(35, 255, 35)';
        matchText.innerText = 'ENABLED';
      } else {
        gameConfirm = false
        slider.style.left = '-1px'
        div.style.boxShadow = '0 0 3px 3px red';
        div.style.border = '1px solid red';
        matchText.style.color = 'red';
        matchText.innerText = 'DISABLED';
      }
    })
