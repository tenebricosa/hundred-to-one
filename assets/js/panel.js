const {ipcRenderer} = require('electron');
const Handlebars    = require('handlebars');
const storage       = require('electron-json-storage');
const os            = require('os');
const store         = require('./store');

const content        = document.getElementById('content');
const roundSource    = document.getElementById('round-template').innerHTML;
const naoborotSource = document.getElementById('naoborot-template').innerHTML;
const finalSource    = document.getElementById('final-template').innerHTML;
const settingsSource = document.getElementById('settings-template').innerHTML;

const openTeamOne  = document.getElementById('open-team-one');
const openTeamTwo  = document.getElementById('open-team-two');
const openSettings = document.getElementById('open-settings');
const nextRound    = document.getElementById('next-round');
const prevRound    = document.getElementById('prev-round');

let template      = Handlebars.compile(roundSource);
let state         = store.getState();
let dir           = os.homedir() + '/hundred-to-one/data';
content.innerHTML = template(store.getState());

storage.setDataPath(dir);
init();

document.onreadystatechange = function(){
    if (document.readyState === 'complete'){
        ipcRenderer.send('asynchronous-message', {
            cmd: 'panel-ready'
        });
    }
};

openTeamOne.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', {
        cmd: 'open-team',
        team: 'one'
    });
});

openTeamTwo.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', {
        cmd: 'open-team',
        team: 'two'
    });
});

openSettings.addEventListener('click', function (event) {
    template          = Handlebars.compile(settingsSource);
    content.innerHTML = template(state);

    document.getElementById('cancel').addEventListener('click', function (event) {
        template          = Handlebars.compile(roundSource);
        content.innerHTML = template(state);
        init();
    });

    document.getElementById('save').addEventListener('click', function (event) {
        state.rounds.forEach(function(round, roundIndex) {
            round.answers.forEach(function(answer, answerIndex) {
                state.rounds[roundIndex].answers[answerIndex].title   = document.getElementById('answer-title-'+roundIndex+'-'+answerIndex).value;
                state.rounds[roundIndex].answers[answerIndex].cost    = document.getElementById('answer-cost-'+roundIndex+'-'+answerIndex).value;
                state.rounds[roundIndex].answers[answerIndex].visible = false;
            });
        });

        state.volume.mistake = Number(document.getElementById('volume-mistake').value);
        state.volume.answer = Number(document.getElementById('volume-answer').value);

        state.teams.one.title = document.getElementById('team-one').value;
        state.teams.two.title = document.getElementById('team-two').value;

        store.setState(state);

        storage.set('hundred-to-one', {
            rounds: state.rounds,
            volume: state.volume,
            teams: state.teams
        }, function(error) {
            if (error) {
                alert('Не удалось сохранить изменения');
            }
        });

        if (confirm('Настройки сохранены. Приложение будет выключено.')) {
            ipcRenderer.send('asynchronous-message', {
                cmd: 'close-app'
            });
        }

    });
});

nextRound.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', {
        cmd: 'next-round'
    });
});

prevRound.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', {
        cmd: 'prev-round'
    });
});

ipcRenderer.on('asynchronous-reply', (event, data) => {
    switch (data.event) {
        case 'next-round':
        case 'prev-round':
            if (data.state.currentRound < 4) {
                template          = Handlebars.compile(roundSource);
                content.innerHTML = template(data.state);
                init();
            } else if (data.state.currentRound == 4) {
                template          = Handlebars.compile(naoborotSource);
                content.innerHTML = template(data.state);
                naoborotInit();
            } else if (data.state.currentRound == 5){
                template          = Handlebars.compile(finalSource);
                content.innerHTML = template(data.state);
                finalInit();
            }
            break;

        case 'update-state':
            state = data.state;
            var html = template(data.state);
            content.innerHTML = html;
            init();
            break;
    }
});


function init() {
    document.getElementById('open-answer-0').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 0
        });
    });
    document.getElementById('open-answer-1').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 1
        });
    });
    document.getElementById('open-answer-2').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 2
        });
    });
    document.getElementById('open-answer-3').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 3
        });
    });
    document.getElementById('open-answer-4').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 4
        });
    });
    document.getElementById('open-answer-5').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 5
        });
    });

    document.getElementById('on-mistake-one-0').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'on-mistake',
            team: 'one',
            index: 0
        });
    });
    document.getElementById('on-mistake-one-1').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'on-mistake',
            team: 'one',
            index: 1
        });
    });
    document.getElementById('on-mistake-one-2').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'on-mistake',
            team: 'one',
            index: 2
        });
    });
    document.getElementById('on-mistake-two-0').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'on-mistake',
            team: 'two',
            index: 0
        });
    });
    document.getElementById('on-mistake-two-1').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'on-mistake',
            team: 'two',
            index: 1
        });
    });
    document.getElementById('on-mistake-two-2').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'on-mistake',
            team: 'two',
            index: 2
        });
    });

    document.getElementById('win-one').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'win',
            team: 'one'
        });
    });
    document.getElementById('win-two').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'win',
            team: 'two'
        });
    });
}

function naoborotInit() {
    document.getElementById('open-answer-0').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 0
        });
    });
    document.getElementById('open-answer-1').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 1
        });
    });
    document.getElementById('open-answer-2').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 2
        });
    });
    document.getElementById('open-answer-3').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 3
        });
    });
    document.getElementById('open-answer-4').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 4
        });
    });
    document.getElementById('open-answer-5').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 5
        });
    });

    document.getElementById('push-team1-answer-0').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'push-answer',
            team: 'one',
            index: 0
        });
    });
    document.getElementById('push-team1-answer-1').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'push-answer',
            team: 'one',
            index: 1
        });
    });
    document.getElementById('push-team1-answer-2').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'push-answer',
            team: 'one',
            index: 2
        });
    });
    document.getElementById('push-team1-answer-3').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'push-answer',
            team: 'one',
            index: 3
        });
    });
    document.getElementById('push-team1-answer-4').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'push-answer',
            team: 'one',
            index: 4
        });
    });
    document.getElementById('push-team1-answer-5').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'push-answer',
            team: 'one',
            index: 5
        });
    });

    document.getElementById('push-team2-answer-0').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'push-answer',
            team: 'two',
            index: 0
        });
    });
    document.getElementById('push-team2-answer-1').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'push-answer',
            team: 'two',
            index: 1
        });
    });
    document.getElementById('push-team2-answer-2').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'push-answer',
            team: 'two',
            index: 2
        });
    });
    document.getElementById('push-team2-answer-3').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'push-answer',
            team: 'two',
            index: 3
        });
    });
    document.getElementById('push-team2-answer-4').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'push-answer',
            team: 'two',
            index: 4
        });
    });
    document.getElementById('push-team2-answer-5').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'push-answer',
            team: 'two',
            index: 5
        });
    });
}

function finalInit() {
    document.getElementById('open-answer-0').addEventListener('click', openHandler);
    document.getElementById('open-answer-1').addEventListener('click', openHandler);
    document.getElementById('open-answer-2').addEventListener('click', openHandler);
    document.getElementById('open-answer-3').addEventListener('click', openHandler);
    document.getElementById('open-answer-4').addEventListener('click', openHandler);
    document.getElementById('open-answer-5').addEventListener('click', openHandler);
    document.getElementById('open-answer-6').addEventListener('click', openHandler);
    document.getElementById('open-answer-7').addEventListener('click', openHandler);
    document.getElementById('open-answer-8').addEventListener('click', openHandler);
    document.getElementById('open-answer-9').addEventListener('click', openHandler);

    document.getElementById('close-one').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'close',
            team: 'one'
        });
    });

    document.getElementById('close-two').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'close',
            team: 'two'
        });
    });

    document.getElementById('open-one').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open',
            team: 'one'
        });
    });

    document.getElementById('open-two').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open',
            team: 'two'
        });
    });
}

function openHandler (event) {
    let index   = this.getAttribute('data-index');
    let titleId = 'input-answer-title-' + index;
    let costId  = 'input-answer-cost-' + index;

    let title = document.getElementById(titleId).value;
    let cost  = document.getElementById(costId).value;

    ipcRenderer.send('asynchronous-message', {
        cmd: 'final-open-answer',
        title: title,
        cost: cost,
        index: index
    });
}