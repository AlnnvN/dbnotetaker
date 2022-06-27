const textArea = document.getElementById("text-area");
const saveButton = document.getElementById("save-button");
const displayDiv = document.getElementById("display-div");
const body1 = document.getElementsByTagName("body");

saveButton.addEventListener('click',()=>{//save button - create new note

    let isRepeated = false;//check for repeated texts
    for (let i = 0; i < displayDiv.children.length; i++) {
        if(textArea.value === displayDiv.children[i].children[1].innerHTML){
            isRepeated = true;
        }
    }

    if(textArea.value != "" && textArea.value[0] != " " && isRepeated === false)
    createNewNote(textArea.value);
    textArea.value = ""; //resets text area after input
})

textArea.addEventListener('keydown', e=>{//auto resize
    autoResize();
});

textArea.addEventListener('keyup', e=>{//auto resize
    autoResize();
});

//functions - global

function createNewNote(input){

    var noteDiv, buttonDiv;
    var number = displayDiv.children.length+1;

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

            let n = number;

            let modal = document.createElement('div'); //criação do modal (fundo branco)
            modal.id = "modal";
            modal.className ="bottom-border";
            background1.appendChild(modal);

            let detailsTitle = document.createElement('h3'); //criação do titulo da nota detalhada
            detailsTitle.id="note-title";
            modal.appendChild(detailsTitle);
            detailsTitle.innerHTML = innerHTML = "Note " + n;

            let pDetails = document.createElement('p'); //criação do paragrafo da nota detalhada
            pDetails.innerHTML = input;
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
        text.innerHTML = input; //takes input parameter from user
        noteDiv.appendChild(text);
    }

    function createTitle() {
        let title = document.createElement("h3"); //new title
        title.innerHTML = "Note " + number; //changes title name (dynamic number)
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

