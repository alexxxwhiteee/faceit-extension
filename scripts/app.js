const div = document.getElementById("btn-div")
const slider = document.getElementById("slider")
const text = document.getElementById("text")
const matchText = document.getElementsByClassName('match-confirm__text-state')[0];

slider.addEventListener("click", function () {
    if (localStorage.getItem('game') == 'false'){
      localStorage.setItem('game', 'true')
      sliderEnabled()
    } else {
      localStorage.setItem('game', 'false')
      sliderDisabled()
    }
  })

function sliderEnabled(){
    slider.style.left = '99px'
    text.style.left = '110px'
    div.style.boxShadow = '0 0 3px 3px rgb(255, 86, 1), inset 0 0 10px grey';
    div.style.border = '1px solid rgb(255, 86, 1)';
    text.innerText = 'ENABLED';
}

function sliderDisabled(){
      slider.style.left = '-1px'
      text.style.left = '150px'
      div.style.boxShadow = '0 0 3px 3px grey, inset 0 0 10px grey';
      div.style.border = '1px solid grey';
      text.innerText = 'DISABLED';
}

if (localStorage.getItem('game') == 'true'){
    sliderEnabled()
    } else {
    localStorage.setItem('game', 'false')
    sliderDisabled()
  }

