import React from "react";
import useTitle from "../../hooks/useTitle";

const Blogs = () => {
  useTitle('Blogs');
  return (
    <div className=" my-5 py-5 px-2 mx-5 bg-white pt-3 border border-dark">
      <div className="m-3">
        <h3 className="font-bold">
          What are the different ways to manage a state in a React application?
        </h3>
        <p className="mt-4">
          There are four main types of state you need to properly manage in your
          React apps: Local state Global state Server state URL state
        </p>
      </div>
      <div className="m-3">
        <h3 className="font-bold">How does prototypical inheritance work?</h3>
        <p className="mt-4">
          The Prototypal Inheritance is a feature in javascript used to add
          methods and properties in objects. It is a method by which an object
          can inherit the properties and methods of another object.
          Traditionally, in order to get and set the [[Prototype]] of an object,
          we use Object.getPrototypeOf and Object
        </p>
      </div>
      <div className="m-3">
        <h3 className="font-bold">
          What is a unit test? Why should we write unit tests?
        </h3>

        <p className="mt-4">
          Unit Testing is a type of software testing where individual units or
          components of a software are tested. The purpose is to validate that
          each unit of the software code performs as expected. Unit Testing is
          done during the development (coding phase) of an application by the
          developers.
        </p>
      </div>
      <div className="m-3">
        <h3 className="font-bold">React vs. Angular vs. Vue?</h3>
        <h4 className="mt-4 text-xl font-semibold">Angular vs React</h4>
        <p className="mt-4">
          If the choice you’re making is based on Angular vs React alone, then
          you’ll simply need to consider the pros and cons discussed for those
          libraries in this post. But overall, keep in mind that both libraries
          can be used for mobile and web apps, while Angular is generally better
          for more complex apps that are enterprise-ready. React often requires
          extra modules and components, which keeps the core library small, but
          means there’s extra work involved when incorporating outside tools.
          Angular, on the other hand, is more of a full-fledged solution that
          doesn’t require extras like React often does, though it does have a
          steeper learning curve for its core compared to React. React is more
          suitable for intermediate to advanced JavaScript developers who are
          familiar with concepts from ES6 and up, while Angular favors those
          same developers who are also familiar with TypeScript.
        </p>
        <h4 className="mt-4 text-xl font-semibold">React vs Vue</h4>
        <p className="mt-4">
          The choice between React vs Vue is often debated and it’s not an easy
          one. Vue has a vibrant and ever-growing community and has taken over
          popularity vs. React in many respects. React developers are still
          churning out lots of new components and extras, so there’s no sign
          that React is on the decline either. Vue is generally more suited to
          smaller, less complex apps and is easier to learn from scratch
          compared to React. Vue can be easier to integrate into new or existing
          projects and many feel its use of HTML templates along with JSX is an
          advantage. Overall, Vue might be the best choice if you’re a newer
          developer and not as familiar with advanced JavaScript concepts, while
          React is quite well suited for experienced programmers and developers
          who have worked with object-oriented JavaScript, functional
          JavaScript, and similar concepts.
        </p>
        <h4 className="mt-4 text-xl font-semibold">Angular vs Vue</h4>
        <p className="mt-4">
          In most cases, you probably wouldn’t be deciding between only Angular
          and Vue. They are vastly different libraries with very different
          feature sets and learning curves. Vue is the clear choice for less
          experienced developers, and Angular would be preferred for those
          working on larger apps. A large library like Angular would require
          more diligence in keeping up with what’s new, while Vue would be less
          demanding in this regard and the fact that the two most recent major
          releases of Vue are in separate repositories helps. It should also be
          noted that Vue was created by a developer who formerly worked on
          Angular for Google, so that’s another thing to keep in mind, though
          that wouldn’t have a huge impact on your decision.
        </p>
      </div>
    </div>
  );
};

export default Blogs;
