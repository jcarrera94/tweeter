/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(() => {

  let $container = $('#tweet-container');
  let $post = $('.post');
  let textarea = $('#new-tweet-textbox');
  let $counter = $('.counter');

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  
  const elapseTime = function (data) {
    let timeDiff = new Date().getTime() - new Date(data).getTime();
    let seconds = timeDiff / 1000;
    let time = seconds;
  
    if (seconds > 60 * 60 * 24 * 7 * 52) {
      time = Math.floor(seconds / 52 / 7 / 24 / 60 / 60);
      return `${time} year${time > 1 ? 's' : ''} ago`;
    } else if (seconds > 60 * 60 * 24 * 7) {
      time = Math.floor(seconds / 7 / 24 / 60 / 60);
      return `${time} week${time > 1 ? 's' : ''} ago`;
    } else if (seconds > 60 * 60 * 24) {
      time = Math.floor(seconds / 24 / 60 / 60);
      return `${time} day${time > 1 ? 's' : ''} ago`;
    } else if (seconds > 60 * 60) {
      time = Math.floor(seconds / 60 / 60);
      return `${time} hour${time > 1 ? 's' : ''} ago`;
    } else if (seconds > 60 ) {
      time = Math.floor(seconds / 60);
      return `${time} minute${time > 1 ? 's' : ''} ago`;
    } else if (seconds < 60) {
      time = Math.floor(seconds);
      return `${time >= 1 ? time : 1 } second${time > 1 ? 's' : ''} ago`;
    }
  }
  
  const renderTweets = function(tweets) {
    $container.empty();
    $counter.text('140');
    for (let i of tweets) {
      $container.prepend(createTweetElement(i));
    }
  }
  
  const createTweetElement = function(tweet) {
    let timeCreated = elapseTime(tweet.created_at);
  
    let newTweet = `
    <article class="tweets">
           <header>
             <div>
                <img class="avatar" src=${tweet.user.avatars}>
                <h4 class="padding">${tweet.user.name}</h4>
             </div>
             <div class="tag">${tweet.user.handle}</div>
           </header>
           <p>${escape(tweet.content.text)}</p>
           <footer>
             <div>${timeCreated}</div>
             <div class="icons">
                <i class="fas fa-flag padding"></i>
                <i class="fas fa-retweet padding"></i>
                <i class="fas fa-heart padding"></i>
             </div>
           </footer>
        </article>`;
    return newTweet;
  }

  let loadTweets = async () => {
    
    try {
      const response = await $.ajax({
        url: '/tweets',
        type: 'GET',
        dataType: 'JSON'
      })
      
      renderTweets(response);

    } catch (error) {
      console.error(error);
    }

  }

  const isTweetValid = (tweet) => {
    if (!tweet) {
      $('.error').text("Invalid Kiweet, try again!")
      $('.error').fadeIn(400)
      // setTimeout(() => {
      //   $('.error').fadeOut(400);
      // }, 4000);
      return false;
    } else if (tweet.length > 140) {
      $('.error').text("Kiwayyyy too long bud!")
      $('.error').fadeIn(400)
      return false;
    } else {
      $('.error').fadeOut(400)
      return true;
    }
  }

  const refetchTweets = async (url, data) => {
    try {
      await $.ajax({
        url: '/tweets', 
        type: 'POST',
        data: data
      })

      textarea.val('');
      loadTweets();

    } catch (error) {
      console.error(error);
    }
  }
  
  $post.submit( event => {
    event.preventDefault();
    let targteData = $(event.target).serializeArray()[0];
    let actionUrl = event.target.action;
    let data = $(event.target).serialize();

    if(!isTweetValid(targteData.value)) {
      return
    } else {
      refetchTweets(actionUrl, data);
    }
  });

   loadTweets();

});


