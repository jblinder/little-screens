Assignment: Fortune Teller wrap-up
-

This week we're going to finish up our fortune teller with showing a fortune when a shake gesture is detected. We're going to be using an existing javascript library called [Shake.js](https://github.com/alexgibson/shake.js/) to help us detect a shake.

[Download the library](https://github.com/alexgibson/shake.js/archive/master.zip) and drag the `shake.js` file into your repository (you can have it be in the top level of the folder, or create a folder called `js`). Assuming you created a folder called `js`, add the following line to the `<head>` tag of your html file.

```
<script type="text/javascript" src="js/shake.js"></script>
```

Let's also add a `<meta>` tag inside the `<head>` part of our HTML document that prevents the user from zooming, sets our page to initially zoom at 100%, and sets the width of the page to the device's browser width.


```
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
```

If you want to use different parameters for you design (i.e. having a larger width than the device window, or is zoomed in/out at a different scale) feel free to change these variables.

Now we need to listen for the `window` object's `onload` event, so we'll wrap up our existing javascript in the following code block:

```Javascript
<script>
window.onload = function() {
	// Our Javascript from last week goes here
};
</script>
```
Next, we'll add an event listener for the custom `shake` event and create a callback function that is triggered when a shake occurs. We'll call our existing `shake()` function inside this callback function.
```Javascript
    window.addEventListener('shake', shakeEventDidOccur, false);

    //function to call when shake occurs
    function shakeEventDidOccur () {
        shake();
    }
```

And that's it! Your final Javascript code should look something like the code below. I removed the code that prompts the user to enter a question and displays it. For your final code, you can optionally keep it in or remove it.

```Javascript
<script>
window.onload = function() {
    window.addEventListener('shake', shakeEventDidOccur, false);

    //function to call when shake occurs
    function shakeEventDidOccur () {
        shake();
    }


    var fortuneTeller = {
        promptText: "Ask me a question.",
        answerType: "text",     
        answers: [
            "yes",
            "no",
            "maybe",
            "never!",
            "outlook isn't good"
        ],
        getAnswer: function(){
            var min = 1;
            var max = this.answers.length;
            var index = Math.floor(Math.random() * (max - min + 1)) + min;
            return this.answers[index-1]; // Subtract 1 from the index
        }
    };

    function shake() {
        // Display the question the user asked
        var questionText = document.getElementById('question');
        questionText.innerHTML = question;

        // Ask our fotruneTeller for a random answer
        var randomAnswer = fortuneTeller.getAnswer();

        // Access the DOM element we want to to change
        var fortuneText = document.getElementById('answer');

        // Update the element with our answer.
        fortuneText.innerHTML = randomAnswer;
    }
};
</script>
```

You can either update your repository from last week or create a new one. [Refer to the last week's assignment](https://github.com/jblinder/little-screens/blob/master/week3/README.md#5-uploading-your-code) if you need a refresher on how to upload to GitHub.
