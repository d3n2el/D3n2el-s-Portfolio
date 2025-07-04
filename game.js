// Setup game canvas in js
import { Player, UI, background , ImageLoader} from "./allClasses.js"
// keep track of levels to know 
let gameLevel = 0 // need to change after testing
var Canvas = document.getElementById("GameCanvas")
    //Create simple rectangle to test with
var ctx = Canvas.getContext("2d")
const imageLoader = new ImageLoader()
const player = new Player(Canvas)
export {player}
const characterKey = "character"
let Background, ui
let isTransitionScreen = false;
const loadPromises = [
    imageLoader.LoadImage(characterKey, "images/mepixBig.png"),
    // load ground first since its the base
    imageLoader.LoadImage('GroundTile', "images/groundTile.png"),  
    // Preload all other images
    imageLoader.LoadImage("BrickTile", "images/brickTile.png"),

    imageLoader.LoadImage('house', "images/house.png"),

    imageLoader.LoadImage('hospital', "images/hospital1.png"),

    imageLoader.LoadImage('FinalFlag', "images/FinalFlag3.png"),

    imageLoader.LoadImage('FrenchFlag', "images/frenchflag.png"),

    imageLoader.LoadImage('ItalianFlag', "images/itaflag.png"),

    imageLoader.LoadImage('SpanishFlag', "images/spainfla.png"),

    imageLoader.LoadImage('EnglishFlag', "images/ukflag.png"),

    imageLoader.LoadImage('RussianFlag', "images/ruflag.png"),

    imageLoader.LoadImage('language', "images/language.png"),

    imageLoader.LoadImage('world', "images/world.png"),

    imageLoader.LoadImage('Psi', "images/psi.png"),

    imageLoader.LoadImage('Paella', "images/paella.png"),

    imageLoader.LoadImage('Pizza', "images/pizza.png"),

    imageLoader.LoadImage('PokePsi', "images/pokepsi.png"),

    imageLoader.LoadImage('Croissant', "images/croissant.png"),

    imageLoader.LoadImage('Eye', "images/eye.png"),

    imageLoader.LoadImage('BackInfo', "images/backinfo.png"),

    imageLoader.LoadImage('PC', "images/pc.png"),

    imageLoader.LoadImage('Leaf', "images/leaf.png")  
]
const levelData = [
    {
        // still cant jump and missing and can go right through bricks
        name: "My life pt.1",
        playerStartX: 100,
        playerStartY: Canvas.height - 200, // Assuming ground level
        objects: [
            // Images for 1st level
            { key: "hospital", x: 2000, y: 350, sizeX: 800, sizeY: 800 },
            { key: "BrickTile", x: 8200, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8230, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8260, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8260, y: 800, sizeX: 30, sizeY:30 },
            { key: "BrickTile", x: 8290, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8290, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8320, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8320, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8320, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8350, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8350, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8350, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8380, y: 830, sizeX: 30, sizeY: 30 },    
            { key: "BrickTile", x: 8380, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8380, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8410, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8410, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8410, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8410, y: 740, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8410, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8440, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8440, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8440, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8440, y: 740, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8470, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8470, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8470, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8470, y: 740, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8470, y: 710, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8500, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8500, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8500, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8500, y: 740, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8500, y: 710, sizeX: 30, sizeY: 30 },         
            { key: "BrickTile", x: 8500, y: 680, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8530, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8530, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8530, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8530, y: 740, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8530, y: 710, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8530, y: 680, sizeX: 30, sizeY: 30 },  
            { key: "FinalFlag",x: 8500 ,y:460,sizeX: 400 ,sizeY:400},
            {key:"house", x:4200 ,y:400,sizeX:700 ,sizeY:700}
            
        ],
        textBlocks: [
            { text: "Daniel's Life", x:300, y:200,color:"black", size:68},
            {text:"I’m currently 17.\nI study in a Linguistic School in Treviso \nI have many hobbies and interests\nand I take pride in wanting to become a Polymath.", x:2000, y:200},
            { text:"Montebelluna is a rural town, so my opportunities \nfor growth were and still are limited to people living in big cities", x:4200, y:200 },
            {text:"I have always considered myself a person that is lucky in the unlucky. And why is that?\nIt’s because I had to face many challenges in my life but i still managed to overcome them.\nThe earliest one was the loss of my mother Lara, at the age of 1 and a half years old.\nI ve also dealt with a food disorder and other things that i don’t feel comfortable disclosing.\nI believe all these experiences made me the person I currently am and tempered me to the challenges of life.",
                            x: 5500, y:200},
            {text:"And this was the end of this part of my life.",x: 8000, y:100},
            {text:"CONGRATULATIONS!!", x:8000, y:200,color:"black",size: 68},
            {text:"(P.s There might be easter eggs hidden ;) ",x:8000, y:250}
        ],
        levelEndFlag: { x: 8700, y: 460, sizeX: 400, sizeY: 400 } 
        
    },{
        textBlocks: [
            {text: "Level “Younger Years” Finished.", x: 500, y: 200, color: "#A40202", size: 70},
            {text: "Do you wish to continue to level “Adolescence”?", x: 500, y: 400, color: "#A40202", size: 50},
            {text: "-Yes_", x: 500, y: 600, color: "#A40202", size: 50},
            {text: "-No[EXIT]", x: 500, y: 750, color: "#A40202", size: 50},
        ],
        levelEndFlag:{x:1000, y: 700, sizeX:200, sizeY: 200},
        isTransitionScreen: true
        
    },
    {
        name: "Adolescence",
        playerStartX: 100,
        playerStartY: Canvas.height - 300,
        objects: [
            {key:"FrenchFlag", x:17000 ,y:550,sizeX:400 ,sizeY:400},
            { key: "FinalFlag",x: 20000 ,y:460,sizeX: 400 ,sizeY:400},
            {key:"SpanishFlag", x:15000, y:450, sizeX:400, sizeY:400},
            {key:"ItalianFlag", x:9000, y:250, sizeX:800, sizeY: 800},
            {key:"EnglishFlag",x:13000,y:450, sizeX:400, sizeY:400 },
            {key:"RussianFlag", x:11000, y:450, sizeX:400, sizeY:400},
            {key:"language", x:6700, y:150, sizeX: 150, sizeY: 150 },
            {key:"world", x:6700, y:400, sizeX: 150, sizeY:150},
            {key:"Psi", x:4500, y:150, sizeX: 400, sizeY: 400},
            {key:"Eye", x:5200, y:100, sizeX: 50, sizeY: 50},
            {key:"Eye", x:5400, y:150, sizeX: 50, sizeY: 50},
            {key:"Eye", x:4900, y:500, sizeX: 50, sizeY: 50},
            {key:"Eye", x:5500, y:500, sizeX: 50, sizeY: 50},
            {key:"Eye", x:5300, y:400, sizeX: 50, sizeY: 50},
            {key:"PokePsi", x:4700, y:600, sizeX: 150, sizeY: 150},
            {key:"PokePsi", x:5750, y:300, sizeX: 150, sizeY: 150},
            {key:"PokePsi", x:5300, y:600, sizeX: 150, sizeY: 150},
            {key:"Croissant", x:16900, y:450, sizeX: 100, sizeY: 100},
            {key:"Pizza", x:9000, y:600, sizeX: 100, sizeY: 100},
            {key:"Paella", x:14700, y:600, sizeX: 100, sizeY: 100},
            {key:"BackInfo", x:3000, y:0, sizeX: 1000, sizeY: 1000},
            {key:"PC", x:3100, y:400, sizeX: 300, sizeY: 300},

            //{key:"Eye", x:5300, y:400, sizeX: 50, sizeY: 50},
            //{key:"Eye", x:5300, y:400, sizeX: 50, sizeY: 50},
            //{key:"Eye", x:5300, y:400, sizeX: 50, sizeY: 50},

        ],
        textBlocks: [
            { text: "Welcome to Level 2, Adolescence and hobbies", x: 100, y: 250, color:"black", size:68 },
            {text:"Like i said, I have many interests.\n One of them is Computer Science and Technology,\n as you can probably guess by the fact that i made this website!!",x: 3000, y:300, color: "white"},
            {text:"Another Passion of mine is \nPsychology as symbolised by the psi and the eyes. \nI studied it a lot in my own time and did \nYale’s Introduction To Psychology course on Coursera.",x: 5000, y:300},
            {text:"Now I’ll talk about languages, \nanother passion that I also study at school. I currently speak 5 languages:\n Italian, English, Russian, Spanish and French. \nI’ll talk more about each language later.",x: 7000 ,y:300},
            { text: "I’ll start with my native language: Italian.\nIt holds a special place in my heart since it’s the\n language of family, friends and school. I find it\n really beautiful, albeit practically useless.", x: 9000, y: 300, color:"black" },
            { text: "And my hereditary language: Russian.\nI speak it quite well but not at an advanced level.\nI learned the language from myfather when i was little, butt hen i practically lost it.\nFortunately I picked it up\nagain at school and I managed to reach a fluent level,\n especially at the oral level.", x: 11000, y: 300, color:"black"},
            { text: "English, the lingua franca of\nthe world and my 3rd language. I learnt it via comprehensible input\nfrom a really young age and I have now achieved a C2 score on a Cambridge exam.", x: 13000, y: 300, color:"black" },
            { text: "My 4th language is Spanish.\n I learned it in School starting from 14 y.o.\n I currently have a B2 Level\n(even though I’m still waiting for my DELE results).\n I love the culture and \n from both Spain and Latin America", x:15000, y: 300 },
            { text: "French is my 5th language and\nthe one I’m the most proud of.\nThat is because I learnt it solo,\nwithout the help of school,parents\nor any sort of guided course. I\nmostly used comprehensible input\nwith occasional lessons with a\nteacher to practice speaking\nand grammar.", x: 17000, y: 300},        
        ],
        levelEndFlag: { x: 20000, y: 460, sizeX: 400, sizeY: 400 } //found the problem
    },{
        textBlocks: [
            {text: "Level “Adolescence” Finished.", x: 500, y: 200, color: "#A40202", size: 70},
            {text: "Do you wish to continue to level “Dreams and Aspirations”?", x: 500, y: 400, color: "#A40202", size: 50},
            {text: "-Yes_", x: 500, y: 600, color: "#A40202", size: 50},
            {text: "-No[EXIT]", x: 500, y: 750, color: "#A40202", size: 50},
        ],
        levelEndFlag:{x:1000, y: 700, sizeX:200, sizeY: 200},
        isTransitionScreen: true

    },
    {
        // movement doesnt work here. It was because of missing final flag
        name: "My life pt.3",
        playerStartX: 100,
        playerStartY: Canvas.height - 300, 
        objects:[
            {key:"Leaf", x:6800, y:300, sizeX: 150, sizeY: 150},
            {key:"FinalFlag", x:12000, y:460, sizeX: 400, sizeY: 400},
        ],
        textBlocks:[
            { text: "You reached the final level “Dreams and Aspirations”!! So, what are my Dreams and Aspirations?",
                 x: 100, y: 250, color:"black", size:68 },

            { text: "I currently would like to join a prestigious\nbusiness school. Thinking about Escp\nmainly for their unique approach but\nalso to others in Europe, mostly in the UK.\nAnd of course the ivies would be a\ndream too but with the current political\nsituation, I would rather avoid.", x: 4000, y: 250 },
            { text: "After University,\nI would like to start my own company since\never since I was little that was my dream.\nI would also love to make something related to the environment since I care a lot about it.", x: 7000, y: 250},
            { text: "Congratulations!!\n\nYou finished my game-like portfolio,\n\nfor a more professional outlook, click no to the initial question", x: 10000, y: 250, color: "black", size:68 },
        ],
        levelEndFlag: { x: 12000, y: 460, sizeX: 400, sizeY: 400 }

    },
    {
            textBlocks: [
            {text: "Level “Dreams and Aspirations” Finished.", x: 500, y: 200, color: "#A40202", size: 70},
            {text: "Congratulations, you finished the game!", x: 500, y: 400, color: "#A40202", size: 70},
            {text: "-[EXIT]", x: 500, y: 750, color: "#A40202", size: 50},
        ],
        levelEndFlag:{x:1000, y: 700, sizeX:200, sizeY: 200},
        isTransitionScreen: true
    }

]
var currentLevel = levelData[gameLevel];
showLoadingScreen(true)
Promise.all(loadPromises)
    .then(() => {
        console.log("All images loaded successfully")
        Background = new background(ctx,Canvas, player,imageLoader)
        ui = new UI(ctx, Canvas, player)
        player.x = currentLevel.playerStartX;
        player.y = currentLevel.playerStartY;
        showLoadingScreen(false)
        update()
    })
    .catch(error => {
        console.error("Loading failed:", error);
        // Show error to player
        showLoadingScreen(false)
    });
function update(){
     const finalFlagObject = currentLevel.levelEndFlag
    //need to substitute rectangle with my character
    // get how many tiles are there
    if (currentLevel.isTransitionScreen) {
        endScreen(currentLevel);
        return; // to stop game and start end screen
        }

    const brickTiles = getBrickTiles(currentLevel.objects);
    // check if player is colliding with bricks
    const prevX = player.x
    const prevY = player.y
    ctx.clearRect(0,0,Canvas.width, Canvas.height)
    player.update()
    // trying out differet orders to see if things would change or not
    // my theory is that it aint working cuz it checks for collisions before movement
    // so of course it doesnt see the collisions
    const collidingBrick = player.checkCollisions(brickTiles);
    let playerIsOnBrick = false
// debugging, will eliminate later
ctx.fillStyle = 'red';
ctx.fillRect(0, player.ground, Canvas.width, 2); // Ground line
ctx.fillStyle = 'blue';
ctx.fillRect(player.x - player.cameraX, player.y, 5, 5);
    if (collidingBrick) {
        handleBrickCollision(collidingBrick);
        }


    currentLevel.objects.forEach(obj => {
        Background.DrawImage(obj.key, obj.x, obj.y, obj.sizeX, obj.sizeY);
    });
    currentLevel.textBlocks.forEach(textBlock => {
        ui.DrawWorldText(textBlock.text, textBlock.x, textBlock.y, textBlock.color, textBlock.size);
    });
    const character = imageLoader.getImage(characterKey);
        //actually draw image on canvas
    if(character){
        ctx.drawImage(
        character, 
        player.x - player.cameraX, 
        player.y - (player.height - 100), 
        100, 
        100
    );
    }
       
    Background.DrawGround(player.cameraX)

    // check flag collision and then load new level
    if(player.isCollidingWith({
        x: finalFlagObject.x - (player.x - prevX),
        y: finalFlagObject.y - (player.y - prevY),
        sizeX: finalFlagObject.sizeX,
        sizeY: finalFlagObject.sizeY,
    })){
        if(gameLevel < levelData.length - 1) {
        endScreen(levelData[gameLevel + 1])
        return; 
    }}
    console.log(`Player Y: ${player.y}, Ground: ${player.ground}, OnGround: ${player.onGround}`);
    requestAnimationFrame(update)
}

function getBrickTiles(levelObjects) {
    return levelObjects.filter(obj => obj.key === 'BrickTile');
}
 
// Handle what happens when player hits bricks so that it can actually be called a platformer and not just a side scroller
function handleBrickCollision(brickObject) {
    const buffer = player.collisionBuffer; // hopeefully buffring wll solve the phasing cuz that shit annoying af
    // Calculate player bounds with buffer
    const playerLeft = player.x;
    const playerRight = player.x + player.width;
    const playerTop = player.y;
    const playerBottom = player.y + player.height;
    
    // Calculate brick bounds to then actually check collision
    const brickLeft = brickObject.x;
    const brickRight = brickObject.x + brickObject.sizeX;
    const brickTop = brickObject.y;
    const brickBottom = brickObject.y + brickObject.sizeY;
    
    // Calculate overlap on both axis
    const overlapLeft = playerRight - brickLeft
    const overlapRight = brickRight - playerLeft
    const overlapTop = playerBottom - brickTop
    const overlapBottom = brickBottom - playerTop

    const minOverlapX = Math.min(overlapLeft - overlapRight);
    const minOverlapY = Math.min(overlapTop - overlapBottom);
    
        // Resolve along the axis of least penetration
        if (minOverlapX < minOverlapY) {
            // Horizontal collision
            if (overlapLeft < overlapRight) { // Moving right into brick
                player.x = brickLeft - player.width;
            } else { // Moving left into brick
                player.x = brickRight;
            }
            player.vx = 0;
        } else {
            // Vertical collision
            if (overlapTop < overlapBottom) { 
                player.y = brickTop - player.height;
                player.vy = 0;
                player.onGround = true;
            } else { // Hitting brick from below, even though there wont be a need for it
                player.y = brickBottom;
                player.vy = 0;
            }
        }
    }

function getCollidableObjects(levelObjects) {
    const collidableKeys = ['BrickTile', 'hospital', 'house'];
    return levelObjects.filter(obj => collidableKeys.includes(obj.key));
}

// it now works, now i need to make sure there is an actual ending of screen 
function showLoadingScreen(show){
    let loading = document.getElementById("loadingScreen")
    if(loading){
        loading.style.display = show ? "flex":"none"
    }
}

function endScreen(currentLevel){
    isTransitionScreen = true
     Canvas.style.cursor = 'pointer'
    // i will make comments to guide myself through the process of creating an end screen
    //when gamelevel goes up, i need to call it
    // each level should have similar but different end screens
    // each one should have a button to continue with the game and one to quit
    // had a brilliant idea, should just add them to level data, so that it progresses right
    // once i click continue button, gamelevel should do ++
    // all of this should be valid 
    // Clear the canvas
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    
    // Draw all text blocks
    currentLevel.textBlocks.forEach(textBlock => {
        ui.DrawUIText(textBlock.text, textBlock.x, textBlock.y, textBlock.color, textBlock.size);
    });
    
    // Set up click handler (only for transition screens)
    if (currentLevel.isTransitionScreen) {
        Canvas.addEventListener('click', handleTransitionClick, { once: true });
    }
}

function handleTransitionClick(event) {
    if(!isTransitionScreen) return;
    const canvasRect = Canvas.getBoundingClientRect();
    const scaleX = Canvas.width / canvasRect.width;
    const scaleY = Canvas.height / canvasRect.height;
    
    const x = (event.clientX - canvasRect.left) * scaleX;
    const y = (event.clientY - canvasRect.top) * scaleY;
    console.log("Clicked at:", x, y);
    // Check "Yes" button click to then get user to next level
    if (x > 480 && x < 720 && y > 580 && y < 670) {
        gameLevel++;
        currentLevel = levelData[gameLevel];
        player.x = currentLevel.playerStartX;
        player.y = currentLevel.playerStartY;
        player.cameraX = 0;
        isTransitionScreen = false;
        Canvas.style.cursor = 'default';
        update();
    } 
    // Check "No" button click to then get back to start
    else if (x > 480 && x < 730 && y > 700 && y < 820) {
        alert("Thanks for playing!");
        window.location.href = "index.html";
    }
}
console.log(`Player Y: ${player.y}, Ground: ${player.ground}`);
console.log(`Canvas height: ${Canvas.height}`);

// made the functions and hopefully they work, now need to change the code elsewhere. will commit

//wdwd
     // Reminder for self: cannot get favicon, dont even know what is rn