;
svg4everybody();

/*
$(window).on("load", function(){
  console.log('load')
  var sections = $('.section');
  sections.each(function(){
    $(this).addClass('section_active')
  })
});
*/

//SLIDER
$('.slider__feedback-slides').slick({
  infinite: false,
  prevArrow: '.slider__prev-btn',
  nextArrow: '.slider__next-btn'
});


//DROPDOWN
(function() {
var navBtn = document.getElementById('toggle-navigation-btn'),
    navCloseBtn = document.getElementById('navCloseBtn'),
    mainNav = document.getElementById('mainNav'),
    mainNavItems = document.querySelectorAll('.nav__item');

navBtn.onclick = function() {
	mainNav.classList.toggle('nav_open')
}

navCloseBtn.onclick = function() {
  for(var i=0; i<mainNavItems.length; i++){
    mainNavItems[i].classList.remove('nav__item_active')
  };
  mainNav.classList.remove('nav_open')
}


mainNav.onclick = function(e) {
  var target = e.target;
  while(target != mainNav){
    if(target.classList.contains('nav__item')){
      for(var i=0; i<mainNavItems.length; i++){
        mainNavItems[i].classList.remove('nav__item_active')
      }
      target.classList.add('nav__item_active')
      break;
    } else {
      target = target.parentNode;
    }
  }
}
}());

//TABS
(function(){
  var tabsBox = document.getElementById('tabs'),
      tabsBtn = document.querySelectorAll('.tabs__btn'),
      tabContent = document.querySelectorAll('.tabs-content');
  tabsBox.onclick = function(e){
    var target = e.target;
    while(target != tabsBox){
      if(target.classList.contains('tabs__btn')){
        break;
      } else {
        target = target.parentNode;
      }
    }
    var data = target.getAttribute('data-tab');



    for(var i=0; i<tabsBtn.length; i++){
      tabsBtn[i].classList.remove('tabs__btn_active');
    }
    target.classList.add('tabs__btn_active')


    for(var i=0; i<tabContent.length; i++){
      tabContent[i].classList.remove('tabs-content_active');
    }
    document.getElementById(data).classList.add('tabs-content_active');
  }
}());


//CHOOSE CURRENCY
(function(){
  var chooseCurrencyBtns = document.querySelectorAll('.form__choose-btn');
  [].forEach.call(chooseCurrencyBtns, function(item){
    item.onclick = function(e) {
      var target = e.target;
      if(target != this){
        target = target.parentNode;
      }
      target.parentNode.classList.add('form__group_active');
    }
  })


  var currencyItemsContainer = document.querySelectorAll('.choose-currency__list');
  [].forEach.call(currencyItemsContainer, function(item){
    item.onclick = chooseCurrency(item);
  })
  function chooseCurrency(container){
    var allCurrencyItems = container.querySelectorAll('.choose-currency__item');
    [].forEach.call(allCurrencyItems, function(item){
      item.onclick = function(e){
        var target = e.target;
        if(target != this){
          target = target.parentNode;
        }
        for(var i=0; i<allCurrencyItems.length; i++){
          allCurrencyItems[i].classList.remove('choose-currency__item_chosen')
        }
        target.classList.add('choose-currency__item_chosen');
        getChosenCurrencyDetails(target);
      }
    })

  }
  function getChosenCurrencyDetails(item){
    var data = item.getAttribute('data-currency');
    while(!item.classList.contains('form__group')){
      item = item.parentNode;
    }
    var chooseBtn = item.querySelector('.form__choose-text');
    chooseBtn.innerHTML = data;
    item.classList.remove('form__group_active');

  }
}());


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
        setTimeout(shown, Math.random() * 2000);
      }, 2000);

    }, Math.random() * 5000)

}());


//CUSTOM VIDEO CONTROLS
(function() {
  var video = document.getElementById('video'),
      videoPlayBtn = document.getElementById('playBtn'),
      videoPauseBtn = document.getElementById('pauseBtn'),
      videoTitle = document.querySelector('.video__title');
      video.controls = false;
      videoPlayBtn.onclick = function() {
        videoTitle.classList.add('video__title_hidden');
        this.classList.add('video__playBtn_hidden');
        videoPauseBtn.classList.remove('video__pauseBtn_hidden');
        video.play();
      };

  videoPauseBtn.onclick = function() {
    videoTitle.classList.remove('video__title_hidden');
    this.classList.add('video__pauseBtn_hidden');
    videoPlayBtn.classList.remove('video__playBtn_hidden');
    video.pause();
  };
}());


//FORM VALIDATION
(function () {
        $('.user-form').each(function () {
            $(this).on('submit', function () {
                $(this).validate({
                    rules: {
                        email: 'required',
                        password: 'required'
                    },
                    messages: {
                        email: 'Введите корректный email',
                        password: 'Введите корректный пароль'
                    },
                    errorPlacement: function (error, element) {
                        element.attr("placeholder", error[0].outerText);
                    }
                });
              /*  if ($(this).valid()) {
                    let wrap = $(this)[0].closest('.form-hide-on-success');
                    console.log(wrap);
                    if (wrap) {
                        $(wrap).siblings('.form-success').show();
                        $(wrap).hide();
                    }
                }*/
              if($(this).valid()){
                $('#register-form-btn').prop('disabled', true);
                var data = $(this).serialize();
                $.ajax({
                  method: 'GET',
                  url: 'http://jsonplaceholder.typicode.com/posts',
                  data: data,
                  success: function(){
                    console.log(true)
                  },
                  error: function(){
                    console.log(false)
                  },
                  complete: function(){
                    $('#register-form-btn').prop('disabled', false);
                  }
                })
              }
                return false;
            })
        });
}());


//LOGIN or REGISTER WINDOW OPEN/CLOSE
(function(){
  var openRegisterWindow = document.getElementById('user-signInUp-openBtn'),
      closeBtn = document.getElementById('user-signInUp-closeBtn'),
      userSignInUpWindow = document.querySelector('.s-register'),
      userSignInUpWindowPic = document.querySelector('.s-register__picture-block'),
      userSignInUpWindowForm = document.querySelector('.s-register__form-block')

  openRegisterWindow.onclick = function(){
    userSignInUpWindow.classList.add('s-register_active')
    userSignInUpWindowPic.classList.remove('s-register__picture-block_disabled')
    userSignInUpWindowForm.classList.remove('s-register__form-block_disabled')
    userSignInUpWindowPic.classList.add('s-register__picture-block_active')
    userSignInUpWindowForm.classList.add('s-register__form-block_active')
  }
  closeBtn.onclick = function(){
    setTimeout(function(){
      userSignInUpWindow.classList.remove('s-register_active');
    },500)
    userSignInUpWindowPic.classList.remove('s-register__picture-block_active')
    userSignInUpWindowPic.classList.add('s-register__picture-block_disabled')
    userSignInUpWindowForm.classList.remove('s-register__form-block_active')
    userSignInUpWindowForm.classList.add('s-register__form-block_disabled')


  }
}());
