artist:
id - serial
name - varchar
genre - varchar
age - int





album:
id - serial
name - varchar
release - date
sales - int
label - varchar
artist id - int


track:
id - serial
album id - int
track number - int
duration - int
name - varchar
track id - int


song:
id - serial
name - varchar
songwriter id - int
date - date


songwriter:
id - serial
name - varchar


INSERT INTO artist values
();