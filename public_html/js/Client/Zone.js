    var backGroundImagePath = "assets/images/";
    var currentZoneObj = [];
    
    function initZone(zoneID){
        //getZone(zoneID);  
    }
    
    function renderZone(){
        var bgimage = backGroundImagePath + currentZoneObj.bgImg; 
        addBackGround(bgimage);
        renderMobBoxes();
    }

    function addBackGround(bgImageSrc){
                // create a texture from an image path
        var texture = PIXI.Texture.fromImage(bgImageSrc);
        // create a new Sprite using the texture
        var background = new PIXI.Sprite(texture);

        // center the sprites anchor point
        background.anchor.x = 0;
        background.anchor.y = 0;

        // move the sprite t the center of the screen
        background.position.x = 0;
        background.position.y = 0;

        background.width  = windowWidth;
        background.height = windowHeight;

        stage.addChild(background);

        var x = resourceMap.length;
        resourceMap[x]       = background;
        resourceMap[x].name  = "background";
        resourceMap[x].id    = x;
    }


    
    function convertJSONtoZoneBaseObject(zoneJSON){
      
       var zone = $.parseJSON(zoneJSON);
       var i = 0;

        zn = {
            id        : zone[i].zoneID,
            name      : zone[i].zoneName,
            desc      : zone[i].zoneDesc,
            bgImg     : zone[i].zoneBGImg,
            frontBoxFloorPct : zone[i].frontBoxFloorPct 
        };   

        currentZoneObj = zn;
        
        zoneLoaded = true;        
}

