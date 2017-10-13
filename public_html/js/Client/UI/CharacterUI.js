function renderExecutionBar(executionTime, abilityID){

    if(playerExecutionBar == null){

        var bar = new PIXI.Graphics();

        var barLengh  = 1;
        var barLocX   = 900;
        var barLocY   = 770;
        var barHeight = mobHPBarHeight;

        bar.lineStyle(1, 0x0000FF);
        bar.buttonMode = false;
        bar.beginFill(0xFF0000);   
        bar.drawRect(barLocX, barLocY, barLengh, barHeight);

        var texture = bar.generateTexture();   

        playerExecutionBar = new PIXI.Sprite(texture);
        playerExecutionBar.buttonMode = false;
        playerExecutionBar.interactive = false;

        playerExecutionBar.anchor.x = 0;
        playerExecutionBar.anchor.y = 0;

        playerExecutionBar.position.x = barLocX;
        playerExecutionBar.position.y = barLocY;

        playerExecutionBar.alpha = 1;

        stage.addChild(playerExecutionBar);
    }
    runExecutionBar(executionTime, abilityID);
}



function runExecutionBar(executionTime, abilityID){
    
    var totalTicks = executionTime/executionBarTickInterval;
    //alert(totalTicks);
    
    executionBarIncreasePerTick = executionBarLength/totalTicks;
    try{
        var currLength = playerExecutionBar.width;
        var newLength = currLength+executionBarIncreasePerTick;       

        playerExecutionBar.width = newLength;
   
        if(newLength < executionBarLength && !abilityinterrupted){
          
            setTimeout(function() {runExecutionBar(executionTime, abilityID);},executionBarTickInterval);
        }else{
            playerExecutionBar.width = 0;
            if(!abilityinterrupted){
               executeAbility(abilityID);
            }else{
               executionInProgress = false;
            }
        } 
    }catch(exception){}
    
}


