import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Scissors,
  Star,
  Copy,
  Check,
  Search,
  LayoutGrid,
  List,
  Phone,
  Plus,
  Minus,
  Trash2,
  X,
  Calendar,
  Clock,
  ShoppingBag,
  Sun,
  Moon,
  User,
  Award,
} from 'lucide-react';
import { STORE_CONFIG, IMAGES, Product, CustomSize } from './data/storeData';

interface CartItem {
  cartItemId: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
  duration?: string;
  customDetails?: string;
}

function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

function WhatsAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.031 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.994 9.994 0 004.779 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.922-7.062A9.935 9.935 0 0012.031 2zm5.829 14.148c-.246.693-1.432 1.325-1.988 1.411-.51.078-1.156.111-1.869-.115-.432-.137-.986-.32-1.695-.626-2.984-1.288-4.933-4.293-5.082-4.492-.149-.199-1.214-1.615-1.214-3.081 0-1.466.768-2.187 1.041-2.485.273-.298.595-.373.794-.373.198 0 .397.002.57.01.183.009.428-.07.67.511.248.596.843 2.061.917 2.21.075.149.124.323.025.521-.099.199-.149.323-.298.497-.149.174-.313.388-.447.521-.149.149-.303.31-.13.608.174.298.771 1.272 1.656 2.061 1.138 1.014 2.097 1.329 2.395 1.478.298.149.471.124.645-.075.174-.199.744-.869.942-1.167.199-.298.397-.248.67-.149.273.099 1.736.819 2.034.968.298.149.496.224.57.348.075.124.075.72-.171 1.413z" />
    </svg>
  );
}

function PixDiamondIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2L2 12l10 10 10-10L12 2z" />
      <path d="M8.5 8.5l7 7" />
      <path d="M15.5 8.5l-7 7" />
    </svg>
  );
}

function SafeImage({
  src,
  alt,
  className,
  fallbackSrc = IMAGES.corte,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
      className={className}
      loading="lazy"
    />
  );
}

export default function App() {
  // Theme state (Dark default like Cosa Nostra Barbearia, with Light toggle)
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Hero background carousel (like Cosa Nostra site hero-1, hero-2, hero-3)
  const [heroSlide, setHeroSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % IMAGES.heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Pix Accordion & Copy state
  const [pixOpen, setPixOpen] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);

  // Catalog filter, search, sort, view mode, pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<
    'relevancia' | 'menor-preco' | 'maior-preco'
  >('relevancia');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Custom Combo Builder State (Inline + Modal)
  const [selectedSize, setSelectedSize] = useState<CustomSize>(
    STORE_CONFIG.customSizes[0]
  ); // Corte + Barba default
  const [selectedToppings, setSelectedToppings] = useState<string[]>([
    'Toalha Quente Aromática',
    'Acabamento na Navalha',
    'Alinhamento de Sobrancelha',
    'Finalização Pomada Matte',
  ]);
  const [builderModalOpen, setBuilderModalOpen] = useState(false);

  // Direct Schedule Modal (like Cosa Nostra AGENDAR SERVIÇO modal)
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingService, setBookingService] = useState<Product | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [bookingTime, setBookingTime] = useState('14:30');

  // Shopping / Booking Bag State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  // FAQ open states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Weekly Promo Countdown State
  const [countdown, setCountdown] = useState({
    days: 5,
    hours: 12,
    minutes: 38,
    seconds: 32,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              days = days > 0 ? days - 1 : 5;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setAddedToast(msg);
    setTimeout(() => {
      setAddedToast((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(STORE_CONFIG.pixCode);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  const toggleTopping = (topping: string) => {
    setSelectedToppings((prev) => {
      if (prev.includes(topping)) {
        return prev.filter((t) => t !== topping);
      }
      if (prev.length >= 4) {
        showToast('Máximo de 4 adicionais grátis atingido!');
        return prev;
      }
      return [...prev, topping];
    });
  };

  const addProductToCart = (product: Product) => {
    if (product.isCustomizable) {
      const matchedSize = STORE_CONFIG.customSizes.find(
        (s) => s.id === product.defaultSizeId
      );
      if (matchedSize) {
        setSelectedSize(matchedSize);
      }
      setBuilderModalOpen(true);
      return;
    }

    const cartItemId = `prod-${product.id}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          img: product.img,
          duration: product.duration,
        },
      ];
    });
    showToast(`${product.name} adicionado à lista!`);
  };

  const openDirectBooking = (product?: Product) => {
    setBookingService(product || STORE_CONFIG.products[0]);
    setBookingModalOpen(true);
  };

  const addCustomComboToCart = () => {
    const toppingsText =
      selectedToppings.length > 0
        ? selectedToppings.join(', ')
        : 'Padrão Cosa Nostra';
    const customName = `Combo VIP (${selectedSize.label})`;
    const cartItemId = `custom-${selectedSize.id}-${toppingsText}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: 999,
          name: customName,
          price: selectedSize.price,
          quantity: 1,
          img: IMAGES.corte,
          duration: selectedSize.duration,
          customDetails: `Cuidados inclusos: ${toppingsText}`,
        },
      ];
    });

    setBuilderModalOpen(false);
    showToast(`${customName} adicionado ao agendamento!`);
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalCartItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const totalCartPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const openExternalLink = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formatDateBR = (isoDate: string) => {
    if (!isoDate) return '';
    const parts = isoDate.split('-');
    if (parts.length !== 3) return isoDate;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  const confirmDirectBookingWhatsApp = () => {
    if (!bookingService) return;
    const formattedDate = formatDateBR(bookingDate);
    const lines = [
      '💈 *NOVO AGENDAMENTO - COSA NOSTRA BARBEARIA* 💈',
      '',
      `📋 *Serviço:* ${bookingService.name}`,
      `💰 *Valor:* ${formatBRL(bookingService.price)}`,
      bookingService.duration ? `⏱️ *Duração est.:* ${bookingService.duration}` : '',
      clientName.trim() ? `👤 *Cliente:* ${clientName.trim()}` : '',
      clientPhone.trim() ? `📱 *WhatsApp:* ${clientPhone.trim()}` : '',
      `📅 *Data:* ${formattedDate}`,
      `🕒 *Horário preferido:* ${bookingTime}`,
      '',
      'Aguardo confirmação do meu horário!',
    ].filter(Boolean);

    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
    setBookingModalOpen(false);
    openExternalLink(url);
  };

  const sendOrderToWhatsApp = () => {
    if (cart.length === 0) {
      const defaultUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        'Olá! Gostaria de agendar um horário na Cosa Nostra Barbearia.'
      )}`;
      openExternalLink(defaultUrl);
      return;
    }

    const formattedDate = formatDateBR(bookingDate);
    const lines = [
      '💈 *AGENDAMENTO / PEDIDO - COSA NOSTRA BARBEARIA* 💈',
      '',
      ...cart.map((item) => {
        const sub = formatBRL(item.price * item.quantity);
        const detail = item.customDetails ? `\n   _${item.customDetails}_` : '';
        return `• *${item.quantity}x ${item.name}* — ${sub}${detail}`;
      }),
      '',
      `*Total Estimado: ${formatBRL(totalCartPrice)}*`,
      clientName.trim() ? `👤 *Nome:* ${clientName.trim()}` : '',
      `📅 *Data preferida:* ${formattedDate} às ${bookingTime}`,
      '',
      'Poderia confirmar a disponibilidade de horário?',
    ].filter(Boolean);

    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
    openExternalLink(url);
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let list = [...STORE_CONFIG.products];

    if (activeCategory === 'mais-vendidos') {
      list = list.filter((p) => p.bestSeller);
    } else if (activeCategory !== 'todos') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'menor-preco') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'maior-preco') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage)
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <div className="min-h-screen bg-[#e5e5e7] dark:bg-[#08080a] text-[#111113] dark:text-[#fafafa] flex justify-center transition-colors duration-300">
      {/* Main Mobile-First BioSite Container (Exact structure of Açaí do Bela with Cosa Nostra theme) */}
      <main className="w-full max-w-[480px] bg-[#f4f4f6] dark:bg-[#0f0f12] min-h-screen shadow-2xl border-x border-black/5 dark:border-white/5 overflow-x-hidden relative pb-28 transition-colors duration-300">
        {/* Botão de Alternar Tema Claro/Escuro (Idêntico ao site Cosa Nostra Barbearia) */}
        <button
          type="button"
          onClick={() => setIsDark((prev) => !prev)}
          aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
          className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border-2 border-[#dc2626] text-[#dc2626] shadow-[0_0_20px_rgba(220,38,38,0.35)] flex items-center justify-center transition active:scale-95 cursor-pointer"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* 1. HERO / CABEÇALHO COM SLIDES DA COSA NOSTRA E ONDA */}
        <header className="relative bg-[#070709] text-white overflow-hidden">
          {/* Background Slideshow (Hero-1, Hero-2, Hero-3 da Cosa Nostra) */}
          <div className="absolute inset-0">
            {IMAGES.heroSlides.map((slideUrl, idx) => (
              <div
                key={slideUrl}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  idx === heroSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <SafeImage
                  src={slideUrl}
                  alt={`Cosa Nostra Barbearia Slide ${idx + 1}`}
                  className="w-full h-full object-cover object-center scale-105"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#09090b]/80 to-[#0f0f12]/95" />
          </div>

          {/* Controles discretos do Slide no Hero */}
          <button
            type="button"
            onClick={() =>
              setHeroSlide(
                (prev) =>
                  (prev - 1 + IMAGES.heroSlides.length) %
                  IMAGES.heroSlides.length
              )
            }
            aria-label="Slide anterior"
            className="absolute left-3 top-28 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-[#dc2626] border border-white/15 text-white flex items-center justify-center transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              setHeroSlide((prev) => (prev + 1) % IMAGES.heroSlides.length)
            }
            aria-label="Próximo slide"
            className="absolute right-3 top-28 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-[#dc2626] border border-white/15 text-white flex items-center justify-center transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="relative z-10 pt-10 pb-16 px-6 text-center flex flex-col items-center">
            {/* Circular Store Logo with Barber Red Halo Ring */}
            <div className="w-28 h-28 rounded-full p-2 bg-[#dc2626]/25 backdrop-blur-md border-2 border-[#dc2626] shadow-[0_0_30px_rgba(220,38,38,0.45)] mb-4 flex items-center justify-center">
              <SafeImage
                src={IMAGES.logo}
                fallbackSrc={IMAGES.corte}
                alt="Logo Cosa Nostra Barbearia"
                className="w-full h-full object-contain rounded-full bg-[#0b0b0e] p-1"
              />
            </div>

            <h1 className="font-display text-[30px] font-bold tracking-wider uppercase text-white leading-tight">
              {STORE_CONFIG.name}
            </h1>
            <div className="h-1 w-20 bg-[#dc2626] mx-auto mt-2 mb-2.5 rounded-full" />

            <p className="text-[13.5px] text-zinc-200 mt-1 max-w-[340px] leading-relaxed font-normal">
              {STORE_CONFIG.slogan}
            </p>

            {/* Especialidades */}
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[11px] tracking-[0.14em] uppercase text-white/95 mt-4 font-semibold">
              <span>CORTES</span>
              <span className="text-[#dc2626]">•</span>
              <span>BARBA</span>
              <span className="text-[#dc2626]">•</span>
              <span>PROGRESSIVA</span>
              <span className="text-[#dc2626]">•</span>
              <span>PACOTES</span>
              <span className="text-[#dc2626]">•</span>
              <span>PRODUTOS</span>
            </div>

            {/* Cidade + Indicadores do Slide */}
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById('onde-estamos')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#dc2626]/60 text-xs text-white font-medium transition cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#dc2626]" />
                <span>{STORE_CONFIG.city}</span>
              </button>
            </div>
          </div>

          {/* Wave Separator at the bottom of the Hero */}
          <div className="relative z-10 -mb-1">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-10 preserve-3d"
              preserveAspectRatio="none"
            >
              <path
                d="M0 64L80 58.7C160 53 320 43 480 48C640 53 800 75 960 80C1120 85 1280 75 1360 69.3L1440 64V120H1360C1280 120 1120 120 960 120C800 120 640 120 480 120C320 120 160 120 80 120H0V64Z"
                className="fill-[#f4f4f6] dark:fill-[#0f0f12] transition-colors duration-300"
              />
            </svg>
          </div>
        </header>

        {/* 2. LETREIRO ANIMADO (MARQUEE VERMELHO & PRETO INCLINADO) */}
        <div className="relative z-20 -mt-2 mb-3 -mx-2 transform -rotate-[1.2deg]">
          <div className="bg-gradient-to-r from-[#991b1b] via-[#dc2626] to-[#991b1b] text-white py-2.5 overflow-hidden shadow-[0_10px_30px_-10px_rgba(220,38,38,0.5)] border-y border-red-400/30 font-display font-bold text-xs tracking-[0.15em] uppercase">
            <div className="animate-marquee flex items-center gap-6">
              <span>TRADIÇÃO ITALIANA & ESTILO MODERNO</span>
              <span className="text-white">★</span>
              <span>CORTES MASCULINOS PREMIUM</span>
              <span className="text-white">★</span>
              <span>BARBA NA NAVALHA & TOALHA QUENTE</span>
              <span className="text-white">★</span>
              <span>TRADIÇÃO ITALIANA & ESTILO MODERNO</span>
              <span className="text-white">★</span>
              <span>CORTES MASCULINOS PREMIUM</span>
              <span className="text-white">★</span>
              <span>BARBA NA NAVALHA & TOALHA QUENTE</span>
              <span className="text-white">★</span>
            </div>
          </div>
        </div>

        {/* 3. LINKS DE NAVEGAÇÃO RÁPIDA (MESMA ESTRUTURA DO BIOSITE) */}
        <section
          className="px-4 pt-2 pb-3 space-y-3"
          aria-label="Links principais"
        >
          {/* CTA 1: Agendar Horário no WhatsApp (Card Vermelho Cosa Nostra Degradê) */}
          <button
            type="button"
            onClick={() => openDirectBooking(STORE_CONFIG.products[0])}
            className="w-full text-left flex items-center justify-between p-4 rounded-[24px] bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] text-white shadow-[0_10px_35px_-10px_rgba(220,38,38,0.55)] hover:brightness-110 transition active:scale-[0.99] cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-black/25 rounded-2xl flex items-center justify-center shrink-0 border border-white/15">
                <WhatsAppIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-black/25 px-2.5 py-0.5 rounded-full mb-1 border border-white/10">
                  <span>Atendimento rápido · 24h</span>
                </span>
                <b className="font-display tracking-wide uppercase block text-[17px] font-bold leading-snug">
                  Agendar Horário no WhatsApp
                </b>
                <small className="text-white/90 text-xs block mt-0.5">
                  Escolha seu serviço, data e horário
                </small>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/90 shrink-0" />
          </button>

          {/* CTA 2: Ver serviços e valores */}
          <button
            type="button"
            onClick={() =>
              document
                .getElementById('catalogo')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="w-full text-left flex items-center justify-between p-4 rounded-[24px] bg-white dark:bg-[#17171c] hover:border-[#dc2626] border border-zinc-200 dark:border-zinc-800 shadow-sm transition active:scale-[0.99] cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-[#dc2626] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <b className="font-display uppercase tracking-wide block text-[15px] font-bold text-zinc-900 dark:text-white">
                  Ver Serviços & Preços
                </b>
                <small className="text-zinc-500 dark:text-zinc-400 text-xs block mt-0.5">
                  Cortes, barba, progressiva e pacotes
                </small>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-400 shrink-0" />
          </button>

          {/* CTA 3: Pacote VIP da Semana */}
          <button
            type="button"
            onClick={() => {
              setActiveCategory('pacotes');
              document
                .getElementById('catalogo')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full text-left relative flex items-center justify-between p-4 rounded-[24px] bg-white dark:bg-[#17171c] hover:border-[#dc2626] border border-zinc-200 dark:border-zinc-800 shadow-sm transition active:scale-[0.99] overflow-hidden cursor-pointer"
          >
            {/* Badge VIP no canto superior direito */}
            <span className="absolute top-0 right-4 px-3 py-1 text-[10px] font-extrabold uppercase bg-[#dc2626] text-white rounded-b-xl tracking-wider shadow">
              DESTAQUE
            </span>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-[#dc2626] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <b className="font-display uppercase tracking-wide block text-[15px] font-bold text-zinc-900 dark:text-white">
                  Pacotes Mensais VIP
                </b>
                <small className="text-zinc-500 dark:text-zinc-400 text-xs block mt-0.5">
                  Pacote de Cortes e Barba com desconto
                </small>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-400 shrink-0 mt-2" />
          </button>

          {/* CTA 4: Pagar com Pix (Expansível) */}
          <div className="rounded-[24px] bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setPixOpen((prev) => !prev)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-[#dc2626] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                  <PixDiamondIcon className="w-5 h-5" />
                </div>
                <div>
                  <b className="font-display uppercase tracking-wide block text-[15px] font-bold text-zinc-900 dark:text-white">
                    Pagar com Pix
                  </b>
                  <small className="text-zinc-500 dark:text-zinc-400 text-xs block mt-0.5">
                    QR Code e Pix copia e cola
                  </small>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-zinc-400 transition-transform duration-200 ${
                  pixOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {pixOpen && (
              <div className="px-5 pb-5 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-center space-y-3 bg-zinc-50 dark:bg-[#121216]">
                <div className="w-40 h-40 mx-auto rounded-2xl p-2.5 bg-white border border-zinc-200 shadow-sm flex items-center justify-center">
                  <SafeImage
                    src={STORE_CONFIG.pixQrUrl}
                    alt="QR Code Pix Cosa Nostra Barbearia"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  Recebedor:{' '}
                  <b className="text-zinc-900 dark:text-white">
                    {STORE_CONFIG.name}
                  </b>
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  No aplicativo do seu banco, escolha <b>Pix › Ler QR Code</b>.
                  Se estiver no celular, copie o código abaixo e use{' '}
                  <b>Pix copia e cola</b>.
                </p>
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="w-full py-3 px-4 rounded-2xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
                >
                  {pixCopied ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Código Pix Copiado com Sucesso!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Chave / Código Pix</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* 4. CARDS DE AÇÃO EM DESTAQUE (Mesma estrutura empilhada do iFood & 99Food) */}
          <div className="pt-1 space-y-3">
            {/* Agendamento Rápido com Calendário */}
            <button
              type="button"
              onClick={() => openDirectBooking(STORE_CONFIG.products[0])}
              className="w-full text-left flex items-center justify-between p-4 rounded-[24px] bg-gradient-to-r from-[#b91c1c] to-[#7f1d1d] text-white shadow-md hover:brightness-110 transition active:scale-[0.99] border border-red-500/30 cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full border-2 border-white flex flex-col items-center justify-center shrink-0 bg-black/20">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <b className="font-display uppercase tracking-wide block text-[16px] font-bold text-white leading-snug">
                    Agendar Data & Horário
                  </b>
                  <small className="text-xs text-white/90 block mt-0.5">
                    Seg a Sex: 08h às 20h · Sáb: 08h às 15h
                  </small>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </button>

            {/* Comprar Produtos Profissionais Cosa Nostra */}
            <button
              type="button"
              onClick={() => {
                setActiveCategory('produtos');
                document
                  .getElementById('catalogo')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full text-left flex items-center justify-between p-4 rounded-[24px] bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-[#181100] shadow-md hover:brightness-105 transition active:scale-[0.99] cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full border-2 border-white bg-black/10 flex flex-col items-center justify-center shrink-0">
                  <ShoppingBag className="w-5 h-5 text-[#181100]" />
                </div>
                <div>
                  <b className="font-display uppercase tracking-wide block text-[16px] font-bold text-[#181100] leading-snug">
                    Produtos Profissionais
                  </b>
                  <small className="text-xs text-[#181100]/85 block mt-0.5">
                    Gel, Óleo para Barba, Shampoo e Hidratante
                  </small>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center shrink-0">
                <ChevronRight className="w-5 h-5 text-[#181100]" />
              </div>
            </button>
          </div>
        </section>

        {/* 5. CARROSSEL "MAIS PEDIDOS" */}
        <section className="py-5 px-4">
          <h2 className="font-display uppercase text-[24px] font-bold text-zinc-900 dark:text-white tracking-wide">
            Mais pedidos
          </h2>
          <div className="w-14 h-1.5 rounded-full bg-gradient-to-r from-[#dc2626] to-[#7f1d1d] mt-1 mb-2" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
            Deslize para ver os serviços e produtos campeões.
          </p>

          <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
            {STORE_CONFIG.bestSellersCarousel.map((item) => (
              <article
                key={item.id}
                onClick={() => addProductToCart(item)}
                className="flex-shrink-0 w-[210px] rounded-[24px] bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-800 hover:border-[#dc2626] shadow-sm overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-[0_10px_25px_-10px_rgba(220,38,38,0.4)] transition group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-[#121215]">
                    {item.topBadge && (
                      <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#dc2626] text-white font-bold text-[10px] uppercase tracking-wider shadow">
                        {item.topBadge}
                      </span>
                    )}
                    <SafeImage
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-3.5">
                    <h3 className="font-display uppercase tracking-wide text-[15px] font-bold text-zinc-900 dark:text-white line-clamp-2 leading-snug">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[17px] font-extrabold text-[#dc2626]">
                        {formatBRL(item.price)}
                      </span>
                      {item.duration && (
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          {item.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 6. MONTE SEU COMBO PERSONALIZADO NA BARBEARIA */}
        <section className="mx-4 my-3 p-5 rounded-[28px] bg-gradient-to-br from-[#141418] via-[#1c1417] to-[#2b0d0d] text-white border border-[#dc2626]/40 shadow-[0_10px_40px_-10px_rgba(220,38,38,0.3)] space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-extrabold uppercase bg-[#dc2626] text-white rounded-full">
                <Scissors className="w-3 h-3" />
                Experiência Cosa Nostra
              </span>
              <h2 className="font-display uppercase tracking-wide text-xl font-bold text-white mt-1.5">
                Monte seu Atendimento VIP
              </h2>
              <p className="text-xs text-zinc-300 mt-0.5">
                Escolha o serviço principal e até 4 cuidados extras sem custo
                adicional.
              </p>
            </div>
          </div>

          {/* Passo 1: Serviço Principal */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#f87171] block">
              1. Escolha o serviço principal:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {STORE_CONFIG.customSizes.map((s) => {
                const isSelected = selectedSize.id === s.id;
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setSelectedSize(s)}
                    className={`p-2.5 rounded-2xl border text-center transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#dc2626] text-white border-red-400 font-extrabold shadow-md'
                        : 'bg-white/5 border-white/15 text-zinc-200 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold">{s.label}</div>
                    <div className="text-[11px] opacity-90 mt-0.5">
                      {formatBRL(s.price)} · {s.duration}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Passo 2: Cuidados Extras */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#f87171]">
                2. Cuidados & detalhes inclusos (até 4):
              </label>
              <span className="text-[11px] text-zinc-300 font-semibold tabular-nums">
                {selectedToppings.length}/4 escolhidos
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {STORE_CONFIG.toppings.map((t) => {
                const active = selectedToppings.includes(t);
                return (
                  <button
                    type="button"
                    key={t}
                    onClick={() => toggleTopping(t)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                      active
                        ? 'bg-white text-[#111113] border-white font-bold shadow-sm'
                        : 'bg-white/5 border-white/15 text-zinc-200 hover:bg-white/10'
                    }`}
                  >
                    <span className="truncate pr-1">{t}</span>
                    {active && (
                      <Check className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={addCustomComboToCart}
            className="w-full py-3.5 rounded-2xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-display font-bold text-sm uppercase tracking-wider transition shadow-[0_10px_30px_-5px_rgba(220,38,38,0.5)] active:scale-[0.99] cursor-pointer"
          >
            + Adicionar Atendimento VIP ({formatBRL(selectedSize.price)})
          </button>
        </section>

        {/* 7. CATÁLOGO COMPLETO DE SERVIÇOS E PRODUTOS */}
        <section id="catalogo" className="py-5 px-4 space-y-4">
          <div>
            <h2 className="font-display uppercase text-[24px] font-bold text-zinc-900 dark:text-white tracking-wide">
              Nossos Serviços & Produtos
            </h2>
            <div className="w-14 h-1.5 rounded-full bg-gradient-to-r from-[#dc2626] to-[#7f1d1d] mt-1 mb-2.5" />
            <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Escolha o serviço ou produto, toque em{' '}
              <b className="text-zinc-900 dark:text-white">Agendar</b> ou{' '}
              <b className="text-zinc-900 dark:text-white">Adicionar</b> e
              confirme pelo WhatsApp.
            </p>
          </div>

          {/* Barra de Busca */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar corte, barba, progressiva ou produto..."
              className="w-full py-3.5 pl-4 pr-10 rounded-2xl bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#dc2626] shadow-xs"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <Search className="w-4 h-4 text-zinc-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            )}
          </div>

          {/* Categorias em Círculos (Story Style igual ao BioSite) */}
          <div className="flex gap-3.5 overflow-x-auto no-scrollbar py-1">
            {STORE_CONFIG.categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex flex-col items-center shrink-0 w-[76px] group cursor-pointer"
                >
                  <div
                    className={`w-[72px] h-[72px] rounded-full p-1 transition ${
                      isActive
                        ? 'border-[2.5px] border-[#dc2626] bg-[#dc2626]/15 shadow-[0_0_15px_rgba(220,38,38,0.35)]'
                        : 'border-2 border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#17171c]'
                    }`}
                  >
                    {cat.isGridIcon ? (
                      <div className="w-full h-full rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[#dc2626]">
                        <LayoutGrid className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    ) : (
                      <SafeImage
                        src={cat.img || IMAGES.corte}
                        alt={cat.label}
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </div>
                  <span
                    className={`text-[11px] mt-1.5 w-full truncate text-center ${
                      isActive
                        ? 'font-bold text-[#dc2626]'
                        : 'font-medium text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Linha de Relevância + Toggle Grid/Lista */}
          <div className="flex items-center justify-between pt-1">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | 'relevancia'
                      | 'menor-preco'
                      | 'maior-preco'
                  )
                }
                aria-label="Ordenar serviços e produtos"
                className="appearance-none bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-800 rounded-full py-2.5 pl-4 pr-9 text-xs font-medium text-zinc-900 dark:text-white shadow-2xs focus:outline-none focus:border-[#dc2626]"
              >
                <option value="relevancia">Relevância</option>
                <option value="menor-preco">Menor valor</option>
                <option value="maior-preco">Maior valor</option>
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="flex items-center bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-800 rounded-full p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Visualização em grade"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#dc2626] text-white'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                aria-label="Visualização em lista"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#dc2626] text-white'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Contador de produtos e página */}
          <div className="text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
            Exibindo {filteredProducts.length} itens · página {currentPage} de{' '}
            {totalPages}
          </div>

          {/* Grid / Lista de Serviços e Produtos */}
          {paginatedProducts.length === 0 ? (
            <div className="bg-white dark:bg-[#17171c] rounded-3xl p-8 text-center border border-zinc-200 dark:border-zinc-800 space-y-2">
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Nenhum item encontrado para "{searchQuery}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('todos');
                }}
                className="text-xs font-bold text-[#dc2626] underline cursor-pointer"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 gap-3'
                  : 'grid grid-cols-1 gap-3'
              }
            >
              {paginatedProducts.map((product) => (
                <article
                  key={product.id}
                  className={`rounded-[24px] bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-800 hover:border-[#dc2626]/70 shadow-xs overflow-hidden flex transition ${
                    viewMode === 'list'
                      ? 'flex-row items-center p-2.5 gap-3'
                      : 'flex-col justify-between p-2'
                  }`}
                >
                  {/* Imagem do Serviço/Produto */}
                  <div
                    className={`relative overflow-hidden rounded-[18px] bg-[#101014] shrink-0 ${
                      viewMode === 'list' ? 'w-28 h-28' : 'w-full h-44'
                    }`}
                  >
                    {product.topBadge && (
                      <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full bg-[#dc2626] text-white font-bold text-[10px] uppercase tracking-wider shadow">
                        {product.topBadge}
                      </span>
                    )}
                    <SafeImage
                      src={product.img}
                      alt={product.name}
                      className={`w-full h-full ${
                        product.containImage
                          ? 'object-contain p-2 bg-[#141418]'
                          : 'object-cover'
                      }`}
                    />
                  </div>

                  {/* Corpo do Card */}
                  <div className="flex flex-col justify-between flex-1 px-1.5 pt-2.5 pb-1">
                    <div>
                      <h3 className="font-display uppercase tracking-wide text-[15px] font-bold text-zinc-900 dark:text-white line-clamp-2 leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                        {product.desc}
                      </p>

                      {product.duration && (
                        <div className="mt-1.5 text-[11px] text-zinc-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#dc2626]" />
                          <span>{product.duration}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-2.5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[17px] font-extrabold text-[#dc2626] tabular-nums">
                          {formatBRL(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] text-zinc-400 line-through tabular-nums">
                            {formatBRL(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      <div className="mt-2.5 grid grid-cols-1 gap-1.5">
                        <button
                          type="button"
                          onClick={() => addProductToCart(product)}
                          className="w-full py-2.5 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold text-xs transition active:scale-[0.98] shadow-xs cursor-pointer"
                        >
                          {product.category === 'produtos'
                            ? 'Comprar / Adicionar'
                            : 'Agendar / Adicionar'}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4 pb-2">
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                (page) => (
                  <button
                    type="button"
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      document
                        .getElementById('catalogo')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-11 h-11 rounded-2xl font-semibold text-sm transition cursor-pointer ${
                      currentPage === page
                        ? 'bg-[#dc2626] text-white shadow-sm'
                        : 'bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:border-[#dc2626]'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              {currentPage < totalPages && (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    document
                      .getElementById('catalogo')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  aria-label="Próxima página"
                  className="w-11 h-11 rounded-2xl bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-[#dc2626] flex items-center justify-center font-semibold text-sm transition cursor-pointer"
                >
                  ›
                </button>
              )}
            </div>
          )}
        </section>

        {/* 8. PROMOÇÃO DA SEMANA COM CONTADOR REGRESSIVO (PADRÃO COSA NOSTRA) */}
        <section className="px-4 py-3">
          <div className="rounded-[28px] overflow-hidden shadow-xl bg-gradient-to-b from-[#1a1a20] via-[#2b1215] to-[#991b1b] text-white border border-[#dc2626]/40">
            {/* Banner Superior com Badge -25% */}
            <div className="relative h-60 w-full bg-[#0d0d10] overflow-hidden">
              <SafeImage
                src={IMAGES.pacoteCortes}
                alt="Promoção Pacote de Cortes Cosa Nostra"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              {/* Overlay Tipográfico PACOTE VIP */}
              <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-xs border border-[#dc2626] rounded-2xl px-3.5 py-2 shadow-lg">
                <span className="block text-[11px] font-black uppercase text-red-400 tracking-wider">
                  PLANO MENSAL
                </span>
                <span className="font-display block text-xl font-bold uppercase text-white leading-none mt-0.5">
                  PACOTE CORTES
                </span>
                <span className="block text-[10px] font-semibold text-zinc-300 mt-1">
                  Cosa Nostra Barbearia
                </span>
              </div>

              {/* Selo -25% inclinado no canto superior direito */}
              <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-xl bg-[#dc2626] text-white font-extrabold text-xs rotate-6 shadow-md">
                -25% OFF
              </span>
            </div>

            {/* Conteúdo da Promoção */}
            <div className="p-5 space-y-4">
              <div>
                <h2 className="font-display uppercase tracking-wide text-[24px] font-bold text-white leading-snug">
                  Promoção da semana
                </h2>
                <div className="w-14 h-1.5 rounded-full bg-[#dc2626] mt-1.5 mb-3" />
                <p className="text-[13.5px] text-white/95 leading-relaxed">
                  Garanta o Pacote de Cortes ou Pacote Barba + Corte com valor
                  promocional. Mantenha o corte alinhado toda semana com
                  economia. De R$ 200,00 por R$ 150,00.
                </p>
              </div>

              {/* Caixa Destacada */}
              <div className="rounded-2xl bg-black/30 border border-white/20 p-4 flex items-center justify-between gap-3">
                <div className="text-sm font-medium text-white leading-snug">
                  Pacote de Cortes VIP |
                  <br />4 Sessões + Acabamento Navalha
                </div>
                <div className="text-lg font-extrabold text-white whitespace-nowrap tabular-nums">
                  R$ 150,00
                </div>
              </div>

              {/* Cronômetro 4 Colunas */}
              <div className="grid grid-cols-4 gap-2.5">
                <div className="rounded-2xl bg-black/30 border border-white/20 py-3 text-center">
                  <div className="text-xl font-bold text-white tabular-nums">
                    {countdown.days}
                  </div>
                  <div className="text-[11px] text-white/85 mt-0.5">dias</div>
                </div>
                <div className="rounded-2xl bg-black/30 border border-white/20 py-3 text-center">
                  <div className="text-xl font-bold text-white tabular-nums">
                    {String(countdown.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-white/85 mt-0.5">horas</div>
                </div>
                <div className="rounded-2xl bg-black/30 border border-white/20 py-3 text-center">
                  <div className="text-xl font-bold text-white tabular-nums">
                    {String(countdown.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-white/85 mt-0.5">min</div>
                </div>
                <div className="rounded-2xl bg-black/30 border border-white/20 py-3 text-center">
                  <div className="text-xl font-bold text-white tabular-nums">
                    {String(countdown.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-white/85 mt-0.5">seg</div>
                </div>
              </div>

              {/* Botão Garantir Pacote */}
              <button
                type="button"
                onClick={() => openDirectBooking(STORE_CONFIG.products[3])}
                className="block w-full py-4 rounded-2xl bg-[#0f0f12] hover:bg-black text-white font-display uppercase tracking-wider font-bold text-sm text-center shadow-md transition active:scale-[0.99] border border-white/15 cursor-pointer"
              >
                Garantir Pacote pelo WhatsApp
              </button>
            </div>
          </div>
        </section>

        {/* 9. QUEM SOMOS + ESTATÍSTICAS + DEPOIMENTOS + FAQ */}
        <section className="px-4 py-6 space-y-7">
          {/* Quem Somos (Texto e Números oficiais da Cosa Nostra Barbearia) */}
          <div>
            <h2 className="font-display uppercase text-[24px] font-bold text-zinc-900 dark:text-white tracking-wide">
              Quem Somos
            </h2>
            <div className="w-14 h-1.5 rounded-full bg-gradient-to-r from-[#dc2626] to-[#7f1d1d] mt-1 mb-3.5" />
            <p className="text-[13.5px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {STORE_CONFIG.aboutText}
            </p>

            {/* Grid 2x2 de Estatísticas da Cosa Nostra */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {STORE_CONFIG.stats.map((st) => (
                <div
                  key={st.label}
                  className="p-3.5 rounded-2xl bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-800 text-center shadow-2xs"
                >
                  <div className="font-display text-2xl font-bold text-[#dc2626] tabular-nums">
                    {st.value}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Depoimentos Reais da Cosa Nostra Barbearia */}
          <div>
            <h2 className="font-display uppercase text-[24px] font-bold text-zinc-900 dark:text-white tracking-wide">
              Depoimentos
            </h2>
            <div className="w-14 h-1.5 rounded-full bg-gradient-to-r from-[#dc2626] to-[#7f1d1d] mt-1 mb-3.5" />
            <div className="space-y-3">
              {STORE_CONFIG.testimonials.map((t) => (
                <div
                  key={t.name}
                  className="p-4 rounded-2xl bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-2xs"
                >
                  <div className="flex items-center gap-1 text-[#dc2626]">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-[#dc2626] text-[#dc2626]"
                      />
                    ))}
                  </div>
                  <p className="text-xs italic text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    "{t.text}"
                  </p>
                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="font-display uppercase text-sm font-bold text-zinc-900 dark:text-white">
                      {t.name}
                    </span>
                    <span className="text-[11px] text-zinc-400">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Perguntas Frequentes */}
          <div>
            <h2 className="font-display uppercase text-[24px] font-bold text-zinc-900 dark:text-white tracking-wide">
              Perguntas frequentes
            </h2>
            <div className="w-14 h-1.5 rounded-full bg-gradient-to-r from-[#dc2626] to-[#7f1d1d] mt-1 mb-4" />

            <div className="space-y-2.5">
              {STORE_CONFIG.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={faq.question}
                    className="rounded-2xl bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-800 overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center gap-2.5 font-semibold text-[14px] text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition cursor-pointer"
                    >
                      <span
                        className={`text-xs text-[#dc2626] transition-transform duration-200 ${
                          isOpen ? 'rotate-90' : ''
                        }`}
                      >
                        ▶
                      </span>
                      <span>{faq.question}</span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10. ONDE ESTAMOS + MAPA + RODAPÉ BIOSITE COSA NOSTRA */}
        <section id="onde-estamos" className="px-4 pt-2 pb-5 space-y-4">
          <div>
            <h2 className="font-display uppercase text-[24px] font-bold text-zinc-900 dark:text-white tracking-wide">
              Nossa Localização
            </h2>
            <div className="w-14 h-1.5 rounded-full bg-gradient-to-r from-[#dc2626] to-[#7f1d1d] mt-1 mb-2" />
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              {STORE_CONFIG.address}
            </p>

            {/* Mapa Incorporado Oficial do Site Cosa Nostra */}
            <div className="mt-3 rounded-2xl overflow-hidden border-2 border-[#dc2626] shadow-md h-48 bg-zinc-900">
              <iframe
                src={STORE_CONFIG.googleMapsEmbed}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Cosa Nostra Barbearia"
                className="w-full h-full border-0"
              />
            </div>

            {/* Botões Como chegar e Ligar */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <a
                href={STORE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#dc2626] to-[#991b1b] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:brightness-110 transition"
              >
                <MapPin className="w-4 h-4" />
                <span>Como chegar</span>
              </a>
              <a
                href={`tel:+${STORE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 rounded-2xl bg-white dark:bg-[#17171c] border-[1.5px] border-[#dc2626] text-zinc-900 dark:text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-red-500/10 transition"
              >
                <Phone className="w-4 h-4 text-[#dc2626]" />
                <span>Ligar</span>
              </a>
            </div>
          </div>
        </section>

        {/* Card de Rodapé (BioSite Style com Cores Cosa Nostra) */}
        <footer className="mt-2 rounded-t-[36px] bg-gradient-to-b from-[#16161b] via-[#121216] to-[#09090b] border-t-4 border-[#dc2626] text-white px-5 pt-9 pb-12 text-center space-y-4 shadow-inner">
          {/* Logo Circular com Borda Vermelha */}
          <div className="w-20 h-20 mx-auto rounded-full p-1.5 bg-black border-2 border-[#dc2626] shadow-[0_0_25px_rgba(220,38,38,0.4)]">
            <SafeImage
              src={IMAGES.logo}
              fallbackSrc={IMAGES.corte}
              alt="Logo Cosa Nostra Barbearia"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <div className="space-y-1">
            <h3 className="font-display uppercase tracking-wider text-2xl font-bold text-white">
              {STORE_CONFIG.name}
            </h3>
            <p className="text-xs text-zinc-300 max-w-xs mx-auto leading-relaxed">
              {STORE_CONFIG.slogan}
            </p>
          </div>

          {/* Cards de Endereço, Contato e Horários */}
          <div className="space-y-2.5 pt-1 text-left">
            <a
              href={STORE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#dc2626] transition"
            >
              <div className="w-10 h-10 rounded-xl bg-[#dc2626]/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#dc2626]" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 block">
                  Endereço
                </span>
                <span className="text-sm font-medium text-white">
                  {STORE_CONFIG.address}
                </span>
              </div>
            </a>

            <a
              href={`tel:+${STORE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#dc2626] transition"
            >
              <div className="w-10 h-10 rounded-xl bg-[#dc2626]/20 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#dc2626]" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 block">
                  Contato / WhatsApp
                </span>
                <span className="text-sm font-medium text-white">
                  {STORE_CONFIG.phoneDisplay}
                </span>
              </div>
            </a>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#dc2626]/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#dc2626]" />
              </div>
              <div className="text-xs space-y-0.5">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 block">
                  Horário de Funcionamento
                </span>
                <p className="text-white font-medium">
                  Seg - Sex: 08:00 às 20:00 · Sáb: 08:00 às 15:00
                </p>
                <p className="text-[#f87171] font-semibold">Domingo: Fechado</p>
              </div>
            </div>
          </div>

          {/* Botão Instagram */}
          <div className="pt-1">
            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-sm font-medium text-white transition"
            >
              <span className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="w-3.5 h-3.5 text-white"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </span>
              <span>Instagram</span>
            </a>
          </div>

          <hr className="border-white/10 my-4" />

          {/* Créditos do Rodapé */}
          <div className="space-y-1.5 text-xs text-zinc-400 pt-1">
            <p>
              © {new Date().getFullYear()}{' '}
              <b className="text-white">{STORE_CONFIG.name}</b>. Todos os
              direitos reservados.
            </p>
            <button
              type="button"
              onClick={() => setTermsModalOpen(true)}
              className="text-zinc-300 hover:text-white hover:underline pt-1 block mx-auto cursor-pointer"
            >
              Termos de uso e privacidade
            </button>
          </div>
        </footer>

        {/* TOAST DE ITEM ADICIONADO */}
        {addedToast && (
          <div className="fixed top-4 inset-x-4 max-w-[440px] mx-auto z-50 bg-[#141418] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#dc2626] flex items-center justify-between text-xs font-semibold">
            <span>✓ {addedToast}</span>
            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              className="text-[#f87171] font-bold underline ml-2 cursor-pointer"
            >
              Ver lista
            </button>
          </div>
        )}

        {/* 11. BARRA FLUTUANTE DE AGENDAMENTO + BOTÃO FLUTUANTE WHATSAPP */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 left-4 right-20 max-w-[380px] mx-auto bg-[#141418] text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between z-40 border border-[#dc2626]">
            <div
              onClick={() => setCartDrawerOpen(true)}
              className="cursor-pointer"
            >
              <b className="text-xs block">
                {totalCartItems}{' '}
                {totalCartItems === 1 ? 'item selecionado' : 'itens selecionados'}
              </b>
              <small className="text-[#f87171] text-xs font-extrabold tabular-nums">
                Total: {formatBRL(totalCartPrice)}
              </small>
            </div>
            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              className="px-3.5 py-2 bg-[#dc2626] text-white font-extrabold text-xs rounded-xl hover:bg-[#b91c1c] transition cursor-pointer"
            >
              Agendar Agora
            </button>
          </div>
        )}

        {/* Botão Redondo Verde do WhatsApp no Canto Inferior Direito */}
        <button
          type="button"
          onClick={() => {
            if (cart.length > 0) {
              setCartDrawerOpen(true);
            } else {
              openDirectBooking(STORE_CONFIG.products[0]);
            }
          }}
          aria-label="Agendar pelo WhatsApp"
          className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-[#00c800] hover:bg-[#009600] text-white shadow-xl flex items-center justify-center z-50 transition transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <WhatsAppIcon className="w-7 h-7 text-white" />
          {totalCartItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#dc2626] text-white text-[10px] font-extrabold flex items-center justify-center border border-white tabular-nums">
              {totalCartItems}
            </span>
          )}
        </button>

        {/* MODAL 1: AGENDAMENTO DIRETO (IGUAL AO SITE COSA NOSTRA BARBEARIA) */}
        {bookingModalOpen && bookingService && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-800 w-full max-w-[440px] rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#dc2626]" />
                  <h3 className="font-display uppercase tracking-wide text-xl font-bold text-zinc-900 dark:text-white">
                    Agendar Serviço
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Resumo do Serviço Selecionado */}
              <div className="p-3.5 rounded-2xl bg-[#dc2626]/10 border border-[#dc2626]/30 flex items-center gap-3">
                <SafeImage
                  src={bookingService.img}
                  alt={bookingService.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">
                    Serviço selecionado:
                  </span>
                  <h4 className="font-display uppercase text-base font-bold text-zinc-900 dark:text-white truncate">
                    {bookingService.name}
                  </h4>
                  <span className="text-base font-extrabold text-[#dc2626]">
                    {formatBRL(bookingService.price)}
                  </span>
                </div>
              </div>

              {/* Trocar Serviço Rápido */}
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">
                  Deseja alterar o serviço?
                </label>
                <select
                  value={bookingService.id}
                  onChange={(e) => {
                    const found = STORE_CONFIG.products.find(
                      (p) => p.id === Number(e.target.value)
                    );
                    if (found) setBookingService(found);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-zinc-50 dark:bg-[#101014] border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                >
                  {STORE_CONFIG.products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {formatBRL(p.price)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nome e WhatsApp */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Seu Nome
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Digite seu nome"
                      className="w-full py-2.5 pl-10 pr-3 rounded-xl bg-zinc-50 dark:bg-[#101014] border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#dc2626]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Seu WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="(67) 99999-9999"
                      className="w-full py-2.5 pl-10 pr-3 rounded-xl bg-zinc-50 dark:bg-[#101014] border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#dc2626]"
                    />
                  </div>
                </div>

                {/* Data e Horário */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                      Data do Agendamento
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl bg-zinc-50 dark:bg-[#101014] border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#dc2626]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                      Horário Preferido
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl bg-zinc-50 dark:bg-[#101014] border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#dc2626]"
                    >
                      {STORE_CONFIG.timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={confirmDirectBookingWhatsApp}
                className="w-full py-3.5 rounded-2xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-display uppercase tracking-wider font-bold text-sm flex items-center justify-center gap-2 shadow-[0_10px_25px_-5px_rgba(220,38,38,0.5)] transition cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Confirmar Agendamento</span>
              </button>
            </div>
          </div>
        )}

        {/* MODAL 2: PERSONALIZAR COMBO VIP */}
        {builderModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-800 w-full max-w-[460px] rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#dc2626]/15 text-[#dc2626]">
                    +4 Cuidados Inclusos
                  </span>
                  <h3 className="font-display uppercase text-lg font-bold text-zinc-900 dark:text-white mt-1">
                    Monte seu Combo Cosa Nostra
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setBuilderModalOpen(false)}
                  className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#dc2626] block">
                  1. Serviço Principal:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {STORE_CONFIG.customSizes.map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setSelectedSize(s)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between transition cursor-pointer ${
                        selectedSize.id === s.id
                          ? 'bg-[#dc2626] text-white border-[#dc2626] font-bold'
                          : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white'
                      }`}
                    >
                      <span className="text-xs">{s.label}</span>
                      <span className="text-xs font-extrabold">
                        {formatBRL(s.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#dc2626]">
                    2. Escolha até 4 cuidados inclusos:
                  </label>
                  <span className="text-xs font-semibold text-zinc-400">
                    {selectedToppings.length}/4
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {STORE_CONFIG.toppings.map((t) => {
                    const active = selectedToppings.includes(t);
                    return (
                      <button
                        type="button"
                        key={t}
                        onClick={() => toggleTopping(t)}
                        className={`p-2.5 rounded-xl border text-left text-xs flex items-center justify-between transition cursor-pointer ${
                          active
                            ? 'bg-[#dc2626]/15 border-[#dc2626] text-zinc-900 dark:text-white font-bold'
                            : 'bg-white dark:bg-[#101014] border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300'
                        }`}
                      >
                        <span className="truncate pr-1">{t}</span>
                        {active && (
                          <Check className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={addCustomComboToCart}
                className="w-full py-3.5 rounded-2xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-display uppercase tracking-wider font-bold text-sm shadow-md transition cursor-pointer"
              >
                Confirmar e Adicionar ({formatBRL(selectedSize.price)})
              </button>
            </div>
          </div>
        )}

        {/* DRAWER DA SACOLA / RESUMO DE AGENDAMENTO WHATSAPP */}
        {cartDrawerOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-800 w-full max-w-[460px] rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[88vh] flex flex-col shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <div>
                  <h3 className="font-display uppercase text-lg font-bold text-zinc-900 dark:text-white">
                    Seu Agendamento / Pedido
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Confira os serviços e produtos antes de enviar no WhatsApp
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCartDrawerOpen(false)}
                  className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 py-1">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-zinc-50 dark:bg-[#101014] border border-zinc-200 dark:border-zinc-800"
                  >
                    <SafeImage
                      src={item.img}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display uppercase text-xs font-bold text-zinc-900 dark:text-white truncate">
                        {item.name}
                      </h4>
                      {item.customDetails && (
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-0.5">
                          {item.customDetails}
                        </p>
                      )}
                      <div className="text-xs font-extrabold text-[#dc2626] mt-1 tabular-nums">
                        {formatBRL(item.price * item.quantity)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-700 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.cartItemId, -1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                        aria-label="Diminuir quantidade"
                      >
                        {item.quantity === 1 ? (
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        ) : (
                          <Minus className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <span className="text-xs font-bold w-5 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.cartItemId, 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[#dc2626] hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Campos Rápidos de Data/Horário na Sacola */}
                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-[#101014] border border-zinc-200 dark:border-zinc-800 space-y-2.5">
                  <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    Preferência de Data e Horário:
                  </div>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Seu nome (opcional)"
                    className="w-full py-2 px-3 rounded-xl bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full py-2 px-2.5 rounded-xl bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                    />
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full py-2 px-2.5 rounded-xl bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                    >
                      {STORE_CONFIG.timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 space-y-3">
                <div className="flex items-center justify-between text-base font-extrabold text-zinc-900 dark:text-white">
                  <span>Total Estimado</span>
                  <span className="text-[#dc2626] tabular-nums">
                    {formatBRL(totalCartPrice)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={sendOrderToWhatsApp}
                  className="w-full py-4 rounded-2xl bg-[#00c800] hover:bg-[#009600] text-white font-display uppercase tracking-wider font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Confirmar pelo WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL TERMOS DE USO E PRIVACIDADE */}
        {termsModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-800 w-full max-w-[420px] rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-display uppercase text-base font-bold text-zinc-900 dark:text-white">
                  Termos de uso e privacidade
                </h3>
                <button
                  type="button"
                  onClick={() => setTermsModalOpen(false)}
                  className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Este BioSite e agenda digital facilita a escolha de serviços,
                produtos e envio do seu agendamento diretamente para o WhatsApp
                oficial da <b>Cosa Nostra Barbearia</b> em Ponta Porã - MS.
                Nenhum dado pessoal ou bancário é armazenado neste site.
              </p>
              <button
                type="button"
                onClick={() => setTermsModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#dc2626] text-white font-semibold text-xs cursor-pointer"
              >
                Entendi
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
