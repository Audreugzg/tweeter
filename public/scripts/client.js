/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(obj){
  let $tweet = `
  <article class="tweet">
      <header>
        <div class="user">
        <img src=${obj.user.avatars}>
        <p>${obj.user.name}</p>
        </div>
        <div>
          <p>${obj.user.handle}</p>
        </div>  
      </header>
      <main>
        <p>
          ${obj.content.text}
        </p>
      </main>
      <footer>
        <div>
          <p>${timeago.format(obj.created_at)}</p>
        </div>
        <div class="symbol"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-repeat"></i><i class="fa-solid fa-heart"></i></div>
      </footer>
  </article>`
  return $tweet;

};

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  
  $('#tweets_container').empty();
  for (const i of tweets) {
    $('#tweets_container').prepend(createTweetElement(i));
  }
  
};

const loadTweets = function () {
  $.ajax({
    method: "GET",
    url: "/tweets/",
  }).then(function (tweet) {
    renderTweets(tweet);
  });
};

$(document).ready(() => {
  loadTweets();  
  $(".form").submit(function (event){
    
    event.preventDefault();
    const info = event.target[0].value;
    console.log(this);
    if (!info) {
      return $(".error").text(` ⚠️ Sorry, you can not make an empty post ⚠️`).slideDown();
  
    }
    if (info.length > 140) {
      return $(".error").text('⚠️ Your Tweet exceeds the max character limit ⚠️').slideDown();
    }
    
    $.ajax({
      method: "POST",
      url: "/tweets/",
      data: $("#tweet-text").serialize(),
    }).then(function () {
      $(".error").hide();
      loadTweets();
    });
    $('#tweet-text').val('');
    $('.counter').text(140);
    
  });

  $("#down_arrow").click(function(){
    $(".new-tweet").slideToggle();
  });
});
