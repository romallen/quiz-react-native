# Jeopardy Quiz App

A Jeopardy style quiz game built with React Native and MongoDB Realm.
You can used the deployed web app here: https://quizapp.romallen.com/

## Motivation

I created this app because of a personal need in my job as an ALT. I often play quiz games with my students and I found myself spending a lot of time making each game in Keynote/Powerpoint. I also wanted a way to automatically keep score when playing the games. This app solves those major problems for me and I hope it will be useful to others as well.

![demo](./src/images/frontend.gif)

## Tech/framework used

<b>Built with:</b>

- [React Native](https://reactnative.dev/)
- [MongoDB Realm](https://www.mongodb.com/realm)
- [AWS](https://aws.amazon.com)

## Features

The app gives you the ability to select the number of teams, number of categories and number of questions in each category. Once this is done you can chose to create a new game from scratch, create by adding saved categories or have the app automatically populate the board.
During play, the app will keep track of each teams score. Teams answer questions sequentially. At the end the winning team is displayed.



## Installation

1. Clone the project `git clone https://github.com/romallen/quiz-react-native.git` and cd into it `cd quiz-react-native`.
2. Install node packages `npm install`.


### Local

To run the app on your local machine use `npm run start`.  Then run the app with `npm run web`

Because it is using react native. The app can also be bundled for use with ios devices `npm run ios` & android devices `npm run android`. Addition software/packages will have to be install to run the mobile device versions. You can read more about setting up your local environment [here](https://reactnative.dev/docs/environment-setup).

### Deploy

To create a deployable bundle use `npm run build`. This create creates a web-build folder which can be uploaded to your desired hosting environment.


## How to Play

1. On the home screen select play.
2. Select the number of teams, categories & questions.
3. Select the method of populating questions on the game board.
  a. If "automatic" is selected the app will pick categories at random to use on the game board.
  
  b. If "Blank Slate" is selected you will be presented with an empty game board. Simply add the categories and questions to it. You can choose to save the gameboard you just create and/or start playing the game. (N.B. points are assigned to each question based on its position on the game board)
  
  c. If  "Saved Board/Categories" is selected, you will be taken to a screen where you can search by board or by category name. You can then choose which one of the results you want to add and then start playing. 
  
4. During the game select a card and the question will be displayed. Once the question is answered you can click the show answer button to reveal the answer and then select whether the team answered correctly/incorrectly.




## License

MIT
