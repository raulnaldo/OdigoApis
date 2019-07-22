//http://localhost:3000/Apis.html#?agentId=agente176ddi@demo.com&gate=InfoGate&callref=98769dsfjsdfj9079087
(function () {
"use strict";

angular.module('OdigoApisModule')
.controller('OdigoApisController', OdigoApisController);

OdigoApisController.$inject = ['$location','OdigoApisService','userUid','appUid'];
function OdigoApisController($location,OdigoApisService,userUid,appUid) {  

  console.log('--> OdigoApisController Init()');

  var OdigoApisCtrl = this;
  OdigoApisCtrl.OdigoCallInfo=$location.search();

  console.log('--> $location.search():',$location.search());
  console.log('--> OdigoApisCtrl.OdigoCallInfo():',OdigoApisCtrl.OdigoCallInfo);


  OdigoApisCtrl.buttonSearchText='Get The Token Key!';
  OdigoApisCtrl.Token='';
  OdigoApisCtrl.userUid=userUid;
  OdigoApisCtrl.appUid=appUid;
  OdigoApisCtrl.userInfo={};
  OdigoApisCtrl.userActiveSettings={};  
  OdigoApisCtrl.OpStatus=''; 


//********************************
//ODIGO APIS METHODS
//********************************

  //GET THE TOKEN KEY
  OdigoApisCtrl.getTokenFromApi = function(){
      OdigoApisCtrl.OpStatus='';
      var promise= OdigoApisService.getToken();
      promise.then(function (response) {
          console.log('Then:',response.data);
          OdigoApisCtrl.OpStatus='200';
          OdigoApisCtrl.Token=response.data.accessToken;
        })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
          OdigoApisCtrl.OpStatus=error;
      });                
  };
  

//ODIGO AGENT STATUS

  OdigoApisCtrl.OdigoGetAgent = function(Token,Agent){
    console.log("--OdigoApisCtrl.OdigoGetAgent():",Token,Agent);
    OdigoApisCtrl.OpStatus='';
      var promise= OdigoApisService.OdigoGetAgent(Token,Agent);
      promise.then(function (response) {
          OdigoApisCtrl.OpStatus='200';
          OdigoApisCtrl.userActiveSettings={};
          OdigoApisCtrl.userInfo=response.data;          
        })
        .catch(function (error) {
          console.log("Error:",error.status);
          OdigoApisCtrl.OpStatus=error.status;
      });                
  }; 

  OdigoApisCtrl.OdigoGetAgentActiveSettings = function(Token,Agent){
    console.log("--OdigoApisCtrl.OdigoGetAgentActiveSettings():",Token,Agent);
    OdigoApisCtrl.OpStatus='';
      var promise= OdigoApisService.OdigoGetAgentActiveSettings(Token,Agent);
      promise.then(function (response) {
          OdigoApisCtrl.OpStatus='200';
          OdigoApisCtrl.userActiveSettings=response.data[0];
          console.log('OdigoApisCtrl.userActiveSettings:',OdigoApisCtrl.userActiveSettings);                              
        })
        .catch(function (error) {
          console.log("Error:",error.status);
          OdigoApisCtrl.OpStatus=error.status;
      });                
  }; 



//ODIGO API COMANDS

  //HANGUP  
  OdigoApisCtrl.OdigoHangUp = function(Token){
    OdigoApisCtrl.OpStatus='';
      var promise= OdigoApisService.OdigoHangUp(Token);
      promise.then(function (response) {
          OdigoApisCtrl.OpStatus='200';
          console.log('Then:',response.data);          
        })
        .catch(function (error) {
          console.log("Error:",error.status);
          OdigoApisCtrl.OpStatus=error.status;
      });                
  };    

  //END WRAPUP
  OdigoApisCtrl.OdigoEndWrapUp = function(Token,Agent){
    OdigoApisCtrl.OpStatus='';
    OdigoApisCtrl.CallReasonCreate={};
    OdigoApisCtrl.CallReasonCreate.agentId=OdigoApisCtrl.userUid;
    OdigoApisCtrl.CallReasonCreate.callId=OdigoApisCtrl.OdigoCallInfo.CallRef;
    OdigoApisCtrl.CallReasonCreate.gateId='GT Demo 176';
    OdigoApisCtrl.CallReasonCreate.keyboardDuration=0;
    var reason={};
    reason.key='Folder';
    reason.value='Valor De Reason';
    OdigoApisCtrl.CallReasonCreate.reasons=[reason];
    OdigoApisCtrl.CallReasonCreate.storing=true;
    OdigoApisCtrl.CallReasonCreate.wrapUpEnd=true;
    

      var promise= OdigoApisService.OdigoEndWrapUp(Token,Agent,OdigoApisCtrl.CallReasonCreate);
      promise.then(function (response) {
          OdigoApisCtrl.OpStatus='200';
          console.log('Then:',response.data);          
        })
        .catch(function (error) {
          console.log("Error:",error.status);
          OdigoApisCtrl.OpStatus=error.status;
      });                
  };

  //ANSWER
  OdigoApisCtrl.OdigoAnswer = function(Token){
    alert(Token);
    OdigoApisCtrl.OpStatus='';
  };



   OdigoApisCtrl.getTokenFromApi();  

}


})();
