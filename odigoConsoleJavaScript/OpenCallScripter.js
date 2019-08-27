try {
  console.log('##########176-OPEN-SCRIPT-SANTANDER############'); 
  console.log('-->> OPEN SCRIPT ACTION'); 

  console.log('-->> getAgentDDI()');  
  console.log(odigo.getAgentDDI()); 
  console.log('<<-- getAgentDDI()');  

  console.log('-->> odigo.getVoiceTaskId()'); 
  console.log(odigo.getVoiceTaskId());  
  console.log('<<-- odigo.getVoiceTaskId()'); 

  console.log('-->> getVoiceGateLabel()');  
  console.log(odigo.getVoiceGateLabel()); 
  console.log('<<-- getVoiceGateLabel()');  

  console.log('-->> getCustomerDdi()'); 
  console.log(odigo.getCustomerDdi());  
  console.log('<<-- getCustomerDdi()');   

  console.log('-->> getHideFolder()');  
  console.log(odigo.getHideFolder()); 
  console.log('<<-- getHideFolder()');

  var vDATA;    
}
catch(error) {
  console.error(error);
}
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
  vDATA='RAUL|ORTEGA|1262|MarCantabrico23|Paracuellos de Jarama|Madrid|01-11-1975|27-08-2019|IBAN00356548461575';
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
try{
  console.log(' --> odigo.getVoiceGateLabel()');  
  var vGATE = odigo.getVoiceGateLabel();
  console.log(' <-- odigo.getVoiceGateLabel():',vGATE);  
}  
catch(error) {
  console.error(error);
  console.log(' <-- odigo.getVoiceGateLabel()');  
}

try{
  console.log(' --> odigo.getCustomerSelected()');  
  var vOdigoCustomer=odigo.getCustomerSelected('voice');  
  console.log(' <--> CustomerSelected:',vOdigoCustomer);  
  if (typeof(vOdigoCustomer) != 'undefined' && vOdigoCustomer != null) {
    console.log(' --> BuildingDataFromCustomer:');  
    vDATA= vOdigoCustomer.firstName + '|' + vOdigoCustomer.lastName + '|' + vOdigoCustomer.id + '|' + vOdigoCustomer.addresses[0].street1 + '|' + vOdigoCustomer.addresses[0].city + '|' + vOdigoCustomer.addresses[0].country + '|' + vOdigoCustomer.birthday + '|27-08-2019|IBAN5575464661163546';
    console.log(' --> BuildingDataFromCustomer:',vDATA);  
    console.log(' <-- BuildingDataFromCustomer:');      
  }
  else{
    console.log(' <--> CUSTOMER NOT LOADED ACTIVATING SEARCH');
    console.log(' --> odigo.search()');  
    var vSearch=odigo.search("voice", odigo.getFolderNumber());
    console.log(' <-- odigo.search():',vSearch);  
    console.log(' --> New odigo.getCustomerSelected()');  
    vOdigoCustomer=odigo.getCustomerSelected('voice');  
    console.log(' <-- New odigo.getCustomerSelected():',vOdigoCustomer);      
    if (typeof(vOdigoCustomer) != 'undefined' && vOdigoCustomer != null) {
      console.log(' --> BuildingDataFromCustomer:');  
      vDATA= vOdigoCustomer.firstName + '|' + vOdigoCustomer.lastName + '|' + vOdigoCustomer.id + '|' + vOdigoCustomer.addresses[0].street1 + '|' + vOdigoCustomer.addresses[0].city + '|' + vOdigoCustomer.addresses[0].country + '|' + vOdigoCustomer.birthday + '|27-08-2019|IBAN5575464661163546';
      console.log(' --> BuildingDataFromCustomer:',vDATA);  
    }
  }
  console.log(' <-- odigo.getCustomerSelected():',vOdigoCustomer);    
}  
catch(error) {
  console.error(error);
  console.log(' <-- odigo.getCustomerSelected()');  
}

try{  
  console.log(' -->BUILD URL()'); 
  //var URL = 'https://capgemini.callscripter.com/executer/script.aspx?function=start&diallerCampaign=Santander World Elite Mastercard&csUsername=Odigo&csPassword=OdigoV5&restartScript=true&var_Phone='+vPHONE+'&var_OdigoData='+vDATA+'&var_CallRef='+vCALLREF+'&var_AgentName='+vAGENTNAME+'&var_AgentLastName='+vAGENLAST+'&var_Login='+vLOGIN+'&var_Gate='+vGATE;

  var URL = 'https://capgemini.callscripter.com/executer/script.aspx?function=start&runFromEditor=true&script=160&restartScript=true&var_Phone='+vPHONE+'&var_OdigoData='+vDATA+'&var_CallRef='+vCALLREF+'&var_AgentName='+vAGENTNAME+'&var_AgentLastName='+vAGENLAST+'&var_Login='+vLOGIN+'&var_Gate='+vGATE;
  console.log(' <--BUILD URL()['+ URL +']');  

  console.log(' -->SET LOAD FRAME EMPTY()'); 
  category.loadIframe('');
  console.log(' <--SET LOAD FRAME EMPTY()'); 

  console.log(' --> LOAD FRAME()'); 
  category.loadIframe(URL);
  console.log(' <-- LOAD FRAME()'); 

  console.log('<<-- OPEN SCRIPT ACTION'); 

  console.log('*******************************************'); 
  console.log('category.activePage: ' +category.activePage);
  console.log('category.activeThirdPartyApp.iframeSrc: ' +category.activeThirdPartyApp.iframeSrc);
  console.log('category.iframeSrc: ' +category.iframeSrc);
  console.log('##########176-OPEN-SCRIPT-SANTANDER############'); 

}
catch(error) {
  console.error(error);
  console.log('<<-- OPEN SCRIPT ACTION');   
  console.log('##########176-OPEN-SCRIPT-SANTANDER############'); 
}