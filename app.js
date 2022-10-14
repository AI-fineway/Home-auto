const getElement = (selector)=>{
    const element = document.querySelector(selector);
  if (element) return element 
  throw Error (
 `Please double Check class names , thers no such as ${selector} class`
  )  
}    

const links = getElement('.nav-links')
const navBtnDom = getElement('.nav-btn')

var isDragging = false;
var previousX = 0;

var items = ['fridge', 'bulb1', 'bulb2', 'mom-room-bulb', 'dad-room-bulb']
var states =  ['1', '2', '3', '4', '5']
var admins = ['downstair' , 'palours','backyard', 'frontyard']



navBtnDom.addEventListener('click',()=>
{  
    links.classList.toggle('show-links')
})

const date  = getElement('#date')
const currentYear = new Date().getFullYear();
date.textContent = currentYear;
var Admin = document.getElementById('Admin')
var list = document.getElementById('list')
var base1, base3 , base2, randomized, dragging, draggedOver;


const genData = (array , state ,admin ) => {
  base1 = array.slice()
  base2 = state.slice()
  base3 = admin.slice()
  randomized = base1
  // if (randomized.join("") !== base.join("")){
      renderItems(randomized) 
      renderAdmin(base3)
  //  } else {
  //    //recursion to account if the randomization returns the original array
  //    genRandom()
  //  }
}

var dx = 0, dy = 0, draggedItem = undefined;

const renderAdmin =(array)=>{
    Admin.innerText =''
   
    array.forEach((element ,index) => {
    var ads = document.createElement("div");
    let admi = admins[index]
    ads.classList.add("nav-link")
    ads.innerHTML = admi
    Admin.appendChild(ads)
  });
  }

const renderItems = (data) =>{
  list.innerHTML = ''
  //list.remove();
  
  data.forEach((item , index)=>{
    let state =states[index]
    var node = document.createElement("div");
    var node = document.createElement("div");
  //   node.id = "switch-box"
  //   var status =  document.createElement("div");
  //   status.id ="status"
  //   var name =  document.createElement("span");
  //   name.id = 'name'
  //   //name.innerHTML = state
  //   var indicator = document.createElement("span");
  //   indicator.id = "span"
    var inner = document.createElement("input")
  
    inner.type = "checkbox"
    inner.id = "toggle"
    inner.draggable = true ;
    node.draggable = true ;
    

  node.addEventListener('dragstart', setDragStart) 
   node.addEventListener('drag', setDragging) 
    node.addEventListener('dragover', setDraggedOver)
    node.addEventListener('drop', compare) 
    
   node.innerHTML = item
  //  status.appendChild(indicator)
  //   status.appendChild(name)
     //node.appendChild(inner)
  //  node.appendChild(status)
    list.appendChild(inner)
  })
}

const compare = (e) =>{

  var index1 = randomized.indexOf(dragging);
  var index3 = states.indexOf(dragging);

  var index2 = randomized.indexOf(draggedOver);
  var index4 = states.indexOf(draggedOver);

  randomized.splice(index1, 1)
  states.splice(index3, 1)

  randomized.splice(index2, 0, dragging)
  states.splice(index4, 0, dragging)
console.log(states)

  renderItems(randomized)

};


const setDraggedOver = (e) => {
  e.preventDefault();
  draggedOver = Number.isNaN(parseInt(e.currentTarget.innerHTML)) ? e.currentTarget.innerHTML:  e.currentTarget.innerHTML

}

const setDragStart = (e) =>{
  draggedItem = e.currentTarget;
  dx = e.clientX - draggedItem.getBoundingClientRect().x;
  dy = e.clientY - draggedItem.getBoundingClientRect().y;
  draggedItem.style.position = 'relative';
}

const setDragging = (e) =>{
  draggedItem = e.currentTarget;
  dragging = Number.isNaN(parseInt(e.currentTarget.innerHTML)) ? e.currentTarget.innerHTML : e.currentTarget.innerHTML
    draggedItem.classList.add("dragged")
    draggedItem.style.left = e.ClientX - dx;
    draggedItem.style.top = e.ClientY - dy;
}


  

		
		



genData(items , states, admins)// this array will be obtained from server 
