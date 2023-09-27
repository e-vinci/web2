"use strict";(self.webpackChunkmyjscourse=self.webpackChunkmyjscourse||[]).push([[9675],{9911:function(e,t,n){n.r(t),n.d(t,{default:function(){return N}});var l=n(3905),r=n(7294);function a(e){const t=Object.assign({h1:"h1",p:"p",ul:"ul",li:"li",strong:"strong",a:"a",code:"code",pre:"pre",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",br:"br"},(0,l.ah)(),e.components),{InternalPageMenu:n,PathViewer:a,PathViewerItem:o,InternalPageMenuItem:s,YoutubeImage:i,InternalPageTitle:u,AuthenticatedBlock:m,UnAuthenticatedBlock:d}=t;return m||c("AuthenticatedBlock",!0),n||c("InternalPageMenu",!0),s||c("InternalPageMenuItem",!0),u||c("InternalPageTitle",!0),a||c("PathViewer",!0),o||c("PathViewerItem",!0),d||c("UnAuthenticatedBlock",!0),i||c("YoutubeImage",!0),r.createElement(r.Fragment,null,r.createElement(t.h1,null,"d) Création d'UI esthétiques"),"\n",r.createElement(n,null,r.createElement(a,null,r.createElement(o,{to:"/"}," web2course "),r.createElement(o,{to:"/part2"}," Partie 2 "),r.createElement(o,{selected:!0}," d) Création d'UI esthétiques ")),r.createElement(s,null," Comment créer une UI ? "),r.createElement(s,null," Qu'est-ce que Bootstrap ? "),r.createElement(s,null," Le layout en Bootstrap "),r.createElement(s,null," Les breakpoints en Bootstrap "),r.createElement(s,null," Les composants Bootstrap "),r.createElement(s,null," Utilisation de Bootstrap avec Webpack "),r.createElement(s,null," Projet 2.7 : UI esthétique ")),"\n",r.createElement("div",{className:"card card__simple-youtube-container"},r.createElement(i,{src:"https://youtu.be/x-mtf1_0yKc"})),"\n",r.createElement(t.h1,null,r.createElement(u,null," Comment créer une UI ? ")),"\n",r.createElement(t.p,null,"Le design de UI (User Interface) est un métier réprésenté par tout un univers de technologies."),"\n",r.createElement(t.p,null,"L'objectif de ce cours est de pouvoir créer une IHM de qualité, avec peu d'efforts, qui paraisse bien sur tous les appareils (Responsive Web Design)."),"\n",r.createElement(t.p,null,"Il existe de nombreuses façon de gérer le design, le graphisme d'une UI, en passant par l'utilisation :"),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"de Vanilla CSS / HTML ;"),"\n",r.createElement(t.li,null,"de SASS (pour faciliter la génération de CSS) ;"),"\n",r.createElement(t.li,null,"de librairies ; les plus connues sont ",r.createElement(t.strong,null,"Bootstrap")," et ",r.createElement(t.strong,null,"tailwindcss"),"."),"\n"),"\n",r.createElement(t.p,null,"Dans le cadre de ce cours, nous vous conseillons d'utiliser ",r.createElement(t.strong,null,"Bootstrap")," pour travailler le style de vos applications. Toutes les futurs tutoriels données dans le cadre de ce cours utiliseront ",r.createElement(t.strong,null,"Bootstrap"),"."),"\n",r.createElement(t.p,null,"Néanmoins, si vous avez déjà beaucoup d'affinités avec le Vanilla CSS, vous pouvez continuer à l'approfondir."),"\n",r.createElement(m,null,r.createElement(t.p,null,"Le style de vos IHM ne sera pas évalué lors des examens."),r.createElement(t.p,null,"Par contre, dans le cadre de votre projet web, le style de vos UI, tout comme l'ergonomie (UX), feront partie intégrante de l'évaluation.")),"\n",r.createElement(t.h1,null,r.createElement(u,null," Qu'est-ce que Bootstrap ? ")),"\n",r.createElement(t.p,null,'Bootstrap est une librairie permettant de créer rapidement des sites web "responsive".'),"\n",r.createElement(t.p,null,"Nous faisons une petite introduction à cet outil dans le cadre de ce cours, afin que vous puissiez , en autonomie, approfondir cette technologie via son site web : ",r.createElement(t.a,{href:"https://getbootstrap.com/"},"Bootstrap")," ",r.createElement(t.a,{href:"/web2/references/#r36"},"[R.36]"),"."),"\n",r.createElement(t.p,null,"Bootstrap offre principalement :"),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"Un système de ",r.createElement(t.strong,null,r.createElement(t.code,null,"Layout"))," : un ",r.createElement(t.strong,null,r.createElement(t.code,null,"Grid"))," est constitué de ",r.createElement(t.strong,null,r.createElement(t.code,null,"Container")),", de ",r.createElement(t.strong,null,r.createElement(t.code,null,"Rows"))," et de ",r.createElement(t.strong,null,r.createElement(t.code,null,"Columns")),'. Le tout est construit en utilisant "flexbox" et est donc entièrement responsive.'),"\n",r.createElement(t.li,null,"6 ",r.createElement(t.strong,null,"responsive breakpoints")," : ce sont des règles permettant d'affecter tout ce qui se trouve à une certaine largeur ou au-delà. Ils permettent d'indiquer les parties du ",r.createElement(t.strong,null,r.createElement(t.code,null,"Layout"))," qui doivent s'adapter à la taille d'un appareil."),"\n",r.createElement(t.li,null,"Des ",r.createElement(t.strong,null,r.createElement(t.code,null,"Components"))," : ce sont des éléments d'UI prédéfinis, comme par exemple des ",r.createElement(t.strong,null,r.createElement(t.code,null,"Alerts"))," pour fournir des messages de feedback, des ",r.createElement(t.strong,null,r.createElement(t.code,null,"Cards"))," pour afficher des infos mêlant images et textes..."),"\n",r.createElement(t.li,null,"Des ",r.createElement(t.strong,null,r.createElement(t.code,null,"Helpers"))," et des ",r.createElement(t.strong,null,r.createElement(t.code,null,"Utilities"))," notamment afin de gérer la couleurs, la taille et l'affichage des ",r.createElement(t.strong,null,r.createElement(t.code,null,"Components")),"."),"\n"),"\n",r.createElement(t.p,null,"En Bootstrap, quand on souhaite créer un composant, on va simplement :"),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,r.createElement(t.strong,null,"créer un élément HTML"),", souvent des ",r.createElement(t.strong,null,r.createElement(t.code,null,"<div>")),", puis,"),"\n",r.createElement(t.li,null,r.createElement(t.strong,null,"associer des classes CSS")," issues de ",r.createElement(t.strong,null,"Bootstrap")," pour styler ces composants."),"\n"),"\n",r.createElement(t.p,null,"Voici un exemple de comment utiliser le composant ",r.createElement(t.strong,null,r.createElement(t.code,null,"Alert"))," permettant d'afficher un message de feedback :"),"\n",r.createElement("div",{class:"alert alert-primary",role:"alert"},r.createElement(t.p,null,"A simple primary alert—check it out!")),"\n",r.createElement(t.p,null,"Le code associé est le suivant :"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-html"},'<div class="alert alert-primary" role="alert">\r\n  A simple primary alert—check it out!\r\n</div>\n')),"\n",r.createElement(t.p,null,"On voit donc que la classe ",r.createElement(t.strong,null,r.createElement(t.code,null,"alert"))," défini le style globale du message de feedback, et ",r.createElement(t.strong,null,r.createElement(t.code,null,"alert-primary"))," définit les couleurs (background, texte et bordures)."),"\n",r.createElement(t.h1,null,r.createElement(u,null," Le layout en Bootstrap ")),"\n",r.createElement(t.p,null,"En Bootstrap, il y a 12 colonnes disponibles par ligne (12 ",r.createElement(t.strong,null,r.createElement(t.code,null,"col"))," par ",r.createElement(t.strong,null,r.createElement(t.code,null,"row")),")."),"\n",r.createElement(t.p,null,"Le layout permet notamment d'organiser les contenus d'une page, de définir son squelette."),"\n",r.createElement(t.p,null,"Admettons que nous souhaitons avoir ce genre de layout :"),"\n",r.createElement("div",{class:"container"},r.createElement("div",{class:"row"},r.createElement("div",{class:"col"},r.createElement(t.p,null,"1 of 2")),r.createElement("div",{class:"col"},r.createElement(t.p,null,"2 of 2"))),r.createElement("div",{class:"row"},r.createElement("div",{class:"col"},r.createElement(t.p,null,"1 of 3")),r.createElement("div",{class:"col"},r.createElement(t.p,null,"2 of 3")),r.createElement("div",{class:"col"},r.createElement(t.p,null,"3 of 3")))),"\n",r.createElement("br"),"\n",r.createElement(t.p,null,"Le code associé est le suivant :"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-html"},'<div class="container">\r\n  <div class="row">\r\n    <div class="col">\r\n      1 of 2\r\n    </div>\r\n    <div class="col">\r\n      2 of 2\r\n    </div>\r\n  </div>\r\n  <div class="row">\r\n    <div class="col">\r\n      1 of 3\r\n    </div>\r\n    <div class="col">\r\n      2 of 3\r\n    </div>\r\n    <div class="col">\r\n      3 of 3\r\n    </div>\r\n  </div>\r\n</div>\n')),"\n",r.createElement(t.p,null,"Et si l'on souhaitait ajouter une couleur de background et des bordures à l'aide des ",r.createElement(t.strong,null,r.createElement(t.code,null,"Utilities")),", on pourrait le faire avec ",r.createElement(t.strong,null,r.createElement(t.code,null,".bg-info"))," et ",r.createElement(t.strong,null,r.createElement(t.code,null,".border .border-primary"))," :"),"\n",r.createElement("div",{class:"container"},r.createElement("div",{class:"row"},r.createElement("div",{class:"col bg-info border border-primary"},r.createElement(t.p,null,"1 of 2")),r.createElement("div",{class:"col bg-info border border-primary"},r.createElement(t.p,null,"2 of 2"))),r.createElement("div",{class:"row"},r.createElement("div",{class:"col bg-info border border-primary"},r.createElement(t.p,null,"1 of 3")),r.createElement("div",{class:"col bg-info border border-primary"},r.createElement(t.p,null,"2 of 3")),r.createElement("div",{class:"col bg-info border border-primary"},r.createElement(t.p,null,"3 of 3")))),"\n",r.createElement("br"),"\n",r.createElement(t.p,null,"Le code associé est le suivant :"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-html"},'<div class="container">\r\n  <div class="row">\r\n    <div class="col bg-info border border-primary">\r\n      1 of 2\r\n    </div>\r\n    <div class="col bg-info border border-primary">\r\n      2 of 2\r\n    </div>\r\n  </div>\r\n  <div class="row">\r\n    <div class="col bg-info border border-primary">\r\n      1 of 3\r\n    </div>\r\n    <div class="col bg-info border border-primary">\r\n      2 of 3\r\n    </div>\r\n    <div class="col bg-info border border-primary">\r\n      3 of 3\r\n    </div>\r\n  </div>\r\n</div>\n')),"\n",r.createElement(t.h1,null,r.createElement(u,null," Les breakpoints en Bootstrap ")),"\n",r.createElement(t.p,null,"Admettons que nous souhaitions construire une page qui contienne un header et un footer sur toute la largeur de la page, et un body formé :"),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"pour les appareils ",r.createElement(t.strong,null,"large")," (≥992px) : d'1 colonne à gauche de la taille de 2 / 12 pour un menu et une colonne à droite prenant l'espace restant."),"\n",r.createElement(t.li,null,"pour les appareils ",r.createElement(t.strong,null,"extra small")," (<576px) jusque ",r.createElement(t.strong,null,"large")," : d'une seule colonne. Ainsi, le menu sera présenté sur une 1",r.createElement("sup",null,"ère")," ligne..."),"\n"),"\n",r.createElement(t.p,null,"Comment ferions nous cela ?"),"\n",r.createElement("div",{class:"container"},r.createElement("div",{class:"row"},r.createElement("div",{class:"col bg-info border border-primary"},r.createElement(t.p,null,"Header"))),r.createElement("div",{class:"row"},r.createElement("div",{class:"col-12 col-lg-2 bg-info border border-primary"},r.createElement(t.p,null,"Menu within body part")),r.createElement("div",{class:"col-12 col-lg bg-info border border-primary"},r.createElement(t.p,null,"Main body part"))),r.createElement("div",{class:"row"},r.createElement("div",{class:"col bg-info border border-primary"},r.createElement(t.p,null,"Footer")))),"\n",r.createElement("br"),"\n",r.createElement(t.p,null,"Veuillez utiliser le mode développeur de votre browser (",r.createElement(t.strong,null,r.createElement(t.code,null,"F12"))," par exemple) afin de faire varier la largeur de la fenêtre de votre browser et d'observer le changement au niveau du layout des composants."),"\n",r.createElement(t.p,null,"Voici le code associé :"),"\n",r.createElement(t.pre,{numbered:!0,highlighting:"8,11"},r.createElement(t.code,{className:"language-html"},'<div class="container">\r\n  <div class="row">\r\n    <div class="col bg-info border border-primary">\r\n     Header\r\n    </div>   \r\n  </div>\r\n  <div class="row">\r\n    <div class="col-12 col-lg-2 bg-info border border-primary">\r\n     Menu within body part\r\n    </div>   \r\n    <div class="col-12 col-lg bg-info border border-primary">\r\n     Main body part\r\n    </div> \r\n  </div>\r\n  <div class="row">\r\n    <div class="col bg-info border border-primary">\r\n     Footer\r\n    </div>   \r\n  </div>\r\n</div>\n')),"\n",r.createElement(t.p,null,"Quelques explications :"),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,r.createElement(t.strong,null,r.createElement(t.code,null,"col-12"))," : cela signifie que les 12 colonnes disponibles dans une ligne sont prises."),"\n",r.createElement(t.li,null,r.createElement(t.strong,null,r.createElement(t.code,null,"col-lg-2"))," : dès qu'on dépasse les 992px, on ne prend que 2/12 d'espace d'une ligne. Notons que ",r.createElement(t.strong,null,r.createElement(t.code,null,"col-lg"))," prend l'espace restant, on aurait pu indiquer ",r.createElement(t.strong,null,r.createElement(t.code,null,"col-lg-10"))," pour obtenir le même résultat."),"\n"),"\n",r.createElement(t.p,null,"Voici tous les breakpoints par défaut offerts par Bootstrap :"),"\n",r.createElement(t.table,null,r.createElement(t.thead,null,r.createElement(t.tr,null,r.createElement(t.th,null,"Breakpoint"),r.createElement(t.th,null,"Class infix"),r.createElement(t.th,null,"Dimensions"))),r.createElement(t.tbody,null,r.createElement(t.tr,null,r.createElement(t.td,null,"Extra small"),r.createElement(t.td,null,"None"),r.createElement(t.td,null,"<576px")),r.createElement(t.tr,null,r.createElement(t.td,null,"Small"),r.createElement(t.td,null,"sm"),r.createElement(t.td,null,"≥576px")),r.createElement(t.tr,null,r.createElement(t.td,null,"Medium"),r.createElement(t.td,null,"md"),r.createElement(t.td,null,"≥768px")),r.createElement(t.tr,null,r.createElement(t.td,null,"Large"),r.createElement(t.td,null,"lg"),r.createElement(t.td,null,"≥992px")),r.createElement(t.tr,null,r.createElement(t.td,null,"Extra large"),r.createElement(t.td,null,"xl"),r.createElement(t.td,null,"≥1200px")),r.createElement(t.tr,null,r.createElement(t.td,null,"Extra extra large"),r.createElement(t.td,null,"xxl"),r.createElement(t.td,null,"≥1400px")))),"\n",r.createElement("br"),"\n",r.createElement(t.h1,null,r.createElement(u,null," Les composants Bootstrap ")),"\n",r.createElement(t.p,null,"Lorsque vous construisez vos UI, il est préférable de bénéficier de composants existants au design soigné. Il en existe de nombreux : ",r.createElement(t.strong,null,r.createElement(t.code,null,"Card")),", ",r.createElement(t.strong,null,r.createElement(t.code,null,"Navbar")),", ",r.createElement(t.strong,null,r.createElement(t.code,null,"Alert")),", ",r.createElement(t.strong,null,r.createElement(t.code,null,"Button")),", ",r.createElement(t.strong,null,r.createElement(t.code,null,"Modal")),"..."),"\n",r.createElement(t.p,null,"Pour les découvrir, allez observer la documentation de ",r.createElement(t.a,{href:"https://getbootstrap.com/"},"Bootstrap")," ",r.createElement(t.a,{href:"/web2/references/#r36"},"[R.36]"),"."),"\n",r.createElement(t.p,null,"Pour utiliser certains composants qui offre une interactivité, il est nécessaire d'inclure le JavaScript associé."),"\n",r.createElement(t.p,null,"Par exemple, afin d'offrir une ",r.createElement(t.strong,null,r.createElement(t.code,null,"Navbar"))," comme celle-ci :"),"\n",r.createElement("nav",{class:"navbar navbar-expand-lg bg-light"},r.createElement("div",{class:"container-fluid"},r.createElement("a",{class:"navbar-brand",href:"#"},"Navbar"),r.createElement("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},r.createElement("span",{class:"navbar-toggler-icon"})),r.createElement("div",{class:"collapse navbar-collapse",id:"navbarSupportedContent"},r.createElement("ul",{class:"navbar-nav me-auto mb-2 mb-lg-0"},r.createElement("li",{class:"nav-item"},r.createElement("a",{class:"nav-link active","aria-current":"page",href:"#"},"Home")),r.createElement("li",{class:"nav-item"},r.createElement("a",{class:"nav-link",href:"#"},"Link")),r.createElement("li",{class:"nav-item dropdown"},r.createElement("a",{class:"nav-link dropdown-toggle",href:"#",id:"navbarDropdown",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"},r.createElement(t.p,null,"Dropdown")),r.createElement("ul",{class:"dropdown-menu","aria-labelledby":"navbarDropdown"},r.createElement("li",null,r.createElement("a",{class:"dropdown-item",href:"#"},"Action")),r.createElement("li",null,r.createElement("a",{class:"dropdown-item",href:"#"},"Another action")),r.createElement("li",null,r.createElement("hr",{class:"dropdown-divider"})),r.createElement("li",null,r.createElement("a",{class:"dropdown-item",href:"#"},"Something else here")))),r.createElement("li",{class:"nav-item"},r.createElement("a",{class:"nav-link disabled"},"Disabled"))),r.createElement("form",{class:"d-flex",role:"search"},r.createElement("input",{class:"form-control me-2",type:"search",placeholder:"Search","aria-label":"Search"}),r.createElement("button",{class:"btn btn-outline-success",type:"submit"},"Search"))))),"\n",r.createElement("br"),"\n",r.createElement(t.p,null,"Il est nécessaire de faire l'import suivant, notamment afin que la ",r.createElement(t.strong,null,r.createElement(t.code,null,"Dropdown"))," s'affiche quand on clique dessus (le reste du code est un copier/coller de la documentation de Bootstrap) :"),"\n",r.createElement(t.pre,{highlighting:"1"},r.createElement(t.code,{className:"language-js"},'import { Navbar } from \'bootstrap\';\r\n\r\n <nav class="navbar navbar-expand-lg bg-light">\r\n  <div class="container-fluid">\r\n    <a class="navbar-brand" href="#">Navbar</a>\r\n    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\r\n      <span class="navbar-toggler-icon"></span>\r\n    </button>\r\n    <div class="collapse navbar-collapse" id="navbarSupportedContent">\r\n      <ul class="navbar-nav me-auto mb-2 mb-lg-0">\r\n        <li class="nav-item">\r\n          <a class="nav-link active" aria-current="page" href="#">Home</a>\r\n        </li>\r\n        <li class="nav-item">\r\n          <a class="nav-link" href="#">Link</a>\r\n        </li>\r\n        <li class="nav-item dropdown">\r\n          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">\r\n            Dropdown\r\n          </a>\r\n          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">\r\n            <li><a class="dropdown-item" href="#">Action</a></li>\r\n            <li><a class="dropdown-item" href="#">Another action</a></li>\r\n            <li><hr class="dropdown-divider"/></li>\r\n            <li><a class="dropdown-item" href="#">Something else here</a></li>\r\n          </ul>\r\n        </li>\r\n        <li class="nav-item">\r\n          <a class="nav-link disabled">Disabled</a>\r\n        </li>\r\n      </ul>\r\n      <form class="d-flex" role="search">\r\n        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>\r\n        <button class="btn btn-outline-success" type="submit">Search</button>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</nav>\n')),"\n",r.createElement(t.h1,null,r.createElement(u,null,"  Utilisation de Bootstrap avec Webpack ")),"\n",r.createElement(t.p,null,"Nous avons configuré les boilerplates du cours afin que Bootstrap soit déjà installé."),"\n",r.createElement(t.p,null,"Il n'y a donc plus rien à installer, sauf si p-e vous souhaitez utiliser des icônes."),"\n",r.createElement(t.p,null,"Si un jour vous veniez à devoir installer Bootstrap au sein d'un projet qui utilise un module bundler comme Webpack, vous devriez faire ces manipulations :"),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,r.createElement(t.strong,null,"Installation de Bootstrap & de ses dépendances")," :"),"\n"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-bash"},"npm i bootstrap @popperjs/core\n")),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,r.createElement(t.strong,null,"Chargement du CSS de Bootstrap")," :"),"\n"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-js"},"import 'bootstrap/dist/css/bootstrap.min.css';\n")),"\n",r.createElement(t.p,null,"Et puis finalement, si vous utilisez un composant qui offre des interactions, vous devrez ",r.createElement(t.strong,null,"inclure le JS associé à ce composant"),". Par exemple pour une ",r.createElement(t.strong,null,r.createElement(t.code,null,"Navbar"))," :"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-js"},"import { Navbar } from 'bootstrap';\n")),"\n",r.createElement(t.p,null,"Nous allons maintenant convertir le style du site de la pizzeria à l'aide de Bootstrap au sein d'un nouveau tutoriel."),"\n",r.createElement(t.p,null,"Dans votre repo ",r.createElement(t.strong,null,r.createElement(t.code,null,"web2")),", veuillez copier/coller le répertoire ",r.createElement(t.strong,null,r.createElement(t.code,null,"/tutorials/pizzeria/hmi/modern"))," et le renommer en ",r.createElement(t.strong,null,r.createElement(t.code,null,"/tutorials/pizzeria/hmi/modern-esthetic")),"."),"\n",r.createElement(t.p,null,"En cas de souci, vous pouvez télécharger le code du tutoriel précédent ici : ",r.createElement(t.a,{href:"https://github.com/e-vinci/js-demos/tree/main/frontend/frontend-essentials/modern-hmi"},"modern-hmi"),"."),"\n",r.createElement(t.p,null,"Veuillez ouvrir un terminal au niveau de ce répertoire."),"\n",r.createElement(t.p,null,"Pour la suite du tutoriel, nous considérons que tous les chemins absolus démarrent du répertoire ",r.createElement(t.strong,null,r.createElement(t.code,null,"/tutorials/pizzeria/hmi/modern-esthetic"))," (ou ",r.createElement(t.strong,null,r.createElement(t.code,null,"/web2/tutorials/pizzeria/hmi/modern-esthetic"))," si l'on considère le nom du répertoire du repo)."),"\n",r.createElement(t.p,null,"La seule chose que nous allons laisser dans ",r.createElement(t.strong,null,r.createElement(t.code,null,"/src/stylesheets/main.css"))," est la gestion d'une image en background car Bootstrap ne prévoit pas de solution."),"\n",r.createElement(t.p,null,"Veuillez donc mettre à jour ",r.createElement(t.strong,null,r.createElement(t.code,null,"/src/stylesheets/main.css"))," pour ne garder que l'image en background :"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-css"},"body { \r\n    background-image : url(../img/pizza.jpg);\r\n    background-size : cover;\r\n}\n")),"\n",r.createElement(t.p,null,"Il faut maintenant mettre à jour ",r.createElement(t.strong,null,r.createElement(t.code,null,"index.html"))," et indiquer les bonnes classes de Bootstrap :"),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,r.createElement(t.strong,null,r.createElement(t.code,null,"text-center"))," : pour centrer nos titres et le main"),"\n",r.createElement(t.li,null,r.createElement(t.strong,null,r.createElement(t.code,null,"text-white font-weight-bold py-2"))," : pour le style du texte dans le footer. ",r.createElement(t.strong,null,r.createElement(t.code,null,"py-2"))," met du padding sur l'axe des ",r.createElement(t.strong,null,"y"),", est donc tant en haut qu'en bas du footer."),"\n",r.createElement(t.li,null,"Pour que le layout de la page fasse toujour, au minimum, la hauteur complète du navigateur et donne l'effet au ",r.createElement(t.strong,null,r.createElement(t.code,null,"<footer>")),' d\'être "sticky" en bas de page, on utilise :',"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,r.createElement(t.strong,null,r.createElement(t.code,null,"vh-100 d-flex flex-column"))," au sein du ",r.createElement(t.strong,null,r.createElement(t.code,null,"<body>")),"."),"\n",r.createElement(t.li,null,r.createElement(t.strong,null,r.createElement(t.code,null,"flex-grow-1"))," dans le ",r.createElement(t.strong,null,r.createElement(t.code,null,"<main>"))," pour lui imposer de remplir l'espace disponible. Ainsi, le footer donne l'effet d'être \"sticky\" en bas de page."),"\n"),"\n"),"\n",r.createElement(t.li,null,"Pour la taille du logo JS, Bootstrap offre des classe pour le ",r.createElement(t.strong,null,r.createElement(t.code,null,"Sizing"))," en fonction de la taille du parent ou du ",r.createElement(t.strong,null,"viewport")," (le browser). Ici, on préfère avoir une taille fixe de 50 pixel, donc on va indiquer cette taille directement dans l'attribut ",r.createElement(t.strong,null,r.createElement(t.code,null,"height"))," de ",r.createElement(t.strong,null,r.createElement(t.code,null,"<img>")),"."),"\n"),"\n",r.createElement(t.p,null,"Voilà à quoi doit ressembler votre ",r.createElement(t.strong,null,r.createElement(t.code,null,"index.html"))," suite aux changements :"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-html"},'<!DOCTYPE html>\r\n<html lang="en">\r\n  <head>\r\n    <meta charset="UTF-8" />\r\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r\n    <title>Pizzeria</title>\r\n    <link rel="icon" href="./img/pizza-svgrepo-com.svg" type="image/svg+xml" />\r\n  </head>\r\n  <body class="vh-100 d-flex flex-column">\r\n    <header>\r\n      <h1 class="animate__animated animate__bounce text-center">We love Pizza</h1>\r\n    </header>\r\n    <main class="flex-grow-1 text-center">\r\n      <audio id="audioPlayer" controls autoplay>\r\n        <source src="./sound/Infecticide-11-Pizza-Spinoza.mp3" type="audio/mpeg" />\r\n        Your browser does not support the audio element.\r\n      </audio>\r\n    </main>\r\n    <footer class="text-center text-white font-weight-bold py-2">\r\n      <h1 class="animate__animated animate__bounce animate__delay-2s text-center">\r\n        But we also love JS\r\n      </h1>\r\n      <img src="./img/js-logo.png" height="50px" alt="" />\r\n    </footer>\r\n  </body>\r\n</html>\n')),"\n",r.createElement(t.p,null,"Si tout fonctionne bien, faites un commit de votre repo (",r.createElement(t.strong,null,r.createElement(t.code,null,"web2")),") avec comme message : ",r.createElement(t.strong,null,r.createElement(t.code,null,"modern-esthetic-hmi tutorial")),"."),"\n",r.createElement(t.p,null,"En cas de souci, vous pouvez accéder au code de cette étape du tutoriel ici : ",r.createElement(t.a,{href:"https://github.com/e-vinci/js-demos/tree/main/frontend/frontend-essentials/modern-esthetic-hmi"},"modern-esthetic-hmi"),"."),"\n",r.createElement(t.h1,null,r.createElement(u,null," Projet 2.7 : UI esthétique ")),"\n",r.createElement(t.p,null,"Veuillez développer la ",r.createElement(t.strong,null,r.createElement(t.code,null,"HomePage"))," de votre projet, en utilisant le boilerplate offert dans ce cours et Bootstrap."),"\n",r.createElement(t.p,null,"A ce stade-ci, vous ne devez pas ajouter d'interactivité à votre page.",r.createElement(t.br),"\n","Veuillez soigner le graphisme de votre UI en faisant en sorte que votre page soit responsive. Vous devez donc prévoir au minimum deux layouts :"),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"un layout pour les écrans étroits ;"),"\n",r.createElement(t.li,null,"un layout pour les écrans larges."),"\n"),"\n",r.createElement(t.p,null,"Veuillez créer un nouveau projet dans votre repository local et votre web repository (normalement appelé ",r.createElement(t.strong,null,r.createElement(t.code,null,"web2")),") nommé ",r.createElement(t.strong,null,r.createElement(t.code,null,"/project/2.7"))," sur base du boilerplate : ",r.createElement(t.a,{href:"https://github.com/e-vinci/js-basic-boilerplate.git"},"boilerplate de base"),"."),"\n",r.createElement(d,null,r.createElement(t.p,null,"Si vous n'avez pas d'idée pour votre propre projet, veuillez simplement refaire la ",r.createElement(t.strong,null,r.createElement(t.code,null,"HomePage"))," de l'application ",r.createElement(t.strong,null,r.createElement(t.code,null,"myMovies")),".")),"\n",r.createElement(m,null,r.createElement(t.p,null,"Veuillez travailler avec les membres de votre groupe. N'hésitez pas à chacun travailler sur un prototype de la ",r.createElement(t.strong,null,r.createElement(t.code,null,"HomePage")),", selon vos goûts. Au cours de la séance, n'hésitez pas à comparer les designs produits afin de sélectionner le thème qui plait le plus, celui que vous souhaitez approfondir sur votre projet."),r.createElement(t.p,null,'Même si vos wireframes ne sont pas encore finalisé, il est important que vous pratiquiez "Bootstrap". Ne travaillez donc pas sur vos wireframes dans le cadre de ce cours SVP.')),"\n",r.createElement(t.p,null,"Quand votre application est finalisée, veuillez faire un ",r.createElement(t.strong,null,r.createElement(t.code,null,"commit"))," de votre code avec comme message : ",r.createElement(t.strong,null,r.createElement(t.code,null,"2.7: esthetic UI")),"."))}var o=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.ah)(),e.components);return t?r.createElement(t,e,r.createElement(a,e)):a(e)};function c(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var s=n(4160),i=n(5583),u=n(5679),m=n(307),d=n(7410),p=n(9523),E=n(8075),g=n(9063),v=n(1631),b=n(5772),f=n(2770),h=n(7008),y=n(9771),w=n(1218),x=(n(5258),n(9394)),z=n(4579),I=n(7743),k=n(9256),q=n(6488),S=n(5175),B=n(6387),P=n(6044);const j={Link:s.Link,Image:u.Z,Section:m.Z,Content:d.Z,Background:p.Z,SectionHeader:E.Z,SectionFooter:g.Z,PageHeader:v.Z,CodeBlock:f.Z,LinkFile:h.Z,ScrollableImage:y.Z,PublicProjectsView:w.Z,AuthenticatedBlock:x.Z,UnAuthenticatedBlock:z.Z,NestedMdxBlock:I.Z,YoutubeImage:k.Z,InternalPageMenu:q.Z,InternalPageMenuItem:S.Z,InternalPageTitle:B.Z,PathViewer:P.k,PathViewerItem:P.F};function C(e){var t,n,a,o,c;let{data:{mdx:s,allImages:u},children:m}=e;return j.PageHeader=(0,b.u)(v.Z,null==s?void 0:s.frontmatter),r.createElement(i.Z,Object.assign({},null!=s&&s.frontmatter?{frontmatter:s.frontmatter}:{},null!=s&&null!==(t=s.frontmatter)&&void 0!==t&&t.navbarExtraStyles?{navbarExtraStyles:s.frontmatter.navbarExtraStyles}:{},null!=s&&null!==(n=s.frontmatter)&&void 0!==n&&n.headerImage?{headerImage:s.frontmatter.headerImage}:{},null!=s&&null!==(a=s.frontmatter)&&void 0!==a&&a.featuredImage?{featuredImage:s.frontmatter.featuredImage}:{},null!=s&&null!==(o=s.frontmatter)&&void 0!==o&&o.title?{pageTitle:s.frontmatter.title}:{},u&&u.length>0?{allImages:u}:{}),r.createElement(l.Zo,{components:j},r.createElement("div",{className:null!=s&&null!==(c=s.frontmatter)&&void 0!==c&&c.autoMargin?"page page--auto-margin ":"page"},m)))}function N(e){return r.createElement(C,e,r.createElement(o,e))}}}]);
//# sourceMappingURL=component---src-templates-mdx-pages-js-content-file-path-src-mdx-pages-part-2-ui-fr-mdx-0762ef0f5c310055d79b.js.map