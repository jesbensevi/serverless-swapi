import { Persona, People } from '../model/persona';

export const translatePeople = (people: People): Persona => {
  const persona: Persona = {
    nombre: people.name,
    año_de_nacimiento: people.birth_year,
    color_de_ojo: people.eye_color,
    genero: people.gender,
    color_de_pelo: people.hair_color,
    altura: people.height,
    masa: people.mass,
    color_de_piel: people.skin_color,
    mundo_natal: people.homeworld,
    peliculas: people.films,
    especies: people.species,
    naves_estelares: people.starships,
    vehiculos: people.vehicles,
    url: people.url,
    creado: people.created,
    editado: people.edited,
  };

  return persona;
};
