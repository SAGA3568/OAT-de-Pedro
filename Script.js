$('#ddd-field').on('input', function() {
  
  const input = $(this).val();
  if (input.length > 2) {
    $(this).val(input.slice(0, 2)); 
    Swal.fire({
      title: 'Erro!',
      text: 'Por favor, informe apenas 2 dígitos',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }
});

$('#ddd-query').on('submit', async function(event) {
  event.preventDefault();
  const dddField = $('#ddd-field').val();
  try {
    const response = await fetch(`https://brasilapi.com.br/api/ddd/v1/${dddField}`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const dddJson = await response.json();
    $('#ddd-table-body').empty();
    dddJson.cities.forEach(city => {
      $('#ddd-table-body').append(`<tr>
          <td>${city}</td>
          <td>${dddJson.state}</td>
      </tr>`);
    });
  } catch (error) {
    console.error("Error:", error);

    if (error.message.includes('404')) {
      Swal.fire({
        title: 'Erro!',
        text: 'DDD não encontrado',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    } else {
      Swal.fire({
        title: 'Erro!',
        text: 'Esse DDD não foi encontrado',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }
});
