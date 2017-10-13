var allAbilitiesLoaded       = false;
var mobArchetypesLoaded      = false;
var characterLoaded          = false;
var characterAbilitiesLoaded = false;
var zoneLoaded               = false;
var zoneMobsLoaded           = false;
var mobAbilitiesLoaded       = false;
var gameAssetsDataLoaded     = false;

function initDataLoad(){
    requestData();
    setTimeout(function() {loadItterator(1)},1000);
}

function loadItterator(itteration){
    
   var loadProcessSuccess = true;
   
   if(allAbilitiesLoaded == false){
       loadProcessSuccess = false;
   }
    
   if(mobArchetypesLoaded == false){
       loadProcessSuccess = false;
   }   
   
   if(characterLoaded == false){
       loadProcessSuccess = false;
   }
   
   if(characterAbilitiesLoaded == false){
       loadProcessSuccess = false;
   }
   
   if(zoneLoaded == false){
       loadProcessSuccess = false;
   }
   
   if(zoneMobsLoaded == false){
       loadProcessSuccess = false;
   }
   
   if(mobAbilitiesLoaded == false){
       loadProcessSuccess = false;
   }
   
   if(gameAssetsDataLoaded == false){
       loadProcessSuccess = false;
   }
   
   
   if(loadProcessSuccess == false){
       itteration++;
       setTimeout(function() {loadItterator(itteration);},1000);
   }else{
       handleChatSumbit(0, "All Data Loaded on itteration: "+itteration);
       generateObjects();
   }
}

function requestData(){
    getAllGameAssets();
    getAllAbilities();
    getMobArchetypes();
    getCharacter(characterID);
    getCharacterAbilities(characterID);
    getZone(currentZoneID);
    getZoneMobs(currentZoneID);
    getMobAbilities(currentZoneID);
    initAssetLoad();
}






