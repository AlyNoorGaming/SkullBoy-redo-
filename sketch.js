var skullBoy, skullWalkLeft, skullWalkRight, skullDed, skullJump, skullAttackRight, skullAttackLeft, skullBoyIMG;
var backgroundIMG;
var GG, GGimg;
var HPFull, HPHalf, HPEmpty, HP, HPNum;
var enemG, enemR, enemP, enemB, enemGroup, invisEnemGroup;
var gameState = "play";

function preload() {
skullBoyIMG = loadAnimation("skullboy right.png");
backgroundIMG = loadImage("grass.jpeg");
skullWalkLeft = loadAnimation("skull leftwalk 1.png", "skull leftwalk2.png");
skullWalkRight = loadAnimation("skull walkright 1.png", "skull walkright 2.png");
skullAttackRight = loadAnimation("skullattack right.png");
skullAttackLeft = loadAnimation("skullattack left.png");
skullDed = loadAnimation("skulldead right.png");
HPFull = loadAnimation("fullhealth.png");
HPHalf = loadAnimation("half health.png");
HPEmpty = loadAnimation("emptyhealth.png");
enemB = loadAnimation("Blue Guy 1.png", "Blue guy 2.png");
enemR = loadAnimation("Red Guy 1.png", "Red Guy 2.png");
GGimg = loadAnimation("over.png");
}

function setup() {
createCanvas(1900, 1000);
HPNum = 2;
skullBoy = createSprite (180, 200, 10, 40);
GG = createSprite (950, 500);
GG.visible = false;
HP = createSprite (200, 100, 30, 30);
skullBoy.addAnimation("Idle", skullBoyIMG);
skullBoy.addAnimation("walkRight", skullWalkRight);
skullBoy.addAnimation("walkLeft", skullWalkLeft);
skullBoy.addAnimation("ATKR", skullAttackRight);
skullBoy.addAnimation("ATKL", skullAttackLeft);
skullBoy.addAnimation("ded", skullDed);
GG.addAnimation("GO", GGimg);
HP.addAnimation("HPF", HPFull);
HP.addAnimation("HPH", HPHalf);
HP.addAnimation("HPE", HPEmpty);

skullBoy.scale = 1.34;

enemGroup = createGroup();
invisEnemGroup = createGroup();
}

function draw() {
background(backgroundIMG);

if (gameState === "play") {

   if (invisEnemGroup.isTouching(skullBoy)) {
      HPNum --;
      skullBoy.overlap(invisEnemGroup, function(collector,collected){
         collected.remove();
      })
   }
   
   
   
   if (frameCount %45 === 0) {
      createEnemy();
   }
   
   if (keyWentUp("right") || keyWentUp("up") || keyWentUp("down") || keyWentUp("left") || keyWentUp("ENTER")) {
      skullBoy.changeAnimation("Idle", skullBoyIMG);
   }
   
   if (keyDown ("right")){
      skullBoy.x += 10;
      skullBoy.changeAnimation("walkRight", skullWalkRight);
   }
   
   if (HPNum === 1) {
      HP.changeAnimation("HPH", HPHalf);
      HP.scale = 2.4;
   }
   else if (HPNum === 0) {
      HP.changeAnimation("HPE", HPEmpty);
      HP.scale = 2.4;
      gameState = "end";
   }
   
   if (keyDown ("up")){
      skullBoy.y += -10;
   }
   
   
   if (keyDown ("left")){
      skullBoy.x += -10;
      skullBoy.changeAnimation("walkLeft", skullWalkLeft);
   }
   
   if (keyDown ("down")){
      skullBoy.y += 10;
   }
   
   if (keyWentDown ("ENTER") && keyDown ("left")) {
   skullBoy.changeAnimation("ATKL", skullAttackLeft);
   }
   
   if (keyWentDown ("ENTER") && keyDown ("right")) {
      skullBoy.changeAnimation("ATKR", skullAttackRight);
   }
   
   if (keyWentDown ("ENTER") && keyDown ("right")) {
      skullBoy.changeAnimation("ATKR", skullAttackRight);
      skullBoy.overlap(enemGroup, function(collector,collected){
         collected.remove() ;
         console.log(invisEnemGroup);
      })
   }
   
   if (keyWentDown ("ENTER") && keyDown ("left")) {
      skullBoy.changeAnimation("ATKL", skullAttackLeft);
      skullBoy.overlap(enemGroup, function(collector,collected){
         collected.remove()
      })
   
   }
   
   if (keyWentDown ("ENTER") && keyWentUp("left") && keyWentUp("right")) {
      skullBoy.changeAnimation("ATKR", skullAttackRight);
   }
   
   if (keyWentDown ("ENTER") && keyWentUp("left") && keyWentUp("right")) {
      skullBoy.changeAnimation("ATKR", skullAttackRight);
      skullBoy.overlap(enemGroup, function(collector,collected){
         collected.remove()
      })
   
   }
   
}
else if(gameState === "end") {
skullBoy.changeAnimation("ded", skullDed);
enemGroup.destroyEach();
invisEnemGroup.destroyEach();
GG.visible = true;
GG.scale = 3;
}


drawSprites();
}

function createEnemy(){
   var ran = Math.round(random (1, 2));
   var x, velocityX, img, invisEnemX;
   if(ran === 1){
      x = 0;
      velocityX = 5;
      img = enemR;
      invisEnemX = 40;
   }
   else if(ran === 2){
      x = width;
      velocityX = -5;
      img = enemB;
      invisEnemX = -40;
   }

   var enemy = createSprite (x, 0); 
   
   enemy.velocityX = velocityX;
   enemy.y = Math.round(random(0, height));
   enemy.addAnimation("enemy", img);
   enemy.scale = 1.3;
   var invisEnem = createSprite (enemy.x -invisEnemX, enemy.y, 10, 10);
   invisEnem.velocityX = velocityX;
   invisEnemGroup.add(invisEnem);
   enemGroup.add(enemy);
}