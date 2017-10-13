var socketAddress = '73.4.67.71';
var socketPort    = '8124';

var socket = io.connect(socketAddress+':'+socketPort);


    function getAllAbilities(){
      socket.emit('getAllAbilities', {});
    }
    
    function getMobArchetypes(){ 
      socket.emit('getMobArchetypes', {});
    }
    
    
    function getCharacter(charID){     
      socket.emit('getCharacter', {characterID: charID});      
    } 
    
    function getCharacterAbilities(charID){
      socket.emit('getCharacterAbilities', {characterID: charID}); 
    }
    
    function getZone(zoneID){
      socket.emit('getZone', {zoneID: zoneID});
    }
       
    function getZoneMobs(zoneID){ 
      socket.emit('getZoneMobs', {zoneID: zoneID});    
    }
    
    function getMobAbilities(zoneID){ 
      socket.emit('getMobAbilities', {zoneID: zoneID});
    }
 
    
    function getAllGameAssets(){ 
      socket.emit('getAllGameAssets', {});
    }
    
    
    socket.on('ZoneInformation', function(data){
        handleChatSumbit(0, "ZoneInformation received!");
        convertJSONtoZoneBaseObject(data.ZoneInformation);
    });
    
    socket.on('AllAbilities', function(data){
        handleChatSumbit(0, "AllAbilities received!");
        convertJSONtoAbilitiesObject(data.AllAbilities);
    });
    
    socket.on('MobArchetypes', function(data){
        handleChatSumbit(0, "MobArchetypes received!");
        convertJSONtoMobArchetypesObject(data.MobArchetypes);            
    });
    
    socket.on('ZoneMobs', function(data){  
        handleChatSumbit(0, "ZoneMobs received!");
        convertJSONtoMobBaseObject(data.ZoneMobs);
    });
    
    
    socket.on('MobAbilities', function(data){
        handleChatSumbit(0, "MobAbilities received!");
        convertJSONtoMobAbilitiesObject(data.MobAbilities);
    });
    
    
    //Need to remove all nondataaccess functions out to "generatePlayer" function
    socket.on('CharacterInformation', function(data) {   
        handleChatSumbit(0, "CharacterInformation received!");
        convertJSONtoPlayerCharacterBaseObject(data.character);               
    });

    socket.on('CharacterAbilities', function(data) { 
        handleChatSumbit(0, "CharacterAbilities received!");
        convertJSONtoPlayerCharacterActionsObject(data.characterAbilities);
    });

    socket.on('AllGameAssets', function(data){
        handleChatSumbit(0, "Game Assets received!");
        convertJSONtoAssetBaseObject(data.AllGameAssets);
    });
    
    function updateActionSlotOnServer(actionID, slotID){        
       socket.emit('updateActionSlot', {characterID: characterID, actionID: actionID, slotID: slotID});  
    }
    