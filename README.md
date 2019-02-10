# NodeJS Reactive HTTP Server with RxJS
> Build Node JS HTTP server as Reactive with RxJS and Typescript to solve many problem with async and to improve testability of large server structures software application.

With this very simple example, I present a new pattern to design NodeJS servers by apply the concepts of Reactive programming in place of functional programming with the traditional callbacks offered by frameworks like Express Js.

## Why use Reactive Programming?
Can stopped and we were satisfied with tools in place for the management of asynchronous events. It works very well now with the new features that introduced ECMA Script 6, including the famous async/await and asynchronous function to facilitating the management of the many asynchronous action.

But, quickly it becomes essential to design robust and efficient software architecture but also modular and testable to be able to support heavy applications and guarantee their viabilities during production deployment.

That's when a question got in the head, and that for several months ... Why settle Reactive programming and all these benefits only for Frontend?

We know NodeJS introduced the concept of non-blocking Thread with version 8, and traditional HTTP server returne following response of the request by the client. All the elements are present to allow set up a reactive software architecture. 

But this type of server is not necessarily the best solution for all project types, but it can be used to solve many problem with async and to improve the testability of large server structures.

## Installation
Assume you have good knowedge of Typescrip and Reactive Programming to enjoy.

```
$ git clone
$ nvm use 10
$ npm install
$ npm run dev
```

## Contribution
Feel free to contrib to this project.

clone/fork project
$ git checkout -b YOUR_BRANCH
do your work...
pass test...
pull request with your branch on the dev branch / or submit small fix on the master branch.
i will merge it and upd project version soon as possible.


## About author
Hi, i'm a Front-end developper living in Geneva Switzerland and i build hybrid mobile & web applications for almost 15 years. You can follow me on Twitter @FazioNico or checkout my own website https://nicolasfazio.ch






