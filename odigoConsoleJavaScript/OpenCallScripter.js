try {

  console.log('-->> OPEN SCRIPT ACTION'); 

  console.log('-->> getAgentDDI()');  
  console.log(odigo.getAgentDDI()); 

  console.log('-->> odigo.getVoiceTaskId()'); 
  console.log(odigo.getVoiceTaskId());  


  console.log('-->> getVoiceGateLabel()');  
  console.log(odigo.getVoiceGateLabel()); 


  console.log('-->> getCustomerDdi()'); 
  console.log(odigo.getCustomerDdi());  

  console.log('-->> getHideFolder()');  
  console.log(odigo.getHideFolder()); 

try{
  console.log(' --> odigo.getCustomerDdi()');
  var vPHONE= odigo.getCustomerDdi();
  console.log(' <-- odigo.getCustomerDdi();',vPHONE);
}
catch(error) {
  console.error(error);
  console.log(' <-- odigo.getCustomerDdi()');
}
try{
  console.log(' --> odigo.getHideFolder()');
  var vDATA = odigo.getHideFolder();
  console.log(' <-- odigo.getHideFolder():',vDATA);
}
catch(error) {
  console.error(error);
  console.log(' <-- odigo.getHideFolder()');
}

try{
  console.log(' --> odigo.getVoiceTaskId()');
  var vCALLREF = odigo.getVoiceTaskId();
  console.log(' <-- odigo.getVoiceTaskId():',vCALLREF);
}
catch(error) {
  console.error(error);
  console.log(' <-- odigo.getVoiceTaskId()');
}

try{
  console.log(' --> odigo.getVoiceGateLabel()');
  var vCAMPAIGN = odigo.getVoiceGateLabel();
  console.log(' <-- odigo.getVoiceGateLabel():',vCAMPAIGN);
}
catch(error) {
  console.error(error);
  console.log(' <-- odigo.getVoiceGateLabel()');
}

try{
  console.log(' --> odigo.getAgentFirstName()');
  var vAGENTNAME = odigo.getAgentFirstName();
  console.log(' <-- odigo.getAgentFirstName():',vAGENTNAME);
}
catch(error) {
  console.error(error);
  console.log(' <-- odigo.getAgentFirstName()');
}

try{
  console.log(' --> odigo.getAgentLastName()');
  var vAGENLAST = odigo.getAgentLastName();
  console.log(' <-- odigo.getAgentLastName():',vAGENLAST);
}
catch(error) {
  console.error(error);
  console.log(' <-- odigo.getAgentLastName()');
}

try{
  console.log(' --> odigo.getAgentLogin()');  
  var vLOGIN = odigo.getAgentLogin();
  console.log(' <-- odigo.getAgentLogin():',vLOGIN);  
}
 catch(error) {
  console.error(error);
  console.log(' <-- odigo.getAgentLogin()');  
}


console.log(' -->BUILD URL()'); 
var URL = 'https://capgemini.callscripter.com/executer/script.aspx?
            function=start&
            diallerCampaign=Santander World Elite Mastercard&
            csUsername=Odigo&
            csPassword=OdigoV5&
            restartScript=true&
            var_Phone='+vPHONE+'&
            var_OdigoData='+vDATA+'&
            var_CallRef='+vCALLREF+'&
            var_AgentName='+vAGENTNAME+'&
            var_AgentLastName='+vAGENLAST+'&
            var_Login='+vLOGIN;
console.log(' <--BUILD URL()['+ URL +']');  

console.log(' -->SET LOAD FRAME EMPTY()'); 
category.loadIframe('');
console.log(' <--SET LOAD FRAME EMPTY()'); 

console.log(' --> LOAD FRAME()'); 
category.loadIframe(URL);
console.log(' <-- LOAD FRAME()'); 

console.log('<<-- OPEN SCRIPT ACTION'); 

}
catch(error) {
  console.error(error);
  console.log('<<-- OPEN SCRIPT ACTION');   
}
