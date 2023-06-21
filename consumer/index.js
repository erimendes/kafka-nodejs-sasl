const kafka = require('kafka-node');

// Configurações de autenticação SASL
const saslOptions = {
  mechanism: 'plain',
  username: 'kafka',
  password: 'password',
};

// Configurações do cliente Kafka
const kafkaClientOptions = {
  kafkaHost: '192.168.1.113:9093',
  sasl: saslOptions,
  ssl: true, // Se o Kafka estiver configurado com SSL
  // Outras configurações adicionais podem ser definidas aqui
};

// Crie um cliente Kafka
const kafkaClient = new kafka.KafkaClient(kafkaClientOptions);

// Configurações do consumidor Kafka
const consumerOptions = {
  groupId: 'consumer-group',
  autoCommit: true, // Defina como false para controle manual do commit
};

// Crie um consumidor Kafka
const consumer = new kafka.Consumer(kafkaClient, [{ topic: 'nome_do_topico' }], consumerOptions);

// Lidere com erros de consumo
consumer.on('error', (err) => {
  console.error('Erro no consumidor:', err);
});

// Consuma mensagens do Kafka
consumer.on('message', (message) => {
  console.log('Mensagem recebida:', message.value);
});

// Inicie a conexão do consumidor com o Kafka
consumer.on('ready', () => {
  console.log('Consumidor pronto para receber mensagens.');
});

// Tratamento de interrupção (Ctrl+C)
process.on('SIGINT', () => {
  consumer.close(() => {
    console.log('Consumidor encerrado.');
    process.exit();
  });
});


/*
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'meuprograma-nodejs-kafka-consumer',
    brokers: ['192.168.1.113:9093'],
    ssl: true,
    sasl: {
        mechanism: 'plain',
        username: 'kafka',
        password: 'password',
    },
    // brokers: ['itchyno.local:9092']
});

const consumer = kafka.consumer({ groupId: 'test-group' })

async function start() {

    await consumer.connect()
    await consumer.subscribe({ topic: 'demoTopic', fromBeginning: true })

    await consumer.run(
        {
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                value: message.value.toString(),
                })
            },
        }
    )

}

start();
*/