import { collection, addDoc, db, getDocs, updateDoc,deleteDoc, doc } from "./firebaseConfige.js";

let listArr = [];
let listUpdateId=''; 
let btnValueCheck =false;
let listItem = document.querySelector("#input");
// -------- AddLIst-----------
let addlist = async () => {
    if (listItem.value !=""){
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
};
let inpbtn = document.querySelector("#inpBtn");
inpbtn.addEventListener("click",()=>{btnfunc(btnValueCheck)});
let btnfunc =(btnValueCheck)=>{
    btnValueCheck ? updateList(listUpdateId) : addlist();
}

// -------- getLIst-----------

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

// ----------deleteList----------

let deleteList =async (id) => {
    try {
    await deleteDoc(doc(db, "todoList", id));
      listArr = listArr.filter((list)=>list.id != id);
      renderScreen();
    } catch (e) {
        console.error("Error deleting document: ", e);
        
    }
};


// ------editeList-------------

let editList = (id)=>{
        listArr.forEach((ids) => {
        if (ids.id == id) {
        listItem.value =ids.listItem;
        listUpdateId=id;
        }
     });
     inpbtn.innerText="Update";
     btnValueCheck = true;
    
}

let updateList =async (id) => {
    try {
        const update = doc(db, "todoList", id);
        await updateDoc(update, {
            listItem:listItem.value,
        });
        listArr.forEach((ids) => {
            if (ids.id == id) {
                ids.listItem = listItem.value;
            }
            
        });
     
        listItem.value="";
        renderScreen();
        listUpdateId="";       
        inpbtn.innerText="Add"; 
        btnValueCheck = false;

    } catch (e) {
        console.error("Error update document: ", e);
    }
};







let renderScreen = () => {
    let mainlistDiv = document.querySelector(".listMainDiv");
    mainlistDiv.innerHTML = "";
    listArr.forEach((item) => {
        let listDiv = document.createElement("div");
        listDiv.className = "list_div";

        let check = document.createElement("input");
        check.id = "check";
        check.type = "checkbox";
        check.checked = item.completed;
        check.value = item.id;
        checkvalue(check);

        check.addEventListener("change", () => {
            checkvalue(check);
            doneList(check.value);

        });

        let text = document.createElement("p");
        text.innerText = item.listItem;
        let editbtn = document.createElement("button");
        editbtn.className = "edite";
        editbtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';
        editbtn.addEventListener("click", () => { editList(item.id) })
        
        let deletebtn = document.createElement("button");
        deletebtn.className = "delete";
        deletebtn.innerHTML = '<i class="fa-solid fa-trash-can "></i>';
        deletebtn.addEventListener("click", () => { deleteList(item.id) });
        listDiv.appendChild(check);
        listDiv.appendChild(text);
        listDiv.appendChild(editbtn);
        listDiv.appendChild(deletebtn);
        mainlistDiv.appendChild(listDiv);
        
    });
}





// --------------donelist--------

let doneList = async (id) => {
    try {
        const update = doc(db, "todoList", id);
        await updateDoc(update, {
            completed: true
        });
        listArr = listArr.filter((ids) => {
            if (ids.id == id) {
                ids.completed = true;
            }

        });
        
    } catch (e) {
        console.error("Error done document: ", e);
    }
};

let checkvalue = (check) => {
    if (check.checked == true) {
        check.disabled = true;
        check.style = `
        appearance:auto;
        height: 15px;
        width: 15px;    
        outline:none;
        `;
    };
}
