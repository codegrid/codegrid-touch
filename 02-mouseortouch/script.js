// 要素ら

var $document = $(document);
var $hitarea = $('#hitarea');
var $eventname = $('#eventname');
var $x = $('#x');
var $y = $('#y');

// タッチイベントが利用可能かの判別

var supportTouch = 'ontouchend' in document;

// イベント名

var EVENTNAME_TOUCHSTART = supportTouch ? 'touchstart' : 'mousedown';
var EVENTNAME_TOUCHMOVE = supportTouch ? 'touchmove' : 'mousemove';
var EVENTNAME_TOUCHEND = supportTouch ? 'touchend' : 'mouseup';

// 表示をアップデートする関数群

var updateXY = function(event) {
  // jQueryのイベントはオリジナルのイベントをラップしたもの。
  // changedTouchesが欲しいので、オリジナルのイベントオブジェクトを取得
  var original = event.originalEvent;
  var x, y;
  if(original.changedTouches) {
    x = original.changedTouches[0].pageX;
    y = original.changedTouches[0].pageY;
  } else {
    x = event.pageX;
    y = event.pageY;
  }
  $x.text(x);
  $y.text(y);
};
var updateEventname = function(eventname) {
  $eventname.text(eventname);
};

// イベント設定

var touchStarted = false; // タッチ中かどうかを保存しておく

$hitarea.on(EVENTNAME_TOUCHSTART, function(event) {
  updateEventname(EVENTNAME_TOUCHSTART);
  updateXY(event);
  $hitarea.css('background-color', 'red');
  touchStarted = true;
});

$document.on(EVENTNAME_TOUCHMOVE, function(event) {
  if(!touchStarted) { return; } // タッチ開始されていなければ関係なし
  event.preventDefault(); // タッチによる画面スクロールを止める
  updateEventname(EVENTNAME_TOUCHMOVE);
  updateXY(event);
});

$document.on(EVENTNAME_TOUCHEND, function(event) {
  if(!touchStarted) { return; } // タッチ開始されていなければ関係なし
  updateEventname(EVENTNAME_TOUCHEND);
  updateXY(event);
  $hitarea.css('background-color', 'blue');
  touchStarted = false;
});
