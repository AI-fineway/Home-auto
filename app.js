const getElement = (selector)=>{
    const element = document.querySelector(selector);
  if (element) return element 
  throw Error (
 `Please double Check class names , thers no such as ${selector} class`
  )  
}    
const innerid =[] ;
const links = getElement('.nav-links')
const navBtnDom = getElement('.nav-btn')
const btn = getElement('.btn-primary')

var isDragging = false;
var previousX = 0;

var items = ['fridge', 'bulb1', 'bulb2', 'mom-Sw', 'dad-Sw']
var states =  ['1', '2', '3', '4', '5']
var admins = ['downstair' , 'palours','backyard', 'frontyard']
var check = [1, 1 , 0 , 1, 0] //true,true ,false,false,true];


navBtnDom.addEventListener('click',()=>
{  
  console.log("Hi!")
    links.classList.toggle('show-links')
})


const dragArea = document.querySelector(".li");
new Sortable(dragArea,{
    animation:350 ,
    easing: "ease-in", // Easing for animation. Defaults to null. See https://easings.net/ for examples.
    onStart:function (/**Event*/evt) 
    {
     
      dragging =  evt.oldIndex;  // element index within parent

        console.log("Hey!")
        console.log(items)
    },
    // Element dragging ended
	onEnd: function (/**Event*/evt)
   {
    dragging =  evt.oldIndex;
		draggedOver = evt.newIndex;  // element's new index within new parent
	  var index1 = items[dragging];
      var index = check[dragging];
      
      check.splice(dragging, 1)// at old index remove 1 item
      check.splice(draggedOver, 0,  index) // at new index,
      // remove nothing and add new index item
      items.splice(dragging, 1)// at old index remove 1 item
      items.splice(draggedOver, 0,  index1) // at new index,
      // remove nothing and add new index item

    console.log("Hey!2")
    console.log(dragging)
    console.log(draggedOver)
    console.log(items)
    console.log(index1)
    console.log(check)
     renderItems(items)	
	}

    });




const date  = getElement('#date')
const currentYear = new Date().getFullYear();
date.textContent = currentYear;
var Admin = document.getElementById('drops')

var list = document.getElementById('list')
var base1, base3 , base2, randomized, dragging, draggedOver;


const genData = (array , check ,admin ) => {
  base1 = array.slice() // this is contents of admins
  base2 = check.slice()
  base3 = admin.slice()
  randomized = base1
  
      renderItems(items) 
      renderAdmin(base3)
 
}



var dx = 0, dy = 0, draggedItem = undefined;

const renderAdmin =(array)=>{
    Admin.innerHTML =''
   
    admins.forEach((element ,index) => {
      console.log('hey')
    var ads = document.createElement("a");
    var brek = document.createElement('br');
    ads.href ='#'
    let admi = admins[index]
    ads.classList.add(".dropdown-item")
    
    ads.innerHTML = admi
    ads.appendChild(brek)
    Admin.appendChild(ads)
  });
  }


const renderItems = (data) =>{
  list.innerHTML = ''
  
  data.forEach((item , index)=>{
    let state =states[index]
    var node = document.createElement("li");
     var inner = document.createElement("input")
     var grab_div =  document.createElement("div");
     var grab_img =  document.createElement("img");
     var span =  document.createElement("span");
     var grab_text = document.createTextNode("Drag me");

     node.classList.add("dragg");
     grab_div.classList.add('grab-div')
    grab_img.src = 'assets/grab.png'
    
    inner.type = "checkbox"
    inner.onclick  = change ;
    inner.value=inner.checked;
   inner.checked = check[index] ;
   
   node.innerHTML = item[0].toUpperCase() + item.substring(1);
   span.appendChild(grab_text)
   grab_div.appendChild(grab_img)
   grab_div.appendChild(span)
   node.appendChild(grab_div)
   node.appendChild(inner)
    list.appendChild(node)
  })  
    }

    change = function(){
      check =[] ;
      var checkboxes = document.querySelectorAll('input[type=checkbox]');
      for (var i = 0; i < checkboxes.length; i++) {
       
      if(checkboxes[i].checked){
        check.push(1);
      }
      else{
        check.push(0);
      }
      

        }
        
      console.log(check)
      console.log(checkboxes.length)
      //console.log('i was toggled')

    }
   	
    
genData(items , check, admins)// this array will be obtained from server 
