//http://localhost:3000/Apis.html#?agentId=agente176ddi@demo.com&gate=InfoGate&callref=98769dsfjsdfj9079087
(function () {
"use strict";

angular.module('OdigoApisModule')
.controller('OdigoApisController', OdigoApisController);

OdigoApisController.$inject = ['$location','OdigoApisService','userUid','appUid','$scope','$sce','$window'];
function OdigoApisController($location,OdigoApisService,userUid,appUid,$scope, $sce,$window) {  

  console.log('--> OdigoApisController Init()'); 

  var OdigoApisCtrl = this;
  OdigoApisCtrl.OdigoCallInfo=$location.search();

  console.log('--> $location.search():',$location.search());
  console.log('--> OdigoApisCtrl.OdigoCallInfo():',OdigoApisCtrl.OdigoCallInfo);

  OdigoApisCtrl.OdigoCallInfo.GateId='GT Demo 176';

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
  OdigoApisCtrl.OdigoHangUp = function(Token,Agent){
    OdigoApisCtrl.OpStatus='';
      var promise= OdigoApisService.OdigoHangUp(Token,Agent);
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
    OdigoApisCtrl.CallReasonCreate.gateId=OdigoApisCtrl.OdigoCallInfo.GateId;
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

    //CALL CODIFICATIONS
  OdigoApisCtrl.OdigovalidateCallCodifications = function(Token,Agent){
    OdigoApisCtrl.OpStatus='';
    OdigoApisCtrl.CallCodification={};

    OdigoApisCtrl.CallCodification.callBackId='';
    OdigoApisCtrl.CallCodification.callId=OdigoApisCtrl.OdigoCallInfo.CallRef;
    OdigoApisCtrl.CallCodification.campaignId='';
    var field={};
    field.label='Folder';
    field.order=1;
    field.value='123456';
    OdigoApisCtrl.CallCodification.fields=[ 
        {
        "label" : "CallRef",
        "value" : OdigoApisCtrl.OdigoCallInfo.CallRef,
        "order" : 1
        },
        {
        "label" : "CallComments",
        "value" : "Estos son los comentarios",
        "order" : 2
        }
        ];
    OdigoApisCtrl.CallCodification.gateKeyWord='gt_demo_176';
    OdigoApisCtrl.CallCodification.isStoringRecord=true;

    OdigoApisCtrl.CallCodification.reasons=[ 
      {
        "id" : 193,
        "label" : "OtherBank"
      }
    ];

    var promise= OdigoApisService.OdigovalidateCallCodifications(Token,Agent,OdigoApisCtrl.CallCodification);
    promise.then(function (response) {
        OdigoApisCtrl.OpStatus='200';
        console.log('Then:',response.data);          
      })
      .catch(function (error) {
        console.log("Error:",error.status);
        OdigoApisCtrl.OpStatus=error.status;
    });                
  };

    //REASONS OF CONVERSATIONS
  OdigoApisCtrl.ReasonsOfConversation = function(Token,Agent){
    console.log('--> ReasonsOfConversation()');
    console.log(Token,Agent);
    OdigoApisCtrl.OpStatus='';
    OdigoApisCtrl.ReasonsOfConversation={};
    OdigoApisCtrl.ReasonsOfConversation.freeReasonsOfConversation=[
      {
        "label" : "Producto",
        "value" : "Movil Samsung"
      }
    ];
    OdigoApisCtrl.ReasonsOfConversation.reasonsOfConversation=['OtherBank'];
    OdigoApisCtrl.ReasonsOfConversation.conversationNumber=1;    
    OdigoApisCtrl.ReasonsOfConversation.sessionReference=OdigoApisCtrl.OdigoCallInfo.CallRef;

    console.log(OdigoApisCtrl.ReasonsOfConversation);
    var promise= OdigoApisService.ReasonsOfConversation(Token,Agent,'DE01', OdigoApisCtrl.ReasonsOfConversation);
    promise.then(function (response) {
        OdigoApisCtrl.OpStatus='200';
        console.log('Then:',response.data);          
        console.log('<-- ReasonsOfConversation()');
      })
      .catch(function (error) {
        console.log("Error:",error.status);
        OdigoApisCtrl.OpStatus=error.status;
        console.log('<-- ReasonsOfConversation()');
    });                
  };

  //GATE CODIFICATIONS SETTINGS  
  OdigoApisCtrl.OdigoGetGateCodificationSettings = function(Token,Agent){
    OdigoApisCtrl.OpStatus='';
      var promise= OdigoApisService.OdigoGetGateCodificationSettings(Token,Agent);
      promise.then(function (response) {
          OdigoApisCtrl.OpStatus='200';
          console.log('Then:',response.data);          
        })
        .catch(function (error) {
          console.log("Error:",error.status);
          OdigoApisCtrl.OpStatus=error.status;
      });                
  };  


  //GATE CODIFICATIONS

  OdigoApisCtrl.OdigoGetGateCodifications = function(Token,Agent,Gate){
    OdigoApisCtrl.OpStatus='';
      var promise= OdigoApisService.OdigoGetGateCodifications(Token,Agent,Gate);
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


//ATTACH TO VIDEO

OdigoApisCtrl.OdigoLoadVideo = function(pVideoRoom){    
    console.log(pVideoRoom);
    //OdigoApisCtrl.videSessionUrl='https://webrtc.demo.ivrpowers.com/webclient?theme=odigo&autocall=false&callerid='+pVideoRoom;
    //$window.open('https://webrtc.demo.ivrpowers.com/split_agent_popup?theme=odigo&room='+pVideoRoom);
    $scope.currentProjectUrl = $sce.trustAsResourceUrl('https://webrtc.demo.ivrpowers.com/split_agent_popup?theme=odigo&room='+pVideoRoom);    
    console.log(OdigoApisCtrl.videSessionUrl);
};



OdigoApisCtrl.getTokenFromApi();  

}


})();
