;
svg4everybody();



//SLIDER
$('.slider').slick({
  infinite: false
});



//SHOW TRANSAKTIONS ON THE MAP
(function(){
  var mapInfo = document.querySelectorAll('.map__item'),
  x = 0;
  function makeVisible(){
    mapInfo[x].classList.add('map__item_active');
  }


    setTimeout(function shown() {
      makeVisible();
      setTimeout(function(){
        mapInfo[x].classList.remove('map__item_active');
        if(x < mapInfo.length-1){
          x++;          
        } else {
          x = 0;
        }
        setTimeout(shown, Math.random() * 5000);
      }, 2000);

    }, Math.random() * 5000)

}())
