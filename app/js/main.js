let btnPrev = document.querySelector(".btn__prev");
let btnNext = document.querySelector(".btn__next");

let images = document.querySelectorAll(".slider__img");
let gallery = document.querySelector(".slider__gallery");

let anatolySlider = new Slider(gallery);

btnNext.addEventListener("click", anatolySlider.moveForward);
btnPrev.addEventListener("click", anatolySlider.moveBackward);

function Slide(image) {
  this.image = image;
  this.width = image.width;
  this.height = image.height;
  this.next = null;
  this.prev = null;
}

function Slider(gallery) {
  let width = window.getComputedStyle(gallery).width;
  let head = null;
  let tail = null;
  let active = null;
  this.size = function () {
    return length;
  };
  this.head = function () {
    return head;
  };
  let initialization = (function () {
    let node = null;
    let images = [...gallery.children];
    images.forEach(function (image) {
      node = new Slide(image);
      if (head === null) {
        head = node;
        tail = node;
        active = head;
        gallery.style.height = active.height + "px";
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

  let transformAnimation = function(slide, start, end) {
    return slide.image.animate(
      [
        {
          transform: `translateX(${start})`,
          easing: "ease-in",
        },
        {
          transform: `translateX(${end})`,
          easing: "ease-in",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
      }
    );
  };

  let heightAnimation = function(slide, height) {
    return gallery.animate(
      [
        {
          height: `${slide.height}px`,
          easing: "ease-in",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
      }
      );
  }

  this.moveForward = async function() {
    let animationActiveSlide = transformAnimation(active, "0px", `-${width}`);
    active.next.image.classList.toggle("slider__img_active");
    let animationNextSlide = transformAnimation(active.next, width, "0px");
    let animationGalleryHeight = heightAnimation(active.next, `${active.next.height}px`)

    await animationActiveSlide.finished;
    await animationNextSlide.finished;
    active.image.classList.toggle("slider__img_active");
    active = active.next;
  };

  this.moveBackward = async function() {
    let animationActiveSlide = transformAnimation(active, "0px", width);
    active.prev.image.classList.toggle("slider__img_active");
    let animationNextSlide = transformAnimation(active.prev, `-${width}`, "0px");
    let animationGalleryHeight = heightAnimation(active.prev, `${active.prev.height}px`)

    await animationActiveSlide.finished;
    await animationNextSlide.finished;
    active.image.classList.toggle("slider__img_active");
    active = active.prev;
  }
}
