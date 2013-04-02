// 要素ら

var $document = $(document);
var $hitarea = $('#hitarea');
var $eventname = $('#eventname');
var $x = $('#x');
var $y = $('#y');

// 対応するイベント名を取得する関数

var getRelatedEventNames = function(eventName) {
  if(eventName === 'touchstart') {
    return {
      move: 'touchmove',
      end: 'touchend'
    };
  }
  if(eventName === 'mousedown') {
    return {
      move: 'mousemove',
      end: 'mouseup'
    };
  }
  if(eventName === 'MSPointerDown') {
    return {
      move: 'MSPointerMove',
      end: 'MSPointerUp'
    };
  }
  if(eventName === 'pointerdown') {
    return {
      move: 'pointermove',
      end: 'pointerup'
    };
  }
};

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
    // jQueryは最近のイベントについてnormalizeしてくれないので、
    // だめならオリジナルのイベントのプロパティを参照する
    x = event.pageX || original.pageX;
    y = event.pageY || original.pageY;
  }
  $x.text(x);
  $y.text(y);
};
var updateEventname = function(eventname) {
  $eventname.text(eventname);
};

// イベント設定

var currentEventNameSet; // イベント名情報を保存する変数

var handleStart = function(event) {
  event.preventDefault(); // 2度、開始イベントを起こさないようにする
  currentEventNameSet = getRelatedEventNames(event.type);
  updateEventname(event.type);
  updateXY(event);
  $hitarea.css('background-color', 'red');
  bindMoveAndEnd();
};
var handleMove = function(event) {
  updateEventname(currentEventNameSet.move);
  updateXY(event);
};
var handleEnd = function(event) {
  updateEventname(currentEventNameSet.end);
  updateXY(event);
  $hitarea.css('background-color', 'blue');
  unbindMoveAndEnd();
  currentEventNameSet = null;
};
var bindMoveAndEnd = function() {
  $document.on(currentEventNameSet.move, handleMove);
  $document.on(currentEventNameSet.end, handleEnd);
};
var unbindMoveAndEnd = function() {
  $document.off(currentEventNameSet.move, handleMove);
  $document.off(currentEventNameSet.end, handleEnd);
};

$hitarea.on('touchstart mousedown MSPointerDown pointerdown', handleStart); // 両方設定
