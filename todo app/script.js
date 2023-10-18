const input = document.querySelector(".input")
const btnAdd = document.querySelector(".btns")
const addVal = btnAdd.innerText
const todoBody = document.querySelector(".todoBody")
let localArray =[]
let edit_val = null;



let localGet = localStorage.getItem("user")
if(localGet != null){
localArray = JSON.parse(localGet)
}


display()
btnAdd.onclick = () => {
  let inputVal = input.value;

if(edit_val != null){
  // edit
  localArray.splice(edit_val,1,{"name" : inputVal})
  edit_val = null
}else{
  // insert
  localArray.push({"name": inputVal})
}


saveData(localArray)
input.value =""
btnAdd.innerHTML = addVal
}



function display(){
  let html= "";
 localArray.forEach((value,index) => {
  html+= `<tr>
  <th scope="row">${index+1}</th>
  <td>${value.name}</td>
  <th scope="col"><i class="fs-5 me-5 ri-file-text-line" onclick="editFun(${index})"></i> <i class="fs-5 ri-delete-bin-fill" onclick="deleteFun(${index})"></i>
  </tr>
`
 })
 todoBody.innerHTML = html
}



// savelocal
function saveData (array){
  let stores = localStorage.setItem("user", JSON.stringify(array))
  display()
}





// editTodo
function editFun(index){
  edit_val = index
  input.value = localArray[index].name
  btnAdd.innerText = "Add Btn"

}



// delete
function deleteFun (i){
  localArray.splice(i,1)
  saveData(localArray)
}









// scarch
const search = document.querySelector(".search")
const todoBodyTr = document.querySelectorAll(".todoBody tr")
search.addEventListener("input", (e) => {
  let ser = e.target.value.toLocaleLowerCase()
  todoBody.innerHTML = ""
  todoBodyTr.forEach(value => {
    let todovalue = value.querySelectorAll("td")
    if(todovalue[0].innerText.toLocaleLowerCase().indexOf(ser) > -1){
      todoBody.appendChild(value)
    }
  })
  if(todoBody.innerHTML === ""){
    todoBody.innerHTML = "Search is not found"
  }
})







///////////page 
let tr = document.querySelectorAll(".todoBody tr")
let record_per_page = 5;
let page_num = 1;
let total_record = tr.length;
let Total_page =Math.ceil(total_record / record_per_page)
console.log(Total_page)
pagination()
displayPage()

function displayPage(){
  let startIndex = (page_num -1) * record_per_page
  console.log(startIndex)
  let endIndex = startIndex + (record_per_page -1)
  console.log(endIndex)

  if(endIndex >= total_record){
    endIndex = total_record -1
  }

  let stateMent = "";
  for(let i = startIndex; i <= endIndex; i++){
    stateMent += `<tr>${tr[i].innerHTML}</tr>`
  }
  todoBody.innerHTML = stateMent

  document.querySelectorAll(".dynamik-item").forEach(item=> {
    item.classList.remove("active")
  })

  document.querySelector(`#page${page_num}`).classList.add("active")

  if(page_num == 1){
    let prev = document.querySelector("#prev")
    prev.classList.add("disabled")
  }else{
    let prev = document.querySelector("#prev")
    prev.classList.remove("disabled")
  }

  if(page_num == Total_page){
    document.querySelector("#next").classList.add("disabled")

  }else{
    document.querySelector("#next").classList.remove("disabled")
  }

  const pageDts = document.querySelector("#page-dts")
  pageDts.innerHTML = `Showing ${startIndex +1} of ${endIndex +1} page ${total_record}`
}



function pagination(){
let prev = `<li id="prev" class="page-item"><a class="page-link" href="#"  onclick="prevBtn()">Previous</a></li>`
let next = `<li id="next" class="page-item"><a class="page-link" href="#" onclick="NextBtn()">Next</a></li>`
  let btn = ""
  let activityCls = "";
for(i=1; i<= Total_page; i++){
  if(i === 1){
    activityCls = "active"
  }else{
    activityCls = ""
  }
  btn += `<li id="page${i}" class="${activityCls} dynamik-item page-item"><a class="page-link" href="#" onclick="page(${i})">${i}</a></li>`
}

const peginationm = document.getElementById("peginationm")
peginationm.innerHTML = `${prev} ${btn} ${next}`
}



function prevBtn (){
  page_num--
  displayPage()
}

function NextBtn (){
  page_num++
  displayPage()
}

function page(i){
page_num = parseInt(i)
displayPage()
}



let record_size = document.querySelector("#record-size")
record_size.addEventListener("change", (e) => {
  record_per_page = parseInt(record_size.value)
  Total_page =Math.ceil(total_record / record_per_page)
  page_num = 1

displayPage()
pagination()

})