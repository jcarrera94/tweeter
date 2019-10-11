$( document ).ready(() => {
  
  function playAudio() {
    let sound = document.getElementById("audio");
    sound.play();
  }

  $('textarea').on('input', (e) => {

    let wordCount = e.target.value.length;
    let target = $(e.target).parent().find('.counter')
    let newCounter = 140 - wordCount;
    

    if (newCounter <= 0) {
      playAudio();
      $(target).text(newCounter);
      $(target).addClass('belowCounter');
    } else {
      $(target).text(newCounter);
      $(target).removeClass('belowCounter');
    }
  });
});

// toggle new tweet form away
$( document ).ready(() => { 
  $('.navSub').on('click', () => {
    $('.toggle-box').slideToggle('slow');
    $('#new-tweet-textbox').focus();
  })
});

$( document ).ready(() => { 
  $('.button1').click(() => {
    if($(window).width() < 551) {
      $('html').animate({ scrollTop: 175 }, 600);
    } else if ($(window).width() >= 551 && $(window).width() <= 1023) {
      $('html').animate({ scrollTop: 364 }, 600);
    }
    $('.toggle-box').fadeIn(2000);
    $('#new-tweet-textbox').focus();
  })
})


$( document).ready(() => {
  $(document).scroll(() => {
    if ($(this).scrollTop() > 365) {
      $('.button1').fadeIn('slow');
      $('.navSub').fadeOut('slow');
    } else {
      $('.button1').fadeOut('slow');
      $('.navSub').fadeIn('slow');
    }
  })
})
