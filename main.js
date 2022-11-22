let untyped = '';
let typed = '';
let score = 0;

const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

//テキストを表示
const textLists = [
    'HelloWorld','ReactHooks','Redux',
    'laraveladmin','javascript','github',
    'component','api','python','history',
    'background','Ruby','php',
    'golang','mysql','nuxt'
];
 //テキストをランダムに表示
 const createText = () => {

    typed = '';
    typedfield.textContent = typed;

    let random= Math.floor(Math.random() * textLists.length);

     untyped = textLists[random];
     untypedfield.textContent = untyped;
 };

//キー入力判定
const keyPress = e => {

    //誤タイプの場合
    if(e.key !== untyped.substring(0, 1)) {
        wrap.classList.add('mistyped');

        setTimeout(() =>　{
            wrap.classList.remove('mistyped');
        },100);
        return;
    }

    //正タイプの場合
　   score++;
    typed += untyped.substring(0, 1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent= untyped;

//新しいテキストの表示
if(untyped === ''){
    createText();
}
};

//ランク判定
const rankCheck = score => {

    let text = '';


if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
 }else if(score < 200) {
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です`;
    } else if(score < 300) {
        text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
      } else if(score >= 300) {
        text = `あなたのランクはSです。\nおめでとうございます!`; 
    }
   
    return `${score}文字打てました！\n${text}\n【OK】リトライ　/ 【キャンセル】終了`;
};

//ゲーム終了
const gameOver = id => {
    clearInterval(id);

    const result = confirm(rankCheck(score));

if(result == true){
    window.location.reload();
}
};


//カウントダウンタイマー
const timer = () => {
    let time = count.textContent;

    const id = setInterval(()=> {

        //カウントダウン
        time--;
        count.textContent = time;

        //0になったらタイマー停止
        if(time <= 0){
            gameOver(id);
        }
    },1000);
};

//スタート時の処理
start.addEventListener('click' , () =>{

    //カウントダウン開始
    timer();

    //ランダムにテキストを表示
    createText();

    //startボタンを非表示にする
    start.style.display = 'none';

    //キーボードの処理
    document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'Startボタンで開始';
