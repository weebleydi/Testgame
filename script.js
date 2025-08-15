document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('click-button');
    const monsterImg = document.getElementById('monster-img');
    const pointsDisplay = document.getElementById('points');
    const damageDisplay = document.getElementById('damage');
    const monsterHpBar = document.getElementById('monster-hp-bar');
    const monsterName = document.getElementById('monster-name');
    const upgradeDamageBtn = document.getElementById('upgrade-damage-btn');

    let points = 0;
    let damage = 1;

    const monsters = [
        { name: "Пушистик", maxHp: 10, img: "monster1.png" },
        { name: "Зефирка", maxHp: 20, img: "monster2.png" },
        { name: "Облачко", maxHp: 50, img: "monster3.png" }
    ];

    let currentMonsterIndex = 0;
    let currentMonsterHp;

    function startGame() {
        setNewMonster();
        updateDisplay();
    }

    function setNewMonster() {
        const monster = monsters[currentMonsterIndex];
        monsterImg.src = monster.img;
        monsterName.textContent = `Монстр: ${monster.name}`;
        currentMonsterHp = monster.maxHp;
        updateHpBar();
    }

    function updateHpBar() {
        const monster = monsters[currentMonsterIndex];
        const hpPercentage = (currentMonsterHp / monster.maxHp) * 100;
        monsterHpBar.style.width = `${hpPercentage}%`;
    }

    function updateDisplay() {
        pointsDisplay.textContent = points;
        damageDisplay.textContent = damage;
    }

    function attackMonster() {
        if (currentMonsterHp > 0) {
            currentMonsterHp -= damage;
            updateHpBar();
            if (currentMonsterHp <= 0) {
                defeatMonster();
            }
        }
    }

    function defeatMonster() {
        points += monsters[currentMonsterIndex].maxHp;
        updateDisplay();
        alert(`Поздравляем! Вы победили ${monsters[currentMonsterIndex].name}!`);

        currentMonsterIndex++;
        if (currentMonsterIndex >= monsters.length) {
            currentMonsterIndex = 0;
            alert("Вы прошли всех монстров! Начинаем заново.");
        }
        setNewMonster();
    }

    function upgradeDamage() {
        const upgradeCost = 10;
        if (points >= upgradeCost) {
            points -= upgradeCost;
            damage += 1;
            updateDisplay();
            alert("Ваш урон увеличен!");
        } else {
            alert("Не хватает очков для улучшения!");
        }
    }

    clickButton.addEventListener('click', attackMonster);
    upgradeDamageBtn.addEventListener('click', upgradeDamage);

    startGame();
});
