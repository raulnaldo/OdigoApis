(function () {
"use strict";

angular.module('OdigoApisModule')
.service('OdigoApisService', OdigoApisService);


OdigoApisService.$inject = ['$http', 'ApiPath','ApiAuthPath','CI360ApiPath','userUid','appUid'];
function OdigoApisService($http, ApiPath,ApiAuthPath,CI360ApiPath,userUid,appUid) {
  var service = this;



//********************************
//ODIGO APIS METHODS
//********************************



//GET THE TOKEN KEY
//*****************************
  service.getToken = function () {
    var MyToken={};
    var response = $http({
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk='
       },
       data: {"userUid": userUid,"appUid": appUid},
      url: (ApiAuthPath)
    });

    return response;
  };



//GET AGENT STATUS
//*****************************
  service.OdigoGetAgent = function (Token,Agent) {
    console.log('Enviamos eso:',Token,Agent);
    var response = $http({
      method: "GET",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk=',
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'de01'
       },       
      url: (ApiPath + Agent.replace('@', '%40'))
    });
    return response;
  };

  service.OdigoGetAgentActiveSettings = function (Token,Agent) {
    console.log('Enviamos eso:',Token,Agent);
    var response = $http({
      method: "GET",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk=',
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'de01'
       },       
      url: (ApiPath + Agent.replace('@', '%40') + '/active-settings')
    });
    return response;
  };  


//HANG UP
//*****************************
  service.OdigoHangUp = function (Token,Agent) {
    console.log('--> OdigoHangUp()');
    var response = $http({
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'de01'
       },       
      url: (ApiPath + Agent.replace('@', '%40') + '/commands/hangUpCall')
    });
    console.log('<-- OdigoHangUp()');
    return response;
  };

//HOLD CALL
//*****************************
  service.OdigoHold = function (Token,Agent) {
    console.log('--> OdigoHold()');
    var response = $http({
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk=',
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'de01'
       },       
      url: (ApiPath + Agent.replace('@', '%40') + '/commands/holdOnCall')
    });
    console.log('<-- OdigoHold()');
    return response;
  };

//OUTGOING CALL
//*****************************
  service.OdigoOutGoingCall = function (Token,Agent,OutgoingCall) {
    console.log('--> OdigoOutGoingCall()');
    var response = $http({
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk=',
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'de01'
       },       
      url: (ApiPath + Agent.replace('@', '%40') + '/commands/holdOnCall'),
      data: OutgoingCall
    });
    console.log('<-- OdigoOutGoingCall()');
    return response;
  };

//RETREAVE
//*****************************
  service.OdigoOutRetreave = function (Token,Agent) {
    console.log('--> OdigoOutRetreave()');
    var response = $http({
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk=',
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'de01'
       },       
      url: (ApiPath + Agent.replace('@', '%40') + '/commands/takeBackCall')
      
    });
    console.log('<-- OdigoOutRetreave()');
    return response;
  };


//Start Record Call
//*****************************
  service.OdigoStartRecord = function (Token,Agent) {
    console.log('--> OdigoStartRecord()');
    var response = $http({
      method: "POST",
      headers: {
         'Content-Type': 'application/json',         
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'de01'
       },              
      url: (ApiPath + Agent.replace('@', '%40') + '/commands/startRecordCall')
    });
    console.log('<-- OdigoStartRecord()');
    return response;
  };


//TRANSFER
//*****************************
  service.OdigoTransfer = function (Token,Agent,TransferRequest) {
    console.log('--> OdigoTransfer()');
    var response = $http({
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk=',
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'de01'
       },       
      url: (ApiPath + Agent.replace('@', '%40') + '/commands/takeBackCall'),
      data: TransferRequest
    });
    console.log('<-- OdigoTransfer()');
    return response;
  };



//SWITCH
//*****************************
  service.OdigoSwitch = function (Token,Agent) {
    console.log('--> OdigoSwitch()');
    var response = $http({
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk=',
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'de01'
       },       
      url: (ApiPath + Agent.replace('@', '%40') + '/commands/comingAndGoingCall')
    });
    console.log('<-- OdigoSwitch()');
    return response;
  };

//END WRAPUP
//*****************************
  service.OdigoEndWrapUp = function (Token,Agent,CallReasonCreate) {
    console.log('--> OdigoEndWrapUp()');
    var response = $http({
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk=',
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'de01'
       },       
      url: (ApiPath + Agent.replace('@', '%40') + '/commands/callFreeReason'),
      data: CallReasonCreate
    });
    console.log('<-- OdigoEndWrapUp()');
    return response;
  };

//VALIDATE CODIFICATIONS
//*****************************
  service.OdigovalidateCallCodifications = function (Token,Agent,CallCodification) {
    console.log('--> OdigovalidateCallCodifications()',CallCodification);
    var response = $http({
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk=',
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'de01'
       },       
      url: (ApiPath + Agent.replace('@', '%40') + '/commands/validateCallCodifications'),
      data: CallCodification
    });
    console.log('<-- OdigovalidateCallCodifications()');
    return response;
  };

  //REASONS OF CONVERSATIONS
//*****************************
  service.ReasonsOfConversation = function (Token,Agent,Service,CallId,ReasonsOfConversation) {
    console.log('--> ReasonsOfConversation()',Service,ReasonsOfConversation);
    var response = $http({
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk=',
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'DE01'
       },       
      url: (CI360ApiPath + '/ci360/v3/'+Service+'/voice-interactions/'+CallId+'/reasonsOfConversation'),
      data: ReasonsOfConversation
    });
    console.log('<-- ReasonsOfConversation()');
    return response;
  };

  //GET VOICE INTERACTION
//*****************************
  service.GetVoiceInteraction = function (Token,Agent,Service,CallRef) {
    console.log('--> GetVoiceInteraction()',Service);
    var response = $http({
      method: "GET",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk=',
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'DE01'
       },       
      url: (CI360ApiPath + '/ci360/v3/'+Service+'/voice-interactions/'+ CallRef)
    });
    console.log('<-- GetVoiceInteraction()');
    return response;
  };

//GATES CODIFICATION SETTINGS
//*****************************
  service.OdigoGetGateCodificationSettings = function (Token,Agent) {
    console.log('--> OdigoGetGateCodificationSettings()');
    var response = $http({
      method: "GET",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk=',
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'de01'
       },       
      url: (ApiPath + Agent.replace('@', '%40') + '/gates-codifications-settings')      
    });
    console.log('<-- OdigoGetGateCodificationSettings()');
    return response;
  };

//GATES CODIFICATIONS 
//*****************************
  service.OdigoGetGateCodifications = function (Token,Agent,Gate) {
    console.log('--> OdigoGetGateCodifications()');
    var response = $http({
      method: "GET",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk=',
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'de01'
       },       
      url: (ApiPath + Agent.replace('@', '%40') + '/gates-codifications/'+Gate)      
    });
    console.log('<-- OdigoGetGateCodifications()');
    return response;
  };




//CONFERENCE
//*****************************
  service.OdigoConference = function (Token) {
    console.log('--> OdigoConference()');
    var response = $http({
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk=',
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'de01'
       },       
      url: (ApiPath + 'agent176ddi%40demo.com' + '/commands/conferenceCall')
    });
    console.log('<-- OdigoConference()');    
    return response;
  };  


}

})();