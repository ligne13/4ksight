var REVIEW_SELECTOR = ".reviews-page .review-collection-fragment .review";
var ALBUM_LINK_SELECTOR = "a.review__link";
var ARTWORK_DIV_SELECTOR = ".review__artwork";
var SCORE_CIRCLE_SELECTOR = "[class^='ScoreCircle']";

console.log('4KSIGHT');

function fetchAndUpdate() {
  document.querySelectorAll(REVIEW_SELECTOR).forEach((elem, i) => {
    var artDiv = elem.querySelector(ARTWORK_DIV_SELECTOR);
    var reviewLink = elem.querySelector(ALBUM_LINK_SELECTOR).href;

    fetch(reviewLink)
      .then((response) => response.text())
      .then((data) => {
        var parser = new DOMParser();
        var scoreCircle =
          parser.parseFromString(data, "text/html")
            .querySelector(SCORE_CIRCLE_SELECTOR);
        if (scoreCircle) {
          scoreCircle.className += " injected";
          artDiv.appendChild(scoreCircle);
        } else {
          console.log('No element foud with selector ' + SCORE_CIRCLE_SELECTOR);
        }
      });
  });
}

fetchAndUpdate();

const target = document.querySelector('.reviews-page__contents .infinite-container .clearfix');
const config = {attributes: false, childList: true};

function callback(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type == 'childList') {
      fetchAndUpdate();
    }
  }
}

const o = new MutationObserver(callback);
o.observe(target, config);
