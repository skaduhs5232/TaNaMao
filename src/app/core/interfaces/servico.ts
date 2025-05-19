export interface Servico {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  categoria: string;
  subcategoria?: string;
  avaliacao?: number;
  totalAvaliacoes?: number;
  colaboradorId: string;
  nomeColaborador?: string;
  fotoColaborador?: string;
  imagemUrl?: string;
  tempoEntrega?: number;
  disponibilidade?: string;
  nivel?: string;
  certificacoes?: string[];
  portfolioItems?: PortifolioItem[];
}

export interface PortifolioItem {
    titulo: string;
    imagem: string;
    descricao: string;
}
