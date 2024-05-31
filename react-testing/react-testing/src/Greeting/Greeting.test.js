// bring in a reference to the component I'm testing.
import Greeting from './Greeting'

// render and screen (These come from the testing-library/react library)
// render allows us to virtually render the component in a test environment
// screen is an object that we virtually render the component into
// The screen is what allows us to interact with the rendered components
import { render, screen } from '@testing-library/react';
// Since we're working with the screen rendering our components instead of the browser,
// Think of the screen object as being the document object in the browser.

import userEvent from '@testing-library/user-event'
// This is a library that allows simulation of user events
// such as clicking, typing, etc.

const expectedGreeting = "Hello World!"

// if we want to render our component before each test, we can use the beforeEach function:
// this function will perform whatever code is inside of the callback function before each test!

beforeEach(() => {
    render(<Greeting />)
})

// render(<Greeting />)
// it's best in our case to use beforeEach instead of rendering the greeting on the top level because
// we have multiple changes to the greeting component that we want to test individually.

// describe is another function that comes from Jest
// it's used to group tests together.

describe('Testing the heading', () => {

    // test is a function that comes from Jest.
    // test takes two arguments: 
    // a string that describes what the test is doing, and:
    // a function that contains the test logic.
    test('renders Hello World! text to the screen', () => {
        // render(<Greeting />)
        // render comes from the react-testing-library
        // This is how we render a component to the virtual screen
        // after this line runs, the component will be rendered to the virtual screen.

        // to check if a component has rendered to the screen, we use the screen object
        const greeting = screen.getByText(expectedGreeting, { exact: true })
        // We need to use screen to reference a rendered component in the virtual screen - This comes from react-testing-library
        // getByText is a method of the screen object that allows us to search for text in the rendered component
        // This is going to search the entire component for the text "Hello World"
        // This method returns the element that contains the text "Hello World"

        // expect is a function that comes from Jest
        // an expectation is a statement that checks if a certain condition is true
        // we use expectations with assertions and matchers to check if the component is rendering correctly

        expect(greeting).toBeInTheDocument() // toBeInTheDocument is a matcher that checks if the element is in the document
        // expect is a function that comes from Jest
    })

    // make sure the element is a specific type of element:
    test('Expected text is rendered as the expected element type', () => {
        // render(<Greeting />)
        // elementType:
        const expectedElementType = "heading"

        // make sure the element is a specific type of element:
        const greetings = screen.getAllByRole(expectedElementType)
        // getByRole is a method of the screen object that allows us to search for elements by their role
        // roles would be: heading, button, link, paragraph, etc.
        greetings.forEach(greeting => {
            expect(greeting).toBeInTheDocument()
        })
        // expect(greeting).toBeInTheDocument()

        // This test works well in determining if the element is a heading, but we can't tell which type of heading.....h1, h2, h3, etc.
    })

    // Test to make sure the element is an H1 method 1:
    test('Expected text is rendered as the expected element type', () => {
        // render(<Greeting />)
        const expectedElementType = "heading"

        // make sure the element is a specific type of heading element:
        const greetings = screen.getAllByRole(expectedElementType, { level: 1 }) // level: 1 means it's an h1 element
        greetings.forEach(greeting => {
            expect(greeting).toBeInTheDocument()
        })
        // expect(greeting).toBeInTheDocument()
    })

    // Test to make sure the element is an H1 method 2:
    test('Expected text is rendered as the expected element type', () => {
        // render(<Greeting />)
        const expectedElementType = "heading"

        // make sure the element is a specific type of heading element:
        const greetings = screen.getAllByText(expectedGreeting)
        // get a reference to the element with the matching text
        greetings.forEach(greeting => {
            expect(greeting.tagName).toBe('H1') // when checking tags, make sure to use UPPERCASE letters for tag names
        })
        // expect(greeting.tagName).toBe('H1') // when checking tags, make sure to use UPPERCASE letters for tag names
    })
})

describe('Testing the paragraph', () => {
    // TEST IDS!!!
    test('make sure button has correct text', () => {
        // render(<Greeting />)
        const button = screen.getByTestId('btn')
        // make sure button says "Change text"
        expect(button).toHaveTextContent('Change text')
    })

    // make sure when we click the button, the text changes to the correct values!!!
    test('make sure button has correct text', async () => {
        // render(<Greeting />)
        const button = screen.getByTestId('btn')

        // test value before clicking button:
        const paragraph = screen.getByTestId('para')
        expect(paragraph).toHaveTextContent('Welcome back')

        await userEvent.click(button) // click the button.
        // we need to await this click event because it's an async function

        // test value after clicking button:
        expect(paragraph).toHaveTextContent('See you soon')

        // make absolutely sure the text "Welcome back" is nowhere to be found:
        expect(paragraph).not.toHaveTextContent('Welcome back')
        // const welcomeBack = screen.getByText('Welcome back') // This will throw an error if the text is not found
        // queryByText will return null if the text is not found
        const welcomeBack = screen.queryByText('Welcome back')
        expect(welcomeBack).toBeNull() // This is a matcher that checks if the element is null
    })
})

describe('testing the input field', () => {
    test('make sure the input field is rendered', () => {
        // render(<Greeting />)
        const input = screen.getByTestId('nameinput')
        expect(input).toBeInTheDocument()
    })

    test('make sure the input field is empty', () => {
        // render(<Greeting />)
        const input = screen.getByTestId('nameinput')
        expect(input).toHaveValue('')
    })

    test('make sure the input field is working', () => {
        // render(<Greeting />)
        const input = screen.getByTestId('nameinput')
        const name = "John Doe"
        userEvent.type(input, name) // This mimics typing the name into the input field
        // this method has two arguments: the element to type into, and the text to type
        expect(input).toHaveValue(name)
    })

    test('make sure the name is displayed', () => {
        // render(<Greeting />)
        const input = screen.getByTestId('nameinput')
        const name = "John Doe"
        userEvent.type(input, name)
        const greeting = screen.getByTestId('name')
        expect(greeting).toHaveTextContent(`Hi, ${name}`)
    })
})