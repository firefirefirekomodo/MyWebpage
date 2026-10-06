
function entered(){
   const n = document.getElementById("n");
   const m = document.getElementById("m");
   const output = document.getElementById("matrixOutput");
   const calculationButtons = document.getElementById("calculationButtons");
   let x = n.value;
   let y = m.value;
   if(x > 10 || x < 0 || y > 10 || x < 0){
      return;
   }
   output.innerHTML = "";
   calculationButtons.innerHTML = "";
   output.style.gridTemplateColumns = `repeat(${y},1fr)`;
   for(j=0;j<x;j++){
         for(i=0;i<y;i++){
            let a = document.createElement("input");
            a.type = "text";
            a.id = `${j} ${i}`;
            a.defaultValue = 0;
            output.appendChild(a);
      }
   }
   let rrefButton = document.createElement('button');
   let detButton = document.createElement('button');
   rrefButton.setAttribute('onClick',`calculateRREF(${x},${y})`);
   rrefButton.textContent = "Calculate the RREF (Reduced Row Echelon Form)";
   detButton.setAttribute('onClick',`calculateDet(${x})`);
   detButton.textContent = "Calculate the determinant";
   calculationButtons.appendChild(rrefButton);
   if(x == y){
      calculationButtons.appendChild(detButton);
   }
}


