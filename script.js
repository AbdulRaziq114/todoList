import { collection, addDoc, db, getDocs, updateDoc, deleteDoc, doc } from "./firebaseConfige.js";

let listArr = [];
let listUpdateId = '';
let btnValueCheck = false;
let listItem = document.querySelector("#input");

let addlist = async () => {
    if (listItem.value != "") {
        try {
            const todoList = await addDoc(collection(db, "todoList"), {
                listItem: listItem.value,
                completed: false,
            });
            listItem.value = "";
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        getList();
    }
    else{
          alert("Please enter a list item.");

    }
};
let inpbtn = document.querySelector("#inpBtn");
inpbtn.addEventListener("click", () => { btnfunc(btnValueCheck) });
let btnfunc = (btnValueCheck) => btnValueCheck ? updateList(listUpdateId) : addlist();

let getList = async () => {
    try {
        let list = await getDocs(collection(db, "todoList"));
        listArr = [];
        list.forEach((doc) => {
            listArr.push({
                ...doc.data(),
                id: doc.id
            })
        });
        renderScreen();
    } catch (e) {
        console.error("Error readding document: ", e);
    }
};
getList();

let deleteList = async (id) => {
    try {
        await deleteDoc(doc(db, "todoList", id));
        listArr = listArr.filter((list) => list.id != id);
        renderScreen();
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
};

let editList = (id) => {
    listArr.forEach((ids) => {
        if (ids.id == id) {
            listItem.value = ids.listItem;
            listUpdateId = id;
        }
    });
    inpbtn.innerText = "Update";
    btnValueCheck = true;
    renderScreen();
}

let updateList = async (id) => {
    try {
        let value = false;
        listArr.forEach((ids) => {
            if (ids.id == id) {
                if(ids.listItem != listItem.value){
                    ids.listItem = listItem.value;
                    value = true;
               }else{
                alert("Please update the input list item.");
                
               }
            }
        });
        if (value) {
            const update = doc(db, "todoList", id);
            await updateDoc(update, { listItem: listItem.value });
            listItem.value = "";
            listUpdateId = "";
            inpbtn.innerText = "Add";
            btnValueCheck = false;
            renderScreen();
        };

    } catch (e) {
        console.error("Error update document: ", e);
    }
};

let renderScreen = () => {
    let mainlistDiv = document.querySelector(".listMainDiv");

    mainlistDiv.innerHTML = "";
    listArr.forEach((item) => {
        let editbtn = document.createElement("button");
        let deletebtn = document.createElement("button");
        let listDiv = document.createElement("div");
        let check = document.createElement("input");
        let text = document.createElement("p");
        let icone1 = document.createElement("i");
        let icone2 = document.createElement("i");

        listDiv.className = "list_div";
        check.id = "check";
        check.type = "checkbox";
        check.checked = item.completed;
        check.value = item.id;
        checkvalue(check, editbtn, icone1);

        check.addEventListener("change", () => {
            checkvalue(check, editbtn, icone1);
            doneList(check.value);

        });

        text.innerText = item.listItem;
        editbtn.className = "edite";
        editbtn.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
        icone1.className = "fa-solid fa-ban fa-lg icone icone1";
        editbtn.appendChild(icone1);
        editbtn.addEventListener("click", () => { editList(item.id) });
        deletebtn.className = "delete";
        deletebtn.innerHTML = `<i class="fa-solid fa-trash-can "></i>`;
        icone2.className = "fa-solid fa-ban fa-lg icone icone1";
        visiblecmnd(check, editbtn, deletebtn, icone1, icone2, btnValueCheck);
        deletebtn.addEventListener("click", () => { deleteList(item.id) });
        deletebtn.appendChild(icone2);
        listDiv.appendChild(check);
        listDiv.appendChild(text);
        listDiv.appendChild(editbtn);
        listDiv.appendChild(deletebtn);
        mainlistDiv.appendChild(listDiv);

    });


    document.querySelector(".sec2").innerHTML = `
     <h2>${listArr.filter((obj) => obj.completed == true).length}/${listArr.length}</h2>`;
}



let doneList = async (id) => {
    try {
        const update = doc(db, "todoList", id);
        await updateDoc(update, {completed: true});
        listArr.filter((ids) =>{if(ids.id == id) ids.completed = true;});
        renderScreen();
    } catch (e) {
        console.error("Error done document: ", e);
    }
};

let checkvalue = (check, editbtn, icone) => {
    if (check.checked == true) {
        check.disabled = true;
        check.style = `
        appearance:auto;
        height: 15px;
        width: 15px;    
        outline:none;
        `;
        editbtn.disabled = true;
        icone.style = " visibility:visible";

    };
}
let visiblecmnd = (check, editbtn, deletebtn, icone1, icone2, value) => {
    if (value) {
        check.disabled = true;
        editbtn.disabled = true;
        deletebtn.disabled = true;
        icone1.style = "visibility:visible";
        icone2.style = "visibility:visible";
    }
};