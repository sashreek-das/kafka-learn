import { Kafka } from "kafkajs"


//initializig the kafka instatnce
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka1:9092', 'kafka2:9092']
  })
  
  //initializing the producer and the consumer instance 
  const producer = kafka.producer()
  const consumer = kafka.consumer({ groupId: 'test-group' })
  

  //running the producer funciton 
  const run = async () => {
    // Producing
    await producer.connect()
    await producer.send({
      topic: 'test-topic',
      messages: [
        { value: 'Hello KafkaJS user!' },
      ],
    })
  
    // Consuming and connecting the consumer assigning the topic and telling if the stream has to start from the beginning or not 
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
  
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        })
      },
    })
  }
  
  run().catch(console.error)