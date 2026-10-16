export const nameSearchVariants = [
  'Flávio Bolsonaro',
  'flávio bolsonaro',
  'FLÁVIO BOLSONARO',
  'Flavio Bolsonaro',
  'flavio bolsonaro',
  'FLAVIO BOLSONARO',
] as const

const encodeQuery = (value: string) => encodeURIComponent(value)

export const sourceSearches = [
  {
    name: 'Intercept Brasil',
    buildUrl: (name: string) => `https://www.intercept.com.br/?s=${encodeQuery(name)}`,
  },
  {
    name: 'Aos Fatos',
    buildUrl: (name: string) => `https://www.aosfatos.org/noticias/?q=${encodeQuery(name)}`,
  },
  {
    name: 'YouTube',
    buildUrl: (name: string) => `https://www.youtube.com/results?search_query=${encodeQuery(name)}`,
  },
  {
    name: 'Flávio Mente',
    buildUrl: (name: string) => `https://flaviomente.com/?s=${encodeQuery(name)}`,
  }
] as const
