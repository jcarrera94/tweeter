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
    $('html').animate({ scrollTop: 0 }, 600);
    $('.toggle-box').fadeIn(2000);
    $('#new-tweet-textbox').focus();
  })
})


$( document).ready(() => {
  $(document).scroll(() => {
    if ($(this).scrollTop() > 350) {
      console.log('scrolling after 450')
      $('.button1').fadeIn('slow');
      $('.navSub').fadeOut('slow');
    } else {
      console.log('scrolling below 450')
      $('.button1').fadeOut('slow');
      $('.navSub').fadeIn('slow');
    }
  })
})
