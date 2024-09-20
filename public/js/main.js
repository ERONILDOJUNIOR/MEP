document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Previne o envio padrão do formulário

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Salvar o token no localStorage
                localStorage.setItem('token', data.token);

                // Decodificar o token para obter o tipo de usuário
                const decoded = jwt_decode(data.token);
                if (decoded.userType === 'Vendedor') {
                    window.location.href = '/vendedor-home';
                } else if (decoded.userType === 'Administrador') {
                    window.location.href = '/admin-home';
                }
            } else {
                // Informar o usuário sobre falha no login
                alert('E-mail ou senha inválidos.');
            }
        })
        .catch(err => {
            console.error('Erro ao fazer login:', err);
        });
    });
});
