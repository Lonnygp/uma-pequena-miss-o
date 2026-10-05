let step = 0;

let found = 0;

let noClicks = 0;

const screens = [
    ...document.querySelectorAll('.screen')
];


function show(n) {

    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    if (screens[n]) {
        screens[n].classList.add('active');
    }

    step = n;

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
    });

    if (n === 6) {
        setTimeout(function() {
            setupLetterScroll();
        }, 50);
    }
}


function next() {

    if (step === 11) {
        finalTransition();
        return;
    }

    const transition =
        document.createElement('div');

    transition.className =
        'phase-transition';

    transition.innerHTML = `
        <div class="transition-symbol">✦</div>
        <div class="transition-text">
            Good boy!
        </div>
        <div class="transition-subtext">
            próximo capítulo...
        </div>
    `;

    document.body.appendChild(transition);

    setTimeout(function() {
        transition.classList.add('show');
    }, 30);

    setTimeout(function() {
        show(step + 1);
    }, 650);

    setTimeout(function() {
        transition.classList.add('hide');
    }, 800);

    setTimeout(function() {
        transition.remove();
    }, 1350);
}


function finalTransition() {

    const transition =
        document.createElement('div');

    transition.className =
        'final-transition';

    transition.innerHTML = `
        <div class="final-stars">✦</div>

        <div class="final-line final-line-1">
            VOCÊ CHEGOU ATÉ AQUI.
        </div>

        <div class="final-line final-line-2">
            TODAS AS PISTAS FORAM ENCONTRADAS.
        </div>

        <div class="final-line final-line-3">
            MAS AINDA FALTA UMA ÚLTIMA RESPOSTA...
        </div>
    `;

    document.body.appendChild(transition);

    setTimeout(function() {
        transition.classList.add('show');
    }, 50);

    setTimeout(function() {
        transition.classList.add('reveal');
    }, 1300);

    setTimeout(function() {
        show(12);
    }, 3600);

    setTimeout(function() {
        transition.classList.add('hide');
    }, 3650);

    setTimeout(function() {
        transition.remove();
    }, 4300);
}


/* =========================
   RESPOSTAS
========================= */

function check(n) {

    const input =
        document.getElementById('a' + n);

    const feedback =
        document.getElementById('f' + n);

    const value =
        input.value.trim().toLowerCase();

    let correct = false;


    if (n === 1) {

        correct = [
            'promessa',
            'uma promessa'
        ].includes(value);

    }


    if (n === 2) {

        correct = value === 'sonho';

    }


    if (n === 7) {

        correct = [
            'separar',
            'nos separar',
            'impedir',
            'afastar'
        ].includes(value);

    }


    if (n === 9) {

        correct = value === 'futuro';

    }


    if (correct) {

        if (n === 9) {

            feedback.textContent =
                '✦ VOCÊ DESCOBRIU. A palavra secreta é FUTURO.';

        } else {

            feedback.textContent =
                '✦ ACERTOU!';

        }

        setTimeout(next, 900);

    } else {

        feedback.textContent =
            'Hmm... ainda não. Tenta pensar mais um pouquinho. 👀';

    }

}


/* =========================
   PISTAS
========================= */

function hint(n) {

    const feedback =
        document.getElementById('f' + n);


    const hints = {

        1:
            '💡 Pista: quando alguém dá a palavra de que vai fazer algo, está fazendo uma...',

        2:
            '💡 Pista: se A = 1, continue seguindo a ordem do alfabeto. 2 é B, 3 é C...',

        9:
            '💡 Pista: começa com F. É aquilo que ainda está à sua frente e onde os próximos capítulos serão escritos.'

    };


    feedback.textContent =
        hints[n];

}


/* =========================
   QUEM DISSE ISSO?
========================= */

let quoteRound = 0;

const quotes = [
    {
        text: '“Você é meu sonho”',
        answer: 'EU'
    },
    {
        text: '“E as estrelas também”',
        answer: 'VOCÊ'
    },
    {
        text: '“...Mas eu acredito em você 100%”',
        answer: 'VOCÊ'
    },
    {
        text: '“Você é incrível mesmo”',
        answer: 'EU'
    },
    {
        text: 'Quem disse “eu te amo” primeiro?',
        detail: 'Detalhe: “I lov u” não conta kkk',
        answer: 'EU'
    }
];

function choose(value) {

    const feedback =
        document.getElementById('f3');

    if (value === quotes[quoteRound].answer) {

        quoteRound++;

        if (quoteRound === quotes.length) {

            feedback.textContent =
                '✦ VOCÊ LEMBROU DE TUDO.';

            setTimeout(function() {
                next();
            }, 900);

            return;
        }

        feedback.textContent =
            '✦ ACERTOU!';

        setTimeout(function() {

            document.getElementById('quoteText')
                .innerHTML =
                quotes[quoteRound].text +
                (
                    quotes[quoteRound].detail
                        ? '<br><small>' +
                          quotes[quoteRound].detail +
                          '</small>'
                        : ''
                );

            document.getElementById('quoteNumber')
                .textContent =
                'Frase ' +
                (quoteRound + 1) +
                ' de ' +
                quotes.length;

            feedback.textContent = '';

        }, 500);

    } else {

        feedback.textContent =
            'Hmm... essa memória não parece ser sua. 👀';

    }
}

/* =========================
   MINI CALENDÁRIO
========================= */

/* =========================
   INÍCIO ALEATÓRIO DO CALENDÁRIO
========================= */

const randomStart = Math.floor(Math.random() * 18);

let calendarYear =
    2025 + Math.floor(randomStart / 12);

let calendarMonth =
    randomStart % 12;


const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];


function renderCalendar() {

    const calendarDays =
        document.getElementById('calendarDays');

    const calendarMonthText =
        document.getElementById('calendarMonth');

    const calendarYearText =
        document.getElementById('calendarYear');


    if (!calendarDays) {
        return;
    }


    calendarDays.innerHTML = '';


    calendarMonthText.textContent =
        monthNames[calendarMonth];

    calendarYearText.textContent =
        calendarYear;


    const firstDay =
        new Date(
            calendarYear,
            calendarMonth,
            1
        ).getDay();


    const totalDays =
        new Date(
            calendarYear,
            calendarMonth + 1,
            0
        ).getDate();


    /* Espaços antes do primeiro dia */

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const empty =
            document.createElement('span');

        empty.className =
            'calendar-empty';

        calendarDays.appendChild(empty);

    }


    /* Dias do mês */

    for (
        let day = 1;
        day <= totalDays;
        day++
    ) {

        const date =
            document.createElement('button');

        date.type = 'button';

        date.className =
            'calendar-day';

        date.textContent =
            day;


        date.addEventListener(
            'click',
            function() {

                selectDate(day);

            }
        );


        calendarDays.appendChild(date);

    }

}


/* =========================
   TROCAR MÊS
========================= */

function changeMonth(direction) {

    calendarMonth += direction;


    if (calendarMonth < 0) {

        calendarMonth = 11;
        calendarYear--;

    }


    if (calendarMonth > 11) {

        calendarMonth = 0;
        calendarYear++;

    }


    renderCalendar();

}


/* =========================
   SELECIONAR DATA
========================= */

function selectDate(day) {

    const feedback =
        document.getElementById('f7');


    if (
        calendarYear === 2026 &&
        calendarMonth === 8 &&
        day === 18
    ) {

        feedback.textContent =
            '✦ VOCÊ LEMBROU. 18 DE SETEMBRO DE 2026.';


        setTimeout(
            function() {

                next();

            },
            1200
        );


    } else {

        feedback.textContent =
            'Hmm... essa não parece ser a data. 👀';

    }

}


/* =========================
   INICIAR CALENDÁRIO
========================= */

renderCalendar();

/* =========================
   CONSTELAÇÃO
========================= */

function star(element) {

    if (
        element.classList.contains('on')
    ) {
        return;
    }

    element.classList.add('on');
    found++;

    if (found === 7) {

        document
            .querySelectorAll('.star')
            .forEach(star => {
                star.classList.add('done');
            });


        const constellation =
            document.querySelector('.constellation');

        const stars =
            constellation.querySelectorAll('.star');

        const lines =
            constellation.querySelectorAll(
                '.constellation-lines line'
            );

        const rect =
            constellation.getBoundingClientRect();

        for (let i = 0; i < lines.length; i++) {

            const starA =
                stars[i].getBoundingClientRect();

            const starB =
                stars[i + 1].getBoundingClientRect();

            const x1 =
                starA.left +
                starA.width / 2 -
                rect.left;

            const y1 =
                starA.top +
                starA.height / 2 -
                rect.top;

            const x2 =
                starB.left +
                starB.width / 2 -
                rect.left;

            const y2 =
                starB.top +
                starB.height / 2 -
                rect.top;

            lines[i].setAttribute(
                'x1',
                x1
            );

            lines[i].setAttribute(
                'y1',
                y1
            );

            lines[i].setAttribute(
                'x2',
                x2
            );

            lines[i].setAttribute(
                'y2',
                y2
            );
        }


        setTimeout(function() {

            constellation
                .querySelector('.constellation-lines')
                .classList.add('show');

        }, 300);


        document.getElementById('f8').textContent =
            '✦ A CONSTELAÇÃO FOI ENCONTRADA.';


        setTimeout(function() {

            document.getElementById('f8').textContent =
                '✦ A CONSTELAÇÃO DO SONHO.';

        }, 1000);


        setTimeout(next, 1800);
    }
}

/* =========================
   CARTA
========================= */

function openLetter() {
    next();
}

/* =========================
   MÚSICA
========================= */

function note(text) {

    document.getElementById('note')
        .textContent = text;

}


/* =========================
   BOTÃO NÃO
   FOGE PELA TELA INTEIRA
========================= */

const noButton =
    document.getElementById('no');

const finalScreen =
    noButton
        ? noButton.closest('.screen')
        : null;

let canRun = true;


/*
 * Verifica se o mouse está perto
 * do botão.
 */

document.addEventListener(
    'mousemove',
    function(event) {

        if (!canRun) {
            return;
        }


        if (!noButton) {
            return;
        }


        if (
            !finalScreen ||
            !finalScreen.classList.contains('active')
        ) {
            return;
        }


        const rect =
            noButton.getBoundingClientRect();


        const centerX =
            rect.left +
            rect.width / 2;


        const centerY =
            rect.top +
            rect.height / 2;


        const distance =
            Math.sqrt(

                Math.pow(
                    event.clientX - centerX,
                    2
                )

                +

                Math.pow(
                    event.clientY - centerY,
                    2
                )

            );


        /*
         * Se o mouse chegar perto,
         * o botão foge.
         */

        if (distance < 120) {

            runAway();

        }

    }
);


/* =========================
   FUGIR
========================= */

function runAway() {

    noClicks++;


    const messages = [

        'Tem certeza? 👀',

        'Você está tentando chegar perto disso mesmo?',

        'Olha que eu fiz esse site inteiro, hein.',

        'O botão NÃO parece não querer colaborar.',

        'Acho que ele já entendeu que não é uma opção. 😂',

        'Você ainda está tentando? 😭',

        'Desiste do NÃO. Ele desistiu de você. 😂',

        'ELE FUGIU DE NOVO KKKKK',

        'Você não vai conseguir clicar nisso. 👀',

        'Eu avisei que ele ia fugir...',

        'Esse botão tem medo de você. 😂',

        'NÃO significa NÃO... mas nesse caso o botão também não quer ser clicado. 😭'

    ];


    const messageIndex =
        (noClicks - 1) % messages.length;


    document.getElementById('noMsg')
        .textContent =
        messages[messageIndex];


    canRun = false;


    /*
     * Na primeira fuga, tiramos o botão
     * de dentro do card e colocamos
     * diretamente no body.
     */

    if (noButton.parentElement !== document.body) {

        document.body.appendChild(noButton);

    }


    /*
     * Agora ele é realmente livre
     * pela viewport inteira.
     */

    noButton.style.position =
        'fixed';

    noButton.style.margin =
        '0';

    noButton.style.right =
        'auto';

    noButton.style.bottom =
        'auto';

    noButton.style.transform =
        'none';

    noButton.style.zIndex =
        '99999';


    /*
     * Tamanho REAL da janela.
     */

    const screenWidth =
        document.documentElement.clientWidth;

    const screenHeight =
        document.documentElement.clientHeight;


    const buttonWidth =
        noButton.offsetWidth;

    const buttonHeight =
        noButton.offsetHeight;


    /*
     * Margem mínima da tela.
     */

    const margin = 15;


    /*
     * Limites.
     */

    const maxX =
        screenWidth -
        buttonWidth -
        margin;


    const maxY =
        screenHeight -
        buttonHeight -
        margin;


    /*
     * Posição aleatória pela tela inteira.
     */

    const x =
        margin +
        Math.random() *
        Math.max(
            0,
            maxX - margin
        );


    const y =
        margin +
        Math.random() *
        Math.max(
            0,
            maxY - margin
        );


    /*
     * Move o botão.
     */

    noButton.style.left =
        x + 'px';


    noButton.style.top =
        y + 'px';


    /*
     * Depois de 250ms ele pode
     * fugir novamente.
     */

    setTimeout(
        function() {

            canRun = true;

        },
        250
    );

}


/* =========================
   SIM
========================= */

function yes() {

    if (noButton) {
        noButton.style.display = 'none';
    }

    show(13);


    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const star =
            document.createElement('span');


        star.textContent =
            '✦';


        star.style.position =
            'fixed';


        star.style.left =
            Math.random() * 100 + 'vw';


        star.style.top =
            Math.random() * 100 + 'vh';


        star.style.color =
            '#cbb7ff';


        document.body.appendChild(star);


        setTimeout(
            function() {

                star.remove();

            },
            1600
        );

    }

}


/* =========================
   CARTÕES QUE VIRAM
========================= */

function flipCard(card) {

    card.classList.toggle('flipped');

}


function startMission() {

    const transition =
        document.createElement('div');

    transition.className =
        'mission-transition';

    transition.textContent =
        'MISSÃO INICIADA.';

    document.body.appendChild(
        transition
    );

    setTimeout(function() {
        transition.classList.add('show');
    }, 50);

    setTimeout(function() {
        show(1);
    }, 650);

    setTimeout(function() {
        transition.classList.remove('show');
    }, 750);

    setTimeout(function() {
        transition.remove();
    }, 1150);
}


function setupLetterScroll() {

    const letterCard =
        document.querySelector('.letter-card');

    const letterButton =
        document.querySelector('.letter-card > button');

    if (!letterCard || !letterButton) {
        return;
    }

    letterButton.classList.remove(
        'letter-button-visible'
    );

    function checkLetterEnd() {

        const reachedEnd =
            letterCard.scrollTop +
            letterCard.clientHeight >=
            letterCard.scrollHeight - 20;

        if (reachedEnd) {

            letterButton.classList.add(
                'letter-button-visible'
            );

        }
    }

    letterCard.onscroll = checkLetterEnd;

    checkLetterEnd();
}

/* =========================
   PLAYER DE MÚSICA
========================= */

function formatMusicTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return '0:00';
    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return minutes + ':' +
        String(remainingSeconds).padStart(2, '0');
}


function setupMusicPlayer() {

    const musicAudio =
        document.getElementById('musicAudio');

    const musicPlayButton =
        document.getElementById('musicPlayButton');

    const musicProgress =
        document.getElementById('musicProgress');

    const musicCurrentTime =
        document.getElementById('musicCurrentTime');

    const musicDuration =
        document.getElementById('musicDuration');


    if (
        !musicAudio ||
        !musicPlayButton ||
        !musicProgress ||
        !musicCurrentTime ||
        !musicDuration
    ) {
        return;
    }


    musicAudio.addEventListener(
        'loadedmetadata',
        function() {

            musicDuration.textContent =
                formatMusicTime(
                    musicAudio.duration
                );

        }
    );


    musicAudio.addEventListener(
        'timeupdate',
        function() {

            if (musicAudio.duration) {

                musicProgress.value =
                    (
                        musicAudio.currentTime /
                        musicAudio.duration
                    ) * 100;
            }

            musicCurrentTime.textContent =
                formatMusicTime(
                    musicAudio.currentTime
                );

        }
    );


    musicProgress.addEventListener(
        'input',
        function() {

            if (!musicAudio.duration) {
                return;
            }

            musicAudio.currentTime =
                (
                    Number(musicProgress.value) /
                    100
                ) * musicAudio.duration;

        }
    );


    musicAudio.addEventListener(
        'ended',
        function() {

            musicPlayButton.textContent =
                '▶ TOCAR';

            musicProgress.value = 0;

            musicCurrentTime.textContent =
                '0:00';

        }
    );
}


/* Inicializa quando a página estiver carregada */

if (document.readyState === 'loading') {

    document.addEventListener(
        'DOMContentLoaded',
        setupMusicPlayer
    );

} else {

    setupMusicPlayer();

}


/* =========================
   TOCAR / PAUSAR
========================= */

function toggleMusic() {

    const musicAudio =
        document.getElementById('musicAudio');

    const musicPlayButton =
        document.getElementById('musicPlayButton');


    if (!musicAudio || !musicPlayButton) {
        return;
    }


    if (musicAudio.paused) {

        musicAudio.play()
            .then(function() {

                musicPlayButton.textContent =
                    '⏸ PAUSAR';

            })
            .catch(function(error) {

                console.log(
                    'Não foi possível tocar a música:',
                    error
                );

            });

    } else {

        musicAudio.pause();

        musicPlayButton.textContent =
            '▶ TOCAR';

    }
}