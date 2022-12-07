document.querySelector('#submit-btn').addEventListener('click', (e) => {
    e.preventDefault()

    const email_input = document.querySelector('#email-input').value
    const password_input = document.querySelector('#pwd-input').value

    const user = {
        email: email_input,
        password: password_input
    }

    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:5001/users/signup'

    xhr.open('POST', url)

    xhr.setRequestHeader( 'Content-Type', 'application/json' )
    xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*')

    xhr.onreadystatechange = () => {
        if(xhr.status === 201 && xhr.readyState === 4){
            console.log(xhr.responseText);
        }
    }

    xhr.send( JSON.stringify(user) )
})