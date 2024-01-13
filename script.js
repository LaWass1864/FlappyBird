const canvas = document.getElementById("canvas");
// ctx = context, getContext = retourne un contexte de dessin sur le canevas
const ctx = canvas.getContext("2d");
// Set d'image
const img = new Image();
// Source de cette image
img.src = "./media/flappy-bird-set.png";

// Reglages generaux

let gamePlaying = false;
const gravity = 0.5;
// Vitesse des poteaux lorsqu'ils arrivent
const speed = 6.2;
//  Taille de l'oiseau
const size = [51, 36];
// Saut de l'oiseau
const jump = -11.5;
const cTenth = canvas.width / 10;

// Pipe settings
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () =>
  Math.random() * (canvas.height - (pipeGap + pipeWidth) - pipeWidth) +
  pipeWidth;

// Création de l'effet paralax
let index = 0,
  bestScore = 0,
  currentScore = 0,
  pipes = [],
  flight,
  flyHeight;

const setup = () => {
  currentScore = 0;
  flight = jump;
  flyHeight = canvas.height / 2 - size[1] / 2;

  // Il faut créer un array de 3 poteaux. Car il doit y avoir tjr 3 poteaux dans l'ecran.

  pipes = Array(3)
    .fill()
    .map((a, i) => [canvas.width + i * (pipeGap + pipeWidth), pipeLoc()]);
  console.log(pipes);
};
// Fonction qui va gerer le rendu
const render = () => {
  index++;

  // background
  // 4 premiers parametres = ou est ce que l'image est et les 4 derniers parametres c'est ou on va la coller
  ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height,
    -((index * (speed / 2)) % canvas.width) + canvas.width,
    0,
    canvas.width,
    canvas.height
  );
  // Effacer la superposition
  ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height,
    -((index * (speed / 2)) % canvas.width),
    0,
    canvas.width,
    canvas.height
  );

  if (gamePlaying) {
    ctx.drawImage(
      img,
      432,
      Math.floor((index % 9) / 3) * size[1],
      ...size,
      cTenth,
      flyHeight,
      ...size
    );
    // Eviter que l'oiseau monte trop haut
    flight += gravity;
    flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);
  } else {
    // Dessin de l'oiseau
    //  The image object (as returned by document.getElementById ) The X coordinate, The Y coordinate,The width to draw the image,The height to draw the image
    // Animation de l'oiseau = Math.floor + le modulo (3,6,9)
    ctx.drawImage(
      img,
      432,
      Math.floor((index % 9) / 3) * size[1],
      ...size,
      canvas.width / 2 - size[0] / 2,
      flyHeight,
      ...size
    );
    flyHeight = canvas.height / 2 - size[1] / 2;
    // Ecrire dans le canva
    ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245);
    ctx.fillText(`Cliquez pour jouer`, 48, 535);
    ctx.font = "bold 30px courier";
  }
  // Pipe display
  if (gamePlaying) {
    pipes.map((pipe) => {
      pipe[0] -= speed;
      // top pipe
      ctx.drawImage(
        img,
        432,
        588 - pipe[1],
        pipeWidth,
        pipe[1],
        pipe[0],
        0,
        pipeWidth,
        pipe[1]
      );
      // bottom pipe
      ctx.drawImage(
        img,
        432 + pipeWidth,
        108,
        pipeWidth,
        canvas.height - pipe[1] + pipeGap,
        pipe[0],
        pipe[1] + pipeGap,
        pipeWidth,
        canvas.height - pipe[1] + pipeGap
      );

      if (pipe[0] <= -pipeWidth) {
        currentScore++;
        bestScore = Math.max(bestScore, currentScore);

        //  supprimer un poteau + en crée un nouveau
        pipes = [
          ...pipes.slice(1),
          [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()],
        ];
      }
      // if hit the pipe, end
      if (
        [
          pipe[0] <= cTenth + size[0],
          pipe[0] + pipeWidth <= cTenth,
          pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1],
        ].every((elem) => elem)
      ) {
        gamePlaying = false;
        setup();
      }
    });
  }

  document.getElementById("bestScore").innerHTML = `Meilleur : ${bestScore}`;
  document.getElementById(
    "currentScore"
  ).innerHTML = `Actuel : ${currentScore}`;
  window.requestAnimationFrame(render);
};

// Au chargement de l'image tu vas recharger le render
img.onload = render;

// Clique sur l'oiseau
setup();
document.addEventListener("click", () => (gamePlaying = true));
window.onclick = () => (flight = jump);
