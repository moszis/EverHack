/* 
 * Default window settings go here
 * These may be overwritten by user defined settings or window scaling
 */


var windowHeight = window.innerHeight;
var windowWidth  = window.innerWidth;
        
        
///Combat Effects***********************        
var effectsFolder = "assets/images/effects/";
var blockEffect1  = "blockEffectWoodenBuckler.png";
var blockEffectLocX = 700;
var blockEffectLocY = 500;
var blockEffectHeight = 300;
var blockEffectWidth  = 500;
//*********************************************


///Character Info Box****************************
var charInfoBoxSrc    = "assets/images/CharInfoBox.png";
var characterInfoBoxX = 1;
var characterInfoBoxY = 1;

var characterInfoBoxW = 300;
var characterInfoBoxH = 150;

var characterTitleBarNameFont      = "Arial Black";
var characterTitleBarNameFontColor = "white";
var characterTitleBarNameFontSize  = 20;
var characterTitleBarNameLocX      = 10;
var characterTitleBarNameLocY      = 10;

var characterTitleBarLevelFont      = "Arial Black";
var characterTitleBarLevelFontColor = "white";
var characterTitleBarLevelFontSize  = 15;
var characterTitleBarLevelLocX      = characterInfoBoxW - 20;
var characterTitleBarLevelLocY      = 10;

//HP Bar Settings
var characterInfoHPBarLocX          = 30;
var characterInfoHPBarLocY          = 50;
var characterInfoHpBarHeight        = 20;
var characterInfoHpBarMaxWidth      = 250;

//Mana Bar Settings
var characterInfoManaBarLocX          = 30;
var characterInfoManaBarLocY          = 80;
var characterInfoManaBarHeight        = 20;
var characterInfoManaBarMaxWidth      = 250;

//Endurance Bar Settings
var characterInfoEndBarLocX          = 30;
var characterInfoEndBarLocY          = 110;
var characterInfoEndBarHeight        = 20;
var characterInfoEndBarMaxWidth      = 250;
//**********************************************





//Action Bar Settings
var actionBarSlotHeight = 70;
var actionBarSlotWidth  = 50;
var actionBarSpaceBetweenSlots  = 0;

var actionBar0LocX    = 750;
var actionBar0LocY    = 900;
var actionBar0SlotNum = 10;

var actionSlotHotKeyFont      = "Arial Black";
var actionSlotHotKeyFontColor = "white";
var actionSlotHotKeyFontSize  = 20;


//Action Icon
var actionIconFolder = "assets/images/abilityIcons/";
var actionIconHeight = 70;
var actionIconWidth  = 50;


//Chat Window
var chatWindowDefLocX = 1420;
var chatWindowDefLocY = 650;
var chatWindowWidth  = 500;
var chatWindowHeight = 300;


//Mob List
var mobListWindowLocX = 20;
var mobListWindowLocY = 200;
var mobListWindowWidth = 200;
var mobListWindowHeight = 500;
//var mobListWindowHeight = mobListVisibleSize * mobListVisibleSlotHeight;
        
        
var mobListVisibleSize = 10;
var mobListVisibleSlotHeight = 50;

var mobListVisibleFont      = "Arial Black";
var mobListVisibleFontColor = "white";
var mobListVisibleFontSize  = 20;



///var mobBoxDefaultWidth = 500;
//var mobBoxDefaultHeight = 700;
//var mobBoxDefaultLocX = 750+mobBoxDefaultWidth/2; //to adjust for 0.5 anchor
//var mobBoxDefaultLocY = 200+mobBoxDefaultHeight/2;//to adjust for 0.5 anchor

var mobFrontBoxHeight = windowHeight * 0.7;    
var mobFrontBoxWidth  = mobFrontBoxHeight * 0.7;
var mobBackBoxHeight  = mobFrontBoxHeight * 0.8;
var mobBackBoxWidth   = mobFrontBoxWidth  * 0.8;   

    

var mobImageFolder = "assets/images/mobs/";

///************TO DO***********************************
//Mob image should be proportional to the box and already consider the size difference
//var mobFrontDefaultHeight = mobFrontBoxHeight*0.9;
var mobHeightMultiplierRelativeToBox = 1;
//var mobDefaultWidth  = mobBoxDefaultWidth*0.9;
var mobDefaultWidth  = 500;
///***************************************************



var maximumEngagedMobs = 5;
var maximumMobBoxes = 5;

var mobHPBarHeight = 10;
var mobHPBarWidtMultiplierAgainstBox  =  0.5; 
var mobExecutionBarHeight  = 10;
var mobExecutionBarLength  = 100;

var executionBarLength          = 100;
var executionBarTickInterval    = 50;
var executionBarIncreasePerTick = 1;
