import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import csv
import random

client_credentials_manager = SpotifyClientCredentials(client_id='95bbea0e91594af196a688f36ff2faa8', client_secret='fc7e4d9432a2486e8be0231cf52fd22b')
sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)

URIS = ["4ORsCg1x8p80RfW0vXA35N","3p7WXDBxhC5KS9IFXnwae7","4u3MPfHM60rFFULJebZIay","12n9nyAJ5Q4FHRldrciIPG","0KVdzmHHGGE8STv19uYPiL"]
campos = []
campos2 = {}
aux = {"name": 1, "album": 2, "popularity": 3, "artist": 4, "genre": 5}

aux.update(sp.audio_features('4c6LgotpKGB791EsNeu9gr')[0])


for i in aux:
    campos.append(str(i))

print(campos)

for i in range(len(campos)):
    campos2[str(campos[i])] = campos[i]

print(campos2)

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
                
        
