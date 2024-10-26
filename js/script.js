window.addEventListener('DOMContentLoaded', () => {

    // Welcome to the game
    const start = document.querySelector('.start');
    const welcome = document.querySelector('.welcome');
    const inputValue = document.querySelector('.input__name');
    const player = document.querySelector('.player');
    const table = document.querySelector('.local__table');
    /* localStorage.clear(); */
    let playerName;
    start.addEventListener('click', () => {
        welcome.style.transform = 'rotateY(90deg)';
        playerName = inputValue.value;
        player.innerHTML = `<div class="player">Player - ${playerName}</div>`;


        // создаем обьект из ключей и значений в LocalStarage
        let objWithPlayers = {};
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (typeof JSON.parse(localStorage.getItem(localStorage.key(i)))[0] === 'undefined' || (JSON.parse(localStorage.getItem(localStorage.key(i)))[0].score === undefined && JSON.parse(localStorage.getItem(localStorage.key(i)))[0].name === undefined)) {
                continue;
            } else {
                let score = JSON.parse(localStorage.getItem(localStorage.key(i)))[0].score;
                let name = JSON.parse(localStorage.getItem(localStorage.key(i)))[0].name;
                objWithPlayers[key] = {score, name}; // делаем обьект где ключ число - номер игрока и значение его имя и счёт
            }
            
        }

        let arrPlayers = Object.values(objWithPlayers); // делаем массив из объекта
        let sortArrPlayers = arrPlayers.sort((player1, player2) => player1.score > player2.score ? 1 : -1); // сортируем по значению score
        sortArrPlayers = arrPlayers.sort((player1, player2) => player1.score - player2.score); // сортируем чтобы 26 не было меньше 3
        /* if(sortArrPlayers.length === 10) {  надо продумать логику - добавляется, сравнивается, удаляется последний из сортированного массива
            sortArrPlayers = sortArrPlayers.slice(0, 10);
            localStorage.removeItem(localStorage.length);
        } */

        // Каждый раз обнуляем и создаем новые данные
        table.innerHTML = ' ';
        for (let i = 0; i < sortArrPlayers.length; i++) {
            createTablePlayers(sortArrPlayers[i].name, sortArrPlayers[i].score);
        }

        
        function createTablePlayers(name, score) {
            let liCard = document.createElement('li');
            liCard.classList.add('final__score');
            liCard.innerText = `${name} - ${score}`;

            table.append(liCard);
        }


        setTimeout(() => {
            welcome.style.display = 'none'
        }, 300);
    })
    
    const overlay = document.querySelector('.overlay');

    //bureger rating 
    const rating = document.querySelector('.rating'),
          ratingScore = document.querySelector('.rating__score');
    function openBurgerRating() {
        ratingScore.classList.add('open__rating');
        overlay.style.display = 'block';
    }
    rating.addEventListener('click', openBurgerRating);

    const crossRating = document.querySelector('.rating__close');
    function closeBurgerRating() {
        ratingScore.classList.remove('open__rating');
        overlay.style.display = 'none';
    }
    rating.addEventListener('click', (e) => {
        if (e.target === crossRating) {
            closeBurgerRating();
        };
    })
    document.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeBurgerRating();
        }
    })

    

    // Game Memory cards
    const cards = document.querySelectorAll('.game__card');
    const backCard = document.querySelectorAll('.game__back');
    let arrBackCards = [];
    backCard.forEach((item) => {
        arrBackCards.push(item);
    });

    const srcImg = [
        {
            'src': 'img/barashik.png'

        },
        {
            'src': 'img/barashik.png'
        },
        {
            'src': 'img/croshik.png'
        },
        {
            'src': 'img/croshik.png'
        },
        {
            'src': 'img/eg.png'
        },
        {
            'src': 'img/eg.png'
        },
        {
            'src': 'img/nysha.png'
        },
        {
            'src': 'img/nysha.png'
        },
        {
            'src': 'img/panda.png'
        },
        {
            'src': 'img/panda.png'
        },
        {
            'src': 'img/tiger.png'
        },
        {
            'src': 'img/tiger.png'
        },
        {
            'src': 'img/fish.png'
        },
        {
            'src': 'img/cat.png'
        },
        {
            'src': 'img/fish.png'
        },
        {
            'src': 'img/cat.png'
        },
        {
            'src': 'img/bird.png'
        },
        {
            'src': 'img/baby.png'
        },
        {
            'src': 'img/bird.png'
        },
        {
            'src': 'img/baby.png'
        },
    ]

    const sounds = [
        {
            'src': 'audio/false.mp3'
        },
        {
            'src': 'audio/true.mp3'
        },
        {
            'src': 'audio/winner.mp3'
        }
    ]
    const audio = new Audio();
    function playAudio(src) {
        audio.src = src;
        audio.volume = 0.5;
        audio.play();
    }


    // функция создания рандомного числа из заданного диапазона
    function getRandomIndex(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    // функция создания массива из рандомных чисел
    function createRandomArray() {
        let arr = [getRandomIndex(0, 20)];
        let index;
        while(arr.length !== 20) {
            index = getRandomIndex(0, 20)
            if (arr.includes(index)) {
                continue;
            } else {
                arr.push(index);
            }
        }
        return arr;
    }
    const arrRandom = createRandomArray(); // получили массив рандомных чисел

    // через рандомный массив получаем id и создаем новые карточки. После каждой перезагрузки разные
    cards.forEach((item, id) => {
        let randomIndex = arrRandom[id];
        item.children[0].children[0].src = srcImg[randomIndex].src;
    })

    let flagCard = false;
    let firstCard,
        secondCard;

    function openCard() {
        /* console.log(this.children[0].children[0]) */ // путь к картинке

        this.children[1].classList.add('close');
        this.children[0].classList.add('open');

        if (flagCard === false) {
            flagCard = true; // запоминаем первую карту и ставим флаг
            firstCard = this; 
            firstCard.removeEventListener('click', openCard); // чтобы не нажимать на открытую
            return;
        } else {
            secondCard = this; // вторая карта
            flagCard = false; // меняем флаг на false, чтобы дальше карта проходила по условию - как первая карта
            secondCard.removeEventListener('click', openCard); // чтобы не нажимать на открытую
        }

        // отменяем нажатие пока не проверились две карты
        cards.forEach((item) => {
            item.removeEventListener('click', openCard)
        });

        checkCardsifNoPair(firstCard, secondCard);
    }
    
    const score = document.querySelector('.score')
    let countScore = 0;

    function checkCardsifNoPair(first, second) {
        // если не пара то условие в if - закрываем карточки и разрешаем нажимать; если пара условие в else - разрешаем нажимать на все карты, а на открытые запрещаем
        if (first.children[0].children[0].src !== second.children[0].children[0].src) {
            playAudio(sounds[0].src);
            setTimeout(() => {
                first.children[1].classList.remove('close');
                first.children[0].classList.remove('open');
                second.children[1].classList.remove('close');
                second.children[0].classList.remove('open');
                cards.forEach((item) => {
                    item.addEventListener('click', openCard)
                });
            }, 1000);
            countScore += 1;
        } else {
            playAudio(sounds[1].src);
            first.removeEventListener('click', openCard);
            second.removeEventListener('click', openCard);
            cards.forEach((item) => {
                item.addEventListener('click', openCard)
            });
            countScore += 1;
        }
        score.innerHTML = `<div class="score">Number of moves ${countScore}</div>`;
        ifOpenAllcards(playerName, countScore);
    }
    /* localStorage.clear(); */

    cards.forEach((item) => {
        item.addEventListener('click', openCard)
    });
    function ifOpenAllcards(name, count) {
        if (arrBackCards.every((item) => item.classList.contains('open'))) {
            console.log('все открыты');
            const person = [
                {
                name: `${playerName}`,
                score: `${countScore}`
                },
            ]
            // отправляем 10-ку в LocalStorage
            let cur = 1;
            for (let i = cur; i <= cur; i++) { 
                
                if (JSON.parse(localStorage.getItem('count') === null)) {
                    save(1, person);
                    save('count', 2)
                    break;
                } else if (JSON.parse(localStorage.getItem('count') === '2')) {
                    save(2, person);
                    save('count', 3)
                    break;
                } else if (JSON.parse(localStorage.getItem('count') === '3')) {
                    save(3, person);
                    save('count', 4)
                    break;
                } else if (JSON.parse(localStorage.getItem('count') === '4')) {
                    save(4, person);
                    save('count', 5)
                    break;
                } else if (JSON.parse(localStorage.getItem('count') === '5')) {
                    save(5, person);
                    save('count', 6)
                    break;
                } else if (JSON.parse(localStorage.getItem('count') === '6')) {
                    save(6, person);
                    save('count', 7)
                    break;
                } else if (JSON.parse(localStorage.getItem('count') === '7')) {
                    save(7, person);
                    save('count', 8)
                    break;
                } else if (JSON.parse(localStorage.getItem('count') === '8')) {
                    save(8, person);
                    save('count', 9)
                    break;
                } else if (JSON.parse(localStorage.getItem('count') === '9')) {
                    save(9, person);
                    save('count', 10)
                    break;
                } else if (JSON.parse(localStorage.getItem('count') === '10')) {
                    save(10, person);
                    save('count', 11)
                    break;
                } else if (JSON.parse(localStorage.getItem('count') === '11')) {
                    localStorage.clear(); // обнулит, и начнется новый список из 10
                    save(11, person);
                    break;
                }
            }

            function save(id, data) {
                localStorage.setItem(id, JSON.stringify(data));
            }

            openWinnerWindow(name, count);
        }
    }

    function openWinnerWindow(name, count) {
        playAudio(sounds[2].src);
        const divCard = document.createElement("div");
        divCard.classList.add("finish");
        divCard.innerHTML = `<div class="finish">
                        <img src="icons/cross.svg" alt="cross" class="croos__img">
                            <div class="thanks"><span class="thanks__text">Congratulations ${name}!!! You have opened all the cards.<br><br>Your number of moves - ${count}</span></div>
                        </div>`;
        divCard.style.zIndex = '1000';
        document.querySelector('body').append(divCard);
        document.querySelector('body').style.overflow = "hidden";
        overlay.style.display = 'block';

        const close = document.querySelector('.croos__img');
        close.addEventListener('click', (e) => {
            if (e.target === close) {
                closeModal(divCard);
            }
    })
    document.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal(divCard);
        }
    })
    document.addEventListener('keydown', (e) =>{
        if (e.code === "Escape") {
            closeModal(divCard);
        };
    })
}

    // функция удаления модального окна - картинки
    function closeModal(card) {
        card.remove();
        document.querySelector('body').style.overflow = "visible";
        overlay.style.display = 'none';
        location.reload();
    }
})
