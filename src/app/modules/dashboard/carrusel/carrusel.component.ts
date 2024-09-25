import { Component } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})

export class CarruselComponent {


  images: string[] = ['assets/img/1.jpg', 'assets/img/2.jpg', 'assets/img/3.jpg', 'assets/img/4.jpg', 'assets/img/5.jpg', 'assets/img/6.jpg'];
  currentIndex = 0;
  interval: any;
  progressBar!: HTMLElement;

  ngOnInit() {
    this.progressBar = document.querySelector('.progress-bar') as HTMLElement;
    this.startProgressBarAnimation();

    this.startCarousel();
  }

  startProgressBarAnimation() {
    this.progressBar.addEventListener('transitionend', this.handleTransitionEnd);
    setTimeout(() => {
      this.progressBar.style.width = '100%';
    }, 100);
  }

  handleTransitionEnd = () => {
    this.progressBar.style.width = '0%';
    setTimeout(() => {
      this.progressBar.style.width = '100%';
    }, 100);
  }

  startCarousel(): void {
    this.interval = setInterval(() => {
      this.nextImage();
    }, 5000);
  }
  stopCarousel(): void {
    clearInterval(this.interval);
  }
  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  getPreviousIndex(): number {
    return (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  getNextIndex(): number {
    return (this.currentIndex + 1) % this.images.length;
  }
}
