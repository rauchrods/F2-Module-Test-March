
let students = [];


let formobj = document.querySelector("form");

let global_id;

formobj.addEventListener("submit", (e) => {
    e.preventDefault();

    

    let namedata = document.querySelector("#name").value;
    let emaildata = document.querySelector("#email").value;
    let gpadata = document.querySelector("#gpa").value;
    let agedata = document.querySelector("#age").value;
    let degreedata = document.querySelector("#degree").value;

    if(document.querySelector("#changebutton").value == "Edit Student"){
        console.log("this will edit and not add");
        console.log(global_id);
        let index;

        for (let i = 0; i < students.length; i++) {
            if (students[i].id == global_id) {
                index=i;
                break;
            }
        }

        let studentobj = students[index];

        studentobj.name = namedata;
        studentobj.email = emaildata;
        studentobj.GPA = gpadata;
        studentobj.age = agedata;
        studentobj.degree = degreedata;

        students[index] = studentobj;
        localStorage.setItem("students",JSON.stringify(students));

        updatetableinfo(students);
        alert(`Student with id ${global_id} updated Successfully!`);
        document.querySelector("#changebutton").value = "Add Student";
        console.log(students);

        return;
    }



    let student = {
        id: students.length + 1,
        name: namedata,
        email: emaildata,
        GPA: gpadata,
        age: agedata,
        degree: degreedata
    }
    students.push(student);

    localStorage.setItem("students",JSON.stringify(students));

    updatetableinfo(students);

    alert(`Student with id no ${student.id} succesfully added`);

     console.log(students);

});

function updatetableinfo(students) {
    let tbodyobj = document.querySelector("tbody");
    let str = "";
    for (let i = 0; i < students.length; i++) {
        str += `
        <tr>
        <td>${students[i].id}</td>
        <td>${students[i].name}</td>
        <td>${students[i].email}</td>
        <td>${students[i].age}</td>
        <td>${students[i].GPA}</td>
        <td>
         <div>

         ${students[i].degree}
         <div>
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="editstudent(${students[i].id})">
         <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="deletestudent(${students[i].id})">
         <path d="M3 6H5H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M10 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M14 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
         </div> 

         </div>
       
        </td>
        </tr>
        ` ;
    }
    tbodyobj.innerHTML = str;
}

function deletestudent(id) {

    for (let i = 0; i < students.length; i++) {
        if (students[i].id == id) {
            students.splice(i, 1);
            break;
        }
    }

    let new_id = 1;
    for (let i = 0; i < students.length; i++) {
        students[i].id = new_id;
        new_id++;

    }
    localStorage.setItem("students",JSON.stringify(students));
    updatetableinfo(students);
    console.log(students);
}

function editstudent(id) {
    let student;

    for (let i = 0; i < students.length; i++) {
        if (students[i].id == id) {
            student = students[i];
            break;
        }
    }

    document.querySelector("#name").value = student.name;
    document.querySelector("#email").value = student.email ;
    document.querySelector("#gpa").value = student.GPA;
    document.querySelector("#age").value = student.age;
    document.querySelector("#degree").value = student.degree;


    document.querySelector("#changebutton").value = "Edit Student";

     global_id=id;

    console.log(global_id);

}

function searchfunc(){
    let input_search = "";
    input_search = document.querySelector("#searchbox").value.toLowerCase();

  

    let tr_objects = document.querySelectorAll("tbody>tr");

    tr_objects.forEach((tr_obj)=>{
          let somarr = tr_obj.querySelectorAll("td");
          let name =  somarr[1].innerText.toLowerCase();
          let emailid = somarr[2].innerText.toLowerCase();
          let degree = somarr[5].innerText.trim().toLowerCase();

          if(name.indexOf(input_search)>-1 || emailid.indexOf(input_search)>-1 || degree.indexOf(input_search)>-1 ){
            tr_obj.style.display = "";
          }
          else{
            tr_obj.style.display = "none";
          }


    });

    console.log("hi");
}

(()=>{

    students  = JSON.parse(localStorage.getItem("students")) || [];
   console.log(students);
    updatetableinfo(students);

})();
