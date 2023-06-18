import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import csv
import random
class Album:
    def __init__(self, nombre, artista, popularidad, genero, loudness, energy, uri){
        self.nombre = nombre,
        self.artista = artista 
        self.popularidad = popularidad
        self.genero = genero 
        self.loudness = loudness
        self.energy = energy
        self.uri = uri
    }

client_credentials_manager = SpotifyClientCredentials(client_id='95bbea0e91594af196a688f36ff2faa8', client_secret='fc7e4d9432a2486e8be0231cf52fd22b')
sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)

imagenes = ["https://i.scdn.co/image/ab67616d0000b2736a035608384de03ffe9930a3", 
            "https://i.scdn.co/image/ab67616d0000b2735092260f47e0d95717b834c3", 
            "https://i.scdn.co/image/ab67616d0000b273bc31229deb79f896eb9fee84",
            "https://i.scdn.co/image/ab67616d0000b2734f70220d934183ce2db16d6a",
            "https://i.scdn.co/image/ab67616d0000b273961d278ff072bc251b22ae1c"
            ]

URIS = ["4ORsCg1x8p80RfW0vXA35N","3p7WXDBxhC5KS9IFXnwae7","4u3MPfHM60rFFULJebZIay","2i0mqPNTcaLcmKWSMsE3c8","0KVdzmHHGGE8STv19uYPiL"]
campos = []
campos2 = {}
aux = {"name": 1, "album": 2, "popularity": 3, "artist": 4, "genre": 5}

aux.update(sp.audio_features('4c6LgotpKGB791EsNeu9gr')[0])

#por alguna estupida razon necesito un diccionario y un array con la misma info
for i in aux:
    campos.append(str(i))

for i in range(len(campos)):
    campos2[str(campos[i])] = campos[i]

def media(uri){
    
}

#obtenemos los parametros de interes para cada album 
for album in URIS:
    info = sp.album(album)
    album1 = Album()
    album1.name = info["name"]
    album1.artista = info["artists"]
    album1.popularidad = 

#escribimos los datos en un csv
with open("bjork.csv", 'w', encoding='UTF-8') as file:
    writer = csv.DictWriter(file, campos)
    writer.writerow(campos2)
    for album in URIS:
        for track in sp.album_tracks(album)["items"]:
            #URI
            track_uri = track["uri"]

            #Track name
            track_name = track["name"]

            #Main Artist
            artist_uri = track["artists"][0]["uri"]
            artist_info = sp.artist(artist_uri)

            #Name, popularity, genre
            artist_name = track["artists"][0]["name"]
            artist_pop = artist_info["popularity"]
            artist_genres = artist_info["genres"]

            #Album
            nombre_album = sp.album(album)["name"]

            #Popularity of the track
            track_pop = sp.track(track_uri)["popularity"]
            
            masterdict = {"name":track_name, "album": nombre_album, "popularity": track_pop, "artist": artist_name, "genre": random.choice(artist_genres)}
            masterdict.update(sp.audio_features(track_uri)[0])
            writer.writerow(masterdict)
file.close()
                
        
