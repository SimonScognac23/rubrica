
//                 Mostra Contatti
// 1. Creare oggetto rubrica
// 2. Catturare la colonna dove andremo a creare tante card quanti sono i nostri contatti
// 3. Creare un metodo che mostri tutti i contatti
// 4. Il metodo funziona ma crea delle cuplicazioni, devo risolvere il problema e far si che non si duplichi, andando sulla funzione dicendo di svuotare prima quelle che ci sono e poi mettere le nuove
// 5. Abbiamo risolto ma vogliamo che il bottone mostraRubrica al secondo click nasconda la rubrica



//                Aggiunta Contatti
// 1. Creare un metodo per aggiungere contatti. Questo metodo avrà bisogno di un nuovo nome e un nuovo numero
// 2. Agendo sulla lista dei contatti pusheremo il nuovo contatto



//                 Rimozione Contatti
// 1. Creare un metodo che cancelli un contatto. Usando il metodo .splice()


//                 Rimozione Contatto con le icone
//1. Utilizzare l'indice delle icone per effettuare lo splice
//2. Catturare tutte le icone




// Wrapper dei contatti
let contactsWrapper = document.querySelector('#contactsWrapper');  // Wrapper dei contatti da aggiungere, viene catturato in modo da poterci creare delle section quando vogliamo


// Bottoni
let showContactsBtn = document.querySelector('#showContactsBtn');  // catturiamo anche il bottone di Mostra Contatti
let addContactBtn = document.querySelector('#addContactBtn'); // catturiamo l'elemento aggiungi nuovo contatto
let removeContactBtn = document.querySelector('#removeContactBtn');


// Inputs
let nameInput = document.querySelector('#nameInput'); // catturiamo elemento per inserire il nome su input
let numberInput = document.querySelector('#numberInput'); // catturiamo elemento per inserire il numero su input
let removeInput = document.querySelector('#removeInput'); // catturiamo elemento per inserire il nome che andremo a eliminare
let modifyNameInput = document.querySelector('#modifyNameInput'); // catturiamo elemento per inserire il nome che vogliamo percare per modificare                
let modifyNumberInput = document.querySelector('#modifyNumberInput'); // catturiamo elemento per inserire il numero che vogliamo percare per modificare     



// Modale                            ( per modifica nome e numero dalla rubrica)
let modifyModalElement = document.querySelector('#modifyModalElement'); // catturiamo la modale in modo da farla apparire e poi nascondere
let modifyModal = new bootstrap.Modal(modifyModalElement);  //  Catturiamo un istanza dell'oggetto Modal, Con questa istruzione, stiamo dicendo a Bootstrap che la modale specificata da modifyModalElement deve essere gestita tramite JavaScript
let saveChangesButton = document.querySelector('#saveChangesButton'); // Catturiamo il bottone salva modifiche per la modale


// Variabile d'appoggio
let check = false; // variabile di appoggio


const rubrica = {


    // array di oggetti
    lista_contatti: [
        { contact_name: 'DarkAngels', phone_number: 3333333333 },
        { contact_name: 'AdeptusAstartes', phone_number: 4444444444 },
        { contact_name: 'UltraMarines', phone_number: 9999999999 },
        { contact_name: 'SpaceWolves', phone_number: 9999999999 },
        { contact_name: 'BloodAngels', phone_number: 9999999999 },
        { contact_name: 'Orks', phone_number: 9999999999 },
        { contact_name: 'BloodAngels', phone_number: 99999944484899 },
    ],





    showContacts: function () {

        contactsWrapper.innerHTML = '';  // questo trucchetto serve per non duplicare ogni volta la rubrica, altrimenti cliccando due volte si duplica tutto

        this.lista_contatti.forEach((contatto) => {
            let div = document.createElement('div');   // Per ogni contatto creami un div
            div.classList.add('card-custom'); // Per ogni div aggiungimi la classe card-custom

            // per ogni div creami un innerHTML e creami Nome, cellulare e icona per eliminare
            // con il $ andrò a riportarmi quello che ho creato nell'array! ovviamente ciclando sempre grazie al forEach
            div.innerHTML = `
            <div class="d-flex justify-content-between align-items-center border p-3 mb-3 rounded shadow-sm bg-warning">
                <div>
                    <p class="mb-1 fs-5 fw-bold text-dark text-uppercase">${contatto.contact_name}</p>
                    <p class="mb-0 text-dark">${contatto.phone_number}</p>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-outline-dark btn-sm rounded-circle p-2 d-flex justify-content-center align-items-center" aria-label="Elimina contatto">
                        <i class="fa-solid fa-trash fs-5 icon"></i>
                    </button>
                    <button class="btn btn-outline-dark btn-sm rounded-circle p-2 d-flex justify-content-center align-items-center" aria-label="Modifica contatto" data-bs-toggle="modal" data-bs-target="#modifyContactModal">
                        <i class="fa-solid fa-pen fs-5 icon-modify"></i>
                    </button>
                </div>
            </div>
        `;

            contactsWrapper.appendChild(div);

        });
        //                          Rimuovi contatto secondo metodo (cliccando sull'icona)
        // Catturiamo le icone
        let icons = document.querySelectorAll('.icon'); // solo nel momento quando lanciamo la funzione showContact catturiamo le icone, prima le appendiamo e poi esistono le icone, quindi questo queryselector va posizionato qui!!
        // Fare Attenzione perchè icons è una nodelist e quindi un arraylike e quindi posso applicare solamente il metod foreach(), e quindi PER OGNI icona aggiungimi addEventListener

        icons.forEach((icona, i) => {  // per ogni icona fai un addEventListener, i sarebbe indice dell icona
            icona.addEventListener('click', () => {
                this.lista_contatti.splice(i, 1); // fammi lo splice su l indice dell icona 
                this.showContacts(); // LANCIARE SEMPRE showcontacts altrimenti non parte il foreach per eliminare il contatto!

            });

        });


        //                             Modifica nome e numero di un contatto dalla rubrica
        // Catturiamo tutte le icone con la classe 'icon-modify' 
        let modifyIcons = document.querySelectorAll('.icon-modify');

        // Aggiungiamo un evento click su ciascuna icona per modifica
        modifyIcons.forEach((icona, i) => { // anche qui per ogni icona "modifica" c'è un addEventListener, i è l'indice dell'icona
            icona.addEventListener('click', () => {
                let contattoCorrente = this.lista_contatti[i]; // Recuperiamo il contatto corrente dalla lista contatti tramite l'indice
                modifyNameInput.value = contattoCorrente.contact_name; // Precompilo il campo del nome nella modale con il nome del contatto selezionato
                modifyNumberInput.value = contattoCorrente.phone_number; // Stessa cosa anche per il numero di telefono

                modifyModal.show(); // Mostra la modale tramite il metodo .show()


                saveChangesButton.onclick = () => {
                    contattoCorrente.contact_name = modifyNameInput.value; // // Aggiorno il nome del contatto con il valore che l'utente ha inserito nella modale
                    contattoCorrente.phone_number = modifyNumberInput.value; // Aggiorna il numero

                    modifyModal.hide(); // Nascondiamo la modale richiamando il metodo hide()  (fornito da bootstrap)

                    rubrica.showContacts(); // Mostriamo la lista contatti aggiornata
                };
            });
        });



    },







    addContact: function (newName, newNumber) {  // metodo per aggiungere nuovo contatto
        if (newName && newNumber) {
            this.lista_contatti.push({ contact_name: newName, phone_number: newNumber });
            this.showContacts();  // Per aggiungere un nuovo contatto andremo a pushare un intero oggetto, a contactName andrà newName e ovviamente a phone_number andrà newNumber
            // prima pushami la lista e poi me la mostri
            if (check == false) {   // se check è uguale a false allora lancia rubrica.showContacts() e poi check diverrà true
                check = true;
                showContactsBtn.innerHTML = 'Nascondi Contatti';
            }
        } else {
            alert('Devi inserire sia nome che numero!!!');
        }
    },






    removeContact: function (removeName) {

        let names = this.lista_contatti.map((contatto) => contatto.contact_name.toLowerCase()); // clonami l'array con .map (salvalo in names) e restituiscimi solo i nomi in modo che mi vado a cercare il nome che vorrò andare ad eliminare, perchè la rimozione contatti ossia removeContact accetta come parametro il nome
        let index = names.indexOf(removeName.toLowerCase()); // cosi con indexOff otterrò l'indice del nome che vorrò andare a eliminare, trasformato anche questo in minuscolo

        if (index >= 0) {  // questo controllo serve per evitare l'effetto "pacman", ossia se io scrivo un nome che non è presente in rubrica mi cancella l'ultimo contatto, grazie a questo controllo evito questo errore
            this.lista_contatti.splice(index, 1); // qui mi elimina l'indice del clone dell'array andando poi a eliminare il contatto dall'array vero e proprio, ossia quello di oggetti!
            rubrica.showContacts(); // Dopo che hai eliminato il contatto mostrami la rubrica aggiornata

            if (check == false) {   // se check è uguale a false allora lancia rubrica.showContacts() e poi check diverrà true
                check = true;
                showContactsBtn.innerHTML = 'Nascondi Contatti';
            }

        }
        else {
            alert("Non hai inserito nulla!!!");
        }
    }

};









// Metodi per mostrare, aggiungere cercare ed eliminare un contatto

// Mostra contatto
showContactsBtn.addEventListener('click', () => {  // all'evento click su showContactsBtn (che sarebbe il tasto Mostra Contatti) fai partire l'evento showContacts
    if (check == false) {  // se check è uguale a false allora lancia rubrica.showContacts() e poi check diverrà true
        rubrica.showContacts();
        check = true;
        showContactsBtn.innerHTML = 'Nascondi Contatti';
    } else {
        contactsWrapper.innerHTML = '';
        check = false;
        showContactsBtn.innerHTML = 'Mostra Contatti';
    }
});






// Aggiungi contatto
addContactBtn.addEventListener('click', () => {
    rubrica.addContact(nameInput.value, numberInput.value);  // richiamo il value che è quello che andrò a scrivere per aggiungere i contatti
    nameInput.value = '';
    numberInput.value = '';

    if (check == false) {  // se check è uguale a false allora lancia rubrica.showContacts() e poi check diverrà true
        check = true;
        showContactsBtn.innerHTML = 'Nascondi Contatti';
    }
});





// Rimuovi contatto primo metodo (inserendo il nome nell' input)
removeContactBtn.addEventListener('click', () => {
    rubrica.removeContact(removeInput.value);  // Passa il valore di removeInput che contiene il nome del contatto da rimuovere
    // richiamiamo questa volta il removeInput.value che mi permette di eliminare il nome
});






