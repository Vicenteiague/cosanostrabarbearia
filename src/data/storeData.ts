export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  originalPrice?: number;
  duration?: string;
  topBadge?: string;
  pillTag?: string;
  category:
    | 'mais-vendidos'
    | 'cortes'
    | 'barba'
    | 'progressiva'
    | 'pacotes'
    | 'produtos';
  bestSeller?: boolean;
  isCustomizable?: boolean;
  defaultSizeId?: string;
  containImage?: boolean;
  img: string;
}

export interface CustomSize {
  id: string;
  label: string;
  duration: string;
  price: number;
}

export interface CategoryItem {
  id: string;
  label: string;
  img?: string;
  isGridIcon?: boolean;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  role: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export const IMAGES = {
  logo: '/assets/cosanostra/logo.png',
  heroSlides: [
    '/assets/cosanostra/hero-1.jpg',
    '/assets/cosanostra/hero-2.jpg',
    '/assets/cosanostra/hero-3.jpg',
  ],
  heroSplash: '/assets/cosanostra/hero-1.jpg',
  corte: '/assets/cosanostra/service-corte.jpg',
  corteInfantil: '/assets/cosanostra/service-corte-infantil.jpg',
  sobrancelha: '/assets/cosanostra/service-sobrancelha.jpg',
  pacoteCortes: '/assets/cosanostra/service-pacote-cortes.jpg',
  progressiva: '/assets/cosanostra/service-progressiva.jpg',
  escovaCorte: '/assets/cosanostra/service-escova-corte.jpg',
  barbaMaquina: '/assets/cosanostra/service-barba-maquina.jpg',
  barbaTesoura: '/assets/cosanostra/service-barba-tesoura.jpg',
  barbaNavalha: '/assets/cosanostra/service-barba-navalha.jpg',
  barbaPacote: '/assets/cosanostra/service-barba-pacote.jpg',
  barbaPigmentacao: '/assets/cosanostra/service-barba-pigmentacao.jpg',
  prodGel: '/assets/cosanostra/product-gel.jpg',
  prodOleo: '/assets/cosanostra/product-oleo.jpg',
  prodShampoo: '/assets/cosanostra/product-shampoo.jpg',
  prodHidratante: '/assets/cosanostra/product-hidratante.jpg',
};

export const STORE_CONFIG = {
  name: 'Cosa Nostra Barbearia',
  slogan:
    'Tradição italiana encontra o estilo moderno. Cortes premium, barba impecável e produtos exclusivos para o homem que valoriza a excelência.',
  aboutText:
    'A Cosa Nostra Barbearia nasceu da paixão pela tradição italiana aliada ao estilo contemporâneo. Somos mais que uma barbearia — somos um refúgio masculino onde cada corte é uma obra de arte. Com profissionais altamente qualificados e produtos de primeira linha, garantimos uma experiência única que combina técnica impecável, ambiente sofisticado e atendimento personalizado.',
  city: 'Ponta Porã/MS',
  cityShort: 'Ponta Porã - MS',
  address: 'Av. Brasil, 5000 - Ponta Porã - MS',
  phoneDisplay: '(67) 9 9317-4612',
  whatsappNumber: '5567993174612',
  instagramUrl: 'https://www.instagram.com/',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Av+Brasil+5000+Ponta+Pora+MS',
  googleMapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.426280186347!2d-55.7132969254635!3d-22.52569892436112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94626fc36a5e31cf%3A0x84d4297281a87a15!2sStart%20Mkt%20Local%20-%20Ag%C3%AAncia%20de%20marketing!5e0!3m2!1spt-BR!2sbr!4v1762298523594!5m2!1spt-BR!2sbr',
  pixCode:
    '00020126360014BR.GOV.BCB.PIX0114+55679931746125204000053039865802BR5921Cosa Nostra Barbearia6009PontaPora62070503***6304',
  pixQrUrl:
    'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126360014BR.GOV.BCB.PIX0114+55679931746125204000053039865802BR5921Cosa%20Nostra%20Barbearia6009PontaPora62070503***6304',
  openingHours: [
    { days: 'Seg - Sex', hours: '08:00 às 20:00' },
    { days: 'Sábado', hours: '08:00 às 15:00' },
    { days: 'Domingo', hours: 'Fechado', closed: true },
  ],
  stats: [
    { value: '15+', label: 'Anos de Experiência' },
    { value: '5K+', label: 'Clientes Satisfeitos' },
    { value: '98%', label: 'Avaliação Positiva' },
    { value: '24h', label: 'Resposta WhatsApp' },
  ] as StatItem[],
  customSizes: [
    {
      id: 'corte-barba',
      label: 'Corte + Barba',
      duration: '50 min',
      price: 65.0,
    },
    {
      id: 'corte-sobrancelha',
      label: 'Corte + Sobrancelha',
      duration: '40 min',
      price: 55.0,
    },
    {
      id: 'escova-corte',
      label: 'Progressiva + Corte',
      duration: '90 min',
      price: 150.0,
    },
    {
      id: 'pacote-vip',
      label: 'Pacote Mensal Cortes',
      duration: '4 sessões',
      price: 150.0,
    },
  ] as CustomSize[],
  toppings: [
    'Toalha Quente Aromática',
    'Acabamento na Navalha',
    'Alinhamento de Sobrancelha',
    'Finalização Pomada Matte',
    'Óleo Essencial na Barba',
    'Massagem Facial Relaxante',
    'Lavagem Shampoo Premium',
    'Pigmentação de Contorno',
    'Hidratação Facial Express',
    'Café Expresso / Bebida Cortesia',
  ],
  timeSlots: [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '13:30',
    '14:30',
    '15:30',
    '16:30',
    '17:30',
    '18:30',
    '19:15',
  ],
  categories: [
    { id: 'todos', label: 'Tudo', isGridIcon: true },
    {
      id: 'mais-vendidos',
      label: 'Mais pedidos',
      img: IMAGES.corte,
    },
    {
      id: 'cortes',
      label: 'Cortes',
      img: IMAGES.corteInfantil,
    },
    {
      id: 'barba',
      label: 'Barba',
      img: IMAGES.barbaNavalha,
    },
    {
      id: 'progressiva',
      label: 'Progressiva',
      img: IMAGES.progressiva,
    },
    {
      id: 'pacotes',
      label: 'Pacotes VIP',
      img: IMAGES.pacoteCortes,
    },
    {
      id: 'produtos',
      label: 'Produtos',
      img: IMAGES.prodOleo,
    },
  ] as CategoryItem[],
  bestSellersCarousel: [
    {
      id: 1,
      topBadge: 'MAIS PEDIDO',
      name: 'Corte + Barba Completa',
      desc: 'Corte masculino personalizado com visagismo + barba alinhada com toalha quente.',
      price: 65.0,
      duration: '50 min',
      category: 'cortes',
      img: IMAGES.corte,
    },
    {
      id: 7,
      topBadge: 'NAVALHA & PIGMENTO',
      name: 'Barba Navalha + Pigmentação',
      desc: 'Design de barba na navalha com pigmentação para preenchimento e definição.',
      price: 55.0,
      duration: '40 min',
      category: 'barba',
      img: IMAGES.barbaNavalha,
    },
    {
      id: 10,
      topBadge: 'TRANSFORMAÇÃO',
      name: 'Escova Progressiva + Corte',
      desc: 'Alinhamento capilar completo com redução de volume, brilho natural e corte moderno.',
      price: 150.0,
      duration: '90 min',
      category: 'progressiva',
      img: IMAGES.escovaCorte,
    },
    {
      id: 4,
      topBadge: 'PACOTE VIP',
      name: 'Pacote Mensal de Cortes',
      desc: 'Pacote especial para manter o visual impecável durante todo o mês com economia.',
      price: 150.0,
      originalPrice: 200.0,
      duration: '4 sessões',
      category: 'pacotes',
      img: IMAGES.pacoteCortes,
    },
    {
      id: 13,
      topBadge: 'LINHA COSA NOSTRA',
      name: 'Óleo para Barba Premium',
      desc: 'Hidratação profunda, maciez e brilho natural com fragrância amadeirada.',
      price: 55.0,
      category: 'produtos',
      img: IMAGES.prodOleo,
    },
  ] as Product[],
  products: [
    {
      id: 1,
      topBadge: 'MAIS PEDIDO',
      pillTag: 'CORTES & BARBA',
      name: 'Corte + Barba',
      desc: 'Combo clássico Cosa Nostra: corte masculino de alta precisão + barba completa com toalha quente.',
      price: 65.0,
      duration: '50 min',
      category: 'cortes',
      bestSeller: true,
      img: IMAGES.corte,
    },
    {
      id: 2,
      pillTag: 'CORTES',
      name: 'Corte + Sobrancelha',
      desc: 'Corte moderno degrade, social ou executivo acompanhado de design e limpeza de sobrancelha.',
      price: 55.0,
      duration: '40 min',
      category: 'cortes',
      bestSeller: true,
      containImage: true,
      img: IMAGES.sobrancelha,
    },
    {
      id: 3,
      pillTag: 'INFANTIL',
      name: 'Corte Infantil',
      desc: 'Atendimento paciente e cuidadoso para os pequenos ficarem no estilo Cosa Nostra.',
      price: 35.0,
      duration: '30 min',
      category: 'cortes',
      containImage: true,
      img: IMAGES.corteInfantil,
    },
    {
      id: 4,
      topBadge: '-25% OFF',
      pillTag: 'PACOTE VIP',
      name: 'Pacote de Cortes',
      desc: 'Pacote exclusivo de cortes para manter o cabelo sempre alinhado com desconto especial.',
      price: 150.0,
      originalPrice: 200.0,
      duration: '4 sessões',
      category: 'pacotes',
      bestSeller: true,
      containImage: true,
      img: IMAGES.pacoteCortes,
    },
    {
      id: 5,
      pillTag: 'BARBA',
      name: 'Barba Máquina',
      desc: 'Aparagem rápida e uniforme na máquina com acabamento limpo no pescoço e contornos.',
      price: 25.0,
      duration: '20 min',
      category: 'barba',
      img: IMAGES.barbaMaquina,
    },
    {
      id: 6,
      pillTag: 'BARBA ARTESANAL',
      name: 'Barba Tesoura',
      desc: 'Modelagem artesanal na tesoura ideal para barbas médias e longas, preservando o volume.',
      price: 35.0,
      duration: '30 min',
      category: 'barba',
      img: IMAGES.barbaTesoura,
    },
    {
      id: 7,
      topBadge: 'MAIS PEDIDO',
      pillTag: 'BARBA & PIGMENTO',
      name: 'Barba Navalha + Pigmentação',
      desc: 'Barboterapia na navalha com toalha quente e pigmentação profissional para definição máxima.',
      price: 55.0,
      duration: '40 min',
      category: 'barba',
      bestSeller: true,
      img: IMAGES.barbaNavalha,
    },
    {
      id: 8,
      pillTag: 'BARBA',
      name: 'Barba Pigmentação',
      desc: 'Alinhamento e aplicação de pigmento específico para barba corrigindo falhas com naturalidade.',
      price: 45.0,
      duration: '30 min',
      category: 'barba',
      img: IMAGES.barbaPigmentacao,
    },
    {
      id: 9,
      topBadge: 'ECONOMIA',
      pillTag: 'PACOTE VIP',
      name: 'Pacote Barba + Corte',
      desc: 'Plano especial combinando sessões de corte e barba para você estar impecável toda semana.',
      price: 140.0,
      originalPrice: 185.0,
      duration: 'Pacote Mensal',
      category: 'pacotes',
      bestSeller: true,
      img: IMAGES.barbaPacote,
    },
    {
      id: 10,
      topBadge: 'COMPLETO',
      pillTag: 'PROGRESSIVA',
      name: 'Escova + Corte',
      desc: 'Escova progressiva masculina de alto padrão combinada com corte personalizado na sequência.',
      price: 150.0,
      duration: '90 min',
      category: 'progressiva',
      bestSeller: true,
      img: IMAGES.escovaCorte,
    },
    {
      id: 11,
      pillTag: 'QUÍMICA / ALINHAMENTO',
      name: 'Escova Progressiva',
      desc: 'Redução de volume, alinhamento dos fios e brilho natural com produtos profissionais seguros.',
      price: 120.0,
      duration: '60 min',
      category: 'progressiva',
      img: IMAGES.progressiva,
    },
    {
      id: 12,
      topBadge: '+4 MIMOS INCLUSOS',
      pillTag: 'PERSONALIZADO',
      name: 'Combo VIP Personalizado Cosa Nostra',
      desc: 'Monte seu atendimento escolhendo o serviço principal e até 4 cuidados extras inclusos.',
      price: 65.0,
      duration: '60 min',
      category: 'pacotes',
      bestSeller: true,
      isCustomizable: true,
      defaultSizeId: 'corte-barba',
      img: IMAGES.corte,
    },
    {
      id: 13,
      topBadge: 'PRODUTO',
      pillTag: 'CUIDADO BARBA',
      name: 'Óleo para Barba',
      desc: 'Hidratação e brilho natural para sua barba sem deixar aspecto oleoso.',
      price: 55.0,
      category: 'produtos',
      bestSeller: true,
      containImage: true,
      img: IMAGES.prodOleo,
    },
    {
      id: 14,
      topBadge: 'PRODUTO',
      pillTag: 'FINALIZAÇÃO',
      name: 'Gel de Cabelo Profissional',
      desc: 'Fixação forte e duradoura com acabamento profissional para o dia todo.',
      price: 45.0,
      category: 'produtos',
      containImage: true,
      img: IMAGES.prodGel,
    },
    {
      id: 15,
      topBadge: 'PRODUTO',
      pillTag: 'CABELO & BARBA',
      name: 'Shampoo Premium',
      desc: 'Limpeza profunda, frescor mentolado e nutrição para todos os tipos de cabelo.',
      price: 40.0,
      category: 'produtos',
      containImage: true,
      img: IMAGES.prodShampoo,
    },
    {
      id: 16,
      topBadge: 'PRODUTO',
      pillTag: 'SKINCARE MASCULINO',
      name: 'Hidratante Facial Pós-Barba',
      desc: 'Hidratação profunda com proteção diária e ação calmante após o barbear.',
      price: 65.0,
      category: 'produtos',
      containImage: true,
      img: IMAGES.prodHidratante,
    },
  ] as Product[],
  testimonials: [
    {
      name: 'Carlos Silva',
      role: 'Cliente Fidelidade · Corte + Barba',
      text: 'Excelente atendimento e corte impecável! Sempre saio satisfeito. A atenção aos detalhes é impressionante.',
      rating: 5,
    },
    {
      name: 'Ricardo Mendes',
      role: 'Cliente · Pacote Mensal',
      text: 'Ótima localização e horários flexíveis. Sempre consigo encaixar um horário na minha agenda.',
      rating: 5,
    },
    {
      name: 'João Pedro',
      role: 'Cliente · Barba Navalha + Pigmentação',
      text: 'Melhor barbearia da região! Profissionais qualificados e ambiente acolhedor. Super recomendo!',
      rating: 5,
    },
  ] as Testimonial[],
  faqs: [
    {
      question: 'Quais serviços a Cosa Nostra Barbearia realiza?',
      answer:
        'Realizamos cortes masculinos modernos e clássicos, corte infantil, design de sobrancelha, barba na máquina, tesoura ou navalha com toalha quente, pigmentação de barba, escova progressiva masculina, pacotes mensais econômicos e venda de produtos profissionais (gel, óleo para barba, shampoo e hidratante facial).',
    },
    {
      question: 'Como faço para agendar meu horário?',
      answer:
        'É muito rápido! Escolha os serviços desejados aqui no catálogo, toque em "Agendar / Adicionar", selecione a data e o horário de sua preferência e envie a confirmação direto para o nosso WhatsApp (67) 9 9317-4612.',
    },
    {
      question: 'Qual é o horário de funcionamento?',
      answer:
        'Atendemos de Segunda a Sexta das 08:00 às 20:00 e aos Sábados das 08:00 às 15:00. Aos domingos estamos fechados.',
    },
    {
      question: 'Onde fica localizada a barbearia?',
      answer:
        'Estamos localizados na Av. Brasil, 5000, em Ponta Porã - MS, com fácil acesso e estacionamento próximo.',
    },
  ],
};
