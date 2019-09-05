<tr>
    <td colspan="2" align="center">
        <span id="csCon[attr]Field ID[/attr]" class="ctext" data-hidden="[attr]Hidden[/attr]">
            <button class="btn cbutton" tabindex="[attr]Tab Order[/attr]" accesskey="[attr]Access Key[/attr]" style="    background-image: none;    background-color: #9B9B9B;    border-color: #9B9B9B;    box-shadow: 0px 2px 3px rgba(0,0,0,0.1);    -moz-box-shadow: 0px 2px 3px rgba(0,0,0,0.1);    -ms-box-shadow: 0px 2px 3px rgba(0,0,0,0.1);    text-shadow: 0 0px 0 #aaa;    color: #fff; border-radius: 6px !important;" id="fv[attr]Field ID[/attr]" type="button" name="fv[attr]Field ID[/attr]" onclick="ButtonClick_[attr]Control ID[/attr]_[attr]Version[/attr]([attr]Field ID[/attr], this, ('[attr]Validate Page[/attr]'.toLowerCase() == 'true'), '[attr encoding="js"]Command Name[/attr]', '[attr encoding="js"]Base API URL[/attr]', '[attr encoding="js"]AgentName[/attr]')">[attr]Text[/attr]</button>
        </span>
        <input type="hidden" name="F[attr]Field ID[/attr]" id="F[attr]Field ID[/attr]" onclick="$('#fv' + [attr]Field ID[/attr]).click();" value="[attr encoding="html"]Default Value[/attr]" >
    </td>
</tr>
<script>
<!--
    var arguments[attr]Field ID[/attr] = '';
    CS.Script.OnLoad(function() {
        var arguments[attr]Field ID[/attr] = [attr]Arguments[/attr];
        Load_[attr]Control ID[/attr]_[attr]Version[/attr]([attr]Field ID[/attr], ('[attr encoding="js"]Text[/attr]'.indexOf('[') > -1), '[attr encoding="jsnohtml"]Text[/attr]', '[attr]field property[/attr]', parseInt('[attr]Auto Click[/attr]',10), ('[attr]Disabled[/attr]'.toLowerCase() == 'true' ? true:false));
    });
// -->
</script>

<script global>
function ButtonClick_[attr]Control ID[/attr]_[attr]Version[/attr](fieldId, btn, validatePage, Command, BaseURL, AgentName) {
    Arguments = arguments + fieldId;
    CS.Script.DoCalculations();
    btn.disabled=true;
    document.body.style.cursor = 'wait';
    if (validatePage) {
        if(CS.Script.Validate(true,false)) {
            ExecCommand_[attr]Control ID[/attr]_[attr]Version[/attr](fieldId, btn, Command, Arguments, BaseURL, AgentName);
        } else {
            btn.disabled = false;
            document.body.style.cursor = 'default';
        } 
    } else {
        ExecCommand_[attr]Control ID[/attr]_[attr]Version[/attr](fieldId, btn, Command, Arguments, BaseURL, AgentName);
    }
}


function ExecCommand_[attr]Control ID[/attr]_[attr]Version[/attr](fieldId, btn, Command, Arguments, BaseURL, AgentName)
{
    CS.Script.DoCalculations();
    var args = Arguments;
    var arg1 = '';
    var arg2 = '';
    var arg3 = '';
    var arg4 = '';

    if(args.length>0)
        arg1=ReplaceWithFieldAndVariableValues(args[0]);
    
    if(args.length>1)
        arg2=ReplaceWithFieldAndVariableValues(args[1]);
    
    if(args.length>2)
        arg3=ReplaceWithFieldAndVariableValues(args[2]);
    
    if(args.length>3)
        arg4=ReplaceWithFieldAndVariableValues(args[3]);

    try {       
        if (Command=='callFreeReason'){         
            $.ajax({            
                //url: BaseURL + '/agent/v1/agents/'+encodeURIComponent(AgentName)+'/commands/'+Command,
                url: BaseURL + '/agent/v1/agents/'+encodeURIComponent(document.theForm.var_Login.value)+'/commands/'+Command,
                headers: {
                    'X-API-TOKEN': document.theForm.var_token.value,
                    'Content-Type':'application/json',
                    'X-WS-INSTANCE':'routing_osp01'
                },
                data: JSON.stringify({
                "agentId":document.theForm.var_Login.value,
                "callId":document.theForm.var_CallRef.value,
                "gateId":document.theForm.var_Gate.value,
                "keyboardDuration":0,
                "reasons":[],
                "storing":true,
                "wrapUpEnd":true
                }),
                dataType: "application/json",                
                method: 'POST',
                success: function(data){
                  console.log('succes: '+data);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {  
                    console.log('error: '+textStatus);  
                }  
            });            
        }
        else{
            if (Command=='stopRecordCall'){
                $.ajax({            
                    //url: BaseURL + '/agent/v1/agents/'+encodeURIComponent(AgentName)+'/commands/'+Command,
                    url: BaseURL + '/agent/v1/agents/'+encodeURIComponent(document.theForm.var_Login.value)+'/commands/'+Command,
                    headers: {
                        'X-API-TOKEN': document.theForm.var_token.value,
                        'Content-Type':'application/json',
                        'X-WS-INSTANCE':'routing_osp01'
                    },
                    data: JSON.stringify(
                        {
                             "isRecordingBySupervisor": false
                        }
                    ),
                    dataType: "application/json",
                    method: 'POST',
                    success: function(data){
                      console.log('succes: '+data);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {  
                        console.log('error: '+textStatus);  
                    }  
                });                 
            }
            else{
                if (Command=='reasonsOfConversation'){
                    var pageData = Script.Utils.GetAllFieldsAndVariables();
                    console.log('pageData:',pageData);
                    console.log('pageData.CallRef:',pageData.var_CallRef);
                    if (!(Script.Utils.isNullOrWhiteSpace(pageData.var_CallRef))){
                        var ReasonsOfConversation={};
                        ReasonsOfConversation.freeReasonsOfConversation={};
                        ReasonsOfConversation.freeReasonsOfConversation=[];
                        var Reason={};
                        if (!(Script.Utils.isNullOrWhiteSpace(pageData.var_RefusedCredit))){                        
                            Reason={
                                "label" : "Credito Rechazado",
                                "value" : pageData.var_RefusedCredit,
                                "order" : (ReasonsOfConversation.freeReasonsOfConversation.length+1)
                             };
                             ReasonsOfConversation.freeReasonsOfConversation[ReasonsOfConversation.freeReasonsOfConversation.length]=Reason;
                        }
                        if (!(Script.Utils.isNullOrWhiteSpace(pageData.var_CreditCards))){
                            Reason={
                                "label" : "Numero de Tarjetas",
                                "value" : pageData.var_CreditCards,
                                "order" : (ReasonsOfConversation.freeReasonsOfConversation.length+1)
                             };
                             ReasonsOfConversation.freeReasonsOfConversation[ReasonsOfConversation.freeReasonsOfConversation.length]=Reason;
                        }                        
                        if (!(Script.Utils.isNullOrWhiteSpace(pageData.var_Incomings))){                        
                            Reason={
                                "label" : "Ingresos superiores 30K",
                                "value" : pageData.var_Incomings,
                                "order" : (ReasonsOfConversation.freeReasonsOfConversation.length+1)
                             };
                             ReasonsOfConversation.freeReasonsOfConversation[ReasonsOfConversation.freeReasonsOfConversation.length]=Reason;
                        }                        
                        ReasonsOfConversation.reasonsOfConversation=[document.theForm.var_CallComments.value];                        
                        ReasonsOfConversation.conversationNumber=document.theForm.var_CallRef.value.substring(23, 24);
                        ReasonsOfConversation.sessionReference=document.theForm.var_CallRef.value.substring(20, 22);                                   
                                
                        $.ajax({                        
                            url: BaseURL + '/ci360/v3/OSP01/voice-interactions/'+document.theForm.var_CallRef.value.substring(0, 20)+'/reasonsOfConversation',
                            headers: {
                            'X-API-TOKEN': document.theForm.var_token.value,
                            'Content-Type':'application/json',
                            'X-WS-INSTANCE':'routing_osp01'
                            },
                            data: JSON.stringify(ReasonsOfConversation),
                            dataType: "application/json",
                            method: 'POST',
                            success: function(data){
                              console.log('succes: '+data);
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {  
                            console.log('error: '+textStatus);  
                            }  
                        });                        
                    }
                }
                else{
                    $.ajax({            
                        //url: BaseURL + '/agent/v1/agents/'+encodeURIComponent(AgentName)+'/commands/'+Command,
                        url: BaseURL + '/agent/v1/agents/'+encodeURIComponent(document.theForm.var_Login.value)+'/commands/'+Command,
                        headers: {
                            'X-API-TOKEN': document.theForm.var_token.value,
                            'Content-Type':'application/json',
                            'X-WS-INSTANCE':'routing_osp01'
                        },
                        method: 'POST',
                        success: function(data){
                          console.log('succes: '+data);
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {  
                            console.log('error: '+textStatus);  
                        }  
                    });
                }
          }
        }
    
        CS.Script.DoCalculations();
    }
    catch(e) {
        console.log(e);
        Script.Toast.Warning(Command + ' failed', e, 5000);
    }
    btn.disabled = false;
    document.body.style.cursor = 'default';
}

function Load_[attr]Control ID[/attr]_[attr]Version[/attr](fieldId, textIsVariable, text, fieldProperty, autoClick, disabled)
{
    var el = $('#fv' + fieldId);
    if(textIsVariable) {
        el.html(ReplaceWithFieldAndVariableValues(text));
    }
    if (autoClick >= parseInt(0,10)) {
        setTimeout(function() {
            el.click();
        }, autoClick * 1000);
    }

    var field = $('#F' + fieldId).get(0).name;
    if(disabled) {
        Script.Fields.Disable(field);
    }
}
</script>