(function () {
"use strict";

angular.module('OdigoApisModule')
.service('OdigoApisService', OdigoApisService);


OdigoApisService.$inject = ['$http', 'ApiPath','ApiAuthPath','userUid','appUid'];
function OdigoApisService($http, ApiPath,ApiAuthPath,userUid,appUid) {
  var service = this;

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

  service.OdigoHangUp = function (Token) {
    console.log('Enviamos eso:',Token);
    var response = $http({
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk=',
         'X-API-TOKEN' : Token,
         'X-WS-INSTANCE' : 'de01'
       },       
      url: (ApiPath + 'agent176ddi%40demo.com' + '/commands/hangUpCall')
    });

    return response;
  };
  
}

})();