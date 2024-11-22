const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia, LocalAuth } = require('whatsapp-web.js');

// Inicializa o cliente com a estratégia de autenticação LocalAuth
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "chatbot-session"  // Nome personalizado para a sessão
    })
});

// Serviço de leitura do QR Code
client.on('qr', qr => {
    console.log('QR Code gerado. Escaneie o código para autenticar.');
    qrcode.generate(qr, { small: true });
});

// Evento disparado quando o bot está pronto
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

// Inicializa o cliente do WhatsApp
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função para criar delay entre ações

// Funil de atendimento
client.on('message', async msg => {
    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000); // Delay de 3 segundos
        await chat.sendStateTyping();
        await delay(3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, 'Olá! ' + name.split(" ")[0] + ' seja bem-vindo ao escritório Ideraldo Appi & Advogados Associados. Para que possamos entender melhor sua necessidade, por favor, escolha uma das opções abaixo:\n\n1 - Novo Cliente\n2 - Cliente Ativo\n\n! - Assim que recebermos sua resposta, direcionaremos seu atendimento para a equipe responsável.');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(5000);
    }

    if (msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Obrigado por escolher a opção "Novo Cliente". Por favor, nos informe:\n\n1 - Seu nome completo.\n2 - Um breve resumo do motivo do contato\n3 - Seu e-mail e telefone para contato.');
    }

    if (msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Agradecemos por continuar contando com o escritório Ideraldo José Appi & Advogados Associados. Por favor, nos informe:\n\n1 - Seu nome completo.\n2 - A dúvida ou atualização específica que você deseja.');
    }
});
