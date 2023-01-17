import React from "react";
import "./Card.css";
export default function Card({ title, img, typeDiets, id }) {
  return (
    <div key={id} className="card">
      <div className="cd">
        <h3>{title}</h3>
        <img
          className="cardimg"
          src={
            img
              ? img
              : "https://img.freepik.com/vector-gratis/vector-ilustracion-dibujos-animados-varias-verduras-sobre-fondo-madera_1441-519.jpg?size=626&ext=jpg&ga=GA1.2.227501000.1662982549"
          }
          alt="img not found"
          width="100%"
        />
        <div className="tipes">
          TypeDiets:
          <ol>
            {" "}
            {typeDiets? typeDiets.map((e) =>
                e.name ? <li key={e.name}>{e.name}</li> : null
                ) : null}
          </ol>{" "}
        </div>
      </div>
    </div>
  );
}
