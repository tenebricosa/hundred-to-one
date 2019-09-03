const {ipcRenderer, remote, ipcMain} = require('electron');
const {Menu} = remote;
const Handlebars = require('handlebars');
const store = require('./store');

const App            = document.getElementById('app');
const sourceTemplate = document.getElementById('board-template').innerHTML;
const sourceRound    = document.getElementById('round-template').innerHTML;
const sourceFinal    = document.getElementById('final-template').innerHTML;
const menuTemplate   = [
    {
        label: 'View',
        submenu: [
            {role: 'resetzoom'},
            {role: 'zoomin'},
            {role: 'zoomout'},
            {type: 'separator'},
            {role: 'togglefullscreen'}
        ]
    },
    {
        role: 'window',
        submenu: [
            {role: 'minimize'},
            {role: 'close'}
        ]
    }
];
const menu = Menu.buildFromTemplate(menuTemplate);

window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup(remote.getCurrentWindow())
}, false);

document.onreadystatechange = function(){
    if (document.readyState === 'complete'){
        ipcRenderer.send('asynchronous-message', {
            cmd: 'board-ready'
        });
    }
};

Handlebars.registerHelper('for', function(from, to, increment, block) {
    let result = '';
    for (let i = from; i < to; i += increment) {
        result += block.fn(i);
    }
    return result;
});

Handlebars.registerPartial('gameField', sourceRound);
let template = Handlebars.compile(sourceTemplate);
App.innerHTML = template(store.getState());

const audioOpenAnswer  = document.getElementById('audio-open-answer');
const audioWrongAnswer = document.getElementById('audio-wrong-answer');

ipcRenderer.on('asynchronous-reply', (event, data) => {
    switch (data.event) {
        case 'open-team':
            document.getElementById('team-'+data.team).className += ' visible';
            playOpenAnswer();
            break;

        case 'open-answer':
            document.getElementById('answer-'+data.index).className += ' hover';
            document.getElementById('round-score').innerText = data.state.score.round;
            playOpenAnswer();
            break;

        case 'on-mistake':
            document.getElementById('mistake-'+data.team+'-'+data.index).className += ' on';
            playMistake();
            break;

        case 'win':
            document.getElementById('score-'+data.team).innerText = data.state.score[data.team];
            document.getElementById('round-score').innerText = 0;
            playOpenAnswer();
            break;

        case 'push-answer':
            document.getElementById('score-'+data.team).innerText = data.state.score[data.team];
            document.getElementById('round-score').innerText = 0;
            playOpenAnswer();
            break;

        case 'next-round':
        case 'prev-round':
            if (data.state.currentRound != 5) {
                Handlebars.registerPartial('gameField', sourceRound);
                template = Handlebars.compile(sourceTemplate);
                html = template(data.state);
            } else {
                Handlebars.registerPartial('gameField', sourceFinal);
                template = Handlebars.compile(sourceTemplate);
                html     = template(data.state)
            }

            App.innerHTML = html;
            break;

        case 'final-open-answer':
            let title = '<span class="title">' + data.title + '</span>' + '<span class="percent">' + data.cost + '</span>';

            document.getElementById('answer-title-' + data.index).innerHTML = title;
            document.getElementById('answer-' + data.index).className += ' hover';
            playOpenAnswer();

            document.getElementById('summa-' + data.team).innerText = data.state.final.score[data.team];
            document.getElementById('round-score').innerText = data.state.score.round;
            break;

        case 'close':
            if (data.team == 'one') {
                document.getElementById('answer-0').classList.remove('hover');
                document.getElementById('answer-1').classList.remove('hover');
                document.getElementById('answer-2').classList.remove('hover');
                document.getElementById('answer-3').classList.remove('hover');
                document.getElementById('answer-4').classList.remove('hover');
            } else {
                document.getElementById('answer-5').classList.remove('hover');
                document.getElementById('answer-6').classList.remove('hover');
                document.getElementById('answer-7').classList.remove('hover');
                document.getElementById('answer-8').classList.remove('hover');
                document.getElementById('answer-9').classList.remove('hover');
            }
            break;

        case 'open':
            if (data.team == 'one') {
                document.getElementById('answer-0').className += ' hover';
                document.getElementById('answer-1').className += ' hover';
                document.getElementById('answer-2').className += ' hover';
                document.getElementById('answer-3').className += ' hover';
                document.getElementById('answer-4').className += ' hover';
            } else {
                document.getElementById('answer-5').className += ' hover';
                document.getElementById('answer-6').className += ' hover';
                document.getElementById('answer-7').className += ' hover';
                document.getElementById('answer-8').className += ' hover';
                document.getElementById('answer-9').className += ' hover';
            }
            break;

        case 'update-state':
            var html = template(data.state);
            audioOpenAnswer.volume  = data.state.volume.answer / 100;
            audioWrongAnswer.volume = data.state.volume.mistake / 100;

            App.innerHTML = html;
            break;
    }
});

function playOpenAnswer() {
    audioOpenAnswer.pause();
    audioOpenAnswer.currentTime = 0;
    audioOpenAnswer.play();
}

function playMistake() {
    audioWrongAnswer.pause();
    audioWrongAnswer.currentTime = 0;
    audioWrongAnswer.play();
}