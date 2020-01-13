import React from "react";

export const SisterCities = props => {
  return props.cities.map((city, i) => {
    let sisterCityList = [];
    for (let i = 0; i < city.sisterCities.length; i++) {
      sisterCityList.push(<li key={i}>{city.sisterCities[i]}</li>);
    }

    return (
      <div key={i}>
        <h1>{city.mainCity}</h1>
        <ul>{sisterCityList}</ul>
      </div>
    );
  });
};
