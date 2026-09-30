
function calculateRREF(x,y){
   let output = document.getElementById('matrixOutput');
   let matrix = [];
   let innerMatrix = [];
   for(i=0;i<output.children.length;i++){
      if (((i % y) == 0) && (i != 0)){
         matrix.push(innerMatrix);
         innerMatrix = [];
      }
      innerMatrix.push(output.children[i].value);
   }
   matrix.push(innerMatrix);
   let colCounter = 0;
   let divisor = 1;
   let subMatrix = [];
   let temp = [];
   let pass = false;
   // iterate through each row at a time.
   for(i=0;i<x;i++){
      while(matrix[i][colCounter] == 0 && colCounter < y){
         for(k=colCounter;k<x;k++){
            if (matrix[k][colCounter] != 0){
               temp = matrix[k];
               matrix[k] = matrix[i];
               matrix[i] = temp;
               pass = true;
               break;
            }
         }
         if(pass != true){
            colCounter += 1;
         }
         pass = false;
      }
      if(colCounter >= y){
         break;
      }
      else
      {
         divisor = matrix[i][colCounter];
         for(j=colCounter;j<y;j++){
            matrix[i][j] = matrix[i][j] / divisor;
            subMatrix = matrix[i];
         }
         for(u=0;u<x;u++){
            divisor = matrix[u][colCounter];
            if(u != i){
               for(r=0;r<y;r++){
                  matrix[u][r] = matrix[u][r] - divisor*matrix[i][r];
               }
            }
         }
         colCounter += 1;
      }
   }
   let results = document.getElementById('result');
   results.innerHTML = '';
   for(i=0;i<x;i++){
      results.innerHTML = results.innerHTML+JSON.stringify(matrix[i])+'<br>';
   }
}

function calculateDet(n){
   // will alter this to spawn when only square.
   let output = document.getElementById('matrixOutput');
   let matrix = [];
   let innerMatrix = [];
   for(i=0;i<output.children.length;i++){
      if (((i % n) == 0) && (i != 0)){
         matrix.push(innerMatrix);
         innerMatrix = [];
      }
      innerMatrix.push(output.children[i].value);
   }
   matrix.push(innerMatrix);
   console.log(JSON.stringify(matrix));
   let results = document.getElementById('result');
   results.innerHTML = '';
   switch(n){
      case 1:
         results.innerHTML = matrix[0];
         break;
      case 2:
         results.innerHTML = ((matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]))
         break;
      default:
         //put extra columns to sides of matrix.
         for(i=0;i<2;i++){
            for(j=0;j<n;j++){
               for(x=0;x<n;x++){
                  matrix[j].push(matrix[j][x]);
               }
            }
         }
         console.log(JSON.stringify(matrix));
         //starting at n, since this is the middle, and knowing that the number of elements there are is now n * 3.
         let sum1 = 1;
         let sum2 = 0;
         let sum3 = 0;
         let counter = 0;
         for(j=0;j<n;j++){
            counter = 0;
            for(i=n+j;i<2*n+j;i++){
               sum1 = sum1 * (Number.parseInt(matrix[counter][i]));
               counter++;
            }
            sum2 += sum1;
            sum1 = 1;
         }
         sum1 = 1;
         for(j=0;j<n;j++){
            counter = 0;
            for(i=2*n-j;i>n-j;i--){
               sum1 = sum1 * Number.parseInt(matrix[counter][i]);
               counter++;
            }
            sum3 += sum1;
            sum1 = 1;
         }
         console.log(sum2);
         console.log(sum3);
         results.innerHTML = sum2-sum3;
   }     
}