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
         students[i].style.display = 'block';
      }
   }

   




/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks() {
   const maxPage = Math.ceil(students.length/10)
}
Math.ceil(35/10)





// Remember to delete the comments that came with this file, and replace them with your own code comments.


})
