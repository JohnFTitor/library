02/09/2021: First I created the first basic page design in which to work on. Then I worked on the display function, which can add the book cards to the page based on the library array. If there is a book already displayed on the page, then it isn't displayed again, avoiding mistakely adding the same book objects.

03/09/2021: Today I created an overlay on the page whenever the add book button is pressed , thus creating this form pop up effect. It was interesting the way it worked as it was simple analisis, I just needed to put the elements in the same DOM level, give them a fixed position and a z-index. The rest was just creating it with a RGBA background. I just learned this today, so it was worth. Now I just need to add functionality to the page.

06/09/2021: Added functionality to the form pop up, now making use of the previously defined functions, adding it to the list and displaying them in the container. Additionaly, remove and edit buttons were added to each bookcard, alongside a bit of style. The functionality for the remove button works, even deleting the item within the "myLibrary" array. Edit button is in progress. 

07/09/2021: Added functionality to the edit button, making use of the same form. Learned a way to do it by creating a new submit button in the form, unenable its default behaviour, create an event listener for the submit button and whenever it was pressed or cancelled, the program deletes this submit button of the DOM. Now I'm working in the implementation of the toggle read status button.

