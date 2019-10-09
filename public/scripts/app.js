/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
let data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$( document ).ready(() => {
  
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
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let i of tweets) {
      $('.container').append(createTweetElement(i));
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
           <p>${tweet.content.text}</p>
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
  
  renderTweets(data);

});


