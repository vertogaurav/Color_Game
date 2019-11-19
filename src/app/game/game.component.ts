import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  colorpicker = [
    { id: 1, color: "red" },
    { id: 2, color: "blue" },
    { id: 3, color: "green" },
    { id: 4, color: "yellow" }
  ];

  waitforinput = false;
  arr = [];
  userArr = [];
  userInputsize = 0;
  max = 4;
  min = 1;
  generatedRandomColor = "#ffffff00";
  Difficulty = 4;
  level ;
  lost = false;
  nextLevel=false;
  levelComplete = false;
  gameWon = false;

  constructor() {}

  ngOnInit() {
    this.level =1;
  }

  randomGenerateColorsNext(){
    this.levelComplete= false;
    this.randomGenerateColors();
  }

  randomGenerateColors() {
    this.arr = [];
    this.waitforinput = false;

    for (let i = 0; i < this.Difficulty; i++) {
      this.arr.push(
        Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
      );
    }
    console.log(this.arr);
    this.displayColors(this.arr);
  }

  displayColors(arr) {
    // tslint:disable-next-line: prefer-const
    let that = this;
    (function() {
      let i = 0;
      (function k() {
        that.generatedRandomColor = "#ffffff00";
        setTimeout(() => {
          that.colorpicker.map(j => {
            if (j.id === arr[i]) {
              that.generatedRandomColor = j.color;
            }
          });
          if (i < that.Difficulty) {
            i++;
            setTimeout(k, 800);
          } else {
            that.generatedRandomColor = "#ffffff00";
            that.waitforinput = true;
            // that.Difficulty += 2 ;
          }
        }, 300);
      })();
    })();
  }

  constructUserInput(id){
    if(this.waitforinput && this.lost === false){
      this.userInputsize++;
      this.userArr.push(id);
      if(JSON.stringify(this.userArr) !== JSON.stringify(this.arr.slice(0,this.userInputsize))){
        // this.waitforinput = false;
        this.userInputsize = 0;
        this.userArr=[];
        this.arr=[];
        this.Difficulty = 4;
        this.level = "lose";
        this.lost = true;
        console.log("you lost");
        
      }
      else{
        if(this.userInputsize === this.arr.length){
          this.level ++;
          this.Difficulty += 2;
          this.userArr=[];
          this.arr=[];
          this.userInputsize = 0;
          if(this.userInputsize === this.userArr.length){
            this.nextLevel = true;
            this.levelComplete = true;
            if(this.level === 11){
              this.gameWon = true;
            }
          }
        }
      }
    }
  }

  restart(){
    this.lost = false;
    this.waitforinput = false;
    this.level = 1;
    this.nextLevel = false;
    this.levelComplete = false;
    this.gameWon = false;
  }
  
}
