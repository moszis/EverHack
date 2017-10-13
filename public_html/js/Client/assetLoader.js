
var GameAssetsObjects = new Array();

function initAssetLoad(){
    preLoadStaticSoundEffects();
}

function loadGameAssets(){
    
}


function convertJSONtoAssetBaseObject(assetJSON){

    
    var assets = $.parseJSON(assetJSON);
    var i = 0;
    
    
    for(var i = 0;i<assets.length;i++){
  
        switch (assets[i].assetCategory) {
          case 1:
            asset = new Audio(soundFolder+assets[i].assetFile);
            break;
          default:
              
            break
        } 
        
        GameAssetsObjects[assets[i].assetID] = asset;    
    }    
    
    gameAssetsDataLoaded = true;
}


