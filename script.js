const submitButton = document.querySelector(".submit");
let containerWidth = document.getElementById("container").clientWidth;

function loadImages(sources, callback) {
  let assetDir = "/assets/";
  let images = {};
  let loadedImages = 0;
  let numImages = 0;
  for (let src in sources) {
    images[src] = new Image();
    images[src].onload = function () {
      if (++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = assetDir + sources[src];
  }
}
function isNearOutline(animal, outline) {
  let a = animal;
  let o = outline;
  let ax = a.x();
  let ay = a.y();

  if (ax > o.x - 20 && ax < o.x + 20 && ay > o.y - 20 && ay < o.y + 20) {
    return true;
  } else {
    return false;
  }
}

let score = 0;
function initStage(images) {
  let stage = new Konva.Stage({
    container: "container",
    width: containerWidth,
    height: 100,
  });
  let logoLayer = new Konva.Layer();
  let logoShapes = [];

  // draggable image position
  let logo = {
    logo: {
      x: 50,
      y: 30,
    },
  };
  
  // dropping image position
  let outlines = {
    logo_black: {
      x: containerWidth - 100,
      y: 30,
    },
  };

  // create draggable logo
  for (let key in logo) {
    // anonymous function to induce scope
    (function () {
      let privKey = key;
      let anim = logo[key];

      let draggableLogo = new Konva.Image({
        image: images[key],
        x: anim.x,
        y: anim.y,
        draggable: true,
      });

      draggableLogo.on("dragstart", function () {
        this.moveToTop();
      });
      /*
       * check if draggableLogo is in the right spot and
       * snap into place if it is
       */
      draggableLogo.on("dragend", function () {
        let outline = outlines[privKey + "_black"];
        if (!draggableLogo.inRightPlace && isNearOutline(draggableLogo, outline)) {
          draggableLogo.position({
            x: outline.x,
            y: outline.y,
          });
          draggableLogo.inRightPlace = true;
          if (++score === 1) {
            score = 1;
            submitButton.disabled = false;
          }

          // disable drag and drop
          setTimeout(function () {
            draggableLogo.draggable(false);
          }, 50);
        }
      });
      // make draggableLogo glow on mouseover
      draggableLogo.on("mouseover", function () {
        draggableLogo.image(images[privKey + "_glow"]);
        document.body.style.cursor = "pointer";
      });
      // return draggableLogo on mouseout
      draggableLogo.on("mouseout", function () {
        draggableLogo.image(images[privKey]);
        document.body.style.cursor = "default";
      });

      draggableLogo.on("dragmove", function () {
        document.body.style.cursor = "pointer";
      });

      logoLayer.add(draggableLogo);
      logoShapes.push(draggableLogo);
    })();
  }

  // create animal outlines
  for (let key in outlines) {
    // anonymous function to induce scope
    (function () {
      let imageObj = images[key];
      let out = outlines[key];

      let outline = new Konva.Image({
        image: imageObj,
        x: out.x,
        y: out.y,
      });

      logoLayer.add(outline);
    })();
  }
  stage.add(logoLayer);
}

let sources = {
  logo: "logo.png",
  logo_glow: "logo-glow.png",
  logo_black: "logo-black.png",
};
loadImages(sources, initStage);

submitButton.addEventListener("click", (e) => {
  if (score === 0) {
      document.querySelector(".lead").classList.add("text-danger")
      submitButton.disabled = true;
    } 
});
