var scoreCanvasFS;
var scorectxFS;
myStorage = localStorage;

if(isNaN(parseFloat(localStorage.getItem('score')))){
    localStorage.setItem('score',0);
}
if(isNaN(parseFloat(localStorage.getItem('highScore')))){
    localStorage.setItem('highScore',0);
}
Score.score = parseInt(localStorage.getItem('score'));
Score.highScore = parseInt(localStorage.getItem('highScore'));
localStorage.setItem('score', Score.score);
localStorage.setItem('highScore', Score.highScore);





//___________________
window.onload = function(){
//___________________


document.getElementById("submitButton").onclick = function() {
    const div = document.getElementById("scoreNameInputDiv")
    div.style.visibility="hidden"
 }


//  DATABASE
//------------------------------------------   
const db = firebase.firestore();
db.collection('scores').get().then(querySnapshot =>{

querySnapshot.forEach(doc =>{
 
    rankStrings[doc.data().Rank-1][0] = doc.data().Rank; 
    rankStrings[doc.data().Rank-1][1] = doc.data().Username;
    rankStrings[doc.data().Rank-1][2] = doc.data().score;
    redrawScore();
})
})
db.collection('scores').doc("1").update({
  // Rank : 1
  });




    


    

 //------------------------------------------   
    
	if(!(isNaN(parseFloat(JSON.parse(localStorage.getItem('fieldArray')))))){

    var fieldArray = JSON.parse(localStorage.getItem('fieldArray'));
	for (row = 0; row < 5; row++){
	for (split = 0; split < 5; split++){
		grid[row][split] = fieldArray[row][split]
		}}
    createFieldsRec();
}
   
    
    correctCanvasSize();
    correctCanvasPosition();
    redrawRankinputField();
    redrawScore();
    
    const canvas = document.getElementById("mainCan");
    
    var ctx = canvas.getContext('2d');
   if(grid[0][0] == 0){  
    moveTilesDown();
    localStorage.setItem('fieldArray', JSON.stringify(grid));

}
    createFieldsRec();

    
    canvas.addEventListener('mousedown', function(e) {
        const scoreNameInputDiv=  document.getElementById("scoreNameInputDiv");
        if( allowed.clickAllowed && scoreNameInputDiv.style.visibility == "hidden"){
           
        scoreNameInputDiv.style.display = "block";
        makeEvent(canvas, e);
        }
        
    });
    function makeEvent(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
 
        if(getTileState(x,y) > 0){
            
            allowed.clickAllowed = false;
        changeFieldsRecState(x,y);
        createFieldsRec();
        setTimeout(function(){
            deleteFinishedLines();
            if(Score.score > Score.highScore){
                Score.highScore = Score.score;
                localStorage.setItem('highScore', Score.highScore);
            }
            localStorage.setItem('score',Score.score);
			localStorage.setItem('fieldArray', JSON.stringify(grid));
            redrawScore();
            createFieldsRec();
            if(checkIfLost()){

                localStorage.setItem('score',0);
				
                restoreField();
                createFieldsRec();
                const div = document.getElementById("scoreNameInputDiv")
                div.style.visibility="visible"
                localStorage.setItem('fieldArray', JSON.stringify(grid));

            }else{
                allowed.moveTile = true;
            }
        },500);
        
        setTimeout(function() {
            if(allowed.moveTile){
        moveTilesDown();
		localStorage.setItem('fieldArray', JSON.stringify(grid));
        createFieldsRec();
        
        allowed.moveTile = false;
            }
        allowed.clickAllowed = true;
        }, 1000);
    
        
        
    }
    }
    
    
    
    
    

  }

window.addEventListener('resize', function(){
    correctCanvasSize(); 
    correctCanvasPosition();
    createFieldsRec();
    redrawScore();
    redrawRankinputField();
    
},true);


// Correct the field for rank input field
function redrawRankinputField(){
    const scoreNameInputDiv =  document.getElementById("scoreNameInputDiv");
    const dialog            =  document.getElementById("dialog");
    const textInput         =  document.getElementById("textInput");
    const canvasForInput    =  document.getElementById("scoreNameInputCan");
    const mainCan           =  document.getElementById("mainCan");
    const submitButton      =  document.getElementById("submitButton")

    
    // entire Div
    scoreNameInputDiv.style.width = ""+mainCan.width*3/4+"px";
    scoreNameInputDiv.style.height = ""+mainCan.height*3/4+"px";
    scoreNameInputDiv.style.left = removePX(mainCan.style.left)+(mainCan.width/2)-removePX(scoreNameInputDiv.style.width)/2+"px" ;
    scoreNameInputDiv.style.top = removePX(mainCan.style.top)+(mainCan.height/2)-removePX(scoreNameInputDiv.style.height)/2+"px" ;
    // Text input
    textInput.style.width = "50%";
    textInput.style.top = "70%";
    textInput.style.left = "25%";

    // submit Button 
    submitButton.style.width = "20%";
    submitButton.style.height = "7.5%";
    submitButton.style.left = "40%";
    submitButton.style.top = "80%";
    // Dialog
    console.log(mainCan.width)
    dialog.style.fontSize = ""+100*mainCan.width/735+"%";
    dialog.style.width = "50%"
    dialog.style.top = "10%";
    dialog.style.left = "25%";
        //Score
        document.getElementById("dialogScore").innerHTML = ""+Score.highScore;
        //Rank
        document.getElementById("dialogRank").innerHTML = ""+10+"'s Place";
    canvasForInput.style.width ='100%';
    canvasForInput.style.height='100%';
    
    canvasForInput.width  = canvasForInput.offsetWidth;
    canvasForInput.height = canvasForInput.offsetHeight;
}
function removePX(string){
    return (Number(string.replace("px","")));
}

function redrawScore(){
    
    var rankCan = document.getElementById("rankCan");
    var rankCanCtx = rankCan.getContext('2d');
    scoreCanvasFS = document.getElementById("scoreCan");
    scorectxFS = scoreCanvasFS.getContext('2d');
    scorectxFS.fillStyle = 'green';
    scorectxFS.fillRect(0,0,scoreCanvasFS.width,scoreCanvasFS.height);
    innerScoreCanvasFS = document.getElementById("innerScoreCan");
    innerScorectxFS = innerScoreCanvasFS.getContext('2d');
   
    //Score Rectangle
    innerScorectxFS.fillStyle = 'black';
    innerScorectxFS.fillRect(0,0,innerScoreCanvasFS.width/3,innerScoreCanvasFS.height/3);
    innerScorectxFS.font = scoreCanvasFS.width/28+"pt Arial";
    innerScorectxFS.fillStyle = "white";
    innerScorectxFS.fillText(Score.score,innerScoreCanvasFS.width/100,innerScoreCanvasFS.height/4);
    //High Score Rectangle
    innerScorectxFS.fillStyle = 'black';
    innerScorectxFS.fillRect(0,innerScoreCanvasFS.height/1.5,innerScoreCanvasFS.width/3,innerScoreCanvasFS.height/3);
    innerScorectxFS.font = scoreCanvasFS.width/28+"pt Arial";
    innerScorectxFS.fillStyle = "white";
    innerScorectxFS.fillText(Score.highScore,innerScoreCanvasFS.width/100,innerScoreCanvasFS.height/1.1);
    // Ranks 
    for(i=1; i<=10;i++){
        var y;
        var x;
        y = ((rankCan.height/5)*(i%5));
        if(i>5){
            x = rankCan.width/2
        }else{
            x = 0;
        }
        
        rankCanCtx.rect(x,y,rankCan.width/2,rankCan.height/5)
        rankCanCtx.fillStyle = 'black'
        rankCanCtx.fill();8,
        rankCanCtx.lineWidth = 5/(415/rankCan.width);
        rankCanCtx.strokeStyle= 'red';
        rankCanCtx.stroke();
      
    }
    var x = rankCan.width/100;
    var y = rankCan.height/8;
    rankCanCtx.font = rankCan.width/50+"pt Arial";
    rankCanCtx.fillStyle = "white";

    for(i= 0; i< 10;i++){
        rankCanCtx.fillText(getRankText(i),x,y);
        y = y+rankCan.height/5;
        if(i == 4){
            y = rankCan.height/8;
            x =rankCan.width/2+rankCan.width/100;
        }
        
       
        
    }

    
    
    
   
    
   
    
}
function getRankText(rankNumber){
    var string = rankStrings[rankNumber][0]+". "+rankStrings[rankNumber][1]+" "+rankStrings[rankNumber][2];
    return string;
}
// restore the field and delete everything after one lose
function restoreField(){
    for (row = 0; row < 5; row++){
        for (split = 0; split < 5; split++){
            
            grid[row][split] = 0;
            
        }
    }
    // move tiles down so that a new game gets generated 
    moveTilesDown();
}
// check if you lost the game
function checkIfLost(){
    if(grid[4][0]  != 0){
		Score.score = 0;
		redrawScore();
        return true;
		
    }else{
    return false;
    }
}
// Random Int Generator
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

// check and delete finished rows
function deleteFinishedLines (){
   
    // add up how many are in a row
    for (row = 0; row < 5; row++){
        for (split = 0; split < 5; split++){
            if(inARow[row] == 0){
                inARow[row] ++;
            }else if(grid[row][split] == grid[row][split-1]){
                inARow[row] ++;
            }else if(inARow[row] < 3){
                inARow[row] = 1;
            }else if(inARow[row] == 3){
				split = 5;
			}
            if(grid[row][split] == 0){
                inARow[row] = 0;
            }
        }
    }

    // delete when 5 in a row
    
    for (row = 0; row < 5; row++){ 
        
        if(inARow[row] >= 5){
            Score.score = Score.score + 100;
            for(row = 0;row < 5;row++){
            for (split = 0; split < 5; split++){
                grid[row][split] = 0;
                
                
            }
        }
        }
    // delete when 4 in a row
        else if(inARow[row] == 4){
            Score.score = Score.score + 50;
            for (split = 0; split < 5; split++){
                grid[row][split] = 0;
                if(row != 4){
                grid[row+1][split] = 0;
            }
            if(row != 0){
                grid[row-1][split] = 0;
            }
            }
        }
    // delete when 3 in a row
        else if(inARow[row] >= 3){
            Score.score = Score.score + 10;
            for (split = 0; split < 5; split++){
                grid[row][split] = 0;
            }
        }
    }
    // turn in a row counter back to 0
    for (row = 0; row < 5; row++){
        inARow[row] = 0;
    }
} 
// moves the Tiles down 
function moveTilesDown(){
    for(row = 5; row>0;row--){
        for(split = 5 ;split > 0 ;split--){
            // generate a new row 
            if(row == 1){
                grid[row-1][split-1] = getRandomInt(3)+1;
                if(split == 3){
                    
                }
            }
            // change a tile to the tile above it 
            else{
               grid[row-1][split-1] = grid[row-2][split-1];
            }
        }
    }
    // check that the new generated row is not already finished and if change it and test again
    for(test = 0; test != 1;){
        if(!((grid[0][0] == grid[0][1]) && (grid[0][1] == grid[0][2]) ||(grid[0][3]== grid[0][1]) && (grid[0][2] == grid[0][1])||(grid[0][3]== grid[0][4]) &&  (grid[0][2] == grid[0][4]))){
            test = 1;
        }else{
            grid[0][2] = getRandomInt(3)+1;
        }
    }
}
// generate the Rectangles and give them their state
function createFieldsRec(){
    for(var row = 1;row <= 5; row++){
        for(var split = 1;split <= 5; split++){
            
                drawingFieldsRec(row,split,grid[row-1][split-1]);
           
    }
}
}

// Correct the Canvas
function correctCanvasSize(){

    var mainCanvas = document.getElementById("mainCan");
    var scoreCanvas = document.getElementById("scoreCan");
    var innerScoreCanvas = document.getElementById("innerScoreCan");
    var rankCan = document.getElementById("rankCan");
    var correctMainCanvasWidth;
    var correctMainCanvasHeight;
    var correctScoreCanvasWidth;
    var correctScoreCanvasHeight;
    var correctInnerScoreCanvasWidth;
    var correctInnerScoreCanvasHeight;
    var correctRankCanvasWidth;
    var correctRankCanvasHeight;
    if(innerHeight > innerWidth*(4/3)){
        correctMainCanvasWidth = innerWidth-Const.offWalls;
        correctMainCanvasHeight = innerWidth-Const.offWalls;
        correctScoreCanvasWidth = innerWidth-Const.offWalls;

        

    }else{
        correctMainCanvasWidth = innerHeight / (4/3)-Const.offWalls;
        correctMainCanvasHeight = innerHeight / (4/3)-Const.offWalls;
        correctScoreCanvasWidth = innerHeight / (4/3)-Const.offWalls;
        
       

        
    }
    correctScoreCanvasHeight = correctScoreCanvasWidth/4
    
    correctInnerScoreCanvasWidth = correctScoreCanvasWidth*(62/64);
    correctInnerScoreCanvasHeight = correctScoreCanvasHeight-(correctScoreCanvasWidth*(2/64));
    correctRankCanvasWidth = correctInnerScoreCanvasWidth/(12/7);
    correctRankCanvasHeight = correctInnerScoreCanvasHeight;


    rankCan.width = correctRankCanvasWidth;
    rankCan.height = correctRankCanvasHeight;
    innerScoreCanvas.width = correctInnerScoreCanvasWidth;
    innerScoreCanvas.height = correctInnerScoreCanvasHeight;
    scoreCanvas.height = correctScoreCanvasHeight;
    scoreCanvas.width = correctScoreCanvasWidth;
    mainCanvas.height = correctMainCanvasHeight;
    mainCanvas.width = correctMainCanvasWidth;
}
// Correct the Position of the Canvases
function correctCanvasPosition(){
    var mainCanvas = document.getElementById("mainCan");
    var scoreCanvas = document.getElementById("scoreCan");
    var innerScoreCanvas = document.getElementById("innerScoreCan");
    var rankCan = document.getElementById("rankCan");

    var correctMainCanvasPosX = innerWidth/2-mainCanvas.width/2;
    var correctScoreCanvasPosX = innerWidth/2-scoreCanvas.width/2;
    var correctScoreCanvasPosY = mainCanvas.style.top + mainCanvas.height;
    mainCanvas.style.left = correctMainCanvasPosX+"px";
    scoreCanvas.style.left = correctScoreCanvasPosX+"px";
    // -(-8) because of offset
    scoreCanvas.style.top = correctScoreCanvasPosY-(-8)+"px";


    innerScoreCanvas.style.top = (correctScoreCanvasPosY-(-7)+scoreCanvas.width*(1/64))+"px";
    innerScoreCanvas.style.left = (correctMainCanvasPosX+scoreCanvas.width*(1/64))+"px";

    rankCan.style.top = innerScoreCanvas.style.top;
    rankCan.style.left = parseInt(innerScoreCanvas.style.left)+(innerScoreCanvas.width/(12/5))+"px";
    
}
// draw the rectangles 
function drawingFieldsRec(row , split , state){
    var canvas = document.getElementById("mainCan");
    var ctx = canvas.getContext('2d');
    // Calculate the Size and Position of the Rectangle
    var width = canvas.width / 5 - ((canvas.width / 5 ) / 20)-(canvas.width/500);
    var height = canvas.height / 5 - ((canvas.height / 5 ) / 20)-(canvas.height/500);
    var leftX = canvas.width / 100 + (width+canvas.width / 100)*(split-1);
    var topY = canvas.height / 100 + (height+canvas.height / 100)*(row-1);
    
        
    
   
     // check the state of the Rectangle and give the Correct Color 
    switch(state){
        case 0:{
            ctx.fillStyle = 'black';    
            break;
    }
        case 1:{
            ctx.fillStyle = 'green';    
            break;
        }
        case 2:{
            ctx.fillStyle = 'blue';    
            break;
        }
        case 3:{
            ctx.fillStyle = 'purple';    
            break;
        }
        
       
        
    }
        
    
    
    ctx.fillRect(leftX,topY,width,height);
}
// check if the Cursor is on a Tile
function isOnTile(x,y){
    var canvas = document.getElementById("mainCan");
    
    var row = y /(canvas.height /5)  -( y /(canvas.height /5) % 1);
    var split = x /(canvas.width /5)  -( x /(canvas.width /5) % 1);
    var width = canvas.width / 5 - ((canvas.width / 5 ) / 20)-(canvas.width/500);
    var height = canvas.height / 5 - ((canvas.height / 5 ) / 20)-(canvas.height/500);
    var leftX = canvas.width / 100 + (width+canvas.width / 100)*(split);
    var topY = canvas.height / 100 + (height+canvas.height / 100)*(row);
    if((x > leftX && x < leftX + width) && (y > topY && y < topY + height)){
    return true;
    }else{
      
        return false;
    }
    
}
// get the State of the Clicked Tile/Rectangle
function getTileState(x,y){
    
    if(isOnTile(x,y)){
    var row = getRow(y);
    var split = getSplit(x);
   
    return grid[row][split];
}
}
// check
function changeFieldsRecState(x,y){
    var row = getRow(y);
    var split = getSplit(x);
   
     if(isOnTile(x,y)){
        switch(grid[row][split]){
            case 0: {
                
                break;
            }
            case 1 : {
                grid[row][split] = 2;
                break;
            }
            case 2 : {
                grid[row][split] =  3;
                break;
            }
            case 3 : {
                grid[row][split] = 1;
                break;
            }
            
            
        }
    }

}
function getRow(y){
    var mainCanvas = document.getElementById("mainCan");
    return y /(mainCanvas.height /5)  -( y /(mainCanvas.height /5) % 1)
}
function getSplit(x){
    var mainCanvas = document.getElementById("mainCan");
    return x /(mainCanvas.height /5)  -( x /(mainCanvas.height /5) % 1);
    
}