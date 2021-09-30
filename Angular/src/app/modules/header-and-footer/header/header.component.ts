import { Component, OnInit } from '@angular/core';
import { Container, Main, tsParticles } from 'tsparticles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  id = 'tsparticles';
  particlesUrl = 'http://foo.bar/particles.json';
  constructor(private router: Router) {}

  particlesOptions = {
    particles: {
      color: { value: '#92B4A7' },
      opacity: {
        value: 1,
        random: {
          enable: true,
          minimumValue: 0.05,
        },
        animation: {
          enable: true,
          speed: 0.8,
          minimumValue: 0.05,
        },
      },
      size: {
        value: 60,
      },
    },
  };

  ngOnInit(): void {}
  particlesLoaded(container: Container): void {
    console.log(container);
  }

  particlesInit(main: Main): void {
    console.log(main);
  }

  login() {
    this.router.navigate(['/login']);
  }
  home() {
    this.router.navigate(['/home']);
  }
  register() {
    this.router.navigate(['/register']);
  }
}
