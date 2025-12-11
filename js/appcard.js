$(document).ready(function() {
    var db = firebase.database();
    
    // Referencias a elementos del DOM
    var cardType = document.getElementById('cardType');
    var lastFourDigits = document.getElementById('lastFourDigits');
    var monthlyPayment = document.getElementById('monthlyPayment');
    var dueDate = document.getElementById('dueDate');
    var status = document.getElementById('status');
    var submitBtn = document.getElementById('submitBtn');
    var cancelBtn = document.getElementById('cancelBtn');
    var paymentList = document.getElementById('paymentList');
    var formTitle = document.getElementById('formTitle');
    var listTitle = document.getElementById('listTitle');
    var totalAmount = document.getElementById('totalAmount');
    
    // Variable para controlar modo edición
    var editingKey = null;
    
    // Validar campos del formulario
    function validateForm() {
        var isValid = lastFourDigits.value.length === 4 && 
                     monthlyPayment.value > 0 && 
                     dueDate.value !== '';
        submitBtn.disabled = !isValid;
    }
    
    // Event listeners para validación
    lastFourDigits.addEventListener('input', validateForm);
    monthlyPayment.addEventListener('input', validateForm);
    dueDate.addEventListener('change', validateForm);
    
    // Solo permitir números en el campo de 4 dígitos
    lastFourDigits.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    
    // Función para obtener el ícono según el tipo de tarjeta
    function getCardIcon(type) {
        var icons = {
            'visa': '💳',
            'mastercard': '💳',
            'amsex': '💳',
            'discover': '💳'
        };
        return icons[type] || '💳';
    }
    
    // Función para obtener el nombre del tipo de tarjeta
    function getCardTypeName(type) {
        var names = {
            'visa': 'Visa',
            'mastercard': 'Mastercard',
            'amsex': 'American Express',
            'discover': 'Maestro'
        };
        return names[type] || type;
    }
    
    // Función para obtener clase de estado
    function getStatusClass(statusValue) {
        var classes = {
            'pending': 'status-pending',
            'paid': 'status-paid',
            'overdue': 'status-overdue'
        };
        return classes[statusValue] || '';
    }
    
    // Función para obtener texto de estado
    function getStatusText(statusValue) {
        var texts = {
            'pending': 'Pendiente',
            'paid': 'Pagado',
            'overdue': 'Vencido'
        };
        return texts[statusValue] || statusValue;
    }
    
    // Función para formatear fecha
    function formatDate(dateString) {
        var date = new Date(dateString + 'T00:00:00');
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return (day < 10 ? '0' + day : day) + '/' + 
               (month < 10 ? '0' + month : month) + '/' + 
               year;
    }
    
    // Función para calcular total mensual
    function calculateTotal() {
        db.ref('tarjetas').once('value', function(snapshot) {
            var total = 0;
            snapshot.forEach(function(childSnapshot) {
                var card = childSnapshot.val();
                total += parseFloat(card.monthlyPayment) || 0;
            });
            totalAmount.textContent = '$' + total.toFixed(2);
        });
    }
    
    // Función para actualizar contador de tarjetas
    function updateCardCount() {
        db.ref('tarjetas').once('value', function(snapshot) {
            var count = snapshot.numChildren();
            listTitle.textContent = '📋 Tarjetas Registradas (' + count + ')';
        });
    }
    
    // Función para agregar o editar tarjeta
    window.handleSubmit = function() {
        var cardData = {
            cardType: cardType.value,
            lastFourDigits: lastFourDigits.value,
            monthlyPayment: parseFloat(monthlyPayment.value).toFixed(2),
            dueDate: dueDate.value,
            status: status.value,
            timestamp: Date.now()
        };
        
        if (editingKey) {
            // Actualizar tarjeta existente
            db.ref('tarjetas/' + editingKey).update(cardData)
                .then(function() {
                    console.log("Tarjeta actualizada exitosamente");
                    resetForm();
                })
                .catch(function(error) {
                    console.error("Error al actualizar: ", error);
                    alert("Error al actualizar la tarjeta");
                });
        } else {
            // Agregar nueva tarjeta
            db.ref('tarjetas').push(cardData)
                .then(function() {
                    console.log("Tarjeta agregada exitosamente");
                    resetForm();
                })
                .catch(function(error) {
                    console.error("Error al agregar: ", error);
                    alert("Error al agregar la tarjeta");
                });
        }
    };
    
    // Función para resetear el formulario
    window.resetForm = function() {
        cardType.value = 'visa';
        lastFourDigits.value = '';
        monthlyPayment.value = '';
        dueDate.value = '';
        status.value = 'pending';
        submitBtn.disabled = true;
        submitBtn.textContent = '➕ Agregar';
        cancelBtn.style.display = 'none';
        formTitle.textContent = '[+] Agregar Nueva Tarjeta';
        editingKey = null;
    };
    
    // Función para editar tarjeta
    function editCard(key, cardData) {
        editingKey = key;
        cardType.value = cardData.cardType;
        lastFourDigits.value = cardData.lastFourDigits;
        monthlyPayment.value = cardData.monthlyPayment;
        dueDate.value = cardData.dueDate;
        status.value = cardData.status;
        
        submitBtn.disabled = false;
        submitBtn.textContent = '✏️ Actualizar';
        cancelBtn.style.display = 'inline-block';
        formTitle.textContent = '✏️ Editar Tarjeta';
        
        // Scroll al formulario
        document.getElementById('listbot').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Función para eliminar tarjeta
    function deleteCard(key) {
        if (confirm('¿Está seguro de eliminar esta tarjeta?')) {
            db.ref('tarjetas/' + key).remove()
                .then(function() {
                    console.log("Tarjeta eliminada exitosamente");
                })
                .catch(function(error) {
                    console.error("Error al eliminar: ", error);
                    alert("Error al eliminar la tarjeta");
                });
        }
    }
    
    // Escuchar cambios en las tarjetas
    db.ref('tarjetas').on('value', function(snapshot) {
        paymentList.innerHTML = '';
        
        if (!snapshot.exists()) {
            paymentList.innerHTML = '<div class="no-cards">No hay tarjetas registradas</div>';
            calculateTotal();
            updateCardCount();
            return;
        }
        
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var card = childSnapshot.val();
            
            // Crear elemento de tarjeta
            var cardDiv = document.createElement('div');
            cardDiv.className = 'payment-item row';
            cardDiv.style.marginBottom = '10px';
            cardDiv.setAttribute('data-key', key);
            
            // Información de la tarjeta - col s12 m3 l2
            var cardInfoCol = document.createElement('div');
            cardInfoCol.className = 'col s12 m2 l2';
            var cardInfo = document.createElement('span');
            cardInfo.className = 'card-info status-badge';
            cardInfo.innerHTML = getCardIcon(card.cardType) + ' ' + 
                               getCardTypeName(card.cardType) + 
                               ' •••• ' + card.lastFourDigits;
            cardInfoCol.appendChild(cardInfo);
            
            // Vencimiento - col s4 m2 l2
            var cardDueCol = document.createElement('div');
            cardDueCol.className = 'col s4 m6 l2';
            var cardDue = document.createElement('span');
            cardDue.className = 'card-due status-badge';
            cardDue.innerHTML = 'Vence:' + formatDate(card.dueDate);
            cardDueCol.appendChild(cardDue);
            
            // Monto - col s4 m2 l2
            var cardAmountCol = document.createElement('div');
            cardAmountCol.className = 'col s12 m6 l2';
            var cardAmount = document.createElement('span');
            cardAmount.className = 'payment-amount status-badge';
            cardAmount.textContent = '$' + parseFloat(card.monthlyPayment).toFixed(2);
            cardAmountCol.appendChild(cardAmount);
            
            // Estado - col s4 m2 l2
            var cardStatusCol = document.createElement('div');
            cardStatusCol.className = 'col s4 m6 l2';
            var cardStatus = document.createElement('div');
            cardStatus.className = 'payment-status ' + getStatusClass(card.status);
            cardStatus.innerHTML = '<span class="status-badge status-badge">' + getStatusText(card.status) + '</span>';
            cardStatusCol.appendChild(cardStatus);
            
            // Botones de acción - col s12 m3 l4
            var cardActionsCol = document.createElement('div');
            cardActionsCol.className = 'col s12 m3 l4 right-align';
            var cardActions = document.createElement('div');
            cardActions.className = 'payment-actions';
            cardActions.style.display = 'inline-flex';
            cardActions.style.gap = '1rem';
            
            var editBtn = document.createElement('button');
            editBtn.className = 'btn-floating btn-small waves-effect waves-light blue';
            editBtn.innerHTML = '<i class="material-icons">edit</i>';
            editBtn.onclick = function() {
                editCard(key, card);
            };
            
            var deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-floating btn-small waves-effect waves-light red';
            deleteBtn.innerHTML = '<i class="material-icons">delete</i>';
            deleteBtn.onclick = function() {
                deleteCard(key);
            };
            
            cardActions.appendChild(editBtn);
            cardActions.appendChild(deleteBtn);
            cardActionsCol.appendChild(cardActions);
            
            // Ensamblar todo
            cardDiv.appendChild(cardInfoCol);
            cardDiv.appendChild(cardDueCol);
            cardDiv.appendChild(cardAmountCol);
            cardDiv.appendChild(cardStatusCol);
            cardDiv.appendChild(cardActionsCol);
            
            /*cardActions.appendChild(editBtn);
            cardActions.appendChild(deleteBtn);*/
            
            /*cardDiv.appendChild(cardHeader);
            cardDiv.appendChild(cardDetails);
            cardDiv.appendChild(cardStatus);*/
            /*cardDiv.appendChild(cardActions);*/
            
            paymentList.appendChild(cardDiv);
        });
        
        calculateTotal();
        updateCardCount();
    });
    
    // Calcular total inicial
    calculateTotal();
    updateCardCount();
});