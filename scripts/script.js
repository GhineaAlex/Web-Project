function mOver(obj) {
  obj.innerHTML = "De ce ai atins?"
}

function mOut(obj) {
  obj.innerHTML = "Atinge cu mouse-ul"
}
const buttonElement = document.getElementById('btn');


buttonElement.addEventListener('click', function (event) {
  alert('WOHOO');
});

function uniCharCode(event) {
  var char = event.which || event.keyCode;
  document.getElementById("demo").innerHTML = char;
}

const buttonElement1 = document.getElementById('btn1');
var elimina = document.getElementById('btn');
buttonElement1.addEventListener('click', function (event) {
  elimina.remove();
  alert('WOHOO, Ai eliminat butonul');
});

var para = document.createElement("p");
var node = document.createTextNode("This is new and it was created with JS.");
para.appendChild(node);
var element = document.getElementById("div1");
element.appendChild(para);

function myFunction() {
  document.getElementById("demo").innerHTML = "De ce ai facut asta?";
}

const list = document.getElementById('list');
const formName = document.getElementById('formName');
const formUrl = document.getElementById('formUrl');
const addButton = document.getElementById('addButton');
let updateButton = document.getElementById('updateButton');


function getMeteorite() {
    fetch('http://localhost:3000/meteorites')
        .then(function (response) {
            response.json().then(function (meteorites) {
                appendMeteoriteToDOM(meteorites);
            });
        });
};

function postMeteorite() {
    const postObject = {
        name: formName.value,
        img: formUrl.value
    }
    fetch('http://localhost:3000/meteorites', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () {
        getMeteorite();
        resetForm();
    });
}

function deleteMeteorite(id) {
    fetch(`http://localhost:3000/meteorites/${id}`, {
        method: 'DELETE',
    }).then(function () {
        getMeteorite();
    });
}

function updateMeteorite(id) {
    const putObject = {
        name: formName.value,
        img: formUrl.value
    }
    fetch(`http://localhost:3000/meteorites/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    }).then(function () {
        getMeteorite();
        addButton.disabled = false;
        clearUpdateButtonEvents();

        resetForm();
    });
}

function editMeteorite(meteorite) {
    formName.value = meteorite.name;
    formUrl.value = meteorite.img;

    addButton.disabled = true;

    clearUpdateButtonEvents();

    updateButton.disabled = false;
    updateButton.addEventListener('click', function () {
        updateMeteorite(meteorite.id)
    });

}

function appendMeteoriteToDOM(meteorites) {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    for (let i = 0; i < meteorites.length; i++) {

        let img = document.createElement('img');
        img.src = meteorites[i].img;

        let name = document.createElement('span');
        name.innerText = meteorites[i].name;

        let editButton = document.createElement('button')

        editButton.addEventListener('click', function () {
            editMeteorite(meteorites[i])
        });
        editButton.innerText = 'Edit';
        let deleteButton = document.createElement('button')

        deleteButton.addEventListener('click', function () {
            deleteMeteorite(meteorites[i].id)
        });
        deleteButton.innerText = 'Delete';

        let container = document.createElement('div');

        container.appendChild(img);
        container.appendChild(name);
        container.appendChild(editButton);
        container.appendChild(deleteButton);


        list.appendChild(container);
    }
}

function resetForm() {
    formName.value = '';
    formUrl.value = '';
}
function clearUpdateButtonEvents() {
    let newUpdateButton = updateButton.cloneNode(true);
    updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
    updateButton = document.getElementById('updateButton');
}
addButton.addEventListener('click', postMeteorite);

getMeteorite();
