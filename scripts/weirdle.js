var index = 0;
var list = [];
var guesses = 6;
var word_length = 5;
var row_counter = 0;
var words = [];
var word = "";
fetch("../resources/letterwords.json")
   .then(response => response.json()
   )
   .then(data => {
      words = data;
      word = words[Math.floor(Math.random()*(words.length-1))].toUpperCase();
   })
for(i=0;i<26;i++){
   list[i] = String.fromCharCode(65+i);
}

let timeout = setTimeout(createBoard,10);
let timeout2 = setTimeout(createKeyboard,10);

function createKeyboard(){
   let keyboardContainer = document.getElementById("keyboard");
   let text = keyboardContainer.innerText;
   keyboardContainer.innerText = "";
   let length = text.length;
   let currentRow = document.createElement("div");
   for(i=0;i<length;i++){
      if(text[i] == " "){
         keyboardContainer.appendChild(currentRow);
         currentRow = document.createElement("div");
      }
      else{
      let element = document.createElement("div");
      element.innerText = text[i];
      currentRow.appendChild(element);
      }
   }
   keyboardContainer.appendChild(currentRow);
}

function refreshKeyboard(){
   let keyboardContainer = document.getElementById("keyboard");
   let kchildren = keyboardContainer.children;
   for(i=0;i<kchildren.length;i++){
      for(j=0;j<kchildren[i].children.length;j++){
         kchildren[i].children[j].style.backgroundColor = "white";
      }
   }
}

function increment(){
   if(guesses < 10) guesses++;
   refreshBoard();
}
function decrement(){
   if(guesses > 1) guesses--;
   refreshBoard();
}

function refreshBoard(){
   row_counter = 0;
   word = words[Math.floor(Math.random()*words.length-1)].toUpperCase();
   createBoard();
}

function newGame(body,element){
   body.removeChild(element);
   selectMode();
}

function createBoard(){
   let div = document.getElementById("mainDiv");
   mainDiv.textContent = "";
   for(i=0;i<guesses;i++){
      let row = document.createElement('div')
      for(j=0;j<word_length;j++){
         let box = document.createElement('div');
         box.className = "box";
         row.appendChild(box);
      }
      row.id = i;
      div.appendChild(row);

   }
}

function reverseString(string){
   let length = string.length
   let new_string = "";
   for(i=length-1;i>=0;i--){
      new_string = new_string + string[i];
   }
   return new_string;
}

function selectMode(){
   let options = document.getElementById("Options");
   let mode = options.value;
   switch (mode){
      case "normal":
         word = words[Math.floor(Math.random()*words.length-1)].toUpperCase();
         row_counter = 0;
         createBoard();
         break;
      case "backwards":
         word = reverseString(words[Math.floor(Math.random()*words.length-1)].toUpperCase());
         row_counter = 0;
         createBoard();
         break;
   }
}

function checkEmpty(nodeList){
   for(i=0;i<nodeList.length;i++){
      if(nodeList[i].textContent.length == 0){
         return true;
      }
   }
   return false;
}

function allGreen(yellow_list){
   for(i=0;i<yellow_list.length;i++){
      if(yellow_list[i] != "0"){
         return false;
      }
   }
   return true;
}

document.addEventListener("keydown", (event) => {
   let key = event.key.toUpperCase();
   let nodesList = document.getElementById(`${row_counter}`).children;
   let last_element = nodesList[word_length-1];
   let lost_nodes = [];
   let yellow_list = word;
   if((list.includes(key) == false && event.key !== "Backspace" && event.key !== "Enter")){
      return;
   }
   if (event.key === "Backspace"){
      if(index > 0){
         let element = nodesList[--index];
         element.textContent = "";
      }
   }
   else if (event.key === "Enter"){
      let keyboardContainer = document.getElementById("keyboard");
      if(checkEmpty(nodesList) == false){
      for(let i=0;i<word_length;i++){
         let element = nodesList[i];
         let storedText = element.textContent;
         element.id = storedText;
         if(word[i] == element.textContent){
            yellow_list = yellow_list.replace(word[i],"0");
            lost_nodes.push(i);
            element.textContent = "";
            let kchildren = keyboardContainer.children;
            for(j=0;j<kchildren.length;j++){
               for(z=0;z<kchildren[j].children.length;z++){
                     if(kchildren[j].children[z].textContent == word[i]){
                        kchildren[j].children[z].style.backgroundColor = "green";
                     }
                  }
               }
            element.style.animation = "flip 0.6s linear";
            element.style.animationDelay = `${i*0.3}s`;
            element.style.setProperty("--boxColor","green");
            element.addEventListener("animationend", (e) => {
               element.textContent = storedText;
               element.style.backgroundColor = "green";
            })
         }
      }
      for(let i=0;i<word_length;i++){
         let element = nodesList[i];
         let color = "white";
         let storedText = element.textContent;
         if(yellow_list.split('').includes(element.textContent)){
            yellow_list = yellow_list.replace(element.textContent,"0");
            color = "yellow";
            let kchildren = keyboardContainer.children;
            for(j=0;j<kchildren.length;j++){
               for(z=0;z<kchildren[j].children.length;z++){
                     if(kchildren[j].children[z].textContent == element.textContent){
                        kchildren[j].children[z].style.backgroundColor = "yellow";
                     }
                  }
               }
            element.textContent = "";
            element.style.animation = "flip 0.6s linear";
            element.style.animationDelay = `${i*0.3}s`;
            element.style.setProperty("--boxColor",color);
            element.addEventListener("animationend", (e) => {
               element.textContent = storedText;
               element.style.backgroundColor = color;
            })
         }
         else if (word.split('').includes(element.id) === false || element.getAnimations().length === 0){
            let kchildren = keyboardContainer.children;
            color = "grey";
            for(j=0;j<kchildren.length;j++){
               for(z=0;z<kchildren[j].children.length;z++){
                     if(kchildren[j].children[z].textContent == element.textContent){
                        kchildren[j].children[z].style.backgroundColor = "grey";
                     }
                  }
               }
            element.textContent = "";
            element.style.animation = "flip 0.6s linear";
            element.style.animationDelay = `${i*0.3}s`;
            element.style.setProperty("--boxColor",color);
            element.addEventListener("animationend", (e) => {
               element.textContent = storedText;
               element.style.backgroundColor = color;
            })
         }

      }
      if (allGreen(yellow_list) == true){
         let winDiv = document.createElement('div');
         winDiv.textContent = `You won the wordle!\r\nThe answer was ${word}\r\nGenerating a new word now...`;
         winDiv.className = "failElement";
         document.getElementsByTagName('body')[0].appendChild(winDiv);
         let timeout = setTimeout(newGame,2500,document.getElementsByTagName('body')[0],winDiv);
         let timeout2 = setTimeout(refreshKeyboard,2500);
      }
      else if(guesses > row_counter+1){
         row_counter++;
      }
      else{
         let failDiv = document.createElement('div');
         failDiv.textContent = `You failed to finish the wordle!\r\nThe answer was: ${word}\r\nGenerating a new word now...`;
         failDiv.className = "failElement";
         document.getElementsByTagName('body')[0].appendChild(failDiv);
         let timeout = setTimeout(newGame,2500,document.getElementsByTagName('body')[0],failDiv);
         let timeout2 = setTimeout(refreshKeyboard,2500);
      }
      index = 0;
      return;
   }
   }
   else{
      if(index < 5) {
         let element = nodesList[index];
         element.textContent = event.key.toUpperCase();
         index++
      };
   }
})