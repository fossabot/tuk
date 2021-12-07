# TrigpointingME

Source code for TrigpointingME website

### Example queries


```json
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


{
  "id": 4,
  "name": "LAX",
  "wgs_lat": 33.9434,
  "wgs_lon": -118.4079
}
