var stepperElem = document.querySelector('.bs-stepper');
    var stepper = new Stepper(stepperElem);
    var done = false;
    var currStep = 1;
    history.pushState(currStep, '');
    //切換到步驟前觸發，呼叫e.preventDefault()可阻止切換
    stepperElem.addEventListener("show.bs-stepper", function (e) {
      if (done) { //若程序完成，不再切換
        e.preventDefault();
        return;
      }
    });
    //切換到步驟後觸發，e.detail.indexStep為目前步驟序號(從0開始)
    stepperElem.addEventListener("shown.bs-stepper", function (e) {
      var idx = e.detail.indexStep + 1;
      currStep = idx;
      //pushState()記下歷程以支援瀏覽器回上頁功能
      history.pushState(idx, '');
    })
    //瀏覽器上一頁下一頁觸發
    window.onpopstate = function (e) {
      if (e.state && e.state != currStep)
        stepper.to(e.state);
    };
    //模擬送出表單，註記已完成，不再允許切換步驟
    function simulateSubmit() {
      stepper.next();
      done = true;
    }