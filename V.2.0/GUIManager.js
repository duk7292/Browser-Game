function drawCompleteGrid(){
    for(row = 0;row <5 ;row++){
        for(split = 0; split<5;split++){
            cell = document.getElementById("grid-row-"+row).querySelector("#grid-cell-"+split);
            switch(grid[row][split]){
                case 0:{
                    cell.style.background = "black";
                    break;
                }
                case 1:{
                    cell.style.background = "green";
                    break;
                }
                case 2:{
                    cell.style.background = "blue";
                    break;
                }
                case 3:{
                    cell.style.background = "purple";
                    break;
                }
            }
        }
    }
}
function redrawScore(){
    document.getElementById("score-after-loss").innerHTML = Score.savedScore;
    document.getElementById("scoreCount").innerHTML = Score.score;
    document.getElementById("highscoreCount").innerHTML = Score.highScore;
}
function drawRanking(){
    for(rank = 1; rank <= 10; rank++){
        document.getElementById("rankingTable").querySelector("#rank-"+rank).querySelector("#rank").innerHTML = rankStrings[rank-1][0]
        document.getElementById("rankingTable").querySelector("#rank-"+rank).querySelector("#name").innerHTML = rankStrings[rank-1][1]
        document.getElementById("rankingTable").querySelector("#rank-"+rank).querySelector("#score").innerHTML = rankStrings[rank-1][2]
        
    }
}
function resizeAll(){
    resizeMainBox();
    reizeText();
    
}

function resizeMainBox(){
    var mainBox =  document.getElementById("mainBox");
    

    if(innerHeight> innerWidth){
        
        mainBox.style.left = (Const.offWalls)+"px"
        mainBox.style.width = (innerWidth - Const.offWalls*2)+"px";
        mainBox.style.height = (innerWidth - Const.offWalls*2)/9*16+"px";
        console.log(Const.offWalls)
    }else{
        mainBox.style.left = (innerWidth-((innerHeight*(32/(32-13)))/16*9))/2+"px";
        mainBox.style.height = innerHeight*(32/(32-13))+"px";
        mainBox.style.width = (innerHeight*(32/(32-13)))/16*9+"px";
        
    }

}
function reizeText(){
 resizeTextFontSize();
 resizeTextPosition();
}
function resizeTextFontSize(){
    //Score Board
   var  p = document.getElementsByClassName("p-score-element");
   for(i = 0; i < p.length; i++) {     
     p[i].style.fontSize = ''+(p[i].parentElement.clientHeight)/1.5+'px';
     p[i].style.height = ''+(p[i].parentElement.clientHeight)/1.5+'px';
  }
  //Score Board
}
function resizeTextPosition(){
    //Score Board
    var  p = document.getElementsByClassName("p-score-element");
    for(i = 0; i < p.length; i++) {
       p[i].style.margin= ''+((p[i].parentElement.clientHeight)-(p[i].parentElement.clientHeight)/1.5)/2+'px'
     
   }
   //Score Board
}