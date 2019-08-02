////////////////////////////////////////////////////////
//JAVASCRIPT CODE PARA CARGAR LA WEB PASANDO PARAMETROS
////////////////////////////////////////////////////////

try{
  console.log('-->> 176-APIS-CODE'); 
  console.log('-->>getGateId',odigo.getGateId(odigo.getNewTaskId()));
}
catch(error){
  console.error(error);
}
try{
  console.log('-->>getVoiceGateId',odigo.getVoiceGateId());
}
catch(error){
  console.error(error);
}

try{
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
}
catch(error){
  console.error(error);
}

//OBTENEMOS VALORES DE LA INTERACCION DESDE LA CONSOLA

try{
  var vPHONE= odigo.getCustomerDdi();
}
catch(error) {
  console.error(error);
}
try{
  var vDATA = odigo.getHideFolder();
}
catch(error) {
  console.error(error);
}

try{
  var vCALLREF = odigo.getVoiceTaskId();
}
catch(error) {
  console.error(error);
}

try{
  var vCAMPAIGN = odigo.getVoiceGateLabel();
}
catch(error) {
  console.error(error);
}

try{
  var vAGENTNAME = odigo.getAgentFirstName();
}
catch(error) {
  console.error(error);
}

try{
  var vAGENLAST = odigo.getAgentLastName();
}
catch(error) {
  console.error(error);
}

try{
  var vLOGIN = odigo.getAgentLogin();
}
catch(error) {
  console.error(error);
}

try{
  var vGATE = odigo.getGateId(odigo.getVoiceTaskId());;
}
 catch(error) {
  console.error(error);
}


try{
  console.log(' -->BUILD URL()'); 
  var URL = 'https://localhost:3000/Video.html#?CallPhone='+vPHONE+'&CallData='+vDATA+'&GateId='+vGATE+'+&CallRef='+vCALLREF+'&CallAgentName='+vAGENTNAME+'&CallAgentLastName='+vAGENLAST+'&CallLogin='+vLOGIN;
  console.log('    URL['+ URL +']');  
  console.log(' <--BUILD URL()');
  console.log(' --> loadIframe Empty()');
  category.loadIframe('');
  console.log(' <-- loadIframe Empty()'); 
  console.log(' --> loadIframe()'); 
  category.loadIframe(URL);
  console.log(' <-- loadIframe()'); 
  console.log('<<-- 176-APIS-CODE'); 
}
catch(error) {
  console.error(error);
}