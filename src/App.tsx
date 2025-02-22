import { ReactElement, useState } from "react";
import { Rustle } from "./Rustle";
import "./App.css"

enum Nav {
  Home,
  Synth,
  Recipes
}

export default function App() {

  const [nav, setNav] = useState(Nav.Home);

  const body = (): ReactElement => {
    switch (nav) {
      case Nav.Home: return (
        <div style={
          {
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }} >
          <h1>Welcome to my cool Webpage, we have:</h1>
          <ul style={{ fontSize: 28 }}>
            <li onClick={() => setNav(Nav.Synth)}>
              <span className="link">Toy Synth</span>
            </li>
            <li onClick={() => setNav(Nav.Recipes)}>
              <span className="link">Recipes</span>
            </li>
            <li>
              <span className="link">Fun, fun and more fun</span>
            </li>
          </ul>
        </div >
      )
      case Nav.Recipes: return (
        <div style={
          {
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }} >
          <h2>Rezepte</h2>
          <ul>
            <h3>Chefkoch</h3>
            <li><a href="https://www.chefkoch.de/rezepte/2319301369741654/Chana-Dal-Masala.html">Chana Dal Masala</a></li>
            <li><a href="https://www.chefkoch.de/rezepte/837601188560864/Kartoffelgratin.html">Kartoffelgratin</a></li>
            <li><a href="https://www.chefkoch.de/rezepte/1716851280413039/Einfacher-Zwiebelkuchen.html">Zwiebelkuchen</a></li>
            <li><a href="https://www.chefkoch.de/rezepte/2114131340630587/Vegetarische-Spinat-Gemuese-Lasagne-mit-Tomatensosse.html">Spinat-Gemüselasagne</a></li>
            <li><a href="https://www.chefkoch.de/rezepte/1810471293281955/Paprika-Reispfanne-mit-Joghurtsauce.html">Paprika Reispfanne</a></li>
            <li><a href="https://www.chefkoch.de/rezepte/1841351298407440/Haferflocken-Kaese-Bratlinge.html">Haferflocken Käse Bratlinge</a></li>
            <li><a href="https://www.chefkoch.de/rezepte/595441159189225/Chili-sin-Carne.html">Chili Sin Carne</a></li>
            <li><a href="https://www.chefkoch.de/rezepte/3735491566893477/Rote-Linsen-Bolognese.html">Linsen Bolognese</a></li>
            <li><a href="https://www.chefkoch.de/rezepte/2306671368023432/Tomaten-Mozzarella-Flammkuchen.html">Flammkuchen mit Kirschtomaten und Mozzarella</a></li>
            <li><a href="https://www.chefkoch.de/rezepte/3412691508501546/Paella-mit-Meeresfruechten.html">Paella</a></li>
            <h3>Sonstige</h3>
            <li>Nudeln mit Lachs-Sahnesoße</li>
            <li>Spaghetti Bolognese Vegetarisch</li>
            <li>Selbstgemachte Pizza</li>
            <li>Kartoffelecken im Ofen</li>
            <li>Spinatknödel</li>
            <li>Kapuska</li>
            <li>Wurzelgemüse im Ofen</li>
            <li>Pilzrisotto</li>
          </ul>
        </div>
      )
      case Nav.Synth: return (
        <div>
          <Rustle />
        </div>
      )
    }
  }

  return (
    <>
      <div onClick={() => setNav(Nav.Home)}
        style={
          {
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        className="link"
      >
        <h1>Home</h1>
      </div>
      {body()}
    </>
  )
}