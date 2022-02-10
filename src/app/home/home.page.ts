import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  date: Date = new Date(Date.now());
  profileImageUrls = [
    "../assets/test-data/profile-images/black-hair-girl.jpg",
    "../assets/test-data/profile-images/red-har-girl.jpg",
    "../assets/test-data/profile-images/hat-guy.jpg",
    "../assets/test-data/profile-images/pink-shirt-guy.jpg",
  ]
}
