// iconTag = <i class='fas fa-cat'></i>
let listOfIcons =
    [
        "ðĶī", "ð", " ð ",
        "âïļ", "ðž", "ð·",
        "ðŠ", "ðŽ", "âðŋ",
        "ð§ļ", "âïļ", "âĪïļ", "ð", "ð",
        "âïļ ", "ð", "ð", "ð",
        "ð", "ð",
        "ð", "ðģ", "âïļ", "ð"
    ]

let photosId = [];
// Fill list with images ids
for (let index = 0; index < document.getElementsByClassName("tg-0pky").length; index++) {
    photosId[index] = index;
}
// Choose random team to start the game
let teamTurn = Math.floor(Math.random() * (2 - 1 + 1) + 1);
if (teamTurn == 1) {
    document.getElementById("1").getElementsByTagName("i")[0].style.display = "inline";
    document.getElementById("2").getElementsByTagName("i")[0].style.display = "none";
} else {
    document.getElementById("1").getElementsByTagName("i")[0].style.display = "none";
    document.getElementById("2").getElementsByTagName("i")[0].style.display = "inline";
}


function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function getDarkColor() {
    var color = '#ffffff';
    // for (var i = 0; i < 6; i++) {
    //     color += Math.floor(Math.random() * 10);
    // }
    return color;
}

function updatePhoto(photoIndex) {
    let image = document.getElementById("image");
    image.setAttribute("src", (`./images/${photoIndex}.jpg`));
    // console.log(photoIndex);
}
function CalculateTeamPoints(points, teamTurn) {
    // console.log(`Picture value: ${points}`);
    if (teamTurn == 1) {
        document.getElementById("1").getElementsByClassName("score")[0].textContent =
            parseInt(document.getElementById("1").getElementsByClassName("score")[0].textContent) + points;
    }
    if (teamTurn == 2) {
        document.getElementById("2").getElementsByClassName("score")[0].textContent =
            parseInt(document.getElementById("2").getElementsByClassName("score")[0].textContent) + points;
    }
}


function ChangeTeamIndicator(teamTurn) {
    // console.log(`team: ${teamTurn}`);
    if (teamTurn == 1) {
        document.getElementById("1").getElementsByTagName("i")[0].style.display = "none";
        document.getElementById("2").getElementsByTagName("i")[0].style.display = "inline";
    }
    if (teamTurn == 2) {
        document.getElementById("1").getElementsByTagName("i")[0].style.display = "inline";
        document.getElementById("2").getElementsByTagName("i")[0].style.display = "none";
    }
    teamTurn = teamTurn == 1 ? 2 : 1;
    // console.log(`team: ${teamTurn}`);
}
function SwapScores() {
    var holder = document.getElementById("1").getElementsByClassName("score")[0].textContent;
    document.getElementById("1").getElementsByClassName("score")[0].textContent = document.getElementById("2").getElementsByClassName("score")[0].textContent;
    document.getElementById("2").getElementsByClassName("score")[0].textContent = holder;
}

var lastCardIndex;
function handleEntry(photoIndex, teamTurn) {
    var points = photos[photoIndex];
    if (photoIndex == 33) {
        points = Math.floor(Math.random() * (10 - -10 + 1) + -10);
        // alert(`ŲØŠŲØŽØĐ Ø§ŲØąŲŲŲØŠ ${points}`);
    };
    if (points == "GAMEOVER") {
        document.getElementById("GameOverModal").style.display = "block";
        document.getElementById("GameOverWinner").textContent = `ØĢŲØŠŲØŠ Ø§ŲŲØđØĻØĐ! ŲŲØŊ ŲØ§Øē ${document.getElementById(teamTurn).getElementsByClassName("name")[0].textContent}`;
        document.getElementById(teamTurn == 1 ? 2 : 1).getElementsByClassName("score")[0].textContent == 0;
        return;
    }
    else if (points == "SWAPSCORES") {
        // alert("ØŠŲ ØŠØĻØŊŲŲ ŲØŠŲØŽØĐ Ø§ŲŲØąŲŲŲŲ!");
        SwapScores();
    }
    else if (points == "PRISON") {
        // alert("Ø§ŲŲØąŲŲ Ø§ŲØŦØ§ŲŲ Ø­ŲØŪØŠØ§Øą ŲØąØŠŲŲ!");
        ChangeTeamIndicator(teamTurn);
        return;
    } else {
        CalculateTeamPoints(points, teamTurn);
    }
    if (lastCardIndex == 40) return;
    ChangeTeamIndicator(teamTurn);
}

function buttonClicked(photoIndex) {
    var teamTurn = document.getElementById("1").getElementsByTagName("i")[0].style.display == "inline" ? 1 : 2;
    updatePhoto(photoIndex);
    handleEntry(photoIndex, teamTurn);
    lastCardIndex = photoIndex;
}

function FillTextButtons() {
    var buttons = document.getElementsByClassName("tg-0pky");

    var index = 0;
    var icondIndex = 0;
    var numbers = 1;
    photosId = shuffle(photosId);
    while (index < buttons.length) {
        const icon = document.createElement("h3");

        buttons[index].setAttribute("onClick", `buttonClicked(${photosId[index]}); this.removeAttribute("onClick");disableButton(this);`);

        if (index < 13 || (index > 36 && index < buttons.length)) {
            icon.textContent = numbers;
            numbers++;
        } else {
            icon.textContent = `${listOfIcons[icondIndex]}`;
            icondIndex++;
        }

        buttons[index].appendChild(icon);
        buttons[index].style.backgroundColor = getDarkColor();
        index++;
    }
}
FillTextButtons();

function disableButton(button) {
    button.getElementsByTagName("h3")[0].textContent = "X";
    button.style.backgroundColor = "#000000";
}
// Add field on click
function addField(teamId) {
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    document.getElementById(teamId)
        .appendChild(input);
    // console.log(teamId);
}