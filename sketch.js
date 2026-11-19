let seedValue;

// ------------------------------------------------------------
// SETTINGS
// ------------------------------------------------------------

const GRID_ANGLE = 18 * Math.PI / 180;

const ROWS = 16;
const COLUMNS = 26;

const COVERAGE = 1.12;

// ------------------------------------------------------------
// COLORS
// ------------------------------------------------------------

const PALETTE = [
  "#D94F4F",
  "#E7A93B",
  "#4F7CAC",
  "#5E9C76",
  "#8A68A8"
];

const BACKGROUND_COLOR = "#F5F2EA";
const FOUNDATION_COLOR = "#E8E3D8";
const PATH_COLOR = "#C9C4B9";
const AWARENESS_COLOR = "#E7C84B";


// ============================================================
// SETUP
// ============================================================

function setup() {

    createCanvas(windowWidth, windowHeight);

    pixelDensity(1);

    seedValue = floor(random(999999));

    generateArtwork();

    setupInfoPanel();

}

// DRAW

function draw() {
}

function generateArtwork() {

  randomSeed(seedValue);

  background(BACKGROUND_COLOR);

  push();

  // ----------------------------------------------------------
  // GRID SIZE
  // ----------------------------------------------------------

  const angle = GRID_ANGLE;

  const cosA = abs(cos(angle));
  const sinA = abs(sin(angle));

  const requiredWidth =
    width * cosA +
    height * sinA;

  const requiredHeight =
    width * sinA +
    height * cosA;

  // extend the grid beyond the canvas edges
  // prevents empty corners after rotation

  const gridWidth =
    requiredWidth * COVERAGE;

  const gridHeight =
    requiredHeight * COVERAGE;


  translate(width / 2, height / 2);   // Center and rotate the composition

  rotate(GRID_ANGLE);

  // ----------------------------------------------------------
  // Responsive grid spacing
  // ----------------------------------------------------------

  const columnSpacing =
    gridWidth / COLUMNS;

  const rowSpacing =
    gridHeight / ROWS;

  // ----------------------------------------------------------
  // draw bg structure 
  // ----------------------------------------------------------

  drawFoundations(
    gridWidth,
    gridHeight,
    columnSpacing,
    rowSpacing
  );

  drawPathways(
    gridWidth,
    gridHeight,
    columnSpacing,
    rowSpacing
  );

  // ----------------------------------------------------------
  // draw individuals and communities (the square shapes)
  // ----------------------------------------------------------

  drawIndividuals(
    gridWidth,
    gridHeight,
    columnSpacing,
    rowSpacing
  );

  pop();

}


// ============================================================
// FOUNDATIONS
// ============================================================

function drawFoundations(
  gridWidth,
  gridHeight,
  columnSpacing,
  rowSpacing
) {

  noFill();

  stroke(FOUNDATION_COLOR);
  strokeWeight(1);


  for (let r = 0; r <= ROWS; r++) { // subtle structure grid

    const y =
      -gridHeight / 2 + r * rowSpacing;

    line(
      -gridWidth / 2,
      y,
      gridWidth / 2,
      y
    );

  }

  for (let c = 0; c <= COLUMNS; c++) {

    const x =
      -gridWidth / 2 + c * columnSpacing;

    line(
      x,
      -gridHeight / 2,
      x,
      gridHeight / 2
    );

  }

}


// ============================================================
// PATHWAYS
// ============================================================

function drawPathways(
  gridWidth,
  gridHeight,
  columnSpacing,
  rowSpacing
) {

  stroke(PATH_COLOR);
  strokeCap(SQUARE);
  noFill();

  // ----------------------------------------------------------
  // horizontal pathways
  // ----------------------------------------------------------

  for (let r = -1; r <= ROWS; r++) {

    const y =
      -gridHeight / 2 + r * rowSpacing;

    let xStart = -gridWidth / 2;

    while (xStart < gridWidth / 2) {

      const segmentLength =
        random(
          columnSpacing * 0.35,
          columnSpacing * 0.85
        );

      // some pathways are interrupted -> represent unequal access and barriers compare to others

      if (random() > 0.22) {

        strokeWeight(random(1, 2));

        line(
          xStart,
          y,
          min(
            xStart + segmentLength,
            gridWidth / 2
          ),
          y
        );

      }

      xStart +=
        segmentLength + random(4, 18);

    }

  }


  // ----------------------------------------------------------
  // Vertical pathways
  // ----------------------------------------------------------

  for (let c = -1; c <= COLUMNS; c++) {

    const x =
      -gridWidth / 2 + c * columnSpacing;

    let yStart = -gridHeight / 2;

    while (yStart < gridHeight / 2) {

      const segmentLength =
        random(
          rowSpacing * 0.25,
          rowSpacing * 0.75
        );

      if (random() > 0.30) {

        strokeWeight(random(0.8, 1.6));

        line(
          x,
          yStart,
          x,
          min(
            yStart + segmentLength,
            gridHeight / 2
          )
        );

      }

      yStart +=
        segmentLength + random(5, 20);

    }

  }

}


// ============================================================
// INDIVIDUALS
// ============================================================

function drawIndividuals(
  gridWidth,
  gridHeight,
  columnSpacing,
  rowSpacing
) {

  for (let r = 0; r < ROWS; r++) {

    for (let c = 0; c < COLUMNS; c++) {


      // occasional spaces between individuals

      if (random() < 0.10) {
        continue;
      }

      const x =
        -gridWidth / 2 +
        columnSpacing * (c + 0.5);

      const y =
        -gridHeight / 2 +
        rowSpacing * (r + 0.5);


      // ------------------------------------------------------
      // different sizes representing unequal circumstances
      // ------------------------------------------------------

      const inequality = random();

      let w;
      let h;

      if (inequality < 0.20) {


        w = columnSpacing * random(0.25, 0.38); // limited 
        h = rowSpacing * random(0.25, 0.40);

      } else if (inequality < 0.55) {


        w = columnSpacing * random(0.40, 0.58); // mid
        h = rowSpacing * random(0.38, 0.58);

      } else if (inequality < 0.85) {


        w = columnSpacing * random(0.55, 0.78); // better
        h = rowSpacing * random(0.55, 0.78);

      } else {


        w = columnSpacing * random(0.70, 0.90); // position
        h = rowSpacing * random(0.65, 0.90);

      }


      // ------------------------------------------------------
      // no overlap
      // ------------------------------------------------------

      const offsetX =
        random(
          -columnSpacing * 0.08,
          columnSpacing * 0.08
        );

      const offsetY =
        random(
          -rowSpacing * 0.08,
          rowSpacing * 0.08
        );


      // ------------------------------------------------------
      // individual colors
      // ------------------------------------------------------

      const blockColor =
        random(PALETTE);


      // ------------------------------------------------------
      // geometric shapes
      // ------------------------------------------------------

      const shapeType =
        floor(random(4));


      push();

      translate(
        x + offsetX,
        y + offsetY
      );

      rotate(
        random(-2.5, 2.5) * Math.PI / 180
      );

      noStroke();

      fill(blockColor);


      if (shapeType === 0) {

        drawLongBlock(w, h);

      } else if (shapeType === 1) {

        drawSlantedBlock(w, h);

      } else if (shapeType === 2) {

        drawNotchedBlock(w, h);

      } else {

        drawUnevenBlock(w, h);

      }

      pop();

    }

  }


  // draw the awareness network last

  drawAwarenessNetwork(
    gridWidth,
    gridHeight,
    columnSpacing,
    rowSpacing
  );

}


// ============================================================
// GEOMETRIC SHAPES
// ============================================================

function drawLongBlock(w, h) {

  rect(
    -w / 2,
    -h / 2,
    w,
    h
  );

}


function drawSlantedBlock(w, h) {

  beginShape();

  vertex(-w / 2, -h / 2);
  vertex(w / 2, -h / 2);
  vertex(w / 2 - w * 0.18, h / 2);
  vertex(-w / 2, h / 2);

  endShape(CLOSE);

}


function drawNotchedBlock(w, h) {

  const notch = min(w, h) * 0.25;

  beginShape();

  vertex(-w / 2, -h / 2);
  vertex(w / 2, -h / 2);
  vertex(w / 2, h / 2);
  vertex(-w / 2 + notch, h / 2);
  vertex(-w / 2 + notch, h / 2 - notch);
  vertex(-w / 2, h / 2 - notch);

  endShape(CLOSE);

}


function drawUnevenBlock(w, h) {

  beginShape();

  vertex(
    -w / 2,
    -h / 2 + random(-h * 0.1, h * 0.1)
  );

  vertex(
    w / 2,
    -h / 2 + random(-h * 0.08, h * 0.08)
  );

  vertex(
    w / 2 + random(-w * 0.04, w * 0.04),
    h / 2
  );

  vertex(
    -w / 2 + random(-w * 0.08, w * 0.08),
    h / 2
  );

  endShape(CLOSE);

}


// ============================================================
// AWARENESS NETWORK
// ============================================================

function drawAwarenessNetwork(
  gridWidth,
  gridHeight,
  columnSpacing,
  rowSpacing
) {

  const centerX = 0;
  const centerY = 0;

  const networkRadius =
    min(gridWidth, gridHeight) * 0.22;

  // ----------------------------------------------------------
  // connection line spreading outward
  // ----------------------------------------------------------

  stroke(AWARENESS_COLOR);
  strokeWeight(2);
  noFill();

  const connections = 8;

  for (let i = 0; i < connections; i++) {

    const angle =
      Math.PI * 2 * i / connections +
      random(-0.18, 0.18);

    const distance =
      random(
        networkRadius * 0.55,
        networkRadius
      );

    const targetX =
      centerX + cos(angle) * distance;

    const targetY =
      centerY + sin(angle) * distance;

    line(
      centerX,
      centerY,
      targetX,
      targetY
    );

  }


  // ----------------------------------------------------------
  // Central awareness individual
  // ----------------------------------------------------------

  push();

  translate(centerX, centerY);

  rotate(random(-3, 3) * Math.PI / 180);

  noStroke();

  fill(AWARENESS_COLOR);

  drawSlantedBlock(
    columnSpacing * 0.70,
    rowSpacing * 0.70
  );

  pop();

}

// ============================================================
// INFORMATION PANEL INTERACTION
// ============================================================

function setupInfoPanel() {

    const infoButton =
        document.getElementById("info-button");

    const infoPanel =
        document.getElementById("info-panel");

    const closeButton =
        document.getElementById("close-info");


    // --------------------------------------------------------
    // OPEN / CLOSE PANEL
    // --------------------------------------------------------

    function toggleInfoPanel() {

        const isOpen =
            infoPanel.classList.toggle("is-open");

        infoButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        infoPanel.setAttribute(
            "aria-hidden",
            !isOpen
        );

        infoButton.querySelector(
            ".button-symbol"
        ).textContent = isOpen ? "−" : "+";

    }


    // --------------------------------------------------------
    // BUTTON EVENTS
    // --------------------------------------------------------

    infoButton.addEventListener(
        "click",
        toggleInfoPanel
    );

    closeButton.addEventListener(
        "click",
        toggleInfoPanel
    );


    // --------------------------------------------------------
    // CLOSE WITH ESCAPE KEY
    // --------------------------------------------------------

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            infoPanel.classList.contains("is-open")
        ) {

            toggleInfoPanel();

        }

    });

}

// ============================================================
// RESIZE CANVAS
// ============================================================

function windowResized() {

  resizeCanvas(
    windowWidth,
    windowHeight
  );

  generateArtwork();

}


// ============================================================
// KEYBINDS
// ============================================================

function keyPressed() {

  // F = fullscreen

  if (key === "f" || key === "F") {

    const currentFullscreen = fullscreen();

    fullscreen(!currentFullscreen);

  }


  // R = Generate a new composition

  if (key === "r" || key === "R") {

    seedValue = floor(random(999999));

    generateArtwork();

  }


  // S = Save artwork

  if (key === "s" || key === "S") {

    saveCanvas(
      "SDG10_Reduced_Inequalities",
      "png"
    );
  }
}
