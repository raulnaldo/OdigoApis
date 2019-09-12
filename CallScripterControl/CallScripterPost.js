creacion de IFRAME
*****************************************
var f = document.createElement("form");
f.setAttribute('method',"post");
f.setAttribute('action',"https://capgemini.callscripter.com");
f.setAttribute('target',"TestFrame");

var MyCsFrame = document.createElement("iframe");
MyCsFrame.setAttribute("id","TestFrame");
MyCsFrame.setAttribute("name","TestFrame");
f.setAttribute('target',"TestFrame");

var i = document.createElement("input"); //input element, text
i.setAttribute('type',"text");
i.setAttribute('name',"username");

var s = document.createElement("input"); //input element, Submit button
s.setAttribute('type',"submit");
s.setAttribute('value',"Submit");

f.appendChild(i);
f.appendChild(s);

//and some more input elements here
//and dont forget to add a submit button

document.getElementsByTagName('body')[0].appendChild(f);
document.getElementsByTagName('body')[0].appendChild(MyCsFrame);

f.submit();

*****************************************
************ACCESO A iframe
*****************************************

var MyIframe=document.getElementById('thirdPartyAppIframeWrap').children[1].getElementsByTagName('iframe')[0];
MyIframe.setAttribute("id","csframe");
MyIframe.setAttribute("name","csframe");


var f = document.createElement("form");
f.setAttribute("id","formtest");
f.setAttribute("name","formtest");
f.setAttribute('method',"post");
f.setAttribute('action',"https://capgemini.callscripter.com");
f.setAttribute('target',"csframe");

var i = document.createElement("input"); //input element, text
i.setAttribute('type',"text");
i.setAttribute('name',"username");

var s = document.createElement("input"); //input element, Submit button
s.setAttribute('type',"submit");
s.setAttribute('value',"Submit");

f.appendChild(i);
f.appendChild(s);

//and some more input elements here
//and dont forget to add a submit button

var MyBody=document.getElementsByTagName('body')[0];
var NgObject=MyBody.getElementsByTagName('od-app')[0];
var NgOdPartners=NgObject.getElementsByTagName('od-partners')[0];
NgOdPartners.appendChild(f);

