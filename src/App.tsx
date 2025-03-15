import { ReactElement, useState } from "react";
import { Rustle } from "./Rustle";
import RecipeDropdown from "./ui/Dropdown"
import "./App.css"

enum Nav {
  Home,
  Synth,
  Recipes,
  Misc
}

export interface Recipe {
  title: string,
  ingredients: string[],
  instructions: string
}

const recipes: Recipe[] = [
  {
    title: "Nudeln mit Lachs-Sahne-Soße",
    ingredients: [
      "Lachsfilet (Tiefgekühlt)",
      "Nudeln",
      "Sahne",
      "Tomatenmark",
      "Weißwein",
      "Zwiebel (x1)",
      "Knoblauch (x1)"
    ],
    instructions: ""
  },
  {
    title: "Spinatknödel",
    ingredients: [
      "Spinat (500g)",
      "Knödelbrot (800g) (5-8 Brötchen, 2 Aldi Baguettes)",
      "Butter (50g)",
      "Zwiebel (x1)",
      "Petersilie (1 Bunde)",
      "Eier (x4)",
      "1 EL Mehl",
      "Muskat",
      "Salz u. Pfeffer",
      "Ricotta (200g)",
      "Gratinkäse (1 Beutel)",
      "Parmesankäse",
      "Milch (500ml)"
    ],
    instructions: `
    Die Milch erhitze (nicht kochen), über das Knodelbrot gießen und ca. 10 Minuten ziehen lassen.
    Eier mit den Gewürzen vermischen, den Ricotta und den Käse über das Knödelbrot geben und alles zu einer homogenen Masse vermischen.
    Die Hände anfeuchten und aus dem Teig Knödel formen
    In einem großen Topf leicht gesalzenes Wasser zum sieden bringen und die Knödel ca. 20 Minuten bei leicht köchelndem Wasser ziehen lassen.
    `
  }
]

export default function App() {

  const [nav, setNav] = useState(Nav.Home);

  const body = (): ReactElement => {
    switch (nav) {
      case Nav.Home: return (
        <div style={
          {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }} >
          <h1>Welcome to my cool Webpage, we have:</h1>
          <ul style={{ fontSize: 28 }}>
            <li onClick={() => setNav(Nav.Synth)}>
              <span className="link">Toy Synth</span>
            </li>
            <li onClick={() => setNav(Nav.Recipes)}>
              <span className="link">Recipes</span>
            </li>
            <li onClick={() => setNav(Nav.Misc)}>
              <span className="link">Fun, fun and more fun</span>
            </li>
          </ul>
        </div >
      )
      case Nav.Recipes: return (
        <div style={
          {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 8
          }} >
          <ul style={{ width: "95vw" }}>
            <h2>Chefkoch</h2>
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
            <h2>Sonstige</h2>
            {recipes.map(recipe =>
              <li>
                <RecipeDropdown title={recipe.title} ingredients={recipe.ingredients} instructions={recipe.instructions} />
              </li>
            )}
            <li>Spaghetti Bolognese Vegetarisch</li>
            <li>Selbstgemachte Pizza</li>
            <li>Kartoffelecken im Ofen</li>
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
      case Nav.Misc: return (
        <div>Tricked you, theres only misery here.</div>
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
      <hr />
      <div style={{ paddingLeft: 8, paddingRight: 8 }}>
        {body()}
      </div>
    </>
  )
}