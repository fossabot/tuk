# TrigpointingME

Source code for TrigpointingME website

### Example queries


<!-- ```json
{
  "id": 2,
  "name": "test explicit id 2",
  "latitude": 51.12345,
  "longitude": -0.123456,
  "point": {
     "type": "Point",
     "coordinates": [-118.4079, 33.9434]
  }
}
```

```bash
curl -X 'POST' \
  'http://localhost:3000/trigs' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 2,
  "name": "test explicit id 2",
  "latitude": 51.12345,
  "longitude": -0.123456,
  "point": {
     "type": "Point",
     "coordinates": [-118.4079, 33.9434]
  }
}'
```
 -->

{
  "id": 4,
  "name": "LAX",
  "wgs_lat": 33.9434,
  "wgs_lon": -118.4079
}


{
  "id": 2,
  "name": "London",
  "wgs_lat": 51.5074,
  "wgs_lon":  -0.1278
}


{
  "id": 11,
  "name": "missing OSGB",
  "wgs_lat": 51.12345,
  "wgs_lon": -0.123456
}


{
  "id": 12,
  "name": "missing WGS",
  "osgb_eastings": 531421.98,
  "osgb_northings": 137692.54
}


{
  "id": 13,
  "name": "Both present",
  "wgs_lat": 1,
  "wgs_lon": 2,
  "osgb_eastings": 3,
  "osgb_northings": 4
}

### Authentication

```bash
# tdev (Test Application)
curl --request POST \
  --url https://teasel.eu.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"vumsBbKMblsrjlHyjOyDR5cQDhnqgESE","client_secret":"AfDgQG0u3Pkmu-eY_-VGgTt8u-KoSUTKIglE4lM_oYu6YVwZDkrie680NQyqaT5_","audience":"https://api.trigpointing.dev","grant_type":"client_credentials"}'

{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlEwRXdORUZDTmtZeE1EUTJOVVV5TVRkRU9VRXdRamhHTmtSRlFURTBSalV6TWtNd09FWkNSZyJ9.eyJpc3MiOiJodHRwczovL3RlYXNlbC5ldS5hdXRoMC5jb20vIiwic3ViIjoidnVtc0JiS01ibHNyamxIeWpPeURSNWNRRGhucWdFU0VAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLnRyaWdwb2ludGluZy5kZXYiLCJpYXQiOjE2NDA2NDk1NjYsImV4cCI6MTY0MDczNTk2NiwiYXpwIjoidnVtc0JiS01ibHNyamxIeWpPeURSNWNRRGhucWdFU0UiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJwZXJtaXNzaW9ucyI6W119.E1a6sRIzwGc5S-uDJ5fUsGOdjhc7GVNh1-9qRqEI0V5YTJa7BimgCoD9Hy2JwdOONO3l_GYZWWj2NQgtePqk5IgJSHpnWXOn4T2ylkZQ3N96zOU9MJRRCnn0QlKRJ2dz5G7ce2frHdxcCrAylh3X6H7sed5pCZQ74VuJ3dzoeWRJnWrhZQOQt9iG7-Xb4xMLZA9TUtAfg0Ns0rY-QwC2k0IdRjCx8WgNNZedECtv_psIJPLQG6tvOfCWRGazh4H-cHZ02QW7Fs9KmwBiAgNico8qWfgwpCid5a9CMaR3x8abJw2cVI12bs92-RpHA5LmkQxl4uiladbVlOi6eAwnvg","expires_in":86400,"token_type":"Bearer"}


curl -X 'POST' \
  'http://localhost:3000/trigs' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlEwRXdORUZDTmtZeE1EUTJOVVV5TVRkRU9VRXdRamhHTmtSRlFURTBSalV6TWtNd09FWkNSZyJ9.eyJpc3MiOiJodHRwczovL3RlYXNlbC5ldS5hdXRoMC5jb20vIiwic3ViIjoidnVtc0JiS01ibHNyamxIeWpPeURSNWNRRGhucWdFU0VAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLnRyaWdwb2ludGluZy5tZSIsImlhdCI6MTY0MDY1NjM4OCwiZXhwIjoxNjQwNzQyNzg4LCJhenAiOiJ2dW1zQmJLTWJsc3JqbEh5ak95RFI1Y1FEaG5xZ0VTRSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsInBlcm1pc3Npb25zIjpbXX0.tFhcpjhHeRUh238yiIPHFBOv-Y3oHxl9iv6QF0CXvzED3ZVjgKYCZbWLyJVxdL_oDychSe-8GIdXVKP1_zXbb3IWY9Op94XtrirWZSsxhOUS2b038cqDjYBmIL9eyVrvNAJrGl71DVTY78LeuamQxm0j4ZiyBWhsE5_fVd3xrtlzdeUUhra3z-Q1i8tGU34gFOQY1Uij8wQUI80MCoxtG_FvLJ0CnJ0epxVKOgswwiz7OD2C3OEzVUSe6PRSPuQs4FF6XGEACZdcUQdrv8xEV5rwKzo0yRATPSOWX633oG0oyuu9HVkopv0z4h1gib_h64wjf59cuf6w2fJmy07o3g' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "name": "string",
  "wgs_lat": 57.83566,
  "wgs_lon": -5.76663,
  "physical_type": "Pillar",
  "current_use": "Passive station",
  "historic_use": "Primary",
  "condition": "G",
  "status": "10"
}'

```
