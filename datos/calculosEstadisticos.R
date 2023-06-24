# calculo de medias
bjork <- read.csv("C:/Users/juani/OneDrive/Escritorio/Facultad/Visualizacion de Datos/VisData_Final-Vila-Bach-Navajas-Niederle/datos/bjork.csv")

valenceMedia <- c()
loudnessMedia <- c()
popMedia <- c()
for(i in bjork$album){
  valenceMedia[i] <- mean(subset(bjork$valence, grepl(i, bjork$album)))
  loudnessMedia[i] <- mean(subset(bjork$loudness, grepl(i, bjork$album)))
  popMedia[i] <- mean(subset(bjork$popularity, grepl(i, bjork$album)))
}
valenceMedia
loudnessMedia
popMedia