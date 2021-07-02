# Project Coroutine Monad
[Project Coroutine Monad of the minor Software Engineering](https://github.com/hogeschool/Software-Engineering-Minor/blob/master/Projects/project4%20-%20coroutine%20monad.md)

Install npm packages on first use

#### Folder structure
* main.ts -- main entrypoint
* lib.ts -- aggregate all building blocks
* /lib -- all building blocks
* /dist -- generated .js by npm run build
* /samples -- code samples to showcase the project

#### Available npm scripts:
* "build": build to /dist,
* "build:watch": build to dist and watch changes,
* "main": execute entrypoint /dist/main.js,
* "main:watch": execute entrypoint /dist/main.js and watch changes,
* "lint": run eslint on .ts fils

<br/><br/><br/>

# Project Description

In this project, you will build a coroutine\-builder in TypeScript or F\# with full\-blown type\-safety, and its translation into functions. The final goal is to support, at the very least, the following operators\:
- `RepeatUntil`;
- `Wait`;
- `Do`.

Optional operators (for a higher grade) are\:
- `Any`;
- `All`;
- `Parallel`;
- `Concurrent`.

Your project will generate _the whole asynchronous process, declaratively.

## Code examples
An example of code could be the following\:

```typescript
RepeatUntil(s => s.Counter > 10,
  Wait(5).then(() =>
  Do(s => ({...s, Counter:s.Counter+1}))
  )
)
```

## Evaluation criteria
The bare minimum (5.5) for this project is a type\safe monadic implementation of `RepeatUntil`, `Wait`, and `Do`.

The `Parallel` and `Concurrent` operators yield 1 point each.

The `Any` and `All` operators yield 1 point each.

Using `Any` and `All` to implement the `Parallel` and `Concurrent` operators yields the last 0.5 point.

### First presentation
The first presentation must showcase work for at least 3 points.


