$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('input', function(event) {
    let remainChar = 140 - $(this).val().length;
    $('.counter').text(remainChar);
    if (remainChar < 0) {
      $('.counter').addClass('turnRed');
    }else {
      $('.counter').removeClass('turnRed');
    }
  });
});