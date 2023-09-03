export default class Player {
  WALK_ANIMATION_TIMER = 200;
  walkAnimationTimer = this.WALK_ANIMATION_TIMER;
  rabbitRunImages = [];

  jumpPressed = false;
  jumpInProgress = false;
  falling = false;
  JUMP_SPEED = 0.6;
  GRAVITY = 0.4;

  constructor(ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height;
    this.minJumpHeight = minJumpHeight;
    this.maxJumpHeight = maxJumpHeight;
    this.scaleRatio = scaleRatio;

    this.x = 10 * scaleRatio;
    this.y = this.canvas.height - this.height - 1.5 * scaleRatio;
    this.yStandingPosition = this.y;

    this.rabbit1 = new Image();
    this.rabbit1.src = "img/rabbit-1.png";
    this.image = this.rabbit1;
    // this.rabbit10 = new Image();
    // this.rabbit10.src = "img/rabbit-2.png";
    // this.image = this.rabbit10;

    const rabbitRunImage2 = new Image();
    rabbitRunImage2.src = "img/rabbit-2.png";
    const rabbitRunImage3 = new Image();
    rabbitRunImage3.src = "img/rabbit-3.png";
    const rabbitRunImage4 = new Image();
    rabbitRunImage4.src = "img/rabbit-4.png";
    const rabbitRunImage5 = new Image();
    rabbitRunImage5.src = "img/rabbit-5.png";
    const rabbitRunImage6 = new Image();
    rabbitRunImage6.src = "img/rabbit-6.png";

    this.rabbitRunImages.push(rabbitRunImage2);
    this.rabbitRunImages.push(rabbitRunImage3);
    this.rabbitRunImages.push(rabbitRunImage4);
    this.rabbitRunImages.push(rabbitRunImage5);
    this.rabbitRunImages.push(rabbitRunImage6);

    //keyboard
    window.removeEventListener("keydown", this.keydown);
    window.removeEventListener("keyup", this.keyup);

    window.addEventListener("keydown", this.keydown);
    window.addEventListener("keyup", this.keyup);

    //touch
    window.removeEventListener("touchstart", this.touchstart);
    window.removeEventListener("touchend", this.touchend);

    window.addEventListener("touchstart", this.touchstart);
    window.addEventListener("touchend", this.touchend);
  }

  touchstart = () => {
    this.jumpPressed = true;
  };

  touchend = () => {
    this.jumpPressed = false;
  };

  keydown = (event) => {
    if (event.code === "Space") {
      this.jumpPressed = true;
    }
  };

  keyup = (event) => {
    if (event.code === "Space") {
      this.jumpPressed = false;
    }
  };

  update(gameSpeed, frameTimeDelta) {
    // console.log(this.jumpPressed);
    this.run(gameSpeed, frameTimeDelta);
    // if (this.jumpInProgress) {
    // this.image = this.rabbit1;
    //   this.image = this.rabbit10;
    // }
    this.jump(frameTimeDelta);
  }
  jump(frameTimeDelta) {
    if (this.jumpPressed) {
      this.jumpInProgress = true;
    }
    if (this.jumpInProgress && !this.falling) {
      if (this.y > this.canvas.height - this.minJumpHeight || (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)) {
        this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
      } else {
        this.falling = true;
      }
    } else {
      if (this.y < this.yStandingPosition) {
        this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
        if (this.y + this.height > this.canvas.height) {
          this.y = this.yStandingPosition;
        }
      } else {
        this.falling = false;
        this.jumpInProgress = false;
      }
    }
  }

  run(gameSpeed, frameTimeDelta) {
    if (this.walkAnimationTimer <= 0) {
      if (this.image === this.rabbitRunImages[0]) {
        this.image = this.rabbitRunImages[1];
        this.image = this.rabbitRunImages[2];
        this.image = this.rabbitRunImages[3];
        this.image = this.rabbitRunImages[4];
        this.image = this.rabbitRunImages[4];
      } else {
        this.image = this.rabbitRunImages[0];
      }
      this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    }
    this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
  }
  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
