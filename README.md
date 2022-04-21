# Trivia React Excercise 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). To run the code you need to have node and npm installed. Then

```
npm i
npm start
```

You can also:

`npm test` to run tests.

`npm run lint` to run ESLint.

`npm run prettify` to use prettier on the codebase.

### Explaining the design decisions

* I tried to get the job done with as little code as possible while keeping it readable.

* I didn't make any assumptions about the data returned from the API so I check its format and the amount of questions retrieved and display. Also, an error is diplayed if anything goes wrong with the request (e.g. you're offline). There is a refetch button if anything goes wrong with the API call.

* I am not a big fan of putting all the state to the redux store (eg `QUESTIONS_LOADING`) because this way the store structure grows too fast in a big application. I personally prefer to keep all the local state in the component so that's the approach I use here. I use redux only to pass the results between the Quiz page and the Results page.

* I also considered alternatives to Redux for passing the data between the Quiz page and the Results page. I was tempted to just lift the state up but decided not to because it's an approach that gets messy if the application grows. Other option was to put this state into react context, but I decided not to do for the same reason, among other.

### Minor comments

* I know I use index as a key in component list in Results page. It is now cosidiered okay if the order of items does not change ( https://reactjs.org/docs/lists-and-keys.html#keys ) I would definitely not do it if the order could change.

* I allow the type `any` for type guard and when handling api responses. I dont make any assumptions about the data retrieved from the api, so I type it as `any` and then process it into a typed format.

* The strings returned from the API had its special characters escaped in a very strange way. I researched the API and it worked fine if I ask for strings being in `base64`. I decode those strings with the `atob` funcion. This function was marked as deprecated but as [this github issue](https://github.com/microsoft/TypeScript/issues/45566) says: `atob` is deprecated in node, not in the browser. So I use `window.atob` instead of just `atob` so that the linter knows it's a browser `atob` and not the one from Node.

* If the project grew I would probably change the structure of the project a little bit. Now I put all the components into a shared `src/components` folder even if they are used by one page only. Fortunately, changing the folder structure is something very easy to do so I would not worry about it too much until the project gets bigger.

Can't wait to hear from you what you think 😉 Have a good read.