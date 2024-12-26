function getLocalStorage(){
    if(isNaN(parseFloat(localStorage.getItem('score')))){
        localStorage.setItem('score',0);
    }
    if(isNaN(parseFloat(localStorage.getItem('highScore')))){
        localStorage.setItem('highScore',0);
    }

    Score.score = parseInt(localStorage.getItem('score'));
    Score.highScore = parseInt(localStorage.getItem('highScore'));


    if(!(isNaN(parseFloat(JSON.parse(localStorage.getItem('fieldArray')))))){

        var fieldArray = JSON.parse(localStorage.getItem('fieldArray'));
        for (row = 0; row < 5; row++){
        for (split = 0; split < 5; split++){
            grid[row][split] = fieldArray[row][split]
            }}
        
    }

}
function setLocalStorage(){
    localStorage.setItem('score', Score.score);
    localStorage.setItem('highScore', Score.highScore);
    localStorage.setItem('fieldArray', JSON.stringify(grid));
}
function reloadRanking(){
    const db = firebase.firestore();
    db.collection('scores').get().then(querySnapshot =>{
    
    querySnapshot.forEach(doc =>{
     
        rankStrings[doc.data().Rank-1][0] = doc.data().Rank; 
        rankStrings[doc.data().Rank-1][1] = doc.data().Username;
        rankStrings[doc.data().Rank-1][2] = doc.data().score;
        
    })
    drawRanking()
        redrawScore();
    })
    
    }
    function sortRankStrings(){
        for(x= 1;x < 11;x++){
            if(x != 10){
            if((rankStrings[10-x][2])>(rankStrings[10-x-1][2])){
                var a = rankStrings[10-x][2];
                var b = rankStrings[10-x-1][2];
                var c = rankStrings[10-x][1];
                var d = rankStrings[10-x-1][1];
                rankStrings[10-x][2] = b;
                rankStrings[10-x-1][2] = a;
                rankStrings[10-x][1] = d;
                rankStrings[10-x-1][1] = c;
            }
            }
        }
    }
    function updateHighScore(){
        if(Score.score> Score.highScore){
            Score.highScore = Score.score;
        }
    }    