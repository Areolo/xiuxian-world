/*
========================================
修仙世界 V1.0
========================================
*/

//========================
// 玩家数据
//========================

const Player = {

    name: "无名修士",

    realm: "练气一层",

    level: 1,

    stone: 100,

    hp: 100,
    maxHp: 100,

    mp: 100,
    maxMp: 100,

    exp: 0,
    need: 100,

    attack: 10,

    defense: 5,

    speed: 10,

    luck: 10

};

//========================
// 修炼状态
//========================

let cultivating = false;

let timer = null;

//========================
// 页面加载
//========================

window.onload=function(){

    bindMenu();

    bindButton();

    loadGame();

    refreshUI();
    saveGame();

}

//========================
// 菜单切换
//========================

function bindMenu(){

    const pages=document.querySelectorAll(".page");

    const buttons=document.querySelectorAll("#bottom button");

    buttons.forEach(btn=>{

        btn.onclick=function(){

            pages.forEach(page=>{

                page.classList.remove("active");

            });

            buttons.forEach(item=>{

                item.classList.remove("active");

            });

            document
                .getElementById(btn.dataset.page)
                .classList.add("active");

            btn.classList.add("active");

        }

    });

}

//========================
// 按钮
//========================

function bindButton(){

    document
        .getElementById("cultivateBtn")
        .onclick=startCultivation;

    document
        .getElementById("breakBtn")
        .onclick=breakRealm;

}

//========================
// 开始修炼
//========================

function startCultivation(){

    if(cultivating){

        return;

    }

    cultivating=true;

    document.getElementById("cultivateBtn").innerText="修炼中...";

    timer=setInterval(()=>{

        Player.exp+=5;

        if(Player.exp>Player.need){

            Player.exp=Player.need;

        }

        refreshUI();

    },1000);

}

//========================
// 突破
//========================

function breakRealm(){

    if(Player.exp<Player.need){

        alert("修为不足！");

        return;

    }

    Player.level++;

    Player.exp=0;

    Player.need+=100;

    Player.maxHp+=20;

    Player.hp=Player.maxHp;

    Player.maxMp+=10;

    Player.mp=Player.maxMp;

    Player.attack+=3;

    Player.defense+=2;

    Player.stone+=20;

    Player.realm="练气"+Player.level+"层";

    refreshUI();

    alert("突破成功！");

}

//========================
// 刷新UI
//========================

function refreshUI(){

    document.getElementById("playerName").innerText=Player.name;

    document.getElementById("playerRealm").innerText=Player.realm;

    document.getElementById("stone").innerText=Player.stone;

    document.getElementById("power").innerText=
        Player.attack*5+
        Player.defense*3+
        Player.level*20;

    document.getElementById("hpText").innerText=
        Player.hp+" / "+Player.maxHp;

    document.getElementById("mpText").innerText=
        Player.mp+" / "+Player.maxMp;

    document.getElementById("expText").innerText=
        Player.exp+" / "+Player.need;

    document.getElementById("hpBar").style.width=
        Player.hp/Player.maxHp*100+"%";

    document.getElementById("mpBar").style.width=
        Player.mp/Player.maxMp*100+"%";

    document.getElementById("expBar").style.width=
        Player.exp/Player.need*100+"%";

    document.getElementById("atk").innerText=
        Player.attack;

    document.getElementById("def").innerText=
        Player.defense;

    document.getElementById("speed").innerText=
        Player.speed;

    document.getElementById("luck").innerText=
        Player.luck;
//========================
// 存档系统
//========================

const SAVE_KEY = "xiuxian_save";

function saveGame(){

    localStorage.setItem(

        SAVE_KEY,

        JSON.stringify(Player)

    );

}

function loadGame(){

    const text = localStorage.getItem(SAVE_KEY);

    if(!text){

        return;

    }

    Object.assign(

        Player,

        JSON.parse(text)

    );

}

// 自动保存

setInterval(function(){

    saveGame();

},10000);
}

//=== 简易自动存档 ===
const SAVE_KEY="xiuxian_v02";
function saveGame(){localStorage.setItem(SAVE_KEY,JSON.stringify(Player));}
function loadGame(){const t=localStorage.getItem(SAVE_KEY);if(!t)return;Object.assign(Player,JSON.parse(t));}
const _old=window.onload;
window.onload=function(){loadGame();if(_old)_old();refreshUI();setInterval(saveGame,10000);}
