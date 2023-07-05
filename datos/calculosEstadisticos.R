# calculo de medias
bjork <- read.csv("C:/Users/juani/OneDrive/Escritorio/Facultad/Visualizacion de Datos/VisData_Final-Vila-Bach-Navajas-Niederle/datos/bjork.csv")

danceMedia <- c()
instrMedia <- c()
popMedia <- c()
energyMedia <- c()
acoustMedia <- c()
for(i in bjork$album){
  danceMedia[i] <- mean(subset(bjork$danceability, grepl(i, bjork$album)))
  instrMedia[i] <- mean(subset(bjork$instrumentalness, grepl(i, bjork$album)))
  energyMedia[i] <- mean(subset(bjork$energy, grepl(i, bjork$album)))
  acoustMedia[i] <- mean(subset(bjork$acousticness, grepl(i, bjork$album)))
  popMedia[i] <- mean(subset(bjork$popularity, grepl(i, bjork$album)))
}

danceMedia
instrMedia 
energyMedia 
acoustMedia 
popMedia 