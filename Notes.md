# HCS Challenge Notes

The project basically follows the structure that I usually use building a complete backend app with the exception of Express for the creation of the APis.

# Implementations
- As mentioned before this is usually how I work. The file structure should give you an idea on how I seperate the differents files depending on the purpose.
- The main function that reads and save the information on the DB is seperated into small ones, this to keep a reasonable clean code and keep everything in order for debugging in the future.
- Each function should always do simple task, this also helps if we need to do anything similar in other places.
- Test
    - I found very odd the instructions to create the unit test. The unit test should check the integrity of the code, using mock data and stub on the services for example. to compare it with an expected data. This way we find issues if we later change anything.  
