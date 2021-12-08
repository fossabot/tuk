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

