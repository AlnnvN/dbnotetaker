const textArea = document.getElementById("text-area");
const saveButton = document.getElementById("save-button");
const displayDiv = document.getElementById("display-div");
const body1 = document.getElementsByTagName("body");

var localStorageName = "note-taker-local-storage";
var hasLoaded = false;

loadNotes();

saveButton.addEventListener('click',()=>{//save button - create new note

    let isRepeated = false;//check for repeated texts
    for (let i = 0; i < displayDiv.children.length; i++) {
        if(textArea.value === displayDiv.children[i].children[1].innerHTML){
            isRepeated = true;
        }
    }

    if(textArea.value != "" && textArea.value[0] != " " && isRepeated === false && hasLoaded)
    {
        createNewNote(displayDiv.children.length,textArea.value);
    }
    
    if(hasLoaded)
    {
        textArea.value = ""; //resets text area after input
    }
    
})

textArea.addEventListener('keydown', e=>{//auto resize
    autoResize();
});

textArea.addEventListener('keyup', e=>{//auto resize
    autoResize();
});

//functions - global

function createNewNote(index, input){

    var noteDiv, buttonDiv;

    if(hasLoaded)
    {
        editStorageNumber(index,index+1);
        editStorageText(index,input);//store data
    }
    
    createNoteDiv();
    createTitle();
    createText();
    createButtonDiv();
    createDetailButton();
    createDeleteButton();

    //functions
    function createDeleteButton() {
        let delBtn = document.createElement("button");
        delBtn.className = "del-button display-btn btn";
        delBtn.appendChild(document.createTextNode("X"));
        buttonDiv.appendChild(delBtn);

        delBtn.addEventListener('click', () => {
            removeStorage(findArrayValueIndex(getStorage(),delBtn.parentElement.parentElement.children[1].innerHTML))
            delBtn.parentElement.parentElement.remove();
        });
    }

    function createDetailButton() {
        var background1;

        let detailBtn = document.createElement("button"); //cria o botão principal nas notas
        detailBtn.className = "detail-button display-btn btn";
        detailBtn.appendChild(document.createTextNode("View Detail"));
        buttonDiv.appendChild(detailBtn);

        detailBtn.addEventListener('click', () => { //função do botão de detalhes
            showBackground();//função para criar fundo embaçado
            showDetails();//função para criar nota detalhada
            showExitBtn();//função para criar botão de saída
        });

        function showExitBtn(){
            let exitButton = document.createElement('button'); //criação do botão de saída da nota detalhada
            exitButton.id = "exit-button";
            exitButton.classList.add('btn');
            exitButton.appendChild(document.createTextNode('Voltar'));
            background1.appendChild(exitButton);

            exitButton.addEventListener('click',()=>{ //função de saída
                background1.remove(); //destroi parent (background)
            })
        }

        function showDetails() {

            let n = index;

            let modal = document.createElement('div'); //criação do modal (fundo branco)
            modal.id = "modal";
            modal.className ="bottom-border";
            background1.appendChild(modal);

            let detailsTitle = document.createElement('h3'); //criação do titulo da nota detalhada
            detailsTitle.id="note-title";
            modal.appendChild(detailsTitle);
            detailsTitle.innerHTML = innerHTML = "Note " + (n+1);

            let pDetails = document.createElement('p'); //criação do paragrafo da nota detalhada
            pDetails.innerHTML = getStorageIndex(n).text;
            modal.appendChild(pDetails);

        }

        function showBackground() {
            background1 = document.createElement("div");
            background1.id = "modal-div";
            document.body.appendChild(background1);
            console.log("working");
        }
    }

    function createButtonDiv() {
        buttonDiv = document.createElement("div"); //creates div for buttons
        buttonDiv.classList.add("display-btn-div");
        noteDiv.appendChild(buttonDiv); //appends buttons' div to note div
    }

    function createText() {
        let text = document.createElement("p"); //creates paragraph
        text.innerHTML = getStorageIndex(displayDiv.children.length-1).text; //takes input parameter from user
        noteDiv.appendChild(text);
    }

    function createTitle() {
        let title = document.createElement("h3"); //new title
        title.innerHTML = "Note " + getStorageIndex(displayDiv.children.length-1).number; //changes title name (dynamic number)
        noteDiv.appendChild(title);
    }

    function createNoteDiv() {
        noteDiv = document.createElement("div"); //creates note div
        noteDiv.className = "note-div bottom-border"; //classes note div
        displayDiv.appendChild(noteDiv); //appends note div to display div
    }
}

function autoResize(){
    
    textArea.style.paddingBottom = "0px";
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight+"px";
    textArea.parentElement.style.height = textArea.scrollHeight+"px";
    return;
}

function loadNotes() {
    if(getStorage() === null)//creates storage if inexistent
    {
        resetStorage();
    }

    if (getStorage().length > 0) { //load notes if ready
        console.log("ready to load");
        for (let i = 0; i < getStorage().length; i++) {
            createNewNote(i,"");
        }
    }

    hasLoaded = true;
}

function resetStorage()
{
    localStorage.setItem(localStorageName,"[]");
}

function getStorage()
{
    return JSON.parse(localStorage.getItem(localStorageName));
}

function editStorageText(index,value)
{
    let storage = getStorage();
    
    storage[index][1] = value;
    localStorage.setItem(localStorageName,JSON.stringify(storage));
    return;
}

function editStorageNumber(index,value)
{
    let storage = getStorage();
    
    storage[index] = [];
    storage[index][0] = value;
    localStorage.setItem(localStorageName,JSON.stringify(storage));
    return;
}

function getStorageIndex(index)
{
    let storage = getStorage();
    let text = storage[index][1];
    let number = storage[index][0];
    return {text,number};
}

function findArrayValueIndex(array, value)
{
    let index;
    for (let i = 0; i < array.length; i++) {
        if(value === array[i][1])
        {
            index = i;
            break;
        }
    }
    return index;
}

function removeStorage(index)
{
    let storage = getStorage()
    storage.splice(index,1);
    localStorage.setItem(localStorageName,JSON.stringify(storage));
    return;
}