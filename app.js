'use strict';



// getting elements Globally
let leftImageElement = document.getElementById('left-image');
let rightImageElement = document.getElementById('right-image');
let centerImageElement=document.getElementById('center-image');


// global variables
let leftImageIndex;
let rightImageIndex;
let centerImageIndex;

// global counters
let maxAttempts = 25;
let userAttemptsCounter = 0;


// global array for  all the objects
let allGoats = [];//

let ShownImgs=[];
let clickedImgs=[];

// constructor function
function GoatImage(name, source) {
    this.name = name;
    this.source = source;
    // votes
    this.votes = 0;
    this.shown=0;
    allGoats.push(this);
}
new GoatImage('bag','images/bag.jpg'); //0
new GoatImage('banana', 'images/banana.jpg'); //1
new GoatImage('bathroom', 'images/bathroom.jpg'); //2
new GoatImage('boots', 'images/boots.jpg'); //3
new GoatImage('breakfast', 'images/breakfast.jpg'); //4
new GoatImage('bubblegum', 'images/bubblegum.jpg'); //5
new GoatImage('chair', 'images/chair.jpg'); //6
new GoatImage('cthulhu', 'images/cthulhu.jpg');
new GoatImage('dog-duck', 'images/dog-duck.jpg');
new GoatImage('dragon', 'images/dragon.jpg');
new GoatImage('pen', 'images/pen.jpg');
new GoatImage('pet-sweep', 'images/pet-sweep.jpg');
new GoatImage('scissors', 'images/scissors.jpg');
new GoatImage('shark', 'images/shark.jpg');
new GoatImage('sweep', 'images/sweep.jpg');
new GoatImage('tauntaun', 'images/tauntaun.jpg');
new GoatImage('unicorn', 'images/unicorn.jpg');
new GoatImage('water-can', 'images/water-can.jpg');
new GoatImage('wine-glass', 'images/wine-glass.jpg');


// random function to generate index
function generateRandomIndex() {
    return Math.floor(Math.random() * allGoats.length);
}

// console.log(Math.floor(Math.random() * allGoats.length)); //0-4

// show goat images
function renderThreeImages() {
    leftImageIndex = generateRandomIndex();
    rightImageIndex = generateRandomIndex();
    centerImageIndex =generateRandomIndex();

    // while
    // while (leftImageIndex === rightImageIndex) {
    //     rightImageIndex = generateRandomIndex();
    // }

    // do-while
    do {
        leftImageIndex = generateRandomIndex();
        rightImageIndex = generateRandomIndex();
        centerImageIndex = generateRandomIndex();

    } while (leftImageIndex === rightImageIndex === centerImageIndex);

    // console.log(leftImageIndex);
    // console.log(rightImageIndex);

    // console.log(allGoats[leftImageIndex]);
    // console.log(allGoats[rightImageIndex]);


    // give it src attribute
    leftImageElement.src = allGoats[leftImageIndex].source;
    rightImageElement.src = allGoats[rightImageIndex].source;
    centerImageElement.src=allGoats[centerImageIndex].source;
    
    allGoats[leftImageIndex].shown++;
allGoats[centerImageIndex].shown++;
allGoats[rightImageIndex].shown++;
}

renderThreeImages();

// event listener

leftImageElement.addEventListener('click', handleUserClick);
rightImageElement.addEventListener('click', handleUserClick);
centerImageElement.addEventListener('click',handleUserClick);

function handleUserClick(event) {
    // console.log(event.target.id);
    // userAttemptsCounter=userAttemptsCounter+1;
    userAttemptsCounter++;
    console.log(userAttemptsCounter);
    if (userAttemptsCounter <= maxAttempts) {
        console.log(userAttemptsCounter);

        if (event.target.id === 'left-image') {
            allGoats[leftImageIndex].votes = allGoats[leftImageIndex].votes + 1;
        }
        else if( event.target.id ==='center-image')
        {
            allGoats[centerImageIndex].votes=allGoats[centerImageIndex].votes +1;
        }

         else  {
            allGoats[rightImageIndex].votes = allGoats[rightImageIndex].votes + 1;

        }
        // the used ones
        // console.log(allGoats);

        renderThreeImages();
    } else {
        leftImageElement.removeEventListener('click', handleUserClick);
        rightImageElement.removeEventListener('click', handleUserClick);
        centerImageElement.removeEventListener('click',handleUserClick);
        
    }
}
        console.log(allGoats);

        // getting the element
        let list = document.getElementById('result');
        let button = document.getElementById('res');
        button.addEventListener('click',showResult);
        
        function showResult(){
            for (let i = 0; i < allGoats.length; i++) {
                ShownImgs.push(allGoats[i].shown);
                clickedImgs.push(allGoats[i].votes);
        
        
                let liElement = document.createElement('li');
                list.appendChild(liElement);
                liElement.textContent = `${allGoats[i].name} has ${allGoats[i].votes}  votes and was seen ${allGoats[i].shown} times. `;
            }
        }