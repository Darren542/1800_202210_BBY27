function displayCards(collection) {
    let cardTemplate = document.getElementById("eventCardTemplate2");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var eventName = doc.data().eventName;   // get value of the "name" key
                var description = doc.data().description;   // get value of the "details" key
                var type = doc.data().type;   // get value of the "details" key
                var time = doc.data().startDate;   // get value of the "details" key
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = eventName;
                newcard.querySelector('.card-text').innerHTML = description;
                newcard.querySelector('.card-time').innerHTML = time;
                newcard.querySelector('.card-image').src = "./images/" + type + ".jpeg"; //hikes.jpg

                //give unique ids to all elements for future use
                newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
                newcard.querySelector('.card-time').setAttribute("id", "ctime" + i);

                //attach to gallery
                document.getElementById("cards-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayCards("events");