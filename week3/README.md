Assignment: Arrays and Objects in practice
-

Last week we built our own fortune teller! Perhaps it looked like a traditional Magic 8-Ball, perhaps something totally different. At the very least, it showed us 1 of 8 different answers when tapped a button.

This week, we're going to use our knowledge of objects and arrays to restructure some of our current code. We won't really be touching the visual part of the code, since we already made our fortune teller look awesome using HTML/CSS. All of our changes will be about simplifying our existing code.

Last week our code looked something like the this:

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

This is a great, but let's see what we can do to make it more flexible.

## 2: Creating a Fortune Teller object

Let's think about our fortune teller in terms of an object. Currently, we press a button, a window displays asking for a question, and then we display 1 of 8 different answers to a user. If we transformed the core functionality of our fortune teller into an object, what properties would it have?  

1. Text to prompt a user  
2. A series of different answers  
3. The total number of answers  

That's pretty straightforward. Ok, let's rewrite our Javascript code to use a fortune teller object. You can either copy and paste your project folder from last week to a new project, or work off of your existing code (instructions to upload the code are at the end of this document.)

**Important**  
Make sure you use the same variable names from this assignment (i.e. naming your fortune teller object `fortuneTeller` and your array of answers `answers`.) We're going to use our own answers from last week and assign them as values to the new `answers` array. **So, you'll still be using your own answers from last week**, since part of last week's assignment was to create **at least 8 different answers of your own**. We're just restructing how they are stored and retrieved. You can also use your design from last week throughout this assignment, but feel free to change or update it along the way. By the end of this assignment, you shoul be able to add new answers to your answers array and not have to touch any other code in order for your project to work -- the rest of the logic will update on its own.


Ok, let's start by creating our `fortuneTeller` object and giving it a `promptText` property. This is the text we display to a user when we ask for their input. We'll use the [object literal notation](http://www.dyn-web.com/tutorials/object-literal/) we learned in class today.

```Javascript
<script>
	var fortuneTeller = {
		promptText: "Ask me a question." // Change this text to anything you'd like
	};
</script>
```

Now we need to add our answers from last week to the `fortuneTeller` object. Previously, we stored our answers in individual variables like this:

```Javascript
	var answerOne = 'Yes';
	var answerTwo = 'No';
```

We're now going to them in an array. Most of us chose to display our fortunes as text, so let's create an `answers` property that is of type `Array` and stores strings:

```Javascript
	var fortuneTeller = {
		promptText: "Ask me a question.",
		answers: [
			"yes",
			"no"
		]
	};
	console.log(fortuneTeller.answers);
```

When we look at the output from our `console.log` statement, our `fortuneTeller` object should display our answers as an array (the above code would log out `["yes,"no"]`). But what if we used images last week instead of text? Well, we can add our image file path to our array 
instead of the text answer. Since our `fortuneTeller` might be returning answers in different formats (i.e. text, images, etc.), we might also want to explicitly state what type of content we're returning, so let's also make a property called `answerType`. The value of `answerType` is either `"image"` or `"text"` based on what type of answer we're returning. So, if we were using images as our answers, our object would look like this (assuming our images are stored in folder called "images"):

```Javascript
	var fortuneTeller = {
		promptText: "Ask me a question.",
		answerType: "image",
		answers: [
			"images/yes.png",
			"images/no.png"
		]
	};
```
and if we used text, our object would look like 
```Javascript
	var fortuneTeller = {
		promptText: "Ask me a question.",		
		answerType: "text",
		answers: [
			"yes",
			"no"
		]
	};
```

Ok, so now that we've stored our answers, we need a way to access the total number of answers. Hmm, since our answers are in an array, we can just use `fortuneTeller.answers.length`. Cool, looks like our properties are complete! Our code show now look something like this:

```Javascript
<script>
	var fortuneTeller = {
		promptText: "Ask me a question.",
		answerType: "text",
		answers: [
			"yes",
			"no"
		]
	};
	console.log(fortuneTeller.answers);

	// Called when we click the shake button 
	function shake(){
	
	}
</script>
```

## 3: Getting an answer from the fortune teller object

Let's look at how we created a random number and used it to select an answer last week:

```Javascript
	// Number of possible answers  
	var numberOfAnswers = 2;
	// Answer number returned by our 8 Ball
	var chosenAnswer = getAnswerNumber(numberOfAnswers);   
	
 	function getAnswerNumber(answerCount){
		var number = getRandomInt(1,answerCount);
		return number;
    }

    // Returns a random integer between two numbers
    function getRandomInt(min,max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

```

Hmm, we could simplify this a bit by assigning by using our `fotuneTeller` object's `answers.length` property to tell us how many answers there are:
```Javascript
	var chosenAnswer = getAnswerNumber(fortuneTeller.answers.length); 
```
 That would get rid of the need for the `numberOfAnswers` variable. But there must be a simpler way to clean up this code. Since the `fortuneTeller` object already has an array of answers, what if we gave it method that returned a random answer so we don't even have to worry about passing a random number around? The only code we really need above is the statement that generates the random number. 

```Javascript
	Math.floor(Math.random() * (max - min + 1)) + min;
```
If added this code inside a method on our `fotuneTeller` object, we could pass in a parameter that tells this line of code to make the `max` number equal to our total number of answers. 

```Javascript
	getAnswer: function(max){
		var min = 1;
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
```
However, since the `fortuneTeller` object already knows how many answers it has, we can just use the `answers` property internally to determine the total number of answers. Remember in class when we used the `this` keyword? We're going to use it inside this method, because we're talking about the `answers` array inside the `fortuneTeller` object.

```Javascript
	getAnswer: function(){
		var min = 1;
		var max = this.answers.length;
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
```

So right now, this method is returning a random number between 1 and our total number of answers. But if we think about it, we can really just make this method return the actual answer we want, not the answer number like we were doing last week. Remember how we access an array item by its index? Let's use the random number we return inside this function to access an answer inside our `answers` array, and return that instead. 

```Javascript
	getAnswer: function(){
		var min = 1;
		var max = this.answers.length;
	    var index = Math.floor(Math.random() * (max - min + 1)) + min;
	    return this.answers[index];
	}
```
So let's take a look what's going on inside this function. 

1. We create a variable for the minimum random number we want called `min`. 
2. We use our `answers` array's `length` property for the `max` random number we want.
3. Then we generate a random number between these two numbers and store it in the variable `index`.
4. Finally, we access the answer at the random index and return it from our function. 

Let's run this code from our .html page a few times and see what happens in the Javascript console. 

```Javascript
<script>
	var fortuneTeller = {
		promptText: "Ask me a question.",
		answerType: "text",
		answers: [
			"yes",
			"no"
		],
		getAnswer: function(){
			var min = 1;
			var max = this.answers.length;
	    	var index = Math.floor(Math.random() * (max - min + 1)) + min;
	    	return this.answers[index];
		}
	};
	console.log(fortuneTeller.getAnswer());
	
	// Called when we click the shake button 
	function shake(){
	
	}
</script>
```

Oh no, FAILBLOG! Our Javascript console is giving us an answer sometimes, but other times telling us the answer is `undefined`. Why is that? Well, our random number in this case is between `1` and `2`, and we only have `2` elements in our array... 

Oh yeah! Arrays start at an index of `0`, so when we ask for `answers[2]`, nothing actually exists at that location, we're "out of bounds"! What we need to do is subtract `1` from the `index`, like this

```Javascript
	var fortuneTeller = {
		promptText: "Ask me a question.",
		answerType: "text",		
		answers: [
			"yes",
			"no"
		],
		getAnswer: function(){
			var min = 1;
			var max = this.answers.length;
	    	var index = Math.floor(Math.random() * (max - min + 1)) + min;
	    	return this.answers[index-1]; // Subtract 1 from the index
		}
	};
	console.log(fortuneTeller.getAnswer()); 
```

Now our random number is between 0-1 instead of 1-2. Success! Now we get back an answer random answer every time we call the `getAnswer()` method on the `fortuneTeller` object!

## 4: Displaying the fortune

Ok. we're almost done. We just need to display an answer. Lets see how we did that last week:

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
That's right, last week we passed in a random number into the `displayAnswer()` function, and used the number to determine which answer to display. But now we already have an answer, so... we can just display it and forget about using these conditionals. Wow, that's super easy! Let's put that code in our `shake()` function:

```Javascript
	function shake(){
		// Ask our fotruneTeller for a random answer
		var randomAnswer = fortuneTeller.getAnswer();
		
        // Access the DOM element we want to to change
        var fortuneText = document.getElementById('answer');
        
        // Update the element with our answer.
        fortuneText.innerHTML = randomAnswer;
	}
```

So now all we really do is ask our `fortuneTeller` for an answer, reference the DOM element we want to update, and update it's HTML. What if we used images for our `fortuneTeller`, like `images/no.png`? Well we could change our last line of code to be:

```Javascript
	function shake(){
		// Ask our fotruneTeller for a random answer
		var randomAnswer = fortuneTeller.getAnswer();
		
        // Access the DOM element we want to to change
        var fortuneText = document.getElementById('answer');
        
        // Update the element with our answer.
        fortuneText.innerHTML = '<img src="' + randomAnswer +'"/>';
	}
```

That will create an `img` element, and **dynamically** set the file path we stored to the tag's `src` attribute.

Ok, one last thing. We just need to update our prompt with our `fortuneTeller.promptText` property.


```Javascript
	function shake(){
		// Set the prompt text
		var question = prompt(fortuneTeller.promptText);
		
		// Display the question the user asked
		var questionText = document.getElementById('question');
		questionText.innerHTML = question;

		// Ask our fotruneTeller for a random answer
		var randomAnswer = fortuneTeller.getAnswer();
		
        // Access the DOM element we want to to change
        var fortuneText = document.getElementById('answer');
        
        // Update the element with our answer.
        fortuneText.innerHTML = '<img src="' + randomAnswer +'"/>';
	}
```

Nice! Now when we're prompted to enter an answer, the browser will show us the text we added to our `fortuneTeller` object. 

Remember how much code we wrote last week checking the value of each answer variable and displaying it individually. Using arrays to store our answers seems much cleaner, because now we can simply access those values by and index instead of writing a bunch of `if/else if/else` statements. We also cleaned up our code by letting our `fortuneTeller` object do a lot of the dirty work for us, like returning a random answer randomly. Last week, if we wanted to create a new answer we would have had to:

1. Update the `numberOfAnswers` variable.
2. Add a variable for our new answer (i.e. `var answerTen = "Maybe tomorrow";`)
3. Add a new conditional to check if the random number being generated was equal to our new answer (i.e. `else if ( answer == 10 ) { // do something }`) 

However, if we added a new answer to our 'fortuneTeller' object's `answers` array, the rest of our code would update automatically, we don't have to touch anything else! Try it out for yourself. 

```Javascript
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
```

We don't have to worry about touching any other logic, we can simply add a new answer in the `answers` array and our program will run according to plan. Think about much easier that would be if we had to create 100 answers using last weeks code versus the code from this week!

## 5: Uploading your code

You can either update your repository from last week or create a new one. To update your repository from last week: 

1. If you completed this week's homework in a new file/folder, go to `step 2`. If you rewrote your code from last week in your local GitHub repository folder, go to `step 4`.
1. Open the previous `magic 8 ball` repository folder on your computer.  
2. Copy your new project files into this folder.  
3. Go back to your GitHub application and click on the "Changes" tab at the top of the screen.
4. You should see a commit button with a "Summary" text box below it. Enter a message for your commit (i.e. "Initial commit." or "Finished project.") 
5. Click the circular button with a '+' symbol next to the commit button, then click the commit button.
6. Check your github.com repository, your changes should now be online.


To create a new repository: Go to to your GitHub profile page, click on the repositories tab at the top, then click the green button that says "New" (or [click here to go straight there](https://github.com/new)). Name your repository "magic-8ball-week3" (or something similar). *(If you have an entire repository dedicated to this class, you can create a new folder for this assignment instead of creating a separate repository.)*

You should see a box that says "Quick setup" at the top of the screen. Copy the URL that starts with https:// (i.e. https://github.com/username/magic-8ball-week3.git). At this point, you can either upload your assignment from the command line or from the GitHub application.

**Uploading with the GitHub application**

1. In the box that says "Quick setup", click the green button that reads "Setup on Desktop" (this will automatically open your GitHub application, assuming you already downloaded it).
2. Choose a location to save your repository.
3. Open the repository location on your computer.
4. Copy your project files into this folder.
5. Go back to your GitHub application and click on the "Changes" tab at the top of the screen.
6. You should see a commit button with a "Summary" text box below it. Enter a message for your commit (i.e. "Initial commit." or "Finished project.") 
7. Click the circular button with a '+' symbol next to the commit button, then click the commit button.
8. Check your github.com repository, your changes should now be online.

**Uploading with the command line**  

1. Open Terminal.  
2. Type `cd ~/Desktop`  
3. Type `git clone url` - replace url with the one you copied from the "Quick setup" box on GitHub.  
4. Type `cd magic-8ball-week3' or, if you named your repository something different, replace   magic-8ball-week3 with your repository name. 
5 Type `open .`    
6. Drag and copy your project files into the `magic-8ball-week3` folder in Finder  
7. In terminal, type `git add .`  
8. Type 'git commit -m "Initial commit."`.  
9. Type 'git push origin master'.  
10. Check your github.com repository, your changes should now be online.  





