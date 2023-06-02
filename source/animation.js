document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card');
  let selectedCards = [];
  let lastSelectedCard = null;

  cards.forEach(function (card) {
    card.addEventListener('click', function (event) {
      event.stopPropagation();

      const isActive = card.classList.contains('active');
      const maxSelectedCards = 3;
      const isMaxLimitReached = selectedCards.length >= maxSelectedCards;

      if (!isActive && !isMaxLimitReached) {
        card.classList.add('active');
        selectedCards.push(card);

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const cardWidth = card.offsetWidth;
        const cardHeight = card.offsetHeight;
        const scrollOffset = window.scrollX || window.pageXOffset;
        const cardOffsetLeft = card.getBoundingClientRect().left + scrollOffset;
        const cardOffsetTop = card.getBoundingClientRect().top + window.pageYOffset;
        const cardPositionX = (windowWidth / 2) - (cardWidth / 2) - cardOffsetLeft;
        const cardPositionY = (windowHeight / 2) - (cardHeight / 2) - cardOffsetTop;
        card.style.transform = `translate(${cardPositionX}px, ${cardPositionY}px)`;

        lastSelectedCard = card;

        if (selectedCards.length === maxSelectedCards) {
          showGenerateButton();
          
        }
      } else if (isActive) {
        card.classList.remove('active');
        selectedCards = selectedCards.filter(function (selectedCard) {
          return selectedCard !== card;
        });
        hideGenerateButton();
      }
    });
  });

  document.addEventListener('click', function (event) {
    cards.forEach(function (card) {
      card.classList.remove('active');
      card.style.transform = 'none';
    });

    selectedCards = [];
    lastSelectedCard = null;

    hideGenerateButton();
  });

  function showGenerateButton() {
    const generateButton = document.getElementById('generate-button');
    generateButton.style.display = 'block';
    generateButton.addEventListener('click', function() {
      // Hide all cards
      cards.forEach(function(card) {
        card.style.display = 'none';
      });
  
      // // Show three cards in the middle
      // const startIndex = Math.floor(cards.length / 2) - 1;
      // for (let i = startIndex; i <= startIndex + 2; i++) {
      //   if (cards[i]) {
      //     cards[i].style.display = 'block';
      //   }
      // }
    });
  }

  function hideGenerateButton() {
    const generateButton = document.getElementById('generate-button');
    generateButton.style.display = 'none';
  }
});


$('.cardflip').click(function(){
  $(this).toggleClass('flipped');
});
