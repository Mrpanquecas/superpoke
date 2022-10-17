## <h3 align="center">superpoke</h3>

<p align="center"> This project is a simple pokedex with the ability to view different pokemons and their respective information. it also features the ability to create a new pokemon
    <br> 
</p>

## Stack

- react
- typescript
- react-router
- redux-toolkit
- react-hook-form
- pokenode-ts
- tailwindcss

## 🏁 Run the project

Locally:

```
yarn install
yarn start
```

Production Like

```
  yarn build
  yarn global add serve (if you don't have it)
  serve -s build
```

- It is possible to run a very small test suit by running:

```
yarn test
```

## Q&A:

- Q: What validation are you using when creating a new pokemon?
- A: no numbers, max 50 chars, no special characters to limit what users can input to avoid XSS attacks for example. A pokemon cannot have the same name as an existing one

- Q: Where can I find my custom pokemon?
- A: Custom pokemons will be displayed at the very last page of the pagination. There is a button to access this page directly

- Q: How do you ensure custom pokemons appear in the pagination?
- A: If the pokemon list request returns the next page parameter as null then we know these are the last results and we can safely add our custom pokemons.

- Q: Can I see the details of a custom pokemon?
- A: Yes, the details of a custom pokemon will appear on the details page when accessing them via the pagination by clicking on the card. at the moment it is not possible to query a custom pokemon by accessing directly the pokemon in the URL

- Q: Why pokenode-ts?
- A: Using pokenode here to ease the typing process aswell as <a href="https://pokeapi.co/about">abide per the API rules</a> (cache requests when possible)

- Q: Why tailwindcss?
- A: I'm able to quickly iterate desings using the class utilities. Implementation would look better if I was using alias for the class names also in a production environment tailwind produces a very small css footprint

- Q: Why doesn't the pagination feature the page count numbers (1,2,3...)?
- A: In my opinion navigating from page to page and to the first and last page already shows I know how to handle it. I prefer to spend the extra time writing little tests and using typescript to make the codebase more robust

## Final thoughts:

I wish I had the time to go a little more in depth in the creation process and all the data is mocked exept the name. Allow for the seletion of certain moves/types and even be able to specify the pokemon IV's but I think it shows I know how to do it and given the time I would absolutely have this functionalities. Please reach out to me if you have any question o want to discuss any topic of my code
