
    //starting the game, add values to gems (from gem object) and add to html
    var gameState = {

      targetNumber : randomNumberGenerate(19, 120),
      wins : 0,
      losses : 0,
      resultNumber : 0, 

      // update resultNumber with clickValue
      updateResult: function(num){
        this.resultNumber += num;

        $("#result").html("total: " +this.resultNumber);
      
          // this conditional checks if the result number to the target Number 
          if(this.resultNumber > this.targetNumber ){
            this.losses++;
            $("#losses").html("losses: " + this.losses);
           
            this.gameReset();    
          
          } else if(this.resultNumber === this.targetNumber) {
            this.wins++;
            $("#wins").html("wins: " + this.wins);
            
            this.gameReset();
          } else {
            return;
          }

        },

        gameReset: function(){
          // call function again, generate new num display new number
          gameState.targetNumber = randomNumberGenerate(19, 120);
          $("#number-to-guess").text(gameState.targetNumber);
          
          // set resultnum to 0, display reset value
          this.resultNumber = 0;
          $("#result").html("total: " + gameState.resultNumber);

          // give buttons new values
          gemsValue.resetRandomValue();
          // gemsValue.assignNumber();
          // gemsValue.assignValueToHtml();

        }
    };

    // create a random number - tested.
    function randomNumberGenerate(min, max){
       return Math.floor(Math.random()*(max-min+1)+ min);
      
    }

    // create gems and assign random value 
    var gemsValue = {

      gems: [],

      //until array equal 4, generate numbers and add to array, if not already in array, push to array. create seperate function for randomizing the array order.... call r

      // replace a random index in gems with a 1. max is gem length (3)
      replaceOne : function(max) {
          //takes the gems array and selects a random index
          var gemNumIndex = Math.floor(Math.random()*(max));
          
          // I have used splice before, but never used it with the var, index and what your repalceing it with. 
          this.gems.splice(gemNumIndex, 1, 1);
      },

      // run randomnumbgenerate function 4 times using a while loop. adds those values to array while being able to skip duplicates. This is an amazing way to use while loops.
      assignNumber : function(){
        // run until gems is length of 4
        while(this.gems.length < 4){
          var num = randomNumberGenerate(2,12)
          
          if(!this.gems.includes(num)){
            gemsValue.gems.push(num);
          } 
        }
        // I didnt know i could call a function like this. would not write this on my own 
        this.replaceOne(this.gems.length);
      },
      // assign each button a value from gems array
      assignValueToHtml : function(){
         //all this jquery makes sense.  
          $('.btn1').val(this.gems[0]);
          $('.btn2').val(this.gems[1]);
          $('.btn3').val(this.gems[2]);
          $('.btn4').val(this.gems[3]);
      },

      // still not comfortable on writing this function
      resetRandomValue : function() {
        this.gems = [];
        
        this.assignNumber();
     
        this.assignValueToHtml();
      },
    };

    // this starts the game. Im still having troubles writing this on my own though 
    $(document).ready(function(){
      randomNumberGenerate(19, 120);
      
      // this jquery is linking and writing on the html 
      $("#number-to-guess").text(gameState.targetNumber);
      $("#wins").html("wins: " + gameState.wins);
      $("#losses").html("losses: " + gameState.losses);
      $("#result").html("total: " + gameState.resultNumber);
      gemsValue.assignNumber(); //on ready assign gem value
      gemsValue.assignValueToHtml(); // give buttons value

     // I didnt write this, and still am struggling on understanding it. 
      $(".btn").on("click", function(){ 
        var clickValue = parseInt($(this).val());
        gameState.updateResult(clickValue);
      });

      console.log("button value: " + gemsValue.gems);
    });

