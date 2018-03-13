$(function(){
    let iframe = document.getElementById("contentiframe");
    let iwindow = iframe.contentWindow;
    let idoc = iwindow.document;
    let classtime=idoc.getElementsByClassName("classtime");
    let tripcat=idoc.getElementsByClassName("tripcat");

    // 时间
    let time="";
    for (let i = 1; i < classtime.length; i++) {
        time+=$(classtime).eq(i).find("p")[1].innerText;
        if (i<classtime.length-1) {
            time+="\n";
        }
    };

    // 已售票数
    let votesMay="";
    for (let i = 1; i < tripcat.length; i++) {
        let e=$(tripcat).eq(i).find("p")[0];
        let srt=e.innerText;
        votes=srt.split("/")[1];

        votesMay+=votes;
        if (i<tripcat.length-1) {
            votesMay+="\n";
        }
    };

    chrome.extension.sendMessage({
        time:time,
        votesMay:votesMay
    },function(response) {
        console.log("传参数给扩展");
    });

});
