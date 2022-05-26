/* eslint-disable camelcase */
export interface Persona {
  id?: string;
  nombre: string;
  año_de_nacimiento: string;
  color_de_ojo: string;
  genero: string;
  color_de_pelo: string;
  altura: string;
  masa: string;
  color_de_piel: string;
  mundo_natal: string;
  peliculas: string[];
  especies: string[];
  naves_estelares: string[];
  vehiculos: string[];
  url: string;
  creado: string;
  editado: string;
}

export interface People {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
}
