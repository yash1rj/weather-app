# Setting up the index view
Instead of responding with text when someone visits our root route, we’d like to respond with an HTML file. For this, we’ll be using EJS (Embedded JavaScript). EJS is a templating language.

In order to use EJS in Express, we need to set up our template engine:

>A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easier to design an HTML page.

The short version is that EJS allows us to interact with variables and then dynamically create our HTML based on those variables!

EJS is accessed by default in the views directory. So we create a new folder named views in your directory. Within that views folder, add a file named index.ejs. Think of our index.ejs file as an HTML file for now.

# Relating apiKey and url
We’ve done 3 things above:

* Create a variable named apiKey and assigned it the string value of our API Key
* Create a city and assigned it a string value of the city we’d like to test with
* Create a variable named url and assigned it the OpenWeatherMap url with our two required query parameters. Notice that query params start with a ? question mark. They are then indicated with key/value pairs separated by an = equal sign. Different key/value pairs are separated with an & ampersand.

# In app.get
We use res.render when working with a templating language. res.render will render our view, then send the equivalent HTML to the client.

# Setting up our POST Route
We have one get route, and then we create our server. However, for our application to work, we need a post route as well. If we look at our index.ejs file, we can see that our form is submitting a post request to the / route:

    <form action="/" method="post">

Now that we know where our form is posting, we can set up the route! A post request looks just like a get request, with one minor change:

    app.post('/', function (req, res) {
      res.render('index');
    })

But instead of just responding with the same html template, lets access the name of the city the user typed in as well. For this we need to use an Express Middleware.

Express is a minimalist framework. However, we can make use of Middleware (functions that have access to the req and res bodies) in order to preform more advanced tasks.

We’re going to make use of the body-parser middleware. body-parser allows us to make use of the key-value pairs stored on the req-body object. In this case, we’ll be able to access the city name the user typed in on the client side.

# Using EJS
It helps to remember that EJS stands for Embedded JavaScript. With that in mind, EJS has opening and closing brackets: <% CODE HERE %> Anything between the brackets is executed. If the opening bracket also includes an equal sign: <%= CODE HERE ADDS HTML %>, then that code will add HTML to the result.

If you look at our EJS that we’ve added, we’re testing to see if either of our weather, or error variables are null. If they’re both null, nothing happens. However, if one isn’t null (i.e. it has a value), then we will add a paragraph to the screen with the value of the respective variable.
