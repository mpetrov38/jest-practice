This has been made for Financial Times by Milen Petrov.

1.Testing is a critical part of any application development process. In the code provided, Jest and React Testing Library are used to perform unit and integration testing of the components. Various scenarios are considered such as fetching and displaying data correctly, showing loading message before data arrives, and handling error situations.

2.Errors are handled at two levels in this application. First, at the network level, where any error during the API call is caught and the error message is saved in the state to be displayed to the user. Second, at the UI level, where appropriate messages are shown based on the state of the data - whether it's still loading, has loaded, or an error has occurred.

3.CSS and media queries are used to make the application responsive.