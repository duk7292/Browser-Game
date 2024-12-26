function gridCellClick(row,split){
    clickReceived(row,split )
}
function newGameButtonPressed(restartNeeded){
    Score.savedScore = 0;
    if(restartNeeded){
    restartGame();
    moveTilesDown();  
    }
    drawCompleteGrid();
    setLocalStorage();
    document.getElementById("you-lost-box").style.visibility = "hidden";
    
} 
function submitButtonPressed(){
    reloadRanking();

    const db = firebase.firestore();

    rankStrings[9][1] =(document.getElementById("textInput").value) ;
   
    rankStrings[9][2] = Score.savedScore;

    sortRankStrings();
    
    
    for(i = 1; i <11; i++){
    db.collection('scores').doc(i.toString(10)).update({
        
         score : rankStrings[i-1][2],
         Username :rankStrings[i-1][1] 
        
        });

    }
        reloadRanking();
    
    document.getElementById("textInput").value ="";
    const div = document.getElementById("scoreNameInputBox")
    div.style.visibility="hidden"
    drawCompleteGrid();
}