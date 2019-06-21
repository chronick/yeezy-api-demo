echo "List all shoes"
curl localhost:3000/shoes

echo "\n"
echo "Show shoe details"
curl localhost:3000/shoes/1

echo "\n"
echo "Add a shoe"
curl -X POST localhost:3000/shoes -d '{"name": "Some Shoe Name"}' -H "Content-Type: application/json"  

echo "\n"
echo "Add a true-to-size listing"
curl -X POST localhost:3000/tts -d '{"shoeId": 1, "value": 4}' -H "Content-Type: application/json"  

echo "\n"
echo "Show shoe details. TTL value should be slightly different, assuming current average is different from value supplied above."
curl localhost:3000/shoes/1
