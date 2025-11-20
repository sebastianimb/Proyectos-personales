Ejercicios técnico React

APIs:

-Facts Random: https://catfact.ninja/fact
-Imagen Random: https://cataas.com/cat/says/hello

1.- Recuperar un hecho (Fact) aletorio de gatos
2.- Recuperar las tres primeras palabras del hecho.
3.- Mostrar una imagen de un gato dado el hecho.

Notas adicionales para realizar test de front-end:

Getters disponibles en screen:

getByText
getByRole
getByLabelText
getByPlaceholderText
getByAltText
getByDisplayValue

Querys disponibles en screen: (Para ver si un elemento NO está en el DOM)

queryByText
queryByRole
queryByLabelText
queryByPlaceholderText
queryByAltText
queryByDisplayValue

findBy (disponibles en screen, son asíncronos):

findByText
findByRole
findByLabelText
findByPlaceholderText
findByAltText
findByDisplayValue

Multiple elements:

getAllBy
queryAllBy
findAllBy

Assertive Functions:

toBeDisabled
toBeEnabled
toBeEmpty
toBeEmptyDOMElement
toBeInTheDocument
toBeInvalid
toBeRequired
toBeValid
toBeVisible
toContainElement
toContainHTML
toHaveAttribute
toHaveClass
toHaveFocus
toHaveFormValues
toHaveStyle
toHaveTextContent
toHaveValue
toHaveDisplayValue
toBeChecked
toBePartiallyChecked
toHaveDescription

Eventos de disparo:
fireEvent, WaitFor
