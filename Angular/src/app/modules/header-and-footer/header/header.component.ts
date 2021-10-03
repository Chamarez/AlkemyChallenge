import { Component, OnInit } from '@angular/core';
import { Container, Main, tsParticles } from 'tsparticles';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogged = false;
  user : any;
  id = 'tsparticles';
  particlesUrl = 'http://foo.bar/particles.json';
  constructor(private authSvc: AuthService, private router: Router) {}

  particlesOptions = {
    particles: {
      color: { value: '#29312e' },
      opacity: {
        value: 1,
        random: {
          enable: true,
          minimumValue: 0.05,
        },
        animation: {
          enable: true,
          speed: 1.2,
          minimumValue: 0.05,
        },
      },
      size: {
        value: 20,
      },
    },
  };

  ngOnInit(): void {
    this.authSvc.isLogged.subscribe((res) => (this.isLogged = res));
    this.username();


  }
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
  logOut(){
    this.authSvc.logout();
  }

  navigateToInside(){

    this.router.navigate(['/inside'])
  }
  username(){
     this.user = this.authSvc.decodeUsername()

  }
}
