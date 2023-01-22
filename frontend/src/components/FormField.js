function handleChange(password) {
    console.log(password);
}

function FormField() {
    return (
        <>
            <input
                onChange={(password) => handleChange(password)}
                name="password"
                type="text"
                placeholder="Enter your password here"
            />
            <label id="result-label" for="password"></label>
        </>
    );
}

export default FormField;
