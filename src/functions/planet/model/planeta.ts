/* eslint-disable camelcase */
export interface Planeta {
  id?: string;
  nombre: string;
  periodo_de_rotacion: string;
  periodo_de_orbitacion: string;
  diámetro: string;
  clima: string;
  gravedad: string;
  terreno: string;
  agua_superficial: string;
  población: string;
  residentes: string[];
  peliculas: string[];
  creado: string;
  editado: string;
  url: string;
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}
