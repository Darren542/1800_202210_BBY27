## My Web Application (Vancouver Olympic Event Finder)

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)
* [Resources](#resources)
* [Colour Palete](#colour-palete)

## General Info
This browser based web application to help people discover, attend and create events during the 2030 Vancouver Omplypic games.
* Hi my name is Darren Luck, I'm excited about this project because it is culmination of what we have working towards in all are other classes.
* Hi my name is Alex. I'm excited about this project because it is useful for co-op
* Hi my name is Eric. I am excited about this project because it's helpful to gain some project experience
## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Bootstrap 
* Firebase Firestore
* Firebase Auth
* Firebase Storage
* Jquery
	
## Content
Content of the project folder:

```
.
├── 404.html
├── README.md
├── create.html                             # create HTML file, what is used when user creating an event.
├── eventPage.html                          # event HTML file, what users see when viewing an event.
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── htmlTemplate.html                       # template for creating new HTML pages, is not used anywhere.
├── images
│   ├── AlpineSkiing.webp                   # default image for AlpineSkiing events. from Olympics.com
│   ├── Biathlon.webp                       # default image for Biathlon events. from Olympics.com
│   ├── Bobsleigh.jpeg                      # Used on landing page to advertise events. from Olympics.com
│   ├── Bobsleigh.webp                      # default image for Bobsleigh events. from Olympics.com
│   ├── Cross-countrySkiing.webp            # default image for Cross-countrySkiing events. from Olympics.com
│   ├── Curling.webp                        # default image for Curling events. from Olympics.com
│   ├── FigureSkating.webp                  # default image for FigureSkating events. from Olympics.com
│   ├── FreestyleSkiing.webp                # default image for FreestyleSkiing events. from Olympics.com
│   ├── Hockey.jpeg                         # Used on landing page to advertise events. from Olympics.com
│   ├── Hockey.webp                         # default image for Hockey events. from Olympics.com
│   ├── Hockey_EventPage.jpg                # displayed on the eventPage before another image loads in. from Olympics.com   
│   ├── Luge.webp                           # default image for Luge events. from Olympics.com
│   ├── NordicCombined.webp                 # default image for NordicCombined events. from Olympics.com
│   ├── Other.webp                          # default image for Other events. from Olympics.com
│   ├── ShortTrackSpeedSkating.webp         # default image for ShortTrackSpeedSkating events. from Olympics.com
│   ├── Skating.webp                        # Used on landing page to advertise events. from Olympics.com
│   ├── Skeleton.webp                       # default image for Skeleton events. from Olympics.com
│   ├── SkiJumping.webp                     # default image for SkiJumping events. from Olympics.com
│   ├── Snowboard.webp                      # default image for Snowboard events. from Olympics.com
│   ├── SpeedSkating.webp                   # default image for SpeedSkating events. from Olympics.com
│   ├── VOEF-logos (1)                      # Alternate logos. Created using https://express.adobe.com/express-apps/logomaker/
│   │   ├── FinalLogo.png
│   │   ├── VOEF-logos.jpeg
│   │   ├── VOEF-logos_black.png
│   │   ├── VOEF-logos_transparent.png
│   │   ├── VOEF-logos_white.png
│   │   └── logo_info.txt
│   ├── curling.jpeg                        # Used on landing page to advertise events. from Olympics.com
│   ├── flag_1.jpg                          # On the background of the unlogged in landing page. from Olympics.com
│   ├── newLogo.png                         # logo displayed on top right of navbar. Created using https://express.adobe.com/express-apps/logomaker/
│   ├── newbackground4.png                  # background image for logged in landing page.
│   ├── olympics.png                        # Olympic logo currently unused. 
│   ├── profile.png                         # default profile image, is used if user has no profile image.
│   |── skeleton.jpeg                       # Used on landing page to advertise events. from Olympics.com
|   └── favicon.ico                         # Icon used for website. Created using https://express.adobe.com/express-apps/logomaker/
├── index.html                              # index HTML file, what is used as the landing page for unlogged in users.
├── login.html                              # login HTML file, what is displayed on the login page.
├── main.html                               # main HTML file, what is used as the landing page for logged in users.
├── package-lock.json
├── package.json
├── profile.html                            # Profile HTML file, what is displayed on the users profile page.
├── scripts
│   ├── authentication.js                   # Javascript for the user authentication
│   ├── create.js                           # Javascript for the create.html page
│   ├── eventPage.js                        # Javascript for the eventPage.html page
│   ├── firebaseAPI_bby27.js                # Connects website to firebase server
│   ├── main.js                             # Javascript file for the main.html page
│   ├── profile.js                          # Javascript file for the profile.html page
│   ├── script.js                           # A test Javascript file to check javascript loading in
│   ├── searchPage.js                       # Javascript file for the searchPage.html page
│   └── skeleton.js                         # Javascript file to load in the navbar and footer
├── search.html                             # search HTML file, what is used when users searching for events
├── sprint4focus.txt
├── storage.rules
├── styles                                  # Folder with all styles for website
│   ├── create.css                          # Styles for create.html page
│   ├── events.css                          # Styles for eventPage.html page
│   ├── login.css                           # Styles for login.html page
│   ├── main.css                            # Styles for main.html page
│   ├── navbar.css                          # Styles for navbar.html page
│   ├── navbarloggedin.css                  # Styles for navbar-logged-in.html page
│   ├── profile.css                         # Styles for profile.html page
│   ├── search.css                          # Styles for search.html page
│   └── style.css                           # Styles for index.html and main.html page
├── templates                               
│   ├── footer.html                         # Template footer for html pages
│   ├── navbar.html                         # Template navbar for html pages
│   └── navbar_logged_in.html               # Template navbar for logged in users html pages
└── unused
    ├── css
    │   └── myevents.css
    ├── html
    │   ├── likeEvents.html
    │   ├── mycalendar.html
    │   └── myevents.html
    ├── images
    │   └── AppIcon.png
    └── scripts
        └── likedEvents.js

```

Tips for file naming files and folders:
* use lowercase with no spaces
* use dashes (not underscore) for word separation

## Resources
Project planning links

Figjam: https://www.figma.com/file/zCPu7sD7vHRGbtY8OL4UDk/1800-202210-CampusTeamBBY27-(Copy)
Github: https://github.com/Darren542/1800_202210_BBY27
Trello: https://trello.com/invite/b/6UXkL7Ow/addedfebfe0b51dd5c27eca0d2775138/bby27
PresentationPlanningSheet: https://docs.google.com/document/d/1W-lpZSqoFRKnoDF2FWZyB_qdSFIGn7x8DU6Nb2s6Jk4/edit
Presentation: https://www.canva.com/design/DAE8qC_lUC4/ZXm7jnpPsn0CPwIoi1s57g/edit?utm_content=DAE8qC_lUC4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

## Colour Palete
000000 3D525D B6C8EB            DDE8F5     000000 
Black  Iris   Light Steele Blue Alice Blue Black
