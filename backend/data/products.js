const products = [
   {
      "productName": "The Great Gatsby",
      "images": [
         {
            "public_id": "mern-book-store/etb76t6ts93ldgspl0kz",
            "url": "https://res.cloudinary.com/mdbdrrhm/image/upload/v1750238379/mern-book-store/etb76t6ts93ldgspl0kz.jpg"
         }
      ],
      "description":
         "F. Scott Fitzgerald’s classic novel delves into the opulent yet hollow world of Jay Gatsby, a man obsessed with reclaiming a lost love and achieving the American Dream. Set in the Roaring Twenties, the story explores themes of wealth, love, and disillusionment, offering a poignant critique of the pursuit of happiness through materialism and the elusive nature of the past.",
      "category": "classic",
      "price": "10.99",
      "numberInStock": 15,
      "rating": 0,
      "numberOfReviews": 0,
      "reviews": []
   },
   {
      "productName": "To Kill a Mockingbird",
      "images": [
         {
            "public_id": "mern-book-store/pjxixwk1z7edetcscx33",
            "url": "https://res.cloudinary.com/mdbdrrhm/image/upload/v1750238382/mern-book-store/pjxixwk1z7edetcscx33.jpg"
         }
      ],
      "description":
         "Harper Lee’s masterpiece follows Scout Finch as she learns about racial injustice and moral integrity in the Deep South. Guided by her father, Atticus Finch, Scout witnesses the courage it takes to stand up for what is right, even in the face of prejudice. A timeless tale of empathy, justice, and the complexities of human nature.",
      "category": "classic",
      "price": "8.99",
      "numberInStock": 20,
      "rating": 0,
      "numberOfReviews": 0,
      "reviews": []
   },
   {
      "productName": "1984",
      "images": [
         {
            "public_id": "mern-book-store/qt0cbtjeqmcdztuuwd5z",
            "url": "https://res.cloudinary.com/mdbdrrhm/image/upload/v1750238373/mern-book-store/qt0cbtjeqmcdztuuwd5z.jpg"
         }
      ],
      "description":
         "George Orwell’s dystopian novel portrays a totalitarian society ruled by Big Brother, where individuality and truth are obliterated. Winston Smith’s quiet rebellion against the oppressive regime reveals the dangers of unchecked power and surveillance. A chilling and prophetic exploration of freedom, manipulation, and the human spirit’s resilience against tyranny.",
      "category": "dystopian",
      "price": "9.99",
      "numberInStock": 12,
      "rating": 0,
      "numberOfReviews": 0,
      "reviews": []
   },
   {
      "productName": "Pride and Prejudice",
      "images": [
         {
            "public_id": "mern-book-store/mrqpknihhqtbudrsfy9j",
            "url": "https://res.cloudinary.com/mdbdrrhm/image/upload/v1750238375/mern-book-store/mrqpknihhqtbudrsfy9j.jpg"
         }
      ],
      "description":
         "Jane Austen’s witty and romantic novel centers on Elizabeth Bennet, a spirited young woman navigating societal expectations and her evolving feelings for the enigmatic Mr. Darcy. Through misunderstandings and personal growth, the story highlights the importance of overcoming pride and prejudice to find true love and mutual respect.",
      "category": "romance",
      "price": "7.99",
      "numberInStock": 18,
      "rating": 0,
      "numberOfReviews": 0,
      "reviews": []
   },
   {
      "productName": "Moby Dick",
      "images": [
         {
            "public_id": "mern-book-store/r9rydbwh6sdbrw1nbf0a",
            "url": "https://res.cloudinary.com/mdbdrrhm/image/upload/v1750238374/mern-book-store/r9rydbwh6sdbrw1nbf0a.jpg"
         }
      ],
      "description":
         "Herman Melville’s epic tale follows Captain Ahab’s obsessive quest to hunt the white whale, Moby Dick. A profound exploration of fate, obsession, and humanity’s struggle against nature, the novel delves into the psychological depths of its characters, offering a timeless meditation on the consequences of unchecked ambition.",
      "category": "adventure",
      "price": "11.99",
      "numberInStock": 10,
      "rating": 0,
      "numberOfReviews": 0,
      "reviews": []
   },
   {
      "productName": "The Catcher in the Rye",
      "images": [
         {
            "public_id": "mern-book-store/xu209spkxd0utxxeb16w",
            "url": "https://res.cloudinary.com/mdbdrrhm/image/upload/v1750238378/mern-book-store/xu209spkxd0utxxeb16w.jpg"
         }
      ],
      "description":
         "J.D. Salinger’s iconic novel captures the voice of Holden Caulfield, a disenchanted teenager grappling with identity, alienation, and the transition to adulthood. His candid and often cynical narration provides a raw and intimate portrayal of adolescence, making it a defining work of modern literature.",
      "category": "classic",
      "price": "9.49",
      "numberInStock": 14,
      "rating": 0,
      "numberOfReviews": 0,
      "reviews": []
   },
   {
      "productName": "The Nightingale",
      "images": [
         {
            "public_id": "mern-book-store/g0f5n0vrhwzs9eshghmz",
            "url": "https://res.cloudinary.com/mdbdrrhm/image/upload/v1750238380/mern-book-store/g0f5n0vrhwzs9eshghmz.jpg"
         }
      ],
      "description":
         "Kristin Hannah’s historical novel tells the story of two sisters in Nazi-occupied France, each fighting for survival in their own way. One joins the Resistance, while the other protects her family at home. A powerful tale of love, sacrifice, and the resilience of women during wartime.",
      "category": "historical",
      "price": "12.49",
      "numberInStock": 16,
      "rating": 0,
      "numberOfReviews": 0,
      "reviews": []
   },
   {
      "productName": "All the Light We Cannot See",
      "images": [
         {
            "public_id": "mern-book-store/nlb2ixwkjqfhbubjqlk0",
            "url": "https://res.cloudinary.com/mdbdrrhm/image/upload/v1750238373/mern-book-store/nlb2ixwkjqfhbubjqlk0.jpg"
         }
      ],
      "description":
         "Anthony Doerr’s lyrical novel intertwines the lives of a blind French girl and a German soldier during World War II. Their stories converge in a hauntingly beautiful narrative that explores the impact of war on ordinary lives and the enduring power of hope and human connection.",
      "category": "historical",
      "price": "11.99",
      "numberInStock": 22,
      "rating": 0,
      "numberOfReviews": 0,
      "reviews": []
   },
   {
      "productName": "The Book Thief",
      "images": [
         {
            "public_id": "mern-book-store/sa71idvxo9ualg9tnzoy",
            "url": "https://res.cloudinary.com/mdbdrrhm/image/upload/v1750238377/mern-book-store/sa71idvxo9ualg9tnzoy.jpg"
         }
      ],
      "description":
         "Markus Zusak’s poignant novel, narrated by Death, follows Liesel, a young girl in Nazi Germany, as she discovers the transformative power of words and stories. A moving exploration of loss, resilience, and the human spirit’s ability to find light in the darkest of times.",
      "category": "historical",
      "price": "10.99",
      "numberInStock": 12,
      "rating": 0,
      "numberOfReviews": 0,
      "reviews": []
   },
   {
      "productName": "The Tattooist of Auschwitz",
      "images": [
         {
            "public_id": "mern-book-store/sgzkdm8x4qbmuxpsteeh",
            "url": "https://res.cloudinary.com/mdbdrrhm/image/upload/v1750238382/mern-book-store/sgzkdm8x4qbmuxpsteeh.jpg"
         }
      ],
      "description":
         "Heather Morris’s novel is based on the true story of Lale Sokolov, a Jewish man forced to tattoo prisoners in Auschwitz. Amidst unimaginable horror, he finds love and hope, showcasing the strength of the human heart and the enduring power of compassion and survival.",
      "category": "historical",
      "price": "9.99",
      "numberInStock": 18,
      "rating": 0,
      "numberOfReviews": 0,
      "reviews": []
   },
   {
      "productName": "The Paris Architect",
      "images": [
         {
            "public_id": "mern-book-store/fajcfprq2vvmxp6m53f2",
            "url": "https://res.cloudinary.com/mdbdrrhm/image/upload/v1750238381/mern-book-store/fajcfprq2vvmxp6m53f2.jpg"
         }
      ],
      "description":
         "Charles Belfoure’s gripping novel follows an architect in Nazi-occupied Paris who designs hiding places for Jews. Initially driven by money, he becomes deeply involved in the resistance, risking his life for others. A compelling story of moral awakening, courage, and the complexities of human morality during wartime.",
      "category": "historical",
      "price": "10.49",
      "numberInStock": 0,
      "rating": 0,
      "numberOfReviews": 0,
      "reviews": []
   },
   {
      "productName": "Animal Farm",
      "images": [
         {
            "public_id": "mern-book-store/morw5v6uu5zyichflshz",
            "url": "https://res.cloudinary.com/mdbdrrhm/image/upload/v1750238373/mern-book-store/morw5v6uu5zyichflshz.jpg"
         }
      ],
      "description":
      "Animal Farm is a satirical allegorical novella by George Orwell, published in 1945. It tells the story of farm animals who revolt against their human owner, aiming to create an equal society, but ultimately face betrayal and oppression under their own leaders, the pigs. It uses a story about farm animals to critique totalitarianism and reflect on the events of the Russian Revolution and Stalinist era",
      "category": "political satire",
      "price": "10.49",
      "numberInStock": 0,
      "rating": 0,
      "numberOfReviews": 0,
      "reviews": []
   },
   {
      "productName": "Escape From Freedom",
      "images": [
         {
            "public_id": "mern-book-store/jbwx7ge8tipf7pxjwkge",
            "url": "https://res.cloudinary.com/mdbdrrhm/image/upload/v1750238373/mern-book-store/jbwx7ge8tipf7pxjwkge.jpg"
         }
      ],
      "description":
      "Escape from Freedom is a book by Erich Fromm, published in 1941, that explores the complex relationship between individual freedom and the psychological mechanisms that lead people to seek security through authoritarianism. Fromm distinguishes between 'freedom from' (negative freedom) and 'freedom to'(positive freedom), arguing that while modern society offers external freedoms, many individuals struggle with feelings of isolation and anxiety, often opting to relinquish their freedoms in favor of conformity and control.",
      "category": "social psychology",
      "price": "10.49",
      "numberInStock": 0,
      "rating": 0,
      "numberOfReviews": 0,
      "reviews": []
   },
   {
      "productName": "Mind, Self, and Society",
      "images": [
         {
            "public_id": "mern-book-store/vs480ehf1jc9hts3fgbc",
            "url": "https://res.cloudinary.com/mdbdrrhm/image/upload/v1750238374/mern-book-store/vs480ehf1jc9hts3fgbc.jpg"
         }
      ],
      "description":
      "\"Mind, Self, and Society\" is a book by George Herbert Mead that explores how individual identity and consciousness are shaped through social interactions. It introduces the concept of symbolic interactionism, emphasizing that the self is a social process developed through communication and behavior within society.",
      "category": "sociology psychology",
      "price": "10.49",
      "numberInStock": 0,
      "rating": 0,
      "numberOfReviews": 0,
      "reviews": []
   },
   {
      "productName": "Propaganda",
      "images": [
         {
            "public_id": "mern-book-store/trgydkqo5tu0h4x8qhev",
            "url": "https://res.cloudinary.com/mdbdrrhm/image/upload/v1750238376/mern-book-store/trgydkqo5tu0h4x8qhev.jpg"
         }
      ],
      "description":
      "\"Propaganda\" is a book by Edward Bernays, published in 1928, that explores the techniques of public communication and the psychological manipulation of the masses. Bernays argues that propaganda is essential for shaping public opinion and maintaining democracy, presenting it as a tool for both social change and commercial success.",
      "category": " psychology, sociology, and business",
      "price": "10.49",
      "numberInStock": 0,
      "rating": 0,
      "numberOfReviews": 0,
      "reviews": []
   },
   {
      "productName": "Art Of War",
      "images": [
         {
            "public_id": "mern-book-store/w8jlaukkdbyav4q2u8m6",
            "url": "https://res.cloudinary.com/mdbdrrhm/image/upload/v1750238377/mern-book-store/w8jlaukkdbyav4q2u8m6.jpg"
         }
      ],
      "description":
      "The Art of War is an ancient Chinese military treatise attributed to Sun Tzu, dating back to the 5th century BC. It consists of 13 chapters that cover various aspects of warfare and strategy, emphasizing the importance of understanding both oneself and the enemy to achieve victory without necessarily engaging in battle.",
      "category": "philosophy, history, and nonfiction.",
      "price": "10.49",
      "numberInStock": 0,
      "rating": 0,
      "numberOfReviews": 0,
      "reviews": []
   }
];

export default products;