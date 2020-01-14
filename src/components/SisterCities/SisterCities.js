import React from "react";

export const SisterCities = props => {
  return props.cities.map((city, i) => {
    let sisterCityList = [];
    for (let i = 0; i < city.sisterCities.length; i++) {
      sisterCityList.push(<li key={i}>{city.sisterCities[i]}</li>);
    }

    return (
      <div className="city-card" key={i}>
        {city.mainCity.map((mainCity, j) => {
          return (
            <div className="city-card__header" key={j}>
              <h2>{mainCity.name}</h2>
            </div>
          );
        })}
        <ul>{sisterCityList}</ul>
      </div>
    );
  });
};
