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