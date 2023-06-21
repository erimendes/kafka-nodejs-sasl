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

// Crie um produtor Kafka
const producer = new kafka.Producer(kafkaClient);

// Lidere com erros de envio
producer.on('error', (err) => {
  console.error('Erro ao enviar mensagem:', err);
});

// Aguarde a conexão do produtor
producer.on('ready', () => {
  console.log('Produtor pronto para enviar mensagens.');

  // Tópico e mensagem de exemplo
  const topic = 'nome_do_topico';
  const message = 'Olá, Kafka!';

  // Crie uma mensagem Kafka
  const kafkaMessage = {
    topic: topic,
    messages: message,
  };

  // Envie a mensagem para o Kafka
  producer.send([kafkaMessage], (err, data) => {
    if (err) {
      console.error('Erro ao enviar mensagem:', err);
    } else {
      console.log('Mensagem enviada com sucesso:', data);
    }

    // Feche o produtor após o envio da mensagem
    producer.close(() => {
      console.log('Produtor encerrado.');
    });
  });
});

// Inicie a conexão do produtor com o Kafka
producer.connect();


/* 
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'meuprograma-nodejs-kafka-producer',
    brokers: ['192.168.1.113:9093'],
    ssl: true,
    sasl: {
        mechanism: 'plain',
        username: 'kafka',
        password: 'password',
    },
    //brokers: ['itchyno.local:9092']
});

const producer = kafka.producer()

async function start(mensagem) {

    // Connect to the producer
    await producer.connect()

    // Send an event to the demoTopic topic
    await producer.send(
        {
            topic: "demoTopic",
            messages: [
                { value: mensagem },
            ],
        }
    );

    // Disconnect the producer once we're done
    await producer.disconnect();

}

start("Mensagem adicionada a fila");
*/