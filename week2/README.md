Assignment: Building a Magic 8 Ball
-

This week we'll be making a Magic 8 ball. In case you've never used one, they work like [this](https://www.youtube.com/watch?v=9gaQwIrBNPw). You ask the ball a question, shake it, and it shows you one of several answers.

You can design and stylize your 8 ball however you'd like using HTML/CSS. It doesn't need to resemble a traditional 8 ball, and it can return answers other than text (i.e. images, sounds, etc.) I'm using :cat: images for mine. Your 8 ball should show at least 8 different responses when you click the "shake" button. In a different class, we'll see how to make our answers display when we actually shake our phone instead of clicking a button!

## 1: Setting up the HTML

Let's start by making an empty `HTML` document.

```HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Magic 8 Ball</title>
</head>

<body>
</body>

<script>
	// Our JS code goes here
</script>
</html>
```

We're going to need to add a button and a place to show our fortune text when we click the button.

```HTML
<body>
	<div id="eight-ball">
		<p id="question"></p>
		<p id="answer"></p>
		<button onclick="shake()">Shake</button>
	<div>
</body>
```
We'll need an element to show our question `<p id="question">` and one to show the answer `<p id="fortune">`. You can change the HTML structure for your 8 Ball, but we'll still need the question and answer ids to use in our Javascript program.

## 2: Adding Javascript

Now let's write some Javascript! When the button we added to our `<body>` is clicked, the `onclick` attribute will tell it to call our `shake()` function, so we'll need to create that.

```Javascript
<script>

	// Called when we click the shake button 
	function shake(){
		// all of our logic will go here
	}
	
</script>
```

Ok, so after we shake the 8 Ball, we'll need to ask the user a question. We can use Javascript's built in `prompt()` function to do this. We'll store the response in a variable, and access to DOM show it in the element with the `question` id.

```Javascript
	function shake(){

		// The question we asked
		var question = prompt("Ask me a question");
		var questionText = document.getElementById('question');
		questionText.innerHTML = question;
	}
````

Now we'll need to create a variable to store the number of answers we want to show, and a create variable for each answer. We'll see how we can simplify this logic next class using [arrays](http://www.w3schools.com/js/js_arrays.asp). If you already know some javascript, feel free to use [arrays](http://www.w3schools.com/js/js_arrays.asp) to store your answers and/or use a [switch](http://www.w3schools.com/js/js_switch.asp) statement to display them.

```Javascript
	function shake(){
		// The question we asked
		var question = prompt("Ask me a question");
		var questionText = document.getElementById('question');
		questionText.innerHTML = question;

		// Number of possible answers  
		var numberOfAnswers = 2;
		
		// Answers the 8 Ball can return
		var answerOne = '<img src="images/no.png"/>';
		var answerTwo = '<img src="images/yes.png"/>';  
	}
```
Since the answers are going inserted to the DOM as HTML, I decided to use images tags. You can easily use text by just changing the variable value (i.e ```var answerOne = "No";```). 

Now we need a way of randomly selecting a number between 1 and the value of `numberOfAnswers`. To do that we can use these functions

```Javascript
		// Returns a number based on the number of sides
		function getAnswerNumber(answerCount){
			var number = getRandomInt(1,answerCount);
			return number;
		}

		// Returns a random integer between two numbers
		function getRandomInt(min,max){
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		}
```		
`getAnswerNumber()` accepts a count and will return a random number between 1 and whatever the count is. We'll discuss how `getRandomInt()` next week when we dig into objects a bit more, but it essentially uses Javascript's `Math` object to calculate a random number between a min and max value.

We're also going to create a function to insert one of our answers into the HTML document based on the random we get back from `getAnswerNumber(answerCount)`. 

```Javascript
		// Show our answer in the document 
		function displayAnswer(answer) {

			// Access the DOM element we want to to change
			var fortuneText = document.getElementById('answer');

			if ( answer == 1 ) {
				fortuneText.innerHTML = answerOne;
			}
			else if ( answer == 2 ) {
				fortuneText.innerHTML = answerTwo;
			}			
		}
```

We first get the element with the `fortune` id so we can modify it. Then we check which answer number was passed in and insert our corresponding answer. You'll need to create at least 6 answers (or more if you want) for this assignment.

The last thing we need to do is call the `getAnswerNumber(answerCount)` function to get a random number and pass it into the `displayAnswer(answer)` function.

```Javascript
		// Answer returned by our 8 Ball
		var chosenAnswer = getAnswerNumber(numberOfAnswers);		
		displayAnswer(chosenAnswer);
```

## 4: Finishing up

Your final HTML document will probably look something like the one below (your code will have more answers and your HTML document will probably be structured differently based on how you want to design your 8 ball).

```Javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Magic 8 Ball</title>
<style>
#eight-ball{
	width:500px;
	margin: 0 auto;
	text-align: center;
}
</style>
</head>

<body>
	<div id="eight-ball">
		<button onclick="shake()">Shake</button>
		<p id="question"></p>
		<p id="answer"></p>
	<div>
</body>

<script>

	// Called when we click the shake button 
	function shake(){
		// The question we asked
		var question = prompt("Ask me a question");
		var questionText = document.getElementById('question');
		questionText.innerHTML = question;

		// Number of possible answers  
		var numberOfAnswers = 2;

		// Answers the 8 Ball can return
		var answerOne = '<img src="images/no.png"/>';
		var answerTwo = '<img src="images/yes.png"/>';		

		// Answer returned by our 8 Ball
		var chosenAnswer = getAnswerNumber(numberOfAnswers);		
		displayAnswer(chosenAnswer);

		// Returns a number based on the number of sides
		function getAnswerNumber(answerCount){
			var number = getRandomInt(1,answerCount);
			return number;
		}

		// Returns a random integer between two numbers
		function getRandomInt(min,max){
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		// Show our answer in the document 
		function displayAnswer(answer) {

			// Access the DOM element we want to to change
			var fortuneText = document.getElementById('answer');

			if ( answer == 1 ) {
				fortuneText.innerHTML = answerOne;
			}
			else if ( answer == 2 ) {
				fortuneText.innerHTML = answerTwo;
			}
		}

	}
</script>

</html>
```

