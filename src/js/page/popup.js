let popup={
    ops:{
        debug: false               // 是否开启内测版
    },
    init:(el)=>{
        let ops=el.ops;

        // 绑定事件
        el.initEvent(el);

        // document.addEventListener('DOMContentLoaded', function () {
        //     // 绑定事件
        //     el.initEvent(el);
        // });

    },
    initQuoteScript:(el)=>{
        chrome.tabs.executeScript(null, {
            file:"js/lib/jquery-3.2.1.min.js"
        });

        chrome.tabs.executeScript(null, {
            file:"js/content_script.js"
        });
    },
    initEvent:(el)=>{
        let $timeTextarea=$("#timeTextarea");
        let $timeBtnUpdata=$("#timeBtnUpdata");
        let $timeBtnCopy=$("#timeBtnCopy");

        let $votesTextarea=$("#votesTextarea");
        let $votesBtnUpdata=$("#votesBtnUpdata");
        let $votesBtnCopy=$("#votesBtnCopy");

        $timeBtnUpdata.click(function(){
            // 引用脚本
            el.initQuoteScript(el);

            el.timeUpdata(el);

            el.votesUpdata(el);
        });

        $timeBtnCopy.click(function(){
            el.timeCopy(el);
        });

        $votesBtnUpdata.click(function(){
            // 引用脚本
            el.initQuoteScript(el);

            el.votesUpdata(el);

            el.timeUpdata(el);
        });

        $votesBtnCopy.click(function(){
            el.votesCopy(el);
        });
    },
    timeUpdata:(el)=>{
        let $timeTextarea=$("#timeTextarea");
        let obj={
            obj:$timeTextarea,
            property:"time"
        };
        el.updateData(el,obj);
    },
    timeCopy:(el)=>{
        let $timeTextarea=$("#timeTextarea");
        el.copyData(el,$timeTextarea);
    },
    votesUpdata:(el)=>{
        let $votesTextarea=$("#votesTextarea");
        let obj={
            obj:$votesTextarea,
            property:"votesMay"
        };
        el.updateData(el,obj);
    },
    votesCopy:(el)=>{
        let $votesTextarea=$("#votesTextarea");
        el.copyData(el,$votesTextarea);
    },
    // 公共 复制数据
    copyData:(el,obj)=>{
        // 选中
        obj.select();
        // 复制至剪切板
        document.execCommand('Copy','false',null);
        // 移除焦点
        obj.blur();

        el.updateaAlertInfo("复制成功",true);
    },
    // 公共 获取数据
    updateData:(el,obj)=>{


        chrome.extension.onMessage.addListener(function(request,sender, sendResponse) {
            // 获取失败
            if(request==undefined|| request.time==undefined || request.votesMay==undefined){
                el.updateaAlertInfo("获取失败",false);
                return false;
            }
            // 获取成功
            obj.obj.html(request[obj.property]);
            el.updateaAlertInfo("获取成功",true);
        });
    },
    // 更新 信息层
    updateaAlertInfo:(str,state)=>{
        let $alert=$(".alert");
        $alert.text(str);
        if (state) {
            $alert.removeClass('alert-danger').addClass('alert-success');
        }else{
            $alert.removeClass('alert-success').addClass('alert-danger');
        }

    }
}


//初始化 统一入口
function init(){
    popup.init(popup);
    // document.addEventListener('DOMContentLoaded', function () {
        // popup.init(popup);
    // });

}
init();

// document.addEventListener('DOMContentLoaded', function () {
//     popup.init(popup);
//     popup.initQuoteScript(popup);
// });
