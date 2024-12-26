window.onload = function(){
    resizeAll();
    drawRanking()
    reloadRanking()
    getLocalStorage();
    redrawScore();
    if((isNaN(parseFloat(JSON.parse(localStorage.getItem('fieldArray')))))){
    moveTilesDown();
    }
    drawCompleteGrid();
    
    
    

}
window.addEventListener('resize', function(){
    resizeAll();
},true);
function clickReceived(row,split){
    if(isGridCellActive(row,split)  && allowed.clickAllowed && document.getElementById("you-lost-box").style.visibility == "hidden"){
        
        allowed.clickAllowed = false;
        changeGridCellsState(row,split);
        drawCompleteGrid();
        setTimeout(function() {
            deleteFinishedLines();
            
            updateHighScore();
            drawCompleteGrid();
            redrawScore();
            
        }, 500);
       
        setTimeout(function() {
            if(checkIfLost()){
                reloadRanking();
                restartGame();
                moveTilesDown();  
                setLocalStorage();
                if(Score.savedScore > rankStrings[9][2]){
                
                    const div = document.getElementById("scoreNameInputBox")
                    div.style.visibility="visible"
                    }else{
                document.getElementById("you-lost-box").style.visibility = "visible"
                    }
            }else{
                moveTilesDown();  
                setLocalStorage();
                drawCompleteGrid();
            }
            allowed.clickAllowed = true;

        }, 1000);
        
        
        
    }
}

