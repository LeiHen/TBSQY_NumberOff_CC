alert("2122");
var iframe = document.getElementById("contentiframe");
var iwindow = iframe.contentWindow;
var idoc = iwindow.document;
var classtime=idoc.getElementsByClassName("classtime");

var time="";
for (var i = 1; i < classtime.length; i++) {
    time+=classtime[1].childNodes[3].innerText;
    time+="<br>";
};
// var items = {};
// items["time"] = time;
// chrome.storage.sync.set(items);

// chrome.cookies.set("time",decodeURI(time));
//

console.log(time);
alert(time);

// chrome.cookies.set({
//     "url":"http://qyn.taobus.com.cn",
//     "name":"time",
//     "value":"time",
//     "secuer":false,
//     "httpOnly":false
// },function(cookie){console.log(cookie);});
