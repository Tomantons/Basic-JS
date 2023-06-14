// This line is importing a CSS file to style your web page. This CSS file is expected to be in the same directory as the current file.
import './style.css';

// This line selects the first HTML 'form' element found in the document. 'document.querySelector()' returns the first Element 
// within the document that matches the specified selector.
const form = document.querySelector('form');

// This line adds an event listener to the 'form'. This listener will trigger when the 'submit' event is fired, 
// which happens when a user tries to submit the form (e.g., clicking a submit button or pressing Enter).
form.addEventListener('submit', async (e) => {

  // This line prevents the form from performing its default submit action, which is to send a GET or POST request 
  // depending on its method attribute and then reload the page. We're doing this because we want to handle the 
  // request using JavaScript instead.
  e.preventDefault();
  showSpinner();

  // This line creates a new FormData object. FormData objects can compile a set of key-value pairs to send in an 
  // HTTP request. Here it's getting the data from the form.
  const data = new FormData(form);

  // Here, a POST request is being sent to 'http://localhost:8080/dream'. The second argument to 'fetch' is an 
  // options object. This request is being sent with the 'POST' method, and is sending JSON data, so we're setting 
  // 'Content-Type' header to 'application/json'. The body of the request is a JSON string that includes 'prompt' field 
  // from the form data.
  const response = await fetch('http://localhost:8080/dream', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt'),
    })
  })

  // Once the response from the fetch request is received, it is converted to JSON using the 'json()' method. 
  // The image URL received from the server is then de-structured from the response object.
  const { image } = await response.json();

  // Selecting the HTML element with the id 'result'.
  const result = document.querySelector('#result');

  // The innerHTML property of the result element is set to the image tag with the source attribute set to the 
  // image URL received from the server. Here, the image width is being set to 512 pixels.
  result.innerHTML = '<img src="${image}" width="512" />';

  hideSpinner();
})

function showSpinner() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>';
}

function hideSpinner() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Dream';
}
