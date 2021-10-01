# whos-who
Who's Who in FCC OKC and Techlahoma

## Table of Contents
- [Adding Yourself to the Game](#adding-yourself-to-the-game)
- [Development Setup](#development-setup)

## Adding Yourself to the Game

This game is a great way to familiarize yourself with javascript objects, and get to know the great community in Techlahoma!

To add yourself:
1. Fork the repo in Github
2. Once you have forked the repo, clone it down locally to your computer
   1. `git clone git@github.com:MyGitHubUserName/techlahoma-whos-who.git`
3. In your favorite IDE or text editor, open the `people.js`
   1. [Click here to see the people.js file in Github](https://github.com/FreeCodeCampOKC/techlahoma-whos-who/blob/main/index.js)
4. Add yourself to the people variable!
   1. Create a new empty object in the `people array`, like this `{}`
   2. Inside your empty object, add your first property- `"firstName":`, after that put your name.
      1. Your object should look like this `{"firstName": "Tom"}`
   3. Next, add a comma after your property declaration, it should look like this: `{"firstName": "Tom",}`
   4. Add the rest of your properties! These properties should be `lastName, picture, githubUsername`
      1. NOTE: We can keep the `picture` property empty for now. We'll add picture in the following steps.
   5. Your people object should now look something like below.
      1. `{"firstName": "Tom", "lastName": "Bombadil", "picture": "HandsomeTom.jpg", "githubUsername": "OldManWillow"}`
5. Add a photo of yourself!
   1. Open the pictures directory, which can be found at `techlahoma-whos-who/Pictures`
       1. [Click here to see the picture directory in Github](https://github.com/FreeCodeCampOKC/techlahoma-whos-who/tree/main/Pictures)
   2. Add a jpg of yourself to this directory.
   3. Once you've added that jpg, make sure to reference it on picture object you made for yourself in `people.js`.
      1. i.e. `{... "picture": "HandsomeTom.jpg" ...}`
6. Create a PR and get yourself added!

## Development Setup

1. Fork the repo in Github
2. Once you have forked the repo, clone it down locally to your computer
    1. `git clone git@github.com:MyGitHubUserName/techlahoma-whos-who.git`
3. Open `index.html` in your preferred browser. You should see the who's who game if everything went well!
