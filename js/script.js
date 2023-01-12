$(document).ready(function () {
  slideIndex = 0;
  setInterval(() => {
    $('.scene').eq(slideIndex).fadeOut(800);
    slideIndex==2?slideIndex=0:slideIndex++;
    $('.scene').eq(slideIndex).delay(800).fadeIn(800);
  }, 4000);

  var navFlag = 0;
  $(document).scroll(function () {
    var dist = $(this).scrollTop();
    if(dist>300&&navFlag==0) {
      $('header>nav').addClass('fixedNav');
      $('header>nav>.inner').css('margin-top', 20);
      $('.gnb>li>a').addClass('fixedGnb');
      $('.submenu a').addClass('fixedSubmenu');
      navFlag=1;
    }
    if(dist<300&&navFlag==1) {
      $('header>nav').removeClass('fixedNav');
      $('header>nav>.inner').css('margin-top', 50);
      $('.gnb>li>a').removeClass('fixedGnb');
      $('.submenu a').removeClass('fixedSubmenu');
      navFlag=0;
    }

    var winH = $(window).height()*0.6;
    $('.sc-effect').each(function(){
      var offset = $(this).offset().top;
      if(dist+winH>=offset) {
        $(this).css({opacity: 1, transform: 'scale(1)'});
      }
    });
  });

  //아이템 슬라이드
  $('.itemSlide').css({height: $('.item').height()}); //.item의 높이를 .itemSlide에게 적용한다.
  var itemW = $('.item').width()+10; //.item의 너비를 구하여 여백 10을 더해준다.
  var itemCnt = $('.item').length - 1; //.item의 개수를 구하여 인덱스 번호에 맞게 1을 빼준다.
  // .item을 일렬로 배치하낟. 간격은 item의 너비에 여백 10을 더한 값
  $('.item').each(function(index){
    // 인텍스 번호를 이용하여 위치를 조정한다.
    $(this).css({left: index*itemW});
  });

  itemSlide(); //함수를 호출한다.
  //함수를 정의한다.
  function itemSlide(){
    is = setInterval(function(){
      $('.item').each(function(){
        $(this).animate({left: '-='+itemW}); //itmeW 만큼씩 왼쪽으로 상대적 애니메이션을 한다.
        if(parseInt($(this).css('left'))==0){
          //.item의 현재 위치가 부모의 왼쪽에 맞닿아 있으면, 왼쪽으로 이동한 후에 맨 끝의 위치로 이동
          $(this).animate({left: itemW*itemCnt}, 0);
        }
      });
    }, 3000);
  }
  $('.itemSlide').hover(function () {
      console.log(is);
      clearInterval(is);
    }, function () {
      itemSlide();
    }
  );
  $('.item_prev').click(function () { 
    $('.item').each(function(){
      $(this).stop(false, true);
      if(parseInt($(this).css('left'))>=itemW*itemCnt-1){
        $(this).animate({left: -itemW}, 0);
      }
      $(this).animate({left: '+='+itemW});
    });
  });
  $('.item_next').click(function () { 
    $('.item').each(function(){
      $(this).stop(false, true).animate({left: '-='+itemW});
      if(parseInt($(this).css('left'))==0){
        $(this).animate({left: itemW*itemCnt}, 0);
      }
    });
  });

  $('.itemSlide').on('touchstart', function(e){
    startX = e.originalEvent.touches[0].pageX;
  });
  $('.itemSlide').on('touchend', function(e){
    var endX = e.originalEvent.changedTouches[0].pageX;
    var dist = startX-endX;
    if(dist<-120) {
      $('.item_prev').trigger('click');
    };
    if(dist>120) {
      $('.item_next').trigger('click');
    };
  });

  $('.itemSlide').on('mousedown', function(e){
    startX = e.pageX;
  });
  $('.itemSlide').on('mouseup', function(e){
    var endX = e.pageX;
    var dist = startX-endX;
    if(dist<-300) {
      $('.item_prev').trigger('click');
    };
    if(dist>300) {
      $('.item_next').trigger('click');
    };
  });
});