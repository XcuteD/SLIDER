window.addEventListener("load", function () {
  let btnPrev = document.querySelector(".btn__prev");
  let btnNext = document.querySelector(".btn__next");
  let gallery = document.querySelector(".slider__gallery");
  let anatolySlider = new Slider(gallery);
  btnNext.addEventListener("click", () => anatolySlider.moveSlide("forward"));
  btnPrev.addEventListener("click", () => anatolySlider.moveSlide("backward"));

  let anotherBtnPrev = document.querySelector(".another-btn__prev");
  let anotherBtnNext = document.querySelector(".another-btn__next");
  let anotherGallery = document.querySelector(".another-slider__gallery");
  let andrewSlider = new Slider(anotherGallery);
  anotherBtnNext.addEventListener("click", () =>
    andrewSlider.moveSlide("forward")
  );
  anotherBtnPrev.addEventListener("click", () =>
    andrewSlider.moveSlide("backward")
  );
});

function Slide(image) {
  this.image = image;
  this.height = window.getComputedStyle(image).height;
  this.next = null;
  this.prev = null;
}

function Slider(gallery) {
  let width = window.getComputedStyle(gallery).width;
  let head = null;
  let tail = null;
  let active = null;

  let initialization = (function () {
    let node = null;
    let images = [...gallery.children];
    images.forEach(function (image) {
      node = new Slide(image);
      if (head === null) {
        head = node;
        tail = node;
        active = head;
        gallery.style.height = active.height;
      } else {
        tail.next = node;
        node.prev = tail;
        tail = node;
      }
      length++;
    }, this);
    tail.next = head;
    head.prev = tail;
  })();

  let transformAnimation = function (slide, start, end) {
    let animation = [
      {
        transform: `translateX(${start})`,
        easing: "ease-in",
      },
      {
        transform: `translateX(${end})`,
        easing: "ease-in",
      },
    ];

    animation[0].opacity = +(slide == active);
    animation[1].opacity = +!(slide == active);

    return slide.image.animate(animation, {
      duration: 500,
      fill: "forwards",
    });
  };

  let heightAnimation = function (slide) {
    return gallery.animate(
      [
        {
          height: slide.height,
          easing: "ease-in",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
      }
    );
  };

  this.moveSlide = async function (direction) {
    let startPosition;
    let endPosition;
    let neighborSlide;

    if (direction == "forward") {
      startPosition = width;
      endPosition = `-${width}`;
      neighborSlide = active.next;
    } else if (direction == "backward") {
      startPosition = `-${width}`;
      endPosition = width;
      neighborSlide = active.prev;
    }

    let animationActiveSlide = transformAnimation(active, "0px", endPosition);
    let animationNeighborSlide = transformAnimation(
      neighborSlide,
      startPosition,
      "0px"
    );
    heightAnimation(neighborSlide);
    await animationActiveSlide.finished;
    await animationNeighborSlide.finished;
    active = neighborSlide;
  };
}
