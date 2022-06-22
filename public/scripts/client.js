/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const load = function () {
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/tweets",
  }).then(function (tweet) {
    renderTweets(tweet);
    //resets the form
    document.querySelector(".form").reset();
  });
};

// $(".form").submit(function (event){
//   event.preventDefault();
//   // const newTweet = event.target[0].value;
//   $.ajax({
//     method: "POST",
//     url: "http://localhost:8080/tweets",
//     data: $(this).serialize()
//   }).then(function () {
//     load();
//   });
// });

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const $tweets_container = $('#tweets_container');
  for (const i of tweets) {
    $tweets_container.prepend(createTweetElement(i));

    
  }
  return $tweets_container;
};

const createTweetElement = function(obj){
  let $tweet = (`
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
          <p>${obj.created_at}</p>
        </div>
        <div class="symbol"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-repeat"></i><i class="fa-solid fa-heart"></i></div>
      </footer>
  </article>`)
  return $tweet;

};






// Test / driver code (temporary). Eventually will get this from the server.
const data = [
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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];



$(document).ready(() => {
  load();
  $(".form").submit(function (event){
    event.preventDefault();
    // const newTweet = event.target[0].value;
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/tweets",
      data: $(this).serialize()
    }).then(function () {
      load();
    });
    $('.counter').text(140);
  });// to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
