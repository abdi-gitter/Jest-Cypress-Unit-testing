import Async from './Async';
import { render, screen } from '@testing-library/react';

test('Async component renders posts', async () => {
    render(<Async />)
    // find all list items:
    const listItems = await screen.findAllByRole('listitem', {})
    console.log(listItems.length)
    expect(listItems).not.toHaveLength(0) // make sure the list items are not empty
})

// MOCK FUNCTIONS:
// Mock functions are functions that allow you to test the links between code by erasing the actual implementation of a function, 
// capturing calls to the function (and the parameters passed in those calls), 
// capturing instances of constructor functions when instantiated with new, and allowing test-time configuration of return values.
// in simple terms, this means that you can create a fake function that will be called instead of the real function.

// This is useful when you want to test a function that makes an API call, 
// but you don't want to make the actual API call in your test.

test('Async component renders posts', async () => {
    // when we make a mock function, we can use the jest.fn() method
    // this method returns a mock function

    // create a mock function:
    window.fetch = jest.fn() // now I have a mock function called fetch, located on the window object
    // this window object is a property of the global object coming from the browser

    // within this test, we have completely overwritten/replaced the functionality of the fetch function with a mock function
    
    // call the mock function:
    window.fetch.mockResolvedValueOnce({
        // mockResolvedValueOnce is a method that comes from Jest
        // this method allows us to return a value from the mock function
        json: async ()=> [{id: 1, title: 'Post 1'}]
        // this is the object that the mock function will return
    })

    // Now when we render the Async component, the fetch function is no longer the default fetch function
    // when the component calls fetch, it is now calling our mock function.
    // the URL no longer matters, no matter what we do, we are returning the same object (above) from the mock function
    render(<Async />)
    // find all list items:
    const listItems = await screen.findAllByRole('listitem', {})
    console.log(listItems.length)
    expect(listItems).not.toHaveLength(0) // make sure the list items are not empty
})