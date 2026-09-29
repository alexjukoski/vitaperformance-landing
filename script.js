// 1. Aguarda a montagem da árvore do DOM
document.addEventListener('DOMContentLoaded', function() {

    // 2. Mapeamento de ponteiros de memória (DOM Nodes)
    const form = document.getElementById('clinicForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    // 3. Endpoint do Webhook (Substituir pela URL do Make.com)
    const WEBHOOK_URL = 'https://hook.us1.make.com/SEU_WEBHOOK_AQUI';

    // 4. Escuta do Evento de Submissão
    form.addEventListener('submit', async function(event) {
        
        // Interruptor da ação padrão do navegador
        event.preventDefault();

        // Alteração de estado da Interface (UI)
        submitBtn.disabled = true;
        submitBtn.innerText = 'A processar...';
        formStatus.innerText = '';

        // 5. Extração e Estruturação de Dados (Objeto JSON)
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            goal: document.getElementById('goal').value,
            submittedAt: new Date().toLocaleString('pt-BR', {timeZone:"America/Sao_Paulo"})
        };

        // 6. Simulação de Disparo de Tráfego (DataLayer / Analytics)
        trackLeadEvent(formData.goal);

        try {
            // 7. Chamada Assíncrona HTTP (API Fetch)
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                formStatus.style.color = '#16a34a';
                formStatus.innerText = 'Registo efetuado! A redirecionar para o WhatsApp...';
                
                // 8. Roteamento Dinâmico para o WhatsApp
                redirectToWhatsApp(formData.name, formData.goal);
                
                // Limpeza do formulário
                form.reset();
            } else {
                throw new Error('Falha na resposta do servidor.');
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
            formStatus.style.color = '#dc2626';
            formStatus.innerText = 'Erro ao enviar dados. Tente novamente.';
        } finally {
            // Restauração do estado do botão
            submitBtn.disabled = false;
            submitBtn.innerText = 'Solicitar Atendimento';
        }
    });

    // 9. Função para Simulação de Evento de Conversão (Pixel/GTM)
    function trackLeadEvent(userGoal) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'lead_conversion',
            'patient_goal': userGoal,
            'timestamp': new Date().getTime()
        });
        console.log('📊 Evento de Tráfego Disparado (DataLayer):', userGoal);
    }

    // 10. Função para Construção de URL e Redirecionamento Dinâmico
    function redirectToWhatsApp(name, goal) {
        const phoneNumber = '5542999999999'; // Número fictício da clínica
        
        // Dicionário de mensagens personalizadas baseadas no objetivo
        const messages = {
            hipertrofia: `Olá! Meu nome é ${name}. Preenchi o formulário no site e gostaria de agendar uma consulta focada em Ganho de Massa Muscular.`,
            emagrecimento: `Olá! Meu nome é ${name}. Preenchi o formulário no site e gostaria de agendar uma consulta focada em Emagrecimento.`,
            performance: `Olá! Meu nome é ${name}. Preenchi o formulário no site e tenho interesse no protocolo de Alta Performance Esportiva.`,
            saude: `Olá! Meu nome é ${name}. Preenchi o formulário no site e gostaria de agendar uma avaliação para Saúde Geral.`
        };

        const messageText = messages[goal] || `Olá! Meu nome é ${name}. Gostaria de mais informações sobre os atendimentos.`;
        
        // Codificação de caracteres especiais para padrão de URL
        const encodedMessage = encodeURIComponent(messageText);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Abertura de nova aba no navegador após 1.5 segundos
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1500);
    }
});