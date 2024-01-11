const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "./media/flappy-bird-set.png";

// General settings
let gamePlaying = false;
const gravity = .5;
const speed = 6.2;
const size = [51, 36];
const jump = -11.5;
const cTenth = (canvas.width / 10);

let index = 0,
    bestScore = 0, 
    flight, 
    flyHeight, 
    currentScore, 
    pipe;


// Reglage des poteaux
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) - pipeWidth)) + pipeWidth;


const setup = () => {
    currentScore = 0;
    flight = jump;
      // set initial flyHeight (middle of screen - size of the bird)
  flyHeight = (canvas.height / 2) - (size[1] / 2);

  pipes = Array(3).fill().map((a, i) => [canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()]);
  console.log(pipes);
  }

// Fonction qui va nous rendre l'animation
const render = () => {
  index++;
  // CanvasRenderingContext2D.drawImage() https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/drawImage

  // Background
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -(index * (speed / 2)) % canvas.width, 0, canvas.width, canvas.height);
  // Le modulo va tourner en rond et va faire battre els ailes de l'oiseau.  Pcq le modulo va faire tourner les 3 oiseaux
  if (gamePlaying) {
    ctx.drawImage(img,432,Math.floor((index % 9) / 3) * size[1], ...size, cTenth,  flyHeight, ...size);
    flight += gravity;
    flyHeight = Math.min(flyHeight + flight, canvas.height -size[1]);

  } else {
  ctx.drawImage(img,432,Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width / 2) - size[0] / 2),flyHeight, ...size);
  flyHeight = (canvas.height / 2) - (size[1] / 2);

  // Ecrire dans le canvas
  ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245);
  ctx.fillText('Cliquez pour jouer', 48, 535)
  // Reglage css
  ctx.font = "bold 30px courrier";
  }

  // Pipe Display

  if (gamePlaying) {
    pipes.map(pipe => {
        pipe[0] -= speed;
// on va chercher les poteaux dans le set image
        ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe [0], 0, pipeWidth, pipe[1]);

        // Bottom pipe
        ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap, pipe[0], pipe[1] + pipeGap, pipeWidth, canvas.height -pipe[1] + pipeGap);

        if (pipe[0] <= -pipeWidth) {
            currentScore++;
            bestScore = Math.max(bestScore, currentScore);

            // remove pipe + create new one
            pipes = [...pipes.slice(1), [pipes[pipes.length -1 ] [0] + pipeGap + pipeWidth, pipeLoc()]]
            console.log(pipes);
        }
    })
  }

  window.requestAnimationFrame(render);
};

setup();
img.onload = render;
document.addEventListener('click', () => gamePlaying = true)
window.onclick = () => flight = jump;