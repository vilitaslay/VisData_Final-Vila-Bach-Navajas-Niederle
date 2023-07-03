# VisData_Final-Vila-Bach-Navajas-Niederle

## Idea General
El objetivo de este trabajo es exponer la evolución musical de la cantante islandesa Björk, mostrando metricas sobre sus diversos albumes para que luego el usuario pueda jugar a matchear la cancion con el album guiandose con una codificación creada por nosotros para estos atributos

## NUEVO 
"mejore" lo del texto abajo del grafico, ahora se borra cuando salgo de los graficos pero si subis de nuevo se queda ahi. Lo que hice crear otro step que sea la salida de los graficos y entonces podemos llamar a la funcion deleteFixedText if key == "salida" then deleteFixedText y modifique el handlestepenter() para que cree graficos solo cunado el step != salida. No se me ocurrio como solucionarlo.