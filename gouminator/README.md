# Gouminator

Generateur de goumin.
This application will help the user calculates the amount of Goumin a person can be exposed to using the formula to calculate the volume of a sphere. As a reminder the formula to compute the volume of a sphere is:

```
V=4/3 * π * r3
```

# Dependencies:

* [NodeJS](https://nodejs.org/en/)
* [npm](https://nodejs.org/en/)
* [http-server](https://github.com/indexzero/http-server)

# Installation

```bash
git clone https://github.com/akiltech/gouminator
cd gouminator
npm install
```

You can now run the gouminator on our dev web server on port 3000 by running

```bash
./node_modules/http-server/bin/http-server -p 3000
```

# 1. Prototype

Create a simple application that uses a form to calculate the volume of a sphere.
The application should feature:

* An input field for the radius value
* A submit button
* An output field that displays the computed volume

Use pure/vanilla Javascript and HTML.

# 2. Prototype Enhancement

Now that the app works and we can see the volume, we want to enhance the application. Add the following features:

* Validate that a *number* value is provided for the radius. For example, if the user enters a word or a letter, it should show an error.
* Validate that the radius number value is *less than 100*
* Cache answers so that if the same radius value is entered by the user, the answer is returned from a cache instead of calculating it. Use a programmatic (code) cache, not localStorage or SessionStorage.
* Make the application look a little better by adding some CSS

Use pure/vanilla Javascript and HTML.

# 3. Static MVP

We've added some validation, visual and performance improvements to our application, and made our Gouminator a little better.
Now we want to turn it into an SPA.

* Pick a framework to upgrade your app to (AngularJS/ Angular/React/VueJS)
* Create a new folder called `frontend` at the root of the `gouminator` folder and proceeed to set up your framework and upgrade of the application to use your selected framework.

# 4. Dynamic MVP

Now that our Gouminator is setup, we want to remove the business logic here from the UI and delegate it to backend service.
We'll be using a service oriented architecture using a RESTful api as a complement to our SPA.

* Create a new folder called `backend` at the root of the gouminator project and set up a backend of your choice (Custom/Symfony/Laravel/ExpressJS)
* your API should run on `http://localhost:4001`
* Create a new route `/volume` that takes a `radius` parameter and returns a volume in the following JSON format:

```
{
    radius: 5,
    volume: 200
}
```

* Connect your API to your front end application and verify it works

# 5. VP (Vieux Pere) Level (XXL Bonus Points)

This is for extra bonus points and can be turned in later on.

* Create a new route `/volumes` which takes a list of radius values and returns the list of volumes for each of the values in the input in the following JSON format:

```
[
    {
        radius: 5,
        volume: 200
    },
    {
        radius: 2,
        volume: 100
    }
    ...
]
```

* Add at least one passing unit test in your backend and frontend code, either on the front or the back end
* Check in your code to [Github](https://www.github.com)/[Gitlab](https://www.gitlab.com)
* Set up a CI pipeline to run your unit tests ([CircleCI](https://circleci.com/), [TravisCI](https://travis-ci.org/))
* Deploy the applications to the providers of your choice
