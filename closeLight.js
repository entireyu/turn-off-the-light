// 游戏
function Game(level) {
    // 定义5*5行列
    this.row = 5;
    this.col = 5;
    this.arr = [];
    this.level = level;
    this.randomArr = [];
}

Game.prototype.create = function () {
    var gameContainer = document.getElementById('game');
    /**
     * 清除子节点
     */
    while (gameContainer.hasChildNodes())
    {
        gameContainer.removeChild(gameContainer.firstChild);
    }
    // 创建表格
    var table = document.createElement('table');

    for (let i = 0; i < this.row; i++) {
        let tr = document.createElement('tr');
        this.arr[i] = [];
        for (let j = 0; j < this.col; j++) {
            let tdDom = (new Block(i, j)).init();
            this.arr[i][j] = tdDom;
            tr.appendChild(tdDom.td);
        }
        table.appendChild(tr);
    }
    gameContainer.appendChild(table);
}

/**
 * 初始化游戏
 */
Game.prototype.init = function () {
    // 创建面板
    this.create();
    this.random();
}

/**
 * 抽取值
 */
Game.prototype.random = function () {
    // 格子总数
    let sum = this.row * this.col;
    // 取值
    for (let i = 0; i < this.level; i++) {
        this.randomArr.push(parseInt((Math.random() * (sum - 1)).toFixed(0)))
    }
    // 遍历随机数数组
    var num = 0;
    for (let j = 0; j < this.row; j++) {
        for (let k = 0; k < this.row; k++) {
            if (this.randomArr.indexOf(num) != -1) {
                this.changeStatus(j, k);
            }
            num++;
        }
    }
}

/**
 * 点击时改变四周方块
 */
Game.prototype.changeStatus = function (row, col) {
    // 改变点击位
    this.arr[row][col].changeStatus();
    // 上
    if (row - 1 >= 0) {
        this.arr[row - 1][col].changeStatus();
    }
    // 下
    if (row + 1 < this.row) {
        this.arr[row + 1][col].changeStatus();
    }
    // 左
    if (col - 1 >= 0) {
        this.arr[row][col - 1].changeStatus();
    }
    // 右
    if (col + 1 < this.col) {
        this.arr[row][col + 1].changeStatus();
    }
    this.judge();
}

/**
 * 判断游戏是否结束
 */
Game.prototype.judge = function () {
    // 亮的总数
    var lightSum = 0;
    for (let i = 0; i < this.row; i++) {
        for (let j = 0; j < this.col; j++) {
            if (this.arr[i][j].light == true)
                lightSum++;
        }
    }
    if (lightSum == 0) {
        alert("您赢了")
    }
}

// 每个方块
function Block(row, col) {
    this.light = false;
    this.td = null;
    this.row = row;
    this.col = col;
}

// 方块初始化
Block.prototype.init = function () {
    this.light = false;
    var td = document.createElement('td');
    td.setAttribute('light', this.light);
    td.addEventListener('mousedown', () => {
        game.changeStatus(this.row, this.col);
    })
    this.td = td;
    return this;
}

/**
 * 改变方块状态
 */
Block.prototype.changeStatus = function () {
    this.light = !this.light
    this.td.setAttribute('light', this.light)
}

var game = new Game(0);
game.init();

var btnGroupDom = document.getElementById("btnGroup");
var btnGroup = [{ name: "简单", func: () => { game = new Game(1); game.init(); } }, { name: "中等", func: () => { game = new Game(3); game.init(); } }, { name: "困难", func: () => { game = new Game(5); game.init(); } }]
for (let i = 0; i < btnGroup.length; i++) {
    let button = document.createElement('button');
    button.textContent = btnGroup[i].name
    button.addEventListener('mousedown', btnGroup[i].func)
    btnGroupDom.appendChild(button)
}

