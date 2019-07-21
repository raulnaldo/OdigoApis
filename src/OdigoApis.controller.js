(function () {
"use strict";

angular.module('OdigoApisModule')
.controller('OdigoApisController', OdigoApisController);

OdigoApisController.$inject = ['OdigoApisService','userUid','appUid'];
function OdigoApisController(OdigoApisService,userUid,appUid) {  
  var OdigoApisCtrl = this;

  OdigoApisCtrl.buttonSearchText='Get The Token Key!';
  OdigoApisCtrl.Token='';
  OdigoApisCtrl.userUid=userUid;
  OdigoApisCtrl.appUid=appUid;
  OdigoApisCtrl.OpStatus='';


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


  //ANSWER
  OdigoApisCtrl.OdigoAnswer = function(Token){
    alert(Token);
    OdigoApisCtrl.OpStatus='';
  };





}


})();
