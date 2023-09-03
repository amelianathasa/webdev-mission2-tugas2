import Obstacle from "./Obstacle.js";

export default class ObstacleController {
  OBSTACLE_INTERVAL_MIN = 500;
  OBSTACLE_INTERVAL_MAX = 2000;

  nextObstacleInterval = null;
  obs = [];

  constructor(ctx, obstacleImages, scaleRatio, speed) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.obstacleImages = obstacleImages;
    this.scaleRatio = scaleRatio;
    this.speed = speed;

    this.setNextObstacleTime();
  }

  setNextObstacleTime() {
    const num = this.getRandomNumber(this.OBSTACLE_INTERVAL_MIN, this.OBSTACLE_INTERVAL_MAX);

    this.nextObstacleInterval = num;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  createObstacle() {
    const index = this.getRandomNumber(0, this.obstacleImages.length - 1);
    const obsImages = this.obstacleImages[index];
    const x = this.canvas.width * 2;
    const y = this.canvas.height - obsImages.height * 1;
    const obstacle = new Obstacle(this.ctx, x, y, obsImages.width, obsImages.height, obsImages.image);

    this.obs.push(obstacle);
  }

  update(gameSpeed, frameTimeDelta) {
    if (this.nextObstacleInterval <= 0) {
      this.createObstacle();
      this.setNextObstacleTime();
    }
    this.nextObstacleInterval -= frameTimeDelta;

    this.obs.forEach((obstacle) => {
      obstacle.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
    });

    this.obs = this.obs.filter((obstacle) => obstacle.x > -obstacle.width);
  }

  draw() {
    this.obs.forEach((obstacle) => obstacle.draw());
  }

  collideWith(sprite) {
    return this.obs.some((obstacle) => obstacle.collideWith(sprite));
  }

  reset() {
    this.obs = [];
  }
}
