jQuery(document).ready(function() {
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
    
    $('.btnNext').on('click', function(){
        if(currStep == 1)
        {
            var phone = $('#phone').val();
            var name = $('#name').val();
            var pwd = $('#pwd').val();
            var checkPwd = $('#checkPwd').val();
            var acc = $('#acc').val();
            
            if (phone == "" || name == "" || pwd == "" || acc == "")
            {
                alert("必填欄位不可為空");
                return;
            }
            
            if (pwd != checkPwd)
            {
                alert("密碼與確認密碼不一致");
                return;
            }
        }
        
        if(currStep == 2)
        {
            var pic = $('#pic').val();
            var pic2 = $('#pic2').val();
            
            if (pic == "" || pic2 == "")
            {
                alert("必填欄位不可為空");
                return;
            }
        }
        stepper.next();
        
    });
    
    $('.btnPrev').on('click', function(){
        stepper.previous()
    });
    
    $('#btnSimulate').on('click', function(){
        var kind = $('#kind').val();
        var contact = $('#contact').val();
        var tel = $('#tel').val();
        var address = $('#address').val();
        
        if (kind == "" || contact == "" || tel == "" || address == "")
        {
            alert("必填欄位不可為空");
            return;
        }
        
        //模擬送出表單，註記已完成，不再允許切換步驟
        stepper.next();
        done = true;
        $('#frmSupplier').submit();
    });
    
});