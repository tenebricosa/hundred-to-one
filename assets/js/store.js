let state = {
    volume: {
        mistake: 100,
        answer: 100
    },
    currentRound: 1,
    teams: {
        one: {
            title: "Табы",
            visible: false
        },
        two: {
            title: "Пробелы",
            visible: false
        }
    },
    score: {
        one: 0,
        two: 0,
        round: 0
    },

    //TechTrain, раунд 1
    // rounds: [
    //     {
    //         answers: [
    //             {
    //                 title: "Однотипные задачи",
    //                 cost: 30,
    //                 visible: false
    //             },
    //             {
    //                 title: "Не берет отпуск",
    //                 cost: 25,
    //                 visible: false
    //             },
    //             {
    //                 title: "Мало платят",
    //                 cost: 20,
    //                 visible: false
    //             },
    //             {
    //                 title: "Потому что на солнышке",
    //                 cost: 15,
    //                 visible: false
    //             },
    //             {
    //                 title: "Менеджер м***к",
    //                 cost: 10,
    //                 visible: false
    //             },
    //             {
    //                 title: "Один и тот же проект",
    //                 cost: 5,
    //                 visible: false
    //             }
    //         ]
    //     },
    //     {
    //         answers: [
    //             {
    //                 title: "C#",
    //                 cost: 30,
    //                 visible: false
    //             },
    //             {
    //                 title: "Python",
    //                 cost: 25,
    //                 visible: false
    //             },
    //             {
    //                 title: "1C",
    //                 cost: 20,
    //                 visible: false
    //             },
    //             {
    //                 title: "C++",
    //                 cost: 15,
    //                 visible: false
    //             },
    //             {
    //                 title: "Pascal",
    //                 cost: 10,
    //                 visible: false
    //             },
    //             {
    //                 title: "Haskell",
    //                 cost: 5,
    //                 visible: false
    //             }
    //         ]
    //     },
    //     {
    //         answers: [
    //             {
    //                 title: "Дедлайн",
    //                 cost: 30,
    //                 visible: false
    //             },
    //             {
    //                 title: "Рабочая стреча",
    //                 cost: 25,
    //                 visible: false
    //             },
    //             {
    //                 title: "Баг",
    //                 cost: 20,
    //                 visible: false
    //             },
    //             {
    //                 title: "Заказчик",
    //                 cost: 15,
    //                 visible: false
    //             },
    //             {
    //                 title: "Солнечный свет",
    //                 cost: 10,
    //                 visible: false
    //             },
    //             {
    //                 title: "500-ка",
    //                 cost: 5,
    //                 visible: false
    //             }
    //         ]
    //     },
    //     {
    //         answers: [
    //             {
    //                 title: "Бабушкин свитер",
    //                 cost: 15,
    //                 visible: false
    //             },
    //             {
    //                 title: "Толстовка",
    //                 cost: 30,
    //                 visible: false
    //             },
    //             {
    //                 title: "Кроссовки",
    //                 cost: 60,
    //                 visible: false
    //             },
    //             {
    //                 title: "Смартфон",
    //                 cost: 120,
    //                 visible: false
    //             },
    //             {
    //                 title: "Рюкзак",
    //                 cost: 180,
    //                 visible: false
    //             },
    //             {
    //                 title: "Футболка",
    //                 cost: 240,
    //                 visible: false
    //             }
    //         ]
    //     }
    // ],

    //TechTrain, раунд 2
    // rounds: [
    //     {
    //         answers: [
    //             {
    //                 title: "Разработчики",
    //                 cost: 30,
    //                 visible: false
    //             },
    //             {
    //                 title: "Плюшки",
    //                 cost: 25,
    //                 visible: false
    //             },
    //             {
    //                 title: "Сайт",
    //                 cost: 20,
    //                 visible: false
    //             },
    //             {
    //                 title: "NDA",
    //                 cost: 15,
    //                 visible: false
    //             },
    //             {
    //                 title: "Open space",
    //                 cost: 10,
    //                 visible: false
    //             },
    //             {
    //                 title: "Скрам",
    //                 cost: 5,
    //                 visible: false
    //             }
    //         ]
    //     },
    //     {
    //         answers: [
    //             {
    //                 title: "Спит",
    //                 cost: 30,
    //                 visible: false
    //             },
    //             {
    //                 title: "Ничем хорошим",
    //                 cost: 25,
    //                 visible: false
    //             },
    //             {
    //                 title: "Релизит",
    //                 cost: 20,
    //                 visible: false
    //             },
    //             {
    //                 title: "Кодит",
    //                 cost: 15,
    //                 visible: false
    //             },
    //             {
    //                 title: "Играет",
    //                 cost: 10,
    //                 visible: false
    //             },
    //             {
    //                 title: "Звонит дежурному",
    //                 cost: 5,
    //                 visible: false
    //             }
    //         ]
    //     },
    //     {
    //         answers: [
    //             {
    //                 title: "StackOverflow",
    //                 cost: 30,
    //                 visible: false
    //             },
    //             {
    //                 title: "Пик Балмера",
    //                 cost: 25,
    //                 visible: false
    //             },
    //             {
    //                 title: "Другой разработчик",
    //                 cost: 20,
    //                 visible: false
    //             },
    //             {
    //                 title: "ReSharper",
    //                 cost: 15,
    //                 visible: false
    //             },
    //             {
    //                 title: "IDE",
    //                 cost: 10,
    //                 visible: false
    //             },
    //             {
    //                 title: "Тестировщик",
    //                 cost: 5,
    //                 visible: false
    //             }
    //         ]
    //     },
    //     {
    //         answers: [
    //             {
    //                 title: "Шаверма",
    //                 cost: 15,
    //                 visible: false
    //             },
    //             {
    //                 title: "Бургер",
    //                 cost: 30,
    //                 visible: false
    //             },
    //             {
    //                 title: "Печеньки",
    //                 cost: 60,
    //                 visible: false
    //             },
    //             {
    //                 title: "Кофе",
    //                 cost: 120,
    //                 visible: false
    //             },
    //             {
    //                 title: "Пицца",
    //                 cost: 180,
    //                 visible: false
    //             },
    //             {
    //                 title: "Бесплатная",
    //                 cost: 240,
    //                 visible: false
    //             }
    //         ]
    //     }
    // ],

       //TechTrain, раунд 3
       rounds: [
        {
            answers: [
                {
                    title: "Горящие сроки",
                    cost: 30,
                    visible: false
                },
                {
                    title: "Отсутствие сна",
                    cost: 25,
                    visible: false
                },
                {
                    title: "Молодой и дружный коллектив",
                    cost: 20,
                    visible: false
                },
                {
                    title: "Смузи",
                    cost: 15,
                    visible: false
                },
                {
                    title: "Гараж",
                    cost: 10,
                    visible: false
                },
                {
                    title: "Деньги",
                    cost: 5,
                    visible: false
                }
            ]
        },
        {
            answers: [
                {
                    title: "Жена",
                    cost: 30,
                    visible: false
                },
                {
                    title: "Мама",
                    cost: 25,
                    visible: false
                },
                {
                    title: "Эйчар",
                    cost: 20,
                    visible: false
                },
                {
                    title: "Свой собственный",
                    cost: 15,
                    visible: false
                },
                {
                    title: "Алиса",
                    cost: 10,
                    visible: false
                },
                {
                    title: "Сири",
                    cost: 5,
                    visible: false
                }
            ]
        },
        {
            answers: [
                {
                    title: "Гразная кружка",
                    cost: 30,
                    visible: false
                },
                {
                    title: "Уточка",
                    cost: 25,
                    visible: false
                },
                {
                    title: "Монитор",
                    cost: 20,
                    visible: false
                },
                {
                    title: "Пыль",
                    cost: 15,
                    visible: false
                },
                {
                    title: "Кофе",
                    cost: 10,
                    visible: false
                },
                {
                    title: "Мышь",
                    cost: 5,
                    visible: false
                }
            ]
        },
        {
            answers: [
                {
                    title: "Кодер",
                    cost: 15,
                    visible: false
                },
                {
                    title: "Хакер",
                    cost: 30,
                    visible: false
                },
                {
                    title: "Задрот",
                    cost: 60,
                    visible: false
                },
                {
                    title: "Сисадмин",
                    cost: 120,
                    visible: false
                },
                {
                    title: "Тыжпрограммист",
                    cost: 180,
                    visible: false
                },
                {
                    title: "Компьютерщик",
                    cost: 240,
                    visible: false
                }
            ]
        }
    ],
    final: {
        score: {
            one: 0,
            two: 0
        },
        answers: [
            {
                visible: false
            },
            {
                visible: false
            },
            {
                visible: false
            },
            {
                visible: false
            },
            {
                visible: false
            },
            {
                visible: false
            },
            {
                visible: false
            },
            {
                visible: false
            },
            {
                visible: false
            },
            {
                visible: false
            },
        ]
    }
};

state.roundAnswers = state.rounds[0].answers;

function getState () {
    return state;
}

function setState (newState) {
    state = newState;
}

module.exports.getState = getState;
module.exports.setState = setState;