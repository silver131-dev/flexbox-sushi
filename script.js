// ==========================================
// A. 新增：遊戲初始畫面 (Start Screen) 邏輯
// ==========================================

// 1. 定義初始畫面要出現的 6 組盤子與壽司 (使用既有的 CSS Class)
const startAnimationSetup = [
    { plate: 'plate-green', sushi: 'sushi-salmon' },  // 綠盤 + 鮭魚
    { plate: 'plate-blue',  sushi: 'sushi-tamago' },  // 藍盤 + 玉子燒
    { plate: 'plate-pink',  sushi: 'sushi-shrimp' },  // 粉盤 + 蝦壽司
    { plate: 'plate-pink',  sushi: 'sushi-avocado' },    // 粉盤 + 酪梨壽司
    { plate: 'plate-blue',  sushi: 'sushi-ikura' },   // 藍盤 + 鮭魚卵
    { plate: 'plate-green',  sushi: 'sushi-maki' },    // 粉盤 + 花壽司
];

// 2. 抓取初始畫面的 HTML 元素
const startScreen = document.getElementById('start-screen');
const bouncingGrid = document.getElementById('bouncing-sushi-grid');
const startBtn = document.getElementById('start-game-btn');
const gameLayout = document.getElementById('game-layout');

// 3. 核心功能：動態生成 6 組跳動的素材
function initStartAnimation() {
    startAnimationSetup.forEach(setup => {
        const pairDiv = document.createElement('div');
        pairDiv.classList.add('pair-container');

        // 生成盤子 HTML
        const plateDiv = document.createElement('div');
        plateDiv.classList.add('plate-static', setup.plate);
        
        // 生成壽司 HTML
        const sushiDiv = document.createElement('div');
        sushiDiv.classList.add('sushi-bouncing', setup.sushi);

        // 將壽司疊在盤子上
        pairDiv.appendChild(plateDiv);
        pairDiv.appendChild(sushiDiv);

        bouncingGrid.appendChild(pairDiv);
    });
}

// 4. 點擊事件：開始遊戲
startBtn.addEventListener('click', () => {
    // a. 為初始畫面加上淡出效果 Class
    startScreen.classList.add('hide');
    
    // b. 顯示原本的遊戲版面
    gameLayout.classList.remove('hidden');

    // c. 在 0.5s 淡出動畫結束後，將初始畫面完全移出 HTML (優化效能)
    setTimeout(() => {
        startScreen.remove(); 
    }, 500);
});


// 5. 初始畫面載入！
initStartAnimation();

// ==========================================
// ... (保留你原本的「1. 遊戲關卡資料設定」等其他所有程式碼) ...

// ==========================================
// 1. 遊戲關卡資料設定
// ==========================================
const levels = [
    // 第 1 關：水平靠右對齊
    {
        level: 1,
        instructions: "歡迎來到 Flexbox Sushi！請使用 <code>justify-content</code> 屬性，將「鮭魚壽司」送到右邊的盤子上。",
        hint: "試試看輸入 <code>justify-content: flex-end;</code>",
        expectedProperty: "justify-content",
        expectedValue: "flex-end",
        plateSetup: "justify-content: flex-end;",
        sushiSetup: "",
        plateHtml: '<div class="plate plate-pink"></div>',
        sushiHtml: '<div class="sushi sushi-salmon"></div>'
    },
    // 第 2 關：水平置中對齊
    {
        level: 2,
        instructions: "客人點了一份「玉子燒壽司」！請使用 <code>justify-content</code> 屬性，將它準確地送到吧檯正中央。",
        hint: "<code>center</code> 可以讓元素水平置中。", 
        expectedProperty: "justify-content",
        expectedValue: "center",
        plateSetup: "justify-content: center;", 
        sushiSetup: "",
        plateHtml: '<div class="plate plate-blue"></div>',
        sushiHtml: '<div class="sushi sushi-tamago"></div>'
    },
    // 第 3 關：多個元素的分散對齊 (space-around)
    {
        level: 3,
        instructions: "這次來了三位客人！請使用 <code>justify-content</code>，讓三顆壽司「平均分散」在吧檯上，且左右兩側留有空間。",
        hint: "試試 <code>space-around</code>。", 
        expectedProperty: "justify-content",
        expectedValue: "space-around",
        plateSetup: "justify-content: space-around;", 
        sushiSetup: "",
        plateHtml: '<div class="plate plate-green"></div><div class="plate plate-blue"></div><div class="plate plate-pink"></div>',
        sushiHtml: '<div class="sushi sushi-shrimp"></div><div class="sushi sushi-maki"></div><div class="sushi sushi-salmon"></div>'
    },
    // 第 4 關：多個元素的分散對齊 (space-between)
    {
        level: 4,
        instructions: "這三位客人喜歡坐在邊邊。請使用 <code>justify-content</code>，讓壽司靠左右兩側貼齊，中間平均分配空間。",
        hint: "試試 <code>space-between</code>。", 
        expectedProperty: "justify-content",
        expectedValue: "space-between",
        plateSetup: "justify-content: space-between;", 
        sushiSetup: "",
        plateHtml: '<div class="plate plate-green"></div><div class="plate plate-green"></div><div class="plate plate-green"></div>',
        sushiHtml: '<div class="sushi sushi-ikura"></div><div class="sushi sushi-pink"></div><div class="sushi sushi-roll"></div>'
    },
   // 第 5 關：改造版 - 垂直對齊 (置中往下掉)
    {
        level: 5,
        instructions: "現在我們來控制交叉軸（垂直方向）！盤子在輸送帶的正下方，請使用 <code>align-items</code> 屬性，將「蝦壽司」垂直降落到盤子上。",
        hint: "在預設的橫向排列中，垂直是交叉軸。請輸入 <code>align-items: flex-end;</code>", 
        expectedProperty: "align-items",
        expectedValue: "flex-end",
        // 盤子預設在正下方 (水平置中 + 垂直靠底)
        plateSetup: "justify-content: center; align-items: flex-end;", 
        // 壽司預設只要水平置中，等玩家輸入垂直靠底
        sushiSetup: "justify-content: center;",
        plateHtml: '<div class="plate plate-blue"></div>',
        sushiHtml: '<div class="sushi sushi-avocado"></div>'
    },
   // 第 6 關：改變主軸方向
    {
        level: 6,
        instructions: "有時候，輸送帶是垂直運作的！請使用 <code>flex-direction</code> 屬性，將壽司的排列方向改為「直向」，讓三貫壽司順利排成一列降落在盤子上。",
        hint: "請輸入 <code>flex-direction: column;</code>",
        expectedProperty: "flex-direction",
        expectedValue: "column",
        plateSetup: "flex-direction: column;", 
        sushiSetup: "",
        // 👇 換成三個盤子 👇
        plateHtml: '<div class="plate plate-pink"></div><div class="plate plate-blue"></div><div class="plate plate-green"></div>',
        // 👇 換成三個壽司 👇
        sushiHtml: '<div class="sushi sushi-salmon"></div><div class="sushi sushi-tamago"></div><div class="sushi sushi-shrimp"></div>'
    },
    /// 第 7 關：終極改良版 - 直列方向的空間分配 (使用 2 顆壽司凸顯滑動差異)
    {
        level: 7,
        instructions: "太棒了！現在我們要結合剛學到的技巧。這條直向（column）的輸送帶很長！請使用 <code>justify-content</code> 讓這「兩貫」壽司完美分開，分別貼齊輸送帶的「最上方」與「最下方」。",
        hint: "請輸入 <code>justify-content: space-between;</code>",
        expectedProperty: "justify-content",
        expectedValue: "space-between",
        plateSetup: "flex-direction: column; justify-content: space-between;", 
        sushiSetup: "flex-direction: column;", 
        // 👇 改為只放 2 組，確保有足夠的垂直空間產生完美的滑動效果 👇
        plateHtml: '<div class="plate plate-green"></div><div class="plate plate-pink"></div>',
        sushiHtml: '<div class="sushi sushi-ikura"></div><div class="sushi sushi-salmonroll"></div>' 
    }
]; // <-- 修正 2：把多餘的 ]; 刪掉了

let currentLevel = 0; 

// ==========================================
// 2. 抓取 HTML 元素
// ==========================================
const cssInput = document.getElementById('css-input');
const sushiContainer = document.getElementById('sushi-container');
const platesContainer = document.getElementById('plates-container');
const nextBtn = document.getElementById('next-btn');
const instructionsDisplay = document.getElementById('instructions');
const levelSelector = document.getElementById('level-selector');
const totalLevelsDisplay = document.getElementById('total-levels');
const hintBtn = document.getElementById('hint-btn');
const hintDisplay = document.getElementById('hint-display');

// ==========================================
// 3. 核心功能：初始化關卡選單與載入關卡
// ==========================================
// 新增：動態生成關卡選擇器的按鈕
function initLevelSelector() {
    levelSelector.innerHTML = ''; // 清空容器
    levels.forEach((levelData, index) => {
        const btn = document.createElement('button');
        btn.classList.add('level-dot');
        btn.innerText = levelData.level;
        
        // 點擊按鈕時，跳轉到對應關卡
        btn.addEventListener('click', () => {
            currentLevel = index;
            loadLevel(currentLevel);
        });
        levelSelector.appendChild(btn);
    });
}

function loadLevel(levelIndex) {
    const levelData = levels[levelIndex];
    
    instructionsDisplay.innerHTML = `<p>${levelData.instructions}</p>`;

    // 👇 刪除原本更新文字的邏輯，改成更新按鈕的 active 狀態
    document.querySelectorAll('.level-dot').forEach((btn, index) => {
        if (index === levelIndex) {
            btn.classList.add('active');
            // 讓卷軸自動滑動到目前關卡的位置
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            btn.classList.remove('active');
        }
    });

    hintDisplay.innerHTML = levelData.hint;
    hintDisplay.classList.remove('show'); 
    hintBtn.innerText = "💡 顯示提示";     

    platesContainer.style.cssText = levelData.plateSetup;
    platesContainer.innerHTML = levelData.plateHtml;
    
    sushiContainer.style.cssText = levelData.sushiSetup || ""; 
    sushiContainer.innerHTML = levelData.sushiHtml;
    
    cssInput.value = "";       
    nextBtn.disabled = true;   
    nextBtn.style.backgroundColor = "#e74c3c"; 
}

// ==========================================
// ... (保留後面的 btn.addEventListener 等其他程式碼) ...

// 遊戲啟動！先初始化選單，再載入第一關
initLevelSelector();
loadLevel(currentLevel);

// ==========================================
// 4. 新增：提示按鈕點擊事件
// ==========================================
hintBtn.addEventListener('click', () => {
    hintDisplay.classList.toggle('show');
    if (hintDisplay.classList.contains('show')) {
        hintBtn.innerText = "💡 隱藏提示";
    } else {
        hintBtn.innerText = "💡 顯示提示";
    }
});

// ==========================================
// 5. 核心功能：監聽玩家輸入並判斷過關
// ==========================================
cssInput.addEventListener('input', () => {
    const userInput = cssInput.value;
    const levelData = levels[currentLevel];
    
    // 這裡也要修改：將玩家輸入附加在預設樣式之後
    sushiContainer.style.cssText = (levelData.sushiSetup || "") + userInput;

    const jsProperty = camelCase(levelData.expectedProperty);
    
    if (sushiContainer.style[jsProperty] === levelData.expectedValue) {
        nextBtn.disabled = false; 
        nextBtn.style.backgroundColor = "#2ecc71"; 
    } else {
        nextBtn.disabled = true;
        nextBtn.style.backgroundColor = "#e74c3c"; 
    }
});

// ==========================================
// 6. 其他輔助功能
// ==========================================
nextBtn.addEventListener('click', () => {
    if (currentLevel < levels.length - 1) {
        currentLevel++;
        loadLevel(currentLevel);
    } else {
        alert("🍣 恭喜你完成所有關卡！你現在是 Flexbox 壽司大師了！");
    }
});

function camelCase(str) {
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

// 遊戲啟動！載入第一關
loadLevel(currentLevel);