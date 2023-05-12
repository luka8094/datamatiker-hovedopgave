### Datamatiker hovedopgave 2023
KEA afhandlingsprojekt

Forfatter : luka8094

### Beskrivelse

Applikationstitel : Mindbench

Sprog :

- JavaScript
- Python

Markup :

- HTML

Styling :

- CSS

Backend moduler :

JavaScript:
- Express
- Bcrypt
- Helmet
- JSONwebtoken
- AWS-sdk
- Multer
- Mongoose

Python:
- Sklearn
- Tensorflow
- Numpy
- Pandas

Frontend framework :
- Svelte

## Beskrivelse

BI Webapp værktøj til forudsigelse af nøgletal i datasæt og generering af ML modeller. Udviklet i samarbejde med en virksomhed.

### Kørselsvejledning

Instruktioner til kørsel af applikation :

Forudsætninger for ekskvering :

- Node.Js version min. 16.17.0 (v16.17.0) 
- Python version min. 3.10.7

Herunder er de trinvise instruktioner til at starte applikationen op:

## 1. Klon GitHub repositoryet 
Downloade det enten som en 'zip' eller benyt understående kommando linje i din terminal
(```$``` symbolisere den nuværende arbejdsstig inde fra din terminal)

```$ git clone https://github.com/luka8094/datamatiker-hovedopgave```

## 2. Navigere til 'backend' mappen

```$ cd ./datamatiker-hovedopgave/backend```

## 3. Initialisere projektet og installere Node moduler samt diverse pakker

```$ npm init -y && npm install```

## 4. Definere miljøvariabler
Applikationen kræver at bestemte værdier kan tilgåes. I Backend mappen er, der vedlagt en env_sample fil.

Anvend Node's terminal til et oprette tilfældigt genereret strenge til SHA256 nøglerne. Gentage dette fire gang og copy-paste værdierne til *_KEY variablerne og JWT_ACCESS_TOKEN ved brug af nedenstående linje:

```$ node> require('crypto').randomBytes(64).toString('hex')```

Derudover skal der oprettes en Google Cloud konto og en Webapp projekt. Derfra vil du få bevilling for at kunne redirecte til Google's sign-in prompt samt tilhørende auth credentials. Følge guiden i denne video:

[![Google Oauth2 video]([https://img.youtube.com/vi/VIDEO-ID/0.jpg](https://i.ytimg.com/vi/Qt3KJZ2kQk0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC2L6_LJGI2k3kovFjxxjEzGCVTqw))](https://youtu.be/Qt3KJZ2kQk0?t=288)

Dernæst opret en konto hos mongodb.com.


## 5. Indtast følgende terminal kommando for at ekskvere applikationen

```$ npm run start-dev```

## . Åben applikationen i en browser
Hvis de ovenstående instruktioner er blevet fulgt skulle dit terminal vindue fremvise og udskrive følgende beskeder
``` 
Establishing connection. Please wait...
Success! Connection established.
Running on post: 3000
```

Herefter kan du åbne op for fin fortrukne browser. Når browser er åbnet, indtast ```http://localhost:3000``` browserens addressbar, som vist herunder:

![image](https://github.com/luka8094/datamatiker-hovedopgave/assets/74187002/ded1edb8-b470-40ae-825c-58298ba4adfc)

Din browser videresender dig til applikationens velkomst login skærm.



