const canvas = document.getElementById("canvas");
// ctx = context, getContext = retourne un contexte de dessin sur le canevas
const ctx = canvas.getContext("2d");
// Set d'image
const img = new Image();
// Source de cette image
img.src = "./media/flappy-bird-set.png";


// Reglages generaux

let gamePlaying = false;
const gravity = .5;
// Vitesse des poteaux lorsqu'ils arrivent
const speed = 6.2;
//  taille de l'oiseau
const size = [51,36]
// Jumpe de l'oiseau
const jump = -11.5;
const cTenth = (canvas.width / 10);

// Création de l'effet paralax
let index = 0,
bestScore = 0,
currentScore = 0,
pipes = [],
flight,
flightHeight;




