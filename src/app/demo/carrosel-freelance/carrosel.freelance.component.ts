// filepath: c:\faculdade\TaNaMao\src\app\demo\carrosel-freelance\carrosel.freelance.component.ts
import { Component, Input, ViewChild, ElementRef, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Colaborador } from 'src/app/core/interfaces/colaborador';
import { Servico } from 'src/app/core/interfaces/servico';
import { TruncatePipe } from './trincate.pipe';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ServiceDetailsComponent } from '../catalogo-servicos/service-details/service-details.component';

@Component({
  selector: 'app-freelancer-carousel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatBadgeModule,
    MatDialogModule,
    TruncatePipe
  ],
  templateUrl: './carrosel.component.html',
  styleUrls: ['./carrosel.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ]),
    trigger('fadeInOut', [
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      state('hidden', style({ opacity: 0.5, transform: 'scale(0.95)' })),
      transition('hidden <=> visible', animate('250ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class FreelancerCarouselComponent implements OnInit, AfterViewInit {
  @Input() title = 'Freelancers em Destaque';
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;
  
  currentIndex = 0;
  visibleSlides = 3;
  animationState = 'in';
  isAnimating = false;
  touchStartX = 0;
  touchEndX = 0;
  autoplayInterval = null;
  currentPage = 0;

  freelancers: Colaborador[] = [
    {
      id: '1',
      nome: 'Ana Silva',
      titulo: 'Desenvolvedora Full Stack',
      avaliacao: 4.8,
      valorHora: 120,
      valorOriginal: 150,
      descricao: 'Especialista em desenvolvimento web com 5 anos de experiência em React, Angular e Node.js.',
      habilidades: [
        { nome: 'Angular', nivel: 5 },
        { nome: 'React', nivel: 4 },
        { nome: 'Node.js', nivel: 5 },
        { nome: 'TypeScript', nivel: 4 }
      ],
      fotoPerfil: 'https://randomuser.me/api/portraits/women/1.jpg',
      projetosCompletos: 47,
      categoria: 'Desenvolvimento',
      desconto: 20,
      tags: ['Angular', 'React', 'Node.js', 'TypeScript'],
      nivel: 'Expert'
    },
    {
      id: '2',
      nome: 'Pedro Santos',
      titulo: 'Designer UI/UX',
      avaliacao: 4.9,
      valorHora: 120,
      descricao: 'Designer apaixonado por criar interfaces intuitivas e experiências de usuário memoráveis.',
      habilidades: [
        { nome: 'Figma', nivel: 5 },
        { nome: 'Adobe XD', nivel: 4 },
        { nome: 'Prototyping', nivel: 4 },
        { nome: 'User Research', nivel: 4 }
      ],
      fotoPerfil: 'https://randomuser.me/api/portraits/men/30.jpg',
      projetosCompletos: 38,
      categoria: 'Design',
      tags: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      nivel: 'Expert'
    },
    {
      id: '3',
      nome: 'Mariana Costa',
      titulo: 'Marketing Digital',
      avaliacao: 4.7,
      valorHora: 80,
      valorOriginal: 100,
      descricao: 'Estrategista de marketing digital com foco em crescimento e conversão.',
      habilidades: [
        { nome: 'SEO', nivel: 5 },
        { nome: 'Social Media', nivel: 4 },
        { nome: 'Content Marketing', nivel: 4 },
        { nome: 'Analytics', nivel: 4 }
      ],
      fotoPerfil: 'https://randomuser.me/api/portraits/women/3.jpg',
      projetosCompletos: 52,
      categoria: 'Marketing',
      desconto: 20,
      tags: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
      nivel: 'Intermediário'
    },
    {
      id: '4',
      nome: 'Lucas Oliveira',
      titulo: 'Desenvolvedor Mobile',
      avaliacao: 4.9,
      valorHora: 140,
      descricao: 'Desenvolvedor mobile especializado em aplicativos iOS e Android nativos.',
      habilidades: [
        { nome: 'Swift', nivel: 5 },
        { nome: 'Kotlin', nivel: 4 },
        { nome: 'Flutter', nivel: 4 },
        { nome: 'React Native', nivel: 4 }
      ],
      fotoPerfil: 'https://randomuser.me/api/portraits/men/4.jpg',
      projetosCompletos: 31,
      categoria: 'Mobile',
      tags: ['Swift', 'Kotlin', 'Flutter', 'React Native'],
      nivel: 'Expert'
    },
    {
      id: '5',
      nome: 'Carolina Lima',
      titulo: 'Copywriter',
      avaliacao: 4.8,
      valorHora: 90,
      descricao: 'Copywriter criativa especializada em conteúdo persuasivo e storytelling.',
      habilidades: [
        { nome: 'Copywriting', nivel: 5 },
        { nome: 'SEO Writing', nivel: 4 },
        { nome: 'Email Marketing', nivel: 4 },
        { nome: 'Brand Voice', nivel: 4 }
      ],
      fotoPerfil: 'https://randomuser.me/api/portraits/women/5.jpg',
      projetosCompletos: 64,
      categoria: 'Conteúdo',
      tags: ['Copywriting', 'SEO Writing', 'Email Marketing', 'Brand Voice'],
      nivel: 'Intermediário'
    },
    {
      id: '6',
      nome: 'Rafael Mendes',
      titulo: 'Data Scientist',
      avaliacao: 4.9,
      valorHora: 160,
      descricao: 'Cientista de dados com experiência em machine learning e análise preditiva.',
      habilidades: [
        { nome: 'Python', nivel: 5 },
        { nome: 'Machine Learning', nivel: 5 },
        { nome: 'SQL', nivel: 4 },
        { nome: 'Data Visualization', nivel: 4 }
      ],
      fotoPerfil: 'https://randomuser.me/api/portraits/men/6.jpg',
      projetosCompletos: 28,
      categoria: 'Dados',
      tags: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
      nivel: 'Expert'
    }
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.updateVisibleSlides();
    this.highlightRandomFreelancers();
    this.startAutoplay();
  }

  ngAfterViewInit() {
    this.setCarouselVariables();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleSlides();
    this.setCarouselVariables();
    this.currentIndex = Math.min(this.currentIndex, this.freelancers.length - this.visibleSlides);
    if (this.currentIndex < 0) this.currentIndex = 0;
    this.updateCurrentPage();
  }

  setCarouselVariables() {
    if (this.carouselTrack) {
      this.carouselTrack.nativeElement.style.setProperty('--visible-slides', this.visibleSlides.toString());
    }
  }

  highlightRandomFreelancers() {
    // Highlight 1-2 random freelancers
    const totalHighlights = Math.floor(Math.random() * 2) + 1;
    const indices = new Set<number>();
    
    while (indices.size < totalHighlights) {
      indices.add(Math.floor(Math.random() * this.freelancers.length));
    }
    
    indices.forEach(index => {
      if (this.freelancers[index]) {
        this.freelancers[index].destaque = true;
        
        // Se já não tiver desconto, aplicar um desconto especial de destaque
        if (!this.freelancers[index].desconto) {
          this.freelancers[index].desconto = 15;
          // Calcular o valor original baseado no desconto
          const valorAtual = this.freelancers[index].valorHora;
          this.freelancers[index].valorOriginal = Math.round(valorAtual / (1 - 0.15));
        } else {
          // Aumentar o desconto existente
          this.freelancers[index].desconto += 5;
          // Recalcular o valor original
          const valorAtual = this.freelancers[index].valorHora;
          const descontoAtual = this.freelancers[index].desconto / 100;
          this.freelancers[index].valorOriginal = Math.round(valorAtual / (1 - descontoAtual));
        }
      }
    });
  }

  updateVisibleSlides() {
    const width = window.innerWidth;
    if (width < 768) {
      this.visibleSlides = 1;
    } else if (width < 1200) {
      this.visibleSlides = 2;
    } else {
      this.visibleSlides = 3;
    }
    this.updateCurrentPage();
  }

  nextSlide() {
    if (this.currentIndex < this.freelancers.length - this.visibleSlides && !this.isAnimating) {
      this.isAnimating = true;
      this.animationState = 'out';
      this.currentIndex++;
      this.updateCurrentPage();
    }
  }

  prevSlide() {
    if (this.currentIndex > 0 && !this.isAnimating) {
      this.isAnimating = true;
      this.animationState = 'out';
      this.currentIndex--;
      this.updateCurrentPage();
    }
  }

  onAnimationDone() {
    this.isAnimating = false;
    this.animationState = 'in';
  }
  
  getPages() {
    const totalPages = Math.ceil((this.freelancers.length - this.visibleSlides + 1) / 1);
    return new Array(totalPages);
  }
  
  goToPage(index: number) {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.animationState = 'out';
      this.currentIndex = index;
      this.currentPage = index;
    }
  }
  
  updateCurrentPage() {
    this.currentPage = Math.floor(this.currentIndex / 1);
  }
  
  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      if (this.currentIndex < this.freelancers.length - this.visibleSlides) {
        this.nextSlide();
      } else {
        this.currentIndex = 0;
        this.updateCurrentPage();
      }
    }, 5000);
  }
  
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }
  
  isButtonVisible(button: string): string {
    if (button === 'prev') {
      return this.currentIndex > 0 ? 'visible' : 'hidden';
    } else {
      return this.currentIndex < this.freelancers.length - this.visibleSlides ? 'visible' : 'hidden';
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.stopAutoplay();
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
    this.startAutoplay();
  }

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    const threshold = 50;
    if (diff > threshold) {
      this.nextSlide();
    } else if (diff < -threshold) {
      this.prevSlide();
    }
  }
    viewProfile(profile: Colaborador) {
    // Converte Colaborador para Servico antes de abrir o dialog
    const servicoData: Servico = {
      id: profile.id,
      titulo: profile.titulo,
      descricao: profile.descricao,
      preco: profile.valorHora,
      categoria: profile.categoria,
      subcategoria: profile.subcategoria,
      avaliacao: profile.avaliacao,
      totalAvaliacoes: profile.totalAvaliacoes || 0,
      colaboradorId: profile.id,
      nomeColaborador: profile.nome,
      fotoColaborador: profile.fotoPerfil,
      tempoEntrega: profile.tempoEntrega || 3,
      disponibilidade: profile.disponibilidade,
      nivel: profile.nivel
    };
    
    this.dialog.open(ServiceDetailsComponent, {
      data: servicoData
    });
  }

  hireFreelancer(profile: Colaborador) {
    // Converte Colaborador para Servico antes de navegar para a página de contrato
    const servicoData: Servico = {
      id: profile.id,
      titulo: profile.titulo,
      descricao: profile.descricao,
      preco: profile.valorHora,
      categoria: profile.categoria,
      subcategoria: profile.subcategoria,
      avaliacao: profile.avaliacao,
      totalAvaliacoes: profile.totalAvaliacoes || 0,
      colaboradorId: profile.id,
      nomeColaborador: profile.nome,
      fotoColaborador: profile.fotoPerfil,
      tempoEntrega: profile.tempoEntrega || 3,
      disponibilidade: profile.disponibilidade,
      nivel: profile.nivel
    };
    
    this.router.navigate(['/contrato', profile.id], {
      state: { serviceData: servicoData }
    });
  }
}
