# Jinou.OnePage
Mini OnePage Plugin
En premier lieu soyez indulgent, c'est mon premier plugin :)

Ce pluging est très facile d'utlisation. Un simple balisage strict au niveau html et le tour est joué.
Voici un bref détaillé de comment il fonctionne : 

Ajoutez tout d'abord le css fournis dans le header : 
```html
  <link rel="stylesheet" type="text/css" href="css/jinou.onepage.css" />
```
Maintenant, chaque block devra porté la class "section" ainsi qu'un enfant de class "overflow" qui contiendra votre page. Le tout contenu dans un block ayant pour id "onePage"
```html
  <div id="onePage">
      <div class="section">
          <div class="overflow">
            Page 1
          </div>
      </div>
      <div class="section">
          <div class="overflow">
            Page 2
          </div>
      </div>
      <div class="section">
          <div class="overflow">
            Page 3
          </div>
      </div>
  </div>
```
la class "overflow" permet au plugin de vous accordé une barre de scroll vertical si jamais votre contenu dépasse la section.

Et pour terminer, ajoutez avant la fin du body les scripts suivant :
```html
  <script src="js/jquery.js"></script>
  <script src="js/jquery.mousewheel.js"></script>
  <script src="js/jinou.onepage.js"></script>
  <script>
      $(document).ready(function(){
          $('#onePage').onepage({
              sectionColor: ["#4bbfc3", "#303030"],
              navBackgroundColor: ["#303030", "#4bbfc3", "#303030"],
              anchor: ["section1", "section2", "section3"],
              navTop: true,
              scrollY: true
          });
      });
  </script>
```

Bien, que sont ces options ?

sectionColor: Ici vous pourrez mettre les couleurs que vous souhaitez pour chaque sections

navBackgroundColor: Idem que pour les sections mais avec le menu. Pour donné un effet sympatique ou si jamais la section à la même couleur que la navigation, ca peut aider à les distinguer

anchor: Celui ci est très important, c'est grace à ca que tout le pluging va se mettre en place. ce sont les ID de vos section, et par conséquant vos ancres.

navTop: Je conseil de le laissé à true. Cette option sert uniquement à déduire la hauteur du menu par rapport à la hauteur de la section. Dans certain cas il vous sera peut être utile de l'enlever.

scrollY: Cette option s'accorde avec la class "overflow" mentionné précédement. Vous pouvez donc activer ou désactivé la barre de scroll vertical de vos section. Celà dépendra de vos contenu.

[JQuery](https://github.com/jquery/jquery) ainsi que [jquery-mousewheel](https://github.com/jquery/jquery-mousewheel) sont requis pour ce pluging

Pour plus de précision sur son fonctionnement, tout est fournis plus haut.
