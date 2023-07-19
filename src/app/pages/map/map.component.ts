import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  cardId: any;
  pdfUrl: SafeResourceUrl | undefined;
  card: any;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.cardId = Number(params.get('id'));
      this.setPdfUrl();
    });
  }

  private setPdfUrl() {
    // Get the card based on the cardId
    this.card = this.getCardById(this.cardId);
    if (this.card) {
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.card.pdfUrl
      );
    }
  }

  private getCardById(cardId: number) {
    // Replace this with your actual card retrieval logic
    const cards = [
      {
        id: 1,
        title: 'Frontend Developer',
        pdfUrl: '../assets/files/frontend.pdf',
      },
      {
        id: 2,
        title: 'Backend Developer',
        pdfUrl: '../assets/files/backend.pdf',
      },
      { id: 3, title: 'DevOps Roadmap', pdfUrl: '../assets/files/devops.pdf' },
      {
        id: 4,
        title: 'Full Stack Developer',
        pdfUrl: '../assets/files/full-stack.pdf',
      },
      {
        id: 5,
        title: 'Android Developer',
        pdfUrl: '../assets/files/android.pdf',
      },
      {
        id: 6,
        title: 'PostgreSQL DBA',
        pdfUrl: '../assets/files/postgresql-dba.pdf',
      },
      { id: 7, title: 'C++ Developer', pdfUrl: '../assets/files/cpp.pdf' },
      {
        id: 8,
        title: 'Flutter Developer',
        pdfUrl: '../assets/files/flutter.pdf',
      },
      { id: 9, title: 'UX Design', pdfUrl: '../assets/files/ux-design.pdf' },
      {
        id: 10,
        title: 'Angular Developer',
        pdfUrl: '../assets/files/angular.pdf',
      },
      {
        id: 11,
        title: 'ASP.NET Core Developer',
        pdfUrl: '../assets/files/aspnet-core.pdf',
      },
      {
        id: 12,
        title: 'TypeScript Developer',
        pdfUrl: '../assets/files/typescript.pdf',
      },
    ];
    return cards.find((card) => card.id === cardId);
  }
}
