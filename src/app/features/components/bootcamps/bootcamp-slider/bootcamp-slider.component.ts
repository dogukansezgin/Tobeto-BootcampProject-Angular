import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-bootcamp-slider',
  standalone: true,
  imports: [CommonModule,CardModule],
  templateUrl: './bootcamp-slider.component.html',
  styleUrl: './bootcamp-slider.component.scss'
})
export class BootcampSliderComponent {
  slides = [
    {
      title: 'Sizi anlayan öğrenim deneyimi',
      description: 'Teknoloji ve iş dünyası hızla değişirken siz de CodeCamp ile hız kazanın. Yeni yetkinlikler edinerek hedeflerinize ulaşın ve rekabette önde olun.',
      image: '../../../../../assets/images/emotive-dark-skinned-woman.png'
    },
    {
      title: 'Sizi anlayan öğrenim deneyimi',
      description: 'Etkinliklerimize ücretsiz katıl, geleceğin yeteneği ol!',
      image: '../../../../../assets/images/portrait.png'
      
    }
    // Diğer slaytlar burada eklenebilir
  ];

  currentSlide = 0;

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.slides.length - 1;
    }
  }

  nextSlide() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
  }

  getSliderTransform() {
    return `translateX(-${this.currentSlide * 100}%)`;
  }
}
