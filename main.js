// Функция, генерирующая массив парных чисел.
function createNumbersArray(cardsCount) {
    const cardsNumberArray = [];
    for (let i = 1; i <= cardsCount; i++) {
      cardsNumberArray.push(i, i);
    }
    return cardsNumberArray;
  };
  
  // Функция перемешивания массива.
  function shuffle(cardsNumberArray) {
    for (let i = 0; i < cardsNumberArray.length; i++) {
      let randomIndex = Math.floor(Math.random() * cardsNumberArray.length);
  
      let temp = cardsNumberArray[i];
      cardsNumberArray[i] = cardsNumberArray[randomIndex];
      cardsNumberArray[randomIndex] = temp;
    }
  }
  
  const conteiner = document.getElementById("conteiner");
  conteiner.classList.add("conteiner");
  
  function startGame(conteiner, cardsCount) {
      //const cardsNumberArray = [];
    let firstCard = null;
    let secondCard = null;
  
    //Создание массива чисел
    cardsNumberArray = createNumbersArray(cardsCount);
  
    //Перемешивание массива
    shuffle(cardsNumberArray);
  
    //Создание карточек
    for (const cardNumber of cardsNumberArray) {
      let card = document.createElement("div");
      card.textContent = cardNumber;
      card.classList.add("card-close");
  
      //Нажатие на карту
      card.addEventListener("click", function(){
        if (card.classList.contains("card-open") || card.classList.contains("card-match")) {
          return;
        }
  
        setTimeout(() => {
          if (firstCard !== null && secondCard !== null) {
            firstCard.classList.remove("card-open");
            secondCard.classList.remove("card-open");
            firstCard = null;
            secondCard = null;
          }
        }, 1000);
  
        card.classList.add("card-open");
  
        if (firstCard === null) {
          firstCard = card;
        } else {
          secondCard = card;
        };
  
        if (firstCard !== null && secondCard !== null) {
          let firstCardNumber = firstCard.textContent;
          let secondCardNumber = secondCard.textContent;
  
          if (firstCardNumber === secondCardNumber) {
            firstCard.classList.add("card-match");
            secondCard.classList.add("card-match");
          }
        }
  
        if (cardsNumberArray.length === document.querySelectorAll(".card-match").length) {
          let button = document.createElement("button");
          button.textContent = "Сыграть еще раз";
          button.classList.add("btn");
          
          button.addEventListener("click", function(){
            conteiner.innerHTML = "";
            let cardsCount = Number(prompt("Введите количество пар"));
            startGame(conteiner, cardsCount);
          });
          
          conteiner.append(button);
        }
      })
  
      conteiner.append(card);	
    }
  };
  
  let cardsCount = Number(prompt("Введите количество пар"));
  startGame(conteiner, cardsCount);
