## Vancouver Olympic Event Finder

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)
* [Resources](#resources)
* [Colour Palete](#colour-palete)
* [Contact](#contact)

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
```
Content of the project folder:

Top level of project folder: 
├── index.html               # index HTML file, what is used as the landing page for unlogged in users.
├── login.html               # login HTML file, what is displayed on the login page.
├── main.html                # main HTML file, what is used as the landing page for logged in users.
├── create.html              # create HTML file, what is used when user creating an event.
├── eventPage.html           # event HTML file, what users see when viewing an event.
├── htmlTemplate.html        # template for creating new HTML pages, is not used anywhere.
├── profile.html             # Profile HTML file, what is displayed on the users profile page.
├── search.html              # search HTML file, what is used when users searching for events.
├── .gitignore               # Git ignore file.
└── README.md                # ReadMe file for passover.

It has the following subfolders and files:
├── images                   # Folder for images
        /VOEF-logos (1)                     # made with Adobe logo maker. 
            /logo-info.txt                  # Outlines the fonts, colors and icons used in the logo.
            /FinalLogo.png                  # White text, blue body VOEF logo.
            /VOEF-logos.jpeg                # Blue text, white body, blue background square VOEF logo.
            /VOEF-logos_black.png           # white text, black body VOEF logo.    
            /VOEF-logos_transparent.png     # blue text, white body VOEF logo.
            /VOEF-logos_white.png           # black text, white body VOEF logo.
        /AlpineSkiing.webp                  # default image for AlpineSkiing events from Olympics.com.
        /Biathlon.webp                      # default image for Biathlon events from Olympics.com.
        /Bobsleigh.jpeg                     # Used on landing page to advertise events from Olympics.com.
        /Bobsleigh.webp                     # default image for Bobsleigh events from Olympics.com.
        /Cross-countrySkiing.webp           # default image for Cross-countrySkiing events from Olympics.com.
        /Curling.webp                       # default image for Curling events from Olympics.com
        /FigureSkating.webp                 # default image for FigureSkating events from Olympics.com.
        /FreestyleSkiing.webp               # default image for FreestyleSkiing events from Olympics.com.
        /Hockey.jpeg                        # Used on landing page to advertise events from Olympics.com.
        /Hockey.webp                        # default image for Hockey events from Olympics.com.
        /Hockey_EventPage.jpg               # displayed on the eventPage before another image loads in from Olympics.com.       
        /Luge.webp                          # default image for Luge events from Olympics.com.
        /NordicCombined.webp                # default image for NordicCombined events from Olympics.com.
        /Other.webp                         # default image for Other events.
        /ShortTrackSpeedSkating.webp        # default image for ShortTrackSpeedSkating events from Olympics.com.
        /Skating.webp                       # Used on landing page to advertise events from Olympics.com. 
        /Skeleton.webp                      # default image for Skeleton events from Olympics.com.
        /SkiJumping.webp                    # default image for SkiJumping events from Olympics.com.
        /Snowboard.webp                     # default image for Snowboard events from Olympics.com.
        /SpeedSkating.webp                  # default image for SpeedSkating events from Olympics.com.
        /curling.jpeg                       # Used on landing page to advertise events from Olympics.com.
        /flag_1.jpg                         # On the background of the unlogged in landing page from Olympics.com.
        /newLogo.png                        # logo displayed on top right of navbar made with Adobe logo maker.
        /newbackground4.png                 # background image for logged in landing page from getty images.
        /olympics.png                       # Olympic logo currently unused from Olympics.com. 
        /profile.png                        # default profile image, is used if user has no profile image from favpng.com.
        /skeleton.jpeg                      # Used on landing page to advertise events from Olympics.com
        /favicon.ico                        # Icon used for website. Created using https://express.adobe.com/express-apps/logomaker/
       
├── scripts                  # Folder for scripts
        /authentication.js                  # Javascript for the user authentication
        /create.js                          # Javascript for the create.html page
        /eventPage.js                       # Javascript for the eventPage.html page
        /firebaseAPI_bby27.js               # Connects website to firebase server
        /main.js                            # Javascript file for the main.html page
        /profile.js                         # Javascript file for the profile.html page
        /script.js                          # A test Javascript file to check javascript loading in
        /searchPage.js                      # Javascript file for the searchPage.html page
        /skeleton.js                        # Javascript file to load in the navbar and footer

├── styles                   # Folder for styles
        /create.css                         # Styles for create.html page
        /events.css                         # Styles for eventPage.html page
        /login.css                          # Styles for login.html page
        /main.css                           # Styles for main.html page
        /navbar.css                         # Styles for navbar.html page
        /navbarloggedin.css                 # Styles for navbar-logged-in.html page
        /profile.css                        # Styles for profile.html page
        /search.css                         # Styles for search.html page
        /style.css                          # Styles for index.html and main.html page

├── unused                   # Folder for unused files
        /css
            /myevents.css
        /html
            /likedEvents.html
            /myCalendar.html
            /myevents.html
        /images
            /AppIcon.png
        /scripts
            /likedEvents.js

Firebase hosting files: 
    /.firebase
	    /hosting..cache
    /404.html                 # Indicating the server could not find the requested website
    /firebase.json            # JSON init object.
    /firestore.indexes.json   # JSON database routing.    
    /firestore.rules          # Firestore storage rules.
    /storage.rules            # controls the availability of files.

Node express files:
    /package-lock.json        # keeps track of the exact version of every package that is installed.
    /package.json             # records important metadata about a project.
```
## Resources
- Github: https://github.com/Darren542/1800_202210_BBY27
- Firebase: https://firebase.google.com/ 
- Jquery https://jquery.com/

## Colour-Palete
000000 3D525D B6C8EB            DDE8F5     000000 
Black  Iris   Light Steele Blue Alice Blue Black

## Contact 
* Darren Luck - dluck@my.bcit.ca
* Alex Gbbison - agibbisonk@my.bcit.ca
* Eric Dong - edong@my.bcit.ca

## Acknowledgements 
* <a href="https://getbootstrap.com/">Bootstrap</a>
* <a href="https://olympics.com/">Olympics</a>