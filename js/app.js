(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "https://paas-de01.prosodie.com:443/auth/v2/routing_de01/direct-access-claim-sets")
.directive('foundItems', FoundItemsDirective);

//DIRECTIVE
function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      list: '<myList',
      onRemove: '&method'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'myCtroler',
    bindToController: true,
    link: FoundItemsDirectiveLink
  };
  return ddo;
}
//LINK FUNCTION TO WATCH CHANGES IN THE FOUND ITEMS LIST
function FoundItemsDirectiveLink(scope, element, attrs, controller) {

  scope.$watch('myCtroler.list.triedToSearch',function (newValue,oldValue){
    if (newValue){
      displayNotFoundMessage();
    }
  });

  scope.$watch('myCtroler.someThingFound()',function (newValue,oldValue){
    if (newValue==true){
      removeNotFoundMessage();
    }
    else{
      if (scope.myCtroler.list.triedToSearch){
        displayNotFoundMessage();
      }
    }
  });

  function displayNotFoundMessage()
  {
    var warningElem = element.find("div.error");
    warningElem.slideDown(900);
  }
  function removeNotFoundMessage(){
    var warningElem = element.find("div.error");
    warningElem.slideUp(900);
  }
}


//DIRECTIVE CONTROLLER
function FoundItemsDirectiveController() {
  var myCtroler = this;
  myCtroler.someThingFound= function () {
    if (typeof myCtroler.list.foundItems == 'undefined' || myCtroler.list.foundItems == null)
    {
      return false;
    }
    else {
      return (myCtroler.list.foundItems.length > 0);
    }
  };
}

//CONTROLLER
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var NarrowItDown = this;
  NarrowItDown.buttonSearchText='Get The Token Key!';
  NarrowItDown.Token='';

  //BUSQUEDA DE MENUS
  NarrowItDown.getTokenFromApi = function(){
      var promise= MenuSearchService.getToken();
      promise.then(function (response) {
          console.log('Then:',response.data);
          NarrowItDown.Token=response.data.accessToken;
        })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
      });                
  };
  
  NarrowItDown.OdigoHangUp = function(Token){
      var promise= MenuSearchService.OdigoHangUp(Token);
      promise.then(function (response) {
          console.log('Then:',response.data);          
        })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
      });                
  };  

}


//SERVICIO
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http,ApiBasePath) {
  var service = this;

  service.getToken = function () {
    var MyToken={};
    var response = $http({
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Basic Y29uc29sZV9kZTAxQHByb3NvZGllLmNvbTpBWkVSVFk='
       },
       data: {"userUid": "agent176ddi@demo.com","appUid": "fxBYAMsu7Ja9OM3ezAhLAvLPLRsa"},
      url: (ApiBasePath)
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
      url: ('https://paas-de01.prosodie.com:443/agent/v1/agents/agent176ddi%40demo.com/commands/hangUpCall')
    });

    return response;
  };

}
})();
