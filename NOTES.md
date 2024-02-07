Please add any additional notes here…

The  cards.json file and the sizes.json files are identical. 

I had to remove the --watch from the script 'test' because it was causing my tests to loop everytime the cards.json file was being rewritten.

For the sake of the test I've kept the example card that I add in the test in the JSon file, but, for the POT 201 test to pass the cards.json file needs to be reset to its original state prior to running the tests.

Without the time limit I would have tackled the Delete Card task aswell but instead I am going to briefly list my steps here on how I would have solved it:

1) Create a Model and a controller function to pass on the Delete request.

2) Pass the Card Id to the controller and then to the model and verify that in the cards.json file there is a card with that ID (find() or findIndex() will work here)

3) If the card does not exist return a Status 404 and an error message 

4) if the card exists find the index of that card in the Array of cards and then use that index  value to splice the item. This allows to remove only one item from the array at a specific point.

5) Use the new modified array to rewrite the cards.json file with fs.writeFile

6) Respond with status 204 


Thank you very much for the opportunity, this was a fun challenge!
