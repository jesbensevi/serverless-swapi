import { Planet, Planeta } from '../model/planeta';

export const translatePlaneta = (planet: Planet): Planeta => {
  const planete: Planeta = {
    nombre: planet.name,
    periodo_de_rotacion: planet.rotation_period,
    periodo_de_orbitacion: planet.orbital_period,
    diámetro: planet.diameter,
    clima: planet.climate,
    gravedad: planet.gravity,
    terreno: planet.terrain,
    agua_superficial: planet.surface_water,
    población: planet.population,
    residentes: planet.residents,
    peliculas: planet.films,
    creado: planet.created,
    editado: planet.edited,
    url: planet.url,
  };
  return planete;
};
