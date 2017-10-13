var visibleMobListGenerated = false;
var actionBarsGenerated     = false;
var mobAbilitiesGenerated   = false;

function generateObjects(){
    initiateObjectGeneration();
    objectGenerationItterator(1);
}

function objectGenerationItterator(objItterations){
    
    var objectGenerationSuccess = true;
    
    if(visibleMobListGenerated == false){
        objectGenerationSuccess = false;
    }
    
    if(actionBarsGenerated == false){
        objectGenerationSuccess = false;
    }
    
    if(mobAbilitiesGenerated == false){
        objectGenerationSuccess = false;
    }
    
    
    if(objectGenerationSuccess == false){
       objItterations++;
       setTimeout(function() {objectGenerationItterator(objItterations);},100);
    }else{
       handleChatSumbit(0, "All Object Generated on itteration: "+objItterations);
       renderUI();
    }
    
}


function initiateObjectGeneration(){
    assosiateAbilitiesToZoneMobs();
    buildVisibleMobList();
    generateActionBars();
}


