# WELCOME

The Living Open Source Foundation Team, would like to thank you for making an effort at getting to know whats required of one to be a contributor.

 Quick Answer ~ just you

## INTRODUCTION

We are a young and vibrant Open Source community, working to foster the adoption of Open Source, and advocating for the wider use of the GNU/Linux Kernel and the different distributions, otherwise known as Operating system built on top of it.

As we work towards our many goals, we love to take time to give back to the community (Open Source Community) that gave to us first, by working on projects such as this one.

Any person, regardless of gender, skill, age, profession etc can be a part of our community.
One need not be a Software Developer or even have programming knowledge.
We need a wide range of skill sets, you can help out with documentations, feature requests, pull requests etc.
If you find a bug in our code, please let us know by raising an issue, even better if you can fix it and send in a pull request.

## PASSIVE CONTRIBUTOR

Anyone and everyone who helps in one way of the other is considered a contributor (passive contributor).
But there are also dedicated contributors who are part of the team and help in spear heading the projects, these are referred to as active contributors.

## ACTIVE CONTRIBUTORS

These are the people who are dedicated to being part of the conversations, discussions and debates among other things.
To be a part of the active contributors, ping us on [info@livingopensource.net](mailto:info@livingopensource.net).

## CODE OF CONDUCT

We love and appreciate people who love Open Source, but we love them even more if they respect others as well.
We work in an open environment, and we expect people not to use any swear words, vulgar phrases and/or any expression in any form that may offend another person.
Be respectful of peoples views even if you do not subscribe to them.

## CODING STANDARD

While we do not explicitly, advocate a coding standard, we expect people to follow our conversions in writing code. We reserve the right to decline a pull request if the code is not clean and does not adhere to our coding practices. Alternative, we will ask that the contributor, rewrite the code following our conding standards before it can be merged into the master branch. 

We love code clarity, as a practice rather than a standard, we expect the function declaration to be on the same line as the opening curly bracket "{" as shown below


```javascript
	$('#start').one('click', function() {
			$(this).attr('disabled', true).unbind('click');
			// Make sure the browser supports WebRTC
			if(!Janus.isWebrtcSupported()) {
				bootbox.alert("No WebRTC support... ");
				return;
            }
            ...
```

Indentation of code makes for readable code, "any fool can write code a computer can understand, but it takes a professional to write code a human can understand"; be professional.
While the above example is acceptable, the following is not.

```javascript

    $('#start').one('click', function()
    {$(this).attr('disabled', true).unbind('click');
	// Make sure the browser supports WebRTC
    if(!Janus.isWebrtcSupported()) 
    {bootbox.alert("No WebRTC support... ");
	return;}
            ...
```

While the code above can run just as good as the one before it, it lacks clarity and neatness.
On the matter of spaces vs tabs, we prefer tabs for the amount of typing they save as compared to pressing space. A single click is more efficient than 4 clicks; be efficient.
There is an exception to this. In an instance where the markup being used does not allow tabs (e.g ansible playbooks), then spaces are allowed.

For javascript, we like to keep it modern, so arrow functions are preferred. Below is what we expect:

```javascript
app.use('/', (req, res) => {
  return 'Hello World'  
})
```

and not:

```javascript
app.use('/', function(req, res) {
  return 'Hello World'  
})
```

Coding standard is a matter of personal preferrence, but when we work as a team, we need to get rid of "I" and take away the light from self, so we can stand united.


#  Happy Coding ...
### Thanks :)
### Living Open Source Foundation Zambia