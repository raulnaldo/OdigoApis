// New version @MMU

var dimeloIframeWrap = document.getElementById('dimeloIframeWrap');
if(window.addEventListener) {
  // Normal browsers
  dimeloIframeWrap.addEventListener('DOMSubtreeModified', dimeloIframeWrapContentChanged, false);
} else if(window.attachEvent) {
  // IE
  dimeloIframeWrap.attachEvent('DOMSubtreeModified', dimeloIframeWrapContentChanged);
}
// Variable permettant de ne pas polluer le dom et les logs en écrivant plusieurs fois des infos non nécessaires.
var dimeloIframePushFoundedOneTime = false;

function dimeloIframeWrapContentChanged() {
  try {
    // bascule en mode pull avec header pour ajouter recherche mails et mail sortant unitaire
    var urlDimeloPull = "";
    var dimeloIframes = document.querySelector('.dimeloIframeDiv').querySelectorAll('od-iframe');
    var regexpIframe = /https:\/\/.*dimelo.*com\/.*view=no-header.*/;
    var regexpIframeTask = /.*tasks.*/;
   for (var i = 0; i < dimeloIframes.length; ++i) {
      if (dimeloIframes[i].querySelector('iframe')) {
        var src = dimeloIframes[i].querySelector('iframe').src;
        console.debug("Iframe src : " + src);
        if (regexpIframe.test(src) && !regexpIframeTask.test(src)) {
          console.info("On a trouve l'iframe Dimelo Push.");
          urlDimeloPull = src.replace("view=no-header", "").replace("??", "?").replace("?&", "?");
          // on supprime le dernier ? ou & si existant.
          if (urlDimeloPull.endsWith("?") || urlDimeloPull.endsWith("&")) {
            urlDimeloPull = urlDimeloPull.substring(0, urlDimeloPull.length - 2);
          }
          break;
        }
      }      
    };
    if (urlDimeloPull !== "" && i < dimeloIframes.length) {
      dimeloIframes[i].innerHTML='<div class="divCacheHeaderDimelo"><div class="divCacheHeaderDimeloGauche"></div><div class="divCacheHeaderDimeloDroite"></div></div>' +
        '<iframe frameborder="0" height="100%" width="100%" src="' + urlDimeloPull + '"></iframe>'; 
      if (!dimeloIframePushFoundedOneTime) {
        // création d'une balise p avec le nom et prénom de l'agent pour le calcul de la zone de droite.
        var initbody = document.querySelector('body');
        var nomPrenomDiv = document.createElement('div');
        nomPrenomDiv.id="nomPrenomDiv";
        //nomPrenomDiv.style="position: absolute;z-index: -10;top: 0;"; // impossible en mode strict sur IE11.
        nomPrenomDiv.style.zIndex="-10";
        nomPrenomDiv.style.top="0px";
        nomPrenomDiv.style.position="absolute";
        nomPrenomDiv.innerHTML = '<canvas id="myCanvas" width="100" height="1" style="">YourbrowserdoesnotsupporttheHTML5canvastag.</canvas>';
        initbody.appendChild(nomPrenomDiv);
        console.debug(document.getElementById("nomPrenomDiv"));
        var canvas=document.getElementById("myCanvas");
        var canvasCtx=canvas.getContext("2d");
        // A mettre à jour si Dimelo change le style de son menu à droite du header.
        var dimeloStateImgWidth = 22;
        var dimeloStateImgMargin = 10;
        var dimeloMenuImgWidth = 16;
        var dimeloMenuImgPadding = 8;
        var dimeloMenuDivPadding = 7;
        var dimeloUserText = odigo.getAgentFirstName() + " " + odigo.getAgentLastName();
        canvasCtx.font="400 13px Roboto"; // A mettre à jour si Dimelo change le style de son menu.
                                console.debug("Taille Nom Prenom : " + canvasCtx.measureText( dimeloUserText ).width);
        var widthDroite = canvasCtx.measureText( dimeloUserText ).width + dimeloStateImgWidth 
          + dimeloStateImgMargin * 2 + dimeloMenuImgWidth + dimeloMenuImgPadding * 2 + dimeloMenuDivPadding * 2 + 8;
        // création de la zone style pour la première fois.
        var inithtml = document.querySelector('html');
        var initstyle= document.createElement('style');
        inithtml.appendChild(initstyle);
        initstyle.innerHTML='.wrapper{position:relative;z-index: 1;display: inline-block;} .divCacheHeaderDimelo{}'
          + ' .divCacheHeaderDimeloGauche{position: absolute;width: 360px;height: 40px;background: #FFFFFF;left: 16.6666666%;top: 0px;z-index: 8;display: block;color: #fff;}'
          + ' .divCacheHeaderDimeloDroite{position: absolute;width: ' + widthDroite + 'px;height: 40px;background: #FFFFFF;right: 0px;top: 0px;z-index: 8;display: block;color: #fff;}';
      }
      dimeloIframePushFoundedOneTime = true;
    } else if (!dimeloIframePushFoundedOneTime){
      console.warn("Unabled to find the Dimelo iframe for mail send in Pull mode.");
    }   
  }
  catch(error) {
    console.error(error);
  }
}