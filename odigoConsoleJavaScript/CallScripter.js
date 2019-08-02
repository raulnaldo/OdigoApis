///////////get token/////////////

var data = JSON.stringify({
  "userUid": "agent176ddi@demo.com",
  "appUid": "fxBYAMsu7Ja9OM3ezAhLAvLPLRsa"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;


xhr.onload  = function (aEvt) {
  console.log("Result:",aEvt)
  if (xhr.readyState == 4) {
     if(xhr.status == 200) {  
       [var_token]=JSON.parse(aEvt.target.response).accessToken;
       alert([var_token]);
     } 
     else
      dump("Error loading page\n");
  }
};


xhr.open("POST", "https://paas-de01.prosodie.com:443/auth/v2/routing_de01/direct-access-claim-sets",true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Authorization", "Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk=");
xhr.send(data);

///////////hangupcall/////////////

try{
console.log("-->ButHangUp");
var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.onload  = function (aEvt) {
  console.log("Result:",aEvt);
  if (xhr.readyState == 4) {
     if(xhr.status == 200) {       
      console.log("hangupcall");
     } 
     else
      alert("Error:",xhr.status);
  }
};
xhr.open("POST", 'https://paas-de01.prosodie.com:443/agent/v1/agents/' + [var_Login].replace('@', '%40') + '/commands/hangUpCall' ,true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("X-API-TOKEN", [var_token]);
xhr.setRequestHeader("X-WS-INSTANCE", 'de01');

xhr.send();
console.log("<--ButHangUp");
}
catch(error){
  console.log(error);
}