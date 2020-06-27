/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


//Allows app to work even if script tag is added at the head of the html
window.addEventListener('DOMContentLoaded', () => {

/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

   const students = document.querySelectorAll('.student-item');
   const page = document.querySelector('.page');



// Hiding all students
   function hideStudents() {
      for (let i=0; i < students.length ; i ++) {
         students[i].style.display = 'none';
      } 
   }

// ShowPage function which shows the students on that page and hide the rest of the students
   function showPage(page) {

      hideStudents();

      // Finding the starting index and the ending index of the students that needs to be shown
      const start = (parseInt(page) -1 ) * 10;
      const end = parseInt(page)  * 10;

      //  Displaying the students that needs to be shown
      for(let i=start; i < end ; i++){
         if (students[i]) {
            students[i].style.display = 'block';
         }
      }
   }

   


function appendPageLinks(totalElements) {

   //storing maximum number of pages in a variable
   const maxPage = Math.ceil(totalElements.length/10);

   //creating div element and adding the class 'pagination' to it
   const div = document.createElement('div');
   div.className = 'pagination'

   //Creating ul element
   const ul = document.createElement('ul')

   //creating page number and appending page number to ul
   for (i = 0; i < maxPage ; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      // since index is zero-based, i + 1 in order for page to start from 1
      a.textContent = `${i+1}`
      li.appendChild(a);
      ul.appendChild(li)
   }

   //Adding eventListener to change page when page number is clicked 
   ul.addEventListener('click', (e) => {

      if (e.target.tagName === 'A') {
         const page = e.target.textContent;
         showPage(page);

         //Remove active classes from all page numbers
         const numberLink = document.querySelectorAll('.pagination a')
         for (let i = 0; i < numberLink.length; i ++) {
            numberLink[i].classList.remove('active');
         }
         //Adding active class when page number is clicked.
         e.target.className = 'active'
      }

   })

   //appending ul to div
   div.appendChild(ul);

   //appending div to the main page
   page.appendChild(div);
 
}

//Creating searchBar
function createSearchBar() {
   const pageHeader = document.querySelector('.page-header');
   const input = document.createElement('input');
   pageHeader.appendChild(input);
}


function filterSearch() {
   const input = document.querySelector('input')

   //Event triggered whenever the input changes 
   input.addEventListener('input', (e) => {

      // Hide all students and only show students which matches with the search results
      hideStudents();
      const search = e.target.value;
      if (search === ''){
         //Return to page 1 if input field is empty 
         showPage(1); 
      } else {
         // Get all student names and loop through them
         const studentNames = document.querySelectorAll('.student-details h3')
         for (let i=0; i<studentNames.length; i++) {
            textContent = studentNames[i].textContent
            // If student name aligns with the search, show the element
            if (textContent.startsWith(search)) {
               const li = studentNames[i].parentNode.parentNode;
               li.style.display = 'block';
            }
         }
      }

      
      
   })
}


createSearchBar()
filterSearch()

appendPageLinks(students);



//Loads page 1 when browser refresh
showPage(1); 




})
