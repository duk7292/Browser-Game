function isGridCellActive(row,split){
    if (grid[row][split] != 0){
        return true;
    }
    else return false;

}
function changeGridCellsState(row,split){
    switch(grid[row][split]){
        case 1:{
            grid[row][split] = 2;
            break;
        }
        case 2:{
            grid[row][split] = 3;
            break;
        }
        case 3:{
            grid[row][split] = 1;
            break;
        }
    }
}
// Random Int Generator
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

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
// check if you lost the game
function checkIfLost(){
    if(grid[4][0]  != 0){
	return true;
     }else{
    return false;
    }
}
function restartGame(){
    
    Score.savedScore = Score.score;
    Score.score = 0;
    redrawScore();
    restoreField();
    setLocalStorage()
    drawCompleteGrid();
}
// restore the field and delete everything after one lose
function restoreField(){
    for (row = 0; row < 5; row++){
        for (split = 0; split < 5; split++){
            
            grid[row][split] = 0;
            
        }
    }
    
}

