 #include "DHT.h" //Inclui uma biblioteca externa própria do sensor

  #define TIPO_SENSOR DHT11 //Define o sensor que está sendo utilizado
  const int PORTA_DHT11= A0; //Define em qual porta analógica está conectado

  DHT sensorDHT(PORTA_DHT11, TIPO_SENSOR); //Define que as informações coletadas se referem ao sensor informado

  void setup() {
    Serial.begin(9600); //Define a taxa de transferência em bits p/segundo para transmissão serial(baud rate)
  sensorDHT.begin(); //Iniciar a função atrelada ao sensorDHT
  }

  void loop() { //Define um processo que será feito em repetição

    float umidade = sensorDHT.readHumidity(); // Cria a variável e define o valor captado pela leitura
    float temperatura = sensorDHT.readTemperature(); // Cria a variável e define o valor captadop ela leitura

        Serial.print(umidade); //Preenche a string com o valor da variavel "umidade"
        Serial.print(";");
        Serial.println(temperatura);//Preenche a string com o valor da variavel "temperatura"

    delay (1000); //Define o tempo para refazer a ação do loop em ms
  }
