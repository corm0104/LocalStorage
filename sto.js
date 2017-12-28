const key = 'corm0104';


let contacts = [];
/*
    {"name" :"","phone":"","email":""},
    {"name" :"","phone":"","email":""},
    {"name" :"","phone":"","email":""},
    {"name" :"","phone":"","email":""},
    {"name" :"","phone":"","email":""},
    {"name" :"","phone":"","email":""},
    {"name" :"","phone":"","email":""}
]

 let ppl = {"people":[
    {"id":1, "name":"Elmina"},
    {"id":2, "name":"Robyn"},
    {"id":3, "name":"John"},
    {"id":43425, "name":"Tanvi"}
]};
let str = JSON.stringify(contacts);
*/

        
    /*const updateList= function(){
        let ul = document.querySelector('ul.contacts');
        ul.innerHTML ="";
        let df = new DocumentFragment();
        contacts.forEach((contact)=>{
            df.appendChild(createItem(contact));
        });
        ul.appendChild(df); 
        */
        
        
        
    
function init(){
    console.log('init') ;
    //document.getElementById("save-button").addEventListener('click', save);
     contacts = exampleContacts;
    
    if(!localStorage.getItem(key)){
        contacts = exampleContacts;
        let str = JSON.stringify(exampleContacts);
        localStorage.setItem(key, str);
    }else{
        contacts = JSON.parse(localStorage.getItem(key));
    }
    
    
    updateList();

}


function updateList(){
    console.log('updatelist');
    let list = document.getElementById('list');
    list.innerHTML = "";
    contacts.forEach((person)=>{
        let li = document.createElement('li');
        
        li.setAttribute("data-id", person.id);
        
        
        li.classList.add("contact");
      
         let span = document.createElement('span');
        span.classList.add ('delete');
        li.appendChild(span);
        
        
        let h3 = document.createElement('h3');
        li.appendChild(h3);
        h3.textContent =person.name;
        
        let p = document.createElement('p');
        p.classList.add('email');
        li.appendChild(p);
        p.textContent=person.email;
        
         let p1 = document.createElement('p');
        p1.classList.add('phone');
        li.appendChild(p1);
        p1.textContent=person.phone;
    
        
        //li.innerHTML = "<span class='delete'></span><h3>"+person.name + "</h3>" + "<p class='email'>" + person.email + "</p><p class='phone'>" + person.phone + "</p></li>" ;
        
    span.addEventListener('click', removeContact);
        
        list.appendChild(li);
        
        console.log(person.id);
    });
}

/*
function save(ev){
    ev.preventDefault();
    let btn = ev.currentTarget;
    let id = parseInt(btn.getAttribute('data-person'));
    console.log("id", id);
    let nm=document.getElementById('nm').value;
    if(id){
        //edit
        contacts.forEach(person=>{
            if(person.id == id){
                person.name = nm;
                console.log("nm", nm);
            }
        });
        updateList();
    }else{
        //add
        let newId = Math.floor(Math.random() * 1000) + 12333;
        let person = {id:newId, name:nm};
        contacts.push(person);
        updateList();
    }
    document.getElementById('nm').value = "";
    document.getElementById('save-button').setAttribute('data-person', "0");
}
*/

/*function edit(ev){
    let li = ev.currentTarget;
    let id = li.getAttribute('data-id');
    let selectedPerson = null;
    contacts.forEach(person=>{
        if( person.id == id){
            selectedPerson = person;
        }
    });
    if(selectedPerson != null){
        let input = document.getElementById('nm');
        input.value = selectedPerson.name;
        let btn = document.getElementById('btnSave');
        btn.setAttribute('data-person', selectedPerson.id);
        
    }else{
        //such bad. no person
    }
}
*/

//document.addEventListener('DOMContentLoaded', init);   
            
    
    
const createItem = function(contact){
    let li = document.createElement('li');
    li.className = 'contact';
    let span = document.createElement('span');
    span.className= 'delete';
    span.setAttribute('data-key', contact.email);
    span.addEventListener('click', removeContact);
    li.appendChild(span);
    let h3 = document.createElement('h3');
    h3.textContent = contact.fullname;
    li.appendChild(h3);
    let pa = document.createElement('p');
    pa.className = 'email';
    pa.textContent = contact.email;
    li.appendChild(pa);
    let pp = document.createElement('p');
    pp.className = 'email';
    pp.textContent= contact.phone;
    li.appendChild(pp);
    return li;
}
    
const showForm = function(ev){
    console.log('show form');
    ev.preventDefault(); document.querySelector('main').style.opacity ='0';
    document.querySelector('.fab').style.opacity ='0';
    document.querySelector('.contactform').style.display ='block';
    document.querySelector('.overlay').style.display ='block';      
}


const hideForm = function(ev){
 ev.preventDefault(); document.querySelector('main').style.opacity ='1';
 document.querySelector('.fab').style.opacity ='1';
 document.querySelector('.contactform').style.display ='none';
 document.querySelector('.overlay').style.display ='none';
}


const addContact= function(ev){
    ev.preventDefault();
    let obj = {};
    let name = document.getElementById('input-name').value.trim();
    let email = document.getElementById('input-email').value.trim();
    let phone = document.getElementById('input-phone').value.trim();
    if(name && email && phone){
        let id = Math.floor(Math.random() * 1000) + 12333;
        obj ={id, name, email, phone};
        contacts.push(obj);
        localStorage.setItem(key, JSON.stringify(contacts));
        document.querySelector('.contactform form').reset();
        hideForm( new MouseEvent('click'));
        updateList();
    }else{
        alert('Form not filled in');
    }
}
        
        
const removeContact = function(ev){
    ev.preventDefault();
    let email = ev.target.getAttribute('data-key');
    console.log(email);
    contacts = contacts.filter((contact)=>{
        console.log(contact.email, email)
        return!(contact.email == email);
    });

    console.log(contacts)
    localStorage.setItem(key, JSON.stringify(contacts));
    updateList();

}
    
    
    
//document.querySelector('.fab').addEventListener('click', function() { alert('fefwef');});    

    
document.querySelector('.fab').addEventListener('click', showForm);
document.querySelector('#save-button').addEventListener('click', addContact);
document.querySelector('#cancel-button').addEventListener('click', hideForm);
    
    
    
    


    
    
    

document.addEventListener('DOMContentLoaded', init);




