
function startGame() {
    document.getElementById('startMenu').style.display = 'none';
    document.getElementById('15').style.display = 'block';

    var bomb;
    var food;
    var basketz;
    var vgs;
    var score = 0;
    var speed = 250;
    var raund = 0;
    var life = 3;
    var speed1 = 350;
    var game = new Phaser.Game(
        window.innerWidth - 30, window.innerHeight - 30, Phaser.CANVAS, null, {
            preload: preload,
            create: create,
            update: update
        });

    function preload() {
        game.load.image('fon', 'white.png');//ФОН
        game.load.image('fruit', 'apple.png');//ЯБЛОКО
        game.load.image('basket', 'basket.png');//КОРЗИНА
        game.load.image('bomb', 'bomb-4.png');//БОМБА
        game.load.spritesheet('vzryv1', 'vzryv.png');//неработающая анимация
        game.load.image('life5', 'heart.png');//Сердце
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.tileSprite(1, 1, game.width, game.height, 'fon');//фон
        basketz = game.add.sprite(game.width / 2, game.height / 2 + 50, 'basket');//Корзина
        basketz.anchor.set(0.5);
        game.physics.enable(basketz, Phaser.Physics.ARCADE);
        basketz.body.immovable = true;
        zfood();

        lifez = game.add.sprite(Math.floor(Math.random() * game.width), 5, 'lifez');//Сердце
        game.physics.arcade.collide(basketz, lifez, heartz);
        lifez.x = game.width + 1000;


        bombz = game.add.sprite(Math.floor(Math.random() * game.width), 5, 'bomb');//Bomb
        game.physics.enable(bombz, Phaser.Physics.ARCADE);
        bombz.x = -1666;
        bombz.animations.add('animation', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 35);


        text = game.add.text(game.width - 50, 20, '0');
        life1 = game.add.text(-50, 20, '3')
    }

    function update() {
        basketz.x = game.input.x || game.world.width * 0.5;

        game.physics.arcade.collide(basketz, vgs, poimano);
        game.physics.arcade.collide(basketz, bombz, bomba);
        game.physics.arcade.collide(basketz, lifez, heartz);

    }


    function zfood() {
        vgs = game.add.group();
        for (i = 0; i < 1; i++) {
            for (i1 = 0; i1 < 5; i1++) {
                setInterval(function () {
                    food = game.add.sprite(Math.floor(Math.random() * game.width), Math.floor(Math.random() * 20), 'fruit');
                    food.anchor.set(0, 5);
                    game.physics.enable(food, Phaser.Physics.ARCADE);
                    vgs.add(food);
                    food.body.velocity.set(0, speed);
                }, 3000)
            }
        }

    }

    setInterval(function () {
        game.physics.arcade.collide(basketz, lifez, heartz);

        lifez = game.add.sprite(Math.floor(Math.random() * game.width), 5, 'life5');//Сердце
        lifez.anchor.set(0.5);
        game.physics.enable(lifez, Phaser.Physics.ARCADE);
        speed = speed + 20;
        lifez.body.velocity.set(0, speed);
        maxHealth()
    }, 10000);


    setInterval(function () {
        game.physics.arcade.collide(basketz, bombz, bomba);

        bombz = game.add.sprite(Math.floor(Math.random() * game.width), 5, 'bomb');//Bomb
        bombz.anchor.set(0.5);
        game.physics.enable(bombz, Phaser.Physics.ARCADE);

        bombz.x = Math.floor(Math.random() * game.width);
        bombz.y = 0;
        speed = speed + 15;
        bombz.body.velocity.set(0, speed + 10);

    }, 2900);


    function poimano(basketz, food) {

        score = score + 1;
        text.text = score;
        food.x = Math.floor(Math.random() * game.width);
        food.y = 0;
        speed = speed + 5;
        food.body.velocity.set(0, speed);
        win1();
        if (life1.text === 5) {

        }
    }

    win1();

    function bomba() {
        bombz.animations.play('vzryv1');
        life = life - 1;
        life1.text = life;
        bombz.x = -100;
        bombz.y = 0;
        speed = speed + 10;
        bombz.body.velocity.set(0, speed);
        zhizni();
        loose1();

    }

    function heartz() {
        score = score + 1;
        text.text = score;
        life = life + 1;
        life1.text = life;
        lifez.x = -100;
        lifez.y = 3;
        speed1 = speed + 30;
        lifez.body.velocity.set(0, speed1);
        zhizni();

    }

    function zhizni() {
        if (life1.text == 1) {
            document.getElementById('15').src = '1life.png'
        } else if (life1.text == 2) {
            document.getElementById('15').src = '2life.png'
        } else if (life1.text == 3) {
            document.getElementById('15').src = '3life.png'
        } else if (life1.text == 4) {
            document.getElementById('15').src = '4life.png'
        } else if (life1.text == 5) {
            document.getElementById('15').src = '5life.png'
        }
    }


    function maxHealth() {
        if (life1.text >= 5)
            life = 5;
        life1.text = life;
    }

    function win1() {
        if (score == 2000) {
            alert('Вы выйграли!');
        }
    }

    function loose1() {
        if (life == 0) {
            alert('Вы ПРОИГРАЛИ!');
            window.location.reload()
        }
    }
}