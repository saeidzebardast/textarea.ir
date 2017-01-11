/**
 * http://code.runnable.com/U5HC9xtufQpsu5aj/use-javascript-to-save-textarea-as-a-txt-file
 */
function saveTextAsFile(textareaId) {
  // grab the content of the form field and place it into a variable
  var textToWrite = getTextContent(textareaId);
  //  create a new Blob (html5 magic) that conatins the data from your form feild
  var textFileAsBlob = new Blob([textToWrite], {
    type: 'text/plain'
  });
  // Specify the name of the file to be saved
  var fileNameToSaveAs = "textarea.ir.txt";

  // Optionally allow the user to choose a file name by providing
  // an imput field in the HTML and using the collected data here
  // var fileNameToSaveAs = txtFileName.text;

  // create a link for our script to 'click'
  var downloadLink = document.createElement("a");
  //  supply the name of the file (from the var above).
  // you could create the name here but using a var
  // allows more flexability later.
  downloadLink.download = fileNameToSaveAs;
  // provide text for the link. This will be hidden so you
  // can actually use anything you want.
  downloadLink.innerHTML = "My Hidden Link";

  // allow our code to work in webkit & Gecko based browsers
  // without the need for a if / else block.
  window.URL = window.URL || window.webkitURL;

  // Create the link Object.
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  // when link is clicked call a function to remove it from
  // the DOM in case user wants to save a second file.
  downloadLink.onclick = destroyClickedElement;
  // make sure the link is hidden.
  downloadLink.style.display = "none";
  // add the link to the DOM
  document.body.appendChild(downloadLink);

  // click the new link
  downloadLink.click();
}

/**
 * remove the link from the DOM
 * @param event
 */
function destroyClickedElement(event) {
  document.body.removeChild(event.target);
}

/**
 * Add new lines character for \r
 *
 * @param text
 * @returns {string}
 */
function addNewLines(text) {
  text = text || '';
  return text.replace(/\n/g, "\r\n");
}

function getTextContent(textareaId) {
  var text = document.getElementById(textareaId).value;
  text = addNewLines(text);
  return text;
}

/**
 * Save content of textarea to localStorage
 * @param textareaId
 */
function saveTextInLocalStorage(textareaId) {
  localStorage.setItem('text', getTextContent(textareaId))
}

/**
 * Load text from localStorage and update textarea content.
 * @param textareaId
 */
function loadPreviousText(textareaId) {
  document.querySelector('#' + textareaId).value = localStorage.getItem('text');
}

/**
 * Clear text and localStorage data.
 */
function clearText(textareaId) {
  document.querySelector('#' + textareaId).value = '';
  localStorage.removeItem('text');

}

window.onload = function () {
  var textareaId = document.querySelector('textarea').id;

  loadPreviousText(textareaId);

  window.addEventListener('input', function () {
    saveTextInLocalStorage(textareaId)
  });
};
