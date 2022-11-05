const Lists = document.querySelector(".card-list");
const elForm = document.querySelector(".form");
const elInput = document.querySelector(".search-js");

const elSelect = document.querySelector(".select-js");
const elsort = document.querySelector(".inputSort");
const startY = document.querySelector(".startY");
const endY = document.querySelector(".endY");




const chopilganPoke = pokemons.splice(0 , 120);
const qop = document.createDocumentFragment();



function pokeSort (arr,item){
  if (item == "A-Z"  ) {
    arr.sort((a,b)=>{

      if ( a.name < b.name ) {
        return -1
      }
      else if (a.name > b.name){
        return 1
      }

    })
  }

  if (item == "Z-A"  ) {
    arr.sort((a,b)=>{
      
      if ( a.name < b.name ) {
        return 1
      }
      else if (a.name > b.name){
        return -1
      }

    })

  }

  if (item == "F-T") {
    console.log("Aaa");
    arr.sort(( a , b ) => {
     return parseFloat(a.weight) - parseFloat(b.weight) 
    })    
  }

  if (item == "T-F") {
    arr.sort(( a , b ) => {
     return parseFloat(b.weight) - parseFloat(a.weight) 
    })    
  }



 

}



const arrSelect = []
const selectFrag = document.createDocumentFragment()

chopilganPoke.forEach(item => {
  item.weaknesses.forEach(i => {
      if (!arrSelect.includes(i)){
          arrSelect.push(i)
      }
  } )
 })

 arrSelect.forEach(item =>{
   const option = document.createElement("option");
   option.textContent = item
   selectFrag.appendChild(option)
 })
  elSelect.appendChild(selectFrag)




function domDrew ( chopilganPoke, Lists){
Lists.innerHTML = ""

  for (let poke of chopilganPoke) {
    const elTemp = document.querySelector(".template").content.cloneNode(true);
    
    elTemp.querySelector(".big").textContent = poke.name
    elTemp.querySelector(".but").textContent = poke.num
    elTemp.querySelector(".text").textContent = poke.type.join(" ")
    elTemp.querySelector(".img").src = poke.img;
    elTemp.querySelector(".img").width = "100";
    elTemp.querySelector(".img").height = "100";
    elTemp.querySelector(".img").alt =poke.name;
    elTemp.querySelector(".weaknesses").dataset.id = poke.id;

    qop.appendChild(elTemp)
    Lists.appendChild(qop)
  }
}
domDrew(chopilganPoke ,Lists )

  
// weaknesses alertga chiqarish
Lists.addEventListener("click", function (evt) {
  chopilganPoke.forEach(item => {
   if (item.id == evt.target.dataset.id) {
     alert(item.weaknesses.splice(", " ))
     
   }
  })
 })
 
 
//  domga chizish

elForm.addEventListener("submit", function (evt){
evt.preventDefault()

const elInputValue =  elInput.value.trim()
const reGek = new RegExp ( elInputValue ,"gi")
const fiterPoke = chopilganPoke.filter(item => {
  const natija = item.name.match(reGek) && (elSelect.value == "all" || item.weaknesses.includes(elSelect.value) ) && (startY.value == "" || Number(startY.value) <= item.candy_count) && (endY.value == "" || Number(endY.value) >= item.candy_count) 
  return natija ;
})

 
console.log(fiterPoke);
if(fiterPoke.length > 0){
  pokeSort(fiterPoke , elsort.value)
  domDrew(fiterPoke , Lists)
}
else{
  Lists.innerHTML = "Not Found"
}
})
