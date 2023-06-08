import "./comprehension.css"
import { useState } from "react";
// const { MongoClient } = require("mongodb");

export default function Comprehension({menuOpen, setMenuOpen}) {
  
  const [message, setMessage] = useState(false)
  const [text, setText] = useState('Comprehension')
  const [ntokens, setNtokens] = useState(0)

  const handleSubmit = (e) =>{
    // console.log(e)
    // console.log()
    e.preventDefault(); // prevent page reload
    setMessage(true)
    
    var x = {
      "url": e.target[0].value,
      "lang": e.target[1].value,
      "key": e.target[2].value,
      "num": e.target[3].value
    }
    console.log("Request params: ", x)
    setText(`Voici Taïwan, au large de la Chine. Autour de l'île, les autorités du pays ont défini une frontière. Lorsqu'un avion y pénètre, il doit s'identifier pour ne pas être considéré comme ennemi. Les avions militaires chinois font exactement l'inverse. Ils entrent régulièrement sans y être autorisés et sans s'identifier. Rien qu'au mois de mars 2023, on dénombre plus d'une centaine d'incursions. Toutes ces provocations font monter les tensions entre Taïwan, qui tient à son indépendance, et la Chine, qui aimerait bien rattacher l'île à son territoire. C'est une petite île qui fait face à un géant. La question de Taïwan est l'une des plus explosives aujourd'hui sur la scène internationale. Alors, la question est : "Y aura-t-il une guerre entre la Chine et Taïwan ?" Pour répondre, il faut déjà comprendre les origines des tensions entre les deux pays. Il y a trois enjeux majeurs. Le premier est historique. En Chine, la retraite des nationalistes est générale. Les troupes du gouvernement de Nankin laissant la place aux armées communistes de Mao Zedong. 1949. Après plus de 20 ans de guerre civile, les communistes prennent le pouvoir en Chine. Le camp des perdants, les nationalistes, se replie sur l'île de Taïwan. 75 ans plus tard, Taïwan est devenu un État démocratique souverain de fait. Mais de son côté, la Chine de Xi Jinping considère toujours que l'île lui appartient, défendant le principe d'une seule Chine. En 2022, le gouvernement confirme encore ses intentions dans un livre blanc qui définit sa politique à l'égard de Taïwan. Résoudre le problème de Taïwan est une mission historique inébranlable du Parti communiste chinois. Et si Pékin s'inquiète des velléités indépendantistes de l'île, c'est qu'il s'éloigne de plus en plus idéologiquement. C'est le deuxième enjeu de cette volonté de conquête : un enjeu politique. Faire disparaître un contre-modèle extrêmement gênant pour le Parti. Une société de culture chinoise multiethnique qui a connu une dictature avant de se démocratiser et de connaître un succès économique. Ça, évidemment, ça colle mal avec les éléments de langage du Parti communiste qui explique qu'il n'y a pas d'alternative en Chine. En 2016, l'élection de la démocrate indépendantiste Tsai Ing-wen accentue les tensions. La présidente taïwanaise est moins conciliante que son prédécesseur avec le régime chinois. Pékin accroît alors considérablement sa stratégie de pression politique, économique et militaire. Le troisième enjeu est stratégique. Les côtes chinoises font face à ce que l'on appelle "la première chaîne d'îles", des pays alliés aux États-Unis, ce qui l'empêche d'accéder directement au Pacifique. Une mainmise sur Taïwan serait une brèche dans ce réseau d'alliances américaines. Cette brèche permettrait, en plus, d'élargir la portée des sous-marins nucléaires. Car le long des côtes chinoises, le trafic marchand est très dense et les eaux peu profondes, ce qui empêche les sous-marins chinois de manœuvrer discrètement. Taïwan, c'est un accès direct au Pacifique profond. Voilà pour les raisons. Mais envahir un territoire de 24 millions d'habitants majoritairement hostiles à toute unification, ce n'est pas rien. Est-ce que, pour la Chine, un tel projet d'invasion est réalisable ? C'est incontestable : Pékin a une supériorité militaire écrasante sur Taïwan. Déjà, son armée compte 12 fois plus de militaires. Elle possède 8 fois plus de chars d'assaut, 30 fois plus de véhicules d'infanterie, et de nombreux véhicules amphibies qui se déplacent sur l'eau comme sur terre. Et puis, les Chinois possèdent le plus grand nombre de navires militaires au monde. Plus encore que les États-Unis. Selon ce rapport du Congrès américain, la marine chinoise a dépassé la marine américaine à la fin des années 2010. Mais ce n'est pas tout. En cas d'attaque... Enfin, sur le secteur aérien, le rapport de force est un peu moins déséquilibré. Et du côté de Taiwan, près de la moitié de cette flotte est dissimulée dans des tunnels militaires à l'est du pays, près des villes de Hualien et Taitung. Ces montagnes escarpées ne permettent pas seulement de protéger des équipements militaires. Elles rendent aussi difficile un potentiel débarquement qui ne serait possible que sur la côte ouest de l'île, où le tissu urbain est beaucoup plus dense. Un terrain d'invasion qui profite habituellement à la défense. D'autant plus que les infrastructures taïwanaises sont très solides. Enfin, en cas d'invasion, il reste un dernier obstacle : la mer. Avant de débarquer, les Chinois devraient franchir un large détroit d'une distance variant de 130 à 180km dans des eaux agitées parcourues de bancs de sable et de courants forts. Puis, une fois le détroit traversé, il n'est pas garanti que le débarquement soit un succès, comme l'explique cette analyste américain. Les débarquements amphibies sont notoirement difficiles à réaliser et l'armée chinoise a, par le passé, montré des lacunes dans des domaines critiques comme le transport aérien stratégique, la logistique et la guerre anti-sous-marins. Bien. Malgré ces difficultés, imaginons que la Chine entre effectivement en conflit ouvert avec Taïwan. Une invasion ne serait pas sans conséquences, ni pour Taïwan, ni pour la Chine, ni pour le reste du monde. Un troisième acteur prend part à l'escalade des tensions : les États-Unis. Depuis 1979, un accord encadre leurs relations avec Taïwan. Ils sont un partenaire commercial. Ils fournissent des armes. Mais officiellement, les États-Unis reconnaissent aussi Pékin et son principe d'une seule Chine. ce qui, en théorie, les empêche d'entretenir des relations diplomatiques officielles avec Taipei. En 2022, pourtant, la présidente de la Chambre des représentants des États-Unis s'est rendue en visite à Taïwan. En réponse, les incursions aériennes chinoises dans la zone taïwanaise se sont multipliées. Même principe en avril 2023, lors de la visite de la présidente de Taïwan aux États-Unis, Pékin a réagi avec une démonstration de force autour de l'île. Les États-Unis ne sont pas non plus censés entretenir d'alliance militaire avec Taipei. Ils maintiennent une ambiguïté stratégique. Autrement dit, pas de positionnement clair sur une intervention américaine en cas de conflit. Sauf que... Une position affirmée à plusieurs reprises par le président Biden, mais que la Maison-Blanche s'est efforcée de nuancer à chaque fois pour contenir la colère de Pékin. En fait, pour les États-Unis, soutenir Taïwan en cas de conflit, c'est aussi rester crédible auprès de son réseau d'alliés dans la région. Mais ça ne s'arrête pas là. En cas de conflit, une intervention américaine entraînerait donc sans doute un emballement régional. Mais qui soutiendrait les Chinois ? Officiellement, un traité d'entraide signé avec la Corée du Nord est censé entrer en fonction. Pour les autres pays proches de la Chine, comme la Russie par exemple, les spécialistes sont plus incertains quant à un soutien militaire. Mais avant d'en arriver à cet emballement, le scénario le plus souvent mis en avant par les experts est celui d'un blocus pour faire céder Taïwan. Et les conséquences seraient lourdes. Taïwan étant une île, elle est 100% dépendante du commerce maritime et aérien. Elle importe par exemple 98% de ses ressources en énergie. Mais un blocus aurait aussi des conséquences pour l'économie chinoise. On avance souvent l'argument que le coût pour la Chine d'un blocus ou d'une intervention militaire serait prohibitif. Et c'est vrai, le coût serait extrêmement important. D'après ce rapport de l'institut de recherche Rhodium Group, le manque à gagner commercial avec le reste du monde serait de 270 milliards de dollars. À l'échelle mondiale, c'est 2000 milliards de dollars. Cela à cause de l'effondrement des bourses, des perturbations dans le commerce maritime international, de la chute des investissements ou encore de la rupture des chaînes d'approvisionnement. Il y a notamment un enjeu particulier sur les semi-conducteurs. Taïwan produit 92% des modèles les plus sophistiqués. Or, ces composants électroniques sont indispensables dans la fabrication des smartphones, des ordinateurs, de l'électroménager... Sans eux, de nombreux secteurs sont menacés. Blocus, conflit localisé ou escalade à grande échelle. Quel que soit le scénario envisagé, en cas d'emballement entre Taïwan et la Chine, toute la communauté internationale est concernée. Un conflit n'est jamais inévitable. Rien n'est écrit et il y a de nombreux leviers pour empêcher justement un conflit. Et les Européens, comme d'autres, ont un rôle pour contribuer à maintenir le statu quo dans le détroit de Taïwan. En 2023, il est encore temps d'éviter le pire.`)

  }

  function myevent(e){
    console.log(e)
    console.log("myevent")
  }

  var vocs = ["chien", "chat", "maison"]
  const listItems = vocs.map((voc) => (
    <li>{voc}</li>
  ));

  
  return (
    <div id="comprehension" className="comprehension">
      {/* <button onClick={myevent}>Click for event</button> */}
      <form onSubmit={handleSubmit} className="form text-retrieval-form">
        <label>
          URL:
          <input type="text" name="name" id="name" placeholder="Your URL"></input>
        </label>
        <label>
          Language:
          <input type="text" name="lang" id="lang" placeholder="Language of the text"></input>
        </label>
        <label>
          API Key:
          <input type="text" name="key" id="key" placeholder="Your API Key"></input>
        </label>
        <label>
          Number of Questions:
          <input type="text" name="num" id="nq" placeholder="Number of Questions"></input>
        </label>
        <button type="submit">Submit</button>  
      </form>
      <div className="text-voc-container">
        {/* <div className="text-output">{text}</div> */}
        <textarea name="text" id="text" className="text-output" value={text} rows="5"></textarea>
        <div className="vocabs">
          Vocs
          <ul>
            {listItems}
          </ul>
        </div>
      </div>
      <form className="form question-form">
        <label>
          N Tokens
          <input type="text" name="ntokens" id="ntokens" placeholder="Number of Tokens" onChange={myevent}></input>
        </label>
        <label>
          Cost ($)
          <input type="text" name="cost" id="cost" placeholder="Cost"></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}