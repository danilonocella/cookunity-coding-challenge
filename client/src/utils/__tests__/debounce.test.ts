import { debounce } from "../debounce";

// Mock function to use in tests
const mockFunction = jest.fn();

// Mock setTimeout and clearTimeout
jest.useFakeTimers();

describe("debounce", () => {
  test("it debounces function calls", () => {
    const debouncedFunc = debounce(mockFunction, 200);

    // Call the debounced function multiple times
    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    // Fast-forward time
    jest.advanceTimersByTime(150);

    // Function should not have been called yet
    expect(mockFunction).not.toBeCalled();

    // Fast-forward to the end of the debounce delay
    jest.advanceTimersByTime(200);

    // Function should have been called only once
    expect(mockFunction).toBeCalledTimes(1);
  });

  test("it debounces function calls with arguments", () => {
    const debouncedFunc = debounce(mockFunction, 200);

    // Call the debounced function with arguments
    debouncedFunc("arg1", "arg2");

    // Fast-forward to the end of the debounce delay
    jest.advanceTimersByTime(200);

    // Function should have been called with arguments
    expect(mockFunction).toBeCalledWith("arg1", "arg2");
  });
});
