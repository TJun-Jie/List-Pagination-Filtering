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
   function showPage(page, elements) {

      hideStudents();

      // Finding the starting index and the ending index of the students that needs to be shown
      const start = (parseInt(page) -1 ) * 10;
      const end = parseInt(page)  * 10;

      //  Displaying the students that needs to be shown
      for(let i=start; i < end ; i++){
         //If there is student at that spot, then set the  display. There might not be any students  at the 55th place
         if (elements[i]) {
            elements[i].style.display = 'block';
         }
      }
   }

   


   function appendPageLinks(totalElementsNumber, elements) {

      //storing maximum number of pages in a variable
      const maxPage = Math.ceil(totalElementsNumber/10);

      //creating div element and adding the class 'pagination' to it
      const div = document.createElement('div');
      div.className = 'pagination'

      //Creating ul element
      const ul = document.createElement('ul')

      //creating page number and appending page number to ul
      for (i = 0; i < maxPage ; i++) {
         const li = document.createElement('li');
         const a = document.createElement('a');
         //Setting the cursor to a pointer when hovering over the page numbers
         a.style.cursor = 'pointer'
         // since index is zero-based, i + 1 in order for page to start from 1
         a.textContent = `${i+1}`
         li.appendChild(a);
         ul.appendChild(li)
      }

      //Adding click Listener to change page when page number is clicked 
      ul.addEventListener('click', (e) => {

         if (e.target.tagName === 'A') {
            const page = e.target.textContent;
            showPage(page, elements);

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

      //Make sure the active class of the button is on 1 when new page loads
      const loadFirstpage = document.querySelectorAll('.pagination a')[0]
      loadFirstpage.className = 'active'

   }

   //Creating searchBar function
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


   // filtersearch function
   function filterSearch() {
      const input = document.querySelector('input');
      const button = document.querySelector('button');

      //Event triggered whenever the input changes 
      button.addEventListener('click', (e) => {
         const paginationDiv = document.querySelector('.pagination')

         // Hide all students and only show students which matches with the search results
         hideStudents();
         const search = input.value;

         //Remove current paginationDiv (if there is one )to add updated paginationDiv for the search
         if (paginationDiv) {
            page.removeChild(paginationDiv);
         }

         if (search === ''){
            //Return to page 1 if input field is empty 

            showPage(1, students); 
            appendPageLinks(students.length, students);
            deleteErrorMessage();

         } else {
            // Get all student names and loop through them
            const studentNames = document.querySelectorAll('.student-details h3')
            const matches = [];

            for (let i=0; i<studentNames.length; i++) {
               textContent = studentNames[i].textContent;

               // If student name aligns with the search, show the element
               if (textContent.includes(search)) {
                  const li = studentNames[i].parentNode.parentNode;
                  li.style.display = 'block';
                  const studentDiv = studentNames[i].parentNode.parentNode
                  matches.push(studentDiv);
               }
            }
            if (matches.length ===0) {
               createErrorMessage();
            } else {
               //Create paginationDiv in accordance to the number of search results and show page 1 of the results
               showPage(1, matches)
               appendPageLinks(matches.length, matches);
               deleteErrorMessage();
            }
         }
   
      })
   }

   //Delete error message when its not needed 
   function deleteErrorMessage() {
      const errorMessage = document.querySelector('.error-message');
      if (errorMessage) {
         page.removeChild(errorMessage);
      }
   }

   // create error message when no search results is found
   function createErrorMessage() {
      //If no errorMessage, then create error message. 
      const errorMessage = document.querySelector('.error-message');
      if (!errorMessage) {
         const errorMessage = document.createElement('h4');
         errorMessage.className = "error-message";
         errorMessage.textContent = 'No results have been found';
         page.appendChild(errorMessage);
      }
   }


   // Functions to be called when page refreshes/start
   function initialize() { 
      //Load page 1
      showPage(1, students); 
      createSearchBar()
      filterSearch()
      appendPageLinks(students.length, students);
   }

   initialize()


})
