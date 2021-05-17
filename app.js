'use strict';



let leftImageElement = document.getElementById('left-image');
let rightImageElement = document.getElementById('right-image');
let centerImageElement=document.getElementById('center-image');


let leftImageIndex;
let rightImageIndex;
let centerImageIndex;

let maxAttempts = 25;
let userAttemptsCounter = 0;

let goatsNames = [];

let goatVotes = [];

let goatShown = [];

let allGoats = [];//

let ShownImgs=[];
let clickedImgs=[];

function GoatImage(name, source) {
    this.name = name;
    this.source = source;
        this.votes = 0;
    this.shown=0;
    allGoats.push(this);
    goatsNames.push(this.name);
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


function generateRandomIndex() {
    return Math.floor(Math.random() * allGoats.length);
}

function renderThreeImages() {
    leftImageIndex = generateRandomIndex();
    rightImageIndex = generateRandomIndex();
    centerImageIndex =generateRandomIndex();

    do {
        leftImageIndex = generateRandomIndex();
        rightImageIndex = generateRandomIndex();
        centerImageIndex = generateRandomIndex();

    } while (leftImageIndex === rightImageIndex === centerImageIndex);




    leftImageElement.src = allGoats[leftImageIndex].source;
    rightImageElement.src = allGoats[rightImageIndex].source;
    centerImageElement.src=allGoats[centerImageIndex].source;

    centerImageElement.alt = allGoats[centerImageIndex].name;
    leftImageElement.alt = allGoats[leftImageIndex].name;
    rightImageElement.alt = allGoats[rightImageIndex].name;

    allGoats[leftImageIndex].shown++;
allGoats[centerImageIndex].shown++;
allGoats[rightImageIndex].shown++;
}

renderThreeImages();



leftImageElement.addEventListener('click', handleUserClick);
rightImageElement.addEventListener('click', handleUserClick);
centerImageElement.addEventListener('click',handleUserClick);

function handleUserClick(event) {


    userAttemptsCounter++;
        if (userAttemptsCounter <= maxAttempts) {

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


        renderThreeImages();
    } else {
        leftImageElement.removeEventListener('click', handleUserClick);
        rightImageElement.removeEventListener('click', handleUserClick);
        centerImageElement.removeEventListener('click',handleUserClick);
        



        for (let i = 0; i < allGoats.length; i++) {
            goatVotes.push(allGoats[i].votes);
            goatShown.push(allGoats[i].shown);
        }
        viewChart();
    }
}
console.log(allGoats);



function viewChart() {

    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: goatsNames,
            datasets: [{
                    label: '# of goat Votes',
                    data: goatVotes,
                    backgroundColor: 'black',
                    borderColor: 'black',
                    borderWidth: 1
                },
                {
                    label: '# of goat shown',
                    backgroundColor: 'red',
                    borderColor: 'red',
                    data: goatShown
                }
            ]
        },
        options: {

        }
    });

}



