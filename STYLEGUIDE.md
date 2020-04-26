[Return to main documentation](./README.md)

---

# **React Coding Style Guide**

This style guide is for the source code found in the PFP frontend code. It branches <br>
off the Airbnb React/JSX styleguide found [here](https://github.com/airbnb/javascript/blob/master/react/README.md).

---
## **Table of Contents**
1. [Basic Rules](#basic-rules)
2. [Naming](#naming-conventions)
3. [Classes](#classes)
4. [Alignment](#alignment)
5. [Quotes](#quotes)
6. [Spacing](#spacing)
7. [Props](#props)
8. [Parentheses](#parentheses)
9. [Tags](#tags)
10. [Methods](#methods)

---

## Basic Rules

- Only include **one** React component per file.
  - However, multiple **Stateless**, or **Pure** components are allowed per file.
- Always use JSX syntax
- **Never** use React.createElement
- **All statement endings must have a semicolon.**
- All functions/methods must have a JSDoc associated with them. There should be a line break below all JSDoc comments.
- `render()`, `constructor()`, and component lifecycle methods **do not** need a JSDoc.
```javascript
//bad
function someFunction(paramOne, paramTwo) {
  //do stuff
}

//good

/**
 * Description of the function
 *
 * @param {type} paramName Some description of the parameter
 * @param {string} paramTwo Some description of paramTwo
 *
 * @returns returnType
*/

function someFunction(paramName, paramTwo) {
  //do stuff
}
```

---

## Naming Conventions

### **Extensions**
- Use ``.jsx`` file extension for ``React`` components
- Use ``.js`` for vanilla ``Javascript``, utility, ``Redux``, and consant files

### **Filenames**
- Use PascalCase for Component filenames. E.g., ``MyReactComponent.jsx``
- Use under_score naming for regular Javascript files. E.g., ``my_vanilla_js_file.js``

### **Reference Naming**
- Use PascalCase for React components and camelCase for their instances.

```javascript
//bad
import myReactComponent from './MyReactComponent';

//good
import MyReactComponent from './MyReactComponent';

//bad
let MyReactComponent = <MyReactComponent />;

//good
let myReactComponent = <MyReactComponent />;
```

- Use camelCase for all variables and functions
```javascript
//bad
let MyVariable = "Hello World!";

//bad
let my_variable = 5;

//good
let numVars = 10;

//bad
MyFunctionName(param) {
}

//bad
my_function_name(param) {
}

//good
myFunctionName(param) {
}
```

- For methods that are private to a component or module, start the method name with an underscore

```javascript

// bad
somePrivateFunction() {
  // code goes here
}

// good
_somePrivateFunction() {
  // code goes here
}

```


- For constant values use ALL_UPPERCASE_WITH_UNDERSCORES

```javascript
//bad
const myConstantVar = "Some value";

//good
const MY_CONSTANT_VAR = "Some constant value";
```

### **Component Naming**

- Always use the filename as the component name. For example, ```MyReactComponent.jsx``` should have a reference name of ```MyReactComponent```.
```javascript
// bad
import ReactComponent from './MyReactComponent';

//good
import MyReactComponent from './MyReactComponent';
```

### **Props Naming**
- Avoid using DOM component prop names for different purposes.
  - People are expecting props like ``style`` and ``className`` to mean one specific thing. Varying this API for a subset of the app makes the code less readable and less maintainable.

```html
//bad
<MyComponent style="fancy" />;

// bad
<MyComponent className="fancy" />;

//good
<MyComponent variant="fancy" />;
```

---

## Classes

- Do not use ``displayName`` for naming components. Instead, name the component by reference.

```javascript
//bad
export default React.createClass({
  displayName: 'MyReactComponent',
  //stuff goes here
});

//good
export defualt class MyReactComponent extends Component {
  //stuff goes here
}
```

- Always import `Component` from `React` and don't use `React.Component`.
```javascript
//bad
import React from 'react';
export default class MyComp extends React.Component {

}

//good
import React, { Component } from 'react';
export default class MyComp extends Component {

}
```

- Export components on the line they are declared unless they are connected to Redux.
```javascript
//bad
class MyComponent extends Component {

}
export default MyComponent;

//good
export default class MyComponent extends Component {

}

//good: this connects to Redux
class MyComponent extends Component {

}

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);

```

---

## Alignment

- Follow these alignment styles for JSX syntax

```html
//bad
<Foo superLongParamName="bar"
     anotherSuperLongParamName="baz" />

// good
<Foo
  superLongParamName="bar"
  anotherSuperLongParamName="baz"
/>

//If props fit in one line then keep it on the same line

//bad
<Foo
  bar="bar"
/>

//good
<Foo bar="bar" />

// Children get indented normally
<Foo bar="bar">
  <Quux />
</Foo>

// bad
{showButton &&
  <Button />
}

// bad
{
  showButton &&
    <Button />
}

// good
{showButton && (
  <Button />
)}

// good
{showButton && <Button />}

```

---

## Quotes
- Always use double quotes ``(")`` for JSX attributes, but single quotes ``(')`` for other JS.

```html
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

//bad
<Foo style={{left: "20px"}} />

//good
<Foo style={{left: '20px'}} />
```

---
## Spacing

- Always include a single space in your self closing tag.
```html
// bad
<Foo/>

//very bad
<Foo             />

//bad
<Foo
 />

//good
<Foo />
```

- Do not pad JSX curly braces with spaces.
```html
//bad
<Foo bar={ bar } />

//good
<Foo bar={bar} />
```

- Always pad curly braces when destructuring state and props
```javascript
//bad
let {someValue} = this.state;

//good
let { someValue } = this.state;

//bad
let {someProp} = this.props;

//good
let { someProp } = this.props;
```


- Always pad import curly braces with spaces
```javascript
//bad
import {someFunction} from './utilities';

//bad
import {function1, function2} from './utilities';

//good
import { someFunction } from './utilities';
```

- If imports dont fit in one line, separate them into multiple lines with the from line on its own line.
```javascript
//bad
import { func1, func2, func3, func4, func5, func6, func7, func8, func9, func10, func11, func12} from './utilities';

//bad
import { func1,
func2,
func3,
func4,
func5,
func6,
func7,
func8,
func9,
func10,
func11,
func12} from './utilities';

//good
import {
  func1,
  func2,
  func3,
  func4,
  func5,
  func6,
  func7,
  func8,
  func9,
  func10,
  func11,
  func12
} from './utilities';

```


- Separate all main portions of code and functions with a horizontal comment line.
- There should be two lines of spacing between all lines and the functions above them, and one line of spacing between the line and the section below.  
- The only exception is the line separating the module docstring from the import statements. There should only be one line of spacing between the line and the top level docstring.

```javascript

/**
 * Module docstring here
*/

//------------------------------------------------------------------------------------

import React, { Component } from 'react';
import SomeComp from 'components';
import SomeComp2 from 'components';
import SomeComp3 from 'components';


//------------------------------------------------------------------------------------

/**
 * Description of the component
*/

export default class OtherComp extends Component {

  //------------------------------------------------------------------------------------

  /**
   * Some doc string
  */

  render() {
    let someComp = this._getSomeComp();
    return (
      <>
        {someComp}
        <SomeComp2 />
        <SomeComp3 />
      </>
    );
  }


  //------------------------------------------------------------------------------------

  /**
   * Some Docstring
  */

  _getSomeComp() {
    return <SomeComp />;
  }
}

```

---

## Props
- Try to limit the number of props a component has. If the amount of props becomes large, use Redux to store them instead to make the code easier to maintain.
```javascript
//bad
<MyComp
  prop1="something"
  prop2="something"
  prop3="something"
  prop4="something"
  prop5="something"
  prop6="something"
  prop7="something"
  prop8="something"
  prop9="something"
  prop10="something"
  prop11="something"
  prop12="something"
/>
```
```javascript
//Instead store those props in the Redux store so the component declaration is simplified. Now
// not that many props are being passed down
<MyComp propOne="something />
```


- Always use camelCase for prop names.
```javascript
//bad
<Foo
  UserName="hello"
  phone_number={1234567}
/>
```
```javascript
//good
<Foo
  userName="hello"
  phoneNumber={1234567}
/>
```

- Always define PropTypes on the outside of a class with the PropTypes library.
```javascript
export default class MyComponent extends Component {

}

MyComponent.propTypes = {
  someProp: PropTypes.string,
  anotherProp: PropTypes.number,
  somethingElse: PropTypes.func
}

```

- If a function uses more than one prop, always destructure them for use.
```javascript
//bad
function myFunction() {
  let someVar = this.props.someProp + 2000;
  let newDiv = this.props.currentPage === 'something' ? (
      <SomeComp
        newProp={this.props.clickHandler}
        someOtherProp={this.props.title}
     />
  ) : (
      null
  );

  return newDiv;
}
```
```javascript
//good
function myFunction() {
    let { someProp, currentPage, clickHandler, title } = this.props;
    let someVar = someProp + 2000;
    let newDiv = currentPage === 'something' ? (
        <SomeComp
          newProps={clickHandler}
          someOtherProp={title}
        />
    ) : (
        null
    );

    return newDiv;
}
```
```javascript
//also good since only one prop
function myFunction() {
    let someVar = this.props.currentPage === 'something' ? 1000 : -1;
    return someVar;
}
```


---

## Parentheses
- Wrap JSX tags in parentheses when they span more than one line.

```javascript
//bad
render() {
    return <MyComponent variant="something">
             <ChildComp />
            <MyComponent />;
}
```
```javascript
//good
render() {
    return (
        <MyComponent variant="something">
          <ChildComp />
        <MyComponent />
    );
}
```
```javascript
//good when single line
render() {
    return <MyComponent bar="bar" />;
}
```

---

## Tags
- Always self close tags that have no children
```javascript
//bad
<Foo variant="stuff"></Foo>

//good
<Foo variant="stuff" />
```

- If your component had mult-line properties, close its tag on a new line
```javascript
//bad
<Foo
  longParamName="stuff"
  anotherLongParamName="
/>
```


---

## Methods
- Always bind event handlers for the render method in the constructor.

```javascript
//bad
export default class extends Component {
    onClick() {
        //do stuff
    }

    render() {
        return <div onClick={this.onClick.bind(this)} />;
    }
}
```
```javascript
//good
export default class extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onCLick() {
        //do stuff
    }

    render() {
        return <div onClick={this.onClick} />;
    }
}
```

- Export functions on the same line they are declared instead of at the bottom of the file.
```javascript
//bad
function myFunction(param) {
  // do stuff
}

function myOtherFunction(param) {
  // do stuff
}

export {
    myFunction,
    myOtherFunction
}

//-------------------------------------------
//good
export function myFunction(param) {
  // do stuff
}

export function myOtherFunction(param) {
  // do stuff
}

```
