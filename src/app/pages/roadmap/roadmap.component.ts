import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss'],
})
export class RoadmapComponent {
  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  cards = [
    {
      id: 1,
      title: 'Frontend Developer',
      subtitle: 'frontend',
      content: 'Step by step guide to becoming a modern frontend developer',
      pdfUrl: '../assets/files/frontend.pdf',
    },
    {
      id: 2,
      title: 'Backend Developer',
      subtitle: ' backend',
      content: 'Step by step guide to becoming a modern backend developer',
      pdfUrl: '../assets/files/backend.pdf',
    },
    {
      id: 3,
      title: 'DevOps Roadmap',
      subtitle: 'devOps',
      content:
        'Step by step guide for DevOps, SRE or any other Operations Role',
      pdfUrl: '../assets/files/devops.pdf',
    },
    {
      id: 4,
      title: 'Full Stack Developer',
      subtitle: 'fullStack',
      content: 'Step by step guide to becoming a modern full stack developer',
      pdfUrl: '../assets/files/full-stack.pdf',
    },
    {
      id: 5,
      title: 'Android Developer',
      subtitle: 'android',
      content: 'Step by step guide to becoming an Android developer',
      pdfUrl: '../assets/files/android.pdf',
    },
    {
      id: 6,
      title: 'PostgreSQL DBA',
      subtitle: 'postgress',
      content:
        'Step by step guide to becoming a modern PostgreSQL DB Administrator',
      pdfUrl: '../assets/files/postgresql-dba.pdf',
    },
    {
      id: 7,
      title: 'C++ Developer',
      subtitle: 'C++',
      content: 'Step by step guide to becoming a C++ developer',
      pdfUrl: '../assets/files/cpp.pdf',
    },
    {
      id: 8,
      title: 'Flutter Developer',
      subtitle: 'flutter',
      content: 'Step by step guide to becoming a Flutter developer ',
      pdfUrl: '../assets/files/flutter.pdf',
    },
    {
      id: 9,
      title: 'UX Design',
      subtitle: 'UX',
      content: 'Step by step guide to becoming a UX Designer',
      pdfUrl: '../assets/files/ux-design.pdf',
    },
    {
      id: 10,
      title: 'Angular Developer',
      subtitle: 'angular',
      content:
        'Everything that is there to learn about Angular and the ecosystem',
      pdfUrl: '../assets/files/angular.pdf',
    },
    {
      id: 11,
      title: 'ASP.NET Core Developer',
      subtitle: '.net',
      content: 'Step by step guide to becoming an ASP.NET core develope',
      pdfUrl: '../assets/files/aspnet-core.pdf',
    },
    {
      id: 12,
      title: 'TypeScript Developer',
      subtitle: 'typeScript',
      content: 'Everything you need to learn about TypeScript in 2023',
      pdfUrl: '../assets/files/typescript.pdf',
    },
  ];

  viewCardDetails(cardId: number) {
    this.router.navigate(['/map', cardId], { state: { cards: this.cards } });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
