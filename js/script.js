/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   


//Allows app to work even if script tag is added at the head of the html
window.addEventListener('DOMContentLoaded', () => {

   // Global variables
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

   


   function appendPageLinks(totalElementsNumber) {

      //storing maximum number of pages in a variable
      const maxPage = Math.ceil(totalElementsNumber.length/10);

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

      //Adding click Listener to change page when page number is clicked 
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
      const div = document.createElement('div');
      div.className = 'student-search';
      const button = document.createElement('button')
      const input = document.createElement('input');
      button.textContent = "Search"
      div.appendChild(input);
      div.appendChild(button);

      pageHeader.appendChild(div);
   }


   function filterSearch() {
      const input = document.querySelector('input');
      const button = document.querySelector('button');

      //Event triggered whenever the input changes 
      button.addEventListener('click', (e) => {
         const paginationDiv = document.querySelector('.pagination')

         // Hide all students and only show students which matches with the search results
         hideStudents();
         const search = input.value;

         //Remove current paginationDiv to add updated paginationDiv for the search
         page.removeChild(paginationDiv);

         if (search === ''){
            //Return to page 1 if input field is empty 

            showPage(1); 
            appendPageLinks(students);
            deleteErrorMessage();

         } else {
            // Get all student names and loop through them
            const studentNames = document.querySelectorAll('.student-details h3')
            const matches = [];

            for (let i=0; i<studentNames.length; i++) {
               textContent = studentNames[i].textContent;

               // If student name aligns with the search, show the element
               if (textContent.startsWith(search)) {
                  const li = studentNames[i].parentNode.parentNode;
                  li.style.display = 'block';
                  matches.push(textContent);
               }
            }
            //Create paginationDiv in accordance to the number of search results
            appendPageLinks(matches);
            if (matches.length ===0) {
               createErrorMessage();
            }
         }
   
      })
   }

   //Delete error message when its not needed 
   function deleteErrorMessage() {
      const errorMessage = document.querySelector('.error-message');
      page.removeChild(errorMessage);
   }

   // create error message when no search results is found
   function createErrorMessage() {
      const errorMessage = document.createElement('h4');
      errorMessage.className = "error-message";
      errorMessage.textContent = 'No results have been found';
      page.appendChild(errorMessage);
   }


   // Functions to be called when page refreshes/start
   function initialize() { 
      //Load page 1
      showPage(1); 
      createSearchBar()
      filterSearch()
      appendPageLinks(students);
   }

   initialize()


})
