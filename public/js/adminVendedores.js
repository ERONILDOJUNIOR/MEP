document.addEventListener('DOMContentLoaded', function () {
    // Inicializando a tabela de vendedores com DataTables e Fetch API
    const table = $('#vendedoresTable').DataTable({
        ajax: {
            url: '/users',
            dataSrc: '' // Define que os dados virão no formato de array
        },
        columns: [
            { data: 'id' },
            { data: 'userType' },
            { data: 'email' },
            { 
                data: 'createdAt',
                render: function (data) {
                    return new Date(data).toLocaleDateString(); // Formata a data
                }
            },
            {
                data: null,
                render: function (data) {
                    return `
                        <button class="btn btn-info btn-sm" onclick="viewVendedor(${data.id})">Ver</button>
                    `;
                }
            }
        ]
    });
});

// Função para exibir detalhes do vendedor ao clicar no botão "Ver"
function viewVendedor(id) {
    // Faz uma requisição Fetch para obter os dados de um vendedor específico
    fetch(`/users/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar vendedor');
            }
            return response.json();
        })
        .then(data => {
            // Preenche os detalhes do vendedor no modal
            document.getElementById('vendedorId').textContent = data.id;
            document.getElementById('vendedorTipo').textContent = data.userType;
            document.getElementById('vendedorEmail').textContent = data.email;
            document.getElementById('vendedorDataCriacao').textContent = new Date(data.createdAt).toLocaleDateString();
            document.getElementById('vendedorInfo').textContent = data.outrasInformacoes || 'Nenhuma informação adicional';
            
            // Exibe o modal com os detalhes do vendedor
            $('#viewModal').modal('show');
        })
        .catch(error => {
            console.error('Erro ao carregar detalhes do vendedor:', error);
            alert('Erro ao carregar detalhes do vendedor.');
        });
}
