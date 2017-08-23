How To Run the Application


Prerequisite:


1 - Node.JS - https://nodejs.org/en/

2 - NPM


Install Application:


1 - Unizip / Clone the code from gitHub on your local computer.

clone command : git clone https://github.com/vedvns/MerchantGuide.git

2 - Go to the root of this project

3 - Install: Run Command 'npm install' from command line, all the dependencies and devDependencies will be installed locally.

4 - Build: Run Command 'gulp' from command line for 'build'.

5 - Run: Run Command 'node app' from command line.

6 - Test: Run Command 'npm test' for Run the Test.



Solution Assumptions:

1 - All the inputs are case-insensitive (for all currency,units and Roman numerals)
  Ex. Gold gold GOLD are same

2 - As currency represents Roman numerals but credit values could be floating point numbers.
It is acceptable to input credit values in floating point number.

3 - There should be any minimum limit, acceptable for credit value,in this case it is ratio of
credit/value which should be greater than(or equal) 0.00001 (i.e. ratio less than this, is not acceptable)



Project Design: Structure of the project is as below.

project Structure
  - src - Source code are kept here, developers need to put all code here.
  - dist - final code after the build, js code will be minified for better performance.

      /util-min.js    - minified code

      /config-min.js   - minified code

  - node_modules - all the npm modules, dependencies and devDependencies.
  - spec - Test cases will be written in this folder, for current and future both.

      /testData.js  - test data to perform TDD

      /valid_input_spec.js -  for test cases   

  - app.js - entry point of application.
  - data - test related data.
  - gulpfile.js - gulp file for build related task.
  - package.json - Project package information, version, name, author, dependencies etc..
  - README.md - text information related to project/application.


Build:

 Run grunt command for build the application, application works on the clean and minified source code in dist.


Unit Test:

Run npm test to run the unit test cases.


1 - ReadStream interface is created and 'line' event is attached for listening.
2 - Each new Line is trimmed and forwarded to MerchantGuide function for further processing.
3 - In MerchantGuide function line is matched again 4 different Regular Expressions to
detect type of line(assignment/query).If line does not match any of the expressions
it is declared as undetected type.
4 - There are 4 types of lines
      a - Assignment: assignment lines assign intergalaxy currency to Roman numeral
      b - Credit: credit line give currency conversion in units(metal or scrap) with
      credit value.
      c - How Much query: Howmuch query is used to get intergalaxy currency value in
       decimals.
      d - How Many query: Howmany query is used to get credit values for inter-galaxy currency.
5 - Function is used to convert inter-galaxy currency to it's value.
Function Works as follows,
      a - Convert inter-Galaxy currency array to respective roman numeral, while converting use saved inter-galaxy currency for conversion.
      b - Check if constructed roman numeral is valid.
      c - Convert that roman numeral to decimal number.
