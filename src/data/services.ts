export type Service = {
  name: string;
  price: number;
  description: string;
};

export const services: Service[] = [
  {
    name: "Corte clássico",
    price: 20,
    description: "Corte tradicional com acabamento limpo e alinhado.",
  },
  {
    name: "Degrade",
    price: 25,
    description: "Transição suave na máquina com acabamento preciso.",
  },
  {
    name: "Degrade navalhado",
    price: 30,
    description: "Degrade com finalização na navalha para marcação mais limpa.",
  },
  {
    name: "Corte infantil",
    price: 30,
    description: "Atendimento cuidadoso para crianças, com corte e acabamento.",
  },
  {
    name: "Barba",
    price: 15,
    description: "Desenho, aparo e alinhamento da barba.",
  },
  {
    name: "Barboterapia",
    price: 30,
    description: "Ritual completo com cuidado, conforto e finalização premium.",
  },
  {
    name: "Pesinho",
    price: 10,
    description: "Limpeza do contorno para renovar o corte.",
  },
  {
    name: "Sobrancelha",
    price: 7,
    description: "Limpeza e alinhamento discreto da sobrancelha.",
  },
  {
    name: "Freestyle",
    price: 5,
    description: "Detalhe personalizado para finalizar o visual.",
  },
  {
    name: "Limpeza nasal",
    price: 8,
    description: "Higienização rápida para complementar o atendimento.",
  },
  {
    name: "Botox",
    price: 60,
    description: "Tratamento capilar para controle de volume e acabamento.",
  },
  {
    name: "Liso terapia",
    price: 45,
    description: "Tratamento para fios mais alinhados e com aspecto liso.",
  },
  {
    name: "Platinado",
    price: 90,
    description: "Processo de descoloração e tonalização para visual platinado.",
  },
  {
    name: "Luzes",
    price: 70,
    description: "Mechas e iluminação capilar com acabamento profissional.",
  },
  {
    name: "Limpeza de pele",
    price: 20,
    description: "Cuidado facial para renovar a pele antes ou depois do corte.",
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}
