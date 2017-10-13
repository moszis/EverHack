
/* global require, index */

//node.js services
var http      = require('http');
var mysql     = require('mysql');
var express   = require('express');
var socketIO  = require('socket.io');
var fs        = require('fs');

//custom app includes
var mysqlPool = require('mysqlPool').pool;

//var index = fs.readFileSync(__dirname + '/nodejsTest.html');



var app = http.createServer(function (req, res) {  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);


console.log('Server running at http://127.0.0.1:8124/');


// Emit welcome message on connection
io.sockets.on('connection', function(socket) {
    
    console.log('new connection..'+socket.id);
    
    socket.emit('welcome', { message: 'Welcome!'});
    
    socket.on('received character', console.log);
    socket.on('received character abilities', console.log);
 
    socket.on('getZone', function(data){ 
        console.log('received request for Zone id: '+data.zoneID); 
        sendZone(socket, data.zoneID); 
    });

    socket.on('getMobArchetypes', function(data){ 
        console.log('received request for Mob Archetypes'); 
        sendArchetypes(socket); 
    });
    
    socket.on('getAllAbilities', function(data){ 
        console.log('received request for All Abilities'); 
        sendAllAbilities(socket, data.zoneID); 
    });
    
    socket.on('getAllGameAssets', function(data){ 
        console.log('received request for All Game Assets'); 
        sendAllGameAssets(socket, data.zoneID); 
    });
    
    socket.on('getZoneMobs', function(data){ 
        console.log('received request for Zone Mobs id: '+data.zoneID); 
        sendZoneMobs(socket, data.zoneID); 
    });
    
    socket.on('getMobAbilities', function(data){ 
        console.log('received request for Mob Abilities, for zone: '+data.zoneID); 
        sendMobAbilities(socket, data.zoneID); 
    });
    
    socket.on('getCharacter', function(data){ 
        console.log('received request for Character id: '+data.characterID); 
        sendCharacter(socket, data.characterID); 
    });

    socket.on('getCharacterAbilities', function(data){ 
        console.log('received request for Character Abilities: '+data.characterID); 
        sendCharacterAbilities(socket, data.characterID); 
    });
    
    socket.on('updateActionSlot', function(data){ 

        console.log('received request to update action slot for character: '+data.characterID); 
        console.log('actionID '+data.actionID+' needs to move to slot '+data.slotID)
        updateActionSlot(data.characterID, data.actionID, data.slotID)
    });
});

    
app.listen(8124);


//*******************************SERVICE FUNCTIONS***************************//


function sendCharacter(socket, charID){
    
    var query = 'SELECT c.player_character_id as charID,           \n\
                    c.player_characterName as charName,            \n\
                    c.Class_id as charClassID,                     \n\
                    c.Race_id as charRaceID,                       \n\
                    c.Level as charLevel,                          \n\
                    c.EXP   as charEXP,                            \n\
                    c.baseHP  as charBaseHP,                       \n\
                    c.baseMana as charBaseMana,                    \n\
                    c.baseEnd as charBaseEnd,                      \n\
                    c.Strength as charBaseStr,                     \n\
                    c.Stamina as charBaseSta,                      \n\
                    c.Dexterity as charBaseDex,                    \n\
                    c.Agility as charBaseAgi,                      \n\
                    c.Intelligence as charBaseInt,                 \n\
                    c.Widom as charBaseWis,                        \n\
                    c.Charisma as charBaseCha,                     \n\
                    c.1hSlashing as OneHSlashing,                    \n\
                    c.2hSlashing as TwoHSlashing,                    \n\
                    c.1hBlunt    as OneHBlunt,                       \n\
                    c.2hBlunt    as TwoHBlunt,                       \n\
                    c.1hPiercing as OneHPiercing,                    \n\
                    c.2hPiercing as TwoHPiercing,                    \n\
                    c.DualWield  as DualWield,                     \n\
                    c.Kick       as Kick,                          \n\
                    c.Block      as Block,                         \n\
                    c.Dodge      as Dodge,                         \n\
                    c.Riposte    as Reposte,                       \n\
                    c.Parry      as Parry,                         \n\
                    c.Bash       as Bash,                          \n\
                    c.Slam       as Slam,                          \n\
                    sc.class_name as charClass,                    \n\
                    sr.race_name  as charRace                      \n\
                FROM player_characters c                           \n\
                JOIN system_classes sc                             \n\
                ON c.Class_id = sc.class_id                        \n\
                JOIN system_races sr                               \n\
                ON c.Race_id = sr.race_id                          \n\
                WHERE c.player_character_id = '+charID;
    
    mysqlPool.getConnection(function(err, connection){   
        connection.query(query, function(err, result, fields){
           if(err){ throw err;}else{
              //character = JSON.stringify(result);
              socket.emit('CharacterInformation', { character: JSON.stringify(result)});
              console.log('character sent..'+JSON.stringify(result)); 
           }
           connection.release();
        });
    });

}

function sendCharacterAbilities(socket, charID){
    
    var query = 'SELECT pca.player_character_id as charID,         \n\
                    pca.actionSlot_id as actionSlotID,             \n\
                    sa.ability_id as abilityID,                    \n\
                    sa.ability_name as abilityName,                \n\
                    sa.ability_icon as abilityIcon,                \n\
                    sa.ability_base_dmg        as baseDamage,      \n\
                    sa.ability_execution_time  as executionTime,   \n\
                    sa.ability_stun_time       as stunTime,        \n\
                    sa.ability_action_category as actionCatID,     \n\
                    ac.action_category_name    as actionCatName,   \n\
                    sa.ability_damage_category as damageCatID,     \n\
                    dc.damage_category_name    as damageCatName,   \n\
                    sa.ability_base_skill      as baseSkillID,     \n\
                    ss.skill_name              as baseSkillName,      \n\
                    sa.ability_knockBack       as knockBack           \n\
                FROM player_character_abilities pca                   \n\
                JOIN system_abilities sa                              \n\
                ON pca.ability_id = sa.ability_id                     \n\
                JOIN system_action_categories ac                      \n\
                ON sa.ability_action_category = ac.action_category_id \n\
                JOIN system_damage_categories dc                      \n\
                ON sa.ability_damage_category = dc.damage_category_id \n\
                JOIN system_skills ss                                 \n\
                ON sa.ability_base_skill = ss.skill_id                \n\
                WHERE pca.player_character_id = '+charID;
    
    mysqlPool.getConnection(function(err, connection){   
        connection.query(query, function(err, result, fields){
           if(err){ throw err;}else{
              //character = JSON.stringify(result);
              socket.emit('CharacterAbilities', { characterAbilities: JSON.stringify(result)});
              console.log('character abilities sent..'+JSON.stringify(result)); 
           }
           connection.release();
        });
    });

}

function sendZone(socket, zoneID){
    
    var query = 'SELECT z.zone_name as zoneName,                  \n\
                    z.zone_desc as zoneDesc,                      \n\
                    z.zone_id as zoneID,                          \n\
                    z.zone_bgimg as zoneBGImg,                    \n\
                    z.zone_mobboxfront_floor as frontBoxFloorPct  \n\
                FROM system_zones z                               \n\
                WHERE z.zone_id = '+zoneID;
    
    
    mysqlPool.getConnection(function(err, connection){   
        connection.query(query, function(err, result, fields){
           if(err){ throw err;}else{
              //zone = JSON.stringify(result);
              socket.emit('ZoneInformation', { ZoneInformation: JSON.stringify(result)});
              console.log('zone information sent..'+JSON.stringify(result)); 
           }
           connection.release();
        });
    });

}


function sendArchetypes(socket){
    

    var query = 'SELECT ma.archetype_id as archetypeID,                            \n\
                    ma.archetype_name as archetypeName,                            \n\
                    ma.archetype_HPPerLevel as archetypeHPPerLevel,                \n\
                    ma.archetype_WeaponDamagePerLevel as archetypeWeaponDamagePerLevel,    \n\
                    ma.archetype_MeleeSkillPerLevel as archetypeMeleeSkillPerLevel,\n\
                    ma.archetype_MagicSkillPerLevel as archetypeMagicSkillPerLevel,\n\
                    ma.archetype_StrPerLevel as archetypeStrPerLevel,              \n\
                    ma.archetype_AgiPerLevel as archetypeAgiPerLevel,              \n\
                    ma.archetype_DexPerLevel as archetypeDexPerLevel,              \n\
                    ma.archetype_IntPerLevel as archetypeIntPerLevel,              \n\
                    ma.archetype_WisPerLevel as archetypeWisPerLevel,              \n\
                    ma.archetype_ChaPerLevel as archetypeChaPerLevel               \n\
                FROM system_mobarchetypes ma '

                
    
    
    mysqlPool.getConnection(function(err, connection){   
        connection.query(query, function(err, result, fields){
           if(err){ throw err;}else{
              socket.emit('MobArchetypes', { MobArchetypes: JSON.stringify(result)});
              console.log('Mob Archetype Information sent..'+JSON.stringify(result)); 
           }
           connection.release();
        });
    });

}



function sendZoneMobs(socket, zoneID){
    
    var query = 'SELECT zm.zone_id as zoneID,                          \n\
                    zm.zone_rarity_multiplier as zoneRarityMultiplier, \n\
                    zm.mob_minLevel as mobMinLevel,                    \n\
                    zm.mob_maxLevel as mobMaxLevel,                    \n\
                    m.mob_id as mobID,                                 \n\
                    m.mob_name as mobName,                             \n\
                    m.mob_level as mobLevel,                           \n\
                    m.mob_achetype_id as mobArchetypeID,               \n\
                    m.mob_img as mobIMG,                               \n\
                    m.mob_rarity as mobRarity,                         \n\
                    m.mob_rank   as mobRank,                           \n\
                    mr.mobrarity_multiplier as rarityMultiplier,       \n\
                    m.mob_hp_multiplier as mobHPMultiplier,            \n\
                    m.mob_WeaponBaseDamage_multiplier as mobWeaponDamageMultiplier, \n\
                    m.mob_MeleeSkill_multiplier as mobMeleeMultiplier, \n\
                    m.mob_MagicSkill_multiplier as mobMagicMultiplier, \n\
                    m.mob_ac_multiplier     as mobAC,                  \n\
                    m.mob_str_multiplier as mobStrMultiplier,          \n\
                    m.mob_agi_multiplier as mobAgiMultiplier,          \n\
                    m.mob_dex_multiplier as mobDexMultiplier,          \n\
                    m.mob_int_multiplier as mobIntMultiplier,          \n\
                    m.mob_wis_multiplier as mobWisMultiplier,          \n\
                    m.mob_cha_multiplier as mobChaMultiplier,          \n\
                    m.mob_meleeAttack_sound as mobMeleeAttackSound,    \n\
                    m.mob_death_sound as mobDeathSound,                \n\
                    m.mob_gettingMeleeHit_sound as mobGettingMeleeHitSound   \n\
                FROM system_mobs m                                     \n\
                JOIN system_zone_mobs zm                               \n\
                ON m.mob_id = zm.mob_id                                \n\
                JOIN system_mobrarities mr                             \n\
                ON m.mob_rarity = mr.mobrarity_id                      \n\
                WHERE zm.zone_id = '+zoneID;
    
    
    mysqlPool.getConnection(function(err, connection){   
        connection.query(query, function(err, result, fields){
           if(err){ throw err;}else{
              socket.emit('ZoneMobs', { ZoneMobs: JSON.stringify(result)});
              console.log('Zone Mobs sent..'+JSON.stringify(result)); 
           }
           connection.release();
        });
    });

}


function sendAllAbilities(socket, zoneID){
    
    var query = 'SELECT sa.ability_id as abilityID,                \n\
                    sa.ability_name as abilityName,                \n\
                    sa.ability_icon as abilityIcon,                \n\
                    sa.ability_base_dmg        as baseDamage,      \n\
                    sa.ability_execution_time  as executionTime,   \n\
                    sa.ability_stun_time       as stunTime,        \n\
                    sa.ability_action_category as actionCatID,     \n\
                    ac.action_category_name    as actionCatName,   \n\
                    sa.ability_damage_category as damageCatID,     \n\
                    dc.damage_category_name    as damageCatName,   \n\
                    sa.ability_base_skill      as baseSkillID,      \n\
                    ss.skill_name              as baseSkillName,       \n\
                    sa.ability_knockBack       as knockBack            \n\
                FROM system_abilities sa                               \n\
                JOIN system_action_categories ac                       \n\
                ON sa.ability_action_category = ac.action_category_id  \n\
                JOIN system_damage_categories dc                       \n\
                ON sa.ability_damage_category = dc.damage_category_id  \n\
                JOIN system_skills ss                                  \n\
                ON sa.ability_base_skill = ss.skill_id';
    
    
    mysqlPool.getConnection(function(err, connection){   
        connection.query(query, function(err, result, fields){
           if(err){ throw err;}else{
              socket.emit('AllAbilities', { AllAbilities: JSON.stringify(result)});
              console.log('AllAbilities sent..'+JSON.stringify(result)); 
           }
           connection.release();
        });
    });

}


function sendMobAbilities(socket, zoneID){
    
    var query = "SELECT DISTINCT ma.mob_id as mobID,      \n\
                        GROUP_CONCAT(DISTINCT ma.ability_id order by ma.ability_id) as abilityIDList       \n\
                FROM system_mob_abilities ma     \n\
                JOIN system_zone_mobs zm         \n\
                ON ma.mob_id = zm.mob_id         \n\
                WHERE zm.zone_id = "+zoneID+"  \n\
                GROUP BY ma.mob_id"
       
                
    
   
    mysqlPool.getConnection(function(err, connection){   
        connection.query(query, function(err, result, fields){
           if(err){ throw err;}else{
              socket.emit('MobAbilities', { MobAbilities: JSON.stringify(result)});
              console.log('Mob Abilities sent..'+JSON.stringify(result)); 
           }
           connection.release();
        });
    });

}



function updateActionSlot(charID, abilityID, slotID){
    
    var query = 'UPDATE player_character_abilities        \n\
                 SET actionSlot_id = '+slotID+' \n\
                 WHERE player_character_id = '+charID+' \n\
                       and ability_id = '+abilityID
                 
               
    console.log(query);
    
    mysqlPool.getConnection(function(err, connection){   
        connection.query(query, function(err, result, fields){
           if(err){ throw err;}else{
              console.log('action slot updated'); 
           }
           connection.release();
        });
    });
}

function sendAllGameAssets(socket){
    
    var query = 'SELECT sa.asset_id as assetID,             \n\
                    sa.asset_desc as assetDesc,             \n\
                    sa.asset_file as assetFile,             \n\
                    sa.asset_category as assetCategory      \n\
                FROM system_assets sa'                       
    
    
    mysqlPool.getConnection(function(err, connection){   
        connection.query(query, function(err, result, fields){
           if(err){ throw err;}else{
              //zone = JSON.stringify(result);
              socket.emit('AllGameAssets', { AllGameAssets: JSON.stringify(result)});
              console.log('all game assets sent..'+JSON.stringify(result)); 
           }
           connection.release();
        });
    });

}